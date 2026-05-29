import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { getSession } from '@/lib/adminApi';
import type { CmsArticle } from '@/lib/cmsTypes';
import { CMS_TABLE, getTopicStyle, formatNewsDate } from '@/lib/cmsTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, X, Eye, EyeOff, Star } from 'lucide-react';

const TOPICS = [
  'Grãos', 'Pecuária', 'Biocombustíveis', 'Café', 'Agroeconomia',
  'Política Agrícola', 'Insumos', 'Tecnologia', 'Maquinário', 'Outras Culturas'
];

const SOURCES = ['DATAGRO', 'UAGro', 'RE/MAX AGRO', 'Embrapa', 'USDA', 'Outro'];

type FormData = Partial<Omit<CmsArticle, 'id' | 'created_at' | 'updated_at' | 'view_count'>> & {
  tags_input?: string;
};

const emptyForm: FormData = {
  slug: '',
  title: '',
  subtitle: '',
  summary: '',
  content: '',
  image_url: '',
  source: 'DATAGRO',
  source_url: '',
  author: 'Equipe RE/MAX AGRO',
  topic: 'Grãos',
  tags_input: '',
  edition_date: '2026-05-29',
  news_date: '2026-05-29',
  is_highlight: false,
  is_published: true,
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export default function AdminCMS() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [filterTopic, setFilterTopic] = useState('Todos');
  const [filterDate, setFilterDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    checkAuth();
    loadArticles();
  }, []);

  async function checkAuth() {
    try {
      const session = await getSession();
      if (!session) navigate('/admin');
    } catch {
      navigate('/admin');
    }
  }

  async function loadArticles() {
    setLoading(true);
    const { data, error } = await supabase
      .from(CMS_TABLE)
      .select('*')
      .order('news_date', { ascending: false })
      .order('is_highlight', { ascending: false });
    if (!error && data) setArticles(data as CmsArticle[]);
    setLoading(false);
  }

  function openNew() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
    setSuccessMsg('');
    setErrorMsg('');
  }

  function openEdit(art: CmsArticle) {
    setForm({
      ...art,
      tags_input: (art.tags ?? []).join(', '),
    });
    setEditingId(art.id);
    setShowForm(true);
    setSuccessMsg('');
    setErrorMsg('');
  }

  function handleChange(field: keyof FormData, value: unknown) {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !editingId) {
        updated.slug = slugify(value as string);
      }
      return updated;
    });
  }

  async function handleSave() {
    if (!form.title || !form.summary || !form.content) {
      setErrorMsg('Preencha título, resumo e conteúdo.');
      return;
    }
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    const tags = (form.tags_input ?? '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      slug: form.slug || slugify(form.title ?? ''),
      title: form.title,
      subtitle: form.subtitle ?? '',
      summary: form.summary,
      content: form.content,
      image_url: form.image_url ?? '',
      source: form.source ?? 'DATAGRO',
      source_url: form.source_url ?? '',
      author: form.author ?? 'Equipe RE/MAX AGRO',
      topic: form.topic ?? 'Grãos',
      tags,
      edition_date: form.edition_date ?? '2026-05-29',
      news_date: form.news_date ?? '2026-05-29',
      is_highlight: form.is_highlight ?? false,
      is_published: form.is_published ?? true,
    };

    if (editingId) {
      const { error } = await supabase.from(CMS_TABLE).update(payload).eq('id', editingId);
      if (error) { setErrorMsg(error.message); setSaving(false); return; }
      setSuccessMsg('Artigo atualizado com sucesso!');
    } else {
      const { error } = await supabase.from(CMS_TABLE).insert([payload]);
      if (error) { setErrorMsg(error.message); setSaving(false); return; }
      setSuccessMsg('Artigo criado com sucesso!');
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    loadArticles();
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Apagar "${title}"?`)) return;
    const { error } = await supabase.from(CMS_TABLE).delete().eq('id', id);
    if (!error) {
      setSuccessMsg('Artigo apagado.');
      loadArticles();
    }
  }

  async function togglePublish(art: CmsArticle) {
    await supabase.from(CMS_TABLE).update({ is_published: !art.is_published }).eq('id', art.id);
    loadArticles();
  }

  async function toggleHighlight(art: CmsArticle) {
    await supabase.from(CMS_TABLE).update({ is_highlight: !art.is_highlight }).eq('id', art.id);
    loadArticles();
  }

  const filtered = articles.filter(a => {
    const byTopic = filterTopic === 'Todos' || a.topic === filterTopic;
    const byDate = !filterDate || a.news_date === filterDate;
    return byTopic && byDate;
  });

  return (
    <AdminLayout activePage="cms">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS de Notícias</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Gerencie os artigos da newsletter · Edição 29/Mai/2026
            </p>
          </div>
          <Button onClick={openNew} className="flex items-center gap-2 bg-[#1a2e4a] hover:bg-[#243d60]">
            <Plus size={16} />
            Nova Notícia
          </Button>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            <i className="ri-checkbox-circle-line text-lg" />
            {successMsg}
            <button onClick={() => setSuccessMsg('')} className="ml-auto"><X size={14} /></button>
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <i className="ri-error-warning-line text-lg" />
            {errorMsg}
            <button onClick={() => setErrorMsg('')} className="ml-auto"><X size={14} /></button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tema</label>
            <select
              value={filterTopic}
              onChange={e => setFilterTopic(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700"
            >
              <option value="Todos">Todos os temas</option>
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Data da notícia</label>
            <Input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="border-gray-200 text-sm h-9"
            />
          </div>
          <div className="flex items-end">
            <span className="text-xs text-gray-400 py-1.5">
              {filtered.length} artigo(s)
            </span>
          </div>
        </div>

        {/* Inline form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? 'Editar Artigo' : 'Novo Artigo'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Título *</label>
                <Input
                  value={form.title ?? ''}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder="Título da notícia"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Slug</label>
                <Input
                  value={form.slug ?? ''}
                  onChange={e => handleChange('slug', e.target.value)}
                  placeholder="url-amigavel"
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Subtítulo</label>
                <Input
                  value={form.subtitle ?? ''}
                  onChange={e => handleChange('subtitle', e.target.value)}
                  placeholder="Subtítulo (opcional)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Resumo *</label>
                <Textarea
                  value={form.summary ?? ''}
                  onChange={e => handleChange('summary', e.target.value)}
                  placeholder="Parágrafo resumo exibido no card"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Conteúdo completo * (HTML aceito)</label>
                <Textarea
                  value={form.content ?? ''}
                  onChange={e => handleChange('content', e.target.value)}
                  placeholder="<p>Texto completo do artigo...</p>"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">URL da imagem</label>
                <Input
                  value={form.image_url ?? ''}
                  onChange={e => handleChange('image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">URL da fonte original</label>
                <Input
                  value={form.source_url ?? ''}
                  onChange={e => handleChange('source_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Fonte</label>
                <select
                  value={form.source ?? 'DATAGRO'}
                  onChange={e => handleChange('source', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Tema</label>
                <select
                  value={form.topic ?? 'Grãos'}
                  onChange={e => handleChange('topic', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Tags (separadas por vírgula)</label>
                <Input
                  value={form.tags_input ?? ''}
                  onChange={e => handleChange('tags_input', e.target.value)}
                  placeholder="soja, colheita, Mato Grosso"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Autor</label>
                <Input
                  value={form.author ?? ''}
                  onChange={e => handleChange('author', e.target.value)}
                  placeholder="Equipe RE/MAX AGRO"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Data da notícia</label>
                <Input
                  type="date"
                  value={form.news_date ?? '2026-05-29'}
                  onChange={e => handleChange('news_date', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Data da edição</label>
                <Input
                  type="date"
                  value={form.edition_date ?? '2026-05-29'}
                  onChange={e => handleChange('edition_date', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-6 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published ?? true}
                    onChange={e => handleChange('is_published', e.target.checked)}
                    className="w-4 h-4 accent-[#1a2e4a]"
                  />
                  <span className="text-sm text-gray-700 font-medium">Publicado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_highlight ?? false}
                    onChange={e => handleChange('is_highlight', e.target.checked)}
                    className="w-4 h-4 accent-[#C9A55A]"
                  />
                  <span className="text-sm text-gray-700 font-medium">Destaque</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#1a2e4a] hover:bg-[#243d60]"
              >
                <Save size={15} />
                {saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Criar Artigo'}
              </Button>
              <Button
                variant="outline"
                onClick={() => { setShowForm(false); setEditingId(null); }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Articles list */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <i className="ri-loader-4-line text-3xl animate-spin mr-3" />
            <span>Carregando artigos...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <i className="ri-newspaper-line text-5xl mb-3 block" />
            <p>Nenhum artigo encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(art => {
              const topicStyle = getTopicStyle(art.topic);
              return (
                <div
                  key={art.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-sm transition-shadow"
                >
                  {art.image_url && (
                    <img
                      src={art.image_url}
                      alt={art.title}
                      className="w-full sm:w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}>
                        {art.topic}
                      </span>
                      {art.is_highlight && (
                        <Badge className="bg-[#C9A55A] text-white border-0 text-xs">Destaque</Badge>
                      )}
                      <Badge variant={art.is_published ? 'default' : 'secondary'} className="text-xs">
                        {art.is_published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      <span className="text-xs text-gray-400 ml-auto">{formatNewsDate(art.news_date)}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{art.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{art.summary}</p>
                    <p className="text-xs text-gray-400 mt-1">Fonte: {art.source} · Views: {art.view_count}</p>
                  </div>
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(art)}
                      title="Editar"
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#1a2e4a] transition"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => togglePublish(art)}
                      title={art.is_published ? 'Despublicar' : 'Publicar'}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
                    >
                      {art.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      onClick={() => toggleHighlight(art)}
                      title={art.is_highlight ? 'Remover destaque' : 'Destacar'}
                      className={`p-2 rounded-lg transition ${art.is_highlight ? 'text-[#C9A55A] bg-yellow-50' : 'text-gray-400 hover:bg-gray-100 hover:text-[#C9A55A]'}`}
                    >
                      <Star size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      title="Apagar"
                      className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
