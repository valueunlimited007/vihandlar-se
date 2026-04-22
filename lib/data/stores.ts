// lib/data/stores.ts
import storesData from '@/data/stores.json';
import type { Store, AffiliateConfig, Product } from '@/types/store';

const stores: Store[] = storesData as Store[];

/**
 * Hämta alla butiker
 */
export function getAllStores(): Store[] {
  return stores.filter(s => s.is_active);
}

/**
 * Hämta butik via slug
 */
export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find(s => s.slug === slug && s.is_active);
}

/**
 * Hämta butik via ID
 */
export function getStoreById(id: string): Store | undefined {
  return stores.find(s => s.id === id && s.is_active);
}

/**
 * Hämta butik för en produkt. Matchar i ordning:
 * 1. product.store_id mot store.id
 * 2. product.slug suffix mot store.slug (ex "...-coffee-friend")
 * 3. Fallback till första aktiva butiken
 */
export function getStoreForProduct(product: Pick<Product, 'store_id' | 'slug'>): Store | undefined {
  if (product.store_id) {
    const byId = stores.find(s => s.id === product.store_id && s.is_active);
    if (byId) return byId;
  }
  if (product.slug) {
    const bySlug = stores.find(
      s => s.is_active && product.slug.endsWith(`-${s.slug}`),
    );
    if (bySlug) return bySlug;
  }
  return stores.find(s => s.is_active);
}

/**
 * Bygg Adtraction tracking URL
 * Använder trackingBase från stores.json för att matcha exakt samma
 * URL-format som gamla Loveable-versionen (go.adt242.com med programAdId)
 */
export function buildAdtractionUrl(
  store: Store,
  productUrl: string
): string {
  const encodedUrl = encodeURIComponent(productUrl);
  const { trackingBase, programAdId, programId, channelId } = store.affiliate_config;

  if (trackingBase) {
    return `${trackingBase}&url=${encodedUrl}`;
  }

  // Fallback: bygg URL manuellt (använd programAdId om tillgängligt)
  const adId = programAdId || programId;
  return `https://go.adt242.com/t/t?a=${adId}&as=${channelId}&t=2&tk=1&url=${encodedUrl}`;
}

/**
 * Hämta redirect URL för intern användning
 */
export function getRedirectUrl(storeSlug: string, productUrl: string): string {
  return `/api/redirect/${storeSlug}?url=${encodeURIComponent(productUrl)}`;
}

/**
 * Hämta affiliate link attribut
 */
export function getAffiliateLinkProps() {
  return {
    rel: "nofollow sponsored noopener noreferrer",
    target: "_blank" as const,
  };
}

/**
 * Hämta affiliate disclaimer text
 */
export function getAffiliateDisclaimer(storeName?: string): string {
  if (storeName) {
    return `Du kommer nu till ${storeName} för att slutföra ditt köp. vihandlar.se kan erhålla provision på försäljning.`;
  }
  return "Denna sida innehåller affiliatelänkar. Vi kan få provision vid köp, utan extra kostnad för dig.";
}
