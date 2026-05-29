import { useEffect } from 'react';
import type { CmsArticle } from '@/lib/cmsTypes';
import { getTopicStyle, formatNewsDate } from '@/lib/cmsTypes';

interface ArticleModalProps {
  article: CmsArticle | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleEsc);
    };
  }, [article, onClose]);

  if (!article) return null;

  const topicStyle = getTopicStyle(article.topic);
  const formattedDate = formatNewsDate(article.news_date);
  const tags: string[] = article.tags ?? [];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-white w-full max-w-3xl mx-auto my-8 rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'popIn 0.25s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-md text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          aria-label="Fechar"
        >
          <i className="ri-close-line text-xl" />
        </button>

        {/* Hero image */}
        {article.image_url && (
          <div className="relative w-full h-56 md:h-72 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Topic badge over hero */}
            <span
              className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${topicStyle.bg} ${topicStyle.text} ${topicStyle.border}`}
            >
              {article.topic}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta bar */}
          <div className="flex flex-wrap gap-2 items-center mb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line" />
              {formattedDate}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <i className="ri-newspaper-line" />
              Fonte: <span className="font-semibold text-gray-700 ml-1">{article.source}</span>
            </span>
            {article.author && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <i className="ri-user-line" />
                  {article.author}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-base text-gray-600 font-medium mb-4 leading-relaxed border-l-4 border-[#C9A55A] pl-3">
              {article.subtitle}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Article body */}
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer CTA */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              Conteúdo curado pela equipe RE/MAX AGRO · Fonte original: {article.source}
            </p>
            {article.source_url && (
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: '#1a2e4a' }}
              >
                <i className="ri-external-link-line" />
                Ver fonte original
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
