import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DateRangeFilter from '@/components/admin/DateRangeFilter';
import { fetchLeads, getSession } from '@/lib/adminApi';
import type { Lead } from '@/lib/adminTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadLeads();
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm]);

  async function checkAuth() {
    try {
      const session = await getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      await loadLeads();
    } catch (error) {
      navigate('/admin');
    }
  }

  async function loadLeads() {
    try {
      setLoading(true);
      const data = await fetchLeads(dateFrom, dateTo);
      setLeads(data);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterLeads() {
    if (!searchTerm.trim()) {
      setFilteredLeads(leads);
      setCurrentPage(1);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term)
    );
    setFilteredLeads(filtered);
    setCurrentPage(1);
  }

  function handleDateFilter(from: string | null, to: string | null) {
    setDateFrom(from);
    setDateTo(to);
  }

  function exportToCSV() {
    const headers = ['Nome', 'Email', 'WhatsApp', 'Fonte', 'Data'];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.whatsapp,
      lead.source,
      new Date(lead.created_at).toLocaleString('pt-BR'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'formulario': 'bg-primary text-primary-foreground',
      'newsletter': 'bg-accent text-accent-foreground',
      'whatsapp': 'bg-chart-4 text-white',
      'telefone': 'bg-chart-2 text-white',
    };
    return colors[source.toLowerCase()] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <AdminLayout activePage="leads">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Gestão de Leads</h1>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DateRangeFilter onFilter={handleDateFilter} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum lead encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.whatsapp}</TableCell>
                        <TableCell>
                          <Badge className={getSourceColor(lead.source)}>
                            {lead.source}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(lead.created_at).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredLeads.length)} de{' '}
                  {filteredLeads.length} leads
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}