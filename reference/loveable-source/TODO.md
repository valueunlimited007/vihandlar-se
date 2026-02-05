# vihandlar.se → Next.js 15 Migration

## Fas 1: Grundsetup
- [ ] 1.1 Skapa Next.js 15 projekt med App Router
- [ ] 1.2 Konfigurera TypeScript, Tailwind, shadcn/ui
- [ ] 1.3 Sätt upp Vercel-projekt med miljövariabler
- [ ] 1.4 Skapa /data mapp med JSON-export från Supabase
- [ ] 1.5 Definiera typer i /types baserat på schema.json

## Fas 2: Layout och Navigation
- [ ] 2.1 Migrera Layout.tsx → app/layout.tsx (RootLayout)
- [ ] 2.2 Skapa header med navigation (5 länkar: Handla Mat, E-ämnen, Livsmedel, Inköpslistor, Om oss)
- [ ] 2.3 Footer med affiliate-disclaimer + A-Ö länkar
- [ ] 2.4 Breadcrumbs som Server Component
- [ ] 2.5 SEO-metadata med generateMetadata

## Fas 3: Statiska sidor
- [ ] 3.1 Startsida (/) - LandingPage.tsx
- [ ] 3.2 Om oss (/om) - About.tsx
- [ ] 3.3 Integritet (/integritet) - Privacy.tsx
- [ ] 3.4 Källor (/kallor) - Sources.tsx
- [ ] 3.5 Sajtkarta (/sajtkarta) - DynamicSitemap.tsx
- [ ] 3.6 Funktioner (/funktioner) - Features.tsx

## Fas 4: E-ämnen (statisk generering - 354 sidor)
- [ ] 4.1 Hub-sida /e-amnen (EAdditiveHub.tsx)
- [ ] 4.2 Detaljsidor /e-amnen/[slug] med generateStaticParams (EAdditiveDetail.tsx)
- [ ] 4.3 Kategorisidor /e-amnen/kategori/[category] (EAdditiveCategory.tsx)
- [ ] 4.4 Bokstavssidor /e-amnen/nummer/[letter] (EAdditiveLetter.tsx)
- [ ] 4.5 Guide-sida /e-amnen/guide (EAdditiveGuide.tsx)
- [ ] 4.6 Alla-sida /e-amnen/alla (EAdditiveAllView.tsx)

## Fas 5: E-nummerskanner (dynamisk - Client Component)
- [ ] 5.1 Skannersida /e-amnen/scanner ('use client')
- [ ] 5.2 Vercel Edge Function för OCR (Google Vision API)
- [ ] 5.3 Dela-funktion med /scan/[shareToken]
- [ ] 5.4 Historik med localStorage
- [ ] 5.5 Offline-stöd med offlineEAdditives.ts

## Fas 6: Livsmedel (statisk generering - 2500+ sidor)
- [ ] 6.1 Hub-sida /livsmedel (FoodHubSimple.tsx)
- [ ] 6.2 Bokstavssidor /livsmedel/[letter] (FoodLetterSimple.tsx)
- [ ] 6.3 Detaljsidor /livsmedel/[letter]/[foodSlug] (FoodDetailSimple.tsx)
- [ ] 6.4 Kategorisidor /livsmedel/kategori/[categorySlug] (FoodCategory.tsx)

## Fas 7: Inköpslistor (Client Components + Vercel KV)
- [ ] 7.1 Startsida /inkopslistor ('use client') - HomePage.tsx
- [ ] 7.2 Dela-funktion /list/[shareToken] - ShoppingListView.tsx
- [ ] 7.3 Publika listor /listor - PublicLists.tsx
- [ ] 7.4 Lista-detalj /listor/[slug] - PublicListDetail.tsx
- [ ] 7.5 Vercel KV för delning (ersätter Supabase realtime)
- [ ] 7.6 SEO-sida /inkopslista - ShoppingListSEO.tsx

## Fas 8: Shopping/Affiliate (7000+ produkter)
- [ ] 8.1 Hub-sida /shopping (ShoppingHub.tsx)
- [ ] 8.2 Delitea-sida /shopping/delitea (DeliteaShop.tsx)
- [ ] 8.3 Butikssidor /shopping/[store] (StoreShop.tsx)
- [ ] 8.4 Produktsidor /shopping/[store]/[slug] (ProductDetail.tsx)
- [ ] 8.5 Produkt-browse /shopping/produkter (ProductBrowse.tsx)
- [ ] 8.6 Produkter per bokstav /shopping/produkter/[letter] (ProductBrowseByLetter.tsx)
- [ ] 8.7 Kategori-hub /shopping/kategorier (ProductCategoryHub.tsx)
- [ ] 8.8 Kategorisidor /shopping/kategori/[categorySlug] (ProductCategory.tsx)
- [ ] 8.9 Redirect API /api/redirect/[store]/route.ts

## Fas 9: SEO och GEO
- [ ] 9.1 Dynamisk sitemap.xml (9 sitemap-filer)
- [ ] 9.2 robots.txt med AI-botar (GPTBot, ClaudeBot, etc.)
- [ ] 9.3 llms.txt och /.well-known/llms.txt
- [ ] 9.4 JSON-LD schema på alla sidor (schemaMarkup.ts)
- [ ] 9.5 Open Graph images
- [ ] 9.6 humans.txt och security.txt

## Fas 10: Edge Functions (migreras från Supabase)
- [ ] 10.1 scan-e-numbers → /api/scan/route.ts (Google Vision OCR)
- [ ] 10.2 voice-to-text → /api/voice/route.ts (Whisper API)
- [ ] 10.3 lists → JSON + Vercel KV
- [ ] 10.4 llms → statisk fil /llms.txt
- [ ] 10.5 sitemap → Next.js route handlers
- [ ] 10.6 health → /api/health/route.ts

## Fas 11: Optimering
- [ ] 11.1 Image optimization med next/image
- [ ] 11.2 Font optimization (Geist/Inter)
- [ ] 11.3 Bundle analysis
- [ ] 11.4 Lighthouse audit (>90 alla kategorier)
- [ ] 11.5 Core Web Vitals optimering

## Backlog
- [ ] Voice input med Whisper API
- [ ] PWA med offline-stöd (sw.js)
- [ ] Push-notiser för inköpslistor
- [ ] Capacitor mobile apps (Android/iOS)
