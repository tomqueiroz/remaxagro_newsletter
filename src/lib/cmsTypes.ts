// Types for the CMS articles table (cms_articles_2026_05_29)
export interface CmsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  image_url?: string;
  source: string;
  source_url?: string;
  author?: string;
  topic: string;
  tags?: string[];
  edition_date?: string;
  news_date: string;
  is_highlight: boolean;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const CMS_TABLE = 'cms_articles_2026_05_29';

// Topics with colors for UI display
export const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Grãos':           { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  'Pecuária':        { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  'Biocombustíveis': { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300'  },
  'Café':            { bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-300'  },
  'Agroeconomia':    { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-300'   },
  'Política Agrícola': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  'Insumos':         { bg: 'bg-lime-100',   text: 'text-lime-800',   border: 'border-lime-300'   },
  'Tecnologia':      { bg: 'bg-cyan-100',   text: 'text-cyan-800',   border: 'border-cyan-300'   },
  'Maquinário':      { bg: 'bg-slate-100',  text: 'text-slate-800',  border: 'border-slate-300'  },
  'Outras Culturas': { bg: 'bg-teal-100',   text: 'text-teal-800',   border: 'border-teal-300'   },
};

export function getTopicStyle(topic: string) {
  return TOPIC_COLORS[topic] ?? { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
}

export function formatNewsDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}
