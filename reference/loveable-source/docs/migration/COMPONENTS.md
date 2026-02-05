# Komponentkatalog

## Sidor (pages/ → app/)

| Loveable Komponent | Next.js Route | Server/Client | Beskrivning |
|--------------------|---------------|---------------|-------------|
| LandingPage.tsx | app/page.tsx | Server | Startsida med hero |
| EAdditiveHub.tsx | app/e-amnen/page.tsx | Server | E-ämnen huvudsida |
| EAdditiveDetail.tsx | app/e-amnen/[slug]/page.tsx | Server | E-ämne detalj (354 st) |
| EAdditiveScanner.tsx | app/e-amnen/scanner/page.tsx | Client | OCR-skanner |
| EAdditiveGuide.tsx | app/e-amnen/guide/page.tsx | Server | E-ämnesguide |
| EAdditiveAllView.tsx | app/e-amnen/alla/page.tsx | Server | Alla e-ämnen |
| EAdditiveCategory.tsx | app/e-amnen/kategori/[category]/page.tsx | Server | E-ämnen per kategori |
| EAdditiveLetter.tsx | app/e-amnen/nummer/[letter]/page.tsx | Server | E-ämnen per bokstav |
| FoodHubSimple.tsx | app/livsmedel/page.tsx | Server | Livsmedel A-Ö |
| FoodLetterSimple.tsx | app/livsmedel/[letter]/page.tsx | Server | Livsmedel per bokstav |
| FoodDetailSimple.tsx | app/livsmedel/[letter]/[foodSlug]/page.tsx | Server | Livsmedel detalj |
| FoodCategory.tsx | app/livsmedel/kategori/[categorySlug]/page.tsx | Server | Livsmedel per kategori |
| ShoppingHub.tsx | app/shopping/page.tsx | Server | Shopping huvudsida |
| DeliteaShop.tsx | app/shopping/delitea/page.tsx | Server | Delitea butik |
| StoreShop.tsx | app/shopping/[store]/page.tsx | Server/ISR | Butikssida |
| ProductDetail.tsx | app/shopping/[store]/[slug]/page.tsx | Server/ISR | Produktsida |
| ProductBrowse.tsx | app/shopping/produkter/page.tsx | Server | Bläddra produkter |
| ProductBrowseByLetter.tsx | app/shopping/produkter/[letter]/page.tsx | Server/ISR | Produkter per bokstav |
| ProductCategoryHub.tsx | app/shopping/kategorier/page.tsx | Server | Kategorier hub |
| ProductCategory.tsx | app/shopping/kategori/[categorySlug]/page.tsx | Server/ISR | Produkter per kategori |
| HomePage.tsx | app/inkopslistor/page.tsx | Client | Inköpslista-app |
| ShoppingListView.tsx | app/list/[shareToken]/page.tsx | Client | Delad lista |
| PublicLists.tsx | app/listor/page.tsx | Server | Publika listor |
| PublicListDetail.tsx | app/listor/[slug]/page.tsx | Server | Lista detalj |
| About.tsx | app/om/page.tsx | Server | Om oss |
| Privacy.tsx | app/integritet/page.tsx | Server | Integritetspolicy |
| Sources.tsx | app/kallor/page.tsx | Server | Källor |
| Features.tsx | app/funktioner/page.tsx | Server | Funktioner |
| DynamicSitemap.tsx | app/sajtkarta/page.tsx | Server | HTML-sajtkarta |

## UI-komponenter (components/)

| Komponent | Användning | Behåll | Anteckningar |
|-----------|------------|--------|--------------|
| Layout.tsx | Wrapper med header/footer | → layout.tsx | Blir RootLayout |
| SEO.tsx | Meta-tags | ❌ | → generateMetadata |
| ErrorBoundary.tsx | Error handling | → error.tsx | Next.js error boundary |
| Breadcrumbs.tsx | Navigation | ✅ | Server Component |
| AffiliateAdsSection.tsx | Annonser | ✅ | Server Component |
| EAdditiveCard.tsx | E-ämne kort | ✅ | Server Component |
| EAdditiveCardEnhanced.tsx | E-ämne kort (utökad) | ✅ | Server Component |
| EAdditiveScanResults.tsx | Skanningsresultat | ✅ | Client Component |
| CameraCapture.tsx | Kamera för skanning | ✅ | Client Component |
| ScannerUploadArea.tsx | Bilduppladdning | ✅ | Client Component |
| RiskGauge.tsx | Risknivå-visare | ✅ | Server Component |
| ProductCard.tsx | Produktkort | ✅ | Server Component |
| ShoppingListItem.tsx | Lista-item | ✅ | Client Component |
| ShoppingListView.tsx | Lista-vy | ✅ | Client Component |
| AddItemForm.tsx | Lägg till item | ✅ | Client Component |
| ShareButton.tsx | Dela-knapp | ✅ | Client Component |

## Hooks (hooks/)

| Hook | Användning | Migration | Anteckningar |
|------|------------|-----------|--------------|
| useEAdditives.tsx | Hämta e-ämnen | → lib/data/e-additives.ts | Server-side |
| useFoods.tsx | Hämta livsmedel | → lib/data/foods.ts | Server-side |
| useProducts.tsx | Hämta produkter | → lib/data/products.ts | Server-side |
| useProductCategories.tsx | Hämta kategorier | → lib/data/categories.ts | Server-side |
| useShoppingList.tsx | Lista-logik | ✅ Behåll | + Vercel KV |
| useVoiceInput.tsx | Röstinmatning | ✅ Behåll | Client-side |
| useWhisperVoiceInput.tsx | Whisper API | ✅ Behåll | Client-side |
| useImageAnalysis.tsx | OCR-analys | ✅ Behåll | Client-side |
| useScanningHistory.tsx | Skanningshistorik | ✅ Behåll | localStorage |
| useHapticFeedback.tsx | Vibration | ✅ Behåll | Client-side |
| useAudioFeedback.tsx | Ljudeffekter | ✅ Behåll | Client-side |
| useSwipeGesture.tsx | Swipe-gester | ✅ Behåll | Client-side |
| useMobile.tsx | Mobil-detection | ✅ Behåll | Client-side |

## Utils (utils/)

| Fil | Användning | Migration | Anteckningar |
|-----|------------|-----------|--------------|
| schemaMarkup.ts | JSON-LD | ✅ Behåll | Uppdatera för Next.js |
| productSchemaMarkup.ts | Produkt JSON-LD | ✅ Behåll | |
| eAdditiveSchemaMarkup.ts | E-ämne JSON-LD | ✅ Behåll | |
| categorySchemaMarkup.ts | Kategori JSON-LD | ✅ Behåll | |
| affiliateTracking.ts | Affiliate-logik | ✅ Behåll | |
| eAdditiveMetaOptimization.ts | SEO-meta | → generateMetadata | |
| productMetaOptimization.ts | SEO-meta | → generateMetadata | |
| categoryMetaOptimization.ts | SEO-meta | → generateMetadata | |
| scannerSEO.ts | Skanner SEO | → generateMetadata | |
| deviceDetection.ts | Device detection | ✅ Behåll | |

## Data-filer (data/)

| Fil | Beskrivning | Källa |
|-----|-------------|-------|
| e-additives.json | 354 e-ämnen | Supabase export |
| foods.json | 2500+ livsmedel | Supabase export |
| food-categories.json | Livsmedelskategorier | Supabase export |
| stores.json | Butiksconfig | Supabase export |
| products.json | 7000+ produkter | Supabase export |
| public-lists.json | Publika listor | Supabase export |

## Typer (types/)

```typescript
// types/e-additive.ts
export interface EAdditive {
  id: string;
  e_number: string;
  name: string;
  slug: string;
  category: string;
  risk_score: number | null;
  adi_value: number | null;
  adi_source: string | null;
  short_description: string | null;
  long_description: string | null;
  common_products: CommonProduct[] | null;
  health_effects: HealthEffect[] | null;
  children_note: string | null;
  origin: string | null;
  natural_alternatives: string[] | null;
  avoidance_tips: string[] | null;
  longevity_impact: string | null;
  scientific_studies: ScientificStudy[] | null;
  livsmedelsverket_data: any | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// types/food.ts
export interface Food {
  id: string;
  name: string;
  slug: string;
  letter: string;
  category_id: string | null;
  subcategory: string | null;
  short_description: string | null;
  long_description: string | null;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  fiber: number | null;
  salt: number | null;
  key_vitamins: Record<string, string> | null;
  key_minerals: Record<string, string> | null;
  storage_method: string | null;
  shelf_life_opened: string | null;
  shelf_life_unopened: string | null;
  can_freeze: boolean | null;
  freezing_tips: string | null;
  allergens: string[] | null;
  season: string[] | null;
  usage_tips: string[] | null;
  substitutes: Substitute[] | null;
  related_foods: string[] | null;
  common_in_lists: string[] | null;
  faq: FAQ[] | null;
  meta_title: string | null;
  meta_description: string | null;
  alternative_names: string[] | null;
  created_at: string;
  updated_at: string;
}

// types/product.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  store_id: string;
  product_id: string;
  price: number;
  original_price: number | null;
  currency: string | null;
  image_url: string | null;
  product_url: string;
  description: string | null;
  category: string | null;
  brand: string | null;
  ean: string | null;
  in_stock: boolean | null;
  shipping_cost: number | null;
  last_updated: string | null;
  created_at: string | null;
}

// types/store.ts
export interface Store {
  id: string;
  name: string;
  slug: string;
  affiliate_network: string;
  affiliate_config: {
    programId: string;
    channelId: string;
  };
  feed_url: string;
  feed_type: string;
  website_url: string | null;
  logo_url: string | null;
  description: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}
```

## Lib (lib/data/)

```typescript
// lib/data/e-additives.ts
import eAdditives from '@/data/e-additives.json';
import type { EAdditive } from '@/types/e-additive';

export function getAllEAdditives(): EAdditive[] {
  return (eAdditives as EAdditive[]).filter(e => e.is_published);
}

export function getEAdditiveBySlug(slug: string): EAdditive | undefined {
  return (eAdditives as EAdditive[]).find(e => e.slug === slug && e.is_published);
}

export function getEAdditivesByCategory(category: string): EAdditive[] {
  return (eAdditives as EAdditive[]).filter(e => 
    e.category.toLowerCase() === category.toLowerCase() && e.is_published
  );
}

export function getEAdditiveCategories(): string[] {
  const categories = new Set(
    (eAdditives as EAdditive[])
      .filter(e => e.is_published)
      .map(e => e.category)
  );
  return Array.from(categories).sort();
}

// lib/data/foods.ts
import foods from '@/data/foods.json';
import type { Food } from '@/types/food';

export function getAllFoods(): Food[] {
  return foods as Food[];
}

export function getFoodBySlug(slug: string): Food | undefined {
  return (foods as Food[]).find(f => f.slug === slug);
}

export function getFoodsByLetter(letter: string): Food[] {
  return (foods as Food[]).filter(f => 
    f.letter.toLowerCase() === letter.toLowerCase()
  );
}

export function getLetters(): string[] {
  const letters = new Set((foods as Food[]).map(f => f.letter.toUpperCase()));
  return Array.from(letters).sort((a, b) => a.localeCompare(b, 'sv'));
}

// lib/data/products.ts
import products from '@/data/products.json';
import stores from '@/data/stores.json';
import type { Product } from '@/types/product';
import type { Store } from '@/types/store';

export function getAllProducts(): Product[] {
  return products as Product[];
}

export function getProductBySlug(storeSlug: string, productSlug: string): Product | undefined {
  const store = (stores as Store[]).find(s => s.slug === storeSlug);
  if (!store) return undefined;
  
  return (products as Product[]).find(p => 
    p.store_id === store.id && p.slug === productSlug
  );
}

export function getProductsByStore(storeSlug: string): Product[] {
  const store = (stores as Store[]).find(s => s.slug === storeSlug);
  if (!store) return [];
  
  return (products as Product[]).filter(p => p.store_id === store.id);
}

export function getProductsByCategory(category: string): Product[] {
  return (products as Product[]).filter(p => 
    p.category?.toLowerCase() === category.toLowerCase()
  );
}
```
