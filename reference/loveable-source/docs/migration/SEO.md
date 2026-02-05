# SEO och GEO-struktur

## Routes med metadata

| Route | Title Template | Priority | changefreq |
|-------|---------------|----------|------------|
| `/` | vihandlar.se - E-nummerskanner och Inköpslistor | 1.0 | daily |
| `/e-amnen` | E-ämnen Guide - Alla 354 tillsatser | 0.9 | weekly |
| `/e-amnen/[slug]` | {e_number} {name} - vihandlar.se | 0.8 | monthly |
| `/e-amnen/scanner` | E-nummerskanner - Scanna ingredienser | 0.9 | weekly |
| `/e-amnen/guide` | E-ämnesguide - Förstå tillsatser | 0.8 | monthly |
| `/livsmedel` | Livsmedelsguide A-Ö - 2500+ produkter | 0.8 | weekly |
| `/livsmedel/[letter]` | Livsmedel på {letter} | 0.7 | weekly |
| `/livsmedel/[letter]/[foodSlug]` | {name} - Näringsvärden och tips | 0.6 | monthly |
| `/shopping` | Handla online - Jämför priser | 0.7 | daily |
| `/shopping/delitea` | Delitea Matbutik - 7000+ produkter | 0.8 | daily |
| `/shopping/[store]/[slug]` | {name} - Köp hos {store} | 0.5 | daily |
| `/inkopslistor` | Inköpslista Online - Gratis app | 0.9 | weekly |
| `/listor` | Färdiga inköpslistor | 0.7 | weekly |
| `/om` | Om vihandlar.se | 0.3 | monthly |
| `/integritet` | Integritetspolicy | 0.2 | yearly |

## Schema.org per sidtyp

### Startsida
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "vihandlar.se",
  "url": "https://vihandlar.se",
  "description": "E-nummerskanner och smarta inköpslistor",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vihandlar.se/e-amnen?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### E-ämne detail
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "E100 Kurkumin",
  "description": "Naturligt färgämne från gurkmeja...",
  "author": {
    "@type": "Organization",
    "name": "vihandlar.se"
  },
  "publisher": {
    "@type": "Organization",
    "name": "vihandlar.se",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vihandlar.se/logo.png"
    }
  }
}
```

### Livsmedel detail
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Äpple",
  "description": "Svenskt frukt med näringsvärden...",
  "mainEntity": {
    "@type": "NutritionInformation",
    "calories": "52 kcal",
    "proteinContent": "0.3g",
    "fatContent": "0.2g",
    "carbohydrateContent": "14g",
    "fiberContent": "2.4g"
  }
}
```

### Produkt
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Produktnamn",
  "image": "https://...",
  "description": "...",
  "brand": {
    "@type": "Brand",
    "name": "Varumärke"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://vihandlar.se/shopping/delitea/produkt-slug",
    "priceCurrency": "SEK",
    "price": "99.00",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Delitea"
    }
  }
}
```

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Hem",
      "item": "https://vihandlar.se"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "E-ämnen",
      "item": "https://vihandlar.se/e-amnen"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "E100 Kurkumin"
    }
  ]
}
```

## GEO (Generative Engine Optimization)

### robots.txt
```
# robots.txt for vihandlar.se

User-agent: *
Allow: /
Crawl-delay: 1

# Sitemap
Sitemap: https://vihandlar.se/sitemap.xml

# AI agents (allowed)
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

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /
```

### llms.txt struktur
```
# vihandlar.se

> Svensk konsumentapp för E-nummerskanning, inköpslistor och matjämförelse.

## Version
1.0

## Site Information
- Name: vihandlar.se
- Owner: Value Unlimited
- Contact: hej@vihandlar.se
- Languages: Swedish (primary)
- Region: Sweden

## Purpose
vihandlar.se hjälper svenska konsumenter att:
1. Förstå E-nummer och tillsatser i mat
2. Skapa och dela smarta inköpslistor
3. Jämföra matpriser online

## Features
- E-nummerskanner med OCR (354 tillsatser)
- Inköpslistor med realtidsdelning
- Produktshopping (7000+ produkter)
- Livsmedelsguide (2500+ livsmedel)

## Content Freshness
- E-ämnen: uppdateras månadsvis
- Produkter: uppdateras dagligen
- Livsmedel: uppdateras kvartalsvis

## AI Policies
### Training
Tillåten med attribution

### Inference
Tillåten - citera gärna våra e-ämnebeskrivningar

### Attribution
Citera som: "Källa: vihandlar.se"

## Priority Pages
- /e-amnen - Komplett E-ämnesguide
- /e-amnen/scanner - E-nummerskanner
- /livsmedel - Livsmedelsguide A-Ö
- /shopping - Produktshopping

## Datasets
### E-ämnen
354 tillsatser med riskbedömning, ADI-värden och hälsoeffekter

### Livsmedel
2500+ livsmedel med näringsvärden, förvaring och säsong

### Produkter
7000+ produkter med priser från Delitea
```

### humans.txt
```
# humans.txt — vihandlar.se

TEAM/OWNER/SITE/LOCATION/From
- Owner: Value Unlimited
- Site: https://vihandlar.se/
- Contact: hej@vihandlar.se
- Location: Sweden (Europe/Stockholm)
- From: 2024 — built with love for simpler everyday shopping

Last update: 2025/01/27

FEATURES/TECHNICAL
- E-nummerskanner med OCR
- Smarta inköpslistor
- Produktshopping med 7000+ produkter
- Livsmedelsguide A-Ö

Stack
- Frontend: Next.js 15 App Router, TypeScript, Tailwind
- Backend: Vercel Edge Functions
- Data: JSON (statisk generering)
- Hosting: Vercel
```

### security.txt
```
Contact: mailto:hej@vihandlar.se
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: sv, en
Canonical: https://vihandlar.se/.well-known/security.txt
```

## Sitemap-struktur

```
sitemap.xml (index)
├── sitemap-main.xml
│   ├── Statiska sidor (/, /om, /integritet, etc.)
│   ├── E-ämnen hub + detaljer (354 sidor)
│   └── Livsmedel hub + detaljer (2500+ sidor)
├── sitemap-products-1.xml (produkter 1-1000)
├── sitemap-products-2.xml (produkter 1001-2000)
├── sitemap-products-3.xml (produkter 2001-3000)
├── sitemap-products-4.xml (produkter 3001-4000)
├── sitemap-products-5.xml (produkter 4001-5000)
├── sitemap-products-6.xml (produkter 5001-6000)
├── sitemap-products-7.xml (produkter 6001-7000)
└── sitemap-products-8.xml (produkter 7001+)
```

## Next.js sitemap implementation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllEAdditives } from '@/lib/data/e-additives';
import { getAllFoods } from '@/lib/data/foods';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vihandlar.se';
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/e-amnen`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/e-amnen/scanner`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/livsmedel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/shopping`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    // ... more static pages
  ];
  
  // E-additives
  const eAdditives = getAllEAdditives();
  const eAdditivePages = eAdditives.map(additive => ({
    url: `${baseUrl}/e-amnen/${additive.slug}`,
    lastModified: new Date(additive.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // Foods
  const foods = getAllFoods();
  const foodPages = foods.map(food => ({
    url: `${baseUrl}/livsmedel/${food.letter.toLowerCase()}/${food.slug}`,
    lastModified: new Date(food.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [...staticPages, ...eAdditivePages, ...foodPages];
}
```

## Open Graph defaults

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://vihandlar.se'),
  title: {
    default: 'vihandlar.se - E-nummerskanner & Inköpslistor',
    template: '%s | vihandlar.se',
  },
  description: 'Scanna E-nummer, skapa inköpslistor och jämför matpriser. Gratis verktyg för smartare matinköp.',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://vihandlar.se',
    siteName: 'vihandlar.se',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'vihandlar.se - E-nummerskanner & Inköpslistor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vihandlar.se',
    description: 'E-nummerskanner & Smarta inköpslistor',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```
