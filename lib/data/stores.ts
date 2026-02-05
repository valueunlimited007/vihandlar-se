// lib/data/stores.ts
import storesData from '@/data/stores.json';
import type { Store, AffiliateConfig } from '@/types/store';

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
 * Bygg Adtraction tracking URL
 */
export function buildAdtractionUrl(
  store: Store,
  productUrl: string
): string {
  const { programId, channelId } = store.affiliate_config;
  const encodedUrl = encodeURIComponent(productUrl);
  return `https://track.adtraction.com/t/t?a=${programId}&as=${channelId}&t=2&tk=1&url=${encodedUrl}`;
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
