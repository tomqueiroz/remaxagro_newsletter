SELECT COUNT(*) as total, 
       COUNT(*) FILTER (WHERE is_highlight = true) as highlights,
       COUNT(*) FILTER (WHERE is_published = true) as published
FROM cms_articles_2026_05_29;
