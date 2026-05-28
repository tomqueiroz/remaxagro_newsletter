-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    whatsapp TEXT,
    source TEXT NOT NULL, -- e.g., 'first_click_popup', 'exit_intent_popup', 'footer_subscribe'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create page_views table for access history
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create news_clicks table for news performance
CREATE TABLE IF NOT EXISTS public.news_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    news_id INTEGER NOT NULL,
    news_title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous inserts for leads, page_views, and news_clicks
CREATE POLICY "Allow anonymous inserts for leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts for page_views" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts for news_clicks" ON public.news_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow authenticated users (admin) to read all data
CREATE POLICY "Allow authenticated read for leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read for page_views" ON public.page_views FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read for news_clicks" ON public.news_clicks FOR SELECT TO authenticated USING (true);
