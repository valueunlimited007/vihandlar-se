# Migration Prompt: Spain (listadecompras.es)

> **What is this file?**
> This is a complete, copy-paste-ready prompt for a Claude Code session that will create the Spanish version of the shopping list app (listadecompras.es).
> The source repo is the Romanian version (listacumparaturi-ro), NOT vihandlar-se.
> Copy everything below the horizontal rule and paste it into a fresh Claude Code session opened in the cloned repo.

---

# Create listadecompras.es — Spanish Shopping List App

You are migrating the Romanian shopping list app (listacumparaturi.ro) to a Spanish version (listadecompras.es). The source repo is `valueunlimited007/listacumparaturi-ro`. You must follow every step below precisely.

## 1. Critical Lessons from the Romanian Migration (DO NOT REPEAT)

The Romanian migration from vihandlar.se had 8 issues. You MUST avoid all of them:

### Issue 1: Swedish remnants in UI
Every single user-facing string must be in Spanish. Search the ENTIRE codebase for Romanian text and replace with Spanish. Common hiding spots:
- `aria-label` attributes
- `placeholder` text in inputs
- `alt` text on images
- `title` attributes
- Error messages and toast notifications
- Loading states ("Se incarca..." must become "Cargando...")
- 404 page text
- Footer text and copyright notices

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
All URL route segments must be in Spanish:
- `/lista-de-compras` (shopping list)
- `/lista` (shared list)
- `/aditivos` (e-additives)
- `/alimentos` (foods)
- `/productos` (products)
- `/sobre-nosotros` (about)
- `/privacidad` (privacy)
- `/funciones` (features)
- `/mapa-del-sitio` (sitemap)
- `/fuentes` (sources)
- `/listas` (list templates)
- `/categorias` (categories)

### Issue 5: Analytics/tracking IDs not updated
Use the NEW Besokskollen site-id: `b81ab8d1-5379-41f7-89c8-0eb9eff06ed2`. Remove any Romanian tracking IDs.

### Issue 6: Sitemap and robots.txt pointing to wrong domain
- `robots.txt` must reference `https://listadecompras.es/sitemap.xml`
- Sitemap must use `https://listadecompras.es/` as base URL for all entries
- `manifest.json` / `site.webmanifest` must use listadecompras.es

### Issue 7: Forgetting to update CLAUDE.md
The new repo MUST have its own CLAUDE.md reflecting the Spanish site (see Step 11).

### Issue 8: Legal/privacy page referencing wrong jurisdiction
Spain has its own data protection authority: AEPD (Agencia Espanola de Proteccion de Datos). Do NOT reference Romanian ANSPDCP or Swedish IMY.

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

## 3. Step 2 — Domain and Language Swap

### 2A. Global find-and-replace (in this order):

| Find | Replace With |
|------|-------------|
| `listacumparaturi.ro` | `listadecompras.es` |
| `listacumparaturi-ro` | `listadecompras-es` |
| `contact@listacumparaturi.ro` | `contact@listadecompras.es` |
| `Lista Cumparaturi` | `Lista de Compras` |
| `ro-RO` | `es-ES` |
| `lang="ro"` | `lang="es"` |
| `romanian` | `spanish` |
| `Romania` | `Espana` |

### 2B. Update `next.config.js` / `next.config.ts`:
- Set `i18n` locale to `es` if applicable
- Verify all domain references

### 2C. Update `package.json`:
- `"name": "listadecompras-es"`
- `"description"`: in Spanish
- `"homepage": "https://listadecompras.es"`

---

## 4. Step 3 — Route Structure (Spanish URLs)

Rename all route directories to Spanish equivalents:

| Romanian Route | Spanish Route | Description |
|---------------|--------------|-------------|
| `/lista-cumparaturi` | `/lista-de-compras` | Main shopping list |
| `/lista/[shareToken]` | `/lista/[shareToken]` | Shared list (keep token) |
| `/aditivi` | `/aditivos` | E-additives hub |
| `/aditivi/[slug]` | `/aditivos/[slug]` | E-additive detail |
| `/aditivi/scanner` | `/aditivos/escaner` | E-number scanner |
| `/aditivi/ghid` | `/aditivos/guia` | E-additive guide |
| `/aditivi/toate` | `/aditivos/todos` | All additives |
| `/aditivi/categorie/[cat]` | `/aditivos/categoria/[cat]` | Category filter |
| `/aditivi/numar/[letter]` | `/aditivos/numero/[letter]` | Number filter |
| `/alimente` | `/alimentos` | Foods hub |
| `/alimente/[letter]` | `/alimentos/[letter]` | Foods by letter |
| `/alimente/[letter]/[slug]` | `/alimentos/[letter]/[slug]` | Food detail |
| `/alimente/categorie/[slug]` | `/alimentos/categoria/[slug]` | Food category |
| `/cumparaturi` | `/compras` | Shopping hub |
| `/cumparaturi/produse` | `/compras/productos` | Products |
| `/cumparaturi/categorii` | `/compras/categorias` | Categories |
| `/despre` | `/sobre-nosotros` | About |
| `/confidentialitate` | `/privacidad` | Privacy |
| `/surse` | `/fuentes` | Sources |
| `/functii` | `/funciones` | Features |
| `/harta-site` | `/mapa-del-sitio` | Sitemap page |
| `/liste` | `/listas` | List templates |
| `/liste/[slug]` | `/listas/[slug]` | List template detail |

**IMPORTANT:** Also update all internal `<Link href="...">` and `router.push()` calls to use the new Spanish routes. Search for every Romanian route string in the codebase.

---

## 5. Step 4 — Full UI Translation (Romanian to Spanish)

Translate ALL user-facing text from Romanian to Spanish. This is the most critical step.

### 5A. Common UI strings:

| Romanian | Spanish |
|----------|---------|
| Adauga | Anadir |
| Sterge | Eliminar |
| Cauta | Buscar |
| Salveaza | Guardar |
| Anuleaza | Cancelar |
| Incarca... | Cargando... |
| Impartaseste | Compartir |
| Copiaza | Copiar |
| Descarca | Descargar |
| Inapoi | Volver |
| Arata mai mult | Ver mas |
| Arata mai putin | Ver menos |
| Niciun rezultat | Sin resultados |
| Lista de cumparaturi | Lista de compras |
| Adauga produs | Anadir producto |
| Scaneaza codul E | Escanear numero E |
| Aditivi alimentari | Aditivos alimentarios |
| Alimente | Alimentos |
| Produse | Productos |
| Categorii | Categorias |
| Despre noi | Sobre nosotros |
| Confidentialitate | Privacidad |
| Harta site | Mapa del sitio |
| Toate drepturile rezervate | Todos los derechos reservados |

### 5B. Page-specific translations:
- Landing page: hero text, feature descriptions, CTA buttons
- Shopping list: all labels, empty states, tooltips
- E-additive pages: risk levels, category names, descriptions
- Food pages: nutritional labels, category names
- Error pages: 404, 500 messages
- Cookie consent banner (if any)

### 5C. Component-level sweep:
Go through EVERY component file and translate:
```bash
# Find all component files
find . -name "*.tsx" -o -name "*.ts" | head -200
```
For each file, check for Romanian strings in:
- JSX text content
- String literals
- Template literals
- Constants and enums with display text

### 5D. Date and number formatting:
- Use Spanish date format: `dd/mm/yyyy` or `d de enero de 2026`
- Use Spanish number format: `1.000,50` (period for thousands, comma for decimals)
- Day names: lunes, martes, miercoles, jueves, viernes, sabado, domingo
- Month names: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre

---

## 6. Step 5 — Data Files

### 5A. E-additives data (`data/e-additives.json` or similar):
- E-number codes are universal (E100, E200, etc.) — keep as-is
- Translate `name`, `description`, `category`, `risk_level` labels to Spanish
- Translate `function` descriptions
- Keep `e_number` field unchanged

### 5B. Foods data (`data/foods.json` or similar):
- Translate food names to Spanish
- Translate category names
- Translate nutritional info labels
- Keep numerical values (calories, etc.) unchanged

### 5C. Category data:
- Translate all category names and descriptions

### 5D. Shopping list templates (see Step 9 for the 50 templates)

### 5E. Static content files:
- About page content
- Privacy policy content
- Sources/references
- Feature descriptions

### 5F. Easily forgotten files — CHECK ALL OF THESE:

| File | What to update |
|------|---------------|
| `public/robots.txt` | Domain to `listadecompras.es` |
| `public/sitemap.xml` (if static) | All URLs to listadecompras.es |
| `public/manifest.json` or `site.webmanifest` | name, short_name, start_url, scope |
| `public/browserconfig.xml` (if exists) | Tile references |
| `app/sitemap.ts` (if dynamic) | Base URL |
| `app/robots.ts` (if dynamic) | Sitemap URL |
| `app/layout.tsx` | `<html lang="es">`, metadata, fonts |
| `app/not-found.tsx` | Spanish 404 text |
| `app/error.tsx` | Spanish error text |
| `app/loading.tsx` | Spanish loading text |
| `components/Footer.tsx` or similar | Copyright, links, contact |
| `components/Header.tsx` or `Navbar.tsx` | Navigation labels |
| `components/CookieBanner.tsx` (if exists) | Consent text in Spanish |
| `.env.example` | Domain references |
| `.env.local` / `.env` | `NEXT_PUBLIC_SITE_URL=https://listadecompras.es` |
| `vercel.json` (if exists) | Redirects, rewrites, headers |
| Any `constants.ts` or `config.ts` | Site name, URL, contact info |
| `lib/utils.ts` or similar | Any hardcoded strings |
| OpenGraph images (`public/og-image.png`) | Text overlay if it contains Romanian |

---

## 7. Step 6 — Static Files and Branding

### 6A. Favicon and app icons:
- Keep the same orange (#FF8000) branding
- Update any text in icons if they contain language-specific text
- Verify `public/favicon.ico`, `public/icon.png`, `public/apple-touch-icon.png`

### 6B. OpenGraph image:
- If the OG image contains Romanian text, create a new one with Spanish text
- File: `public/og-image.png` (or wherever it lives)
- Must say "Lista de Compras" not "Lista Cumparaturi"

### 6C. Font:
- Keep **Inter** from Google Fonts — it fully supports Spanish characters: a, e, i, o, u, n, u (with accents/tilde)
- Verify the font import in `app/layout.tsx` or `_document.tsx`

### 6D. Colors:
- Primary: Orange `#FF8000` / `hsl(37 100% 50%)` — keep unchanged
- Accent: Green for success states — keep unchanged
- Dark mode: keep CSS variable system unchanged

---

## 8. Step 7 — Hreflang Tags (Three-Way)

Add hreflang tags to the `<head>` of every page. There are now THREE versions:

```html
<link rel="alternate" hreflang="sv-SE" href="https://vihandlar.se{path}" />
<link rel="alternate" hreflang="ro-RO" href="https://listacumparaturi.ro{path}" />
<link rel="alternate" hreflang="es-ES" href="https://listadecompras.es{path}" />
<link rel="alternate" hreflang="x-default" href="https://vihandlar.se{path}" />
```

### Implementation details:
- `{path}` must be the EQUIVALENT path in each language, not a literal copy
- Swedish paths use Swedish slugs (`/e-amnen`, `/livsmedel`, etc.)
- Romanian paths use Romanian slugs (`/aditivi`, `/alimente`, etc.)
- Spanish paths use Spanish slugs (`/aditivos`, `/alimentos`, etc.)
- `x-default` points to the Swedish version (original)
- Add these in `app/layout.tsx` or via `generateMetadata()` in each page

### Route mapping for hreflang:

| Swedish (vihandlar.se) | Romanian (listacumparaturi.ro) | Spanish (listadecompras.es) |
|----------------------|-------------------------------|---------------------------|
| `/` | `/` | `/` |
| `/e-amnen` | `/aditivi` | `/aditivos` |
| `/livsmedel` | `/alimente` | `/alimentos` |
| `/inkopslistor` | `/lista-cumparaturi` | `/lista-de-compras` |
| `/listor` | `/liste` | `/listas` |
| `/om` | `/despre` | `/sobre-nosotros` |
| `/integritet` | `/confidentialitate` | `/privacidad` |
| `/funktioner` | `/functii` | `/funciones` |
| `/sajtkarta` | `/harta-site` | `/mapa-del-sitio` |
| `/kallor` | `/surse` | `/fuentes` |

---

## 9. Step 8 — Legal Compliance (Spain / EU)

### 8A. Privacy Policy (`/privacidad`):
Write a FULL Spanish privacy policy that references:
- **AEPD** (Agencia Espanola de Proteccion de Datos) — the Spanish data protection authority
- **GDPR** / **RGPD** (Reglamento General de Proteccion de Datos) — use the Spanish abbreviation
- **LOPDGDD** (Ley Organica de Proteccion de Datos y Garantia de los Derechos Digitales) — Spain's national data protection law
- **LSSI-CE** (Ley de Servicios de la Sociedad de la Informacion y de Comercio Electronico) — Spain's e-commerce law

### 8B. Organization details (use in privacy policy and footer):
```
Value Unlimited
Arenavagen 29
121 77 Johanneshov
Stockholm, Sweden
contact@listadecompras.es
```

### 8C. Cookie consent:
- Must comply with LSSI-CE
- Spanish text for consent banner
- Link to `/privacidad`

### 8D. Aviso Legal (Legal Notice):
Spain requires an "Aviso Legal" page. Consider adding `/aviso-legal` with:
- Company identification (Value Unlimited)
- Contact information
- Purpose of the website

---

## 10. Step 9 — Shopping List Templates (50 Spanish Templates)

Create 50 culturally relevant Spanish shopping list templates. These should reflect actual Spanish cuisine and shopping habits. Store in the templates data file (JSON or similar).

### Required templates (50 total):

**Everyday meals (10):**
1. Paella valenciana
2. Tortilla espanola
3. Gazpacho andaluz
4. Cocido madrileno
5. Fabada asturiana
6. Ensalada mixta
7. Croquetas caseras
8. Lentejas con chorizo
9. Pisto manchego
10. Arroz con pollo

**Tapas and appetizers (8):**
11. Tapas variadas
12. Patatas bravas
13. Jamon y queso
14. Gambas al ajillo
15. Pimientos de padron
16. Boquerones en vinagre
17. Tabla de embutidos
18. Aceitunas y encurtidos

**Celebrations and holidays (8):**
19. Cena de Navidad
20. Comida de Nochebuena
21. Menu de Nochevieja
22. Roscon de Reyes
23. Semana Santa
24. Menu de Pascua
25. Fiesta de cumpleanos
26. Barbacoa de verano

**Weekly planning (6):**
27. Compra semanal basica
28. Compra semanal familiar
29. Compra para una persona
30. Compra quincenal
31. Meal prep semanal
32. Menu infantil semanal

**Dietary and health (6):**
33. Dieta mediterranea
34. Compra sin gluten
35. Compra vegetariana
36. Compra vegana
37. Compra baja en calorias
38. Compra para deportistas

**Baking and desserts (4):**
39. Churros con chocolate
40. Flan casero
41. Tarta de Santiago
42. Reposteria basica

**Regional cuisines (4):**
43. Cocina vasca
44. Cocina catalana
45. Cocina gallega
46. Cocina canaria

**Entertaining (4):**
47. Cena romantica
48. Picnic en el parque
49. Brunch dominical
50. Fiesta infantil

Each template must include:
- `slug` (URL-friendly, e.g., `paella-valenciana`)
- `name` (display name in Spanish)
- `description` (1-2 sentences in Spanish)
- `items` (array of 8-15 actual ingredient items in Spanish)
- `category` (one of the categories above)
- `icon` (emoji)

---

## 11. Step 10 — Partnership Page

If the Romanian version has a partnership/collaboration page, translate it to Spanish:
- Route: `/colaboracion` or `/partners`
- Explain what the site offers
- Contact: `contact@listadecompras.es`
- No affiliate/Adtraction functionality — this is informational only

---

## 12. Step 11 — CLAUDE.md for the New Repo

Create a new `CLAUDE.md` at the repo root with content specific to listadecompras.es:

```markdown
# listadecompras.es — Spanish Shopping List App

## Stack
- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- JSON data (static)
- Vercel KV (Redis) for shopping lists and sharing
- SSE/polling for realtime sync

## Commands
\`\`\`bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript
\`\`\`

## Critical Rules
- Spanish in UI, English in code
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
```

---

## 13. Step 12 — Verification Checklist

Before considering the migration complete, verify ALL of the following:

### Build and runtime:
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run dev` starts and all pages load

### Language verification:
- [ ] Search entire codebase for Romanian strings — NONE should remain in UI
- [ ] Search for `listacumparaturi` — only in hreflang tags
- [ ] Search for `vihandlar` — only in hreflang tags
- [ ] All page titles are in Spanish
- [ ] All meta descriptions are in Spanish
- [ ] All button/label text is in Spanish
- [ ] All error messages are in Spanish
- [ ] Footer is fully in Spanish
- [ ] 404 page is in Spanish

### Technical verification:
- [ ] `<html lang="es">` is set
- [ ] Canonical URLs point to listadecompras.es
- [ ] Sitemap URLs use listadecompras.es
- [ ] robots.txt references correct sitemap
- [ ] manifest.json has correct name and URLs
- [ ] Besokskollen ID is `b81ab8d1-5379-41f7-89c8-0eb9eff06ed2`
- [ ] No Romanian or Swedish tracking IDs remain
- [ ] Hreflang tags present on all pages (3 versions + x-default)
- [ ] All internal links use Spanish routes
- [ ] No broken links to Romanian routes

### Legal verification:
- [ ] Privacy policy references AEPD, RGPD, LOPDGDD, LSSI-CE
- [ ] Organization details are correct (Value Unlimited, Arenavagen 29, etc.)
- [ ] Contact email is contact@listadecompras.es
- [ ] Cookie consent is in Spanish

### Content verification:
- [ ] 50 shopping list templates present and in Spanish
- [ ] E-additive data translated
- [ ] Food data translated
- [ ] All category names in Spanish

---

## 14. Important Rules

1. **NO affiliate links.** The Spanish version has NO Adtraction integration, just like the Romanian version. Do not add any affiliate redirect routes or tracking.

2. **Source repo is `listacumparaturi-ro`.** Do NOT clone from `vihandlar-se`. The Romanian version already has the correct structure with affiliate code removed.

3. **Spanish, not Latin American Spanish.** Use Castilian Spanish (es-ES). For example: "ordenador" not "computadora", "movil" not "celular". Use vosotros form where appropriate.

4. **Font stays Inter.** It supports all Spanish special characters (a, e, i, o, u with accents, n with tilde, u with diaeresis). Do NOT change the font.

5. **Color stays Orange #FF8000.** Do NOT change the primary color or design system.

6. **Every string matters.** If you find even ONE Romanian string in the production UI, the migration is incomplete. Be thorough.

7. **Test the build.** The migration is NOT done until `npm run build` succeeds cleanly.

8. **Commit frequently.** Make atomic commits as you complete each step, so progress is not lost.
