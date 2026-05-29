import { useState } from 'react';
import { useCmsArticles, incrementArticleView } from '@/hooks/useCmsArticles';
import ArticleModal from '@/components/newsletter/ArticleModal';
import type { CmsArticle } from '@/lib/cmsTypes';
import { getTopicStyle, formatNewsDate } from '@/lib/cmsTypes';

// ── Loading skeleton ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-5/6" />
        <div className="h-5 bg-gray-200 rounded w-4/6" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-8 bg-gray-200 rounded-lg w-28 mt-4" />
      </div>
    </div>
  );
}

// ── Highlight card (large, for is_highlight=true) ───────────────────────────
function HighlightCard({ article, onRead }: { article: CmsArticle; onRead: (a: CmsArticle) => void }) {
  const topicStyle = getTopicStyle(article.topic);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col group hover:shadow-xl transition-shadow">
      {article.image_url && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C9A55A] text-white shadow">
              DESTAQUE
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}>
              {article.topic}
            </span>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
          <i className="ri-calendar-line" />
          <span>{formatNewsDate(article.news_date)}</span>
          <span className="text-gray-200">·</span>
          <i className="ri-newspaper-line" />
          <span className="font-medium text-gray-500">{article.source}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#1a2e4a] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
          {article.summary}
        </p>
        <button
          onClick={() => onRead(article)}
          className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#1a2e4a' }}
        >
          <i className="ri-book-read-line" />
          Leia mais
        </button>
      </div>
    </div>
  );
}

// ── Regular card (smaller, for non-highlight) ──────────────────────────────
function RegularCard({ article, onRead }: { article: CmsArticle; onRead: (a: CmsArticle) => void }) {
  const topicStyle = getTopicStyle(article.topic);
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex gap-4 p-4 group hover:shadow-md transition-shadow">
      {article.image_url && (
        <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}>
            {article.topic}
          </span>
          <span className="text-xs text-gray-400">{formatNewsDate(article.news_date)}</span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#1a2e4a] transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <i className="ri-newspaper-line" />
            {article.source}
          </span>
          <button
            onClick={() => onRead(article)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold border border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white transition-all"
          >
            Leia mais
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Group header for dates ──────────────────────────────────────────────────
function DateBadge({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr + 'T12:00:00');
  const label = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function WeeklyNewsCMS() {
  const { articles, highlights, loading, error } = useCmsArticles({ editionDate: '2026-05-29' });
  const [selectedArticle, setSelectedArticle] = useState<CmsArticle | null>(null);

  const nonHighlights = articles.filter(a => !a.is_highlight);

  // Group non-highlights by news_date
  const byDate: Record<string, CmsArticle[]> = {};
  for (const art of nonHighlights) {
    if (!byDate[art.news_date]) byDate[art.news_date] = [];
    byDate[art.news_date].push(art);
  }
  const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));

  function handleRead(article: CmsArticle) {
    setSelectedArticle(article);
    incrementArticleView(article.slug);
  }

  return (
    <section id="noticias-semana" className="py-10">
      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#C9A55A' }} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Notícias da Semana
          </h2>
        </div>
        <p className="text-sm text-gray-500 ml-4 pl-3 border-l-2 border-gray-200">
          Curadoria exclusiva · Edição 29 de Maio de 2026 · Semana de 25 a 29/Mai
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <i className="ri-error-warning-line text-lg" />
          <span>Não foi possível carregar as notícias. Tente novamente em instantes.</span>
        </div>
      )}

      {/* Highlights */}
      {!error && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : highlights.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-star-fill text-[#C9A55A]" />
                <h3 className="text-lg font-bold text-gray-800">Destaques da Semana</h3>
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  {highlights.length} notícias em destaque
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {highlights.map(a => (
                  <HighlightCard key={a.id} article={a} onRead={handleRead} />
                ))}
              </div>
            </>
          ) : null}

          {/* All other news grouped by date */}
          {!loading && nonHighlights.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-article-line text-gray-500" />
                <h3 className="text-lg font-bold text-gray-800">Mais Notícias da Semana</h3>
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  {nonHighlights.length} notícias
                </span>
              </div>

              {sortedDates.map(date => (
                <div key={date}>
                  <DateBadge dateStr={date} />
                  <div className="space-y-3">
                    {byDate[date].map(a => (
                      <RegularCard key={a.id} article={a} onRead={handleRead} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && articles.length === 0 && !error && (
            <div className="text-center py-16 text-gray-400">
              <i className="ri-newspaper-line text-5xl mb-3 block" />
              <p className="text-base font-medium">Nenhuma notícia disponível para esta edição.</p>
              <p className="text-sm mt-1">Volte em breve — novas notícias são publicadas toda semana.</p>
            </div>
          )}
        </>
      )}

      {/* Article modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  );
}
