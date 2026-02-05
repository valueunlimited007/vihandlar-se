# Arkitektur

## Dataflöden

### E-nummerskanner
1. Användare tar foto/laddar upp bild
2. Base64-encode → Vercel Edge Function
3. Google Cloud Vision OCR → extrahera text
4. Regex-extraktion: /E\s*\d{3,4}[a-z]*/gi
5. Lookup mot e_additives JSON
6. Returnera riskbedömning (high/medium/low)

### Inköpslistor
1. Lokal state i React (useShoppingList hook)
2. Vid delning: generera shareToken (UUID)
3. Spara till Vercel KV (ersätter Supabase)
4. Delad URL: /list/[shareToken]
5. Polling för sync (ersätter Supabase Realtime)

### Affiliate-flöde
1. Produktdata från Adtraction feeds (JSON)
2. Visning med affiliate-disclaimer
3. Klick → /api/redirect/[store]
4. Redirect till Adtraction tracking URL
5. Cookie sätts, vidare till butik

## Datamodeller

### e_additives
| Fält | Typ | Beskrivning |
|------|-----|-------------|
| e_number | string | PK, ex "E100" |
| name | string | Svenskt namn |
| slug | string | URL-vänlig |
| category | string | Färgämnen, Konserveringsmedel, etc |
| risk_score | number | 0-10 (7+ = hög risk) |
| adi_value | number? | Acceptabelt dagligt intag |
| short_description | string | Kort beskrivning |
| long_description | string | Detaljerad info |
| common_products | JSON | Vanliga produkter |
| health_effects | JSON | Hälsoeffekter |
| children_note | string? | Varning för barn |

### foods
| Fält | Typ | Beskrivning |
|------|-----|-------------|
| name | string | Livsmedelsnamn |
| slug | string | URL-vänlig |
| letter | string | A-Ö |
| category_id | FK | → food_categories |
| calories | number | kcal/100g |
| protein | number | gram/100g |
| fat | number | gram/100g |
| carbohydrates | number | gram/100g |
| storage_method | string | Förvaringsråd |
| allergens | string[] | Allergener |
| season | string[] | Säsong |

### stores
| Fält | Typ | Beskrivning |
|------|-----|-------------|
| name | string | Butiksnamn |
| slug | string | URL-vänlig |
| affiliate_network | string | "adtraction" |
| affiliate_config | JSON | { programId, channelId } |
| feed_url | string | Produktfeed URL |
| is_active | boolean | Aktiv status |

### products
| Fält | Typ | Beskrivning |
|------|-----|-------------|
| id | string | UUID |
| name | string | Produktnamn |
| slug | string | URL-vänlig |
| store_id | FK | → stores |
| price | number | Pris i SEK |
| original_price | number? | Ordinarie pris |
| image_url | string? | Produktbild |
| product_url | string | Länk till butik |
| category | string? | Kategori |
| brand | string? | Varumärke |
| ean | string? | EAN-kod |
| in_stock | boolean | Lagerstatus |

## Supabase Edge Functions → Vercel

| Supabase Function | Vercel Equivalent | Anteckningar |
|-------------------|-------------------|--------------|
| scan-e-numbers | /api/scan/route.ts | Google Vision OCR |
| voice-to-text | /api/voice/route.ts | Whisper API |
| lists | JSON + Vercel KV | Publika listor |
| llms | /llms.txt (statisk) | llms.txt content |
| sitemap | Next.js sitemap.ts | Inbyggd sitemap |
| generate-sitemap | generateStaticParams | Build-time |
| health | /api/health/route.ts | Health check |
| import-product-feed | Cron job/webhook | Produktimport |

## Filstruktur (Next.js 15)

```
app/
├── (marketing)/
│   ├── page.tsx              # Startsida
│   ├── om/page.tsx
│   ├── integritet/page.tsx
│   └── funktioner/page.tsx
├── (app)/
│   ├── e-amnen/
│   │   ├── page.tsx          # Hub
│   │   ├── [slug]/page.tsx   # Detalj (354 st)
│   │   ├── scanner/page.tsx  # Client Component
│   │   ├── kategori/[category]/page.tsx
│   │   └── nummer/[letter]/page.tsx
│   ├── livsmedel/
│   │   ├── page.tsx          # Hub
│   │   ├── [letter]/page.tsx
│   │   ├── [letter]/[foodSlug]/page.tsx
│   │   └── kategori/[categorySlug]/page.tsx
│   ├── shopping/
│   │   ├── page.tsx          # Hub
│   │   ├── [store]/page.tsx
│   │   ├── [store]/[slug]/page.tsx
│   │   ├── produkter/page.tsx
│   │   └── kategori/[categorySlug]/page.tsx
│   └── inkopslistor/page.tsx # Client Component
├── api/
│   ├── scan/route.ts
│   ├── voice/route.ts
│   ├── redirect/[store]/route.ts
│   └── health/route.ts
├── layout.tsx
├── not-found.tsx
└── error.tsx

data/
├── e-additives.json
├── foods.json
├── food-categories.json
├── stores.json
├── products.json
└── public-lists.json

lib/
├── data/
│   ├── e-additives.ts
│   ├── foods.ts
│   ├── products.ts
│   └── stores.ts
└── utils/
    ├── schema-markup.ts
    └── affiliate-tracking.ts

types/
├── e-additive.ts
├── food.ts
├── product.ts
└── store.ts
```

## Caching-strategi

| Resurs | Strategi | TTL |
|--------|----------|-----|
| E-ämnen | Static | Build-time |
| Livsmedel | Static | Build-time |
| Produkter | ISR | 1 timme |
| Kategorier | ISR | 1 timme |
| Publika listor | Static | Build-time |
| Delade listor | Vercel KV | 24 timmar |
