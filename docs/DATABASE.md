# Database & Supabase Export Guide

## Översikt

vihandlar.se migrerar från **Supabase (runtime)** till **JSON (static)** för all läsdata.
Detta dokument beskriver hur du exporterar data och vilken strategi som gäller.

## Befintliga tabeller i Supabase

| Tabell | Rader | Typ | Destination |
|--------|-------|-----|-------------|
| `e_additives` | ~354 | Statisk | `data/e-additives.json` |
| `foods` | ~3+ | Statisk | `data/foods.json` |
| `food_categories` | ~10 | Statisk | `data/food-categories.json` |
| `products` | ~7000 | Statisk | `data/products.json` |
| `product_categories` | ~144 | Statisk | `data/product-categories.json` |
| `stores` | ~1 | Statisk | `data/stores.json` |
| `public_lists` | ~10 | Statisk | `data/public-lists.json` |
| `public_items` | ~110 | Statisk | (inkluderas i public-lists) |
| `lists` | Dynamisk | User data | localStorage |
| `items` | Dynamisk | User data | localStorage |
| `shared_scans` | Dynamisk | Sharing | Vercel KV |
| `saved_filters` | Dynamisk | User prefs | localStorage |

---

## Export-queries (kör i Supabase SQL Editor)

### 1. E-ämnen (354 st) - PRIORITET 1
```sql
SELECT json_agg(e ORDER BY e.e_number) 
FROM e_additives e 
WHERE is_published = true;
```

### 2. Livsmedel
```sql
SELECT json_agg(f ORDER BY f.name) 
FROM foods f;
```

### 3. Livsmedelskategorier
```sql
SELECT json_agg(fc ORDER BY fc.sort_order) 
FROM food_categories fc;
```

### 4. Butiker
```sql
SELECT json_agg(s ORDER BY s.name) 
FROM stores s 
WHERE is_active = true;
```

### 5. Produkter (kan vara stort - paginera vid behov)
```sql
SELECT json_agg(p ORDER BY p.name) 
FROM products p 
WHERE is_active = true;
```

### 6. Produktkategorier
```sql
SELECT json_agg(pc ORDER BY pc.name) 
FROM product_categories pc;
```

### 7. Publika listor (med items)
```sql
SELECT json_agg(
  json_build_object(
    'slug', pl.slug,
    'title', pl.title,
    'description', pl.description,
    'is_public', pl.is_public,
    'items', (
      SELECT json_agg(pi ORDER BY pi.position)
      FROM public_items pi
      WHERE pi.list_id = pl.id
    )
  )
)
FROM public_lists pl
WHERE pl.is_public = true;
```

---

## Så här exporterar du

### Via Supabase Dashboard
1. Gå till **SQL Editor**
2. Kör query ovan
3. Klicka **Export** → **Copy as JSON**
4. Spara som `data/[tabell].json`

### Via CLI (om du har Supabase CLI)
```bash
supabase db dump --data-only -f dump.sql
```

### Via API (Claude Code kan göra detta)
```typescript
const { data } = await supabase
  .from('e_additives')
  .select('*')
  .eq('is_published', true)
  .order('e_number');

fs.writeFileSync('data/e-additives.json', JSON.stringify(data, null, 2));
```

---

## Vercel-tjänster som ersätter Supabase

| Supabase | Vercel | Användning |
|----------|--------|------------|
| Database (statisk) | JSON i repo | E-ämnen, livsmedel, etc |
| Database (dynamisk) | - | localStorage på klient |
| Realtime | - | Tas bort (ej behov) |
| Edge Functions | Vercel Functions | `/api/scan`, `/api/voice` |
| Storage | - | Tas bort (inga uploads) |
| Auth | - | Ingen auth behövs |

### Vercel KV (Key-Value Store)
Används för **delade listor**:
- Token: `share_abc123`
- Data: `{ items: [...], expires: timestamp }`
- TTL: 24-48 timmar

---

## Environment Variables (Vercel)

```env
# Scanner (Google Cloud Vision)
GOOGLE_CLOUD_API_KEY=

# Voice input (OpenAI Whisper)
OPENAI_API_KEY=

# Vercel KV (för delade listor)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Endast om du vill behålla Supabase-koppling för export
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

## Migrationsstrategi

### Fas 1: Export all statisk data
- [ ] Exportera e_additives → `data/e-additives.json`
- [ ] Exportera foods → `data/foods.json`
- [ ] Exportera food_categories → `data/food-categories.json`
- [ ] Exportera stores → `data/stores.json`
- [ ] Exportera products → `data/products.json`
- [ ] Exportera public_lists med items → `data/public-lists.json`

### Fas 2: Bygg Next.js app
- [ ] Implementera data access functions (`lib/data/*.ts`)
- [ ] Bygga sidor med `generateStaticParams`
- [ ] Verifiera att all data renderas korrekt

### Fas 3: Implementera dynamiska features
- [ ] `/api/scan` - Google Vision OCR
- [ ] `/api/voice` - Whisper transcription
- [ ] `/api/share` - Vercel KV för delade listor
- [ ] localStorage hooks för inköpslistor

### Fas 4: Avveckla Supabase
- [ ] Verifiera allt fungerar utan Supabase
- [ ] Ta bort Supabase-miljövariabler
- [ ] Avsluta Supabase-projekt (spara pengar)

---

## Kostnadsanalys

| Tjänst | Supabase | Vercel |
|--------|----------|--------|
| Database reads | $25+/mo | $0 (JSON) |
| Edge Functions | $25+/mo | Free tier |
| KV Storage | - | Free tier (30k req) |
| **Total** | ~$50/mo | ~$0-20/mo |
