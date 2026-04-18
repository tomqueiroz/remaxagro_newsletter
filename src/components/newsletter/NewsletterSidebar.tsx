import { sidebarHighlights } from "@/mocks/newsletter";

const agendaItems = [
  { date: "22 Abr", event: "Relatório USDA — Oferta e Demanda Global", type: "Mercado" },
  { date: "23 Abr", event: "Decisão COPOM — Taxa Selic", type: "Economia" },
  { date: "28 Abr", event: "Agrishow 2026 — Ribeirão Preto", type: "Evento" },
  { date: "05 Mai", event: "Divulgação Safra CONAB — Maio", type: "Safra" },
  { date: "12 Mai", event: "Fórum de Investimentos Rurais SP", type: "Evento" },
];

const typeColors: Record<string, string> = {
  Mercado: "bg-amber-100 text-amber-700",
  Economia: "bg-red-100 text-red-700",
  Evento: "bg-emerald-100 text-emerald-700",
  Safra: "bg-[#C9A84C]/20 text-[#8a6a20]",
};

export default function NewsletterSidebar() {
  return (
    <aside className="w-full space-y-6">
      {sidebarHighlights.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl overflow-hidden border border-[#e8e0d0] hover:border-[#C9A84C]/40 transition-all duration-200 cursor-pointer group"
        >
          <div className="relative h-40 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A1A]/70 to-transparent"></div>
            <div className="absolute top-2 left-2">
              <span className={`${item.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                {item.badge}
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
            <h3 className="text-[#0F2A1A] font-bold text-sm leading-snug mb-1">{item.title}</h3>
            <p className="text-[#5a5a5a] text-xs mb-1">{item.subtitle}</p>
            <p className="text-[#7a7a7a] text-xs leading-relaxed">{item.detail}</p>
            <div className="mt-3 flex items-center gap-1 text-[#C9A84C] text-xs font-semibold">
              Saiba mais
              <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform"></i>
            </div>
          </div>
        </div>
      ))}

      {/* Agenda */}
      <div id="agenda" className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden">
        <div className="px-4 py-3 bg-[#0F2A1A] flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-calendar-event-line text-[#C9A84C] text-sm"></i>
          </div>
          <p className="text-white text-xs font-bold uppercase tracking-wider">Agenda Agro</p>
        </div>
        <div className="divide-y divide-[#f0ebe0]">
          {agendaItems.map((item) => (
            <div key={item.event} className="flex items-start gap-3 px-4 py-3 hover:bg-[#FAFAF5] transition-colors cursor-pointer">
              <div className="flex-shrink-0 text-center bg-[#F5F0E8] rounded-lg px-2 py-1 min-w-[44px]">
                <p className="text-[#0F2A1A] text-xs font-bold leading-none">{item.date.split(" ")[0]}</p>
                <p className="text-[#5a5a5a] text-xs">{item.date.split(" ")[1]}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0F2A1A] text-xs font-semibold leading-snug line-clamp-2">{item.event}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] || "bg-gray-100 text-gray-600"}`}>
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agro em Números */}
      <div className="bg-[#0F2A1A] rounded-2xl p-5">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-4">Agro em Números</p>
        <div className="space-y-3">
          {[
            { label: "PIB do Agronegócio 2025", value: "R$ 2,4 tri", icon: "ri-money-dollar-circle-line" },
            { label: "Área Plantada de Soja", value: "45,6 mi ha", icon: "ri-plant-line" },
            { label: "Exportações Agro 2025", value: "US$ 166 bi", icon: "ri-ship-line" },
            { label: "Empregos no Setor", value: "33 milhões", icon: "ri-user-line" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={`${stat.icon} text-[#C9A84C] text-sm`}></i>
                </div>
                <span className="text-white/60 text-xs">{stat.label}</span>
              </div>
              <span className="text-white font-bold text-sm">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Depoimento */}
      <div className="bg-[#F5F0E8] rounded-2xl p-5 border border-[#e8e0d0]">
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map((s) => (
            <i key={s} className="ri-star-fill text-[#C9A84C] text-sm"></i>
          ))}
        </div>
        <p className="text-[#0F2A1A] text-sm italic leading-relaxed mb-3">
          "A newsletter da RE/MAX AGRO é a primeira coisa que leio toda segunda-feira. Informação de qualidade que me ajuda a tomar decisões melhores para minha fazenda."
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0F2A1A] flex items-center justify-center">
            <i className="ri-user-line text-[#C9A84C] text-sm"></i>
          </div>
          <div>
            <p className="text-[#0F2A1A] text-xs font-bold">João Henrique Borges</p>
            <p className="text-[#7a7a7a] text-xs">Proprietário · 8.200 ha · MT</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
