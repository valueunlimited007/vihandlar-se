# Affiliate Project Guide - Prompt Template

> **Syfte:** Denna fil innehåller allt du behöver ge till Lovable AI när du skapar en ny affiliatesajt. Baserad på den bevisade strukturen från ViHandlar.se.

---

## 🚀 Snabbstart: Kopiera & Fyll i

```markdown
# Nytt Affiliateprojekt: [PROJEKTNAMN]

## 1. Grundinfo
- **Domän:** [exempel.se]
- **Nisch:** [t.ex. "möbler", "skönhet", "teknik", "sport"]
- **Målgrupp:** [t.ex. "svenska konsumenter som söker möbler online"]
- **Primära sökord:** [lista 5-10 huvudsökord]
- **Sekundära sökord:** [lista 10-20 longtail-sökord]

## 2. Adtraction-partners
- Partner 1: [Butiksnamn] - Program-ID: [XXX]
- Partner 2: [Butiksnamn] - Program-ID: [XXX]
(Lägg till fler vid behov)

## 3. Färgschema (valfritt)
- **Primärfärg:** [t.ex. "#2563eb" eller "blå"]
- **Sekundärfärg:** [t.ex. "#f97316" eller "orange"]
- **Stil:** [t.ex. "modern och clean", "lekfull", "professionell"]

## 4. Sidstruktur
- Startsida: [Beskrivning]
- Kategorisidor: [Lista kategorier]
- Produktsidor: [Hur ska produkter visas?]
- Informationssidor: [Om oss, Kontakt, etc.]

## 5. Speciella önskemål
[Fritext för unika krav]
```

---

## 📋 Obligatoriska Tekniska Krav

### ❌ ANVÄND ALDRIG:
- Lovable Cloud
- Supabase databas
- Backend-funktioner (edge functions)
- Autentisering/inloggning
- Dynamisk datalagring
- Performance Monitor (irrelevant för statiska sajter utan React Query)

### ✅ ANVÄND ALLTID:
- **React 18** + TypeScript
- **Vite** som bundler
- **Tailwind CSS** + shadcn/ui komponenter
- **Statisk data** i JSON-filer (`src/data/`)
- **React Router** för navigation
- **react-helmet-async** för SEO

---

## 🔍 SEO-struktur (Kritiskt!)

### Obligatorisk SEO-komponent

Varje sida MÅSTE ha en `<SEO />` komponent med dessa props:

```tsx
<SEO 
  title="Unik sidtitel | [Sajt] - Max 60 tecken"
  description="Unik metabeskrivning på max 155 tecken som beskriver sidans innehåll."
  canonical="https://domän.se/sökväg"
  keywords="sökord1, sökord2, sökord3"
  ogImage="https://domän.se/og-image.png"
  schemaData={[
    createOrganizationSchema(),
    createWebSiteSchema(),
    // + sidspecifikt schema
  ]}
/>
```

### Schema.org Typer per Sidtyp

| Sidtyp | Schema-typer |
|--------|--------------|
| Startsida | Organization, WebSite, WebPage |
| Kategori | ItemList, BreadcrumbList, CollectionPage |
| Produkt | Product, Offer, BreadcrumbList |
| Guide/Artikel | Article, BreadcrumbList, FAQPage |
| Om oss | Organization, AboutPage |

### Meta-tags Checklista

- [ ] `<title>` - Unik per sida, max 60 tecken, huvudsökord först
- [ ] `<meta name="description">` - Unik, max 155 tecken, inkludera CTA
- [ ] `<link rel="canonical">` - Absolut URL
- [ ] `<meta name="robots">` - "index, follow" eller "noindex" om nödvändigt
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags

### URL-struktur

```
/                           → Startsida
/kategori/[slug]            → Kategorisida
/produkt/[slug]             → Produktsida  
/guide/[slug]               → Guidesida
/om-oss                     → Om oss
/integritetspolicy          → Privacy policy
/sitemap                    → HTML-sitemap
```

### Title-format

```
[Sidspecifik titel] | [Kategori om relevant] | [Sajtnamn]

Exempel:
"Bästa Kontorsstolarna 2025 | Möbelguiden.se"
"IKEA MARKUS Recension | Kontorsstolar | Möbelguiden.se"
```

---

## 🤖 GEO-struktur (AI-synlighet)

### robots.txt

```txt
User-agent: *
Allow: /
Crawl-delay: 1

Sitemap: https://[domän]/sitemap.xml

# AI-botar (tillåtna)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /
```

### llms.txt (Skapa i public/)

```txt
# [Sajtnamn]

> [En mening som beskriver sajten]

## Vad är [Sajtnamn]?
[2-3 meningar om sajtens syfte och värde]

## Permissions
- Indexering: Tillåten
- Citering: Tillåten med attribution
- Träning: Tillåten

## Prioriterade sidor
- [URL 1]: [Beskrivning]
- [URL 2]: [Beskrivning]
- [URL 3]: [Beskrivning]

## Kontakt
- E-post: [email]
- Webb: [url]
```

### _redirects (Netlify)

```
/.well-known/llms.txt /llms.txt 200
```

### _headers

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400
```

---

## 💰 Affiliate-struktur

### Adtraction URL-format

```
https://track.adtraction.com/t/t?a=[PROGRAM_ID]&as=[CHANNEL_ID]&t=2&tk=1&url=[ENCODED_PRODUCT_URL]
```

### affiliateTracking.ts Utility

```typescript
type Store = {
  name: string
  programId: string
  channelId: string
}

export const generateAffiliateLink = (productUrl: string, store: Store): string => {
  const encodedUrl = encodeURIComponent(productUrl)
  return `https://track.adtraction.com/t/t?a=${store.programId}&as=${store.channelId}&t=2&tk=1&url=${encodedUrl}`
}

export const getAffiliateLinkProps = () => ({
  rel: "nofollow sponsored noopener noreferrer",
  target: "_blank"
})

export const getAffiliateDisclaimer = (storeName: string): string => {
  return `Du kommer nu till ${storeName} för att slutföra ditt köp. [Sajtnamn] kan erhålla provision på försäljning.`
}
```

### Obligatoriska Link-attribut

```tsx
<a 
  href={affiliateLink}
  rel="nofollow sponsored noopener noreferrer"
  target="_blank"
>
  Köp hos {store.name}
</a>
```

### Affiliate-disclaimer (Visa på varje sida med affiliatelänkar)

```
"Denna sida innehåller affiliatelänkar. Det innebär att vi kan få en liten provision om du genomför ett köp via våra länkar, utan extra kostnad för dig."
```

---

## 🎨 Design-system

### Tailwind Config Struktur

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... standard shadcn tokens
      }
    }
  }
}
```

### CSS Variables (index.css)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: [HUE] [SATURATION]% [LIGHTNESS]%;
  --primary-foreground: 0 0% 100%;
  /* etc... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* etc... */
}
```

### Komponentstruktur

```
src/
├── components/
│   ├── ui/              # shadcn/ui komponenter
│   ├── layout/          # Header, Footer, Layout
│   ├── seo/             # SEO, SchemaMarkup
│   ├── product/         # ProductCard, ProductGrid
│   └── shared/          # Återanvändbara komponenter
├── data/
│   ├── products.json    # Produktdata
│   ├── categories.json  # Kategoridata
│   └── stores.json      # Butiksinfo
├── pages/
│   ├── Index.tsx
│   ├── Category.tsx
│   ├── Product.tsx
│   └── ...
├── utils/
│   ├── affiliateTracking.ts
│   ├── schemaMarkup.ts
│   └── seoHelpers.ts
└── App.tsx
```

---

## ✅ Pre-launch Checklista

### SEO
- [ ] Varje sida har unik `<title>` (max 60 tecken)
- [ ] Varje sida har unik `<meta description>` (max 155 tecken)
- [ ] Alla sidor har `<link rel="canonical">`
- [ ] Schema.org JSON-LD på alla sidtyper
- [ ] Breadcrumbs implementerade
- [ ] Intern länkning mellan relaterade sidor
- [ ] Alt-text på alla bilder
- [ ] Semantisk HTML (header, main, section, article, nav)

### Tekniskt
- [ ] sitemap.xml genererad och korrekt
- [ ] robots.txt på plats
- [ ] _headers konfigurerad
- [ ] _redirects konfigurerad
- [ ] Responsiv design (mobil, tablet, desktop)
- [ ] Laddningstid < 3 sekunder
- [ ] Inga konsolfel
- [ ] 404-sida implementerad

### GEO
- [ ] llms.txt skapad
- [ ] /.well-known/llms.txt redirect
- [ ] AI-botar tillåtna i robots.txt

### Affiliate
- [ ] Alla affiliatelänkar har `rel="nofollow sponsored"`
- [ ] Affiliate-disclaimer synlig
- [ ] Tracking fungerar (testa i Adtraction)
- [ ] Alla program-ID:n korrekta

### Juridiskt
- [ ] Integritetspolicy-sida
- [ ] Cookie-notice (om cookies används)
- [ ] Kontaktuppgifter tillgängliga

### Analytics
- [ ] Google Analytics 4 installerat
- [ ] Plausible Analytics (valfritt)
- [ ] Event-tracking för affiliateklick

---

## 📁 Obligatoriska Filer

```
public/
├── robots.txt
├── sitemap.xml
├── llms.txt
├── .well-known/
│   └── llms.txt (symlink eller kopia)
├── _headers
├── _redirects
├── favicon.png
├── og-image.png
└── manifest.json

src/
├── components/
│   └── SEO.tsx
├── utils/
│   ├── schemaMarkup.ts
│   └── affiliateTracking.ts
└── data/
    └── [produktdata].json
```

---

## 💡 Tips för Framgång

### Innehåll
1. **Skriv för människor först, sökmotorer sedan**
2. **Fokusera på ett primärt sökord per sida**
3. **Använd longtail-sökord i guides och artiklar**
4. **Uppdatera innehåll regelbundet (åtminstone årligt)**

### Tekniskt
1. **Håll det enkelt - ingen databas = snabbare sajt**
2. **Optimera bilder (WebP, lazy loading)**
3. **Minimera JavaScript-bundles**
4. **Använd CDN för statiska filer**

### Affiliate
1. **Välj partners med bra konvertering och provision**
2. **Placera CTA:er strategiskt (above the fold)**
3. **A/B-testa knapptexter och placeringar**
4. **Spåra vilka produkter som konverterar bäst**

---

## 📞 Support

Vid frågor om denna guide eller när du skapar nya projekt:
1. Kopiera "Snabbstart"-mallen ovan
2. Fyll i all information
3. Klistra in i en ny Lovable-chatt
4. Referera till denna guide: `docs/affiliate-project-guide.md`

---

*Senast uppdaterad: 2025-01-22*
*Baserad på: ViHandlar.se (bevisad struktur med trafik och intäkter)*
