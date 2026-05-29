import { supabase } from '@/integrations/supabase/client';
import type { Lead, PageView, NewsClick, NewsArticle } from './adminTypes';
import { TABLES } from './adminTypes';

export async function fetchLeads(from?: string | null, to?: string | null): Promise<Lead[]> {
  let query = supabase
    .from(TABLES.LEADS)
    .select('*')
    .order('created_at', { ascending: false });

  if (from) {
    query = query.gte('created_at', from);
  }
  if (to) {
    query = query.lte('created_at', to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchPageViews(from?: string | null, to?: string | null): Promise<PageView[]> {
  let query = supabase
    .from(TABLES.PAGE_VIEWS)
    .select('*')
    .order('created_at', { ascending: false });

  if (from) {
    query = query.gte('created_at', from);
  }
  if (to) {
    query = query.lte('created_at', to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchNewsClicks(from?: string | null, to?: string | null): Promise<NewsClick[]> {
  let query = supabase
    .from(TABLES.NEWS_CLICKS)
    .select('*')
    .order('created_at', { ascending: false });

  if (from) {
    query = query.gte('created_at', from);
  }
  if (to) {
    query = query.lte('created_at', to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from(TABLES.NEWS_ARTICLES)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function saveNewsArticle(article: Partial<NewsArticle>): Promise<NewsArticle> {
  if (article.id) {
    const { data, error } = await supabase
      .from(TABLES.NEWS_ARTICLES)
      .update({
        title: article.title,
        summary: article.summary,
        content: article.content,
        source: article.source,
        source_url: article.source_url,
        image_url: article.image_url,
        icon: article.icon,
        published: article.published,
        featured: article.featured,
        edited_at: new Date().toISOString(),
      })
      .eq('id', article.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from(TABLES.NEWS_ARTICLES)
      .insert({
        title: article.title,
        summary: article.summary,
        content: article.content,
        source: article.source,
        source_url: article.source_url,
        image_url: article.image_url,
        icon: article.icon,
        published: article.published ?? false,
        featured: article.featured ?? false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function deleteNewsArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLES.NEWS_ARTICLES)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}
