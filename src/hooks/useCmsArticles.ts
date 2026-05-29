import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CmsArticle, CMS_TABLE } from '@/lib/cmsTypes';

interface UseCmsArticlesOptions {
  editionDate?: string;
  highlightOnly?: boolean;
  limit?: number;
}

interface UseCmsArticlesResult {
  articles: CmsArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCmsArticles(options: UseCmsArticlesOptions = {}): UseCmsArticlesResult {
  const { editionDate = '2026-05-29', highlightOnly = false, limit } = options;
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
        .eq('is_published', true)
        .order('news_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (highlightOnly) {
        query = query.eq('is_highlight', true);
      }
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: sbError } = await query;
      if (sbError) throw sbError;
      setArticles((data as CmsArticle[]) || []);
    } catch (err) {
      console.error('Error fetching CMS articles:', err);
      setError('Não foi possível carregar as notícias.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [editionDate, highlightOnly, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
}

// Admin: fetch all articles (including unpublished)
export async function fetchAllArticlesAdmin(): Promise<CmsArticle[]> {
  const { data, error } = await supabase
    .from(CMS_TABLE)
    .select('*')
    .order('news_date', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as CmsArticle[]) || [];
}

// Admin: update article
export async function updateArticle(id: string, updates: Partial<CmsArticle>): Promise<void> {
  const { error } = await supabase.from(CMS_TABLE).update(updates).eq('id', id);
  if (error) throw error;
}

// Admin: delete article
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from(CMS_TABLE).delete().eq('id', id);
  if (error) throw error;
}

// Admin: insert article
export async function insertArticle(article: Omit<CmsArticle, 'id' | 'created_at' | 'updated_at' | 'view_count'>): Promise<void> {
  const { error } = await supabase.from(CMS_TABLE).insert([article]);
  if (error) throw error;
}

// Increment view count
export async function incrementViewCount(id: string): Promise<void> {
  try {
    await supabase.rpc('increment_article_view', { article_id: id });
  } catch {
    // silently fail
  }
}
