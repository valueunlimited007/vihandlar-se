import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ORIGIN = "https://vihandlar.se";
const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Vary": "Origin",
};

const BUCKET_MS = 5 * 60 * 1000;

function getBucketDate(now = Date.now()) {
  const bucketStart = Math.floor(now / BUCKET_MS) * BUCKET_MS;
  return new Date(bucketStart);
}

async function hashETag(input: unknown) {
  const enc = new TextEncoder();
  const data = enc.encode(typeof input === "string" ? input : JSON.stringify(input));
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `W/"${hashHex}"`;
}

function withBaseHeaders(init: ResponseInit = {}, contentType = "application/xml; charset=utf-8") {
  return {
    ...init,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300, must-revalidate",
      ...corsHeaders,
      ...(init.headers || {}),
    },
  } satisfies ResponseInit;
}

function buildLinkHeader(self: string) {
  return [
    `<${ORIGIN}/llms.txt>; rel="policy llms"; type="text/plain"`,
    `<https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/sitemap>; rel="sitemap"`,
    `<${ORIGIN}/robots.txt>; rel="robots"`,
    `<${ORIGIN}/.well-known/security.txt>; rel="security"`,
    `<${self}>; rel="self canonical"`
  ].join(", ");
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get sitemap type from URL query parameter
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "main";

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  const bucketDate = getBucketDate();
  const lastModified = bucketDate.toUTCString();
  const linkHeader = buildLinkHeader(`https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/sitemap`);

  try {
    // Fetch public lists for dynamic routes
    const { data: lists, error: listsError } = await supabase
      .from("public_lists")
      .select("slug, updated_at")
      .eq("is_public", true)
      .order("updated_at", { ascending: false });

    if (listsError) throw listsError;

    // Fetch E-additives for dynamic routes
    const { data: eAdditives, error: eAdditivesError } = await supabase
      .from("e_additives")
      .select("slug, e_number, category, updated_at")
      .order("e_number");

    if (eAdditivesError) throw eAdditivesError;

    // Get unique E-additive categories
    const eAdditiveCategories = [...new Set((eAdditives || []).map(item => item.category))];

    // Fetch foods for dynamic routes
    const { data: foods, error: foodsError } = await supabase
      .from("foods")
      .select("slug, letter, updated_at")
      .order("name");

    if (foodsError) throw foodsError;

    // Get unique food letters
    const foodLetters = [...new Set((foods || []).map(item => item.letter))].sort();

    // Fetch product categories
    const { data: productCategories, error: categoriesError } = await supabase
      .from("product_categories")
      .select("slug, updated_at")
      .order("name");

    if (categoriesError) throw categoriesError;

    // Handle product sitemaps with pagination
    let products = [];
    if (type.startsWith("products-")) {
      const pageNum = parseInt(type.split("-")[1]) || 1;
      const PRODUCTS_PER_PAGE = 1000;
      const offset = (pageNum - 1) * PRODUCTS_PER_PAGE;
      
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("slug, last_updated, stores(slug)")
        .eq("in_stock", true)
        .order("name")
        .range(offset, offset + PRODUCTS_PER_PAGE - 1);

      if (productsError) throw productsError;
      products = productsData || [];
      console.log(`Sitemap ${type}: Fetched ${products.length} products (offset ${offset})`);
    }

    // Fetch stores
    const { data: stores, error: storesError } = await supabase
      .from("stores")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("name");

    if (storesError) throw storesError;

    const now = new Date().toISOString();

    // Build sitemap content
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Only include static pages and main content in "main" sitemap
    if (type === "main") {
      // Add static pages
      const staticPages = [
        { path: "/", priority: "1.0", changefreq: "daily" },
        { path: "/om", priority: "0.8", changefreq: "monthly" },
        { path: "/funktioner", priority: "0.8", changefreq: "monthly" },
        { path: "/integritetspolicy", priority: "0.3", changefreq: "yearly" },
        { path: "/kallor", priority: "0.5", changefreq: "monthly" },
        { path: "/sajtkarta", priority: "0.5", changefreq: "weekly" },
        { path: "/e-amnen", priority: "0.9", changefreq: "weekly" },
        { path: "/e-amnen/guide", priority: "0.8", changefreq: "monthly" },
        { path: "/e-amnen/alla", priority: "0.8", changefreq: "weekly" },
        { path: "/e-amnen/kategori", priority: "0.7", changefreq: "weekly" },
        { path: "/e-amnen/scanner", priority: "0.8", changefreq: "monthly" },
        { path: "/livsmedel", priority: "0.8", changefreq: "weekly" },
        { path: "/livsmedel/kategori", priority: "0.7", changefreq: "weekly" },
        { path: "/produkter", priority: "0.9", changefreq: "daily" },
        { path: "/produkter/kategori", priority: "0.8", changefreq: "daily" },
        { path: "/inkopslista", priority: "0.7", changefreq: "monthly" },
        { path: "/listor", priority: "0.6", changefreq: "weekly" },
      ];

      staticPages.forEach((page) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      });

      // Add public list pages
      lists?.forEach((list) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/lista/${list.slug}</loc>
    <lastmod>${list.updated_at || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      // Add product category pages
      productCategories?.forEach((cat) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/produkter/kategori/${cat.slug}</loc>
    <lastmod>${cat.updated_at || now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      // Add store pages
      stores?.forEach((store) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/butik/${store.slug}</loc>
    <lastmod>${store.updated_at || now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      // Add product letter pages
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");
      letters.forEach((letter) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/produkter/bokstav/${letter.toLowerCase()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      // Add E-additive pages
      eAdditives?.forEach((additive) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/e-amne/${additive.slug}</loc>
    <lastmod>${additive.updated_at || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      // Add E-additive category pages
      eAdditiveCategories.forEach((category) => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
        sitemap += `
  <url>
    <loc>${ORIGIN}/e-amnen/kategori/${categorySlug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      // Add food pages
      foods?.forEach((food) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/livsmedel/${food.slug}</loc>
    <lastmod>${food.updated_at || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      // Add food letter pages
      foodLetters.forEach((letter) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/livsmedel/bokstav/${letter.toLowerCase()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
      });
    }

    // Add product pages (only for product-specific sitemaps)
    if (type.startsWith("products-")) {
      products?.forEach((product) => {
        sitemap += `
  <url>
    <loc>${ORIGIN}/shopping/${product.stores.slug}/${product.slug}</loc>
    <lastmod>${product.last_updated || now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    sitemap += `
</urlset>`;

    const etag = await hashETag(`${type}-${bucketDate.toISOString()}`);

    return new Response(sitemap, withBaseHeaders({
      headers: {
        "ETag": etag,
        "Last-Modified": lastModified,
        "Link": linkHeader,
      },
    }));

  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${ORIGIN}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, withBaseHeaders({ status: 500 }));
  }
});
