
-- ── CMS: Artigos de notícias ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cms_articles_2026_05_29 (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  title        text NOT NULL,
  subtitle     text,
  summary      text NOT NULL,
  content      text,               -- corpo completo em Markdown/HTML
  image_url    text,
  source       text NOT NULL,      -- "DATAGRO" | "UAGro" | "CNA" etc.
  source_url   text,               -- link original
  author       text DEFAULT 'Curadoria RE/MAX AGRO',
  topic        text NOT NULL,      -- "Biocombustíveis" | "Grãos" | etc.
  tags         text[] DEFAULT '{}',
  edition_date date NOT NULL,      -- data da edição (ex: 2026-05-29)
  news_date    date NOT NULL,      -- data original da notícia
  is_highlight boolean DEFAULT false,
  is_published boolean DEFAULT true,
  view_count   integer DEFAULT 0,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS cms_articles_topic_idx      ON cms_articles_2026_05_29 (topic);
CREATE INDEX IF NOT EXISTS cms_articles_edition_idx    ON cms_articles_2026_05_29 (edition_date);
CREATE INDEX IF NOT EXISTS cms_articles_published_idx  ON cms_articles_2026_05_29 (is_published);
CREATE INDEX IF NOT EXISTS cms_articles_highlight_idx  ON cms_articles_2026_05_29 (is_highlight);
CREATE INDEX IF NOT EXISTS cms_articles_news_date_idx  ON cms_articles_2026_05_29 (news_date);

-- RLS: leitura pública, escrita autenticada
ALTER TABLE cms_articles_2026_05_29 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_cms_articles" ON cms_articles_2026_05_29
  FOR SELECT USING (is_published = true);

CREATE POLICY "admin_all_cms_articles" ON cms_articles_2026_05_29
  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_cms_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER set_cms_updated_at
  BEFORE UPDATE ON cms_articles_2026_05_29
  FOR EACH ROW EXECUTE FUNCTION update_cms_updated_at();

-- ── Incremento de views ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_article_views(article_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE cms_articles_2026_05_29 SET view_count = view_count + 1 WHERE id = article_id;
END; $$;
