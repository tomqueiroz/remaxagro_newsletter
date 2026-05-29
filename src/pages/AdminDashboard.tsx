import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import DateRangeFilter from '@/components/admin/DateRangeFilter';
import { fetchLeads, fetchPageViews, fetchNewsClicks, fetchNewsArticles, getSession } from '@/lib/adminApi';
import type { Lead, PageView, NewsClick, NewsArticle } from '@/lib/adminTypes';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [newsClicks, setNewsClicks] = useState<NewsClick[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    loadData();
  }, [dateFrom, dateTo]);

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

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, viewsData, clicksData, articlesData] = await Promise.all([
        fetchLeads(dateFrom, dateTo),
        fetchPageViews(dateFrom, dateTo),
        fetchNewsClicks(dateFrom, dateTo),
        fetchNewsArticles(),
      ]);
      setLeads(leadsData);
      setPageViews(viewsData);
      setNewsClicks(clicksData);
      setNewsArticles(articlesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (from: string | null, to: string | null) => {
    setDateFrom(from);
    setDateTo(to);
  };

  const getTodayViews = () => {
    const today = new Date().toISOString().split('T')[0];
    return pageViews.filter(view => view.created_at.startsWith(today)).length;
  };

  const getWeekClicks = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return newsClicks.filter(click => new Date(click.created_at) >= weekAgo).length;
  };

  const getLast7DaysLeads = () => {
    const days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = leads.filter(lead => lead.created_at.startsWith(dateStr)).length;
      days.push({ date: dateStr, count });
    }
    return days;
  };

  const getTopNews = () => {
    const clickCounts = newsClicks.reduce((acc, click) => {
      acc[click.news_id] = (acc[click.news_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return newsArticles
      .map(article => ({
        ...article,
        clicks: clickCounts[article.id] || 0,
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
  };

  const last7DaysLeads = getLast7DaysLeads();
  const maxLeads = Math.max(...last7DaysLeads.map(d => d.count), 1);
  const topNews = getTopNews();

  if (loading) {
    return (
      <AdminLayout activePage="dashboard">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="dashboard">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <DateRangeFilter onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Leads"
            value={leads.length}
            icon="users"
            subtitle="Todos os períodos"
            color="primary"
          />
          <StatsCard
            title="Visitas Hoje"
            value={getTodayViews()}
            icon="eye"
            subtitle="Acessos únicos"
            color="success"
          />
          <StatsCard
            title="Cliques (7 dias)"
            value={getWeekClicks()}
            icon="mouse-pointer"
            subtitle="Notícias clicadas"
            color="warning"
          />
          <StatsCard
            title="Notícias"
            value={newsArticles.length}
            icon="newspaper"
            subtitle="Total publicadas"
            color="primary"
          />
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Leads por Dia (Últimos 7 dias)</h2>
          <div className="space-y-3">
            {last7DaysLeads.map(day => (
              <div key={day.date} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-24">
                  {new Date(day.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </span>
                <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-primary h-full flex items-center justify-end px-3 text-primary-foreground text-sm font-medium transition-all"
                    style={{ width: `${(day.count / maxLeads) * 100}%` }}
                  >
                    {day.count > 0 && day.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Últimos 10 Leads</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">WhatsApp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fonte</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 10).map(lead => (
                  <tr key={lead.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm text-foreground">{lead.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.email}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.whatsapp}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Top 5 Notícias Mais Clicadas</h2>
          <div className="space-y-3">
            {topNews.map((article, index) => (
              <div key={article.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                  <p className="text-xs text-muted-foreground">{article.source}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-lg font-bold text-primary">{article.clicks}</p>
                  <p className="text-xs text-muted-foreground">cliques</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}