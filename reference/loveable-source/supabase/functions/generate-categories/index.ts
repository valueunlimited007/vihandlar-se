import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function slugify(text: string): string {
  if (!text || text.trim().length === 0) {
    console.warn('Empty text provided to slugify');
    return 'category';
  }
  
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[åä]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Handle edge case where slug becomes empty after processing
  if (slug.length === 0) {
    console.warn(`Slug became empty after processing text: "${text}"`);
    return 'category';
  }
  
  // Limit slug length for database and URL constraints
  if (slug.length > 100) {
    console.warn(`Slug too long (${slug.length} chars), truncating: "${slug}"`);
    return slug.substring(0, 100).replace(/-+$/, '');
  }
  
  return slug;
}

function generateUniqueSlug(
  baseName: string, 
  parts: string[], 
  slugMap: Map<string, number>
): string {
  // Try base name first
  let slug = slugify(baseName);
  
  if (!slugMap.has(slug)) {
    return slug;
  }
  
  console.log(`Slug collision detected for "${baseName}": "${slug}"`);
  
  // Try with parent category
  if (parts.length >= 2) {
    const parentName = parts[parts.length - 2];
    slug = slugify(`${parentName}-${baseName}`);
    
    if (!slugMap.has(slug)) {
      console.log(`Resolved collision with parent: "${slug}"`);
      return slug;
    }
  }
  
  // Try with grandparent
  if (parts.length >= 3) {
    slug = slugify(parts.slice(-3).join('-'));
    
    if (!slugMap.has(slug)) {
      console.log(`Resolved collision with grandparent: "${slug}"`);
      return slug;
    }
  }
  
  // Last resort: append counter
  const counter = slugMap.get(slug) || 1;
  const uniqueSlug = `${slug}-${counter}`;
  console.log(`Using counter for uniqueness: "${uniqueSlug}"`);
  
  return uniqueSlug;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting category generation...');

    // Hämta alla unika kategorier från products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('category')
      .eq('in_stock', true)
      .not('category', 'is', null);

    if (productsError) throw productsError;

    // Räkna produkter per kategori
    const categoryCounts = new Map<string, number>();
    products?.forEach(p => {
      if (p.category) {
        categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
      }
    });

    console.log(`Found ${categoryCounts.size} unique categories`);

    // Parsa kategorier - extrahera det sista namnet (behåll å,ä,ö)
    const categoriesToInsert = [];
    const slugMap = new Map<string, number>(); // Track slug usage for collision detection
    const skippedCategories: string[] = [];
    
    for (const [categoryStr, count] of categoryCounts.entries()) {
      try {
        // Validera kategori-sträng
        if (!categoryStr || categoryStr.trim().length === 0) {
          console.warn('Skipping empty category string');
          skippedCategories.push('(empty)');
          continue;
        }
        
        // Dela upp kategori-strängen: "bakning-mjol-och-gryn - mjol - Mjöl"
        const parts = categoryStr.split(' - ').map(s => s.trim()).filter(s => s.length > 0);
        
        if (parts.length === 0) {
          console.warn(`Skipping category with no valid parts: "${categoryStr}"`);
          skippedCategories.push(categoryStr);
          continue;
        }
        
        const actualName = parts[parts.length - 1]; // "Mjöl" (med ö!)
        
        // Validera kategorinamn
        if (actualName.length > 255) {
          console.warn(`Category name too long (${actualName.length} chars): "${actualName.substring(0, 50)}..."`);
          skippedCategories.push(categoryStr);
          continue;
        }
        
        // Generera unik slug med förbättrad kollisionshantering
        const slug = generateUniqueSlug(actualName, parts, slugMap);
        
        // Markera slug som använd
        slugMap.set(slug, (slugMap.get(slug) || 0) + 1);
        
        categoriesToInsert.push({
          name: actualName,  // ✅ "Mjöl" (original med å,ä,ö)
          slug: slug,        // ✅ "mjol" eller "bakning-mjol" (kort, unik och läsbar!)
          category_path: categoryStr, // ✅ Hela strängen för matchning
          parent_id: null,
          product_count: count,
          description: `Produkter inom ${actualName.toLowerCase()}.`,
          seo_title: `Handla ${actualName} Online - ${count}+ produkter | Vihandlar.se`,
          seo_description: `Jämför priser på ${count}+ ${actualName.toLowerCase()}-produkter från flera butiker. Snabb leverans direkt hem.`,
        });
      } catch (error) {
        console.error(`Error processing category "${categoryStr}":`, error);
        skippedCategories.push(categoryStr);
      }
    }
    
    if (skippedCategories.length > 0) {
      console.warn(`Skipped ${skippedCategories.length} invalid categories:`, skippedCategories);
    }

    console.log(`Prepared ${categoriesToInsert.length} categories to insert`);

    // Rensa gamla kategorier först
    const { error: deleteError } = await supabase
      .from('product_categories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) console.error('Error deleting old categories:', deleteError);

    // Infoga alla kategorier
    if (categoriesToInsert.length > 0) {
      const { data: insertedCategories, error: insertError } = await supabase
        .from('product_categories')
        .insert(categoriesToInsert)
        .select();

      if (insertError) throw insertError;
      console.log(`Inserted ${insertedCategories?.length} categories`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${categoriesToInsert.length} categories`,
        categories: categoriesToInsert.length,
        skipped: skippedCategories.length,
        uniqueSlugs: slugMap.size,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error generating categories:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
