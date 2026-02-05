-- =====================================================
-- SUPABASE CRON JOB: Nattlig Delitea Produktsynkronisering
-- =====================================================
-- Detta script skapar ett cron job som automatiskt importerar
-- produkter från Delitea varje natt kl 03:00 via edge function
-- 
-- INSTALLATION:
-- 1. Öppna Supabase SQL Editor: https://supabase.com/dashboard/project/giznqbjxcxllmgamxgaa/sql/new
-- 2. Kopiera och klistra in detta script
-- 3. Kör scriptet
-- =====================================================

-- Schedule nightly Delitea product import at 03:00 (every day)
SELECT cron.schedule(
  'delitea-nightly-product-sync',  -- Job name
  '0 3 * * *',                      -- Cron schedule: 03:00 every day
  $$
  SELECT
    net.http_post(
      url:='https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/import-csv-products',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpem5xYmp4Y3hsbG1nYW14Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODk1NjEsImV4cCI6MjA2OTU2NTU2MX0.KoDcKxTYlrUhF-Vf2_e3A6LeMA_UgIaQe6TYXkzNzek"}'::jsonb,
      body:='{"storeSlug": "delitea", "offset": 0, "limit": 300000}'::jsonb,
      timeout_milliseconds:=300000  -- 5 minute timeout for large import
    ) as request_id;
  $$
);

-- =====================================================
-- VERIFIERING: Kontrollera att jobbet skapades korrekt
-- =====================================================
SELECT 
  jobid,
  jobname,
  schedule,
  active,
  database,
  username,
  command
FROM cron.job 
WHERE jobname = 'delitea-nightly-product-sync';

-- =====================================================
-- ANVÄNDBAR INFORMATION
-- =====================================================
-- Visa alla cron jobs:
-- SELECT * FROM cron.job ORDER BY jobname;

-- Ta bort detta cron job (om behövs):
-- SELECT cron.unschedule('delitea-nightly-product-sync');

-- Visa cron job körningshistorik:
-- SELECT * FROM cron.job_run_details 
-- WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'delitea-nightly-product-sync')
-- ORDER BY start_time DESC 
-- LIMIT 20;

-- Manuellt trigga jobbet (för testning):
-- SELECT net.http_post(
--   url:='https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/import-product-feed',
--   headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpem5xYmp4Y3hsbG1nYW14Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODk1NjEsImV4cCI6MjA2OTU2NTU2MX0.KoDcKxTYlrUhF-Vf2_e3A6LeMA_UgIaQe6TYXkzNzek"}'::jsonb,
--   body:='{"storeSlug": "delitea"}'::jsonb
-- );
