import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Delitea store ID
    const { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('slug', 'delitea')
      .single();

    if (!store) {
      throw new Error('Delitea store not found');
    }

    console.log('Updating Delitea products to in_stock = true...');

    // Update all Delitea products to in_stock = true
    const { data, error } = await supabase
      .from('products')
      .update({ 
        in_stock: true,
        last_updated: new Date().toISOString()
      })
      .eq('store_id', store.id)
      .select('id');

    if (error) {
      console.error('Error updating products:', error);
      throw error;
    }

    const updatedCount = data?.length || 0;
    console.log(`Successfully updated ${updatedCount} products`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        updatedCount,
        message: `Updated ${updatedCount} Delitea products to in_stock = true`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in update-delitea-stock function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
