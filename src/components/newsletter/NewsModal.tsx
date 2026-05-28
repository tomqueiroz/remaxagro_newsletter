import { NewsItem } from "@/mocks/newsletter";
import { useEffect } from "react";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
}

export default function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
  // Prevenir scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !news) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay escuro */}
      <div
        className="absolute inset-0 bg-[#0F2A1A]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Container do Modal */}
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header do Modal (Fixo) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e0d0] bg-[#F5F0E8]">
          <div className="flex items-center gap-2">
            <span className="bg-[#C9A84C] text-[#0F2A1A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
              Notícia na Íntegra
            </span>
            <span className="text-[#5a6a5a] text-xs font-medium flex items-center gap-1">
              <i className="ri-calendar-line"></i> {news.dateLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#0F2A1A] hover:bg-[#0F2A1A] hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Corpo do Modal (Scrollável) */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
          <article>
            {/* Título */}
            <h1
              className="text-[#0F2A1A] text-2xl md:text-3xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {news.title}
            </h1>

            {/* Imagem (se houver) */}
            {news.image && (
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Conteúdo HTML */}
            <div
              className="prose prose-lg prose-p:text-[#3a4a3a] prose-p:leading-relaxed prose-a:text-[#C9A84C] max-w-none"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </article>
        </div>

        {/* Footer do Modal (Fixo) */}
        <div className="px-6 py-4 border-t border-[#e8e0d0] bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#5a6a5a]">
            <span>Fonte original:</span>
            <span className="font-bold text-[#0F2A1A]">{news.source}</span>
          </div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F2A1A] text-white text-sm font-bold rounded-full hover:bg-[#1a4a2a] transition-colors flex items-center justify-center gap-2"
          >
            Ler no site da fonte <i className="ri-external-link-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
