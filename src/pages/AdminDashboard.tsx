import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [newsClicks, setNewsClicks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("leads");

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: leadsData } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (leadsData) setLeads(leadsData);

      const { data: clicksData } = await supabase
        .from("news_clicks")
        .select("news_id, news_title, count")
        .select("*");
      
      if (clicksData) {
        // Aggregate clicks by news_id
        const aggregated = clicksData.reduce((acc: any, curr: any) => {
          if (!acc[curr.news_id]) {
            acc[curr.news_id] = { id: curr.news_id, title: curr.news_title, clicks: 0 };
          }
          acc[curr.news_id].clicks += 1;
          return acc;
        }, {});
        
        setNewsClicks(Object.values(aggregated).sort((a: any, b: any) => b.clicks - a.clicks));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#0F2A1A] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/images/logo-white.png" alt="RE/MAX AGRO" className="h-8" />
          <span className="font-bold text-lg border-l border-white/20 pl-4">Dashboard</span>
        </div>
        <button onClick={handleLogout} className="text-sm hover:text-[#C9A84C] transition-colors">
          Sair <i className="ri-logout-box-r-line ml-1"></i>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total de Leads</h3>
            <p className="text-3xl font-bold text-[#0F2A1A]">{leads.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Cliques em Notícias</h3>
            <p className="text-3xl font-bold text-[#0F2A1A]">
              {newsClicks.reduce((acc, curr) => acc + curr.clicks, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'leads' ? 'text-[#0F2A1A] border-b-2 border-[#C9A84C]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('leads')}
            >
              Leads Coletados
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'news' ? 'text-[#0F2A1A] border-b-2 border-[#C9A84C]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('news')}
            >
              Performance de Notícias
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'leads' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-medium rounded-tl-lg">Data</th>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">E-mail</th>
                      <th className="px-4 py-3 font-medium">WhatsApp</th>
                      <th className="px-4 py-3 font-medium rounded-tr-lg">Origem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-600">{lead.whatsapp || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {lead.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          Nenhum lead coletado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-medium rounded-tl-lg">Notícia</th>
                      <th className="px-4 py-3 font-medium text-right rounded-tr-lg">Cliques</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {newsClicks.map((news) => (
                      <tr key={news.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{news.title}</td>
                        <td className="px-4 py-3 text-right font-bold text-[#0F2A1A]">{news.clicks}</td>
                      </tr>
                    ))}
                    {newsClicks.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                          Nenhum clique registrado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
