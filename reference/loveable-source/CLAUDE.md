# vihandlar.se

## Stack (mål)
- Next.js 15 App Router, TypeScript, Tailwind
- shadcn/ui komponenter  
- JSON-data i /data (migrerat från Supabase)
- Vercel Edge Functions för dynamik
- Adtraction affiliate-flöde

## Kommandon
npm run dev
npm run build
npm run lint
npm run export-data    # Exportera JSON från Supabase

## Regler
- Svenska UI, engelska kod/kommentarer  
- Affiliate-länkar via /api/redirect/[store]
- JSON-data i /data, typer i /types
- ISR för kategorisidor (revalidate: 3600)
- Statisk generering för e-ämnen och livsmedel
- Server Components som default, 'use client' endast vid behov

## Docs
- [TODO.md](./TODO.md) - Migrationstasks → hydrera till Tasks
- [docs/migration/README.md](./docs/migration/README.md) - Dokumentationsindex
- [docs/migration/ARCHITECTURE.md](./docs/migration/ARCHITECTURE.md) - Arkitektur och dataflöden
- [docs/migration/MIGRATION.md](./docs/migration/MIGRATION.md) - Komponentmappning
- [docs/migration/SEO.md](./docs/migration/SEO.md) - Routes, meta, GEO
- [docs/migration/COMPONENTS.md](./docs/migration/COMPONENTS.md) - Komponentkatalog
- [docs/migration/data/](./docs/migration/data/) - JSON-data för migration

## Patterns
- Route groups: (marketing), (app), (api)
- Parallel routes för modaler
- generateStaticParams för dynamiska routes
- Server Actions för formulär

## Supabase → JSON export
npx supabase db dump --data-only > backup.sql
# Eller via Edge Function: /api/export-data

## Session-start
Läs TODO.md och skapa Tasks för nästa fas.
