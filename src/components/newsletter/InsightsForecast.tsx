import { insights } from "@/mocks/newsletter";

const urgencyConfig: Record<string, { color: string; label: string }> = {
  alta: { color: "bg-red-100 text-red-700 border-red-200", label: "Alta Prioridade" },
  media: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Atenção" },
  evento: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Evento" },
};

export default function InsightsForecast() {
  return (
    <section id="analises" className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-radar-line text-[#C9A84C] text-base"></i>
          </div>
          <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Radar da Próxima Semana</span>
        </div>
        <h2 className="text-[#0F2A1A] text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Insights & O Que Vem Por Aí
        </h2>
        <p className="text-[#5a5a5a] text-sm mt-2">
          Fique à frente do mercado. Prepare-se para os movimentos mais importantes das próximas semanas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const urgency = urgencyConfig[insight.urgency] || urgencyConfig.media;
          return (
            <div
              key={insight.id}
              className="bg-[#F5F0E8] rounded-2xl p-5 border border-[#e8e0d0] hover:border-[#C9A84C]/40 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0F2A1A] flex-shrink-0">
                  <i className={`${insight.icon} text-[#C9A84C] text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${urgency.color}`}>
                      {urgency.label}
                    </span>
                    <span className="text-[#9a9a9a] text-xs flex items-center gap-1">
                      <i className="ri-calendar-line text-xs"></i>
                      {insight.date}
                    </span>
                  </div>
                  <h3 className="text-[#0F2A1A] font-bold text-sm leading-snug mb-2 group-hover:text-[#1A4A2A] transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-[#5a5a5a] text-xs leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-[#0F2A1A] rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Análise Exclusiva DATAGRO</p>
            <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Relatório Completo: Perspectivas do Agro para Q2 2026
            </h3>
            <p className="text-white/60 text-sm max-w-lg">
              Acesse o relatório completo com projeções de safra, análise de preços, mapeamento de oportunidades em terras agrícolas e muito mais. Exclusivo para assinantes.
            </p>
          </div>
          <a
            href="#inscricao"
            className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0F2A1A] font-bold px-6 py-3 rounded-full hover:bg-[#e0bc5a] transition-all duration-200 cursor-pointer text-sm"
          >
            <i className="ri-file-chart-line"></i>
            Acessar Relatório
          </a>
        </div>
      </div>
    </section>
  );
}
