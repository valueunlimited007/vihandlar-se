-- =====================================================
-- AUTOMATISK DELITEA IMPORT SETUP
-- =====================================================
-- Fas 1: Uppdatera stores-tabellen med Delitea CSV feed
-- Fas 4: Skapa databas-index för optimerad performance
-- Fas 6: Sätt upp automatisk nattlig synkronisering
-- =====================================================

-- FAS 1: Uppdatera Delitea store med CSV feed URL
UPDATE stores 
SET 
  feed_url = 'https://adtraction.com/productfeed.htm?type=feed&format=CSV&encoding=UTF8&epi=0&zip=0&cdelim=tab&tdelim=singlequote&sd=0&sn=0&flat=0&apid=1795091263&asid=2013245131&gsh=0&pfid=1610&gt=0',
  feed_type = 'csv',
  updated_at = now()
WHERE slug = 'delitea';

-- FAS 4: Skapa index för optimerad produktsökning
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_store_product ON products(store_id, product_id);

-- FAS 6: Sätt upp automatisk nattlig synkronisering (kl 03:00)
-- Ta bort befintligt jobb om det finns
DO $$
BEGIN
  PERFORM cron.unschedule('delitea-nightly-product-sync');
EXCEPTION
  WHEN undefined_table THEN
    NULL;
  WHEN others THEN
    NULL;
END $$;

-- Skapa nytt cron job
SELECT cron.schedule(
  'delitea-nightly-product-sync',
  '0 3 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/import-csv-products',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpem5xYmp4Y3hsbG1nYW14Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODk1NjEsImV4cCI6MjA2OTU2NTU2MX0.KoDcKxTYlrUhF-Vf2_e3A6LeMA_UgIaQe6TYXkzNzek"}'::jsonb,
        body:='{"storeSlug": "delitea", "offset": 0, "limit": 300000}'::jsonb,
        timeout_milliseconds:=300000
    ) as request_id;
  $$
);