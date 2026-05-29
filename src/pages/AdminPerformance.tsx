import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DateRangeFilter from '@/components/admin/DateRangeFilter';
import { fetchNewsClicks, fetchNewsArticles, getSession } from '@/lib/adminApi';
import type { NewsClick, NewsArticle } from '@/lib/adminTypes';

interface NewsPerformance {
  article: NewsArticle;
  clicks: number;
}

export default function AdminPerformance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [performance, setPerformance] = useState<NewsPerformance[]>([]);
  const [topArticle, setTopArticle] = useState<NewsPerformance | null>(null);
  const [bottomArticle, setBottomArticle] = useState<NewsPerformance | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    loadPerformance();
  }, [dateFrom, dateTo]);

  async function checkAuth() {
    try {
      const session = await getSession();
      if (!session) {
        navigate('/admin');
      }
    } catch (error) {
      navigate('/admin');
    }
  }

  async function loadPerformance() {
    try {
      setLoading(true);
      const [clicks, articles] = await Promise.all([
        fetchNewsClicks(dateFrom, dateTo),
        fetchNewsArticles(),
      ]);

      const clicksByArticle = clicks.reduce((acc, click) => {
        acc[click.news_id] = (acc[click.news_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const performanceData: NewsPerformance[] = articles
        .filter(article => article.published)
        .map(article => ({
          article,
          clicks: clicksByArticle[article.id] || 0,
        }))
        .sort((a, b) => b.clicks - a.clicks);

      setPerformance(performanceData);

      if (performanceData.length > 0) {
        setTopArticle(performanceData[0]);
        setBottomArticle(performanceData[performanceData.length - 1]);
      } else {
        setTopArticle(null);
        setBottomArticle(null);
      }
    } catch (error) {
      console.error('Erro ao carregar performance:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFilter(from: string | null, to: string | null) {
    setDateFrom(from);
    setDateTo(to);
  }

  const maxClicks = performance.length > 0 ? performance[0].clicks : 1;

  return (
    <AdminLayout activePage="performance">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Performance de Notícias</h1>
        </div>

        <DateRangeFilter onFilter={handleFilter} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topArticle && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 uppercase tracking-wide">Maior Desempenho</h3>
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">{topArticle.clicks}</span>
                </div>
                <p className="text-base font-medium text-green-900 dark:text-green-100 line-clamp-2">{topArticle.article.title}</p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-2">cliques no período</p>
              </div>
            )}

            {bottomArticle && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 uppercase tracking-wide">Menor Desempenho</h3>
                  <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{bottomArticle.clicks}</span>
                </div>
                <p className="text-base font-medium text-amber-900 dark:text-amber-100 line-clamp-2">{bottomArticle.article.title}</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">cliques no período</p>
              </div>
            )}
          </div>
        )}

        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Todas as Notícias</h2>
            <p className="text-sm text-muted-foreground">Ordenadas por número de cliques</p>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : performance.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p>Nenhuma notícia publicada encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Posição</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Título</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fonte</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cliques</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {performance.map((item, index) => {
                    const percentage = maxClicks > 0 ? (item.clicks / maxClicks) * 100 : 0;
                    return (
                      <tr key={item.article.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-md">
                            <p className="font-medium text-foreground line-clamp-2">{item.article.title}</p>
                            {item.article.featured && (
                              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded">Destaque</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-muted-foreground">{item.article.source}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-foreground">{item.clicks}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-full max-w-xs">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground w-12 text-right">{percentage.toFixed(0)}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
