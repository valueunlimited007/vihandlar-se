import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  e_number?: string;
  field?: string;
}

interface ValidationReport {
  summary: {
    total_additives: number;
    published_additives: number;
    total_issues: number;
    errors: number;
    warnings: number;
    info: number;
  };
  issues: ValidationIssue[];
  recommendations: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting data validation...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all e-additives data
    const { data: additives, error } = await supabase
      .from('e_additives')
      .select('*');

    if (error) {
      throw error;
    }

    console.log(`Processing ${additives?.length || 0} E-additives...`);

    const issues: ValidationIssue[] = [];
    let totalAdditives = additives?.length || 0;
    let publishedAdditives = 0;

    // Collect categories and create lookup maps for cross-reference validation
    const categorySet = new Set<string>();
    const eNumberSet = new Set<string>();
    const slugSet = new Set<string>();
    const nameSet = new Set<string>();
    
    additives?.forEach(additive => {
      categorySet.add(additive.category);
      eNumberSet.add(additive.e_number);
      slugSet.add(additive.slug);
      nameSet.add(additive.name.toLowerCase());
    });

    // Validation logic with enhanced cross-reference checks
    for (const additive of additives || []) {
      if (additive.is_published) {
        publishedAdditives++;
      }

      // Validate E-number format (fix invalid ranges like E1404-1452)
      if (!additive.e_number || !/^E\d+[a-z]*$/i.test(additive.e_number)) {
        // Special handling for range formats that should be split
        if (additive.e_number && additive.e_number.includes('-')) {
          issues.push({
            type: 'error',
            category: 'Format',
            message: `Invalid E-number format (range detected): ${additive.e_number}. Should be individual E-numbers.`,
            e_number: additive.e_number,
            field: 'e_number'
          });
        } else {
          issues.push({
            type: 'error',
            category: 'Format',
            message: `Invalid E-number format: ${additive.e_number}`,
            e_number: additive.e_number,
            field: 'e_number'
          });
        }
      }

      // Validate slug format and uniqueness
      if (!additive.slug || !/^[a-z0-9-]+$/.test(additive.slug)) {
        issues.push({
          type: 'error',
          category: 'Format',
          message: `Invalid slug format (should be lowercase, alphanumeric with hyphens): ${additive.slug}`,
          e_number: additive.e_number,
          field: 'slug'
        });
      }

      // Cross-reference validation: Check for real duplicates and problematic similarities
      const currentName = additive.name.toLowerCase().trim();
      
      // Known chemical families that should not be flagged as duplicates
      const chemicalFamilies = [
        'sorbitan', 'polyoxietylen', 'sockerkulör', 'karamel', 'mono- och diglycerider',
        'polyoxyetylen', 'stearinsyra', 'palmetinsyra', 'natriumsalt', 'kaliumsalt',
        'kalciumsalt', 'magnesiumsalt', 'ammoniumsalt', 'fettsyra'
      ];
      
      // Known legitimate chemical variations that should be treated as informational
      const legitimateVariations = [
        ['kalium', 'kalcium', 'natrium', 'magnesium'], // Different metal salts
        ['nitrit', 'nitrat'], // Different nitrogen compounds
        ['sorbat', 'askorbat'], // Different organic salts
        ['sulfit', 'sulfat', 'bisulfit'], // Different sulfur compounds
        ['metylcellulosa', 'etylcellulosa'], // Different cellulose derivatives
        ['mannitol', 'maltitol', 'laktitol'], // Different sugar alcohols
        ['diacetat', 'triacetat'], // Different acetate levels
        ['difosfater', 'trifosfater'], // Different phosphate levels
        ['brunfärgämne ht', 'brunfärgämne fk'], // Different brown colorants
        ['glyceryldiacetat', 'glyceryltriacetat'], // Different glyceryl compounds
        ['sorbinsyra', 'askorbinsyra'] // Different acids
      ];
      
      // Check if two names represent legitimate chemical variations
      const isLegitimateVariation = (name1: string, name2: string): boolean => {
        const n1 = name1.toLowerCase();
        const n2 = name2.toLowerCase();
        return legitimateVariations.some(group => 
          group.some(variant => n1.includes(variant)) && 
          group.some(variant => n2.includes(variant) && !n1.includes(variant))
        );
      };
      
      // Helper function to calculate Levenshtein distance
      const levenshteinDistance = (str1: string, str2: string): number => {
        const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
        for (let j = 1; j <= str2.length; j++) {
          for (let i = 1; i <= str1.length; i++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
              matrix[j][i - 1] + 1,
              matrix[j - 1][i] + 1,
              matrix[j - 1][i - 1] + indicator
            );
          }
        }
        return matrix[str2.length][str1.length];
      };
      
      // Helper function to check if names belong to the same chemical family
      const isSameChemicalFamily = (name1: string, name2: string): boolean => {
        return chemicalFamilies.some(family => 
          name1.includes(family) && name2.includes(family) && name1 !== name2
        );
      };
      
      // Check against all other additives for real problems only
      const otherAdditives = additives?.filter(other => other.id !== additive.id) || [];
      for (const other of otherAdditives) {
        const otherName = other.name.toLowerCase().trim();
        
        // Skip if they belong to the same chemical family
        if (isSameChemicalFamily(currentName, otherName)) {
          continue;
        }
        
        // Flag exact matches between different E-numbers (critical error)
        if (currentName === otherName && additive.e_number !== other.e_number) {
          issues.push({
            type: 'error',
            category: 'Cross-Reference',
            message: `Identical names for different E-numbers: ${additive.e_number} and ${other.e_number}`,
            e_number: additive.e_number,
            field: 'name'
          });
        }
        // Flag very similar names (likely typos) - only for substantial names
        else if (currentName.length > 5 && otherName.length > 5 && 
                 Math.abs(currentName.length - otherName.length) <= 3 &&
                 levenshteinDistance(currentName, otherName) <= 2) {
          
          // Check if this is a legitimate chemical variation
          if (isLegitimateVariation(additive.name, other.name)) {
            issues.push({
              type: 'info',
              category: 'Cross-Reference',
              message: `Similar chemical compounds detected (this is normal): "${additive.name}" vs "${other.name}"`,
              e_number: additive.e_number,
              field: 'name'
            });
          } else {
            issues.push({
              type: 'warning',
              category: 'Cross-Reference',
              message: `Very similar names detected - possible typo: "${additive.name}" vs "${other.name}"`,
              e_number: additive.e_number,
              field: 'name'
            });
          }
        }
      }

      // Validate ADI values with enhanced checks
      if (additive.adi_value !== null) {
        if (additive.adi_value < 0 || additive.adi_value > 100) {
          issues.push({
            type: 'warning',
            category: 'ADI',
            message: `ADI value outside normal range (0-100): ${additive.adi_value}`,
            e_number: additive.e_number,
            field: 'adi_value'
          });
        }

        // Check if ADI source is provided when ADI value exists
        if (!additive.adi_source || additive.adi_source.trim() === '') {
          issues.push({
            type: 'warning',
            category: 'ADI',
            message: `ADI value present but no source provided`,
            e_number: additive.e_number,
            field: 'adi_source'
          });
        }

        // Cross-reference: Check ADI consistency with risk score (more reasonable thresholds)
        if (additive.risk_score) {
          // Very high ADI (>75) with maximum risk (5) is likely inconsistent
          if (additive.adi_value > 75 && additive.risk_score === 5) {
            issues.push({
              type: 'error',
              category: 'Cross-Reference',
              message: `Very high ADI value (${additive.adi_value}) inconsistent with maximum risk score (5)`,
              e_number: additive.e_number,
              field: 'adi_value'
            });
          }
          // High ADI (>60) with high risk (4-5) might be worth reviewing
          else if (additive.adi_value > 60 && additive.risk_score >= 4) {
            issues.push({
              type: 'warning',
              category: 'Cross-Reference',
              message: `High ADI value (${additive.adi_value}) with high risk score (${additive.risk_score}) - please verify consistency`,
              e_number: additive.e_number,
              field: 'adi_value'
            });
          }
        }
      }

      // Validate risk scores with enhanced logic
      if (additive.risk_score !== null) {
        if (additive.risk_score < 1 || additive.risk_score > 5) {
          issues.push({
            type: 'error',
            category: 'Risk Score',
            message: `Risk score outside valid range (1-5): ${additive.risk_score}`,
            e_number: additive.e_number,
            field: 'risk_score'
          });
        }

        // Cross-reference: Validate risk score against health effects
        if (additive.health_effects && Array.isArray(additive.health_effects)) {
          const negativeEffectsCount = additive.health_effects.filter(effect => 
            typeof effect === 'string' && 
            (effect.toLowerCase().includes('cancer') || 
             effect.toLowerCase().includes('toxic') || 
             effect.toLowerCase().includes('harmful'))
          ).length;
          
          if (negativeEffectsCount > 0 && additive.risk_score < 3) {
            issues.push({
              type: 'warning',
              category: 'Cross-Reference',
              message: `Low risk score inconsistent with reported negative health effects`,
              e_number: additive.e_number,
              field: 'risk_score'
            });
          }
        }
      } else if (additive.is_published) {
        issues.push({
          type: 'warning',
          category: 'Risk Score',
          message: `Published additive missing risk score`,
          e_number: additive.e_number,
          field: 'risk_score'
        });
      }

      // Validate category consistency
      if (additive.category && !categorySet.has(additive.category)) {
        issues.push({
          type: 'info',
          category: 'Cross-Reference',
          message: `Uncommon category detected: ${additive.category}`,
          e_number: additive.e_number,
          field: 'category'
        });
      }

      // Validate origin field
      if (additive.origin && typeof additive.origin === 'string') {
        const validOrigins = ['Natural', 'Synthetic', 'Semi-synthetic', 'Unknown'];
        if (!validOrigins.includes(additive.origin)) {
          issues.push({
            type: 'warning',
            category: 'Format',
            message: `Non-standard origin value: ${additive.origin}. Expected: ${validOrigins.join(', ')}`,
            e_number: additive.e_number,
            field: 'origin'
          });
        }
      }

      // Validate required fields for published additives
      if (additive.is_published) {
        const requiredFields = ['name', 'category', 'short_description'];
        for (const field of requiredFields) {
          if (!additive[field] || additive[field].trim() === '') {
            issues.push({
              type: 'error',
              category: 'Required Fields',
              message: `Published additive missing required field: ${field}`,
              e_number: additive.e_number,
              field
            });
          }
        }

        // Enhanced SEO validation
        if (!additive.meta_title || additive.meta_title.trim() === '') {
          issues.push({
            type: 'warning',
            category: 'SEO',
            message: `Published additive missing meta_title`,
            e_number: additive.e_number,
            field: 'meta_title'
          });
        } else if (additive.meta_title.length > 60) {
          issues.push({
            type: 'warning',
            category: 'SEO',
            message: `Meta title too long (${additive.meta_title.length} chars, should be ≤60)`,
            e_number: additive.e_number,
            field: 'meta_title'
          });
        }

        if (!additive.meta_description || additive.meta_description.trim() === '') {
          issues.push({
            type: 'warning',
            category: 'SEO',
            message: `Published additive missing meta_description`,
            e_number: additive.e_number,
            field: 'meta_description'
          });
        } else if (additive.meta_description.length > 160) {
          issues.push({
            type: 'warning',
            category: 'SEO',
            message: `Meta description too long (${additive.meta_description.length} chars, should be ≤160)`,
            e_number: additive.e_number,
            field: 'meta_description'
          });
        }

        // Validate arrays for published additives
        if (additive.natural_alternatives && Array.isArray(additive.natural_alternatives) && additive.natural_alternatives.length === 0) {
          issues.push({
            type: 'info',
            category: 'Content Quality',
            message: `Published additive could benefit from natural alternatives suggestions`,
            e_number: additive.e_number,
            field: 'natural_alternatives'
          });
        }

        if (additive.avoidance_tips && Array.isArray(additive.avoidance_tips) && additive.avoidance_tips.length === 0) {
          issues.push({
            type: 'info',
            category: 'Content Quality',
            message: `Published additive could benefit from avoidance tips`,
            e_number: additive.e_number,
            field: 'avoidance_tips'
          });
        }
      }
    }

    // Check for duplicate E-numbers
    const eNumbers = additives?.map(a => a.e_number) || [];
    const duplicates = eNumbers.filter((item, index) => eNumbers.indexOf(item) !== index);
    const uniqueDuplicates = [...new Set(duplicates)];
    
    for (const duplicate of uniqueDuplicates) {
      issues.push({
        type: 'error',
        category: 'Duplicates',
        message: `Duplicate E-number found: ${duplicate}`,
        e_number: duplicate,
        field: 'e_number'
      });
    }

    // Generate enhanced recommendations with performance insights
    const recommendations: string[] = [];
    const errorCount = issues.filter(i => i.type === 'error').length;
    const warningCount = issues.filter(i => i.type === 'warning').length;
    const infoCount = issues.filter(i => i.type === 'info').length;
    
    if (errorCount > 0) {
      recommendations.push(`🚨 Fix ${errorCount} critical errors before publishing more additives`);
    }
    
    if (warningCount > 0) {
      recommendations.push(`⚠️  Review ${warningCount} warnings to improve data quality`);
    }

    if (infoCount > 0) {
      recommendations.push(`ℹ️  Consider ${infoCount} suggestions for enhanced content quality`);
    }

    const missingRiskScores = issues.filter(i => i.category === 'Risk Score').length;
    if (missingRiskScores > 0) {
      recommendations.push(`📊 Add risk scores to ${missingRiskScores} additives for better user guidance`);
    }

    const missingADISources = issues.filter(i => i.field === 'adi_source').length;
    if (missingADISources > 0) {
      recommendations.push(`📚 Add ADI sources to ${missingADISources} additives for credibility`);
    }

    const crossRefIssues = issues.filter(i => i.category === 'Cross-Reference').length;
    if (crossRefIssues > 0) {
      recommendations.push(`🔗 Review ${crossRefIssues} cross-reference inconsistencies for data integrity`);
    }

    const seoIssues = issues.filter(i => i.category === 'SEO').length;
    if (seoIssues > 0) {
      recommendations.push(`🔍 Optimize ${seoIssues} SEO elements for better search visibility`);
    }

    // Performance recommendations
    const publishedRatio = totalAdditives > 0 ? (publishedAdditives / totalAdditives * 100).toFixed(1) : '0';
    recommendations.push(`📈 ${publishedRatio}% of additives are published and searchable`);

    if (issues.length === 0) {
      recommendations.push('✅ Data quality looks excellent! No issues found.');
    } else {
      recommendations.push(`🎯 Focus on fixing errors first, then warnings, then consider info suggestions`);
    }

    const report: ValidationReport = {
      summary: {
        total_additives: totalAdditives,
        published_additives: publishedAdditives,
        total_issues: issues.length,
        errors: issues.filter(i => i.type === 'error').length,
        warnings: issues.filter(i => i.type === 'warning').length,
        info: issues.filter(i => i.type === 'info').length,
      },
      issues: issues.slice(0, 100), // Limit to first 100 issues
      recommendations
    };

    console.log('Validation completed:', report.summary);

    return new Response(JSON.stringify(report), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in validate-data function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      summary: { total_additives: 0, published_additives: 0, total_issues: 1, errors: 1, warnings: 0, info: 0 },
      issues: [{
        type: 'error' as const,
        category: 'System',
        message: `Validation failed: ${error.message}`
      }],
      recommendations: ['Check system logs and try again']
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});