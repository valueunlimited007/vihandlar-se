import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { XMLParser } from "https://esm.sh/fast-xml-parser@4.3.2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { storeSlug } = await req.json()
    
    if (!storeSlug) {
      throw new Error('storeSlug is required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Get store config
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('slug', storeSlug)
      .single()
    
    if (storeError || !store) {
      throw new Error(`Store not found: ${storeSlug}`)
    }
    
    console.log(`Importing products for store: ${store.name}`)
    
    // Fetch feed with appropriate headers
    console.log(`Fetching feed from: ${store.feed_url}`)
    const response = await fetch(store.feed_url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ProductImporter/1.0)',
        'Accept': 'application/xml, text/xml, application/rss+xml, */*'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`)
    }
    
    const contentType = response.headers.get('content-type')
    console.log(`Response Content-Type: ${contentType}`)
    
    const xmlText = await response.text()
    console.log(`Feed size: ${xmlText.length} bytes`)
    console.log(`First 500 chars: ${xmlText.substring(0, 500)}`)
    
    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    })
    const parsed = parser.parse(xmlText)
    
    // Support both RSS-style and product feed formats
    const items = parsed?.rss?.channel?.item || 
                  parsed?.products?.product || 
                  parsed?.product || 
                  []
    
    const itemsArray = Array.isArray(items) ? items : [items]
    
    if (itemsArray.length === 0) {
      console.error('Feed appears to be HTML instead of XML')
      console.error('Parsed structure:', JSON.stringify(parsed, null, 2).substring(0, 1000))
      throw new Error('No products found in feed - feed may require authentication or special access')
    }
    
    console.log(`Found ${itemsArray.length} products in feed`)
    
    const products = []
    
    for (const item of itemsArray) {
      const getText = (key: string) => {
        const keys = key.split(', ')
        for (const k of keys) {
          if (item[k]) return String(item[k]).trim()
        }
        return ""
      }
      
      const getNumber = (key: string) => {
        const val = getText(key)
        return val ? parseFloat(val.replace(',', '.')) : null
      }
      
      const name = getText("title, name")
      if (!name) continue
      
      // Generate unique slug: product-name-storeslug
      const baseSlug = name.toLowerCase()
        .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 80)
      
      const slug = `${baseSlug}-${store.slug}`
      
      const productId = getText("productId, id, sku, guid") || getText("link, url")
      if (!productId) continue
      
      products.push({
        store_id: store.id,
        product_id: productId,
        name: name,
        description: getText("description, desc"),
        price: getNumber("price") || 0,
        original_price: getNumber("originalPrice, regularPrice"),
        currency: getText("currency") || "SEK",
        brand: getText("brand, manufacturer"),
        category: getText("category, categoryName"),
        image_url: getText("imageUrl, image, imageLink"),
        product_url: getText("productUrl, link, url"),
        ean: getText("ean, gtin, gtin13"),
        in_stock: getText("inStock, availability") !== "false",
        shipping_cost: getNumber("shippingCost, shipping"),
        slug: slug,
        last_updated: new Date().toISOString()
      })
    }
    
    console.log(`Prepared ${products.length} products for upsert`)
    
    // Batch upsert in chunks of 500
    let imported = 0
    const chunkSize = 500
    
    for (let i = 0; i < products.length; i += chunkSize) {
      const chunk = products.slice(i, i + chunkSize)
      const { error: upsertError } = await supabase
        .from('products')
        .upsert(chunk, { 
          onConflict: 'store_id,product_id',
          ignoreDuplicates: false 
        })
      
      if (upsertError) {
        console.error(`Error upserting chunk ${i}-${i+chunkSize}:`, upsertError)
        throw upsertError
      }
      
      imported += chunk.length
      console.log(`Imported ${imported}/${products.length} products`)
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        store: store.name,
        imported: products.length,
        message: `Successfully imported ${products.length} products for ${store.name}`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error('Import error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
