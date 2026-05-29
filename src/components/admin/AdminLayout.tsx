import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Newspaper, Users, Eye, TrendingUp, LogOut, BookOpen } from 'lucide-react';
import { signOut } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

export default function AdminLayout({ children, activePage }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'cms', label: 'CMS Newsletter', icon: BookOpen, path: '/admin/cms' },
    { id: 'noticias', label: 'Notícias (legacy)', icon: Newspaper, path: '/admin/noticias' },
    { id: 'leads', label: 'Leads', icon: Users, path: '/admin/leads' },
    { id: 'acessos', label: 'Acessos', icon: Eye, path: '/admin/acessos' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, path: '/admin/performance' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a2e4a] p-4 flex items-center justify-between">
        <img src="/logo-color.png" alt="RE/MAX AGRO" className="w-32" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a2e4a] text-white z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 hidden lg:block">
            <img src="/logo-color.png" alt="RE/MAX AGRO" className="w-32" />
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 mt-16 lg:mt-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-accent text-accent-foreground font-semibold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 min-h-screen pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
