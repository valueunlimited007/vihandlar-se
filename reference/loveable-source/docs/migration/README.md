# vihandlar.se Dokumentation

## Översikt
vihandlar.se är en svensk konsumentapp med:
- E-nummerskanner (OCR + 354 tillsatser)
- Smarta inköpslistor med realtidsdelning
- Produktshopping med 7000+ produkter via Delitea/Adtraction
- Komplett livsmedelsguide (2500+ livsmedel)

## Dokumentindex

| Fil | Innehåll | Syfte |
|-----|----------|-------|
| [../CLAUDE.md](../CLAUDE.md) | Kortfattat projekt-overview | Session-start |
| [../TODO.md](../TODO.md) | Migrationstasks | Claude Tasks |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arkitektur, dataflöden | Förståelse |
| [MIGRATION.md](./MIGRATION.md) | Loveable → Next.js | Implementation |
| [SEO.md](./SEO.md) | Routes, meta, GEO | SEO/GEO |
| [COMPONENTS.md](./COMPONENTS.md) | Komponentkatalog | Referens |

## Tech Stack

### Nuvarande (Loveable)
- React 18 + Vite + TypeScript
- Supabase (PostgreSQL + Edge Functions + Realtime)
- Tailwind CSS + shadcn/ui
- React Router v6
- TanStack Query

### Mål (Next.js 15)
- Next.js 15 App Router
- JSON-data (statisk generering)
- Vercel Edge Functions
- Vercel KV (för delning)
- Server Components som default

## Datastorlek
- E-ämnen: 354 poster
- Livsmedel: 2500+ poster
- Produkter: 7000+ poster
- Produktkategorier: 144 kategorier
- Butiker: 1 (Delitea)
- Publika listor: dynamiskt

## API:er
- Google Cloud Vision (OCR)
- OpenAI Whisper (röst → text)
- Adtraction (affiliate-tracking)

## Snabblänkar
- [Routing-mappning](./MIGRATION.md#routing-mappning)
- [Komponentmappning](./MIGRATION.md#komponentmappning)
- [Data-access transformation](./MIGRATION.md#data-access-transformation)
- [Edge Functions](./MIGRATION.md#edge-function-scan-e-numbers)
