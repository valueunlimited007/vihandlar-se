-- Create E-additives table with comprehensive health and safety data
CREATE TABLE public.e_additives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  e_number TEXT NOT NULL UNIQUE, -- "E100"
  name TEXT NOT NULL, -- "Kurkumin"
  common_name TEXT, -- "Gurkmeja-färg"
  slug TEXT NOT NULL UNIQUE, -- "e100-kurkumin"
  
  -- Classification
  category TEXT NOT NULL, -- "Färgämne", "Konserveringsmedel", "Sötningsmedel"
  origin TEXT, -- "Naturlig", "Syntetisk", "Naturidentisk"
  
  -- Health data (THIS MAKES US UNIQUE!)
  risk_score INTEGER CHECK (risk_score >= 1 AND risk_score <= 10),
  longevity_impact TEXT CHECK (longevity_impact IN ('Neutral', 'Negativ', 'Positiv')),
  
  -- ADI (Acceptable Daily Intake) data
  adi_value NUMERIC, -- mg per kg body weight
  adi_source TEXT, -- "WHO/EFSA"
  children_note TEXT,
  
  -- Health effects (JSONB for flexibility)
  health_effects JSONB, -- {documented: [], suspected: [], benefits: [], risk_groups: []}
  common_products JSONB, -- [{category: "Godis", products: [], average_amount: ""}]
  avoidance_tips TEXT[],
  natural_alternatives TEXT[],
  
  -- SEO & Content
  short_description TEXT,
  long_description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  
  -- Scientific studies
  scientific_studies JSONB,
  
  -- Authority information
  livsmedelsverket_data JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.e_additives ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (no auth required)
CREATE POLICY "E-additives are publicly readable" 
ON public.e_additives 
FOR SELECT 
USING (true);

-- Create index for performance
CREATE INDEX idx_e_additives_e_number ON public.e_additives(e_number);
CREATE INDEX idx_e_additives_slug ON public.e_additives(slug);
CREATE INDEX idx_e_additives_category ON public.e_additives(category);
CREATE INDEX idx_e_additives_risk_score ON public.e_additives(risk_score);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_e_additives_updated_at
BEFORE UPDATE ON public.e_additives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial high-priority E-additives data
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, short_description, long_description,
  meta_title, meta_description,
  health_effects, common_products, avoidance_tips, natural_alternatives
) VALUES 
(
  'E621', 'Mononatriumglutamat', 'MSG', 'e621-mononatriumglutamat', 
  'Smakförstärkare', 'Syntetisk', 6, 'Negativ',
  30, 'WHO/EFSA', 'Kan orsaka hyperaktivitet hos känsliga barn',
  'MSG är en smakförstärkare som kan ge umami-smak men har kopplats till huvudvärk och andra biverkningar.',
  'Mononatriumglutamat (MSG) är en av de mest kontroversiella tillsatserna. Forskning visar att cirka 1% av befolkningen är känslig för MSG och kan uppleva symptom som huvudvärk, illamående och hjärtklappning. MSG finns naturligt i vissa livsmedel som tomater och ost, men tillsatt MSG kan ge starkare reaktioner hos känsliga personer.',
  'E621 MSG - Biverkningar och var det finns | ViHandlar',
  'Allt om E621 (MSG) - biverkningar, var det finns och hur du undviker det. Interaktiv kalkylator för säkert intag.',
  '{"documented": ["Huvudvärk hos känsliga personer", "Illamående", "Hjärtklappning"], "suspected": ["Viktökning", "Störd aptitreglering"], "benefits": ["Förstärker umami-smak"], "risk_groups": ["MSG-känsliga personer", "Astmatiker", "Gravida"]}',
  '[{"category": "Chips", "products": ["OLW Ranch", "Estrella Sourcream"], "average_amount": "200-500mg per påse"}, {"category": "Buljong", "products": ["Knorr", "Marabou buljong"], "average_amount": "100-300mg per tärning"}]',
  '{"Läs ingredienslistor noga", "Undvik produkter med \"smakförstärkare\"", "Välj ekologiska alternativ", "Laga mat från grunden"}',
  '{"Jästextrakt", "Svamppulver", "Naturligt fermenterade sojasåser", "Torkad tomat"}' 
),
(
  'E102', 'Tartrazin', 'Gul färg nr 5', 'e102-tartrazin',
  'Färgämne', 'Syntetisk', 7, 'Negativ', 
  7.5, 'EFSA', 'Kan utlösa hyperaktivitet och uppmärksamhetsstörningar',
  'En syntetisk gul färg som kan orsaka allergiska reaktioner och hyperaktivitet hos barn.',
  'Tartrazin är en syntetisk azofärg som ger en ljus gul färg till livsmedel. EU kräver varningstext på produkter med tartrazin eftersom det kan påverka barns aktivitet och uppmärksamhet negativt. Färgen är förbjuden i Norge och flera andra länder på grund av hälsoriskerna.',
  'E102 Tartrazin - Varför undvika gul färg nr 5? | ViHandlar', 
  'E102 (Tartrazin) kan orsaka hyperaktivitet hos barn. Lär dig var det finns och hur du undviker det.',
  '{"documented": ["Hyperaktivitet hos barn", "Allergiska reaktioner", "Astmasymptom"], "suspected": ["ADHD-liknande beteende", "Huvudvärk"], "benefits": [], "risk_groups": ["Barn under 12 år", "Astmatiker", "Allergibenägna"]}',
  '[{"category": "Godis", "products": ["Gott & Blandat gula", "Haribo gula björnar"], "average_amount": "5-15mg per portion"}, {"category": "Läsk", "products": ["Fanta", "Sprite"], "average_amount": "10-25mg per 33cl"}]',
  '{"Välj naturligt färgade alternativ", "Läs ingrediensförteckningen", "Undvik produkter med \"E102\" eller \"Tartrazin\"", "Välj ekologiska godis"}',
  '{"Kurkumin (E100)", "Safran", "Morötsjuice", "Naturliga fruktfärger"}'
);