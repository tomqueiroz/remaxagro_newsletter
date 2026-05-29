import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPageViews, getSession } from '@/lib/adminApi';
import type { PageView } from '@/lib/adminTypes';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import DateRangeFilter from '@/components/admin/DateRangeFilter';
import { Eye } from 'lucide-react';

export default function AdminViews() {
  const navigate = useNavigate();
  const [views, setViews] = useState<PageView[]>([]);
  const [filteredViews, setFilteredViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const itemsPerPage = 20;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadViews();
    }
  }, [dateFrom, dateTo]);

  const checkAuth = async () => {
    try {
      const session = await getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      await loadViews();
    } catch (error) {
      navigate('/admin');
    }
  };

  const loadViews = async () => {
    try {
      setLoading(true);
      const data = await fetchPageViews(dateFrom, dateTo);
      setViews(data);
      setFilteredViews(data);
    } catch (error) {
      console.error('Erro ao carregar acessos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (from: string | null, to: string | null) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
  };

  const getDeviceType = (userAgent?: string): string => {
    if (!userAgent) return 'Desconhecido';
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  const getDailyViews = () => {
    const dailyMap = new Map<string, number>();
    filteredViews.forEach(view => {
      const date = new Date(view.created_at).toLocaleDateString('pt-BR');
      dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
    });
    return Array.from(dailyMap.entries())
      .sort((a, b) => new Date(a[0].split('/').reverse().join('-')).getTime() - new Date(b[0].split('/').reverse().join('-')).getTime())
      .slice(-7);
  };

  const dailyViews = getDailyViews();
  const maxDailyViews = Math.max(...dailyViews.map(d => d[1]), 1);

  const totalPages = Math.ceil(filteredViews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedViews = filteredViews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout activePage="acessos">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Histórico de Acessos</h1>
        </div>

        <DateRangeFilter onFilter={handleFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Visitas"
            value={filteredViews.length}
            icon="eye"
            subtitle={dateFrom || dateTo ? 'Período filtrado' : 'Todos os registros'}
            color="primary"
          />
        </div>

        {loading ? (
          <div className="bg-card rounded-lg p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Carregando acessos...</p>
          </div>
        ) : (
          <>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Visitas por Dia (Últimos 7 dias)</h2>
              <div className="space-y-3">
                {dailyViews.map(([date, count]) => (
                  <div key={date} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">{date}</div>
                    <div className="flex-1 bg-muted rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300 flex items-center justify-end pr-3"
                        style={{ width: `${(count / maxDailyViews) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-primary-foreground">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Data/Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Caminho
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Referrer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Dispositivo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedViews.map((view) => (
                      <tr key={view.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {new Date(view.created_at).toLocaleString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          <code className="bg-muted px-2 py-1 rounded text-xs">{view.path}</code>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {view.referrer ? (
                            <span className="truncate block max-w-xs" title={view.referrer}>
                              {view.referrer}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/50">Direto</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              getDeviceType(view.user_agent) === 'Mobile'
                                ? 'bg-accent/10 text-accent'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {getDeviceType(view.user_agent)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredViews.length)} de {filteredViews.length} registros
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .map((page, idx, arr) => (
                          <div key={page} className="flex items-center gap-2">
                            {idx > 0 && arr[idx - 1] !== page - 1 && (
                              <span className="text-muted-foreground">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                currentPage === page
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground hover:bg-muted/80'
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}