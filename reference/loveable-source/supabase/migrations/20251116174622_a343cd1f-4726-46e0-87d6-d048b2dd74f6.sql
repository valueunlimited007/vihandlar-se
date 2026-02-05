-- Create stores table
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  affiliate_network TEXT NOT NULL, -- 'adtraction', 'tradedoubler', 'awin', etc.
  affiliate_config JSONB NOT NULL, -- { programId, channelId, trackingBase, etc }
  feed_url TEXT NOT NULL,
  feed_type TEXT NOT NULL DEFAULT 'xml', -- 'xml', 'json', 'csv'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table with store_id
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL, -- Store's product ID
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'SEK',
  brand TEXT,
  category TEXT,
  image_url TEXT,
  product_url TEXT NOT NULL,
  ean TEXT,
  in_stock BOOLEAN DEFAULT true,
  shipping_cost DECIMAL(10,2),
  slug TEXT NOT NULL, -- Unique per store
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, product_id),
  UNIQUE(store_id, slug)
);

-- Indexes for performance
CREATE INDEX idx_products_store_id ON public.products(store_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_ean ON public.products(ean) WHERE ean IS NOT NULL;

-- Full-text search index on Swedish
CREATE INDEX idx_products_search ON public.products USING gin(to_tsvector('swedish', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(brand, '')));

-- RLS Policies
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stores are publicly readable" ON public.stores FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT TO anon USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert Delitea as first store
INSERT INTO public.stores (slug, name, description, website_url, affiliate_network, affiliate_config, feed_url, feed_type) VALUES (
  'delitea',
  'Delitea',
  'Internationella delikatesser och specialiteter från hela världen. Över 10,000 produkter med snabb leverans.',
  'https://www.delitea.se',
  'adtraction',
  '{"programId": "1795091263", "programAdId": "1795091266", "channelId": "2013245131", "trackingBase": "https://go.adt242.com/t/t?a=1795091266&as=2013245131&t=2&tk=1", "cookieDays": 30}'::jsonb,
  'https://secure.adtraction.com/partner/productfeed.htm?apid=1795091263&sid=2013245131&pfid=1610',
  'xml'
);