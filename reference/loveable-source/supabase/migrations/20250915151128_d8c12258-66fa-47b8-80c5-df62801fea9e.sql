-- Add missing E-additives from Livsmedelsverket - Phase 4: Final large batch

INSERT INTO public.e_additives (e_number, name, common_name, slug, category, origin, risk_score, longevity_impact, adi_value, adi_source, short_description, long_description, meta_title, meta_description) VALUES

-- Remaining Antioxidants and Emulsifiers
('E312', 'Dodecylgallat', 'Dodecyl Gallate', 'e312-dodecylgallat', 'Antioxidant', 'Syntetisk', 7, 'Negativ', 2.5, 'WHO/EFSA', 'Syntetisk antioxidant med hormonstörande potential', 'Dodecylgallat är en syntetisk antioxidant som kan ha hormonstörande effekter. Det finns oro för dess påverkan på fortplantningssystemet och utveckling hos barn.', 'E312 Dodecylgallat - Hormonstörande antioxidant | Vihandlar.se', 'E312 Dodecylgallat kan störa hormoner och fortplantning. Läs om denna riskfyllda antioxidant.'),

('E319', 'tert-Butylhydrokinon (TBHQ)', 'TBHQ', 'e319-tbhq', 'Antioxidant', 'Syntetisk', 7, 'Negativ', 0.7, 'WHO/EFSA', 'Kontroversiell syntetisk antioxidant med neurologiska risker', 'TBHQ är en stark syntetisk antioxidant som kan orsaka neurologiska symptom som yrsel och illamående. Det finns också oro för dess långtidseffekter på levern och immunsystemet.', 'E319 TBHQ - Neurologiskt riskfylld antioxidant | Vihandlar.se', 'E319 TBHQ kan påverka nervsystemet. Läs om denna kontroversiella antioxidant och dess risker.'),

('E325', 'Natriumlaktat', 'Sodium Lactate', 'e325-natriumlaktat', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Natriumsalt av mjölksyra, säkert pH-reglerande medel', 'Natriumlaktat är natriumsaltet av mjölksyra och används för att reglera pH och förbättra smak. Det anses vara mycket säkert och används ofta i kött- och mejerivaror.', 'E325 Natriumlaktat - Säkert pH-reglerande medel | Vihandlar.se', 'E325 Natriumlaktat är helt säkert och naturligt. Läs om detta pH-reglerande medel från mjölksyra.'),

('E326', 'Kaliumlaktat', 'Potassium Lactate', 'e326-kaliumlaktat', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Kaliumsalt av mjölksyra med dubbla fördelar', 'Kaliumlaktat är kaliumsaltet av mjölksyra och fungerar både som pH-reglerare och källa till kalium. Det anses vara säkert och kan ha positiva effekter på blodtrycket.', 'E326 Kaliumlaktat - pH-reglerare med kaliumfördelar | Vihandlar.se', 'E326 Kaliumlaktat ger både pH-kontroll och kalium. Läs om detta fördelaktiga tillsatsämne.'),

('E327', 'Kalciumlaktat', 'Calcium Lactate', 'e327-kalciumlaktat', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Positiv', NULL, NULL, 'Kalciumsalt av mjölksyra med hälsofördelar', 'Kalciumlaktat kombinerar mjölksyrans pH-reglerande effekt med kalciumets hälsofördelar för ben och tänder. Det används ofta i kosttillskott och livsmedel.', 'E327 Kalciumlaktat - pH-reglerare med kalciumbonus | Vihandlar.se', 'E327 Kalciumlaktat stärker benen samtidigt som det reglerar pH. Läs om detta fördelaktiga tillsatsämne.'),

-- More Emulsifiers (E400-499)
('E414', 'Akaciegummi', 'Gum Arabic', 'e414-akaciegummi', 'Förtjockningsmedel', 'Naturlig', 1, 'Positiv', NULL, NULL, 'Naturligt gummi från akacieträd med hälsofördelar', 'Akaciegummi (gum arabicum) utvinns från akacieträd i Afrika. Det är ett av de säkraste förtjockningsmedlen och kan ha prebiotiska effekter som stödjer tarmhälsan.', 'E414 Akaciegummi - Säkraste naturliga gummi | Vihandlar.se', 'E414 Akaciegummi är extremt säkert och hälsosamt. Läs om detta naturliga gummi från Afrika.'),

('E416', 'Karayagummi', 'Karaya Gum', 'e416-karayagummi', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturligt gummi från indiska träd', 'Karayagummi utvinns från Sterculia-träd i Indien och används som naturlig förtjockare. Det kan absorbera stora mängder vatten och ge bra textur till livsmedel.', 'E416 Karayagummi - Indiskt naturligt förtjockningsmedel | Vihandlar.se', 'E416 Karayagummi är ett säkert förtjockningsmedel från Indien. Läs om detta naturliga gummi.'),

('E417', 'Tamarigummi', 'Tara Gum', 'e417-tamarigummi', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturligt gummi från sydamerikanska baljväxter', 'Tamarigummi utvinns från frön av Caesalpinia spinosa-trädet i Sydamerika. Det fungerar som naturlig förtjockare och stabiliseringsmedel i livsmedel.', 'E417 Tamarigummi - Sydamerikansk naturlig förtjockare | Vihandlar.se', 'E417 Tamarigummi är en säker förtjockare från Sydamerika. Läs om detta naturliga gummi.'),

('E418', 'Gellanmummi', 'Gellan Gum', 'e418-gellangummi', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Mikrobiellt producerat naturligt förtjockningsmedel', 'Gellanmummi produceras av bakterien Sphingomonas elodea och fungerar som naturlig gelbildare. Det ger utmärkt stabilitet och kan skapa både mjuka och hårda geler.', 'E418 Gellanmummi - Mikrobiell naturlig gelbildare | Vihandlar.se', 'E418 Gellanmummi är en säker mikrobiell gelbildare. Läs om detta versatila förtjockningsmedel.'),

-- More pH Regulators and Stabilizers (E500-599)
('E502', 'Karbonater', 'Carbonates', 'e502-karbonater', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Säkra mineraliska pH-reglerare', 'Karbonater används för att reglera pH-värdet och som bakpulver. De är naturligt förekommande mineraler som anses vara helt säkra för konsumtion.', 'E502 Karbonater - Säkra pH-reglerare | Vihandlar.se', 'E502 Karbonater är helt säkra mineraler för pH-reglering. Läs om dessa naturliga tillsatsämnen.'),

('E503', 'Ammoniumkarbonater', 'Ammonium Carbonates', 'e503-ammoniumkarbonater', 'Surhetsreglerande medel', 'Syntetisk', 3, 'Neutral', NULL, NULL, 'Bakpulver med ammoniuminnehåll', 'Ammoniumkarbonater används som bakpulver och pH-reglerare. De avger ammoniak vid upphettning vilket ger luftighet åt bakverk, men kan lämna en svag eftersmak.', 'E503 Ammoniumkarbonater - Traditionellt bakpulver | Vihandlar.se', 'E503 Ammoniumkarbonater används i traditionellt bakpulver. Läs om detta klassiska jäsmedel.'),

-- Flavor Enhancers (E620-699)
('E623', 'Kalciumdiglutamat', 'Calcium Diglutamate', 'e623-kalciumdiglutamat', 'Smakförstärkare', 'Syntetisk', 5, 'Negativ', 30.0, 'WHO/EFSA', 'MSG-liknande smakförstärkare med kalcium', 'Kalciumdiglutamat är kalciumsaltet av glutaminsyra och fungerar som smakförstärkare. Det kan orsaka samma biverkningar som MSG hos känsliga personer, men tillför också kalcium.', 'E623 Kalciumdiglutamat - MSG med kalcium | Vihandlar.se', 'E623 Kalciumdiglutamat kan ge MSG-liknande biverkningar. Läs om denna smakförstärkare med kalciumtillskott.'),

('E624', 'Monoammoniumglutamat', 'Monoammonium Glutamate', 'e624-monoammoniumglutamat', 'Smakförstärkare', 'Syntetisk', 5, 'Negativ', 30.0, 'WHO/EFSA', 'MSG-variant med ammonium', 'Monoammoniumglutamat är ammoniumsaltet av glutaminsyra. Det fungerar som smakförstärkare likt MSG och kan orsaka liknande biverkningar hos känsliga individer.', 'E624 Monoammoniumglutamat - MSG-variant med ammonium | Vihandlar.se', 'E624 Monoammoniumglutamat kan ge MSG-biverkningar. Läs om denna smakförstärkare med ammonium.'),

('E625', 'Magnesiumdiglutamat', 'Magnesium Diglutamate', 'e625-magnesiumdiglutamat', 'Smakförstärkare', 'Syntetisk', 5, 'Negativ', 30.0, 'WHO/EFSA', 'MSG-liknande smakförstärkare med magnesium', 'Magnesiumdiglutamat är magnesiumsaltet av glutaminsyra. Det fungerar som smakförstärkare och kan orsaka MSG-liknande biverkningar, men tillför också magnesium som är viktigt för muskler.', 'E625 Magnesiumdiglutamat - MSG med magnesium | Vihandlar.se', 'E625 Magnesiumdiglutamat kan ge MSG-biverkningar men tillför magnesium. Läs om denna smakförstärkare.'),

-- Sweeteners and Others (E900-999)
('E904', 'Schellack', 'Shellac', 'e904-schellack', 'Ytbehandlingsmedel', 'Naturlig', 3, 'Neutral', NULL, NULL, 'Naturlig glansmedel från insekter', 'Schellack produceras av lacksköldlusen och används som naturligt glansmedel på konfektyr och frukt. Det ger en blank yta och skyddar mot fukt, men kommer från insekter vilket kan vara problematiskt för veganer.', 'E904 Schellack - Insektsproducerat glansmedel | Vihandlar.se', 'E904 Schellack är naturligt men kommer från insekter. Läs om detta glansmedel och dess ursprung.'),

('E905', 'Mikrokristallinsk vax', 'Microcrystalline Wax', 'e905-mikrokristallinsk-vax', 'Ytbehandlingsmedel', 'Syntetisk', 4, 'Neutral', NULL, NULL, 'Petroleumbaserat vax som ytskydd', 'Mikrokristallinsk vax är ett petroleumbaserat vax som används som ytbehandlingsmedel på frukt och konfektyr. Det förhindrar uttorkning men väcker oro eftersom det kommer från petroleum.', 'E905 Mikrokristallinsk vax - Petroleumbaserat ytskydd | Vihandlar.se', 'E905 Mikrokristallinsk vax är petroleumbaserat. Läs om detta kontroversiella ytbehandlingsmedel.'),

('E920', 'L-cystein', 'L-Cysteine', 'e920-l-cystein', 'Mjukgöringsmedel', 'Naturlig', 3, 'Neutral', NULL, NULL, 'Aminosyra som mjukgör deg', 'L-cystein är en aminosyra som används för att mjukgöra deg i bröd- och bakverk. Det kan utvinnas från fjädrar, hår eller produceras syntetiskt. Det förbättrar degens elasticitet och bearbetbarhet.', 'E920 L-cystein - Aminosyra för mjukare bröd | Vihandlar.se', 'E920 L-cystein mjukgör deg och kan komma från fjädrar. Läs om denna aminosyra och dess källor.'),

-- Additional pH regulators
('E513', 'Svavelsyra', 'Sulfuric Acid', 'e513-svavelsyra', 'Surhetsreglerande medel', 'Syntetisk', 6, 'Negativ', NULL, NULL, 'Stark syra för pH-reglering', 'Svavelsyra är en mycket stark syra som används i mycket små mängder för pH-reglering. Den kan vara farlig i höga koncentrationer och kräver försiktig hantering.', 'E513 Svavelsyra - Stark syra för pH-kontroll | Vihandlar.se', 'E513 Svavelsyra är mycket stark och används sparsamt. Läs om denna kraftfulla pH-reglerare.'),

('E514', 'Natriumsulfater', 'Sodium Sulfates', 'e514-natriumsulfater', 'Surhetsreglerande medel', 'Syntetisk', 3, 'Neutral', NULL, NULL, 'Natriumsalter för pH-reglering', 'Natriumsulfater används för pH-reglering och som torkmedel. De anses vara relativt säkra men kan ha laxerande effekt i större mängder.', 'E514 Natriumsulfater - pH-reglerare med laxerande effekt | Vihandlar.se', 'E514 Natriumsulfater kan ha laxerande effekt. Läs om dessa pH-reglerande salter.'),

('E515', 'Kaliumsulfater', 'Potassium Sulfates', 'e515-kaliumsulfater', 'Surhetsreglerande medel', 'Syntetisk', 3, 'Neutral', NULL, NULL, 'Kaliumsalter med pH-reglerande effekt', 'Kaliumsulfater används för pH-reglering och tillför kalium. De anses vara säkra och kan ha fördelar för blodtrycket genom kaliuminnehållet.', 'E515 Kaliumsulfater - pH-reglerare med kaliumfördelar | Vihandlar.se', 'E515 Kaliumsulfater ger både pH-kontroll och kalium. Läs om dessa fördelaktiga salter.');

-- Add health effects for key new additives
UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Neurologiska symptom", "Leverpåverkan"], "suspected": ["Immunsystemspåverkan"], "risk_groups": ["Barn", "Leverpatienter"]}',
  common_products = '[{"category": "Snabbmat", "products": ["Pommes frites", "Chips"], "average_amount": "100-300mg per portion"}]'
WHERE e_number = 'E319';

UPDATE public.e_additives SET 
  health_effects = '{"benefits": ["Prebiotisk", "Tarmhälsa"], "documented": ["Stödjer nyttiga bakterier"], "risk_groups": []}',
  common_products = '[{"category": "Kosttillskott", "products": ["Fibertillskott"], "average_amount": "5-15g per portion"}]'
WHERE e_number = 'E414';

UPDATE public.e_additives SET 
  health_effects = '{"documented": ["MSG-känslighet", "Huvudvärk"], "suspected": ["Illamående"], "risk_groups": ["MSG-känsliga personer"]}',
  common_products = '[{"category": "Snacks", "products": ["Chips", "Såser"], "average_amount": "100-500mg per portion"}]'
WHERE e_number IN ('E623', 'E624', 'E625');