
-- ── leads ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads_2026_05_29 (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  whatsapp    text,
  source      text DEFAULT 'site',   -- 'exit_popup' | 'first_click' | 'subscribe_section'
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.leads_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_leads" ON public.leads_2026_05_29
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select_leads" ON public.leads_2026_05_29
  FOR SELECT TO authenticated USING (true);

-- ── page_views ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_views_2026_05_29 (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  text,
  path        text DEFAULT '/',
  referrer    text,
  user_agent  text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.page_views_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_views" ON public.page_views_2026_05_29
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select_views" ON public.page_views_2026_05_29
  FOR SELECT TO authenticated USING (true);

-- ── news_clicks ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news_clicks_2026_05_29 (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id     int NOT NULL,
  news_title  text,
  news_url    text,
  session_id  text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.news_clicks_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_clicks" ON public.news_clicks_2026_05_29
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select_clicks" ON public.news_clicks_2026_05_29
  FOR SELECT TO authenticated USING (true);

-- ── news_articles (CMS) ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news_articles_2026_05_29 (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  summary     text,
  content     text,
  source      text,
  url         text,
  image_url   text,
  icon        text DEFAULT 'ri-newspaper-line',
  published   boolean DEFAULT true,
  featured    boolean DEFAULT false,
  edition_date date DEFAULT CURRENT_DATE,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE public.news_articles_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_select_published" ON public.news_articles_2026_05_29
  FOR SELECT TO anon USING (published = true);

CREATE POLICY "auth_all_articles" ON public.news_articles_2026_05_29
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── admin_users (para login simples) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users_2026_05_29 (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_users_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_select_admin" ON public.admin_users_2026_05_29
  FOR SELECT TO authenticated USING (auth.email() = email);

-- Inserir admin padrão (autenticação via Supabase Auth)
INSERT INTO public.admin_users_2026_05_29 (email)
VALUES ('admin@remaxagro.com.br')
ON CONFLICT DO NOTHING;
