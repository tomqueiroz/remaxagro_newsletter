export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
  message?: string;
}

export interface PageView {
  id: string;
  created_at: string;
  path: string;
  referrer?: string;
  user_agent?: string;
}

export interface NewsClick {
  id: string;
  created_at: string;
  news_id: string;
  news_title?: string;
}

export interface NewsArticle {
  id: string;
  created_at: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  source_url?: string;
  image_url?: string;
  icon?: string;
  published: boolean;
  featured: boolean;
  edited_at?: string;
}

export const TABLES = {
  LEADS: 'leads_2026_05_29',
  PAGE_VIEWS: 'page_views_2026_05_29',
  NEWS_CLICKS: 'news_clicks_2026_05_29',
  NEWS_ARTICLES: 'news_articles_2026_05_29',
} as const;
