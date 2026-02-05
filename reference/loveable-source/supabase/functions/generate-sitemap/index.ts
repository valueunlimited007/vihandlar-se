import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting sitemap generation...');

    // Fetch all data
    const [publicListsResult, eAdditivesResult, foodsResult, categoriesResult, lettersResult, productCategoriesResult, productsResult] = await Promise.all([
      supabase.from('public_lists').select('slug, updated_at').eq('is_public', true),
      supabase.from('e_additives').select('slug, updated_at').order('e_number'),
      supabase.from('foods').select('letter, slug, updated_at').order('letter, slug'),
      supabase.from('e_additives').select('category').neq('category', null),
      supabase.from('foods').select('letter').order('letter'),
      supabase.from('product_categories').select('slug, updated_at'),
      supabase.from('products').select('name').eq('in_stock', true).limit(1000)
    ]);

    if (publicListsResult.error) throw publicListsResult.error;
    if (eAdditivesResult.error) throw eAdditivesResult.error;
    if (foodsResult.error) throw foodsResult.error;
    if (categoriesResult.error) throw categoriesResult.error;
    if (lettersResult.error) throw lettersResult.error;
    if (productCategoriesResult.error) console.error('Product categories error:', productCategoriesResult.error);
    if (productsResult.error) console.error('Products error:', productsResult.error);

    const publicLists = publicListsResult.data || [];
    const eAdditives = eAdditivesResult.data || [];
    const foods = foodsResult.data || [];
    const uniqueCategories = [...new Set(categoriesResult.data?.map(c => c.category).filter(Boolean) || [])];
    const uniqueLetters = [...new Set(lettersResult.data?.map(f => f.letter).filter(Boolean) || [])];
    const productCategories = productCategoriesResult.data || [];
    const productLetters = [...new Set(productsResult.data?.map(p => p.name.charAt(0).toUpperCase()).filter(Boolean) || [])];

    console.log(`Found: ${publicLists.length} lists, ${eAdditives.length} e-additives, ${foods.length} foods, ${uniqueCategories.length} categories, ${uniqueLetters.length} letters, ${productCategories.length} product categories, ${productLetters.length} product letters`);

    // Generate sitemap XML
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages (12) -->
  <url>
    <loc>https://vihandlar.se/</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/funktioner</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/inkopslista</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/om</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/integritet</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/e-amnen</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/e-amnen/guide</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/e-amnen/alla</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/livsmedel</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/listor</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/sources</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/sitemap</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

`;

    // Add E-additive individual pages
    sitemapContent += `  <!-- E-additive individual pages (${eAdditives.length}) -->\n`;
    for (const eAdditive of eAdditives) {
      const lastmod = new Date(eAdditive.updated_at).toISOString();
      sitemapContent += `  <url>
    <loc>https://vihandlar.se/e-amnen/${eAdditive.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    // Add E-additive category pages
    sitemapContent += `\n  <!-- E-additive category pages (${uniqueCategories.length}) -->\n`;
    for (const category of uniqueCategories) {
      const categorySlug = slugify(category);
      sitemapContent += `  <url>
    <loc>https://vihandlar.se/e-amnen/kategori/${categorySlug}</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    // Add food letter pages
    sitemapContent += `\n  <!-- Food letter pages (${uniqueLetters.length}) -->\n`;
    for (const letter of uniqueLetters) {
      const letterSlug = letter.toLowerCase().replace('ä', 'a').replace('ö', 'o');
      sitemapContent += `  <url>
    <loc>https://vihandlar.se/livsmedel/${letterSlug}</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    // Add food individual pages
    sitemapContent += `\n  <!-- Food individual pages (${foods.length}) -->\n`;
    for (const food of foods) {
      const letterSlug = food.letter.toLowerCase().replace('ä', 'a').replace('ö', 'o');
      const lastmod = new Date(food.updated_at).toISOString();
      sitemapContent += `  <url>
    <loc>https://vihandlar.se/livsmedel/${letterSlug}/${food.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    // Add public list pages
    sitemapContent += `\n  <!-- Public list pages (${publicLists.length}) -->\n`;
    for (const list of publicLists) {
      const lastmod = new Date(list.updated_at).toISOString();
      sitemapContent += `  <url>
    <loc>https://vihandlar.se/listor/${list.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    sitemapContent += `\n  <!-- API endpoints (2) -->
  <url>
    <loc>https://vihandlar.se/api/lists</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://vihandlar.se/api/health</loc>
    <lastmod>2025-09-15T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Product Browse Pages (${productLetters.length + 1}) -->
  <url>
    <loc>https://vihandlar.se/shopping/produkter</loc>
    <lastmod>2025-01-16T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${productLetters.map(letter => `  <url>
    <loc>https://vihandlar.se/shopping/produkter/${letter.toLowerCase()}</loc>
    <lastmod>2025-01-16T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
  
  <!-- Product Categories (${productCategories.length + 1}) -->
  <url>
    <loc>https://vihandlar.se/shopping/kategorier</loc>
    <lastmod>2025-01-16T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${productCategories.map(cat => `  <url>
    <loc>https://vihandlar.se/shopping/kategori/${cat.slug}</loc>
    <lastmod>${cat.updated_at}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    const totalPages = 12 + eAdditives.length + uniqueCategories.length + uniqueLetters.length + foods.length + publicLists.length + 2 + (productLetters.length + 1) + (productCategories.length + 1);
    
    console.log(`Generated sitemap with ${totalPages} total pages`);
    console.log(`Breakdown: 12 static + ${eAdditives.length} e-additives + ${uniqueCategories.length} e-categories + ${uniqueLetters.length} food-letters + ${foods.length} foods + ${publicLists.length} lists + 2 api + ${productLetters.length + 1} product-letters + ${productCategories.length + 1} product-categories = ${totalPages}`);

    return new Response(sitemapContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' } 
    });
  }
});