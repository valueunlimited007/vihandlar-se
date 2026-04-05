# Migration Prompt: Spain (listadecompras.es) — v2.0

> **Vad är denna fil?**
> Komplett, copy-paste-redo prompt för en Claude Code-session som skapar den spanska versionen av matplattformen.
> Källrepot är den RUMÄNSKA versionen (listacumparaturi-ro), INTE vihandlar-se.
> Kopiera allt under den horisontella linjen och klistra in i en ny Claude Code-session.

---

Jag har ett rumänskt Next.js 15-projekt på https://github.com/valueunlimited007/listacumparaturi-ro
som jag vill konvertera till en SPANSK version för domänen listadecompras.es.

Klona från listacumparaturi-ro — den har redan Adtraction/affiliate borttaget och alla nya
funktioner (disclaimers, villkor, partnerskap, 50 mallar, utökad llms-full.txt).

## KRITISKA LÄRDOMAR — UNDVIK DESSA MISSTAG

### 1. DATA-FILER MÅSTE ÖVERSÄTTAS FULLSTÄNDIGT
foods.json (2625 poster) och e-additives.json (353 poster) har namn, beskrivningar,
FAQ, substitutes, usage_tips etc. på rumänska. ALLT måste översättas till spanska.
Använd Python-skript med token-baserad ordöversättning. ALDRIG regex på korta ord.

### 2. SLUGGAR MÅSTE GENERERAS FRÅN SPANSKA NAMN
Alla sluggar måste genereras via slugify(spanskt_namn). Spara gamla→nya i food-redirects.json.

### 3. API-FILER MÅSTE ÖVERSÄTTAS
Whisper language måste vara "es". Demo-items på spanska. Felmeddelanden på spanska.

### 4. TYPES HAR SPRÅKSPECIFIKA STRÄNGAR
shopping-list.ts har kategorier, enheter, quick-add items. food.ts har ALPHABET.
e-additive.ts har E_CATEGORIES som MÅSTE matcha JSON-data exakt efter översättning.

### 5. localStorage-NYCKLAR MÅSTE BYTAS
Alla "listacumparaturi_" prefix → "listadecompras_"

### 6. SHARE-URL MÅSTE MATCHA ROUTE
ShoppingList.tsx genererar URL:er som MÅSTE matcha routermappens namn exakt.

### 7. DIAKRITISKA TECKEN FRÅN START
Spanska tecken (á, é, í, ó, ú, ñ, ü) MÅSTE vara korrekta överallt.

---

## STEG 1: KLONA OCH SÄTT UPP

Hämta ALL kod från valueunlimited007/listacumparaturi-ro (main branch).
Pusha till detta repo (listadecompras-es).
Kör npm install.

---

## STEG 2: GLOBAL SÖK & ERSÄTT (i denna ordning)

| Sök | Ersätt med |
|-----|-----------|
| listacumparaturi.ro | listadecompras.es |
| listacumparaturi-ro | listadecompras-es |
| contact@listacumparaturi.ro | contact@listadecompras.es |
| ro-RO | es-ES |
| ro_RO | es_ES |
| lang="ro" | lang="es" |
| Lista de Cumpărături | Lista de Compras |
| ListaCumpărături | ListaDeCompras |
| listacumparaturi_lists | listadecompras_lists |
| listacumparaturi_user_id | listadecompras_user_id |
| listacumparaturi_scan_history | listadecompras_scan_history |
| listacumparaturi-sound-enabled | listadecompras-sound-enabled |
| listacumparaturi_session_id | listadecompras_session_id |

Behåll vihandlar.se och listacumparaturi.ro ENBART i hreflang-taggar.

---

## STEG 3: ROUTING — BYT ALLA MAPPNAMN

| Rumänsk route (källa) | Spansk route (mål) |
|---|---|
| app/aditivi-alimentari/ | app/aditivos-alimentarios/ |
| app/aditivi-alimentari/[slug]/ | app/aditivos-alimentarios/[slug]/ |
| app/aditivi-alimentari/categorie/[slug]/ | app/aditivos-alimentarios/categoria/[slug]/ |
| app/aditivi-alimentari/serie/[series]/ | app/aditivos-alimentarios/serie/[series]/ |
| app/aditivi-alimentari/ghid/ | app/aditivos-alimentarios/guia/ |
| app/aditivi-alimentari/toate/ | app/aditivos-alimentarios/todos/ |
| app/aditivi-alimentari/istoric/ | app/aditivos-alimentarios/historial/ |
| app/alimente/ | app/alimentos/ |
| app/alimente/[slug]/ | app/alimentos/[slug]/ |
| app/alimente/categorie/[slug]/ | app/alimentos/categoria/[slug]/ |
| app/alimente/nutrienti/ | app/alimentos/nutrientes/ |
| app/alimente/nutrienti/[slug]/ | app/alimentos/nutrientes/[slug]/ |
| app/lista-de-cumparaturi/ | app/lista-de-compras/ |
| app/lista-de-cumparaturi/[id]/ | app/lista-de-compras/[id]/ |
| app/lista-de-cumparaturi/partajare/[token]/ | app/lista-de-compras/compartir/[token]/ |
| app/lista-de-cumparaturi/sabloane/ | app/lista-de-compras/plantillas/ |
| app/lista-de-cumparaturi/sabloane/[slug]/ | app/lista-de-compras/plantillas/[slug]/ |
| app/scanner/ | app/escaner/ |
| app/despre/ | app/sobre-nosotros/ |
| app/confidentialitate/ | app/privacidad/ |
| app/functii/ | app/funciones/ |
| app/surse/ | app/fuentes/ |
| app/harta-site/ | app/mapa-sitio/ |
| app/termeni/ | app/terminos/ |
| app/parteneriate/ | app/asociaciones/ |

Uppdatera ALLA interna Link href och router.push() i ALLA filer.
ShoppingList.tsx share-URL MÅSTE vara: /lista-de-compras/compartir/{token}

---

## STEG 4: KOMPLETT FILLISTA — ÖVERSÄTT VARJE FIL

### 4A: app/ root-filer
- app/layout.tsx — metadata, title template, description, keywords, OG, hreflang, lang="es"
- app/page.tsx — HELA startsidan (hero, features, stats, CTA)
- app/error.tsx — felmeddelanden, knappar
- app/loading.tsx — "Cargando..."
- app/not-found.tsx — 404-text, navigeringslänkar
- app/opengraph-image.tsx — "Tu lista de compras inteligente"
- app/apple-icon.tsx — bokstav "L"
- app/robots.ts — domän, sitemap URL, kommentarer
- app/sitemap.ts — BASE_URL, alla routes inkl /terminos och /asociaciones
- app/globals.css — ta bort eventuella svenska/rumänska kommentarer

### 4B: app/aditivos-alimentarios/ (7 page.tsx + 1 layout.tsx)
- page.tsx (hub)
- [slug]/page.tsx (detalj — disclaimer, FAQ, breadcrumbs)
- categorie/[slug]/page.tsx → categoria/[slug]/page.tsx
- serie/[series]/page.tsx
- guia/page.tsx (guide)
- todos/page.tsx (alla)
- historial/page.tsx + layout.tsx (historik)

### 4C: app/alimentos/ (5 page.tsx)
- page.tsx (hub med A-Z navigation)
- [slug]/page.tsx (detalj — disclaimer, FAQ, näringsvärden. OBS: "Relaterade produkter"-
  sektionen med ProductCard finns INTE i rumänska versionen — den togs bort vid ro-migreringen.
  Om den finns kvar, ta bort hela Card-blocket som importerar ProductCard/getRelatedProductsForFood)
- categoria/[slug]/page.tsx
- nutrientes/page.tsx (näringsämnen hub)
- nutrientes/[slug]/page.tsx (näringsämne detalj)

### 4D: app/lista-de-compras/ (6 page.tsx + 4 layout.tsx)
- layout.tsx (SoftwareApplication JSON-LD)
- page.tsx (hub — relativ tidsformatering!)
- [id]/layout.tsx + page.tsx
- compartir/[token]/layout.tsx + page.tsx
- plantillas/page.tsx (OBS: ingen layout.tsx i denna mapp)
- plantillas/[slug]/layout.tsx + page.tsx

### 4E: app/escaner/ (1 page.tsx + 1 layout.tsx)
- layout.tsx (WebApplication JSON-LD + metadata)
- page.tsx (MASSIV mängd UI-text: kamerabehörigheter, drag-drop, steg-instruktioner, demo)

### 4F: Övriga sidor (7 st)
- app/sobre-nosotros/page.tsx
- app/privacidad/page.tsx (AEPD, RGPD, LOPDGDD, LSSI-CE)
- app/funciones/page.tsx
- app/fuentes/page.tsx
- app/mapa-sitio/page.tsx
- app/terminos/page.tsx
- app/asociaciones/page.tsx

### 4G: components/ (9 filer)
- Header.tsx — menytexter, mobilmeny
- Footer.tsx — alla sektioner, copyright, SEO-länkar, A+ badge, Value Unlimited, Savri
- ShoppingList.tsx — knappar, status, delning, QR, Web Share API title/text
- FoodSearch.tsx — sökfält, filter, "Mostrar más"
- EAdditiveSearch.tsx — sökfält, filter, placeholder
- EAdditiveCard.tsx — risknivåer, badges
- RiskGauge.tsx — "Riesgo bajo/medio/alto"
- Toast.tsx — meddelanden
- Analytics.tsx — data-site-id="b81ab8d1-5379-41f7-89c8-0eb9eff06ed2"

### 4H: hooks/ (4 filer)
- useShoppingList.ts — felmeddelanden, toast, localStorage-nycklar
- usePresence.ts — "¡Alguien se unió!", enhetsnamn
- useVoiceInput.ts — felmeddelanden
- useAudioFeedback.ts — localStorage-nyckel

### 4I: lib/ (8 filer)
- lib/seo.ts — SITE_CONFIG: name, tagline, description, url, locale, language
- lib/schema.ts — SearchAction URL → /aditivos-alimentarios?q=
- lib/utils.ts — formatRelativeTime: "ahora mismo", "hace X min/horas/días"
- lib/device-detection.ts — "Tableta", "Desconocido"
- lib/kv.ts — verifiera domänreferenser
- lib/data/foods.ts — sort locale es-ES, ALPHABET utan ÅÄÖ
- lib/data/e-additives.ts — lookupEAdditives assessment strings
- lib/data/nutrients.ts — ALLA 47 näringsämnen: namn, beskrivningar, categoryName

### 4J: types/ (3 filer)
- types/e-additive.ts:
  E_CATEGORIES: Colorantes, Conservantes, Antioxidantes, Espesantes,
  Reguladores de acidez, Potenciadores de sabor, Edulcorantes
  RISK_LEVELS: Riesgo bajo (green), Riesgo medio (yellow), Riesgo alto (red)

- types/food.ts:
  ALPHABET: A-Z + Ñ (ta bort Å, Ä, Ö)

- types/shopping-list.ts:
  Kategorier: Lácteos, Carne, Pescado, Frutas, Verduras, Panadería,
  Congelados, Despensa, Conservas, Bebidas, Higiene, Limpieza, Otros
  Enheter: ud, kg, g, l, dl, ml, paq, bolsa, lata, botella
  ITEM_NAME_REGEX: lägg till ñÑáéíóúÁÉÍÓÚ i regex-mönstret
  Quick-add: Leche, Pan, Mantequilla, Huevos, Queso, Plátanos, Manzanas,
  Patatas, Cebolla, Zanahorias, Tomates, Pepino, Pechuga de pollo,
  Carne picada, Pasta, Arroz, Yogur, Café

### 4K: API routes (8 filer)
- app/api/voice/route.ts — language="es", demo: ["leche", "pan", "huevos", "tomates", "pollo"]
- app/api/scan/route.ts — demo-ingredienser på spanska, felmeddelanden
- app/api/lists/route.ts — "Nombre de lista requerido", felmeddelanden
- app/api/lists/[token]/route.ts — felmeddelanden
- app/api/lists/[token]/items/route.ts — felmeddelanden
- app/api/lists/[token]/items/[itemId]/route.ts — felmeddelanden
- app/api/lists/[token]/stream/route.ts — SSE kommentarer
- app/api/lists/[token]/presence/route.ts — felmeddelanden

### 4L: Config-filer
- middleware.ts — uppdatera ALLA route patterns till spanska, INKLUSIVE food redirect-logiken
  (/alimente/ → /alimentos/) som finns i toppen av filen (inte bara schema-types)
- next.config.ts — domän, headers, image domains
- package.json — "name": "listadecompras-es"
- CLAUDE.md — ny för spanska projektet
- .env.example — kommentarer
- tailwind.config.ts — verifiera inga rumänska referenser

### 4M: Data-filer som LÄTT GLÖMS
- data/routes.json — innehåller RUMÄNSKA route-paths, MÅSTE översättas till spanska
- data/food-redirects.json — innehåller svenska→rumänska slug-mappningar, MÅSTE ERSÄTTAS
  HELT (inte appendas) med rumänska→spanska mappningar
- data/schema.json — verifiera, troligen OK som den är
- types/index.ts — barrel re-export fil, verifiera att imports stämmer efter namnbyten

### 4N: Bildfiler i public/ som MÅSTE bytas
- public/listacumparaturi-icon.png — byt namn till listadecompras-icon.png eller ta bort
- public/listacumparaturi-logo-romania.png — byt till spansk version eller ta bort
- Sök HELA kodbasen efter referenser till dessa filnamn och uppdatera

---

## STEG 5: ÖVERSÄTT DATA MED PYTHON-SKRIPT

### 5A: foods.json (2625 poster)
Skapa Python-skript som översätter:
- name (alla 2625 namn)
- subcategory, category
- short_description, long_description
- meta_title, meta_description
- storage_method, shelf_life_opened, shelf_life_unopened, freezing_tips
- usage_tips (array), faq (array of {question, answer})
- substitutes, allergens, season
Generera nya sluggar. Spara gamla→nya i food-redirects.json med formatet:
```json
{"aliment-romanesc-slug": "alimento-espanol-slug", ...}
```
Filen ERSÄTTER den befintliga food-redirects.json HELT (som har sv→ro mappningar).
Redirects implementeras i middleware.ts (redan uppsatt — byt bara /alimente/ till /alimentos/).

### 5B: e-additives.json (353 poster)
Översätt: name, common_name, category, origin, short_description, long_description,
meta_title, meta_description, children_note, health_effects (documented, suspected,
benefits, risk_groups), avoidance_tips, natural_alternatives, common_products
E_CATEGORIES i types/e-additive.ts MÅSTE matcha category-värden i JSON EXAKT.

### 5C: food-categories.json + food-categories-new.json
Översätt alla kategorinamn och sluggar.

### 5D: public-lists.json — 50 SPANSKA mallar
Kulturellt relevanta för Spanien:
Familj: Compra semanal, familiar, una persona, quincenal, express, presupuesto
Högtider: Navidad, Nochebuena, Nochevieja, Roscón de Reyes, Semana Santa, barbacoa
Dieter: Mediterránea, sin gluten, vegetariana, vegana, baja en calorías, deportistas
Matlagning: Paella, tortilla, gazpacho, croquetas, tapas, cocido, fabada, lentejas, pisto, arroz
Regionalt: Cocina vasca, catalana, gallega, canaria, andaluza
Varje mall: id, name, slug, description, category, items (12-25 ingredienser)

---

## STEG 6: STATISKA FILER

- public/llms.txt — HELT NY på spanska (~150 rader). Följ samma struktur som rumänska/svenska:
  AI-policy, plattformsbeskrivning, alla funktioner, alla sidor med URL:er, nyckelord, FAQ.
- public/llms-full.txt — HELT NY (~4000+ rader). Skapa med Python-skript som läser
  foods.json och e-additives.json och genererar:
  - Komplett livsmedelslista A-Z: "Nombre: X kcal — https://listadecompras.es/alimentos/slug"
  - Komplett E-additivlista: "EXXX Nombre: Riesgo X/10 — https://listadecompras.es/aditivos-alimentarios/slug"
  - Alla 47 näringsämnen med URL:er
  - 50+ FAQ på spanska
  - Teknisk stack, datakällor, juridik
- public/humans.txt — spansk info
- app/robots.ts — listadecompras.es domän, alla AI-botar
- app/sitemap.ts — spanska routes, inkl /terminos och /asociaciones
- app/opengraph-image.tsx — "Tu lista de compras inteligente - todo en un solo lugar"
- app/apple-icon.tsx — bokstav "L"

---

## STEG 7: HREFLANG (3 VERSIONER)

```tsx
alternates: {
  canonical: "https://listadecompras.es",
  languages: {
    "sv-SE": "https://vihandlar.se",
    "ro-RO": "https://listacumparaturi.ro",
    "es-ES": "https://listadecompras.es",
  },
},
```

Footer internationell sektion:
- 🇸🇪 Suecia (vihandlar.se) — länk
- 🇷🇴 Rumanía (listacumparaturi.ro) — länk
- 🇪🇸 España (En vivo) — aktuell
- 🌍 Global (.com) – 2026

Korrekt route-mappning för hreflang:

| vihandlar.se | listacumparaturi.ro | listadecompras.es |
|---|---|---|
| / | / | / |
| /e-amnen | /aditivi-alimentari | /aditivos-alimentarios |
| /livsmedel | /alimente | /alimentos |
| /livsmedel/naringsamne | /alimente/nutrienti | /alimentos/nutrientes |
| /inkopslista | /lista-de-cumparaturi | /lista-de-compras |
| /skanner | /scanner | /escaner |
| /om | /despre | /sobre-nosotros |
| /integritet | /confidentialitate | /privacidad |
| /funktioner | /functii | /funciones |
| /kallor | /surse | /fuentes |
| /sajtkarta | /harta-site | /mapa-sitio |
| /villkor | /termeni | /terminos |
| /partnerskap | /parteneriate | /asociaciones |

---

## STEG 8: JURIDIK (SPANIEN)

### Integritetspolicy (app/privacidad/page.tsx):
- AEPD: Agencia Española de Protección de Datos, C/ Jorge Juan 6, 28001 Madrid, www.aepd.es
- RGPD: Reglamento General de Protección de Datos
- LOPDGDD: Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales
- LSSI-CE: Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico
- Operador: Value Unlimited, Arenavägen 29, 121 77 Johanneshov, Estocolmo, Suecia
- AEPD klagomålsrätt med full kontaktinfo
- Besökskollen/Savri privacy-info

### Villkor (app/terminos/page.tsx):
11 sektioner: definiciones, servicio, uso, contenido, listas, escáner/voz,
propiedad intelectual, limitación de responsabilidad, modificaciones,
ley aplicable, contacto

### Disclaimers:
- Hälso-disclaimer på alla livsmedelssidor (amber box)
- E-additiv riskdisclaimer med EFSA-länk (amber box)
- Trust-box med Livsmedelsverket + EFSA + EU-förordning 1169/2011

### Footer juridik:
- AEPD-länk
- A+ Security badge "Seguridad A+ · RGPD"
- Value Unlimited dofollow (valueunlimited.io)
- Savri dofollow (savri.io)

---

## STEG 9: PARTNERSIDA (app/asociaciones/page.tsx)

- CTA till info@valueunlimited.io
- Länk till valueunlimited.io/partner-with-us
- Partnertyper: redes de afiliados, proveedores de feeds, supermercados, productores
- Spanska nätverk: Awin, TradeDoubler, CJ Affiliate

---

## STEG 10: CLAUDE.md

```markdown
# listadecompras.es — Lista de Compras Inteligente

## Stack
- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- JSON data (estático)
- Vercel KV (Redis) para listas de compras
- SSE/polling para sincronización en tiempo real

## Comandos
npm run dev / build / lint / type-check

## Reglas críticas
- Español en UI, inglés en código
- Server Components por defecto
- 'use client' solo para useState/useEffect/browser APIs
- Sin enlaces de afiliados — sin Adtraction
- Todas las imágenes via next/image
- Sin Supabase — datos JSON o Vercel KV

## Diseño
- Color primario: Naranja #FF8000
- Font: Inter (Google Fonts)
- Dark mode via variables CSS

## Dominio
- Producción: https://listadecompras.es
- Contacto: contact@listadecompras.es
- Organización: Value Unlimited

## Hreflang
- sv-SE: https://vihandlar.se
- ro-RO: https://listacumparaturi.ro
- es-ES: https://listadecompras.es
```

---

## STEG 11: MIDDLEWARE.TS

Uppdatera ALLA route patterns:

```typescript
if (pathname === "/") {
  schemaTypes = "Organization, WebSite, CollectionPage";
} else if (pathname === "/escaner") {
  schemaTypes = "Organization, WebApplication, SoftwareApplication";
} else if (pathname === "/lista-de-compras") {
  schemaTypes = "Organization, WebApplication, SoftwareApplication";
} else if (pathname.startsWith("/alimentos/nutrientes/") && pathname !== "/alimentos/nutrientes") {
  schemaTypes = "Organization, CollectionPage, ItemList, BreadcrumbList";
} else if (pathname === "/alimentos/nutrientes") {
  schemaTypes = "Organization, CollectionPage, BreadcrumbList";
} else if (pathname.match(/^\/aditivos-alimentarios\/[^/]+$/) && ...) {
  schemaTypes = "Organization, Article, FAQPage, BreadcrumbList";
}
// etc — uppdatera ALLA routes
```

---

## STEG 12: SLUTVERIFIERING

Sök igenom HELA kodbasen — varje sökning ska ge 0 träffar (utom hreflang):

- [ ] "listacumparaturi" — 0 (utom hreflang)
- [ ] "vihandlar" — 0 (utom hreflang)
- [ ] "ro-RO" — 0 (utom hreflang)
- [ ] "ro_RO" — 0 (utom hreflang)
- [ ] Rumänska tecken ă, â, î, ș, ț i .tsx/.ts — 0 (undantag: hreflang-taggar och
  varumärken som "Cumpărături" i hreflang, ALDRIG i UI-text)
- [ ] "Acasă" — 0
- [ ] "Toate" — 0
- [ ] "Ghid" — 0
- [ ] "Partajare" — 0
- [ ] "Cumpărături" — 0 (utom hreflang)
- [ ] "Se încarcă" — 0
- [ ] lang="ro" — 0
- [ ] npm run build — inga fel
- [ ] npm run lint — inga fel
- [ ] Alla imports fungerar (inga brutna references)
- [ ] E_CATEGORIES.name matchar e-additives.json category-värden EXAKT
- [ ] Share-URL i ShoppingList.tsx = /lista-de-compras/compartir/
- [ ] Sitemap inkluderar /terminos och /asociaciones
- [ ] Besökskollen site-id = b81ab8d1-5379-41f7-89c8-0eb9eff06ed2
- [ ] Alla 47 nutrient-sluggar matchar
- [ ] ITEM_NAME_REGEX i types/shopping-list.ts inkluderar ñÑáéíóúÁÉÍÓÚ
- [ ] Grep EXKLUDERAR node_modules/ och .git/

---

## STEG 13: VERCEL KV SETUP (efter deploy)

1. Skapa Vercel-projekt för listadecompras.es
2. Lägg till Vercel KV (Upstash Redis) i Vercel Dashboard → Storage
3. Kopiera KV_REST_API_URL och KV_REST_API_TOKEN till miljövariabler
4. Testa: Skapa en delad lista och verifiera att den persisterar
5. Lägg till domän listadecompras.es i Vercel → Settings → Domains
6. Konfigurera www.listadecompras.es → 301 redirect till listadecompras.es

---

## VIKTIGA REGLER

1. INGEN Adtraction/affiliate — källrepot har det redan borttaget
2. Källa: listacumparaturi-ro (INTE vihandlar-se)
3. Kastiljansk spanska (es-ES) — "ordenador" inte "computadora", "móvil" inte "celular"
4. Font: Inter (stödjer á, é, í, ó, ú, ñ, ü)
5. Primärfärg: Orange #FF8000
6. Organisation: Value Unlimited, Arenavägen 29, 121 77 Johanneshov, Stockholm, Sweden
7. Kontakt: contact@listadecompras.es
8. Besökskollen: data-site-id="b81ab8d1-5379-41f7-89c8-0eb9eff06ed2"
9. Commit ofta med atomära commits
10. npm run build MÅSTE passera
11. Korrekta spanska diakritiska tecken (á, é, í, ó, ú, ñ, ü) ÖVERALLT
12. INGEN rumänsk eller svensk text i UI
