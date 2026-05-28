import { allNews } from "@/mocks/newsletter";

const mainNews = allNews.slice(0, 6);
const secondaryNews = allNews.slice(6);

// Ícone de fonte mapeado para cada domínio
function SourceBadge({ source }: { source: string }) {
  const isDatagro = source === "DATAGRO";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
        isDatagro
          ? "bg-[#0F2A1A]/10 text-[#0F2A1A]"
          : "bg-[#1a2e4a]/10 text-[#1a2e4a]"
      }`}
    >
      <i className={isDatagro ? "ri-bar-chart-2-line" : "ri-newspaper-line"} />
      {source}
    </span>
  );
}

export default function NewsHighlights() {
  return (
    <section id="destaques" className="w-full">

      {/* ── Cabeçalho da seção ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#C9A84C] text-[#0F2A1A] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Última Semana
            </span>
            <span className="text-[#9a9a9a] text-xs font-medium">
              27 – 30 Abr 2026
            </span>
          </div>
          <h2
            className="text-[#0F2A1A] text-2xl md:text-3xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Principais Notícias do Agro
          </h2>
          <p className="text-[#5a6a5a] text-sm mt-1">
            Curadoria DATAGRO · UAGro — links diretos para as fontes originais
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[#9a9a9a] text-xs">
          <i className="ri-links-line" />
          <span>Todos os links redirecionam para a notícia original</span>
        </div>
      </div>

      {/* ── Cards em destaque (top 6, com imagem) ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {mainNews.map((news, idx) => (
          <a
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden border border-[#e8e0d0] hover:border-[#C9A84C]/60 hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Imagem */}
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading={idx < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Badge DESTAQUE */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 bg-[#C9A84C] text-[#0F2A1A] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  <i className="ri-star-fill text-[9px]" />
                  Destaque
                </span>
              </div>
              {/* Data sobre imagem */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-white/80 text-xs flex items-center gap-1">
                  <i className="ri-calendar-line text-[11px]" />
                  {news.dateLabel}
                </span>
                <SourceBadge source={news.source} />
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex flex-col flex-1">
              {/* Ícone temático + título */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F0E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className={`${news.icon} text-[#C9A84C] text-base`} />
                </div>
                <h3 className="text-[#0F2A1A] font-bold text-[15px] leading-snug group-hover:text-[#1a4a2a] transition-colors line-clamp-3">
                  {news.title}
                </h3>
              </div>

              {/* Resumo */}
              <p className="text-[#5a6a5a] text-[13px] leading-relaxed line-clamp-3 flex-1 mb-4">
                {news.summary}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-[#f0ebe0]">
                <span className="text-[#9a9a9a] text-xs flex items-center gap-1">
                  <i className="ri-external-link-line text-[11px]" />
                  Fonte: {news.source}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#0F2A1A] text-white text-xs font-bold px-4 py-1.5 rounded-full group-hover:bg-[#C9A84C] group-hover:text-[#0F2A1A] transition-all duration-200">
                  Saiba mais
                  <i className="ri-arrow-right-line text-[11px] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Mais Notícias da Semana ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden shadow-sm">
        {/* Cabeçalho */}
        <div className="px-6 py-4 bg-[#0F2A1A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-newspaper-line text-[#C9A84C] text-lg" />
            <p className="text-white text-sm font-bold uppercase tracking-widest">
              Mais Notícias da Semana
            </p>
          </div>
          <span className="text-white/50 text-xs">
            {secondaryNews.length} notícias
          </span>
        </div>

        {/* Lista */}
        <div className="divide-y divide-[#f0ebe0]">
          {secondaryNews.map((news) => (
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFAF5] transition-colors group"
            >
              {/* Ícone temático */}
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F5F0E8] group-hover:bg-[#C9A84C]/20 transition-colors flex-shrink-0">
                <i className={`${news.icon} text-[#C9A84C] text-sm`} />
              </div>

              {/* Título */}
              <div className="flex-1 min-w-0">
                <p className="text-[#0F2A1A] text-[13px] font-semibold leading-snug group-hover:text-[#1a4a2a] transition-colors line-clamp-2">
                  {news.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#9a9a9a] text-[11px] flex items-center gap-1">
                    <i className="ri-calendar-line text-[10px]" />
                    {news.dateLabel}
                  </span>
                  <span className="text-[#9a9a9a] text-[10px]">·</span>
                  <span className="text-[#9a9a9a] text-[11px]">
                    {news.source}
                  </span>
                </div>
              </div>

              {/* Botão saiba mais */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1 text-[#C9A84C] text-[11px] font-bold border border-[#C9A84C]/30 px-3 py-1.5 rounded-full group-hover:bg-[#C9A84C] group-hover:text-[#0F2A1A] group-hover:border-[#C9A84C] transition-all duration-200 whitespace-nowrap">
                  Saiba mais
                  <i className="ri-external-link-line text-[10px]" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Rodapé da lista */}
        <div className="px-5 py-3 bg-[#F9F6F0] border-t border-[#e8e0d0] flex items-center gap-2">
          <i className="ri-information-line text-[#C9A84C] text-sm" />
          <p className="text-[#9a9a9a] text-xs">
            Curadoria semanal DATAGRO &amp; UAGro. Todos os links redirecionam para as matérias originais nas fontes indicadas.
          </p>
        </div>
      </div>
    </section>
  );
}
