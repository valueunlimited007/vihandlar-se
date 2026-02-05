import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EAdditive {
  id: string;
  e_number: string;
  name: string;
  common_name: string | null;
  slug: string;
  category: string;
  risk_score: number | null;
  short_description: string | null;
  adi_value: number | null;
  children_note: string | null;
}

interface ScanResult {
  found_e_numbers: string[];
  e_additives_data: EAdditive[];
  risk_summary: {
    high_risk: number;
    medium_risk: number;
    low_risk: number;
    total: number;
  };
  overall_assessment: string;
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

function extractENumbers(text: string): string[] {
  console.log('Extracting E-numbers from text:', text.substring(0, 200));
  
  // Multiple regex patterns to catch different E-number formats
  const patterns = [
    /E\s*\d{3}[a-z]*/gi,  // E123, E 123, E123a
    /E\s*\d{4}[a-z]*/gi,  // E1234, E 1234
    /\bE\d{3}[a-z]*\b/gi, // Word boundary E123
  ];
  
  const foundNumbers = new Set<string>();
  
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // Normalize: remove spaces, convert to uppercase
        const normalized = match.replace(/\s/g, '').toUpperCase();
        foundNumbers.add(normalized);
      });
    }
  });
  
  const result = Array.from(foundNumbers);
  console.log('Found E-numbers:', result);
  return result;
}


async function performOCR(imageBase64: string): Promise<string> {
  console.log('🔍 Starting OCR processing...');
  
  // Get Google Cloud Vision API key from Supabase secrets
  const apiKey = Deno.env.get('GOOGLE_VISION_API_KEY');
  
  if (!apiKey) {
    console.error('❌ CRITICAL: GOOGLE_VISION_API_KEY environment variable not found!');
    console.log('Please add the Google Cloud Vision API key as a Supabase secret.');
    throw new Error('Google Cloud Vision API key not configured');
  }
  
  // Enhanced API key validation
  console.log('✅ API key found, length:', apiKey.length);
  console.log('🔑 API key format check:', apiKey.substring(0, 15) + '...' + apiKey.substring(-10));
  console.log('🔑 API key type check:', typeof apiKey);
  console.log('🔑 API key starts with AIza:', apiKey.startsWith('AIza'));
  
  // Validate API key format
  if (!apiKey.startsWith('AIza') && !apiKey.startsWith('GOOG')) {
    console.error('❌ API key format invalid - should start with AIza or GOOG');
    throw new Error('Invalid Google Cloud Vision API key format');
  }
  
  if (apiKey.length < 35 || apiKey.length > 45) {
    console.error('❌ API key length invalid - should be 35-45 characters');
    throw new Error('Invalid Google Cloud Vision API key length');
  }
  
  // Retry logic with exponential backoff
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🚀 Attempt ${attempt}/${maxRetries}: Calling Google Vision API...`);
      
      const requestBody = {
        requests: [
          {
            image: {
              content: imageBase64,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 1,
              },
            ],
          },
        ],
      };
      
      console.log('📦 Request payload size:', JSON.stringify(requestBody).length, 'bytes');
      console.log('📦 Image data size:', imageBase64.length, 'characters');
      
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log(`📡 Vision API response - Status: ${response.status}, Headers:`, Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Vision API error (attempt ${attempt}):`, errorText);
        
        let errorMessage = '';
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error?.message) {
            errorMessage = errorJson.error.message;
          }
          console.log('🔍 Parsed error details:', errorJson);
        } catch {
          errorMessage = errorText;
        }
        
        // Handle specific error codes
        if (response.status === 403) {
          if (errorMessage.includes('API key')) {
            throw new Error('Vision API key is invalid or has no permissions. Check Google Cloud Console.');
          }
          throw new Error('Vision API access denied. Enable the Vision API in Google Cloud Console.');
        } else if (response.status === 400) {
          if (errorMessage.includes('API key')) {
            throw new Error('Invalid API key format or the key is restricted.');
          }
          throw new Error('Bad request to Vision API. Check image format and size.');
        } else if (response.status === 401) {
          throw new Error('Vision API authentication failed. Check your API key.');
        } else if (response.status === 429) {
          // Rate limit - retry with backoff
          if (attempt < maxRetries) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log(`⏳ Rate limited, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          throw new Error('Vision API rate limit exceeded. Try again later.');
        }
        
        throw new Error(`Vision API request failed: ${response.status} ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();
      console.log('📥 Google Vision API response received successfully');
      console.log('🔍 Response structure:', {
        hasResponses: !!data.responses,
        responseCount: data.responses?.length || 0,
        hasTextAnnotations: !!data.responses?.[0]?.textAnnotations,
        textAnnotationsCount: data.responses?.[0]?.textAnnotations?.length || 0
      });
      
      if (data.responses?.[0]?.error) {
        console.error('❌ Vision API returned error:', data.responses[0].error);
        throw new Error(`Vision API error: ${data.responses[0].error.message}`);
      }
      
      if (data.responses?.[0]?.textAnnotations?.[0]?.description) {
        const extractedText = data.responses[0].textAnnotations[0].description;
        console.log('✅ SUCCESS: Text extracted from image');
        console.log('📝 Extracted text length:', extractedText.length);
        console.log('📝 Text preview:', extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : ''));
        
        // Log character distribution for debugging
        const charStats = {
          letters: (extractedText.match(/[a-zA-ZåäöÅÄÖ]/g) || []).length,
          digits: (extractedText.match(/\d/g) || []).length,
          spaces: (extractedText.match(/\s/g) || []).length,
          other: extractedText.length - (extractedText.match(/[a-zA-ZåäöÅÄÖ\d\s]/g) || []).length
        };
        console.log('📊 Text character stats:', charStats);
        
        return extractedText;
      } else {
        console.log('⚠️ No text detected in image');
        console.log('🔍 Full response for debugging:', JSON.stringify(data, null, 2));
        
        // If no text detected, fall back to basic E-number detection
        console.log('🔄 Attempting offline E-number detection fallback...');
        return ''; // Return empty string to trigger offline detection
      }
      
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ OCR attempt ${attempt} failed:`, error.message);
      
      // Don't retry on certain errors
      if (error.message.includes('API key') || 
          error.message.includes('authentication') || 
          error.message.includes('access denied')) {
        throw error;
      }
      
      // Retry on network errors
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // If all retries failed, throw the last error
  console.error('❌ All OCR attempts failed');
  throw new Error(`Google Cloud Vision API error after ${maxRetries} attempts: ${lastError?.message}`);
}

async function getEAdditiveData(eNumbers: string[]): Promise<EAdditive[]> {
  console.log('Fetching E-additive data for:', eNumbers);
  
  if (eNumbers.length === 0) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('e_additives')
    .select('*')
    .in('e_number', eNumbers)
    .eq('is_published', true);
    
  if (error) {
    console.error('Database error:', error);
    throw new Error(`Database query failed: ${error.message}`);
  }
  
  console.log(`Found ${data?.length || 0} E-additives in database`);
  return data || [];
}

function calculateRiskSummary(eAdditives: EAdditive[]) {
  if (!Array.isArray(eAdditives)) {
    console.error('Invalid eAdditives parameter:', eAdditives);
    return { high_risk: 0, medium_risk: 0, low_risk: 0, total: 0 };
  }

  const summary = { high_risk: 0, medium_risk: 0, low_risk: 0, total: eAdditives.length };
  
  for (const additive of eAdditives) {
    if (!additive || typeof additive !== 'object') {
      console.warn('Invalid additive object:', additive);
      continue;
    }
    
    const riskScore = Number(additive.risk_score) || 0;
    if (riskScore >= 7) {
      summary.high_risk++;
    } else if (riskScore >= 4) {
      summary.medium_risk++;
    } else {
      summary.low_risk++;
    }
  }
  
  return summary;
}

function generateOverallAssessment(riskSummary: any, eAdditives: EAdditive[]): string {
  const { high_risk, medium_risk, low_risk, total } = riskSummary;
  
  if (total === 0) {
    return "Inga E-ämnen hittades i produkten.";
  }
  
  if (high_risk > 0) {
    return `Produkten innehåller ${high_risk} E-ämne(n) med hög risk. Överväg att välja ett alternativ.`;
  } else if (medium_risk > total / 2) {
    return `Produkten innehåller flera E-ämnen med måttlig risk. Konsumera med måtta.`;
  } else {
    return `Produkten innehåller främst säkra E-ämnen. Lämplig för normal konsumtion.`;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Processing E-number scan request...');
    console.log('📝 Request method:', req.method);
    console.log('📝 Request headers:', Object.fromEntries(req.headers.entries()));
    
    // Validate request method
    if (req.method !== 'POST') {
      console.error('❌ Invalid method:', req.method);
      throw new Error('Method not allowed');
    }

    // Parse multipart form data with comprehensive error handling
    let formData;
    try {
      console.log('🔄 Parsing form data...');
      formData = await req.formData();
      console.log('✅ Form data parsed successfully');
      
      // Log form data entries for debugging
      const entries = Array.from(formData.entries());
      console.log('📋 Form data entries:', entries.map(([key, value]) => ({
        key,
        type: typeof value,
        size: value instanceof File ? value.size : 'N/A',
        name: value instanceof File ? value.name : 'N/A'
      })));
      
    } catch (error) {
      console.error('❌ Failed to parse form data:', error);
      console.error('❌ Error details:', error.message);
      throw new Error('Invalid form data - could not parse multipart request');
    }

    const imageFile = formData.get('image') as File;
    console.log('🖼️ Image file check:', {
      exists: !!imageFile,
      isFile: imageFile instanceof File,
      type: typeof imageFile
    });
    
    if (!imageFile) {
      console.error('❌ No image field found in form data');
      throw new Error('No image file provided');
    }
    
    if (!(imageFile instanceof File)) {
      console.error('❌ Image field is not a File object:', typeof imageFile);
      throw new Error('Invalid image file format');
    }

    // Enhanced file validation
    console.log('🔍 Validating file:', {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type,
      lastModified: imageFile.lastModified
    });

    // Validate file size (max 15MB, increased from 10MB)
    if (imageFile.size > 15 * 1024 * 1024) {
      console.error('❌ File too large:', imageFile.size);
      throw new Error('File too large. Maximum size is 15MB');
    }

    // More comprehensive file type validation
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
    if (!validImageTypes.includes(imageFile.type.toLowerCase())) {
      console.error('❌ Invalid file type:', imageFile.type);
      throw new Error(`Invalid file type: ${imageFile.type}. Supported: JPEG, PNG, WEBP`);
    }

    // Check if file is empty
    if (imageFile.size === 0) {
      console.error('❌ Empty file');
      throw new Error('Empty image file');
    }

    console.log('✅ File validation passed');

    // Convert to base64 with enhanced error handling
    let base64Image;
    try {
      console.log('🔄 Converting image to base64...');
      const arrayBuffer = await imageFile.arrayBuffer();
      console.log('📏 Array buffer size:', arrayBuffer.byteLength);
      
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Process in smaller chunks for better memory management
      const chunks = [];
      const chunkSize = 4096; // Reduced chunk size for better stability
      
      console.log(`🔄 Processing ${uint8Array.length} bytes in ${chunkSize}-byte chunks...`);
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.slice(i, i + chunkSize);
        const chunkStr = Array.from(chunk).map(byte => String.fromCharCode(byte)).join('');
        chunks.push(chunkStr);
        
        // Log progress for very large files
        if (i % (chunkSize * 100) === 0) {
          console.log(`📊 Progress: ${Math.round((i / uint8Array.length) * 100)}%`);
        }
      }
      
      console.log('🔄 Creating base64 string...');
      base64Image = btoa(chunks.join(''));
      console.log('✅ Base64 conversion complete, length:', base64Image.length);
      
    } catch (error) {
      console.error('❌ Failed to process image:', error);
      console.error('❌ Error stack:', error.stack);
      throw new Error(`Failed to process image file: ${error.message}`);
    }
    
    // Extract text using OCR with timeout
    console.log('🔍 Starting OCR processing...');
    let extractedText;
    try {
      // Add timeout wrapper
      const ocrPromise = performOCR(base64Image);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('OCR timeout')), 60000) // 60 second timeout
      );
      
      extractedText = await Promise.race([ocrPromise, timeoutPromise]);
      console.log('✅ OCR completed, text length:', extractedText?.length || 0);
      
    } catch (error) {
      console.error('❌ OCR failed:', error);
      
      // If OCR fails completely, try to provide a helpful error
      if (error.message.includes('timeout')) {
        throw new Error('OCR processing timed out. Try with a smaller or clearer image.');
      } else if (error.message.includes('API key')) {
        throw new Error('Vision API configuration error. Please contact support.');
      } else {
        throw new Error(`Text extraction failed: ${error.message}`);
      }
    }

    // Handle empty text extraction more gracefully
    if (!extractedText || extractedText.trim().length === 0) {
      console.log('⚠️ No text extracted, attempting basic E-number pattern matching...');
      
      // Return empty result to trigger frontend offline fallback
      const emptyResult: ScanResult = {
        found_e_numbers: [],
        e_additives_data: [],
        risk_summary: { high_risk: 0, medium_risk: 0, low_risk: 0, total: 0 },
        overall_assessment: 'Ingen text kunde hittas i bilden. Försök med en tydligare bild eller prova offline-läget.'
      };
      
      return new Response(JSON.stringify(emptyResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Extract E-numbers from text
    const eNumbers = extractENumbers(extractedText);
    console.log('🔢 Found E-numbers:', eNumbers);

    // Get E-additive data from database
    let eAdditives;
    try {
      eAdditives = await getEAdditiveData(eNumbers);
      console.log('📊 E-additive data retrieved:', eAdditives.length);
    } catch (error) {
      console.error('❌ Database error:', error);
      throw new Error('Database lookup failed. Please try again.');
    }

    // Calculate risk summary with validation
    const riskSummary = calculateRiskSummary(eAdditives);
    console.log('📈 Risk summary calculated:', riskSummary);

    // Generate overall assessment
    const overallAssessment = generateOverallAssessment(riskSummary, eAdditives);

    const result: ScanResult = {
      found_e_numbers: eNumbers,
      e_additives_data: eAdditives,
      risk_summary: riskSummary,
      overall_assessment: overallAssessment
    };

    console.log('✅ Scan completed successfully');
    console.log('📋 Final result summary:', {
      eNumbers: result.found_e_numbers.length,
      additives: result.e_additives_data.length,
      highRisk: result.risk_summary.high_risk
    });
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('💥 CRITICAL ERROR in scan-e-numbers function:', error);
    console.error('💥 Error stack:', error.stack);
    console.error('💥 Error type:', error.constructor.name);
    
    // Enhanced error categorization and user-friendly messages
    let errorMessage = 'Ett oväntat fel uppstod under skanningen';
    let statusCode = 500;
    let errorCode = 'UNKNOWN_ERROR';

    // Network/connectivity errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      errorMessage = 'Nätverksfel. Kontrollera din internetanslutning och försök igen.';
      statusCode = 503;
      errorCode = 'NETWORK_ERROR';
    }
    // API key/authentication errors
    else if (error.message.includes('API key') || error.message.includes('authentication')) {
      errorMessage = 'Tjänsten är tillfälligt otillgänglig. Försök igen senare.';
      statusCode = 503;
      errorCode = 'API_ERROR';
    }
    // File-related errors
    else if (error.message.includes('No image file')) {
      errorMessage = 'Ingen bildfil kunde hittas. Välj en bild att skanna.';
      statusCode = 400;
      errorCode = 'NO_FILE';
    } else if (error.message.includes('File too large')) {
      errorMessage = 'Bildfilen är för stor. Maximal storlek är 15MB.';
      statusCode = 400;
      errorCode = 'FILE_TOO_LARGE';
    } else if (error.message.includes('Invalid file type') || error.message.includes('file format')) {
      errorMessage = 'Felaktig filtyp. Använd JPEG, PNG eller WEBP-format.';
      statusCode = 400;
      errorCode = 'INVALID_FILE_TYPE';
    } else if (error.message.includes('Empty')) {
      errorMessage = 'Bildfilen verkar vara tom eller skadad. Försök med en annan bild.';
      statusCode = 400;
      errorCode = 'EMPTY_FILE';
    }
    // Processing errors
    else if (error.message.includes('timeout')) {
      errorMessage = 'Skanningen tog för lång tid. Försök med en mindre eller tydligare bild.';
      statusCode = 408;
      errorCode = 'TIMEOUT';
    } else if (error.message.includes('No text') || error.message.includes('extract')) {
      errorMessage = 'Kunde inte läsa text från bilden. Se till att bilden är tydlig och innehåller ingredienslista.';
      statusCode = 400;
      errorCode = 'NO_TEXT_FOUND';
    } else if (error.message.includes('Database')) {
      errorMessage = 'Databasfel. Försök igen om en stund.';
      statusCode = 503;
      errorCode = 'DATABASE_ERROR';
    }
    // Form data errors
    else if (error.message.includes('form data') || error.message.includes('multipart')) {
      errorMessage = 'Felaktigt bildformat. Försök ladda upp bilden igen.';
      statusCode = 400;
      errorCode = 'FORM_DATA_ERROR';
    }

    console.log('🚨 Returning error response:', { errorMessage, errorCode, statusCode });

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        error_code: errorCode,
        details: error.message,
        success: false,
        timestamp: new Date().toISOString()
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});