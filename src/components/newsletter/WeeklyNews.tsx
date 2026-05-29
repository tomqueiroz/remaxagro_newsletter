import { useState, useEffect, useCallback } from "react";
import { weekNewsItems, dayGroups, getNewsByDay, WeekNewsItem } from "@/mocks/weekNews";
import { IMAGES } from "@/assets/images";

// ---------- helpers ----------
const tagColors: Record<string, string> = {
  "Etanol": "bg-green-100 text-green-800",
  "Biocombustíveis": "bg-emerald-100 text-emerald-800",
  "CNPE": "bg-blue-100 text-blue-800",
  "Milho": "bg-yellow-100 text-yellow-800",
  "Safrinha": "bg-orange-100 text-orange-800",
  "Mato Grosso": "bg-lime-100 text-lime-800",
  "Carne Bovina": "bg-red-100 text-red-800",
  "China": "bg-rose-100 text-rose-800",
  "Exportação": "bg-indigo-100 text-indigo-800",
  "Soja": "bg-amber-100 text-amber-800",
  "default": "bg-gray-100 text-gray-700",
};

function getTagColor(tag: string): string {
  return tagColors[tag] || tagColors["default"];
}

// ---------- Modal ----------
interface NewsModalProps {
  news: WeekNewsItem;
  onClose: () => void;
}

function NewsModal({ news, onClose }: NewsModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 rounded-t-2xl overflow-hidden">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Fechar"
          >
            <i className="ri-close-line text-lg" />
          </button>
          <div className="absolute bottom-3 left-4 flex gap-2 flex-wrap">
            {news.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium bg-white/20 text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line" />
              {news.dateLabel}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1 font-medium text-[#1a2e4a]">
              <i className="ri-global-line" />
              {news.source}
            </span>
          </div>

          <h2 className="text-xl font-bold text-[#1a2e4a] mb-4 leading-snug">{news.title}</h2>

          <p className="text-base text-gray-700 font-medium leading-relaxed mb-5 border-l-4 border-[#d4a847] pl-4 bg-amber-50/50 py-2 rounded-r-lg">
            {news.summary}
          </p>

          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed [&_p]:mb-4 [&_strong]:text-[#1a2e4a] [&_p]:text-base"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-gray-400">
              Fonte: <span className="font-semibold text-gray-600">{news.source}</span>
            </p>
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#1a2e4a] hover:bg-[#2d4a6e] px-4 py-2 rounded-lg transition-colors"
            >
              <i className="ri-external-link-line" />
              Ver matéria original
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Card ----------
interface NewsCardProps {
  news: WeekNewsItem;
  onSelect: (news: WeekNewsItem) => void;
}

function NewsCard({ news, onSelect }: NewsCardProps) {
  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 flex flex-col"
      onClick={() => onSelect(news)}
    >
      {/* Imagem */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-[#d4a847] text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            <i className={`${news.icon} text-sm`} />
            DESTAQUE
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xs text-white/80 font-medium">{news.dateLabel} · {news.source}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-[#1a2e4a] leading-snug mb-2 group-hover:text-[#2d4a6e] transition-colors line-clamp-3">
          {news.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
          {news.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3 mb-3">
          {news.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        <button className="mt-auto w-full text-xs font-semibold text-[#1a2e4a] border border-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white rounded-lg py-2 transition-colors flex items-center justify-center gap-1">
          <i className="ri-article-line" />
          Leia mais
        </button>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function WeeklyNews() {
  const [activeDay, setActiveDay] = useState<string>(dayGroups[0]);
  const [selectedNews, setSelectedNews] = useState<WeekNewsItem | null>(null);
  const currentNews = getNewsByDay(activeDay);

  const handleSelect = useCallback((news: WeekNewsItem) => {
    setSelectedNews(news);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedNews(null);
  }, []);

  return (
    <section>
      {/* Cabeçalho da seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-6 rounded-full bg-[#d4a847]" />
            <span className="text-xs font-bold tracking-widest text-[#d4a847] uppercase">Semana do Agro</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2e4a] leading-tight">
            Notícias da Semana
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            25 – 29 Mai 2026 · Curadoria DATAGRO × RE/MAX AGRO
          </p>
        </div>

        {/* Abas de dias */}
        <div className="flex gap-2 flex-wrap">
          {dayGroups.map((day) => {
            const count = getNewsByDay(day).length;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeDay === day
                    ? "bg-[#1a2e4a] text-white border-[#1a2e4a] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1a2e4a] hover:text-[#1a2e4a]"
                }`}
              >
                {day}
                <span className={`ml-1.5 text-xs rounded-full px-1.5 py-0.5 font-bold ${
                  activeDay === day ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentNews.map((news) => (
          <NewsCard key={news.id} news={news} onSelect={handleSelect} />
        ))}
      </div>

      {/* CTA rodapé */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          <i className="ri-information-line mr-1" />
          Notícias curadas por DATAGRO e RE/MAX AGRO · Edição 29/Mai/2026
        </p>
      </div>

      {/* Modal / Pop-up CMS */}
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={handleClose} />
      )}
    </section>
  );
}
