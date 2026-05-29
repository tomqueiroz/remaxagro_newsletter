import { useEffect } from 'react';
import { CmsArticle, formatNewsDate, getTopicColor, getTopicIcon } from '@/lib/cmsTypes';
import { incrementViewCount } from '@/hooks/useCmsArticles';

interface ArticleModalProps {
  article: CmsArticle;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    // increment view count
    if (article.id) {
      incrementViewCount(article.id);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, article.id]);

  const topicColor = getTopicColor(article.topic);
  const topicIcon = getTopicIcon(article.topic);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-8 md:pt-12 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <article
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        {article.image_url && (
          <div className="relative h-56 md:h-72 rounded-t-2xl overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Fechar"
            >
              <i className="ri-close-line text-lg" />
            </button>
            {/* Topic badge on image */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${topicColor}`}>
                <i className={topicIcon} />
                {article.topic}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta: date + author + source */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line text-[#d4a847]" />
              {formatNewsDate(article.news_date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <i className="ri-user-line text-[#1a2e4a]" />
              {article.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5 font-semibold text-[#1a2e4a]">
              <i className="ri-global-line" />
              {article.source}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-extrabold text-[#1a2e4a] leading-snug mb-2">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-base text-gray-600 font-medium mb-5 leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Summary highlight */}
          <div className="border-l-4 border-[#d4a847] pl-4 bg-amber-50/60 py-3 rounded-r-xl mb-6">
            <p className="text-sm font-semibold text-[#1a2e4a] leading-relaxed">{article.summary}</p>
          </div>

          {/* Article body */}
          <div
            className="prose prose-sm max-w-none text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:text-[#1a2e4a] [&_p]:text-[15px]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer: source link */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              Fonte original:{' '}
              <span className="font-semibold text-gray-600">{article.source}</span>
            </p>
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1a2e4a] hover:bg-[#2d4a6e] px-5 py-2.5 rounded-xl transition-colors"
            >
              <i className="ri-external-link-line" />
              Ver matéria original
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
