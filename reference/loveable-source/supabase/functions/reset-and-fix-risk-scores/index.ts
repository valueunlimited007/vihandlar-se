import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EAdditiveUpdate {
  risk_score: number;
  longevity_impact: string;
  origin: string;
  short_description: string;
  long_description: string;
  avoidance_tips: string[];
  natural_alternatives: string[];
  meta_title: string;
  meta_description: string;
}

// ONLY the specific 6 high-risk E-numbers (exact same as complete-eadditives)
function getSpecificHighRiskENumbers(e_number: string, name: string): { risk_score: number; longevity_impact: string; origin: string; avoidance_tips: string[]; natural_alternatives: string[] } | null {
  const specificRisks: Record<string, any> = {
    'E171': {
      risk_score: 7,
      longevity_impact: 'Negativ',
      origin: 'Syntetisk nanopartikel av titandioxid',
      avoidance_tips: [
        'Läs ingrediensförteckningar noga',
        'Undvik processade livsmedel med vit färg',
        'Välj ekologiska alternativ när möjligt',
        'Speciellt viktigt för barn att undvika'
      ],
      natural_alternatives: [
        'Riskött eller kalciumkarbonat för vithet',
        'Naturliga färgämnen som riskrämspulver',
        'Hemgjorda alternativ utan tillsatser'
      ]
    },
    'E102': {
      risk_score: 7,
      longevity_impact: 'Negativ',
      origin: 'Syntetiskt azofärgämne',
      avoidance_tips: [
        'Undvik gul-färgade godis och läsk',
        'Läs etiketter på barnmat noga',
        'Särskilt viktigt för barn med ADHD att undvika',
        'Välj naturligt färgade produkter'
      ],
      natural_alternatives: [
        'Gurkmeja för gul färg',
        'Saffran',
        'Naturlig beta-karoten'
      ]
    },
    'E122': {
      risk_score: 8,
      longevity_impact: 'Negativ',
      origin: 'Syntetiskt azofärgämne (Azorubin)',
      avoidance_tips: [
        'Förbjuden i USA och Kanada - undvik helt',
        'Läs ingrediensförteckningar på importerade produkter',
        'Särskilt riskabel för astmatiker',
        'Undvik rödfärgade livsmedel med okänd färgkälla'
      ],
      natural_alternatives: [
        'Rödbetsjuice för röd färg',
        'Naturlig karmin från sköldlöss',
        'Antocyaniner från bär'
      ]
    },
    'E220': {
      risk_score: 6,
      longevity_impact: 'Negativ',
      origin: 'Syntetisk svaveldioxid',
      avoidance_tips: [
        'Astmatiker ska undvika helt',
        'Skölj torkad frukt före konsumtion',
        'Välj osvavelbehandlade alternativ',
        'Läs etiketter på vin och torkad frukt'
      ],
      natural_alternatives: [
        'Fryst frukt istället för torkad',
        'Naturligt konserverade produkter',
        'Färsk frukt',
        'Osvavelbehandlade nötter'
      ]
    },
    'E321': {
      risk_score: 7,
      longevity_impact: 'Negativ',
      origin: 'Syntetisk antioxidant (BHT)',
      avoidance_tips: [
        'Undvik särskilt för småbarn',
        'Läs etiketter på spannmålsprodukter',
        'Välj BHT-fria alternativ',
        'Kan orsaka hudutslag hos känsliga'
      ],
      natural_alternatives: [
        'Vitamin E (tokoferol)',
        'Naturlig rosmarin-extrakt',
        'Askorbinsyra (vitamin C)'
      ]
    },
    'E431': {
      risk_score: 9,
      longevity_impact: 'Negativ',
      origin: 'Syntetisk emulgeringsmedel',
      avoidance_tips: [
        'Förbjuden i USA sedan 1952 - undvik helt',
        'Läs ingrediensförteckningar noga',
        'Särskilt farlig vid långtidsexponering',
        'Välj produkter utan emulgeringsmedel när möjligt'
      ],
      natural_alternatives: [
        'Lecithin från solros eller soja',
        'Naturliga emulgeringsmedel',
        'Hemgjorda produkter utan tillsatser'
      ]
    }
  };

  return specificRisks[e_number] || null;
}

// Normal category-based risk scores (without the problematic regex)
function getNormalCategoryRiskData(category: string, name: string, e_number: string): { risk_score: number; longevity_impact: string; origin: string; avoidance_tips: string[]; natural_alternatives: string[] } {
  const lowerCategory = category.toLowerCase();
  const lowerName = name.toLowerCase();

  // Category-based risk assessment (NO problematic regex here)
  const categoryRiskMap: Record<string, { risk: number; impact: string; origin: string; tips: string[]; alternatives: string[] }> = {
    'färgämnen': {
      risk: 4, // Normal risk for most colorants
      impact: 'Neutral',
      origin: 'Syntetiskt färgämne',
      tips: ['Undvik om du har allergier', 'Läs ingrediensförteckningar', 'Välj naturligt färgade produkter'],
      alternatives: ['Naturliga färgämnen från frukt och grönsaker', 'Beta-karoten', 'Klorofyll']
    },
    'konserveringsmedel': {
      risk: 4,
      impact: 'Neutral',
      origin: 'Syntetiskt konserveringsmedel',
      tips: ['Begränsa intaget', 'Välj färska produkter när möjligt', 'Läs etiketter noga'],
      alternatives: ['Salt', 'Socker', 'Naturlig fermentering', 'Frysning']
    },
    'antioxidanter': {
      risk: 3,
      impact: 'Neutral',
      origin: 'Syntetisk eller naturlig antioxidant',
      tips: ['Generellt säkra', 'Överdosera inte', 'Välj naturliga alternativ när möjligt'],
      alternatives: ['Vitamin E', 'Vitamin C', 'Naturliga extrakt från rosmarin']
    },
    'sötningsmedel': {
      risk: 3,
      impact: 'Neutral',
      origin: 'Syntetiskt sötningsmedel',
      tips: ['Begränsa intaget', 'Undvik vid känslig mage', 'Välj naturliga sötningsmedel'],
      alternatives: ['Stevia', 'Honung', 'Agavesirap', 'Frukt för sötma']
    },
    'emulgeringsmedel': {
      risk: 3,
      impact: 'Neutral',
      origin: 'Syntetiskt emulgeringsmedel',
      tips: ['Begränsa processade livsmedel', 'Läs ingrediensförteckningar', 'Välj naturliga alternativ'],
      alternatives: ['Lecithin', 'Äggula', 'Naturliga emulgeringsmedel']
    },
    'förtjockningsmedel': {
      risk: 2,
      impact: 'Neutral',
      origin: 'Naturligt eller syntetiskt förtjockningsmedel',
      tips: ['Generellt säkra', 'Drick mycket vatten', 'Börja med små mängder'],
      alternatives: ['Agar-agar', 'Guarkärnmjöl', 'Pektin', 'Majsstärkelse']
    }
  };

  for (const [categoryKey, data] of Object.entries(categoryRiskMap)) {
    if (lowerCategory.includes(categoryKey)) {
      return {
        risk_score: data.risk,
        longevity_impact: data.impact,
        origin: data.origin,
        avoidance_tips: data.tips,
        natural_alternatives: data.alternatives
      };
    }
  }

  // Default fallback
  return {
    risk_score: 3,
    longevity_impact: 'Neutral',
    origin: 'Oklart ursprung',
    avoidance_tips: ['Begränsa intaget av processade livsmedel', 'Välj naturliga alternativ när möjligt'],
    natural_alternatives: ['Naturliga alternativ', 'Ekologiska produkter', 'Hemgjorda alternativ']
  };
}

function generateDescriptions(name: string, e_number: string, category: string): { short_description: string; long_description: string } {
  const specificDescriptions: Record<string, any> = {
    'E171': {
      short: 'Titandioxid-nanopartiklar som används som vitt färgämne. Kan tränga in i organ.',
      long: 'E171 (Titandioxid) är ett syntetiskt färgämne som består av nanopartiklar. Forskning visar att dessa små partiklar kan tränga in i celler och organ, vilket kan orsaka inflammation och andra hälsoproblem. Ämnet har förbjudits som livsmedelsadditiv i Frankrike från 2020 på grund av säkerhetsproblem. Används främst för att ge livsmedel vit färg, men naturliga alternativ finns tillgängliga.'
    },
    'E102': {
      short: 'Gult syntetiskt färgämne (Tartrazin) som kan orsaka hyperaktivitet hos barn.',
      long: 'E102 (Tartrazin) är ett gult syntetiskt färgämne som tillhör azofärgämnenas familj. Studier har kopplat det till hyperaktivitet och uppmärksamhetsproblem hos barn, särskilt de med ADHD. Det kan också utlösa astma och allergiska reaktioner hos känsliga individer. EU kräver varningstexter på produkter som innehåller E102 om de riktar sig till barn.'
    },
    'E122': {
      short: 'Rött azofärgämne (Azorubin) som är förbjudet i USA och Kanada på grund av hälsorisker.',
      long: 'E122 (Azorubin) är ett rött syntetiskt azofärgämne som har förbjudits i USA och Kanada på grund av dokumenterade hälsorisker. Det kan orsaka allergiska reaktioner, astmaanfall och hyperaktivitet hos barn. Forskning har också kopplat azofärgämnen till inflammatoriska processer i kroppen. Trots förbudet i Nordamerika används det fortfarande i många andra länder, inklusive EU-länder.'
    },
    'E220': {
      short: 'Svaveldioxid som används som konserveringsmedel. Kan utlösa astmaanfall.',
      long: 'E220 (Svaveldioxid) är ett konserveringsmedel som förhindrar bakterietillväxt och bibehåller färg i livsmedel. Det kan orsaka allvarliga reaktioner hos astmatiker, inklusive akuta astmaanfall. Ämnet kan också förstöra vitamin B1 (tiamin) i kroppen och orsaka huvudvärk och magproblem hos känsliga personer. Finns främst i vin, torkad frukt och vissa konserver.'
    },
    'E321': {
      short: 'Syntetisk antioxidant (BHT) som kan orsaka hälsoproblem, särskilt för småbarn.',
      long: 'E321 (BHT - Butylerad Hydroxitoluen) är en syntetisk antioxidant som förhindrar att fetter härsknar. Studier har visat potentiella hälsorisker, särskilt för småbarn, inklusive hormonella störningar och hudreaktioner. Ämnet kan ansamlas i fettvävnad och har kopplats till leverproblemer i djurstudier. Många tillverkare har bytt till naturligare alternativ som vitamin E.'
    },
    'E431': {
      short: 'Emulgeringsmedel som är förbjudet i USA sedan 1952 på grund av cancerframkallande egenskaper.',
      long: 'E431 (Polyoxyetylen stearat) är ett emulgeringsmedel som har förbjudits i USA sedan 1952 efter att djurstudier visade cancerframkallande egenskaper. Trots detta tidiga förbud används det fortfarande i vissa länder. Ämnet kan orsaka inflammatoriska reaktioner och har kopplats till störningar i immunsystemet. Den långa historiken av säkerhetsproblem gör det till ett av de mest kontroversiella livsmedelstillsatserna.'
    }
  };

  if (specificDescriptions[e_number]) {
    return {
      short_description: specificDescriptions[e_number].short,
      long_description: specificDescriptions[e_number].long
    };
  }

  // Generate generic descriptions based on category
  const categoryDescriptions: Record<string, any> = {
    'färgämnen': {
      short: `Färgämne som används för att ge livsmedel ${name.toLowerCase().includes('gul') ? 'gul' : name.toLowerCase().includes('röd') ? 'röd' : name.toLowerCase().includes('blå') ? 'blå' : ''} färg.`,
      long: `${name} (${e_number}) är ett ${category.toLowerCase()} som används för att förbättra eller återställa färgen i livsmedel. Som med många syntetiska färgämnen kan det orsaka allergiska reaktioner hos känsliga personer, särskilt barn. Det är viktigt att läsa ingrediensförteckningar och välja naturligt färgade alternativ när det är möjligt.`
    },
    'konserveringsmedel': {
      short: `Konserveringsmedel som förhindrar bakterietillväxt och förlänger hållbarheten.`,
      long: `${name} (${e_number}) är ett ${category.toLowerCase()} som används för att förhindra tillväxt av skadliga bakterier, jäst och mögel i livsmedel. Medan det hjälper till att bibehålla livsmedelssäkerheten, kan vissa konserveringsmedel orsaka allergiska reaktioner eller störa den naturliga tarmfloran vid höga intag.`
    }
  };

  const categoryKey = Object.keys(categoryDescriptions).find(key => 
    category.toLowerCase().includes(key)
  );

  if (categoryKey && categoryDescriptions[categoryKey]) {
    return {
      short_description: categoryDescriptions[categoryKey].short,
      long_description: categoryDescriptions[categoryKey].long
    };
  }

  // Generic fallback
  return {
    short_description: `${name} är ett livsmedelstillsats som klassificeras som ${category.toLowerCase()}.`,
    long_description: `${name} (${e_number}) är ett ${category.toLowerCase()} som används i livsmedelsindustrin. Som med alla livsmedelstillsatser rekommenderas måttlig konsumtion och att läsa ingrediensförteckningar för att fatta informerade val om din kost.`
  };
}

function generateSEOMeta(name: string, e_number: string, category: string, risk_score: number): { meta_title: string; meta_description: string } {
  const riskLevel = risk_score >= 7 ? 'högrisk' : risk_score >= 5 ? 'måttlig risk' : 'lågrisk';
  
  const meta_title = `${e_number} ${name} - ${riskLevel} ${category} | E-ämnen Guide`;
  
  const meta_description = risk_score >= 7 
    ? `${e_number} (${name}) är ett ${riskLevel} ${category.toLowerCase()}. Lär dig om hälsoriskerna, vad du bör undvika och naturliga alternativ. Komplett guide med forskningsbaserad information.`
    : `${e_number} (${name}) - Information om detta ${category.toLowerCase()}. Hälsoeffekter, användningsområden och säkerhetsaspekter. Komplett E-ämnen guide.`;

  return {
    meta_title: meta_title.substring(0, 60),
    meta_description: meta_description.substring(0, 160)
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🔄 Starting reset and fix of E-additive risk scores...');

    // Fetch all published E-additives
    const { data: existingAdditives, error: fetchError } = await supabase
      .from('e_additives')
      .select('*')
      .eq('is_published', true);

    if (fetchError) {
      throw new Error(`Error fetching E-additives: ${fetchError.message}`);
    }

    if (!existingAdditives || existingAdditives.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No published E-additives found to update' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📊 Found ${existingAdditives.length} E-additives to process`);

    const updatedIds: string[] = [];
    const highRiskIds: string[] = [];
    let normalUpdatedCount = 0;
    let highRiskUpdatedCount = 0;

    // Step 1: Reset ALL E-additives to normal category-based scores
    console.log('🔄 Step 1: Resetting all E-additives to normal category-based risk scores...');

    for (const additive of existingAdditives) {
      try {
        // Check if this is one of the specific high-risk E-numbers
        const isSpecificHighRisk = getSpecificHighRiskENumbers(additive.e_number, additive.name);
        
        if (!isSpecificHighRisk) {
          // Reset to normal category-based risk
          const normalRiskData = getNormalCategoryRiskData(additive.category, additive.name, additive.e_number);
          const descriptions = generateDescriptions(additive.name, additive.e_number, additive.category);
          const seoMeta = generateSEOMeta(additive.name, additive.e_number, additive.category, normalRiskData.risk_score);

          const updateData: EAdditiveUpdate = {
            risk_score: normalRiskData.risk_score,
            longevity_impact: normalRiskData.longevity_impact,
            origin: normalRiskData.origin,
            short_description: descriptions.short_description,
            long_description: descriptions.long_description,
            avoidance_tips: normalRiskData.avoidance_tips,
            natural_alternatives: normalRiskData.natural_alternatives,
            meta_title: seoMeta.meta_title,
            meta_description: seoMeta.meta_description
          };

          const { error: updateError } = await supabase
            .from('e_additives')
            .update(updateData)
            .eq('id', additive.id);

          if (updateError) {
            console.error(`❌ Error resetting ${additive.e_number}:`, updateError.message);
            continue;
          }

          updatedIds.push(additive.id);
          normalUpdatedCount++;
          
          if (normalUpdatedCount <= 5) {
            console.log(`✅ Reset ${additive.e_number} to normal risk score ${normalRiskData.risk_score}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${additive.e_number}:`, error);
        continue;
      }
    }

    // Step 2: Apply high risk scores to ONLY the specific 6 E-numbers
    console.log('\n🔥 Step 2: Applying high risk scores to the specific 6 E-numbers...');

    for (const additive of existingAdditives) {
      try {
        const specificHighRisk = getSpecificHighRiskENumbers(additive.e_number, additive.name);
        
        if (specificHighRisk) {
          const descriptions = generateDescriptions(additive.name, additive.e_number, additive.category);
          const seoMeta = generateSEOMeta(additive.name, additive.e_number, additive.category, specificHighRisk.risk_score);

          const updateData: EAdditiveUpdate = {
            risk_score: specificHighRisk.risk_score,
            longevity_impact: specificHighRisk.longevity_impact,
            origin: specificHighRisk.origin,
            short_description: descriptions.short_description,
            long_description: descriptions.long_description,
            avoidance_tips: specificHighRisk.avoidance_tips,
            natural_alternatives: specificHighRisk.natural_alternatives,
            meta_title: seoMeta.meta_title,
            meta_description: seoMeta.meta_description
          };

          const { error: updateError } = await supabase
            .from('e_additives')
            .update(updateData)
            .eq('id', additive.id);

          if (updateError) {
            console.error(`❌ Error updating high-risk ${additive.e_number}:`, updateError.message);
            continue;
          }

          highRiskIds.push(additive.id);
          highRiskUpdatedCount++;
          
          console.log(`🔥 Applied HIGH RISK score ${specificHighRisk.risk_score} to ${additive.e_number} (${additive.name})`);
        }
      } catch (error) {
        console.error(`❌ Error processing high-risk ${additive.e_number}:`, error);
        continue;
      }
    }

    console.log(`\n✅ SUCCESS! Reset and fix completed:`);
    console.log(`📊 Total E-additives processed: ${existingAdditives.length}`);
    console.log(`🔄 Reset to normal scores: ${normalUpdatedCount}`);
    console.log(`🔥 Applied high risk scores: ${highRiskUpdatedCount}`);
    console.log(`🎯 Expected high risk count: 6`);
    console.log(`✅ High risk E-numbers updated: ${highRiskIds.length === 6 ? 'CORRECT!' : 'CHECK NEEDED'}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully reset ${normalUpdatedCount} E-additives to normal risk and applied high risk to ${highRiskUpdatedCount} specific E-numbers`,
        totalProcessed: existingAdditives.length,
        normalUpdatedCount,
        highRiskUpdatedCount,
        expectedHighRisk: 6,
        actualHighRisk: highRiskUpdatedCount,
        isCorrect: highRiskUpdatedCount === 6,
        highRiskENumbers: highRiskIds.length <= 10 ? highRiskIds : highRiskIds.slice(0, 10)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Error in reset-and-fix-risk-scores function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});