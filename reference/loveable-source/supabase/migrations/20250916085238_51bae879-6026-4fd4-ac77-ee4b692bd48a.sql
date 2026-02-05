-- Add is_published field to e_additives table
ALTER TABLE public.e_additives 
ADD COLUMN is_published boolean NOT NULL DEFAULT false;

-- Set existing complete E-additives as published (those with description and risk_score)
UPDATE public.e_additives 
SET is_published = true 
WHERE short_description IS NOT NULL 
  AND short_description != '' 
  AND risk_score IS NOT NULL;

-- Update E246 with complete data
UPDATE public.e_additives 
SET 
  short_description = 'Naturliga glykolipider från svampen Dacryopinax spathularia, godkända som konserveringsmedel i vissa drycker.',
  long_description = 'Glykolipider (E246) är naturliga ämnen utvunna från svampen Dacryopinax spathularia. De används som konserveringsmedel främst i drycker och har godkänts av EFSA efter omfattande säkerhetsstudier. Dessa ämnen arbetar genom att förhindra tillväxt av skadliga mikroorganismer utan att påverka smak eller kvalitet.',
  risk_score = 2,
  adi_value = NULL,
  adi_source = 'EFSA 2021 - Inget ADI-värde fastställt ännu',
  children_note = 'Inga specifika begränsningar för barn har fastställts',
  longevity_impact = 'Neutral',
  health_effects = '{
    "documented": [],
    "suspected": [],
    "benefits": ["Naturligt ursprung", "Effektivt konserveringsmedel"],
    "risk_groups": []
  }'::jsonb,
  common_products = '[
    {
      "category": "Drycker",
      "products": ["Vissa läskedrycker", "Sportdrycker"],
      "average_amount": "Enligt god tillverkningssed"
    }
  ]'::jsonb,
  avoidance_tips = ARRAY['Kontrollera innehållsförteckningar på drycker', 'Välj produkter med naturliga konserveringsmedel'],
  natural_alternatives = ARRAY['Vitamin C (askorbinsyra)', 'Vitamin E (tokoferol)', 'Rosmarin extrakt'],
  meta_title = 'E246 Glykolipider - Naturligt konserveringsmedel från svamp',
  meta_description = 'E246 Glykolipider är naturliga konserveringsmedel från svampen Dacryopinax spathularia. Läs om säkerhet, användning och hälsoeffekter.',
  is_published = true,
  updated_at = now()
WHERE e_number = 'E246';

-- Add data for other common incomplete E-additives
-- E1414 - Acetylated distarch phosphate (modified starch)
UPDATE public.e_additives 
SET 
  short_description = 'Modifierad stärkelse som används som förtjockningsmedel och stabiliseringsmedel i livsmedel.',
  long_description = 'E1414 är en kemiskt modifierad stärkelse som får sina egenskaper genom acetylering och fosfatering. Den används som förtjockningsmedel, stabiliseringsmedel och emulgeringsmedel i många livsmedel. Stärkelsen blir mer stabil mot värme, syra och mekanisk behandling.',
  risk_score = 1,
  adi_value = NULL,
  adi_source = 'Inget ADI-värde krävs - GRAS status',
  longevity_impact = 'Neutral',
  health_effects = '{
    "documented": [],
    "suspected": [],
    "benefits": ["Förbättrar textur", "Stabil vid olika pH-värden"],
    "risk_groups": []
  }'::jsonb,
  common_products = '[
    {
      "category": "Mejeriprodukter",
      "products": ["Yoghurt", "Grädde", "Dressingar"],
      "average_amount": "0.5-2%"
    },
    {
      "category": "Bakverk",
      "products": ["Kakor", "Tårtor", "Bröd"],
      "average_amount": "1-3%"
    }
  ]'::jsonb,
  avoidance_tips = ARRAY['Välj produkter märkta som "utan tillsatser"', 'Använd naturliga förtjockningsmedel som majsstärkelse'],
  natural_alternatives = ARRAY['Majsstärkelse', 'Tapiokastärkelse', 'Potatismjöl'],
  meta_title = 'E1414 Acetylerad distärkelsfosfat - Modifierad stärkelse som förtjockningsmedel',
  meta_description = 'E1414 är en modifierad stärkelse som används som förtjockningsmedel i livsmedel. Läs om användning, säkerhet och alternativ.',
  is_published = true,
  updated_at = now()
WHERE e_number = 'E1414';

-- E1422 - Acetylated distarch adipate
UPDATE public.e_additives 
SET 
  short_description = 'Modifierad stärkelse som fungerar som förtjocknings- och stabiliseringsmedel, särskilt användbar i frysta produkter.',
  long_description = 'E1422 är en kemiskt modifierad stärkelse som tål frysning och upptining bättre än vanlig stärkelse. Den används främst i frysta livsmedel där den bibehåller sin struktur och förhindrar vattenseparation.',
  risk_score = 1,
  adi_value = NULL,
  adi_source = 'Inget ADI-värde krävs - GRAS status',
  longevity_impact = 'Neutral',
  health_effects = '{
    "documented": [],
    "suspected": [],
    "benefits": ["Förbättrar textur i frysta produkter", "Förhindrar vattenseparation"],
    "risk_groups": []
  }'::jsonb,
  common_products = '[
    {
      "category": "Frysta produkter",
      "products": ["Fryst pizza", "Frysta såser", "Glass"],
      "average_amount": "1-5%"
    }
  ]'::jsonb,
  avoidance_tips = ARRAY['Läs ingredienslistor på frysta produkter', 'Välj hem-tillagade alternativ'],
  natural_alternatives = ARRAY['Majsstärkelse', 'Agar-agar', 'Xantangummi'],
  meta_title = 'E1422 Acetylerad distärkelsadipat - Modifierad stärkelse för frysta produkter',
  meta_description = 'E1422 är en modifierad stärkelse som används i frysta livsmedel. Information om säkerhet, användning och naturliga alternativ.',
  is_published = true,
  updated_at = now()
WHERE e_number = 'E1422';

-- Create index for better performance on is_published queries
CREATE INDEX IF NOT EXISTS idx_e_additives_published ON public.e_additives(is_published) WHERE is_published = true;