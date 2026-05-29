import { useState, useCallback } from 'react';
import { useCmsArticles } from '@/hooks/useCmsArticles';
import { CmsArticle, formatNewsDate, getTopicColor, getTopicIcon } from '@/lib/cmsTypes';
import ArticleModal from '@/components/newsletter/ArticleModal';

// ── Article Card ──────────────────────────────────────────────────────────────
interface ArticleCardProps {
  article: CmsArticle;
  onSelect: (a: CmsArticle) => void;
}

function ArticleCard({ article, onSelect }: ArticleCardProps) {
  const topicColor = getTopicColor(article.topic);
  const topicIcon = getTopicIcon(article.topic);

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-250 cursor-pointer border border-gray-100 flex flex-col"
      onClick={() => onSelect(article)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Topic badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md shadow ${topicColor}`}>
            <i className={topicIcon} />
            {article.topic}
          </span>
        </div>

        {/* Highlight badge */}
        {article.is_highlight && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-[#d4a847] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow">
              <i className="ri-star-line" />
              DESTAQUE
            </span>
          </div>
        )}

        {/* Date + source */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] text-white/85 font-medium">
            {formatNewsDate(article.news_date)} · {article.source}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-[#1a2e4a] leading-snug mb-2 group-hover:text-[#2d4a6e] transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button className="mt-auto w-full text-xs font-bold text-[#1a2e4a] border-2 border-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white rounded-lg py-2.5 transition-colors flex items-center justify-center gap-1.5">
          <i className="ri-article-line" />
          Leia mais
        </button>
      </div>
    </div>
  );
}

// ── Day Filter Tabs ───────────────────────────────────────────────────────────
interface DayTabsProps {
  days: string[];
  active: string;
  counts: Record<string, number>;
  onChange: (day: string) => void;
}

function DayTabs({ days, active, counts, onChange }: DayTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onChange('Todos')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
          active === 'Todos'
            ? 'bg-[#1a2e4a] text-white border-[#1a2e4a] shadow-md'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a2e4a] hover:text-[#1a2e4a]'
        }`}
      >
        Todos
        <span className={`ml-1.5 text-xs rounded-full px-1.5 py-0.5 font-bold ${active === 'Todos' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
          {Object.values(counts).reduce((a, b) => a + b, 0)}
        </span>
      </button>
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onChange(day)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
            active === day
              ? 'bg-[#1a2e4a] text-white border-[#1a2e4a] shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a2e4a] hover:text-[#1a2e4a]'
          }`}
        >
          {day}
          <span className={`ml-1.5 text-xs rounded-full px-1.5 py-0.5 font-bold ${active === day ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {counts[day] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WeeklyNewsCMS() {
  const { articles, loading, error } = useCmsArticles({ editionDate: '2026-05-29' });
  const [activeDay, setActiveDay] = useState<string>('Todos');
  const [selectedArticle, setSelectedArticle] = useState<CmsArticle | null>(null);

  const handleSelect = useCallback((a: CmsArticle) => setSelectedArticle(a), []);
  const handleClose = useCallback(() => setSelectedArticle(null), []);

  // Build day groups from articles
  const dayMap: Record<string, string> = {
    '2026-05-25': '25/05',
    '2026-05-26': '26/05',
    '2026-05-27': '27/05',
    '2026-05-28': '28/05',
  };
  const days = ['25/05', '26/05', '27/05', '28/05'];
  const counts: Record<string, number> = {};
  days.forEach((d) => { counts[d] = 0; });
  articles.forEach((a) => {
    const dayLabel = dayMap[a.news_date] || a.news_date;
    counts[dayLabel] = (counts[dayLabel] || 0) + 1;
  });

  const filtered = activeDay === 'Todos'
    ? articles
    : articles.filter((a) => dayMap[a.news_date] === activeDay);

  return (
    <section>
      {/* Section header */}
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

        {/* Day filter tabs */}
        {!loading && !error && articles.length > 0 && (
          <DayTabs
            days={days.filter((d) => counts[d] > 0)}
            active={activeDay}
            counts={counts}
            onChange={setActiveDay}
          />
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <i className="ri-loader-4-line animate-spin text-2xl mr-3" />
          <span className="text-sm">Carregando notícias...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-12 text-red-500 bg-red-50 rounded-xl">
          <i className="ri-error-warning-line text-xl mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="ri-newspaper-line text-4xl mb-3 opacity-40" />
          <p className="text-sm">Nenhuma notícia disponível para esta data.</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={handleSelect} />
          ))}
        </div>
      )}

      {/* Footer note */}
      {!loading && articles.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            <i className="ri-information-line mr-1" />
            {articles.length} notícias curadas · Edição 29/Mai/2026 · DATAGRO × RE/MAX AGRO
          </p>
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={handleClose} />
      )}
    </section>
  );
}
