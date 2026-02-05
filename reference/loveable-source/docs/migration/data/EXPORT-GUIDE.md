# Data Export Guide

## Sammanfattning

Denna mapp innehåller exporterad data från Supabase för Next.js 15-migrationen:

| Fil | Innehåll | Storlek |
|-----|----------|---------|
| `schema.json` | Databasschema (12 tabeller) | Komplett |
| `routes.json` | Alla routes med metadata | Komplett |
| `e-additives.json` | E-ämnen (5 exempel) | Sampel - exportera full via SQL |
| `foods.json` | Livsmedel (3 exempel) | Sampel - exportera full via SQL |
| `food-categories.json` | 10 kategorier | Komplett |
| `stores.json` | 1 butik (Delitea) | Komplett |
| `public-lists.json` | 10 publika listor med items | Komplett |

---

## Instruktioner för att exportera full data från Supabase

Kör dessa SQL-frågor i Supabase SQL Editor och exportera resultaten till JSON-filer.

### 1. E-ämnen (354 poster) - Full export
```sql
SELECT * FROM e_additives 
WHERE is_published = true 
ORDER BY e_number;
```
**Storlek:** ~354 rader, ~500KB JSON

### 2. Livsmedel (3 poster just nu)
```sql
SELECT * FROM foods 
ORDER BY name;
```
**Storlek:** ~3 rader (expanderbar till 2500+)

### 3. Livsmedelskategorier (food-categories.json) - Redan exporterad
```sql
SELECT * FROM food_categories 
ORDER BY name;
```
**Storlek:** 10 rader

### 4. Butiker (stores.json) - Redan exporterad
```sql
SELECT * FROM stores 
WHERE is_active = true;
```
**Storlek:** 1 rad (Delitea)

### 5. Produkter (7000+ rader - paginera)
```sql
-- Paginera vid behov (7000+ rader)
SELECT * FROM products 
ORDER BY name 
LIMIT 1000 OFFSET 0;
-- Ändra OFFSET för varje batch: 0, 1000, 2000, ...
```
**Storlek:** ~7000 rader

### 6. Publika listor (public-lists.json) - Redan exporterad
```sql
SELECT 
  pl.*,
  (SELECT json_agg(pi.* ORDER BY pi.position) 
   FROM public_items pi 
   WHERE pi.list_id = pl.id
  ) as items
FROM public_lists pl 
WHERE pl.is_public = true;
```
**Storlek:** 10 listor med items

### 7. Produktkategorier
```sql
SELECT * FROM product_categories 
ORDER BY name;
```
**Storlek:** ~144 kategorier

---

## Alternativ: Edge Function för export

Du kan också skapa en Edge Function för automatisk JSON-export:

```typescript
// supabase/functions/export-data/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const url = new URL(req.url)
  const table = url.searchParams.get('table')

  const validTables = ['e_additives', 'foods', 'food_categories', 'stores', 'products', 'public_lists']
  
  if (!table || !validTables.includes(table)) {
    return new Response(JSON.stringify({ error: 'Invalid table' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(10000)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${table}.json"`
    }
  })
})
```

---

## Filformat för Next.js

Spara all exporterad data som JSON-filer i `/data` mappen i Next.js-projektet:

```
data/
├── e-additives.json      # 354 e-ämnen
├── foods.json            # 2500+ livsmedel
├── food-categories.json  # 10 kategorier
├── stores.json           # 1 butik
├── products.json         # 7000+ produkter (split i batchar om nödvändigt)
├── public-lists.json     # 10 publika listor
└── product-categories.json # 144 kategorier
```

## TypeScript-typer

Generera TypeScript-typer från JSON-data med:

```bash
npx json-to-ts data/e-additives.json > types/e-additive.ts
```

Eller använd befintliga typer från `src/integrations/supabase/types.ts` som referens.

---

## Aktuell data i databasen

| Tabell | Antal rader |
|--------|-------------|
| e_additives | 354 (publicerade) |
| foods | 3 |
| food_categories | 10 |
| stores | 1 |
| products | ~7000 |
| product_categories | 144 |
| public_lists | 10 |
| public_items | ~110 |
