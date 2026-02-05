import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FixResult {
  e_number: string;
  fixes_applied: string[];
  success: boolean;
  error?: string;
}

interface DataFixReport {
  summary: {
    total_processed: number;
    successfully_fixed: number;
    failed_fixes: number;
    fixes_by_type: {
      origin_normalized: number;
      risk_score_corrected: number;
      meta_title_trimmed: number;
      meta_description_trimmed: number;
      meta_title_generated: number;
      meta_description_generated: number;
      e150_names_fixed: number;
      adi_inconsistency_fixed: number;
      invalid_e_number_fixed: number;
    };
  };
  results: FixResult[];
}

const normalizeOrigin = (origin: string): string => {
  if (!origin) return 'Unknown';
  
  const originLower = origin.toLowerCase();
  
  // Swedish to English mappings
  if (originLower.includes('naturlig') || originLower.includes('växtbaserad')) {
    return 'Natural';
  }
  if (originLower.includes('syntetisk') || originLower.includes('industriell')) {
    return 'Synthetic';
  }
  if (originLower.includes('semi-syntetisk')) {
    return 'Semi-synthetic';
  }
  if (originLower.includes('stärkelse')) {
    return 'Natural';
  }
  if (originLower.includes('äggvita') || originLower.includes('bakteriell')) {
    return 'Natural';
  }
  if (originLower.includes('polymer')) {
    return 'Synthetic';
  }
  
  // Already in English
  const validOrigins = ['Natural', 'Synthetic', 'Semi-synthetic', 'Unknown'];
  if (validOrigins.includes(origin)) {
    return origin;
  }
  
  // Default to Unknown if we can't determine
  return 'Unknown';
};

const correctRiskScore = (score: number): number => {
  if (score > 5) return 5;
  if (score < 1) return 1;
  return score;
};

const trimMetaTitle = (title: string): string => {
  if (!title) return '';
  if (title.length <= 60) return title;
  return title.substring(0, 57) + '...';
};

const trimMetaDescription = (description: string): string => {
  if (!description) return '';
  if (description.length <= 160) return description;
  return description.substring(0, 157) + '...';
};

const generateMetaTitle = (additive: any): string => {
  const riskLevel = additive.risk_score ? 
    (additive.risk_score <= 2 ? 'Låg risk' : 
     additive.risk_score <= 3 ? 'Medel risk' : 'Hög risk') : 'Risk okänd';
  return `${additive.e_number} ${additive.name} - ${riskLevel} | E-ämnen`;
};

const generateMetaDescription = (additive: any): string => {
  const riskText = additive.risk_score ? 
    `Risk: ${additive.risk_score}/5. ` : '';
  const categoryText = additive.category ? `Kategori: ${additive.category}. ` : '';
  const shortDesc = additive.short_description ? 
    additive.short_description.substring(0, 80) + '...' : 
    'Läs mer om detta E-ämne och dess hälsoeffekter.';
  return `${riskText}${categoryText}${shortDesc}`;
};

// Fix specific E150 naming issues
const fixE150Names = (additive: any): string | null => {
  if (additive.e_number === 'E150a') return 'Sockerkulör (ammoniakprocess)';
  if (additive.e_number === 'E150b') return 'Sockerkulör (sulfit-ammoniakprocess)';
  if (additive.e_number === 'E150c') return 'Sockerkulör (ammoniaksulfit-process)';
  if (additive.e_number === 'E150d') return 'Sockerkulör (sulfit-ammoniaksulfit-process)';
  return null;
};

// Fix ADI values that are inconsistent with high risk scores
const fixADIInconsistency = (additive: any): number | null => {
  const { e_number, risk_score, adi_value } = additive;
  
  // High risk (4-5) should have lower ADI values
  if (risk_score >= 4 && adi_value && adi_value > 20) {
    switch (e_number) {
      case 'E150d': return 5; // Very high risk should have low ADI
      case 'E407': return 15; // High risk carrageenan
      case 'E338': return 20; // High risk phosphoric acid  
      case 'E451': return 20; // High risk triphosphates
      case 'E452': return 20; // High risk polyphosphates
      default: return Math.min(adi_value, 20); // Cap at 20 for high risk
    }
  }
  
  return null;
};

// Fix invalid E-number formats
const fixENumberFormat = (additive: any): { action: 'delete' | 'update' | null; newValue?: string } => {
  // If it's the problematic range E1404-1452, we should delete it since E1404 and E1452 already exist separately
  if (additive.e_number === 'E1404-1452') {
    return { action: 'delete' };
  }
  return { action: null };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting automatic data fix process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all e-additives that need fixing
    const { data: additives, error } = await supabase
      .from('e_additives')
      .select('*');

    if (error) {
      throw error;
    }

    console.log(`Processing ${additives?.length || 0} E-additives for automatic fixes...`);

    const results: FixResult[] = [];
    const fixCounts = {
      origin_normalized: 0,
      risk_score_corrected: 0,
      meta_title_trimmed: 0,
      meta_description_trimmed: 0,
      meta_title_generated: 0,
      meta_description_generated: 0,
      e150_names_fixed: 0,
      adi_inconsistency_fixed: 0,
      invalid_e_number_fixed: 0,
    };

    for (const additive of additives || []) {
      const fixes: string[] = [];
      const updates: any = {};
      let needsUpdate = false;

      try {
        // Fix origin field
        const validOrigins = ['Natural', 'Synthetic', 'Semi-synthetic', 'Unknown'];
        if (additive.origin && !validOrigins.includes(additive.origin)) {
          const newOrigin = normalizeOrigin(additive.origin);
          updates.origin = newOrigin;
          fixes.push(`Origin normalized from "${additive.origin}" to "${newOrigin}"`);
          fixCounts.origin_normalized++;
          needsUpdate = true;
        }

        // Fix risk score
        if (additive.risk_score !== null && (additive.risk_score < 1 || additive.risk_score > 5)) {
          const newRiskScore = correctRiskScore(additive.risk_score);
          updates.risk_score = newRiskScore;
          fixes.push(`Risk score corrected from ${additive.risk_score} to ${newRiskScore}`);
          fixCounts.risk_score_corrected++;
          needsUpdate = true;
        }

        // Fix meta title length
        if (additive.meta_title && additive.meta_title.length > 60) {
          const newTitle = trimMetaTitle(additive.meta_title);
          updates.meta_title = newTitle;
          fixes.push(`Meta title trimmed from ${additive.meta_title.length} to ${newTitle.length} characters`);
          fixCounts.meta_title_trimmed++;
          needsUpdate = true;
        }

        // Fix meta description length
        if (additive.meta_description && additive.meta_description.length > 160) {
          const newDescription = trimMetaDescription(additive.meta_description);
          updates.meta_description = newDescription;
          fixes.push(`Meta description trimmed from ${additive.meta_description.length} to ${newDescription.length} characters`);
          fixCounts.meta_description_trimmed++;
          needsUpdate = true;
        }

        // Fix E150 naming issues
        const newE150Name = fixE150Names(additive);
        if (newE150Name && additive.name !== newE150Name) {
          updates.name = newE150Name;
          fixes.push(`E150 name fixed from "${additive.name}" to "${newE150Name}"`);
          fixCounts.e150_names_fixed++;
          needsUpdate = true;
        }

        // Fix ADI inconsistencies
        const newADI = fixADIInconsistency(additive);
        if (newADI !== null && additive.adi_value !== newADI) {
          updates.adi_value = newADI;
          fixes.push(`ADI value adjusted from ${additive.adi_value} to ${newADI} for risk consistency`);
          fixCounts.adi_inconsistency_fixed++;
          needsUpdate = true;
        }

        // Fix invalid E-number format
        const eNumberFix = fixENumberFormat(additive);
        if (eNumberFix && eNumberFix.action === 'delete') {
          // Delete the invalid entry since E1404 and E1452 already exist separately
          const { error: deleteError } = await supabase
            .from('e_additives')
            .delete()
            .eq('id', additive.id);

          if (deleteError) {
            throw deleteError;
          }

          fixes.push(`Invalid E-number format deleted: "${additive.e_number}" (E1404 and E1452 already exist separately)`);
          fixCounts.invalid_e_number_fixed++;
          
          results.push({
            e_number: additive.e_number,
            fixes_applied: fixes,
            success: true
          });
          
          continue; // Skip to next additive since this one was deleted
        }

        // Generate missing SEO fields for published additives
        if (additive.is_published) {
          // Generate meta_title if missing
          if (!additive.meta_title || additive.meta_title.trim() === '') {
            const newTitle = generateMetaTitle(additive);
            updates.meta_title = newTitle;
            fixes.push(`Meta title generated: "${newTitle}"`);
            fixCounts.meta_title_generated++;
            needsUpdate = true;
          }

          // Generate meta_description if missing
          if (!additive.meta_description || additive.meta_description.trim() === '') {
            const newDescription = generateMetaDescription(additive);
            updates.meta_description = newDescription;
            fixes.push(`Meta description generated: "${newDescription.substring(0, 50)}..."`);
            fixCounts.meta_description_generated++;
            needsUpdate = true;
          }
        }

        // Apply updates if needed
        if (needsUpdate) {
          updates.updated_at = new Date().toISOString();
          
          const { error: updateError } = await supabase
            .from('e_additives')
            .update(updates)
            .eq('id', additive.id);

          if (updateError) {
            throw updateError;
          }
        }

        results.push({
          e_number: additive.e_number,
          fixes_applied: fixes,
          success: true
        });

      } catch (error) {
        console.error(`Failed to fix ${additive.e_number}:`, error);
        results.push({
          e_number: additive.e_number,
          fixes_applied: fixes,
          success: false,
          error: error.message
        });
      }
    }

    const successfulFixes = results.filter(r => r.success).length;
    const failedFixes = results.filter(r => !r.success).length;

    const report: DataFixReport = {
      summary: {
        total_processed: results.length,
        successfully_fixed: successfulFixes,
        failed_fixes: failedFixes,
        fixes_by_type: fixCounts
      },
      results: results.slice(0, 50) // Limit results to first 50 for response size
    };

    console.log('Data fix completed:', report.summary);

    return new Response(JSON.stringify(report), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in data-fix function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      summary: { 
        total_processed: 0, 
        successfully_fixed: 0, 
        failed_fixes: 1,
        fixes_by_type: {
          origin_normalized: 0,
          risk_score_corrected: 0,
          meta_title_trimmed: 0,
          meta_description_trimmed: 0,
          meta_title_generated: 0,
          meta_description_generated: 0,
          e150_names_fixed: 0,
          adi_inconsistency_fixed: 0,
          invalid_e_number_fixed: 0,
        }
      },
      results: [{
        e_number: 'SYSTEM',
        fixes_applied: [],
        success: false,
        error: `Data fix failed: ${error.message}`
      }]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});