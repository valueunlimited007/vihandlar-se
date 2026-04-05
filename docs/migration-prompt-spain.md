# Migration Prompt: Spain (listadecompras.es)

> **What is this file?**
> This is a complete, copy-paste-ready prompt for a Claude Code session that will create the Spanish version of the shopping list app (listadecompras.es).
> The source repo is the Romanian version (listacumparaturi-ro), NOT vihandlar-se.
> Copy everything below the horizontal rule and paste it into a fresh Claude Code session opened in the cloned repo.

---

# Create listadecompras.es — Spanish Shopping List App

You are migrating the Romanian shopping list app (listacumparaturi.ro) to a Spanish version (listadecompras.es). The source repo is `valueunlimited007/listacumparaturi-ro`. You must follow every step below precisely.

**CRITICAL RULES (read before you start):**
1. **NO affiliate/Adtraction** — the Romanian source repo already has it removed. Do NOT add any.
2. **Source: listacumparaturi-ro** (NOT vihandlar-se).
3. **Castilian Spanish (es-ES)** — "ordenador" not "computadora", "movil" not "celular". Use vosotros form where appropriate.
4. **Font: Inter** (supports a, e, i, o, u with accents, n with tilde, u with diaeresis). Do NOT change the font.
5. **Color: Orange #FF8000** — do NOT change the primary color or design system.
6. **Organization:** Value Unlimited, Arenavägen 29, 121 77 Johanneshov, Stockholm, Sweden.
7. **Commit frequently** with atomic commits.
8. **`npm run build` must pass** before done.
9. **Use correct Spanish diacritics EVERYWHERE** — á, é, í, ó, ú, ñ, ü.

---

## 1. Critical Lessons from the Romanian Migration (DO NOT REPEAT)

The Romanian migration from vihandlar.se had 8 issues. You MUST avoid all of them:

### Issue 1: Source language remnants in UI
Every single user-facing string must be in Spanish. Search the ENTIRE codebase for Romanian text and replace with Spanish. Common hiding spots:
- `aria-label` attributes
- `placeholder` text in inputs
- `alt` text on images
- `title` attributes
- Error messages and toast notifications
- Loading states ("Se încarcă..." must become "Cargando...")
- 404 page text
- Footer text and copyright notices
- JSON-LD structured data (names, descriptions)

### Issue 2: Hardcoded domain references
Search for ALL occurrences of `listacumparaturi.ro` and `listacumparaturi-ro` and replace with `listadecompras.es` and `listadecompras-es` respectively. Also search for `vihandlar.se` — none should remain except in hreflang tags.

### Issue 3: Metadata not fully translated
Every `generateMetadata()` and `<head>` element must be in Spanish:
- `<title>` tags
- `<meta name="description">`
- `<meta name="keywords">`
- OpenGraph titles and descriptions
- Twitter card content
- JSON-LD structured data (schema.org)
- Canonical URLs must point to listadecompras.es

### Issue 4: Route slugs left in source language
All URL route segments must be in Spanish. See the complete route mapping table in Step 3.

### Issue 5: Analytics/tracking IDs not updated
Use the NEW Besökskollen site-id: `b81ab8d1-5379-41f7-89c8-0eb9eff06ed2`
Remove any Romanian tracking IDs. The data-site-id attribute in the Analytics component must be updated.

### Issue 6: Sitemap and robots.txt pointing to wrong domain
- `robots.ts` must reference `https://listadecompras.es/sitemap.xml`
- `sitemap.ts` must use `https://listadecompras.es/` as base URL for all entries

### Issue 7: Forgetting to update CLAUDE.md
The new repo MUST have its own CLAUDE.md reflecting the Spanish site (see Step 12).

### Issue 8: Legal/privacy page referencing wrong jurisdiction
Spain has its own data protection authority: AEPD (Agencia Española de Protección de Datos). Do NOT reference Romanian ANSPDCP or Swedish IMY.

---

## 2. Step 1 — Clone and Set Up

```bash
# Clone the Romanian repo as the starting point
git clone https://github.com/valueunlimited007/listacumparaturi-ro.git listadecompras-es
cd listadecompras-es

# Remove old git history and start fresh
rm -rf .git
git init
git remote add origin https://github.com/valueunlimited007/listadecompras-es.git

# Install dependencies
npm install
```

**IMPORTANT:** The source is `listacumparaturi-ro`, NOT `vihandlar-se`. The Romanian version already has affiliate/Adtraction code removed. Do NOT add any affiliate or Adtraction functionality.

---

## 3. Step 2 — Route Structure (COMPLETE Route Mapping)

Rename ALL route directories from Romanian to Spanish. This table is EXHAUSTIVE — every route in the app:

### Route directory renames:

| Romanian Route (source) | Spanish Route (target) | Notes |
|---|---|---|
| `/aditivi-alimentari/` | `/aditivos-alimentarios/` | E-additives hub |
| `/aditivi-alimentari/[slug]/` | `/aditivos-alimentarios/[slug]/` | E-additive detail |
| `/aditivi-alimentari/categorie/[slug]/` | `/aditivos-alimentarios/categoria/[slug]/` | E-additive category |
| `/aditivi-alimentari/serie/[series]/` | `/aditivos-alimentarios/serie/[series]/` | E-additive series |
| `/aditivi-alimentari/ghid/` | `/aditivos-alimentarios/guia/` | E-additive guide |
| `/aditivi-alimentari/toate/` | `/aditivos-alimentarios/todos/` | All additives |
| `/aditivi-alimentari/istoric/` | `/aditivos-alimentarios/historial/` | Scan history (has layout.tsx + page.tsx) |
| `/alimente/` | `/alimentos/` | Foods hub |
| `/alimente/[slug]/` | `/alimentos/[slug]/` | Food detail |
| `/alimente/categorie/[slug]/` | `/alimentos/categoria/[slug]/` | Food category |
| `/alimente/nutrienti/` | `/alimentos/nutrientes/` | Nutrients hub |
| `/alimente/nutrienti/[slug]/` | `/alimentos/nutrientes/[slug]/` | Nutrient detail |
| `/lista-de-cumparaturi/` | `/lista-de-compras/` | Shopping list (has layout.tsx with SoftwareApplication JSON-LD) |
| `/lista-de-cumparaturi/[id]/` | `/lista-de-compras/[id]/` | List by ID (has layout.tsx + page.tsx) |
| `/lista-de-cumparaturi/partajare/[token]/` | `/lista-de-compras/compartir/[token]/` | Shared list (has layout.tsx + page.tsx) |
| `/lista-de-cumparaturi/sabloane/` | `/lista-de-compras/plantillas/` | Templates (has page.tsx + layout.tsx) |
| `/lista-de-cumparaturi/sabloane/[slug]/` | `/lista-de-compras/plantillas/[slug]/` | Template detail (has layout.tsx + page.tsx) |
| `/scanner/` | `/escaner/` | Scanner (has layout.tsx with WebApplication JSON-LD + page.tsx) |
| `/despre/` | `/sobre-nosotros/` | About page |
| `/confidentialitate/` | `/privacidad/` | Privacy policy |
| `/functii/` | `/funciones/` | Features page |
| `/surse/` | `/fuentes/` | Sources page |
| `/harta-site/` | `/mapa-sitio/` | Sitemap page |
| `/termeni/` | `/terminos/` | Terms page |
| `/parteneriate/` | `/asociaciones/` | Partnerships page |

**IMPORTANT:** After renaming directories, update ALL `<Link href="...">`, `router.push()`, `redirect()`, and any other internal route references to use the new Spanish paths.

---

## 4. Step 3 — Domain and Language Swap

### 3A. Global find-and-replace (in this order):

| Find | Replace With |
|------|-------------|
| `listacumparaturi.ro` | `listadecompras.es` |
| `listacumparaturi-ro` | `listadecompras-es` |
| `contact@listacumparaturi.ro` | `contact@listadecompras.es` |
| `ro-RO` | `es-ES` (except in hreflang tags) |
| `ro_RO` | `es_ES` (except in hreflang tags) |
| `lang="ro"` | `lang="es"` |

### 3B. Update `lib/seo.ts` — SITE_CONFIG:

```typescript
export const SITE_CONFIG = {
  name: "listadecompras.es",
  alternateName: "Lista de Compras",
  tagline: "Tu asistente inteligente de compras - todo en un solo lugar",
  description:
    "La plataforma de alimentación más inteligente de España. Crea listas de compras compartidas, escanea aditivos E, y explora más de 2600 alimentos.",
  url: "https://listadecompras.es",
  locale: "es_ES",
  language: "es-ES",
  logo: "https://listadecompras.es/icon.svg",
  themeColor: "#FF8000",
} as const;
```

### 3C. Update `next.config.ts`:
- Verify all domain references point to listadecompras.es

### 3D. Update `package.json`:
- `"name": "listadecompras-es"`
- `"description"`: in Spanish
- `"homepage": "https://listadecompras.es"`

---

## 5. Step 4 — COMPLETE File List (Every File That Needs Translation)

This is an EXHAUSTIVE list of every file in the repo that needs translation. Do NOT skip any.

### 5A. app/ root files:

| File | What to translate |
|------|------------------|
| `app/layout.tsx` | `<html lang="es">`, metadata, site name, navigation labels, JSON-LD Organization |
| `app/page.tsx` | Hero text, feature descriptions, CTA buttons, metadata |
| `app/error.tsx` | Error message strings |
| `app/loading.tsx` | Loading text |
| `app/not-found.tsx` | 404 page text |
| `app/apple-icon.tsx` | Alt text if any |
| `app/opengraph-image.tsx` | Text rendered on OG image (must say Spanish text) |
| `app/robots.ts` | Domain to listadecompras.es |
| `app/sitemap.ts` | Base URL to listadecompras.es, all route paths to Spanish |
| `app/icon.svg` | Keep as-is (no text) |
| `app/globals.css` | Keep as-is (no translatable content) |

### 5B. app/ route pages (every page.tsx and layout.tsx):

**E-additives routes (rename directory: aditivi-alimentari → aditivos-alimentarios):**
- `app/(app)/aditivos-alimentarios/page.tsx` — Hub page
- `app/(app)/aditivos-alimentarios/layout.tsx` — Layout (if exists)
- `app/(app)/aditivos-alimentarios/[slug]/page.tsx` — Detail page
- `app/(app)/aditivos-alimentarios/categoria/[slug]/page.tsx` — Category page
- `app/(app)/aditivos-alimentarios/serie/[series]/page.tsx` — Series page
- `app/(app)/aditivos-alimentarios/guia/page.tsx` — Guide page
- `app/(app)/aditivos-alimentarios/todos/page.tsx` — All additives page
- `app/(app)/aditivos-alimentarios/historial/layout.tsx` — History layout
- `app/(app)/aditivos-alimentarios/historial/page.tsx` — History page

**Food routes (rename directory: alimente → alimentos):**
- `app/(app)/alimentos/page.tsx` — Hub page
- `app/(app)/alimentos/[slug]/page.tsx` — Detail page
- `app/(app)/alimentos/categoria/[slug]/page.tsx` — Category page
- `app/(app)/alimentos/nutrientes/page.tsx` — Nutrients hub
- `app/(app)/alimentos/nutrientes/[slug]/page.tsx` — Nutrient detail

**Shopping list routes (rename directory: lista-de-cumparaturi → lista-de-compras):**
- `app/(app)/lista-de-compras/page.tsx` — Main list page
- `app/(app)/lista-de-compras/layout.tsx` — Layout with SoftwareApplication JSON-LD
- `app/(app)/lista-de-compras/[id]/page.tsx` — List by ID
- `app/(app)/lista-de-compras/[id]/layout.tsx` — List by ID layout
- `app/(app)/lista-de-compras/compartir/[token]/page.tsx` — Shared list
- `app/(app)/lista-de-compras/compartir/[token]/layout.tsx` — Shared list layout
- `app/(app)/lista-de-compras/plantillas/page.tsx` — Templates page
- `app/(app)/lista-de-compras/plantillas/layout.tsx` — Templates layout
- `app/(app)/lista-de-compras/plantillas/[slug]/page.tsx` — Template detail
- `app/(app)/lista-de-compras/plantillas/[slug]/layout.tsx` — Template detail layout

**Scanner route (rename directory: scanner → escaner):**
- `app/(app)/escaner/page.tsx` — Scanner page
- `app/(app)/escaner/layout.tsx` — Layout with WebApplication JSON-LD

**Static pages:**
- `app/(marketing)/sobre-nosotros/page.tsx` — About (rename from despre)
- `app/(marketing)/privacidad/page.tsx` — Privacy (rename from confidentialitate)
- `app/(marketing)/funciones/page.tsx` — Features (rename from functii)
- `app/(marketing)/fuentes/page.tsx` — Sources (rename from surse)
- `app/(marketing)/mapa-sitio/page.tsx` — Sitemap (rename from harta-site)
- `app/(marketing)/terminos/page.tsx` — Terms (rename from termeni)
- `app/(marketing)/asociaciones/page.tsx` — Partnerships (rename from parteneriate)

### 5C. components/ files:

| File | What to translate |
|------|------------------|
| `components/Header.tsx` | Navigation labels, aria-labels, mobile menu text |
| `components/Footer.tsx` | Footer links, copyright, contact info |
| `components/Analytics.tsx` | Update data-site-id to `b81ab8d1-5379-41f7-89c8-0eb9eff06ed2` |
| `components/Toast.tsx` | Toast message strings |
| `components/ShoppingList.tsx` | All labels, buttons, empty states, tooltips, share URL path |
| `components/FoodSearch.tsx` | Placeholder text, no results text, labels |
| `components/EAdditiveSearch.tsx` | Placeholder text, no results text, labels |
| `components/EAdditiveCard.tsx` | Risk level labels, category labels |
| `components/RiskGauge.tsx` | Risk level labels |

**NOTE:** There is NO `ProductCard.tsx` or `ProductSearch.tsx` — these were removed in the Romanian version.

### 5D. lib/ files:

| File | What to translate |
|------|------------------|
| `lib/seo.ts` | SITE_CONFIG (see Step 3B above) |
| `lib/schema.ts` | JSON-LD generation — organization name, descriptions |
| `lib/utils.ts` | `formatDate` locale, `formatRelativeTime` strings, `slugify` character replacements |
| `lib/device-detection.ts` | `getDeviceLabel` — "Tabletă" → "Tableta", "Necunoscut" → "Desconocido" |
| `lib/kv.ts` | Error messages if any |
| `lib/data/foods.ts` | Data access functions (check for hardcoded strings) |
| `lib/data/e-additives.ts` | Data access functions (check for hardcoded strings) |
| `lib/data/nutrients.ts` | Data access functions (check for hardcoded strings) |

**NOTE:** There is NO `lib/data/products.ts` or `lib/data/stores.ts` — these were removed in the Romanian version.

### 5E. types/ files:

| File | What to translate |
|------|------------------|
| `types/e-additive.ts` | `E_CATEGORIES` names/slugs, `RISK_LEVELS` labels |
| `types/food.ts` | `ALPHABET` constant (Romanian → Spanish alphabet) |
| `types/shopping-list.ts` | `LIST_CATEGORIES`, `UNITS`, `QUICK_ADD_ITEMS`, `ITEM_NAME_REGEX` |
| `types/index.ts` | Re-exports only (remove store.ts export if present) |

**NOTE:** There is NO `types/store.ts` — removed in Romanian version.

### 5F. hooks/ files:

| File | What to translate |
|------|------------------|
| `hooks/useShoppingList.ts` | Error messages, localStorage keys |
| `hooks/usePresence.ts` | Error messages, localStorage keys |
| `hooks/useVoiceInput.ts` | Error messages, language parameter |
| `hooks/useAudioFeedback.ts` | Error messages, localStorage keys |

### 5G. API routes:

| File | What to translate |
|------|------------------|
| `app/api/scan/route.ts` | Demo ingredients, error messages, response text |
| `app/api/voice/route.ts` | `language` parameter, demo items, hallucination filter, error messages |
| `app/api/lists/route.ts` | Error messages |
| `app/api/lists/[token]/route.ts` | Error messages |
| `app/api/lists/[token]/items/route.ts` | Error messages |
| `app/api/lists/[token]/items/[itemId]/route.ts` | Error messages |
| `app/api/lists/[token]/stream/route.ts` | SSE event strings if any |
| `app/api/lists/[token]/presence/route.ts` | Error messages |

**NOTE:** There is NO `app/api/redirect/` — removed in Romanian version.

### 5H. Config files:

| File | What to translate |
|------|------------------|
| `middleware.ts` | Route patterns (update all Romanian paths to Spanish) |
| `next.config.ts` | Domain references |
| `package.json` | name, description, homepage |
| `CLAUDE.md` | Complete rewrite for Spanish site |
| `.env.example` | NEXT_PUBLIC_SITE_URL |

### 5I. Data files:

| File | What to translate |
|------|------------------|
| `data/foods.json` | All food names, descriptions, categories (2625 items — use Python script) |
| `data/food-categories.json` | Category names and descriptions |
| `data/food-categories-new.json` | Category names and descriptions |
| `data/e-additives.json` | Names, descriptions, categories, risk labels (353 items — use Python script) |
| `data/routes.json` | All route paths and labels |
| `data/public-lists.json` | Template names, descriptions, items |

**NOTE:** There is NO `data/products.json`, `data/product-categories.json`, or `data/stores.json` — removed in Romanian version.

### 5J. Public files:

| File | What to translate |
|------|------------------|
| `public/llms.txt` | Create NEW in Spanish (~150 lines), all features and URLs |
| `public/llms-full.txt` | Create NEW in Spanish (~4000+ lines), list ALL foods, ALL E-additives, ALL nutrients with URLs |
| `public/humans.txt` | Update language, team info |

---

## 6. Step 5 — Exact Translation Tables

These are the EXACT translations needed for constants and enums in the code. Copy these precisely.

### 6A. types/shopping-list.ts — LIST_CATEGORIES:

| Romanian (source) | Spanish (target) |
|---|---|
| Lactate | Lácteos |
| Carne | Carne |
| Pește | Pescado |
| Fructe | Frutas |
| Legume | Verduras |
| Panificație | Panadería |
| Congelate | Congelados |
| Produse uscate | Despensa |
| Conserve | Conservas |
| Băuturi | Bebidas |
| Igienă | Higiene |
| Curățenie | Limpieza |
| Altele | Otros |

```typescript
export const LIST_CATEGORIES = [
  "Lácteos",
  "Carne",
  "Pescado",
  "Frutas",
  "Verduras",
  "Panadería",
  "Congelados",
  "Despensa",
  "Conservas",
  "Bebidas",
  "Higiene",
  "Limpieza",
  "Otros",
] as const;
```

### 6B. types/shopping-list.ts — UNITS:

| Romanian (source) | Spanish (target) |
|---|---|
| buc | ud |
| kg | kg |
| g | g |
| l | l |
| dl | dl |
| ml | ml |
| pac | paq |
| pungă | bolsa |
| cutie | lata |
| sticlă | botella |

```typescript
export const UNITS = [
  "ud",
  "kg",
  "g",
  "l",
  "dl",
  "ml",
  "paq",
  "bolsa",
  "lata",
  "botella",
] as const;
```

### 6C. types/shopping-list.ts — QUICK_ADD_ITEMS:

```typescript
export const QUICK_ADD_ITEMS = [
  { name: "Leche", category: "Lácteos" },
  { name: "Pan", category: "Panadería" },
  { name: "Mantequilla", category: "Lácteos" },
  { name: "Huevos", category: "Lácteos" },
  { name: "Queso", category: "Lácteos" },
  { name: "Plátanos", category: "Frutas" },
  { name: "Manzanas", category: "Frutas" },
  { name: "Patatas", category: "Verduras" },
  { name: "Cebolla", category: "Verduras" },
  { name: "Zanahorias", category: "Verduras" },
  { name: "Tomates", category: "Verduras" },
  { name: "Pepino", category: "Verduras" },
  { name: "Pechuga de pollo", category: "Carne" },
  { name: "Carne picada", category: "Carne" },
  { name: "Pasta", category: "Despensa" },
  { name: "Arroz", category: "Despensa" },
  { name: "Yogur", category: "Lácteos" },
  { name: "Café", category: "Bebidas" },
] as const;
```

### 6D. types/shopping-list.ts — ITEM_NAME_REGEX:

```typescript
// Spanish regex must support á, é, í, ó, ú, ñ, ü
export const ITEM_NAME_REGEX = /^[\w\s\-áéíóúñüÁÉÍÓÚÑÜ.,!?()\/&%:]+$/;
```

### 6E. types/e-additive.ts — E_CATEGORIES:

| Romanian (source) | Spanish (target) | Slug |
|---|---|---|
| Coloranți | Colorantes | colorantes |
| Conservanți | Conservantes | conservantes |
| Antioxidanți | Antioxidantes | antioxidantes |
| Emulgatori | Emulsionantes | emulsionantes |
| Regulatori de aciditate | Reguladores de acidez | reguladores-de-acidez |
| Potențiatori de aromă | Potenciadores de sabor | potenciadores-de-sabor |
| Îndulcitori | Edulcorantes | edulcorantes |

```typescript
export const E_CATEGORIES = [
  { name: 'Colorantes', range: '100-199', slug: 'colorantes' },
  { name: 'Conservantes', range: '200-299', slug: 'conservantes' },
  { name: 'Antioxidantes', range: '300-399', slug: 'antioxidantes' },
  { name: 'Emulsionantes', range: '400-499', slug: 'emulsionantes' },
  { name: 'Reguladores de acidez', range: '500-599', slug: 'reguladores-de-acidez' },
  { name: 'Potenciadores de sabor', range: '600-699', slug: 'potenciadores-de-sabor' },
  { name: 'Edulcorantes', range: '900-999', slug: 'edulcorantes' },
] as const;
```

### 6F. types/e-additive.ts — RISK_LEVELS:

| Romanian (source) | Spanish (target) |
|---|---|
| Risc scăzut | Riesgo bajo |
| Risc mediu | Riesgo medio |
| Risc ridicat | Riesgo alto |

```typescript
export const RISK_LEVELS = {
  LOW: { min: 1, max: 3, label: 'Riesgo bajo', color: 'green' },
  MEDIUM: { min: 4, max: 6, label: 'Riesgo medio', color: 'yellow' },
  HIGH: { min: 7, max: 10, label: 'Riesgo alto', color: 'red' },
} as const;
```

### 6G. types/food.ts — ALPHABET:

Replace the Romanian alphabet with the Spanish alphabet:

```typescript
// Letras españolas para navegación alfabética
export const SPANISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
] as const;

export type SpanishLetter = typeof SPANISH_ALPHABET[number];
```

### 6H. lib/utils.ts — formatRelativeTime strings:

| Romanian (source) | Spanish (target) |
|---|---|
| chiar acum | ahora mismo |
| acum X min | hace X min |
| acum X ore | hace X horas |
| acum X zile | hace X días |

```typescript
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'ahora mismo';
  if (minutes < 60) return `hace ${minutes} min`;
  if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 7) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;

  return formatDate(d);
}
```

### 6I. lib/utils.ts — formatDate locale:

```typescript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

### 6J. lib/utils.ts — slugify (Spanish-aware):

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### 6K. lib/device-detection.ts — getDeviceLabel:

| Romanian (source) | Spanish (target) |
|---|---|
| Tabletă | Tableta |
| Necunoscut | Desconocido |

```typescript
export function getDeviceLabel(device: DeviceType): string {
  switch (device) {
    case "iPhone": return "iPhone";
    case "Android": return "Android";
    case "Tablet": return "Tableta";
    case "Desktop": return "Escritorio";
    default: return "Desconocido";
  }
}
```

---

## 7. Step 6 — localStorage Key Changes

ALL localStorage keys must change prefix from `listacumparaturi` to `listadecompras`. Search the ENTIRE codebase for these:

| Romanian key | Spanish key |
|---|---|
| `listacumparaturi_lists` | `listadecompras_lists` |
| `listacumparaturi_user_id` | `listadecompras_user_id` |
| `listacumparaturi_scan_history` | `listadecompras_scan_history` |
| `listacumparaturi-sound-enabled` | `listadecompras-sound-enabled` |
| `listacumparaturi_session_id` | `listadecompras_session_id` |

Search for the prefix `listacumparaturi` in all `.ts` and `.tsx` files and replace with `listadecompras`. Make sure to catch both underscore (`_`) and hyphen (`-`) variants.

---

## 8. Step 7 — API Route Specifics

### 8A. app/api/voice/route.ts:
- Change `language="ro"` → `language="es"`
- Change demo items to Spanish: `leche, pan, huevos, tomates, pollo`
- Update hallucination filter words to Spanish equivalents (common Whisper hallucinations in Spanish)
- Update all error messages to Spanish
- Update any response text to Spanish

### 8B. app/api/scan/route.ts:
- Change demo ingredients list to Spanish (e.g., "agua, azúcar, harina de trigo, aceite de girasol, sal, E330, E300, E160a")
- Update all error messages to Spanish
- Update response text and descriptions to Spanish

### 8C. app/api/lists/route.ts:
- Update all error messages to Spanish
- Update default list names to Spanish (e.g., "Mi lista de compras")

### 8D. All other API routes:
- Search for any Romanian strings in error responses
- Update to Spanish equivalents

---

## 9. Step 8 — Share URL Bug Warning

**CRITICAL:** The `ShoppingList.tsx` component generates share URLs when users share their lists. The URL path MUST match the route directory name EXACTLY.

The share URL must be:
```
https://listadecompras.es/lista-de-compras/compartir/{token}
```

Search for where share URLs are constructed (likely in `ShoppingList.tsx` or `useShoppingList.ts`) and ensure:
1. The domain is `listadecompras.es`
2. The path is `/lista-de-compras/compartir/` (NOT `/lista-de-cumparaturi/partajare/`)
3. The token is appended correctly

If the share URL does not match the actual route directory structure, shared links will 404.

---

## 10. Step 9 — Data File Translation (Python Scripts)

### 10A. Why Python scripts?

The `foods.json` (2625 items) and `e-additives.json` (353 items) files are too large to translate manually. Use Python scripts with **token-based word dictionaries** to translate them.

**IMPORTANT:** Do NOT use simple regex replacement of short words. Short words like "ou" (egg), "unt" (butter) will match inside other words and corrupt the data. Use token-based replacement where you split on word boundaries and match whole tokens only.

### 10B. Python script for foods.json:

Create a Python script `scripts/translate_foods.py` that:

1. Loads `data/foods.json`
2. For each food item, translates these fields:
   - `name` — food name (Romanian → Spanish)
   - `short_description` — brief description
   - `long_description` — detailed description
   - `category_id` / category references
   - `storage_method` — storage instructions
   - `shelf_life_opened` / `shelf_life_unopened`
   - `freezing_tips`
   - `season` array
   - `allergens` array
   - `usage_tips` array
   - `substitutes` — name and reason fields
   - `faq` — question and answer fields
   - `meta_title` / `meta_description`
3. Uses a dictionary of Romanian → Spanish food terms (build this dictionary with 200+ common food terms)
4. For items the dictionary cannot handle, flags them for manual review
5. Writes the result to `data/foods.json`

### 10C. Python script for e-additives.json:

Create a Python script `scripts/translate_e_additives.py` that:

1. Loads `data/e-additives.json`
2. For each additive, translates these fields:
   - `name` / `common_name`
   - `category`
   - `short_description` / `long_description`
   - `origin`
   - `longevity_impact`
   - `children_note`
   - `health_effects` (documented, suspected, benefits, risk_groups arrays)
   - `common_products` (category and products arrays)
   - `avoidance_tips` array
   - `natural_alternatives` array
   - `meta_title` / `meta_description`
3. E-number codes (E100, E200, etc.) are universal — keep unchanged
4. Numerical values (adi_value, risk_score) — keep unchanged
5. Writes the result to `data/e-additives.json`

### 10D. Python script for other data files:

- `data/food-categories.json` — Translate category names and descriptions
- `data/food-categories-new.json` — Same
- `data/routes.json` — Update all route paths and labels to Spanish
- `data/public-lists.json` — Translate template names, descriptions, items (see Step 10 for 50 templates)

### 10E. After running scripts:

1. Manually review a sample of 20+ translated items for accuracy
2. Check that no Romanian text remains in any JSON data file
3. Verify JSON is valid: `python3 -c "import json; json.load(open('data/foods.json'))"`

---

## 11. Step 10 — Shopping List Templates (50 Spanish Templates)

Create 50 culturally relevant Spanish shopping list templates in `data/public-lists.json`. Each must have:
- `slug` (URL-friendly, e.g., `paella-valenciana`)
- `title` (display name in Spanish)
- `description` (1-2 sentences in Spanish)
- `lang`: `"es"`
- `is_public`: `true`
- `items` (array of 8-15 ingredient items with name, quantity, category, checked: false, position)

### Template list (50 total):

**Comidas diarias (10):**
1. Paella valenciana
2. Tortilla española
3. Gazpacho andaluz
4. Cocido madrileño
5. Fabada asturiana
6. Ensalada mixta
7. Croquetas caseras
8. Lentejas con chorizo
9. Pisto manchego
10. Arroz con pollo

**Tapas y aperitivos (8):**
11. Tapas variadas
12. Patatas bravas
13. Jamón y queso
14. Gambas al ajillo
15. Pimientos de padrón
16. Boquerones en vinagre
17. Tabla de embutidos
18. Aceitunas y encurtidos

**Celebraciones y festivos (8):**
19. Cena de Navidad
20. Comida de Nochebuena
21. Menú de Nochevieja
22. Roscón de Reyes
23. Semana Santa
24. Menú de Pascua
25. Fiesta de cumpleaños
26. Barbacoa de verano

**Planificación semanal (6):**
27. Compra semanal básica
28. Compra semanal familiar
29. Compra para una persona
30. Compra quincenal
31. Meal prep semanal
32. Menú infantil semanal

**Dieta y salud (6):**
33. Dieta mediterránea
34. Compra sin gluten
35. Compra vegetariana
36. Compra vegana
37. Compra baja en calorías
38. Compra para deportistas

**Repostería y postres (4):**
39. Churros con chocolate
40. Flan casero
41. Tarta de Santiago
42. Repostería básica

**Cocinas regionales (4):**
43. Cocina vasca
44. Cocina catalana
45. Cocina gallega
46. Cocina canaria

**Entretenimiento (4):**
47. Cena romántica
48. Pícnic en el parque
49. Brunch dominical
50. Fiesta infantil

Each template must have realistic Spanish ingredients. For example, "Paella valenciana" should include: arroz bomba, pollo, judías verdes, garrofón, tomate, aceite de oliva, azafrán, sal, pimentón, agua, etc.

---

## 12. Step 11 — llms.txt and llms-full.txt

### 12A. public/llms.txt (~150 lines):

Create a NEW file in Spanish that describes the entire site for LLM crawlers. Include:
- Site name and URL (listadecompras.es)
- What the site does (lista de compras compartida, escáner de aditivos E, base de datos de alimentos)
- All main routes with descriptions
- Key features
- Data sources
- Contact info
- All in Spanish

### 12B. public/llms-full.txt (~4000+ lines):

Create a NEW comprehensive file in Spanish that lists:
- All site features with detailed descriptions
- ALL foods (2625) with their URLs: `/alimentos/{slug}`
- ALL E-additives (353) with their URLs: `/aditivos-alimentarios/{slug}`
- ALL nutrients with their URLs: `/alimentos/nutrientes/{slug}`
- ALL shopping list templates with their URLs: `/lista-de-compras/plantillas/{slug}`
- All in Spanish

### 12C. public/humans.txt:

Update to reflect the Spanish site:
```
/* TEAM */
Site: listadecompras.es
Organization: Value Unlimited
Location: Stockholm, Sweden
Contact: contact@listadecompras.es

/* SITE */
Language: Spanish (es-ES)
Framework: Next.js 15
Styling: Tailwind CSS
```

---

## 13. Step 12 — Hreflang Tags (Three-Way)

Add hreflang tags to the `<head>` of every page. There are now THREE language versions:

```html
<link rel="alternate" hreflang="sv-SE" href="https://vihandlar.se{swedish_path}" />
<link rel="alternate" hreflang="ro-RO" href="https://listacumparaturi.ro{romanian_path}" />
<link rel="alternate" hreflang="es-ES" href="https://listadecompras.es{spanish_path}" />
<link rel="alternate" hreflang="x-default" href="https://vihandlar.se{swedish_path}" />
```

**CRITICAL:** `{path}` must be the EQUIVALENT path in each language, NOT a literal copy. Each language has its own route slugs.

### Complete hreflang route mapping:

| Swedish (vihandlar.se) | Romanian (listacumparaturi.ro) | Spanish (listadecompras.es) |
|---|---|---|
| `/` | `/` | `/` |
| `/e-amnen` | `/aditivi-alimentari` | `/aditivos-alimentarios` |
| `/e-amnen/{slug}` | `/aditivi-alimentari/{slug}` | `/aditivos-alimentarios/{slug}` |
| `/e-amnen/kategori/{slug}` | `/aditivi-alimentari/categorie/{slug}` | `/aditivos-alimentarios/categoria/{slug}` |
| `/e-amnen/serie/{series}` | `/aditivi-alimentari/serie/{series}` | `/aditivos-alimentarios/serie/{series}` |
| `/e-amnen/guide` | `/aditivi-alimentari/ghid` | `/aditivos-alimentarios/guia` |
| `/e-amnen/alla` | `/aditivi-alimentari/toate` | `/aditivos-alimentarios/todos` |
| `/livsmedel` | `/alimente` | `/alimentos` |
| `/livsmedel/{slug}` | `/alimente/{slug}` | `/alimentos/{slug}` |
| `/livsmedel/kategori/{slug}` | `/alimente/categorie/{slug}` | `/alimentos/categoria/{slug}` |
| `/livsmedel/naringsamne` | `/alimente/nutrienti` | `/alimentos/nutrientes` |
| `/livsmedel/naringsamne/{slug}` | `/alimente/nutrienti/{slug}` | `/alimentos/nutrientes/{slug}` |
| `/inkopslista` | `/lista-de-cumparaturi` | `/lista-de-compras` |
| `/skanner` | `/scanner` | `/escaner` |
| `/om` | `/despre` | `/sobre-nosotros` |
| `/integritet` | `/confidentialitate` | `/privacidad` |
| `/funktioner` | `/functii` | `/funciones` |
| `/kallor` | `/surse` | `/fuentes` |
| `/sajtkarta` | `/harta-site` | `/mapa-sitio` |
| `/villkor` | `/termeni` | `/terminos` |
| `/partnerskap` | `/parteneriate` | `/asociaciones` |

**Implementation:** Add hreflang via `generateMetadata()` in each page's metadata, or centrally in `app/layout.tsx` using a route mapping object.

---

## 14. Step 13 — middleware.ts Update

Update `middleware.ts` to use Spanish route patterns. The middleware sets `X-Schema-Types` headers for AI crawler optimization.

```typescript
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  let schemaTypes = "Organization";

  if (pathname === "/") {
    schemaTypes = "Organization, WebSite, CollectionPage";
  } else if (pathname === "/escaner") {
    schemaTypes = "Organization, WebApplication, SoftwareApplication";
  } else if (pathname === "/lista-de-compras") {
    schemaTypes = "Organization, WebApplication, SoftwareApplication";
  } else if (pathname.match(/^\/aditivos-alimentarios\/[^/]+$/) && pathname !== "/aditivos-alimentarios/todos" && pathname !== "/aditivos-alimentarios/guia") {
    schemaTypes = "Organization, Article, FAQPage, BreadcrumbList";
  } else if (pathname === "/aditivos-alimentarios" || pathname === "/aditivos-alimentarios/todos") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname === "/aditivos-alimentarios/guia") {
    schemaTypes = "Organization, Article, BreadcrumbList";
  } else if (pathname === "/alimentos/nutrientes") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname.match(/^\/alimentos\/nutrientes\/[^/]+$/)) {
    schemaTypes = "Organization, CollectionPage, ItemList, BreadcrumbList";
  } else if (pathname.match(/^\/alimentos\/[^/]+$/) && !pathname.startsWith("/alimentos/categoria")) {
    schemaTypes = "Organization, Article, NutritionInformation, FAQPage, BreadcrumbList";
  } else if (pathname === "/alimentos") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname.startsWith("/alimentos/categoria/") || pathname.startsWith("/aditivos-alimentarios/categoria/")) {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname !== "/") {
    schemaTypes = "Organization, BreadcrumbList";
  }

  response.headers.set("X-Schema-Types", schemaTypes);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|public|.*\\..*).*)"],
};
```

---

## 15. Step 14 — Legal Compliance (Spain / EU)

### 14A. Privacy Policy (`/privacidad`):
Write a FULL Spanish privacy policy that references:

- **AEPD** (Agencia Española de Protección de Datos) — the Spanish data protection authority
  - Address: C/ Jorge Juan 6, 28001 Madrid
  - Website: https://www.aepd.es
- **RGPD** (Reglamento General de Protección de Datos) — the Spanish name for GDPR
- **LOPDGDD** (Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales) — Spain's national data protection law
- **LSSI-CE** (Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico) — Spain's e-commerce law

Do NOT reference Romanian ANSPDCP or Swedish IMY.

### 14B. Organization details (use in privacy policy, footer, terms, about):
```
Value Unlimited
Arenavägen 29
121 77 Johanneshov
Stockholm, Sweden
contact@listadecompras.es
```

### 14C. Terms of Service (`/terminos`):
Write terms in Spanish referencing applicable Spanish and EU law.

### 14D. Cookie consent:
- Must comply with LSSI-CE
- Spanish text for consent banner
- Link to `/privacidad`

---

## 16. Step 15 — Full UI Translation Reference

### 16A. Common UI strings (Romanian → Spanish):

| Romanian | Spanish |
|----------|---------|
| Adaugă | Añadir |
| Șterge | Eliminar |
| Caută | Buscar |
| Salvează | Guardar |
| Anulează | Cancelar |
| Se încarcă... | Cargando... |
| Partajează | Compartir |
| Copiază | Copiar |
| Descarcă | Descargar |
| Înapoi | Volver |
| Arată mai mult | Ver más |
| Arată mai puțin | Ver menos |
| Niciun rezultat | Sin resultados |
| Lista de cumpărături | Lista de compras |
| Adaugă produs | Añadir producto |
| Scanează codul E | Escanear número E |
| Aditivi alimentari | Aditivos alimentarios |
| Alimente | Alimentos |
| Categorii | Categorías |
| Despre noi | Sobre nosotros |
| Confidențialitate | Privacidad |
| Hartă site | Mapa del sitio |
| Toate drepturile rezervate | Todos los derechos reservados |
| Acasă | Inicio |
| Toate | Todos |
| Ghid | Guía |
| Istoric | Historial |
| Partajare | Compartir |
| Șabloane | Plantillas |
| Funcții | Funciones |
| Surse | Fuentes |
| Termeni | Términos |
| Parteneriate | Asociaciones |
| Nutrienți | Nutrientes |
| Categorie | Categoría |
| Serie | Serie |
| Scanner | Escáner |
| Voce | Voz |
| Începe scanarea | Iniciar escaneo |
| Oprește | Detener |
| Copiază linkul | Copiar enlace |
| Link copiat! | ¡Enlace copiado! |
| Activează sunetul | Activar sonido |
| Dezactivează sunetul | Desactivar sonido |
| Utilizatori conectați | Usuarios conectados |
| Deschide | Abrir |
| Închide | Cerrar |
| Da | Sí |
| Nu | No |
| Eroare | Error |
| Succes | Éxito |
| Atenție | Atención |
| Informație | Información |

### 16B. Page-specific translations:
- **Landing page:** hero text, feature descriptions, CTA buttons, statistics
- **Shopping list page:** all labels, empty state messages, tooltips, share dialog
- **E-additive pages:** risk levels, category names, descriptions, guide content
- **Food pages:** nutritional labels, category names, storage info labels
- **Scanner page:** instructions, status messages, scan results
- **Error pages:** 404, 500, generic error messages
- **Templates page:** template names, descriptions, category labels

### 16C. Date and number formatting:
- Date format: `d de enero de 2026` (use `es-ES` locale)
- Number format: `1.000,50` (period for thousands, comma for decimals)
- Day names: lunes, martes, miércoles, jueves, viernes, sábado, domingo
- Month names: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre

---

## 17. Step 16 — CLAUDE.md for the New Repo

Create a new `CLAUDE.md` at the repo root:

```markdown
# listadecompras.es — Lista de Compras Inteligente

## Stack
- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- JSON data (static, exported)
- Vercel KV (Redis) for shopping lists and sharing
- Vercel Functions for scanner/voice
- SSE/polling for realtime sync

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript
```

## Critical Rules
- Spanish (es-ES) in UI, English in code
- Server Components by default
- 'use client' only for useState/useEffect/browser APIs
- No affiliate links — no Adtraction
- All images via next/image
- No Supabase — all data is JSON or Vercel KV

## Design
- Primary color: Orange #FF8000 / hsl(37 100% 50%)
- Accent: Green (success states)
- Font: Inter (Google Fonts)
- Dark mode via CSS variables

## Domain
- Production: https://listadecompras.es
- Contact: contact@listadecompras.es
- Organization: Value Unlimited

## Hreflang siblings
- sv-SE: https://vihandlar.se
- ro-RO: https://listacumparaturi.ro
- es-ES: https://listadecompras.es (this site)

## Routes
- /aditivos-alimentarios — E-additives
- /alimentos — Foods
- /lista-de-compras — Shopping list
- /escaner — E-number scanner
- /sobre-nosotros — About
- /privacidad — Privacy
- /funciones — Features
- /fuentes — Sources
- /mapa-sitio — Sitemap
- /terminos — Terms
- /asociaciones — Partnerships
```

---

## 18. Step 17 — Besökskollen Analytics

Update the Analytics component (`components/Analytics.tsx`) with the NEW site-id:

```
data-site-id="b81ab8d1-5379-41f7-89c8-0eb9eff06ed2"
```

Remove any Romanian tracking IDs that may be present.

---

## 19. Step 18 — OpenGraph Image

The `app/opengraph-image.tsx` dynamically generates OG images. Update ALL text in it:
- Site name: "listadecompras.es"
- Tagline: in Spanish (e.g., "Tu asistente inteligente de compras")
- Any feature descriptions: in Spanish
- Keep the orange #FF8000 branding

---

## 20. Step 19 — Verification Checklist (EXHAUSTIVE)

Before considering the migration complete, verify ALL of the following:

### 20A. Build and runtime:
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run dev` starts and all pages load

### 20B. Language verification — search for ZERO results:

Run each of these searches. Each must return **0 results** (with noted exceptions):

| Search term | Expected | Exception |
|---|---|---|
| `listacumparaturi` | 0 | Except in hreflang tags |
| `vihandlar` | 0 | Except in hreflang tags |
| `ro-RO` | 0 | Except in hreflang tags |
| `ro_RO` | 0 | Except in hreflang tags |
| `lang="ro"` | 0 | None — must be 0 |
| `Acasă` | 0 | None |
| `Toate` | 0 | None (use "Todos" in Spanish) |
| `Ghid` | 0 | None (use "Guía" in Spanish) |
| `Partajare` | 0 | None (use "Compartir" in Spanish) |
| `Șabloane` | 0 | None (use "Plantillas" in Spanish) |
| `Nutrienți` | 0 | None (use "Nutrientes" in Spanish) |
| `Categorie` | 0 | None (use "Categoría" in Spanish) |
| `Înapoi` | 0 | None (use "Volver" in Spanish) |
| `Adaugă` | 0 | None (use "Añadir" in Spanish) |
| `Șterge` | 0 | None (use "Eliminar" in Spanish) |
| `Caută` | 0 | None (use "Buscar" in Spanish) |

Romanian diacritical characters in .tsx/.ts files (search for each):
| Character | Expected | Exception |
|---|---|---|
| `ă` | 0 | Except in hreflang URLs and brand names |
| `â` | 0 | Except in hreflang URLs and brand names |
| `î` | 0 | Except in hreflang URLs and brand names |
| `ș` | 0 | Except in hreflang URLs and brand names |
| `ț` | 0 | Except in hreflang URLs and brand names |

### 20C. Spanish content verification:
- [ ] `<html lang="es">` is set in app/layout.tsx
- [ ] All page titles are in Spanish
- [ ] All meta descriptions are in Spanish
- [ ] All button/label text is in Spanish
- [ ] All error messages are in Spanish
- [ ] Footer is fully in Spanish
- [ ] 404 page is in Spanish
- [ ] Loading states are in Spanish
- [ ] All toast notifications are in Spanish
- [ ] All aria-labels are in Spanish
- [ ] All placeholder text is in Spanish
- [ ] All alt text is in Spanish

### 20D. Technical verification:
- [ ] Canonical URLs point to listadecompras.es
- [ ] Sitemap URLs use listadecompras.es (check `app/sitemap.ts`)
- [ ] robots.ts references `https://listadecompras.es/sitemap.xml`
- [ ] Besökskollen ID is `b81ab8d1-5379-41f7-89c8-0eb9eff06ed2`
- [ ] No Romanian or Swedish tracking IDs remain
- [ ] Hreflang tags present on all pages (3 versions + x-default)
- [ ] All internal links use Spanish routes
- [ ] No broken links to Romanian routes
- [ ] localStorage keys use `listadecompras` prefix
- [ ] Share URLs generate correct path (`/lista-de-compras/compartir/{token}`)
- [ ] API voice route uses `language="es"`
- [ ] OG image renders Spanish text

### 20E. Legal verification:
- [ ] Privacy policy references AEPD (C/ Jorge Juan 6, 28001 Madrid)
- [ ] Privacy policy references RGPD, LOPDGDD, LSSI-CE
- [ ] Organization details are correct (Value Unlimited, Arenavägen 29, etc.)
- [ ] Contact email is contact@listadecompras.es
- [ ] Cookie consent is in Spanish

### 20F. Content verification:
- [ ] 50 shopping list templates present in `data/public-lists.json`
- [ ] All templates are in Spanish with realistic ingredients
- [ ] E-additive data fully translated (353 items)
- [ ] Food data fully translated (2625 items)
- [ ] All category names in Spanish
- [ ] `public/llms.txt` exists and is in Spanish (~150 lines)
- [ ] `public/llms-full.txt` exists and is in Spanish (~4000+ lines)
- [ ] `public/humans.txt` updated for Spanish site
- [ ] `CLAUDE.md` updated for Spanish site

### 20G. Route verification:
- [ ] `/aditivos-alimentarios` loads correctly
- [ ] `/aditivos-alimentarios/{slug}` loads correctly
- [ ] `/aditivos-alimentarios/categoria/{slug}` loads correctly
- [ ] `/aditivos-alimentarios/serie/{series}` loads correctly
- [ ] `/aditivos-alimentarios/guia` loads correctly
- [ ] `/aditivos-alimentarios/todos` loads correctly
- [ ] `/aditivos-alimentarios/historial` loads correctly
- [ ] `/alimentos` loads correctly
- [ ] `/alimentos/{slug}` loads correctly
- [ ] `/alimentos/categoria/{slug}` loads correctly
- [ ] `/alimentos/nutrientes` loads correctly
- [ ] `/alimentos/nutrientes/{slug}` loads correctly
- [ ] `/lista-de-compras` loads correctly
- [ ] `/lista-de-compras/{id}` loads correctly
- [ ] `/lista-de-compras/compartir/{token}` loads correctly
- [ ] `/lista-de-compras/plantillas` loads correctly
- [ ] `/lista-de-compras/plantillas/{slug}` loads correctly
- [ ] `/escaner` loads correctly
- [ ] `/sobre-nosotros` loads correctly
- [ ] `/privacidad` loads correctly
- [ ] `/funciones` loads correctly
- [ ] `/fuentes` loads correctly
- [ ] `/mapa-sitio` loads correctly
- [ ] `/terminos` loads correctly
- [ ] `/asociaciones` loads correctly

---

## 21. Summary of All Changes

| Area | Count | Details |
|---|---|---|
| Route directories | 27+ | All renamed from Romanian to Spanish |
| Components | 9 | All UI text translated |
| Lib files | 9 | Config, utils, data access |
| Type files | 4 | Constants, enums, regexes |
| Hook files | 4 | Error messages, localStorage keys |
| API routes | 8 | Language params, demo items, error messages |
| Data files | 6 | Foods, e-additives, categories, routes, templates |
| Public files | 3 | llms.txt, llms-full.txt, humans.txt |
| Config files | 5 | middleware, next.config, package.json, CLAUDE.md, .env |
| Total files | ~75+ | Every file must be checked |

---

## 22. Important Rules (Final Reminder)

1. **NO affiliate/Adtraction.** The source repo has it removed already. Do NOT add any.
2. **Source: listacumparaturi-ro** (NOT vihandlar-se).
3. **Castilian Spanish (es-ES)** — "ordenador" not "computadora", "móvil" not "celular".
4. **Font: Inter** — supports á, é, í, ó, ú, ñ, ü. Do NOT change.
5. **Color: Orange #FF8000.** Do NOT change.
6. **Organization:** Value Unlimited, Arenavägen 29, 121 77 Johanneshov, Stockholm, Sweden.
7. **Commit frequently** with atomic commits.
8. **`npm run build` must pass** before done.
9. **Use correct Spanish diacritics EVERYWHERE** — á, é, í, ó, ú, ñ, ü. Never write "Anadir" when you mean "Añadir".
