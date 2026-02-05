# ROADMAP - vihandlar.se Next.js Migration

## Vision
Migrera vihandlar.se från Loveable (React 18 + Vite + Supabase) till Next.js 15 för bättre SEO, performance och lägre kostnader.

---

## 🔴 Fas 1: Grundsetup (PÅGÅENDE)
- [ ] Exportera all data från Supabase
- [ ] Initiera Next.js 15 med `create-next-app`
- [ ] Installera shadcn/ui komponenter
- [ ] Kopiera Tailwind config + CSS variabler
- [ ] Konfigurera Vercel-projekt
- [ ] Sätt upp miljövariabler

## 🟡 Fas 2: Layout & Navigation
- [ ] `app/layout.tsx` - Root layout med fonts
- [ ] Header-komponent med navigation
- [ ] Footer-komponent
- [ ] Mobile navigation (hamburger)
- [ ] Breadcrumbs-komponent
- [ ] Dark mode toggle

## 🟡 Fas 3: Statiska sidor
- [ ] Startsida `/`
- [ ] Om oss `/om`
- [ ] Integritetspolicy `/integritet`
- [ ] Kontakt `/kontakt`
- [ ] 404-sida

## 🟡 Fas 4: E-ämnen (Server Components)
- [ ] Hub `/e-amnen` - Sök, kategorier, featured
- [ ] Detalj `/e-amnen/[slug]` - generateStaticParams
- [ ] Kategori `/e-amnen/kategori/[slug]`
- [ ] Per nummer `/e-amnen/nummer/[letter]`
- [ ] Guide `/e-amnen/guide`
- [ ] Komponenter: EAdditiveCard, RiskGauge, RiskBadge
- [ ] Schema.org markup

## 🟡 Fas 5: E-nummerskanner (Client Component)
- [ ] Scanner-sida `/e-amnen/scanner` ('use client')
- [ ] API Route `/api/scan/route.ts` (Google Vision)
- [ ] CameraCapture-komponent
- [ ] ImageUpload-komponent
- [ ] ScanResults-komponent
- [ ] Dela-funktion (Vercel KV)
- [ ] Skanningshistorik (localStorage)

## 🟡 Fas 6: Livsmedel (Server Components)
- [ ] Hub `/livsmedel` - A-Ö navigation
- [ ] Per bokstav `/livsmedel/[letter]`
- [ ] Detalj `/livsmedel/[letter]/[slug]`
- [ ] Kategori `/livsmedel/kategori/[slug]`
- [ ] Komponenter: FoodCard, NutritionTable, AlphabetNav
- [ ] Schema.org NutritionInformation

## 🟡 Fas 7: Inköpslistor (Client Component)
- [ ] Lista-sida `/inkopslistor` ('use client')
- [ ] useShoppingList hook (localStorage)
- [ ] Komponenter: ListItem, AddItemForm, CategoryGroup
- [ ] Dela-funktion via Vercel KV
- [ ] Publika färdiga listor
- [ ] Röstinmatning (Whisper API)

## 🟡 Fas 8: Shopping/Affiliate
- [ ] Hub `/shopping`
- [ ] Butik `/shopping/[store]`
- [ ] Produkt `/shopping/[store]/[slug]`
- [ ] Kategori `/shopping/kategori/[slug]`
- [ ] API Route `/api/redirect/[store]/route.ts`
- [ ] Komponenter: ProductCard, ProductGrid, AffiliateDisclaimer

## 🟡 Fas 9: SEO & GEO
- [ ] `app/sitemap.ts` - Dynamisk sitemap
- [ ] `app/robots.ts` - Robots med AI-botar
- [ ] `public/llms.txt` - AI-optimering
- [ ] JSON-LD på alla sidor
- [ ] Open Graph images
- [ ] generateMetadata på alla sidor

## 🟡 Fas 10: Optimering
- [ ] Lighthouse score >90
- [ ] Core Web Vitals grön
- [ ] Bundle size analys
- [ ] Image optimization (WebP, lazy load)
- [ ] Font optimization (next/font)

---

## Backlog (framtida features)
- [ ] PWA med offline-stöd
- [ ] Push-notiser för delade listor
- [ ] ADI-kalkylator (kroppsvikt × ADI)
- [ ] E-ämnes jämförelse-verktyg
- [ ] Favoritmarkering av E-ämnen
- [ ] Exportera lista till andra appar

---

## Avklarad historik
_Flytta items hit när de är klara, eller ta bort (git log har historik)_

---

## Metrics & Mål
| Metric | Mål | Nuvarande |
|--------|-----|-----------|
| Lighthouse Performance | >90 | - |
| First Contentful Paint | <1.5s | - |
| Time to Interactive | <3.5s | - |
| Bundle size (JS) | <200KB | - |
| E-ämnen indexerade | 354 | 0 |
