// types/store.ts

export interface AffiliateConfig {
  programId: string;
  channelId: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string;
  affiliate_network: 'adtraction';
  affiliate_config: AffiliateConfig;
  feed_url: string;
  feed_type: 'xml' | 'csv' | 'json';
  is_active: boolean;
  categories: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  store_id: string;
  external_id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  currency: 'SEK';
  image_url: string | null;
  product_url: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  ean: string | null;
  in_stock: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon: string | null;
  sort_order: number;
}

// Adtraction tracking URL builder
export function buildAdtractionUrl(
  programId: string,
  channelId: string,
  productUrl: string
): string {
  const encodedUrl = encodeURIComponent(productUrl);
  return `https://track.adtraction.com/t/t?a=${programId}&as=${channelId}&t=2&tk=1&url=${encodedUrl}`;
}
