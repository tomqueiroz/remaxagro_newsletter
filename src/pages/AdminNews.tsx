import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { fetchNewsArticles, saveNewsArticle, deleteNewsArticle, getSession } from '@/lib/adminApi';
import type { NewsArticle } from '@/lib/adminTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

export default function AdminNews() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    summary: '',
    content: '',
    source: '',
    source_url: '',
    image_url: '',
    icon: 'newspaper',
    published: false,
    featured: false,
  });

  useEffect(() => {
    checkAuth();
    loadArticles();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await getSession();
      if (!session) {
        navigate('/admin');
      }
    } catch (error) {
      navigate('/admin');
    }
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsArticles();
      setArticles(data);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setFormData({
      id: article.id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      source: article.source,
      source_url: article.source_url || '',
      image_url: article.image_url || '',
      icon: article.icon || 'newspaper',
      published: article.published,
      featured: article.featured,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      source: '',
      source_url: '',
      image_url: '',
      icon: 'newspaper',
      published: false,
      featured: false,
    });
  };

  const handleSave = async () => {
    try {
      await saveNewsArticle(formData);
      await loadArticles();
      handleCancel();
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
      alert('Erro ao salvar notícia');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;
    
    try {
      await deleteNewsArticle(id);
      await loadArticles();
    } catch (error) {
      console.error('Erro ao excluir notícia:', error);
      alert('Erro ao excluir notícia');
    }
  };

  const iconOptions = [
    { value: 'newspaper', label: 'Jornal' },
    { value: 'trending-up', label: 'Tendência Alta' },
    { value: 'trending-down', label: 'Tendência Baixa' },
    { value: 'alert-circle', label: 'Alerta' },
    { value: 'info', label: 'Informação' },
    { value: 'dollar-sign', label: 'Dólar' },
    { value: 'globe', label: 'Global' },
  ];

  if (loading) {
    return (
      <AdminLayout activePage="noticias">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="noticias">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">CMS de Notícias</h1>
          {!editingId && (
            <Button onClick={() => setEditingId('new')} className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Notícia
            </Button>
          )}
        </div>

        {editingId && (
          <Card className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingId === 'new' ? 'Nova Notícia' : 'Editar Notícia'}
                </h2>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título da notícia"
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Resumo</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Resumo da notícia"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Conteúdo completo da notícia"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="source">Fonte</Label>
                    <Input
                      id="source"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      placeholder="Nome da fonte"
                    />
                  </div>

                  <div>
                    <Label htmlFor="source_url">URL da Fonte</Label>
                    <Input
                      id="source_url"
                      value={formData.source_url}
                      onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="icon">Ícone</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger id="icon">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Publicada</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Destaque</Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="p-6 bg-card border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                    {article.published && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Publicada
                      </Badge>
                    )}
                    {article.featured && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{article.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Fonte: {article.source}</span>
                    <span>•</span>
                    <span>Criada: {new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                    {article.edited_at && (
                      <>
                        <span>•</span>
                        <span>Editada: {new Date(article.edited_at).toLocaleDateString('pt-BR')}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                    className="gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nenhuma notícia cadastrada. Clique em "Nova Notícia" para começar.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}