import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ORIGIN = "https://vihandlar.se";
const PRODUCTS_PER_SITEMAP = 1000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting sitemap generation...');

    // Create storage bucket if it doesn't exist
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'sitemaps');
    
    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket('sitemaps', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['application/xml', 'text/xml']
      });
      console.log('Created sitemaps bucket');
    }

    const now = new Date().toISOString();
    const generatedFiles: string[] = [];

    // Generate sitemap-main.xml
    const mainSitemap = await generateMainSitemap(supabaseAdmin, now);
    await uploadSitemap(supabaseAdmin, 'sitemap-main.xml', mainSitemap);
    generatedFiles.push('sitemap-main.xml');
    console.log('Generated sitemap-main.xml');

    // Generate product sitemaps
    const { count } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('in_stock', true);

    const totalProducts = count || 0;
    const productSitemapCount = Math.ceil(totalProducts / PRODUCTS_PER_SITEMAP);

    for (let page = 1; page <= productSitemapCount; page++) {
      const productSitemap = await generateProductSitemap(supabaseAdmin, page, now);
      const filename = `sitemap-products-${page}.xml`;
      await uploadSitemap(supabaseAdmin, filename, productSitemap);
      generatedFiles.push(filename);
      console.log(`Generated ${filename}`);
    }

    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex(productSitemapCount, now);
    await uploadSitemap(supabaseAdmin, 'sitemap.xml', sitemapIndex);
    generatedFiles.push('sitemap.xml');
    console.log('Generated sitemap.xml (index)');

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${generatedFiles.length} sitemap files`,
        files: generatedFiles,
        timestamp: now
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function uploadSitemap(supabase: any, filename: string, content: string) {
  const { error } = await supabase.storage
    .from('sitemaps')
    .upload(filename, content, {
      contentType: 'application/xml',
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${filename}:`, error);
    throw error;
  }
}

function generateSitemapIndex(productSitemapCount: number, lastmod: string): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${ORIGIN}/sitemap-main.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;

  for (let i = 1; i <= productSitemapCount; i++) {
    xml += `
  <sitemap>
    <loc>${ORIGIN}/sitemap-products-${i}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
  }

  xml += `
</sitemapindex>`;
  return xml;
}

async function generateMainSitemap(supabase: any, lastmod: string): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/om', priority: '0.8', changefreq: 'monthly' },
    { url: '/e-nummer', priority: '0.9', changefreq: 'weekly' },
    { url: '/e-nummer/scanner', priority: '0.9', changefreq: 'weekly' },
    { url: '/livsmedel', priority: '0.9', changefreq: 'weekly' },
    { url: '/handla', priority: '0.9', changefreq: 'daily' },
  ];

  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${ORIGIN}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // E-additives
  const { data: eAdditives } = await supabase
    .from('e_additives')
    .select('slug, updated_at')
    .eq('is_published', true)
    .order('e_number');

  if (eAdditives) {
    eAdditives.forEach((item: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/e-nummer/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  }

  // Foods
  const { data: foods } = await supabase
    .from('foods')
    .select('slug, updated_at')
    .order('name');

  if (foods) {
    foods.forEach((item: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/livsmedel/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  }

  // Public lists
  const { data: lists } = await supabase
    .from('public_lists')
    .select('slug, updated_at')
    .eq('is_public', true)
    .order('title');

  if (lists) {
    lists.forEach((item: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/listor/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }

  // Stores
  const { data: stores } = await supabase
    .from('stores')
    .select('slug, updated_at')
    .eq('is_active', true)
    .order('name');

  if (stores) {
    stores.forEach((item: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/handla/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  }

  // Product categories
  const { data: categories } = await supabase
    .from('product_categories')
    .select('slug, updated_at')
    .order('name');

  if (categories) {
    categories.forEach((item: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/handla/kategori/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  }

  xml += `
</urlset>`;
  return xml;
}

async function generateProductSitemap(supabase: any, page: number, lastmod: string): Promise<string> {
  const offset = (page - 1) * PRODUCTS_PER_SITEMAP;

  const { data: products } = await supabase
    .from('products')
    .select('slug, store_id, last_updated, stores(slug)')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + PRODUCTS_PER_SITEMAP - 1);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  if (products) {
    products.forEach((product: any) => {
      xml += `
  <url>
    <loc>${ORIGIN}/handla/${product.stores.slug}/${product.slug}</loc>
    <lastmod>${product.last_updated || lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }

  xml += `
</urlset>`;
  return xml;
}
