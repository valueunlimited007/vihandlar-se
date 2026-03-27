---
paths:
  - app/shopping/**
  - app/api/redirect/**
  - lib/data/stores.ts
  - lib/data/products.ts
  - data/stores.json
  - data/products.json
---

# Affiliate & Shopping Regler

## KRITISKT: Aldrig direktlänkar!
Alla affiliatelänkar MÅSTE gå via `/api/redirect/[store]`:
```typescript
// ❌ FEL - exponerar tracking
<a href="https://track.adtraction.com/...">

// ✅ RÄTT - döljer tracking
<a href="/api/redirect/matsmart?url=...">
```

## Adtraction URL-format
Använder `trackingBase` från stores.json (go.adt242.com) för exakt matchning med Adtraction.
```typescript
function buildAdtractionUrl(store: Store, productUrl: string): string {
  const encodedUrl = encodeURIComponent(productUrl);
  const { trackingBase, programAdId, programId, channelId } = store.affiliate_config;
  if (trackingBase) {
    return `${trackingBase}&url=${encodedUrl}`;
  }
  const adId = programAdId || programId;
  return `https://go.adt242.com/t/t?a=${adId}&as=${channelId}&t=2&tk=1&url=${encodedUrl}`;
}
```

## Redirect API
`/api/redirect/[store]/route.ts`:
```typescript
export async function GET(request: Request, { params }) {
  const store = getStoreBySlug(params.store);
  const url = new URL(request.url).searchParams.get('url');
  const trackingUrl = buildAdtractionUrl(store, url);
  return NextResponse.redirect(trackingUrl);
}
```

## Obligatoriska länkattribut
```tsx
<a 
  href={`/api/redirect/${store.slug}?url=${encodeURIComponent(productUrl)}`}
  rel="nofollow sponsored noopener noreferrer"
  target="_blank"
>
```

## Affiliate-disclaimer (visa på alla sidor med länkar)
"Denna sida innehåller affiliatelänkar. Vi kan få provision vid köp, utan extra kostnad för dig."

## Sidor
- `/handla` - Hub med butiker
- `/handla/produkt/[slug]` - Produktsida
- `/handla/kategori/[slug]` - Produktkategori
