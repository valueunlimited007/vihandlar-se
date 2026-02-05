import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { filename } = await req.json();
    
    if (!filename) {
      throw new Error('Filename is required');
    }

    console.log(`Downloading sitemap file: ${filename}`);

    // Download the file from storage
    const { data, error } = await supabase.storage
      .from('sitemaps')
      .download(filename);

    if (error) {
      console.error('Error downloading file:', error);
      throw error;
    }

    // Convert blob to text
    const content = await data.text();

    return new Response(
      JSON.stringify({ 
        filename,
        content,
        url: `https://giznqbjxcxllmgamxgaa.supabase.co/storage/v1/object/public/sitemaps/${filename}`
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in download-sitemaps function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
