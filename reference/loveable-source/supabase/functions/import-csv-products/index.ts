import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Normalize string for slug generation
function normalizeSlug(str: string, maxLength: number = 50): string {
  return str
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength);
}

// Generate unique product slug
function generateProductSlug(productName: string, storeSlug: string): string {
  const normalized = normalizeSlug(productName, 80);
  return `${normalized}-${storeSlug}`.substring(0, 100);
}

// Parse CSV line with tab delimiter and single quote text delimiter
function parseCSVLine(line: string): string[] {
  const columns: string[] = [];
  let current = '';
  let inQuote = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === "'" && (i === 0 || line[i - 1] !== '\\')) {
      inQuote = !inQuote;
    } else if (char === '\t' && !inQuote) {
      columns.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current) {
    columns.push(current.trim());
  }
  
  return columns;
}

// Batch insert products
async function insertProductBatch(
  supabase: any,
  products: any[],
  storeId: string
) {
  if (products.length === 0) return { imported: 0, updated: 0, errors: 0 };

  const { data, error } = await supabase
    .from('products')
    .upsert(products, {
      onConflict: 'store_id,product_id',
      ignoreDuplicates: false
    })
    .select('id');

  if (error) {
    console.error('Batch insert error:', error);
    return { imported: 0, updated: 0, errors: products.length };
  }

  return { 
    imported: data?.length || 0, 
    updated: 0, 
    errors: 0 
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { storeSlug, offset = 0, limit = 15000 } = await req.json();

    if (!storeSlug) {
      throw new Error('storeSlug is required');
    }

    console.log(`[IMPORT START] Store: ${storeSlug}, Offset: ${offset}, Limit: ${limit}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch store configuration
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('slug', storeSlug)
      .eq('is_active', true)
      .single();

    if (storeError || !store) {
      throw new Error(`Store not found: ${storeSlug}`);
    }

    console.log(`[STORE] ${store.name}, Feed: ${store.feed_url}`);

    // Fetch CSV feed
    console.log(`[FEED FETCH] Starting download...`);
    const response = await fetch(store.feed_url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ProductImporter/1.0)',
        'Accept': 'text/csv, text/plain, */*'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split('\n');
    const totalLinesInFeed = lines.length - 1; // Minus header
    console.log(`[FEED STATS] Total lines: ${lines.length}, Feed size: ${csvText.length} bytes, Products in feed: ${totalLinesInFeed}`);

    let productBatch: any[] = [];
    let processed = 0;
    let skipped = 0;
    let emptyLines = 0;
    let invalidFormat = 0;
    let missingFields = 0;
    let invalidPrice = 0;
    let totalImported = 0;
    let totalUpdated = 0;
    let totalErrors = 0;

    // Skip header and apply offset/limit
    const startLine = 1 + offset; // Skip header
    const endLine = Math.min(startLine + limit, lines.length);

    console.log(`[PROCESSING] Lines ${startLine} to ${endLine} of ${lines.length}`);

    for (let i = startLine; i < endLine; i++) {
      const line = lines[i].trim();
      if (!line) {
        emptyLines++;
        skipped++;
        continue;
      }

      try {
        const columns = parseCSVLine(line);

        // CSV Column mapping (Adtraction format):
        // [0] SKU, [1] Name, [2] Description, [3] Category, [4] Price,
        // [5] Shipping, [6] Currency, [7] Instock, [8] ProductUrl,
        // [9] ImageUrl, [10] TrackingUrl (ignore), [11] Brand,
        // [12] OriginalPrice, [13] Ean, [14] ManufacturerArticleNumber, [15] Extras

        if (columns.length < 9) {
          invalidFormat++;
          skipped++;
          continue;
        }

        const sku = columns[0];
        const name = columns[1];
        const description = columns[2] || null;
        const category = columns[3] || null;
        const priceStr = columns[4];
        const shippingStr = columns[5] || '0';
        const currency = columns[6] || 'SEK';
        const inStockStr = columns[7] || 'true';
        const productUrl = columns[8];
        const imageUrl = columns[9] || null;
        const brand = columns[11] || null;
        const originalPriceStr = columns[12] || null;
        const ean = columns[13] || null;

        // Validate required fields
        if (!sku || !name || !productUrl) {
          missingFields++;
          skipped++;
          continue;
        }

        // Parse price
        const price = parseFloat(priceStr?.replace(',', '.') || '0');
        if (isNaN(price) || price <= 0) {
          invalidPrice++;
          skipped++;
          continue;
        }

        // Parse other numeric fields
        const shipping = parseFloat(shippingStr?.replace(',', '.') || '0');
        const originalPrice = originalPriceStr ? parseFloat(originalPriceStr.replace(',', '.')) : null;
        
        // Default to true if value is missing or empty
        // Most affiliate feeds only include in-stock products
        const inStock = !inStockStr || 
                        inStockStr === '' || 
                        inStockStr === '1' || 
                        inStockStr.toLowerCase() === 'true' ||
                        inStockStr.toLowerCase() === 'yes' ||
                        inStockStr.toLowerCase() === 'ja';

        // Generate slug
        const slug = generateProductSlug(name, store.slug);

        // Build affiliate tracking URL from template
        const affiliateConfig = store.affiliate_config as any;
        const trackingBase = affiliateConfig?.trackingBase || '';
        const productUrlEncoded = encodeURIComponent(productUrl);
        const affiliateTrackingUrl = trackingBase ? `${trackingBase}&url=${productUrlEncoded}` : productUrl;

        // Add to batch
        productBatch.push({
          store_id: store.id,
          product_id: sku,
          name,
          slug,
          description,
          price,
          original_price: originalPrice,
          shipping_cost: shipping > 0 ? shipping : null,
          currency,
          in_stock: inStock,
          product_url: affiliateTrackingUrl,
          image_url: imageUrl,
          brand,
          category,
          ean,
          last_updated: new Date().toISOString()
        });

        processed++;

        // Insert batch when it reaches 500 products (increased from 300)
        if (productBatch.length >= 500) {
          const batchNumber = Math.ceil(processed / 500);
          const result = await insertProductBatch(supabase, productBatch, store.id);
          totalImported += result.imported;
          totalUpdated += result.updated;
          totalErrors += result.errors;
          console.log(`[BATCH ${batchNumber}] Imported: ${result.imported}, Errors: ${result.errors}`);
          productBatch = [];
        }
      } catch (error) {
        console.error(`[ERROR Line ${i}]`, error.message);
        skipped++;
      }
    }

    // Insert remaining products
    if (productBatch.length > 0) {
      const result = await insertProductBatch(supabase, productBatch, store.id);
      totalImported += result.imported;
      totalUpdated += result.updated;
      totalErrors += result.errors;
      console.log(`[FINAL BATCH] Imported: ${result.imported}, Errors: ${result.errors}`);
    }

    const executionTime = Date.now() - startTime;
    console.log(`[IMPORT COMPLETE] Time: ${executionTime}ms`);
    console.log(`[SUMMARY] Processed: ${processed}, Imported: ${totalImported}, Errors: ${totalErrors}, Skipped: ${skipped}`);
    console.log(`[SKIP REASONS] Empty: ${emptyLines}, Invalid format: ${invalidFormat}, Missing fields: ${missingFields}, Invalid price: ${invalidPrice}`);

    const summary = {
      success: true,
      store: store.name,
      offset,
      limit,
      processed,
      skipped,
      imported: totalImported,
      updated: totalUpdated,
      errors: totalErrors,
      executionTime,
      totalProductsInFeed: totalLinesInFeed,
      skipReasons: {
        emptyLines,
        invalidFormat,
        missingFields,
        invalidPrice
      }
    };

    console.log('[SUMMARY JSON]', JSON.stringify(summary));

    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`[FATAL ERROR] Import failed after ${executionTime}ms:`, error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        executionTime
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
