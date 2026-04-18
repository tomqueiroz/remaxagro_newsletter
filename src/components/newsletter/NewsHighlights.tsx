import { mainNews, secondaryNews } from "@/mocks/newsletter";

export default function NewsHighlights() {
  return (
    <section id="destaques" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#C9A84C] text-[#0F2A1A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Últimos 7 Dias
            </span>
          </div>
          <h2 className="text-[#0F2A1A] text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Principais Movimentos do Agro
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[#C9A84C] text-sm font-semibold cursor-pointer hover:underline">
          Ver todas as notícias
          <i className="ri-arrow-right-line"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {mainNews.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e8e0d0] hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A1A]/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="bg-[#C9A84C] text-[#0F2A1A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {news.category}
                </span>
              </div>
              {news.tag && (
                <div className="absolute top-3 right-3">
                  <span className="bg-[#0F2A1A]/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {news.tag}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-[#0F2A1A] font-bold text-base leading-snug mb-2 group-hover:text-[#1A4A2A] transition-colors">
                {news.title}
              </h3>
              <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4 line-clamp-2">
                {news.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#9a9a9a] text-xs">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {news.readTime} de leitura
                  </span>
                </div>
                <span className="text-[#C9A84C] text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leia mais
                  <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden">
        <div className="px-5 py-3 bg-[#F5F0E8] border-b border-[#e8e0d0]">
          <p className="text-[#0F2A1A] text-xs font-bold uppercase tracking-wider">Mais Notícias da Semana</p>
        </div>
        <div className="divide-y divide-[#f0ebe0]">
          {secondaryNews.map((news) => (
            <div
              key={news.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFAF5] transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#C9A84C]/10 flex-shrink-0">
                <i className="ri-article-line text-[#C9A84C] text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider block mb-0.5">
                  {news.category}
                </span>
                <p className="text-[#0F2A1A] text-sm font-semibold leading-snug group-hover:text-[#1A4A2A] transition-colors line-clamp-1">
                  {news.title}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[#9a9a9a] text-xs hidden sm:block">{news.date}</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-[#C9A84C] text-base group-hover:translate-x-0.5 transition-transform"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
