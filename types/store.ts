// types/store.ts

export interface AffiliateConfig {
  programId: string;
  channelId: string;
  programAdId?: string;
  cookieDays?: number;
  trackingBase?: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  affiliate_network: string;
  affiliate_config: AffiliateConfig;
  feed_url: string;
  feed_type: string;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  store_id: string;
  product_id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  currency: string | null;
  image_url: string | null;
  product_url: string;
  category: string | null;
  brand: string | null;
  ean: string | null;
  in_stock: boolean | null;
  shipping_cost: number | null;
  last_updated: string | null;
  created_at?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  category_path: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  product_count: number | null;
  created_at?: string;
  updated_at?: string;
}

