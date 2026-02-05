# URL-mappning: Loveable → Next.js 15

## Statussymboler
- ✅ Identisk URL — ingen redirect behövs
- 🔄 Ändrad URL — 301 redirect konfigurerad
- 🔜 Ej byggd ännu — planerad för framtida fas
- ❌ Borttagen — redirect till närmaste motsvarighet

---

## Startsida & Statiska sidor

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/` | `/` | ✅ Identisk |
| `/om` | `/om` | 🔜 Planerad |
| `/funktioner` | `/funktioner` | 🔜 Planerad |
| `/integritet` | `/integritet` | 🔜 Planerad |
| `/kallor` | `/kallor` | 🔜 Planerad |
| `/sajtkarta` | `/sajtkarta` | 🔜 Planerad |

## E-ämnen

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/e-amnen` | `/e-amnen` | ✅ Identisk |
| `/e-amnen/:slug` | `/e-amnen/[slug]` | ✅ Identisk (267 SSG) |
| `/e-amnen/guide` | `/e-amnen/guide` | 🔜 Planerad |
| `/e-amnen/scanner` | `/skanner` | 🔄 301 redirect i Fas 6 |
| `/e-amnen/alla` | `/e-amnen/alla` | 🔜 Planerad |
| `/e-amnen/historik` | `/e-amnen/historik` | 🔜 Planerad |
| `/e-amnen/nummer/:letter` | `/e-amnen/nummer/[letter]` | 🔜 Planerad |
| `/e-amnen/kategori/:category` | `/e-amnen/kategori/[category]` | 🔜 Planerad |

## Livsmedel

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/livsmedel` | `/livsmedel` | ✅ Identisk |
| `/livsmedel/:letter` | `/livsmedel` | 🔄 301 redirect (bokstav integrerad i översiktssida) |
| `/livsmedel/:letter/:foodSlug` | `/livsmedel/[slug]` | 🔄 301 redirect (förenklad URL-struktur) |
| `/livsmedel/kategori/:categorySlug` | `/livsmedel/kategori/[categorySlug]` | 🔜 Planerad |

### Livsmedel redirects (301)
Gammal URL-struktur använde `/livsmedel/:letter/:slug` (t.ex. `/livsmedel/a/apelsin`).
Ny struktur är flat: `/livsmedel/:slug` (t.ex. `/livsmedel/apelsin`).
301 redirect: `/livsmedel/:letter/:slug` → `/livsmedel/:slug`

## Shopping / Handla (produkter)

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/shopping` | `/handla` | 🔄 301 redirect |
| `/shopping/delitea` | `/handla` | 🔄 301 redirect (enda butiken) |
| `/shopping/produkter` | `/handla` | 🔄 301 redirect |
| `/shopping/produkter/:letter` | `/handla` | 🔄 301 redirect |
| `/shopping/kategorier` | `/handla` | 🔄 301 redirect |
| `/shopping/kategori/:categorySlug` | `/handla/kategori/[slug]` | 🔄 301 redirect |
| `/shopping/:store` | `/handla` | 🔄 301 redirect |
| `/shopping/:store/:slug` | `/handla/produkt/[slug]` | 🔄 301 redirect (slug behåller `-delitea` suffix) |

### Shopping redirects (301)
Alla `/shopping/...` URLs omdirigeras till `/handla/...` motsvarigheter.
Produktslugs i data inkluderar butikssuffix (t.ex. `produkt-namn-delitea`).

## Inköpslistor

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/inkopslistor` | `/inkopslista` | 🔄 301 redirect |
| `/inkopslista` | `/inkopslista` | ✅ Byggd i Fas 5 |
| `/list/:shareToken` | `/inkopslista/dela/[token]` | 🔄 301 redirect |
| `/listor` | `/inkopslista` | 🔜 Planerad (redirect) |
| `/listor/:slug` | `/inkopslista/mallar/[slug]` | ✅ Byggd i Fas 5 |

## Scanner

| Gammal URL (Loveable) | Ny URL (Next.js) | Status |
|---|---|---|
| `/e-amnen/scanner` | `/skanner` | 🔄 301 redirect i Fas 6 |
| `/scanner` | `/skanner` | 🔄 301 redirect i Fas 6 |

## API Routes

| Gammal (Supabase) | Ny (Next.js) | Status |
|---|---|---|
| Supabase Edge: scan-e-numbers | `/api/scan` | ✅ Byggd i Fas 6 |
| Supabase Edge: voice-to-text | `/api/voice` | 🔜 Planerad |
| Intern affiliate redirect | `/api/redirect/[store]` | ✅ Byggd i Fas 4 |
| Lista CRUD | `/api/lists/*` | ✅ Byggd i Fas 5 |
| Lista SSE stream | `/api/lists/[token]/stream` | ✅ Byggd i Fas 5 |
| Supabase Edge: health | `/api/health` | 🔜 Planerad |

---

## Sammanfattning

| Sektion | Totalt URLs | Identiska | 301 Redirects | Planerade |
|---|---|---|---|---|
| Startsida & Statiska | 6 | 1 | 0 | 5 |
| E-ämnen | 8 | 2 (+ 267 SSG) | 0 | 6 |
| Livsmedel | 4 | 1 (+ 68 SSG) | 2 | 1 |
| Shopping/Handla | 8 | 0 | 8 | 0 |
| Inköpslistor | 5 | 2 | 2 | 1 |
| Scanner | 1 | 0 | 0 | 1 |
| **Totalt** | **32** | **4** | **10** | **18** |

Alla 301 redirects är implementerade i `next.config.ts`.
