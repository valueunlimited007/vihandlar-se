# vihandlar.se → Next.js 15

## Stack
- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- JSON data (migrerat från Supabase)
- Vercel (Edge Functions för scanner/voice)

## Kommandon
```bash
npm run dev          # Starta dev-server
npm run build        # Bygg för produktion
npm run lint         # ESLint
npm run type-check   # TypeScript
```

## Kritiska regler
- Svenska i UI, engelska i kod
- Server Components som default
- 'use client' endast vid useState/useEffect/browser APIs
- Affiliate-länkar via `/api/redirect/[store]` (ALDRIG direktlänkar)
- Alla bilder via next/image

## Mappstruktur
```
app/                    # App Router
├── (marketing)/        # Startsida, om, etc
├── (app)/              # E-ämnen, livsmedel, listor
└── api/                # Route Handlers
data/                   # JSON-data (export från Supabase)
.claude/rules/          # Modulära regler (laddas per kontext)
docs/                   # Utförlig dokumentation
```

## Modulära regler
Se `.claude/rules/` - laddas automatiskt baserat på vilka filer du jobbar med.

## Vid sessionstart
1. Läs `docs/DATABASE.md` om data behöver exporteras
2. Läs `docs/ROADMAP.md` för pågående arbete
3. Kör `npm run dev` och testa

## Docs
- `docs/ROADMAP.md` - Faser och mål
- `docs/DATABASE.md` - Supabase-export och strategi  
- `docs/ARCHITECTURE.md` - Systemöversikt
- `docs/MIGRATION.md` - Komponentmappning
- `docs/SEO.md` - Routes och metadata

## Snabbreferens
| Statisk sida | `generateStaticParams()` + `generateMetadata()` |
| Dynamisk sida | `'use client'` + hooks |
| Data access | `lib/data/*.ts` (server-side) |
| Styling | Tailwind + CSS variabler i `globals.css` |
