# Supabase Cron Jobs

Detta directory innehåller SQL-script för att sätta upp automatiska schemalagda jobb i Supabase med `pg_cron`.

## Förutsättningar

`pg_cron` och `pg_net` extensions har redan aktiverats via migration.

## Installation av Cron Jobs

### Delitea Nattlig Produktsynkronisering

**Syfte:** Automatisk import av produkter från Delitea varje natt kl 03:00

**Installationssteg:**

1. Öppna Supabase SQL Editor: https://supabase.com/dashboard/project/giznqbjxcxllmgamxgaa/sql/new
2. Öppna filen `setup-delitea-sync.sql` i detta directory
3. Kopiera hela innehållet
4. Klistra in i SQL Editor
5. Kör scriptet

**Schema:** `0 3 * * *` (03:00 varje dag)

**Edge Function:** `import-product-feed` med `{"storeSlug": "delitea"}`

## Hantera Cron Jobs

### Visa alla cron jobs
```sql
SELECT * FROM cron.job ORDER BY jobname;
```

### Visa körningshistorik
```sql
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'delitea-nightly-product-sync')
ORDER BY start_time DESC 
LIMIT 20;
```

### Ta bort ett cron job
```sql
SELECT cron.unschedule('delitea-nightly-product-sync');
```

### Manuellt trigga ett jobb (testning)
```sql
SELECT net.http_post(
  url:='https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/import-product-feed',
  headers:='{"Content-Type": "application/json", "Authorization": "Bearer [ANON_KEY]"}'::jsonb,
  body:='{"storeSlug": "delitea"}'::jsonb
);
```

## Lägga till fler butiker

När du vill lägga till fler butiker (t.ex. MatHem), skapa ett nytt cron job:

```sql
SELECT cron.schedule(
  'mathem-nightly-product-sync',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url:='https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/import-product-feed',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer [ANON_KEY]"}'::jsonb,
    body:='{"storeSlug": "mathem"}'::jsonb
  );
  $$
);
```

## Monitoring

Övervaka cron job-körningar i Supabase Dashboard:
- **Database Logs:** https://supabase.com/dashboard/project/giznqbjxcxllmgamxgaa/logs/postgres-logs
- **Edge Function Logs:** https://supabase.com/dashboard/project/giznqbjxcxllmgamxgaa/functions/import-product-feed/logs

## Cron Schedule Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └── Dag i veckan (0-7, där 0 och 7 = söndag)
│ │ │ └──── Månad (1-12)
│ │ └────── Dag i månaden (1-31)
│ └──────── Timme (0-23)
└────────── Minut (0-59)
```

**Exempel:**
- `0 3 * * *` - 03:00 varje dag
- `0 2 * * 0` - 02:00 varje söndag
- `*/30 * * * *` - Var 30:e minut
- `0 0 1 * *` - Midnatt den första dagen varje månad
