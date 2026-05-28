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
              Commodities Agro — Cotações da Semana
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-white/60 text-xs">Fonte: DATAGRO · Data de coleta: 29/05/2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quotations.map((q) => (
            <div
              key={q.id}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-200 group flex flex-col gap-2"
            >
              {/* Cabeçalho: ícone + badge variação */}
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#C9A84C]/20 flex-shrink-0">
                  <i className={`${q.icon} text-[#C9A84C] text-sm`}></i>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    q.change > 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : q.change < 0
                      ? "bg-red-500/20 text-red-400"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {q.change !== 0 && (
                    <i className={`text-xs ${q.change > 0 ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}></i>
                  )}
                  {q.change === 0 ? "—" : `${Math.abs(q.change)}%`}
                </span>
              </div>

              {/* Nome do produto */}
              <p className="text-[#C9A84C] text-xs font-bold leading-none">{q.name}</p>

              {/* Valor */}
              <p className="text-white font-extrabold text-lg leading-none">
                {q.value} <span className="text-white/50 text-xs font-normal">{q.unit}</span>
              </p>

              {/* Descrição */}
              <p className="text-white/40 text-[10px] leading-snug">{q.description}</p>

              {/* Unidade de medida */}
              <div className="mt-auto pt-2 border-t border-white/10">
                <p className="text-white/30 text-[10px] leading-snug italic">{q.unitLabel}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-white/30 text-xs italic">
            Valores indicativos para referência.
          </p>
          <a
            href="https://portal.datagro.com/pt"
            rel="nofollow"
            target="_blank"
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-[#C9A84C] text-xs font-semibold hover:underline cursor-pointer flex-shrink-0"
          >
            Ver cotações completas no DATAGRO
            <i className="ri-external-link-line text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
