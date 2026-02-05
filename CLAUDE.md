# vihandlar.se → Next.js 15

## Stack
- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- JSON data (statisk, exporterad från Supabase)
- Vercel KV (Redis) för inköpslistor och delning
- Vercel Functions för scanner/voice
- SSE/polling för realtime sync

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
- Ingen Supabase — all data är JSON eller Vercel KV

## Rendering-strategi
| Innehåll | Strategi | Detaljer |
|----------|----------|---------|
| E-ämnen (267) | SSG | generateStaticParams vid build |
| Livsmedel (68) | SSG | generateStaticParams vid build |
| Produkter (10521) | ISR | revalidate: 3600 |
| Kategorier (144) | ISR | revalidate: 3600 |
| Startsida | ISR | revalidate: 1800 |
| Inköpslista | CSR | 'use client' + Vercel KV |
| E-nummerskanner | CSR | 'use client' + API Route |

## Design
- Primärfärg: Orange `#FF8000` / `hsl(37 100% 50%)`
- Accent: Grön (success states)
- Font: Inter (Google Fonts)
- Dark mode via CSS-variabler

## Mappstruktur
```
app/                    # App Router
├── (marketing)/        # Startsida, om, etc
├── (app)/              # E-ämnen, livsmedel, listor
└── api/                # Route Handlers
components/             # Delade komponenter
data/                   # JSON-data (exporterad)
lib/                    # Data access, utils
types/                  # TypeScript interfaces
reference/              # Loveable källkod (referens)
docs/                   # Dokumentation
```

## Docs
- `docs/ROADMAP.md` - Faser och mål
- `docs/DATABASE.md` - Dataexport-strategi
- `docs/ARCHITECTURE.md` - Systemöversikt
- `docs/MIGRATION.md` - Komponentmappning
- `docs/SEO.md` - Routes och metadata

## Snabbreferens
| Statisk sida | `generateStaticParams()` + `generateMetadata()` |
| Dynamisk sida | `'use client'` + hooks |
| Data access | `lib/data/*.ts` (server-side) |
| Styling | Tailwind + CSS variabler i `globals.css` |
