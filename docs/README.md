# vihandlar.se - Dokumentation

## Översikt

vihandlar.se är en svensk konsumentapp med tre huvudfunktioner:
1. **E-nummerskanner** - OCR-skanning av ingredienslistor
2. **Livsmedelsguide** - A-Ö guide med näringsvärden
3. **Inköpslistor** - Smarta listor med delning

## Dokumentindex

| Fil | Beskrivning |
|-----|-------------|
| [ROADMAP.md](./ROADMAP.md) | Migrationsfaser och pågående arbete |
| [DATABASE.md](./DATABASE.md) | Supabase-export och datastrategi |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Systemöversikt och dataflöden |
| [MIGRATION.md](./MIGRATION.md) | Komponentmappning Loveable → Next.js |
| [COMPONENTS.md](./COMPONENTS.md) | Komponentkatalog |
| [SEO.md](./SEO.md) | Routes, metadata och Schema.org |

## Tech Stack

| Loveable (nuvarande) | Next.js 15 (mål) |
|---------------------|------------------|
| React 18 + Vite | Next.js 15 App Router |
| React Router | File-based routing |
| Supabase | JSON + Vercel KV |
| Supabase Edge Functions | Vercel Functions |
| react-helmet-async | generateMetadata |

## Data-filer

```
data/
├── e-additives.json      # E-ämnen (exportera full från Supabase)
├── foods.json            # Livsmedel
├── food-categories.json  # Livsmedelskategorier
├── stores.json           # Adtraction-butiker
├── public-lists.json     # Färdiga inköpslistor
├── routes.json           # Route-mappning
└── schema.json           # Databasschema (referens)
```

## Modulära regler

Se `.claude/rules/` för kontextspecifika regler:
- `e-additives.md` - E-ämnen och scanner
- `foods.md` - Livsmedel
- `affiliate.md` - Shopping och Adtraction
- `database.md` - Datahantering
- `seo.md` - SEO och metadata

## Quickstart

```bash
# Installera dependencies
npm install

# Starta dev-server
npm run dev

# Bygg för produktion
npm run build
```

## Environment Variables

```env
# Scanner (Google Cloud Vision)
GOOGLE_CLOUD_API_KEY=

# Voice input (OpenAI Whisper)  
OPENAI_API_KEY=

# Vercel KV (för delade listor)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```
