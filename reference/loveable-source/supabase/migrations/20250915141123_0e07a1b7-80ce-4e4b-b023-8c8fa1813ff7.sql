-- Add more popular E-additives with comprehensive data
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES
-- E951 - Aspartam (Most controversial sweetener)
('E951', 'Aspartam', 'Konstgjort sötningsmedel', 'e951-aspartam', 'Sötningsmedel', 'Syntetisk', 8, 'Negativ',
 40, 'EFSA/WHO', 'Undvik helt för barn under 3 år. Kan orsaka hyperaktivitet.',
 '{"documented": ["Huvudvärk", "Yrsel", "Humörsvängningar"], "suspected": ["Migrän", "Depression", "Minnesförlust"], "benefits": ["Kalorisnål"], "risk_groups": ["Gravida", "Barn", "PKU-patienter"]}',
 '[{"category": "Läsk", "products": ["Coca-Cola Zero", "Pepsi Max", "Fanta Zero"], "average_amount": "50-200mg/l"}, {"category": "Tuggummi", "products": ["Trident", "Extra", "Mentos"], "average_amount": "5-20mg/st"}, {"category": "Godis", "products": ["Sockerfri halstabletter", "Diabetikergodis"], "average_amount": "10-50mg/st"}]',
 ARRAY['Läs innehållsförteckningar noga', 'Välj produkter märkta "utan konstgjorda sötningsmedel"', 'Undvik "sockerfri" och "light"-produkter'],
 ARRAY['Stevia', 'Xylitol', 'Honung', 'Agavesirap'],
 'Aspartam (E951) är ett kontroversiellt konstgjort sötningsmedel som är 200 gånger sötare än socker.',
 'Aspartam (E951) är ett av världens mest använda konstgjorda sötningsmedel, men också ett av de mest kontroversiella. Det bryts ner i kroppen till metanol, asparaginsyra och fenylalanin. Medan myndigheter säger att det är säkert i normala doser, rapporterar många konsumenter biverkningar som huvudvärk och yrsel. Särskild försiktighet rekommenderas för gravida, barn och personer med PKU (fenylketonuri).',
 'E951 Aspartam - Biverkningar, Risker & Säkra Alternativ 2024',
 'Allt om E951 (Aspartam): Vetenskapligt granskad guide om biverkningar, säkerhet och naturliga alternativ. ✓ ADI-kalkylator ✓ Produktlista ✓ Expertråd'
),

-- E330 - Citronsyra (Very common, generally safe but can cause issues)
('E330', 'Citronsyra', 'Naturlig syra', 'e330-citronsyra', 'Surhetsreglerande medel', 'Naturlig/Syntetisk', 2, 'Neutral',
 NULL, 'EFSA', 'Generellt säkert, men kan orsaka tandemaljen vid högt intag.',
 '{"documented": ["Tandemalj-erosion vid högt intag"], "suspected": ["Magiritation vid känsliga personer"], "benefits": ["Antioxidant", "Naturlig konservering"], "risk_groups": ["Personer med känslig mage", "Barn (tandskydd)"]}',
 '[{"category": "Läsk", "products": ["Coca-Cola", "Sprite", "7UP"], "average_amount": "100-500mg/l"}, {"category": "Godis", "products": ["Lösgodis", "Tuggummi", "Kola"], "average_amount": "50-200mg/100g"}, {"category": "Konserver", "products": ["Tomatkonserver", "Fruktkonserver"], "average_amount": "100-300mg/100g"}]',
 ARRAY['Skölj munnen med vatten efter surt godis', 'Begränsa sura drycker', 'Vänta 30 min innan tandborstning efter surt intag'],
 ARRAY['Naturlig citronjuice', 'Vinäger', 'Äppelsyra'],
 'Citronsyra (E330) är en naturlig syra som förekommer i citrusfrukter och används som surhetsreglerande medel.',
 'Citronsyra (E330) är en av de vanligaste tillsatserna i livsmedel. Den förekommer naturligt i citrusfrukter men tillverkas oftast industriellt genom jäsning. Används för att ge syrlig smak, bevara färg och förhindra oxidation. Generellt säkert men kan orsaka tandemaljen vid mycket högt intag, särskilt från sura drycker och godis.',
 'E330 Citronsyra - Användning, Säkerhet & Tandskydd 2024',
 'Komplett guide om E330 (Citronsyra): Naturlig vs syntetisk, användning i mat & dryck, effekter på tänder och säkerhetsråd. ✓ Produktlista'
),

-- E250 - Natriumnitrit (Concerning preservative)
('E250', 'Natriumnitrit', 'Konserveringsmedel i kött', 'e250-natriumnitrit', 'Konserveringsmedel', 'Syntetisk', 7, 'Negativ',
 0.07, 'EFSA', 'Begränsa starkt för barn. Undvik helt för spädbarn under 6 månader.',
 '{"documented": ["Methemoglobinemi (syrebrist)", "Nitrosaminbildning"], "suspected": ["Kopplas till cancer", "Hyperaktivitet hos barn"], "benefits": ["Förhindrar botulism", "Ger rosa färg på kött"], "risk_groups": ["Spädbarn", "Gravida", "Små barn"]}',
 '[{"category": "Charkuteri", "products": ["Korv", "Skinka", "Salami"], "average_amount": "50-150mg/kg"}, {"category": "Bacon", "products": ["Bacon", "Rökt kött"], "average_amount": "100-200mg/kg"}, {"category": "Konserver", "products": ["Köttkonserver", "Paté"], "average_amount": "50-100mg/kg"}]',
 ARRAY['Välj nitritfria alternativ', 'Läs etiketter noga på charkuteri', 'Begränsa processade köttprodukter', 'Ät vitamin C-rik mat tillsammans (hämmar nitrosaminbildning)'],
 ARRAY['Naturlig koksalt', 'Selleriextrakt', 'Röd paprika (för färg)'],
 'Natriumnitrit (E250) är ett konserveringsmedel som förhindrar botulism men kan bilda cancerframkallande nitrosaminer.',
 'Natriumnitrit (E250) används främst i charkuteri för att förhindra botulism och ge den karakteristiska rosa färgen. Det är effektivt mot farliga bakterier, men kan reagera med aminosyror och bilda nitrosaminer som misstänks vara cancerframkallande. Särskilt problematiskt för små barn som kan utveckla methemoglobinemi (syrebrist). Många producenter erbjuder nu nitritfria alternativ.',
 'E250 Natriumnitrit - Cancer-risker, Säkerhet & Nitritfria Alternativ',
 'Vetenskaplig genomgång av E250 (Natriumnitrit): Cancerrisker, säkerhet för barn, nitrosaminbildning och nitritfria alternativ. ✓ Produktguide'
),

-- E104 - Kinolingul (Yellow dye - hyperactivity concerns)
('E104', 'Kinolingul', 'Gul färg', 'e104-kinolingul', 'Färgämne', 'Syntetisk', 6, 'Negativ',
 0.5, 'EFSA', 'Kan orsaka hyperaktivitet hos känsliga barn. Southampton-studien visar samband.',
 '{"documented": ["Hyperaktivitet hos känsliga barn", "Allergiska reaktioner"], "suspected": ["ADHD-förvärring", "Astma"], "benefits": ["Ger attraktiv gul färg"], "risk_groups": ["Barn med ADHD", "Allergiker", "Astmatiker"]}',
 '[{"category": "Godis", "products": ["Lösgodis", "Marshmallows", "Gul glasyr"], "average_amount": "10-50mg/100g"}, {"category": "Drycker", "products": ["Sportdrycker", "Läsk", "Saft"], "average_amount": "5-25mg/l"}, {"category": "Glass & Desserter", "products": ["Vaniljglass", "Puddingar"], "average_amount": "5-20mg/100g"}]',
 ARRAY['Undvik gul-färgade godis och drycker till barn', 'Läs innehållsförteckningar på barnprodukter', 'Välj naturligt färgade alternativ'],
 ARRAY['Gurkmeja', 'Saffran', 'Gul paprika', 'Beta-karoten'],
 'Kinolingul (E104) är en syntetisk gul färg som kan orsaka hyperaktivitet hos känsliga barn.',
 'Kinolingul (E104) är en syntetisk azofärg som används för att ge gul färg åt livsmedel. Southampton-studien från 2007 visade att denna färg, tillsammans med andra syntetiska färger, kan öka hyperaktivitet hos barn. EU kräver nu varningstext på produkter med E104. Många tillverkare har bytt till naturliga alternativ som gurkmeja.',
 'E104 Kinolingul - Hyperaktivitet, Southampton-studien & Säkra Alternativ',
 'Fullständig guide om E104 (Kinolingul): Hyperaktivitetsrisker, Southampton-studien, säkerhet för barn och naturliga alternativ. ✓ Vetenskapligt'
),

-- E200 - Sorbinsyra (Generally safe preservative)
('E200', 'Sorbinsyra', 'Naturligt konserveringsmedel', 'e200-sorbinsyra', 'Konserveringsmedel', 'Naturlig/Syntetisk', 1, 'Neutral',
 25, 'WHO/FAO', 'Säkert för barn. Ett av de mildaste konserveringsmedlen.',
 '{"documented": ["Sällsynta hudirritationer"], "suspected": [], "benefits": ["Förhindrar mögel", "Naturligt alternativ", "Brett spektrum mot mikroorganismer"], "risk_groups": ["Mycket sällsynt: personer med kontaktallergi"]}',
 '[{"category": "Ost", "products": ["Hårdost", "Skivad ost", "Smältost"], "average_amount": "100-1000mg/kg"}, {"category": "Bröd", "products": ["Mörkt bröd", "Surdegsbröd"], "average_amount": "200-2000mg/kg"}, {"category": "Sås", "products": ["Majonnäs", "Dressingar", "Såser"], "average_amount": "500-1000mg/kg"}]',
 ARRAY['Generellt inget att undvika - säkert konserveringsmedel', 'Vid hudkänslighet - testa små mängder först'],
 ARRAY['Naturlig sorbinsyra från rönnbär', 'Vitamin E som antioxidant', 'Kyl produkter istället'],
 'Sorbinsyra (E200) är ett naturligt och säkert konserveringsmedel som förekommer i rönnbär.',
 'Sorbinsyra (E200) är ett av de säkraste konserveringsmedlen som används i livsmedelsindustrin. Det förekommer naturligt i rönnbär men produceras oftast syntetiskt. Effektivt mot jäst, mögel och vissa bakterier. ADI-värdet är högt vilket innebär att det krävs stora mängder för att orsaka problem. Används framför allt i ost, bröd och såser.',
 'E200 Sorbinsyra - Säkert Naturligt Konserveringsmedel 2024',
 'Komplett guide om E200 (Sorbinsyra): Säkerhet, naturlig förekomst, användning och jämförelse med andra konserveringsmedel. ✓ Säkert för barn'
),

-- E955 - Sukralos (Popular artificial sweetener)
('E955', 'Sukralos', 'Splenda', 'e955-sukralos', 'Sötningsmedel', 'Syntetisk', 4, 'Neutral',
 15, 'EFSA', 'Säkrare än aspartam för barn, men begränsa ändå intaget.',
 '{"documented": ["Mag-tarmbesvär vid högt intag"], "suspected": ["Påverkan på tarmflora", "Insulinrespons"], "benefits": ["Värmetåligt", "Inget bittert eftersmak"], "risk_groups": ["Personer med IBS", "Diabetiker (kan påverka blodsocker)"]}',
 '[{"category": "Läsk", "products": ["Pepsi Max", "Coca-Cola Zero", "7UP Free"], "average_amount": "30-100mg/l"}, {"category": "Bakning", "products": ["Splenda", "Sukrin", "Bakpulver för diabetiker"], "average_amount": "Variable"}, {"category": "Proteinpulver", "products": ["Whey protein", "Måltidsersättningar"], "average_amount": "50-200mg/portion"}]',
 ARRAY['Begränsa "light"-produkter', 'Rotera mellan olika sötningsmedel', 'Observera mag-tarmreaktioner'],
 ARRAY['Stevia', 'Erytritol', 'Xylitol', 'Monk fruit'],
 'Sukralos (E955) är ett konstgjort sötningsmedel som är 600 gånger sötare än socker och värmetåligt.',
 'Sukralos (E955), känt som Splenda, är ett klorerat socker som är extremt sött och värmetåligt. Till skillnad från aspartam bryts det inte ner av värme, vilket gör det lämpligt för bakning. Studier visar att det är säkrare än många andra konstgjorda sötningsmedel, men nyare forskning tyder på att det kan påverka tarmfloran och insulinresponsen.',
 'E955 Sukralos (Splenda) - Säkerhet, Bakning & Tarmhälsa 2024',
 'Vetenskaplig analys av E955 (Sukralos/Splenda): Säkerhet vs aspartam, användning i bakning, effekter på tarmflora. ✓ Jämförelser ✓ ADI-kalkylator'
);

-- Add index for better performance on category searches
CREATE INDEX IF NOT EXISTS idx_e_additives_category ON public.e_additives(category);
CREATE INDEX IF NOT EXISTS idx_e_additives_risk_score ON public.e_additives(risk_score);
CREATE INDEX IF NOT EXISTS idx_e_additives_e_number ON public.e_additives(e_number);