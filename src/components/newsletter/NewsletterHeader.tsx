import { useState } from "react";

const navItems = [
  { label: "Destaques", href: "#destaques" },
  { label: "Cotações", href: "#cotacoes" },
  { label: "Mercado de Terras", href: "#mercado" },
  { label: "Análises DATAGRO", href: "#analises" },
  { label: "Agenda Agro", href: "#agenda" },
  { label: "Fale com Especialista", href: "#especialistas" },
];

export default function NewsletterHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date();
  const formatted = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full">
      {/* Top bar branco */}
      <div className="bg-white border-b border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-color.png"
              alt="RE/MAX Commercial Divisão Agro powered by DATAGRO"
              className="h-14 md:h-16 object-contain"
            />
            <div className="border-l border-[#CC0000]/30 pl-3">
              <p className="text-[#CC0000] text-xs font-semibold tracking-widest uppercase">Newsletter Semanal</p>
              <p className="text-[#1a2e4a]/60 text-xs mt-0.5">Edição Nº 001 · Segunda-feira</p>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-[#1a2e4a] text-xs font-semibold capitalize">{formatted}</p>
            <p className="text-[#1a2e4a]/50 text-xs mt-0.5">Curadoria exclusiva para o Agro Estratégico</p>
          </div>

          <button
            className="md:hidden text-[#1a2e4a] w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <i className={`text-xl ${mobileMenuOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>
      </div>

      {/* Nav bar azul escuro */}
      <nav className="bg-[#1a2e4a] w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <div className="ml-auto">
              <a
                href="#inscricao"
                className="whitespace-nowrap px-5 py-2 bg-[#CC0000] text-white text-xs font-bold rounded-full hover:bg-[#e60000] transition-all duration-200 cursor-pointer"
              >
                Inscreva-se Grátis
              </a>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#inscricao"
                className="mt-2 mx-4 py-2.5 bg-[#CC0000] text-white text-sm font-bold rounded-full text-center cursor-pointer"
              >
                Inscreva-se Grátis
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Breaking ticker vermelho */}
      <div className="bg-[#CC0000] w-full overflow-hidden">
        <div className="flex items-center">
          <span className="bg-[#1a2e4a] text-white text-xs font-bold px-4 py-1.5 whitespace-nowrap flex-shrink-0">
            AGRO EM TEMPO REAL
          </span>
          <div className="overflow-hidden flex-1">
            <div
              className="flex whitespace-nowrap"
              style={{ animation: "ticker 35s linear infinite" }}
            >
              <span className="text-white text-xs font-semibold px-8 py-1.5">
                🌱 Soja MT: R$ 142,80/sc · 📈 Boi Gordo SP: R$ 312,00/@ · ☕ Café MG: R$ 1.840,00/sc · 🌽 Milho PR: R$ 68,50/sc · 🌾 Trigo RS: R$ 89,20/sc · 💰 Dólar: R$ 5,72 · 📊 IBOVESPA: 132.450 pts · 🌱 Soja MT: R$ 142,80/sc · 📈 Boi Gordo SP: R$ 312,00/@ · ☕ Café MG: R$ 1.840,00/sc · 🌽 Milho PR: R$ 68,50/sc · 🌾 Trigo RS: R$ 89,20/sc
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
