// CMS Types for cms_articles_2026_05_29 table

export interface CmsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  image_url: string;
  source: string;
  source_url: string;
  topic: string;
  tags: string[];
  edition_date: string;
  news_date: string;
  is_highlight: boolean;
  is_published: boolean;
  author: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const CMS_TABLE = 'cms_articles_2026_05_29';

// Topic color mapping
export const topicColors: Record<string, string> = {
  'Biocombustíveis': 'bg-emerald-100 text-emerald-800',
  'Grãos': 'bg-amber-100 text-amber-800',
  'Pecuária': 'bg-red-100 text-red-800',
  'Café': 'bg-brown-100 text-yellow-900',
  'Outras Culturas': 'bg-lime-100 text-lime-800',
  'Política Agrícola': 'bg-blue-100 text-blue-800',
  'Agroeconomia': 'bg-purple-100 text-purple-800',
  'Tecnologia': 'bg-cyan-100 text-cyan-800',
  'Insumos': 'bg-orange-100 text-orange-800',
  'Maquinário': 'bg-slate-100 text-slate-800',
  'default': 'bg-gray-100 text-gray-700',
};

export function getTopicColor(topic: string): string {
  return topicColors[topic] || topicColors['default'];
}

// Topic icon mapping
export const topicIcons: Record<string, string> = {
  'Biocombustíveis': 'ri-gas-station-line',
  'Grãos': 'ri-seedling-line',
  'Pecuária': 'ri-map-pin-line',
  'Café': 'ri-cup-line',
  'Outras Culturas': 'ri-plant-line',
  'Política Agrícola': 'ri-government-line',
  'Agroeconomia': 'ri-line-chart-line',
  'Tecnologia': 'ri-cpu-line',
  'Insumos': 'ri-flask-line',
  'Maquinário': 'ri-tools-line',
  'default': 'ri-newspaper-line',
};

export function getTopicIcon(topic: string): string {
  return topicIcons[topic] || topicIcons['default'];
}

// Date formatting
export function formatNewsDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .replace('.', '');
}
