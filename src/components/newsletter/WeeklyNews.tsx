import { useState, useEffect } from "react";
import { weekNewsItems, dayGroups, getNewsByDay, type WeekNewsItem } from "@/mocks/weekNews";

// ─── Modal de conteúdo completo ────────────────────────────────────────────
function NewsModal({ news, onClose }: { news: WeekNewsItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={news.title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <article className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col z-10">
        {/* Imagem hero */}
        <div className="relative h-52 flex-shrink-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Fechar"
          >
            <i className="ri-close-line text-lg" />
          </button>

          {/* Meta sobre imagem */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold bg-[#C9A84C] text-[#0F2A1A] px-2 py-0.5 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-white font-bold text-lg md:text-xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {news.title}
            </h2>
          </div>
        </div>

        {/* Conteúdo scrollável */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mb-5 pb-4 border-b border-[#f0ebe0]">
            <span className="flex items-center gap-1.5 text-xs text-[#5a6a5a]">
              <i className="ri-calendar-2-line text-[#C9A84C]" />
              {news.dateLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#5a6a5a]">
              <i className="ri-newspaper-line text-[#C9A84C]" />
              Fonte: <span className="font-semibold text-[#0F2A1A]">{news.source}</span>
            </span>
            <i className={`${news.icon} text-[#C9A84C] text-sm ml-auto`} />
          </div>

          {/* Resumo destacado */}
          <p className="text-[#1a2e4a] font-semibold text-[15px] leading-relaxed mb-5 bg-[#F9F6F0] rounded-xl px-4 py-3 border-l-4 border-[#C9A84C]">
            {news.summary}
          </p>

          {/* Conteúdo completo */}
          <div
            className="prose prose-sm prose-stone max-w-none text-[#3a4a3a] leading-relaxed [&_p]:mb-3 [&_strong]:text-[#0F2A1A] [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* CTA para fonte original */}
          <div className="mt-6 pt-5 border-t border-[#f0ebe0]">
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0F2A1A] text-white text-sm font-bold px-5 py-3 rounded-full hover:bg-[#C9A84C] hover:text-[#0F2A1A] transition-all duration-200 group"
            >
              <i className="ri-external-link-line text-sm" />
              Ler matéria completa em {news.source}
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[#9a9a9a] text-[11px] mt-2">
              Você será redirecionado para o site da fonte original.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── Card individual de notícia ───────────────────────────────────────────
function NewsCard({ news, onOpen, priority }: { news: WeekNewsItem; onOpen: () => void; priority?: boolean }) {
  return (
    <div className="group bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer" onClick={onOpen}>
      {/* Imagem */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Ícone temático */}
        <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
          <i className={`${news.icon} text-[#C9A84C] text-sm`} />
        </div>
        {/* Data */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-white/80 text-[11px] flex items-center gap-1">
            <i className="ri-calendar-line text-[10px]" />
            {news.dateLabel}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            news.source === "DATAGRO"
              ? "bg-[#0F2A1A]/80 text-[#C9A84C]"
              : "bg-[#1a2e4a]/80 text-white"
          }`}>
            {news.source}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#0F2A1A] font-bold text-[14px] leading-snug group-hover:text-[#1a4a2a] transition-colors line-clamp-3 mb-2 flex-1">
          {news.title}
        </h3>
        <p className="text-[#5a6a5a] text-[12px] leading-relaxed line-clamp-2 mb-4">
          {news.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {news.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] bg-[#F5F0E8] text-[#5a6a5a] px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-[#f0ebe0]">
          <span className="text-[#9a9a9a] text-[11px] flex items-center gap-1">
            <i className="ri-time-line text-[10px]" />
            Leitura completa
          </span>
          <button className="inline-flex items-center gap-1.5 bg-[#0F2A1A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full group-hover:bg-[#C9A84C] group-hover:text-[#0F2A1A] transition-all duration-200">
            Ver matéria
            <i className="ri-arrow-right-line text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function WeeklyNews() {
  const [selectedNews, setSelectedNews] = useState<WeekNewsItem | null>(null);
  const [activeDay, setActiveDay] = useState<string>("28/05");

  const dayLabels: Record<string, string> = {
    "25/05": "25 de Maio",
    "26/05": "26 de Maio",
    "27/05": "27 de Maio",
    "28/05": "28 de Maio",
  };

  const currentDayNews = getNewsByDay(activeDay);

  return (
    <section id="noticias-da-semana" className="w-full">
      {/* ── Cabeçalho ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#1a2e4a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Semana 25–29 Mai 2026
            </span>
          </div>
          <h2
            className="text-[#0F2A1A] text-2xl md:text-3xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Notícias da Semana
          </h2>
          <p className="text-[#5a6a5a] text-sm mt-1">
            {weekNewsItems.length} notícias curadas — DATAGRO &amp; UAGro · Leia a cobertura completa de cada dia
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[#9a9a9a] text-xs">
          <i className="ri-book-open-line" />
          <span>Clique em qualquer card para ler a cobertura completa</span>
        </div>
      </div>

      {/* ── Abas por dia ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {dayGroups.map((day) => {
          const count = getNewsByDay(day).length;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeDay === day
                  ? "bg-[#0F2A1A] text-white border-[#0F2A1A] shadow-sm"
                  : "bg-white text-[#5a6a5a] border-[#e8e0d0] hover:border-[#C9A84C] hover:text-[#0F2A1A]"
              }`}
            >
              <i className="ri-calendar-2-line text-xs" />
              {dayLabels[day]}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                activeDay === day
                  ? "bg-white/20 text-white"
                  : "bg-[#F5F0E8] text-[#5a6a5a]"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Grid de cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentDayNews.map((news, idx) => (
          <NewsCard
            key={news.id}
            news={news}
            onOpen={() => setSelectedNews(news)}
            priority={idx < 3}
          />
        ))}
      </div>

      {/* ── Rodapé informativo ────────────────────────────── */}
      <div className="mt-6 p-4 bg-[#F9F6F0] rounded-xl border border-[#e8e0d0] flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-[#C9A84C] flex-shrink-0">
          <i className="ri-information-line text-base" />
          <span className="text-xs font-bold text-[#0F2A1A] uppercase tracking-wide">Sobre as fontes</span>
        </div>
        <p className="text-[#5a6a5a] text-xs leading-relaxed">
          Todas as notícias são curadas semanalmente a partir de fontes especializadas em agronegócio —
          <strong className="text-[#0F2A1A]"> DATAGRO</strong> (maior plataforma de dados e análises do agro no Brasil) e
          <strong className="text-[#0F2A1A]"> UAGro</strong> (portal de notícias agroeconômicas).
          Ao clicar em "Ver matéria", você acessa o conteúdo completo na fonte original.
        </p>
      </div>

      {/* ── Modal ────────────────────────────────────────── */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
}
