# Migrationsguide: Loveable → Next.js 15

## Routing-mappning

| Loveable (React Router) | Next.js 15 (App Router) | Typ |
|-------------------------|-------------------------|-----|
| `/` | `app/page.tsx` | Static |
| `/e-amnen` | `app/e-amnen/page.tsx` | Static |
| `/e-amnen/:slug` | `app/e-amnen/[slug]/page.tsx` | Static (354) |
| `/e-amnen/kategori/:category` | `app/e-amnen/kategori/[category]/page.tsx` | Static |
| `/e-amnen/scanner` | `app/e-amnen/scanner/page.tsx` | Client |
| `/e-amnen/nummer/:letter` | `app/e-amnen/nummer/[letter]/page.tsx` | Static |
| `/e-amnen/guide` | `app/e-amnen/guide/page.tsx` | Static |
| `/e-amnen/alla` | `app/e-amnen/alla/page.tsx` | Static |
| `/livsmedel` | `app/livsmedel/page.tsx` | Static |
| `/livsmedel/:letter` | `app/livsmedel/[letter]/page.tsx` | Static |
| `/livsmedel/:letter/:foodSlug` | `app/livsmedel/[letter]/[foodSlug]/page.tsx` | Static (2500+) |
| `/livsmedel/kategori/:categorySlug` | `app/livsmedel/kategori/[categorySlug]/page.tsx` | Static |
| `/shopping` | `app/shopping/page.tsx` | Static |
| `/shopping/delitea` | `app/shopping/delitea/page.tsx` | Static |
| `/shopping/:store` | `app/shopping/[store]/page.tsx` | ISR |
| `/shopping/:store/:slug` | `app/shopping/[store]/[slug]/page.tsx` | ISR |
| `/shopping/produkter` | `app/shopping/produkter/page.tsx` | Static |
| `/shopping/produkter/:letter` | `app/shopping/produkter/[letter]/page.tsx` | ISR |
| `/shopping/kategorier` | `app/shopping/kategorier/page.tsx` | Static |
| `/shopping/kategori/:categorySlug` | `app/shopping/kategori/[categorySlug]/page.tsx` | ISR |
| `/inkopslistor` | `app/inkopslistor/page.tsx` | Client |
| `/list/:shareToken` | `app/list/[shareToken]/page.tsx` | Client |
| `/listor` | `app/listor/page.tsx` | Static |
| `/listor/:slug` | `app/listor/[slug]/page.tsx` | Static |
| `/om` | `app/om/page.tsx` | Static |
| `/integritet` | `app/integritet/page.tsx` | Static |
| `/kallor` | `app/kallor/page.tsx` | Static |
| `/funktioner` | `app/funktioner/page.tsx` | Static |
| `/sajtkarta` | `app/sajtkarta/page.tsx` | Static |

## Komponentmappning

| Loveable Component | Next.js Equivalent | Anteckningar |
|--------------------|-------------------|--------------|
| `Layout.tsx` | `app/layout.tsx` | RootLayout + metadata |
| `SEO.tsx` | `generateMetadata()` | Export från page.tsx |
| `HomePage.tsx` | `app/inkopslistor/page.tsx` | 'use client' |
| `LandingPage.tsx` | `app/page.tsx` | Server Component |
| `EAdditiveScanner.tsx` | `app/e-amnen/scanner/page.tsx` | 'use client' |
| `EAdditiveHub.tsx` | `app/e-amnen/page.tsx` | Server Component |
| `EAdditiveDetail.tsx` | `app/e-amnen/[slug]/page.tsx` | Server Component |
| `FoodHubSimple.tsx` | `app/livsmedel/page.tsx` | Server Component |
| `FoodDetailSimple.tsx` | `app/livsmedel/[letter]/[foodSlug]/page.tsx` | Server Component |
| `ShoppingHub.tsx` | `app/shopping/page.tsx` | Server Component |
| `ProductDetail.tsx` | `app/shopping/[store]/[slug]/page.tsx` | Server Component |
| `ShoppingListView.tsx` | `app/list/[shareToken]/page.tsx` | 'use client' |
| `useShoppingList.tsx` | `hooks/useShoppingList.ts` | Behåll som hook |
| `useEAdditives.tsx` | `lib/data/e-additives.ts` | Server-side JSON |
| `useFoods.tsx` | `lib/data/foods.ts` | Server-side JSON |
| `useProducts.tsx` | `lib/data/products.ts` | Server-side JSON |

## Data-access transformation

### Före (Supabase + TanStack Query)
```typescript
// hooks/useEAdditives.tsx
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useEAdditives = () => {
  return useQuery({
    queryKey: ['e-additives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true)
        .order('e_number');
      if (error) throw error;
      return data;
    }
  });
};
```

### Efter (JSON + Server Component)
```typescript
// lib/data/e-additives.ts
import eAdditives from '@/data/e-additives.json';
import type { EAdditive } from '@/types/e-additive';

export function getAllEAdditives(): EAdditive[] {
  return eAdditives.filter(e => e.is_published);
}

export function getEAdditiveBySlug(slug: string): EAdditive | undefined {
  return eAdditives.find(e => e.slug === slug);
}

export function getEAdditivesByCategory(category: string): EAdditive[] {
  return eAdditives.filter(e => e.category === category && e.is_published);
}

export function getEAdditivesByLetter(letter: string): EAdditive[] {
  return eAdditives.filter(e => 
    e.e_number.charAt(1).toUpperCase() === letter.toUpperCase() && 
    e.is_published
  );
}
```

## Statisk generering

### generateStaticParams exempel
```typescript
// app/e-amnen/[slug]/page.tsx
import { getAllEAdditives, getEAdditiveBySlug } from '@/lib/data/e-additives';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const additives = getAllEAdditives();
  return additives.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const additive = getEAdditiveBySlug(params.slug);
  if (!additive) return {};
  
  return {
    title: `${additive.e_number} ${additive.name} | vihandlar.se`,
    description: additive.short_description,
    openGraph: {
      title: `${additive.e_number} ${additive.name}`,
      description: additive.short_description,
      type: 'article',
    },
  };
}

export default function EAdditivePage({ params }: PageProps) {
  const additive = getEAdditiveBySlug(params.slug);
  if (!additive) notFound();
  
  return <EAdditiveDetail additive={additive} />;
}
```

### ISR för produkter
```typescript
// app/shopping/[store]/[slug]/page.tsx
import { getProductBySlug } from '@/lib/data/products';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { store: string; slug: string };
}

export const revalidate = 3600; // 1 timme

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.store, params.slug);
  if (!product) notFound();
  
  return <ProductDetail product={product} />;
}
```

## Edge Function: scan-e-numbers

```typescript
// app/api/scan/route.ts
import { NextRequest } from 'next/server';
import eAdditives from '@/data/e-additives.json';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }
    
    // Convert to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    // Google Vision OCR
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: base64 },
            features: [{ type: 'TEXT_DETECTION' }]
          }]
        })
      }
    );
    
    const visionData = await visionResponse.json();
    const text = visionData.responses?.[0]?.textAnnotations?.[0]?.description || '';
    
    // Extract E-numbers with regex
    const eNumbers = text.match(/E\s*\d{3,4}[a-z]*/gi) || [];
    const normalized = [...new Set(eNumbers.map(e => e.replace(/\s/g, '').toUpperCase()))];
    
    // Lookup in JSON data
    const additives = normalized
      .map(num => eAdditives.find(a => a.e_number === num))
      .filter(Boolean);
    
    // Calculate risk summary
    const riskSummary = {
      high: additives.filter(a => a.risk_score >= 7).length,
      medium: additives.filter(a => a.risk_score >= 4 && a.risk_score < 7).length,
      low: additives.filter(a => a.risk_score < 4).length,
    };
    
    return Response.json({ 
      found_e_numbers: normalized,
      e_additives_data: additives,
      risk_summary: riskSummary,
      raw_text: text,
    });
  } catch (error) {
    console.error('Scan error:', error);
    return Response.json({ error: 'Scan failed' }, { status: 500 });
  }
}
```

## Edge Function: voice-to-text

```typescript
// app/api/voice/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return Response.json({ error: 'No audio provided' }, { status: 400 });
    }
    
    // Prepare form data for Whisper API
    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile, 'audio.webm');
    whisperFormData.append('model', 'whisper-1');
    whisperFormData.append('language', 'sv');
    whisperFormData.append('prompt', 'Transkribera svenska matvarunamn');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: whisperFormData,
    });
    
    if (!response.ok) {
      throw new Error('Whisper API error');
    }
    
    const result = await response.json();
    return Response.json({ text: result.text });
  } catch (error) {
    console.error('Voice-to-text error:', error);
    return Response.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
```

## Affiliate redirect

```typescript
// app/api/redirect/[store]/route.ts
import { NextRequest } from 'next/server';
import stores from '@/data/stores.json';

export async function GET(
  request: NextRequest,
  { params }: { params: { store: string } }
) {
  const url = request.nextUrl.searchParams.get('url');
  const store = stores.find(s => s.slug === params.store);
  
  if (!store || !url) {
    return new Response('Not found', { status: 404 });
  }
  
  const { programId, channelId } = store.affiliate_config;
  const trackingUrl = `https://track.adtraction.com/t/t?a=${programId}&as=${channelId}&t=2&tk=1&url=${encodeURIComponent(url)}`;
  
  return Response.redirect(trackingUrl, 302);
}
```

## Client Component exempel

```typescript
// app/e-amnen/scanner/page.tsx
'use client';

import { useState } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { EAdditiveScanResults } from '@/components/EAdditiveScanResults';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = async (imageData: string) => {
    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      setScanResult(result);
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">E-nummerskanner</h1>
      <CameraCapture onCapture={handleScan} isLoading={isScanning} />
      {scanResult && <EAdditiveScanResults result={scanResult} />}
    </div>
  );
}
```
