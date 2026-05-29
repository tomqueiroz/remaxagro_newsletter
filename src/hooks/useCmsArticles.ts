import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CmsArticle } from '@/lib/cmsTypes';
import { CMS_TABLE } from '@/lib/cmsTypes';

interface UseCmsArticlesOptions {
  editionDate?: string;
  limit?: number;
  onlyPublished?: boolean;
}

interface UseCmsArticlesReturn {
  articles: CmsArticle[];
  highlights: CmsArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCmsArticles(options: UseCmsArticlesOptions = {}): UseCmsArticlesReturn {
  const { editionDate = '2026-05-29', limit = 50, onlyPublished = true } = options;
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from(CMS_TABLE)
        .select('*')
        .eq('edition_date', editionDate)
        .order('is_highlight', { ascending: false })
        .order('news_date', { ascending: false })
        .limit(limit);

      if (onlyPublished) {
        query = query.eq('is_published', true);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setArticles((data as CmsArticle[]) ?? []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar notícias';
      setError(msg);
      console.error('[useCmsArticles] error:', err);
    } finally {
      setLoading(false);
    }
  }, [editionDate, limit, onlyPublished]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const highlights = articles.filter(a => a.is_highlight);

  return { articles, highlights, loading, error, refetch: fetchArticles };
}

export async function incrementArticleView(slug: string): Promise<void> {
  try {
    await supabase.rpc('increment_article_views', { article_slug: slug });
  } catch {
    // non-critical, silent fail
  }
}
