---
paths:
  - app/**/page.tsx
  - app/sitemap.ts
  - app/robots.ts
  - public/llms.txt
---

# SEO & GEO Regler

## Varje sida MÅSTE ha
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Unik titel | vihandlar.se",  // Max 60 tecken
    description: "Unik beskrivning...",   // Max 155 tecken
    alternates: {
      canonical: `https://vihandlar.se/path`,
    },
    openGraph: { ... },
  };
}
```

## Title-format
```
[Sidspecifik] | [Kategori] | vihandlar.se

Exempel:
"E102 Tartrazin - Risker & Alternativ | E-ämnen | vihandlar.se"
"Mjölk - Förvaring & Näringsvärde | Livsmedel | vihandlar.se"
```

## Schema.org per sidtyp
| Sidtyp | Schema |
|--------|--------|
| Startsida | WebSite + Organization |
| E-ämne | Article + FAQPage + BreadcrumbList |
| Livsmedel | Article + NutritionInformation |
| Produkt | Product + Offer + BreadcrumbList |

## GEO (AI-optimering)
`public/llms.txt` och `app/robots.ts` tillåter:
- GPTBot, ChatGPT-User
- ClaudeBot, Claude-User
- PerplexityBot
- Google-Extended

## sitemap.ts
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eAdditives = getAllEAdditives();
  const foods = getAllFoods();
  
  return [
    { url: 'https://vihandlar.se', priority: 1.0 },
    { url: 'https://vihandlar.se/e-amnen', priority: 0.9 },
    ...eAdditives.map(e => ({
      url: `https://vihandlar.se/e-amnen/${e.slug}`,
      priority: 0.8,
    })),
    // etc
  ];
}
```

## Breadcrumbs
Implementera på ALLA sidor utom startsidan.
