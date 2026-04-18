import { quotations } from "@/mocks/newsletter";

export default function QuotationsPanel() {
  return (
    <section id="cotacoes" className="w-full">
      <div className="bg-[#0F2A1A] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-bar-chart-box-line text-[#C9A84C] text-lg"></i>
              </div>
              <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Painel de Cotações</span>
            </div>
            <h2 className="text-white text-xl md:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Culturas & Mercado Agro
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-white/60 text-xs">Fonte: DATAGRO · Atualizado 18/04/2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quotations.map((q) => (
            <div
              key={q.id}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#C9A84C]/20">
                  <i className={`${q.icon} text-[#C9A84C] text-sm`}></i>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    q.change >= 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  <i className={`text-xs ${q.change >= 0 ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}></i>
                  {Math.abs(q.change)}%
                </span>
              </div>
              <p className="text-white/60 text-xs mb-1">{q.name}</p>
              <p className="text-white font-bold text-base leading-none">{q.value}</p>
              <p className="text-white/40 text-xs mt-1">{q.unit} · {q.region}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            Cotações indicativas. Consulte seu corretor para valores de negociação.
          </p>
          <a
            href="https://portal.datagro.com/pt"
            rel="nofollow"
            target="_blank"
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-[#C9A84C] text-xs font-semibold hover:underline cursor-pointer"
          >
            Ver cotações completas no DATAGRO
            <i className="ri-external-link-line text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
