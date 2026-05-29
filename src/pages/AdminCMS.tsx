import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { fetchAllArticlesAdmin, updateArticle, deleteArticle, insertArticle } from '@/hooks/useCmsArticles';
import { CmsArticle, getTopicColor, getTopicIcon, formatNewsDate } from '@/lib/cmsTypes';
import { supabase } from '@/integrations/supabase/client';

// ── Auth guard ────────────────────────────────────────────────────────────────
function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
    });
  }, []);
  return authed;
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
interface EditModalProps {
  article: Partial<CmsArticle>;
  onClose: () => void;
  onSave: (a: Partial<CmsArticle>) => void;
}

function EditModal({ article, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<Partial<CmsArticle>>({ ...article });
  const set = (field: keyof CmsArticle, val: unknown) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  return (
    <div
      className="fixed inset-0 z-[400] bg-black/60 flex items-start justify-center p-4 pt-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a2e4a]">
            {form.id ? 'Editar Notícia' : 'Nova Notícia'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <i className="ri-close-line text-xl" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Título *</label>
            <input
              value={form.title || ''}
              onChange={(e) => set('title', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Subtítulo</label>
            <input
              value={form.subtitle || ''}
              onChange={(e) => set('subtitle', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Resumo *</label>
            <textarea
              rows={2}
              value={form.summary || ''}
              onChange={(e) => set('summary', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Conteúdo (HTML) *</label>
            <textarea
              rows={6}
              value={form.content || ''}
              onChange={(e) => set('content', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 resize-y"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Fonte</label>
              <input
                value={form.source || ''}
                onChange={(e) => set('source', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">URL da Fonte</label>
              <input
                value={form.source_url || ''}
                onChange={(e) => set('source_url', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tópico</label>
              <select
                value={form.topic || ''}
                onChange={(e) => set('topic', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
              >
                {['Grãos','Pecuária','Biocombustíveis','Café','Outras Culturas','Política Agrícola','Agroeconomia','Tecnologia','Insumos','Maquinário'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Data da Notícia</label>
              <input
                type="date"
                value={form.news_date || ''}
                onChange={(e) => set('news_date', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL da Imagem</label>
            <input
              value={form.image_url || ''}
              onChange={(e) => set('image_url', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tags (separadas por vírgula)</label>
            <input
              value={(form.tags || []).join(', ')}
              onChange={(e) => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.is_highlight}
                onChange={(e) => set('is_highlight', e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700">Destaque</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.is_published}
                onChange={(e) => set('is_published', e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700">Publicado</span>
            </label>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 text-sm font-bold text-white bg-[#1a2e4a] rounded-lg hover:bg-[#2d4a6e] transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminCMS() {
  const authed = useAdminAuth();
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Partial<CmsArticle> | null>(null);
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (authed === false) {
      window.location.hash = '/admin';
    }
  }, [authed]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllArticlesAdmin();
      setArticles(data);
    } catch {
      setMsg({ type: 'error', text: 'Erro ao carregar artigos.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  };

  const handleSave = async (form: Partial<CmsArticle>) => {
    try {
      if (form.id) {
        await updateArticle(form.id, form);
        showMsg('success', 'Artigo atualizado com sucesso!');
      } else {
        const slug = (form.title || 'artigo')
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 80);
        await insertArticle({
          slug,
          title: form.title || '',
          subtitle: form.subtitle || '',
          summary: form.summary || '',
          content: form.content || '',
          image_url: form.image_url || '',
          source: form.source || '',
          source_url: form.source_url || '',
          topic: form.topic || 'Grãos',
          tags: form.tags || [],
          edition_date: form.edition_date || '2026-05-29',
          news_date: form.news_date || '2026-05-29',
          is_highlight: form.is_highlight || false,
          is_published: form.is_published !== undefined ? form.is_published : true,
          author: form.author || 'Equipe RE/MAX AGRO',
        });
        showMsg('success', 'Artigo criado com sucesso!');
      }
      setEditingArticle(null);
      load();
    } catch (err) {
      showMsg('error', 'Erro ao salvar. Verifique os campos e tente novamente.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await deleteArticle(id);
      showMsg('success', 'Artigo excluído.');
      load();
    } catch {
      showMsg('error', 'Erro ao excluir artigo.');
    }
  };

  const filtered = articles.filter((a) =>
    !filter ||
    a.title.toLowerCase().includes(filter.toLowerCase()) ||
    a.topic.toLowerCase().includes(filter.toLowerCase()) ||
    a.source.toLowerCase().includes(filter.toLowerCase())
  );

  if (authed === null || loading) {
    return (
      <AdminLayout activePage="cms">
        <div className="flex items-center justify-center h-64 text-gray-400">
          <i className="ri-loader-4-line animate-spin text-2xl mr-2" />
          Carregando...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="cms">
      {/* Toast */}
      {msg && (
        <div className={`fixed top-5 right-5 z-[500] px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          msg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <i className={msg.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} />
          {msg.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">CMS — Notícias</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {articles.length} artigos na edição 29/Mai/2026
          </p>
        </div>
        <button
          onClick={() => setEditingArticle({
            is_published: true,
            is_highlight: false,
            edition_date: '2026-05-29',
            news_date: '2026-05-29',
            topic: 'Grãos',
            tags: [],
            author: 'Equipe RE/MAX AGRO',
          })}
          className="inline-flex items-center gap-2 bg-[#1a2e4a] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#2d4a6e] transition-colors"
        >
          <i className="ri-add-line" />
          Nova Notícia
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por título, tópico ou fonte..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-10">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Título</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Tópico</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Fonte</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden xl:table-cell">Data</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((a, idx) => {
                const topicColor = getTopicColor(a.topic);
                const topicIcon = getTopicIcon(a.topic);
                return (
                  <tr key={a.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        {a.image_url && (
                          <img src={a.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 leading-snug line-clamp-2">{a.title}</p>
                          {a.is_highlight && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-[#d4a847] font-bold mt-0.5">
                              <i className="ri-star-fill" /> DESTAQUE
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${topicColor}`}>
                        <i className={topicIcon} />
                        {a.topic}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">{a.source}</td>
                    <td className="px-4 py-3 hidden xl:table-cell text-xs text-gray-500">
                      {formatNewsDate(a.news_date)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {a.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingArticle(a)}
                          className="text-gray-400 hover:text-[#1a2e4a] transition-colors"
                          title="Editar"
                        >
                          <i className="ri-edit-line text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id, a.title)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Excluir"
                        >
                          <i className="ri-delete-bin-line text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    <i className="ri-newspaper-line text-3xl mb-2 opacity-30 block" />
                    Nenhuma notícia encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editingArticle && (
        <EditModal
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
