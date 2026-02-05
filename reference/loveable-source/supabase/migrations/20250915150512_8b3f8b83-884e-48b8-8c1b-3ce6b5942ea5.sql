-- Add missing E-additives from Livsmedelsverket - Phase 1 (Fixed - avoiding duplicates)

-- Missing Color Additives (E100-199)
INSERT INTO public.e_additives (e_number, name, common_name, slug, category, origin, risk_score, longevity_impact, short_description, long_description, meta_title, meta_description) VALUES

('E103', 'Chrysoin', 'Alkanet', 'e103-chrysoin', 'Färgämne', 'Syntetisk', 6, 'Negativ', 'Gult färgämne som är förbjudet i många länder', 'Chrysoin är ett syntetiskt gult färgämne som tidigare användes i livsmedel men nu är förbjudet i EU på grund av hälsorisker. Studier har visat kopplingar till allergiska reaktioner och hyperaktivitet hos barn.', 'E103 Chrysoin - Förbjudet gult färgämne | Vihandlar.se', 'Lär dig om E103 Chrysoin, ett förbjudet gult färgämne. Läs om hälsorisker, biverkningar och varför det inte längre är tillåtet i livsmedel.'),

('E123', 'Amarant', 'Amaranth Red', 'e123-amarant', 'Färgämne', 'Syntetisk', 8, 'Negativ', 'Rött färgämne förbjudet i USA men tillåtet i EU', 'Amarant är ett syntetiskt rött färgämne som är förbjudet i USA sedan 1976 men fortfarande tillåtet i EU. Studier har kopplat det till cancerframkallande effekter i djurförsök och allergiska reaktioner hos människor.', 'E123 Amarant - Rött färgämne med hälsorisker | Vihandlar.se', 'E123 Amarant är ett kontroversiellt rött färgämne. Läs om varför det är förbjudet i USA och vilka hälsorisker som finns.'),

('E127', 'Erytrosin', 'Erythrosine', 'e127-erytrosin', 'Färgämne', 'Syntetisk', 7, 'Negativ', 'Rosa färgämne som innehåller jod och kan påverka sköldkörteln', 'Erytrosin är ett syntetiskt rosa färgämne som innehåller jod. Det kan påverka sköldkörtelns funktion, särskilt hos personer med jodkänslighet. Används främst i körsbärsfärgade produkter och glacéer.', 'E127 Erytrosin - Jodinnehållande rosa färgämne | Vihandlar.se', 'E127 Erytrosin innehåller jod och kan påverka sköldkörteln. Läs om biverkningar och var detta rosa färgämne används.'),

('E132', 'Indigokarmin', 'Indigo Carmine', 'e132-indigokarmin', 'Färgämne', 'Syntetisk', 6, 'Negativ', 'Blått färgämne som kan orsaka allergiska reaktioner', 'Indigokarmin är ett syntetiskt blått färgämne som kan orsaka allergiska reaktioner, särskilt hos personer med astma. Det används för att färga livsmedel blått eller grönt i kombination med gula färgämnen.', 'E132 Indigokarmin - Blått färgämne och allergier | Vihandlar.se', 'E132 Indigokarmin kan orsaka allergiska reaktioner. Läs om detta blåa färgämne och dess hälsoeffekter.'),

-- Missing Preservatives (E200-299)
('E201', 'Natriumsorbat', 'Sodium Sorbate', 'e201-natriumsorbat', 'Konserveringsmedel', 'Syntetisk', 3, 'Neutral', 'Vanligt och relativt säkert konserveringsmedel', 'Natriumsorbat är saltet av sorbinsyra och används som konserveringsmedel för att förhindra mögel och jäst. Det anses vara ett av de säkrare konserveringsmedlen och används ofta i bröd, ost och andra mjölkprodukter.', 'E201 Natriumsorbat - Säkert konserveringsmedel | Vihandlar.se', 'E201 Natriumsorbat är ett relativt säkert konserveringsmedel. Läs om användning, säkerhet och var det förekommer.'),

('E203', 'Kalciumsorbat', 'Calcium Sorbate', 'e203-kalciumsorbat', 'Konserveringsmedel', 'Syntetisk', 3, 'Neutral', 'Kalciumsalt av sorbinsyra, säkert konserveringsmedel', 'Kalciumsorbat är kalciumsaltet av sorbinsyra och fungerar som konserveringsmedel mot mögel och jäst. Det anses vara säkert och används ofta i mejerivaror och bakverk där kalciuminnehållet också kan vara fördelaktigt.', 'E203 Kalciumsorbat - Konserveringsmedel med kalcium | Vihandlar.se', 'E203 Kalciumsorbat är ett säkert konserveringsmedel som också tillför kalcium. Läs om användning och fördelar.'),

('E249', 'Kaliumnitrit', 'Potassium Nitrite', 'e249-kaliumnitrit', 'Konserveringsmedel', 'Syntetisk', 7, 'Negativ', 'Konserveringsmedel i kött som kan bilda cancerframkallande ämnen', 'Kaliumnitrit används för att konservera kött och ge det den karakteristiska rosa färgen. Det kan bilda nitrosaminer som är potentiellt cancerframkallande, särskilt vid hög värme. Används i korv, skinka och andra charkuteriprodukter.', 'E249 Kaliumnitrit - Cancerrisker i chark | Vihandlar.se', 'E249 Kaliumnitrit i charkuterivaror kan bilda cancerframkallande ämnen. Läs om riskerna och alternativ.'),

-- Missing Antioxidants (E300-399)
('E301', 'Natriumaskorbat', 'Sodium Ascorbate', 'e301-natriumaskorbat', 'Antioxidant', 'Syntetisk', 2, 'Positiv', 'Natriumsalt av C-vitamin, fungerar som antioxidant', 'Natriumaskorbat är natriumsaltet av askorbinsyra (C-vitamin) och fungerar som antioxidant i livsmedel. Det förhindrar ranciditet och färgförändringar samtidigt som det bidrar med C-vitamin. Anses vara mycket säkert.', 'E301 Natriumaskorbat - C-vitamin som antioxidant | Vihandlar.se', 'E301 Natriumaskorbat är C-vitamin som antioxidant. Läs om fördelar och säkerhet för detta nyttiga tillsatsämne.'),

('E310', 'Propylgallat', 'Propyl Gallate', 'e310-propylgallat', 'Antioxidant', 'Syntetisk', 6, 'Negativ', 'Syntetisk antioxidant som kan orsaka allergiska reaktioner', 'Propylgallat är en syntetisk antioxidant som används för att förhindra ranciditet i fetter och oljor. Det kan orsaka allergiska reaktioner och hudutslag hos känsliga personer. Används ofta i kombination med BHA och BHT.', 'E310 Propylgallat - Syntetisk antioxidant med risker | Vihandlar.se', 'E310 Propylgallat kan orsaka allergiska reaktioner. Läs om denna syntetiska antioxidant och dess biverkningar.'),

('E321', 'Butylhydroxytoluen (BHT)', 'BHT', 'e321-bht', 'Antioxidant', 'Syntetisk', 7, 'Negativ', 'Kontroversiell syntetisk antioxidant med hormonstörande egenskaper', 'BHT är en syntetisk antioxidant som används för att förhindra ranciditet. Studier tyder på att det kan vara hormonstörande och påverka leverfunktionen. Det har kopplats till hyperaktivitet hos barn och är förbjudet i flera länder.', 'E321 BHT - Hormonstörande antioxidant | Vihandlar.se', 'E321 BHT kan störa hormoner och påverka levern. Läs om denna kontroversiella antioxidant och dess hälsorisker.'),

-- Missing Emulsifiers and Stabilizers (E400-499)
('E400', 'Alginsyra', 'Alginic Acid', 'e400-alginsyra', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', 'Naturlig förtjockare från tång', 'Alginsyra utvinns från brunalger och används som naturlig förtjockare och stabiliseringsmedel. Det anses vara mycket säkert och kan till och med ha positiva hälsoeffekter genom att binda tungmetaller i tarmen.', 'E400 Alginsyra - Naturlig förtjockare från tång | Vihandlar.se', 'E400 Alginsyra är en säker, naturlig förtjockare från alger. Läs om användning och hälsofördelar.'),

('E406', 'Agar', 'Agar-Agar', 'e406-agar', 'Förtjockningsmedel', 'Naturlig', 1, 'Positiv', 'Naturlig gelbildare från rödalger', 'Agar utvinns från rödalger och är en naturlig gelbildare som ofta används som vegetarisk ersättning för gelatin. Det har prebiotikal egenskaper och kan främja tarmhälsan samtidigt som det ger mättnadskänsla.', 'E406 Agar - Naturlig vegetarisk gelbildare | Vihandlar.se', 'E406 Agar är en hälsosam, naturlig gelbildare från rödalger. Läs om fördelar och användning.'),

-- Missing pH Regulators (E500-599)
('E501', 'Kaliumkarbonater', 'Potassium Carbonates', 'e501-kaliumkarbonater', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', 'Kaliumsalter som reglerar pH och fungerar som bakpulver', 'Kaliumkarbonater används för att reglera pH-värdet i livsmedel och fungerar som bakpulver. De anses vara säkra och kan till och med bidra med kalium som är viktigt för hjärt- och muskelfunktion.', 'E501 Kaliumkarbonater - pH-reglerare och bakpulver | Vihandlar.se', 'E501 Kaliumkarbonater reglerar pH och fungerar som bakpulver. Läs om säkerhet och kaliumets fördelar.'),

-- Missing Flavor Enhancers (E600-699)
('E622', 'Monokaliumglutamat', 'Monopotassium Glutamate', 'e622-monokaliumglutamat', 'Smakförstärkare', 'Syntetisk', 5, 'Negativ', 'Kaliumsalt av glutaminsyra, smakförstärkare liknande MSG', 'Monokaliumglutamat är kaliumsaltet av glutaminsyra och fungerar som smakförstärkare likt MSG. Det kan orsaka samma biverkningar som MSG hos känsliga personer, inklusive huvudvärk och illamående.', 'E622 Monokaliumglutamat - MSG-liknande smakförstärkare | Vihandlar.se', 'E622 Monokaliumglutamat liknar MSG och kan ge samma biverkningar. Läs om denna smakförstärkare.'),

-- Missing Sweeteners (E950-999)
('E961', 'Neotam', 'Neotame', 'e961-neotam', 'Sötningsmedel', 'Syntetisk', 4, 'Neutral', 'Intensivt sötningsmedel besläktat med aspartam', 'Neotam är ett syntetiskt sötningsmedel som är cirka 7000-13000 gånger sötare än socker. Till skillnad från aspartam kan det användas av personer med fenylketonuri (PKU). Långtidsstudier pågår fortfarande.', 'E961 Neotam - Intensivt sötningsmedel utan PKU-risk | Vihandlar.se', 'E961 Neotam är extremt sött och säkrare än aspartam för PKU-patienter. Läs om detta nya sötningsmedel.'),

('E968', 'Erytritol', 'Erythritol', 'e968-erytritol', 'Sötningsmedel', 'Naturlig', 2, 'Positiv', 'Naturlig sockeralkohol med få kalorier', 'Erytritol är en naturlig sockeralkohol som förekommer i vissa frukter. Den har nästan inga kalorier och påverkar inte blodsocker eller insulin. Det anses vara ett av de säkraste sötningsmedlen och orsakar sällan magbesvär.', 'E968 Erytritol - Naturligt kalorifattigt sötningsmedel | Vihandlar.se', 'E968 Erytritol är ett naturligt, säkert sötningsmedel utan biverkningar. Läs om fördelar och användning.');

-- Add ADI values for relevant new additives (excluding existing ones)
UPDATE public.e_additives SET 
  adi_value = 0.8,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E123';

UPDATE public.e_additives SET 
  adi_value = 0.1,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E127';

UPDATE public.e_additives SET 
  adi_value = 5.0,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E132';

UPDATE public.e_additives SET 
  adi_value = 25.0,
  adi_source = 'WHO/EFSA'
WHERE e_number IN ('E201', 'E203');

UPDATE public.e_additives SET 
  adi_value = 0.07,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E249';

UPDATE public.e_additives SET 
  adi_value = 2.5,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E310';

UPDATE public.e_additives SET 
  adi_value = 0.25,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E321';

UPDATE public.e_additives SET 
  adi_value = 18.0,
  adi_source = 'WHO/EFSA'
WHERE e_number = 'E961';

-- Add health effects and common products for key new additives
UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Allergiska reaktioner", "Huvudvärk"], "suspected": ["MSG-känslighet"], "risk_groups": ["MSG-känsliga personer"]}',
  common_products = '[{"category": "Snacks", "products": ["Chips", "Nötter"], "average_amount": "200-800mg per portion"}, {"category": "Buljong", "products": ["Knorr", "Maggi"], "average_amount": "300-1200mg per portion"}]'
WHERE e_number = 'E622';