const ORIGIN = "https://vihandlar.se";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Calculate number of product sitemap files needed
    // 7246 products / 1000 per file = 8 files
    const PRODUCTS_PER_SITEMAP = 1000;
    const TOTAL_PRODUCTS = 7246;
    const PRODUCT_SITEMAP_COUNT = Math.ceil(TOTAL_PRODUCTS / PRODUCTS_PER_SITEMAP);

    const now = new Date().toISOString();

    // Build sitemap index XML
    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${ORIGIN}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;

    // Add product sitemap files
    for (let i = 1; i <= PRODUCT_SITEMAP_COUNT; i++) {
      sitemapIndex += `
  <sitemap>
    <loc>${ORIGIN}/sitemap-products-${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
    }

    sitemapIndex += `
</sitemapindex>`;

    console.log(`Sitemap Index: Generated with ${PRODUCT_SITEMAP_COUNT} product sitemaps`);

    return new Response(sitemapIndex, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "CDN-Cache-Control": "public, max-age=3600",
        "Vercel-CDN-Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${ORIGIN}/sitemap-main.xml</loc>
  </sitemap>
</sitemapindex>`,
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/xml; charset=utf-8",
        },
      }
    );
  }
});
