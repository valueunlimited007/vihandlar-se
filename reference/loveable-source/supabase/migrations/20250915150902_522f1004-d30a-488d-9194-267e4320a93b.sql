-- Add missing E-additives from Livsmedelsverket - Phase 3: Final batch to reach ~200 total

INSERT INTO public.e_additives (e_number, name, common_name, slug, category, origin, risk_score, longevity_impact, adi_value, adi_source, short_description, long_description, meta_title, meta_description) VALUES

-- More Color Additives (E100-199)
('E155', 'Brunfärgämne HT', 'Brown HT', 'e155-brunfargamne-ht', 'Färgämne', 'Syntetisk', 6, 'Negativ', 1.5, 'WHO/EFSA', 'Syntetiskt brunt färgämne som kan orsaka allergier', 'Brunfärgämne HT är ett syntetiskt brunt färgämne som används i choklad, kex och bakvaror. Det kan orsaka allergiska reaktioner och hyperaktivitet hos känsliga barn.', 'E155 Brunfärgämne HT - Brunt färgämne i choklad | Vihandlar.se', 'E155 Brunfärgämne HT kan orsaka allergier och hyperaktivitet. Läs om detta bruna färgämne i chokladprodukter.'),

('E160e', 'Beta-apo-8'-karotenal', 'Apocarotenal', 'e160e-apokarotenal', 'Färgämne', 'Syntetisk', 3, 'Neutral', 5.0, 'WHO/EFSA', 'Syntetiskt orange färgämne besläktat med karoten', 'Beta-apo-8'-karotenal är ett syntetiskt orange färgämne som är kemiskt besläktat med naturliga karotenoider. Det används för att ge livsmedel en orange färg och anses vara relativt säkert.', 'E160e Beta-apo-8-karotenal - Orange karotenoid | Vihandlar.se', 'E160e Beta-apo-8-karotenal är ett säkert orange färgämne. Läs om denna syntetiska karotenoid och dess användning.'),

('E161g', 'Kantaxantin', 'Canthaxanthin', 'e161g-kantaxantin', 'Färgämne', 'Syntetisk', 4, 'Neutral', 0.03, 'WHO/EFSA', 'Orange-röd karotenoid som används som färgämne', 'Kantaxantin är en syntetisk karotenoid som ger orange-röd färg. Det används i livsmedel och som kosttillskott för att ge brunare hy, men kan orsaka orangefärgning av huden vid höga doser.', 'E161g Kantaxantin - Orange karotenoid färgämne | Vihandlar.se', 'E161g Kantaxantin kan färga huden orange vid höga doser. Läs om denna karotenoid och dess användning.'),

('E172', 'Järnoxider', 'Iron Oxides', 'e172-jarnoxider', 'Färgämne', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturliga mineralfärgämnen i olika färger', 'Järnoxider är naturliga mineralfärgämnen som finns i olika färger - gul, röd, svart och brun. De används som säkra färgämnen i livsmedel och kosmetika och anses vara helt säkra.', 'E172 Järnoxider - Säkra mineralfärgämnen | Vihandlar.se', 'E172 Järnoxider är helt säkra naturliga färgämnen. Läs om dessa mineralfärgämnen och deras användning.'),

('E173', 'Aluminium', 'Aluminium', 'e173-aluminium', 'Färgämne', 'Syntetisk', 5, 'Negativ', 1.0, 'WHO/EFSA', 'Metalliskt silver färgämne med aluminiumrisker', 'Aluminium används som silver-metalliskt färgämne på kakor och konfektyr. Det finns oro för aluminiums potentiella koppling till Alzheimers sjukdom och andra neurologiska problem.', 'E173 Aluminium - Metalliskt färgämne med risker | Vihandlar.se', 'E173 Aluminium kan ha neurologiska risker. Läs om detta metalliska färgämne och dess säkerhet.'),

('E174', 'Silver', 'Silver', 'e174-silver', 'Färgämne', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Ädelmetall som används som dekorativt färgämne', 'Silver är en ädelmetall som används som dekorativt färgämne på exklusiva bakverk och konfektyr. Det anses vara säkert i de små mängder som används i livsmedel.', 'E174 Silver - Ädelmetall som färgämne | Vihandlar.se', 'E174 Silver är säkert som dekorativt färgämne. Läs om denna ädelmetall i exklusiva bakverk.'),

('E175', 'Guld', 'Gold', 'e175-guld', 'Färgämne', 'Naturlig', 1, 'Neutral', NULL, NULL, 'Ädelmetall som används som lyxigt dekorativt färgämne', 'Guld är en ädelmetall som används som lyxigt dekorativt färgämne på exklusiva bakverk, choklad och drycker. Det passerar genom kroppen utan att absorberas och anses vara helt säkert.', 'E175 Guld - Lyxigt ädelmetall färgämne | Vihandlar.se', 'E175 Guld är helt säkert som lyxigt färgämne. Läs om denna ädelmetall i exklusiva produkter.'),

-- More Preservatives (E200-299)
('E214', 'Etylparahydroxibenzoat', 'Ethyl 4-hydroxybenzoate', 'e214-etylparaben', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ', 10.0, 'WHO/EFSA', 'Paraben konserveringsmedel med hormonstörande egenskaper', 'Etylparahydroxibenzoat (etylparaben) är ett konserveringsmedel som kan ha hormonstörande egenskaper, särskilt östrogenliknande effekter. Det kan orsaka allergiska reaktioner hos känsliga personer.', 'E214 Etylparaben - Hormonstörande konserveringsmedel | Vihandlar.se', 'E214 Etylparaben kan störa hormoner. Läs om detta kontroversielle konserveringsmedel och dess risker.'),

('E215', 'Natriumetylparahydroxibenzoat', 'Sodium Ethyl 4-hydroxybenzoate', 'e215-natriumetylparaben', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ', 10.0, 'WHO/EFSA', 'Natriumsalt av etylparaben med liknande risker', 'Natriumetylparahydroxibenzoat är natriumsaltet av etylparaben och har liknande hormonstörande egenskaper. Det används som konserveringsmedel men finns det oro för dess säkerhet.', 'E215 Natriumetylparaben - Hormonstörande salt | Vihandlar.se', 'E215 Natriumetylparaben har hormonstörande egenskaper. Läs om detta konserveringsmedels risker.'),

('E224', 'Kaliummetabisulfit', 'Potassium Metabisulfite', 'e224-kaliummetabisulfit', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ', 0.7, 'WHO/EFSA', 'Sulfitkonserveringsmedel som kan utlösa astma', 'Kaliummetabisulfit är ett kraftfullt sulfitkonserveringsmedel som används i vinframställning. Det kan frigöra svaveldioxid och orsaka allvarliga astmaanfall hos känsliga personer.', 'E224 Kaliummetabisulfit - Astmaframkallande sulfit | Vihandlar.se', 'E224 Kaliummetabisulfit kan utlösa allvarliga astmaanfall. Läs om detta sulfitkonserveringsmedel.'),

('E227', 'Kalciumbisulfit', 'Calcium Bisulfite', 'e227-kalciumbisulfit', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ', 0.7, 'WHO/EFSA', 'Sulfitkonserveringsmedel med astma- och allergirisk', 'Kalciumbisulfit används som konserveringsmedel främst i drycker och konserver. Det kan orsaka allergiska reaktioner och astmaanfall hos personer med sulfitöverkänslighet.', 'E227 Kalciumbisulfit - Sulfit med allergirisker | Vihandlar.se', 'E227 Kalciumbisulfit kan orsaka allergier och astma. Läs om detta sulfitkonserveringsmedel.'),

('E252', 'Kaliumnitrat', 'Potassium Nitrate', 'e252-kaliumnitrat', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ', 3.7, 'WHO/EFSA', 'Konserveringsmedel som kan bilda cancerframkallande nitrosaminer', 'Kaliumnitrat används för att konservera kött och ge den karakteristiska färgen. Liksom andra nitrat kan det bilda potentiellt cancerframkallande nitrosaminer, särskilt vid upphettning.', 'E252 Kaliumnitrat - Nitrat med cancerrisker | Vihandlar.se', 'E252 Kaliumnitrat kan bilda cancerframkallande ämnen. Läs om riskerna med detta konserveringsmedel.'),

-- More Antioxidants (E300-399)
('E312', 'Dodecylgallat', 'Dodecyl Gallate', 'e312-dodecylgallat', 'Antioxidant', 'Syntetisk', 7, 'Negativ', 2.5, 'WHO/EFSA', 'Syntetisk antioxidant med hormonstörande potential', 'Dodecylgallat är en syntetisk antioxidant som kan ha hormonstörande effekter. Det finns oro för dess påverkan på fortplantningssystemet och utveckling hos barn.', 'E312 Dodecylgallat - Hormonstörande antioxidant | Vihandlar.se', 'E312 Dodecylgallat kan störa hormoner och fortplantning. Läs om denna riskfyllda antioxidant.'),

('E319', 'tert-Butylhydrokinon (TBHQ)', 'TBHQ', 'e319-tbhq', 'Antioxidant', 'Syntetisk', 7, 'Negativ', 0.7, 'WHO/EFSA', 'Kontroversiell syntetisk antioxidant med neurologiska risker', 'TBHQ är en stark syntetisk antioxidant som kan orsaka neurologiska symptom som yrsel och illamående. Det finns också oro för dess långtidseffekter på levern och immunsystemet.', 'E319 TBHQ - Neurologiskt riskfylld antioxidant | Vihandlar.se', 'E319 TBHQ kan påverka nervsystemet. Läs om denna kontroversiella antioxidant och dess risker.'),

('E325', 'Natriumlaktat', 'Sodium Lactate', 'e325-natriumlaktat', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Natriumsalt av mjölksyra, säkert pH-reglerande medel', 'Natriumlaktat är natriumsaltet av mjölksyra och används för att reglera pH och förbättra smak. Det anses vara mycket säkert och används ofta i kött- och mejerivaror.', 'E325 Natriumlaktat - Säkert pH-reglerande medel | Vihandlar.se', 'E325 Natriumlaktat är helt säkert och naturligt. Läs om detta pH-reglerande medel från mjölksyra.'),

('E326', 'Kaliumlaktat', 'Potassium Lactate', 'e326-kaliumlaktat', 'Surhetsreglerande medel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Kaliumsalt av mjölksyra med dubbla fördelar', 'Kaliumlaktat är kaliumsaltet av mjölksyra och fungerar både som pH-reglerare och källa till kalium. Det anses vara säkert och kan ha positiva effekter på blodtrycket.', 'E326 Kaliumlaktat - pH-reglerare med kaliumfördelar | Vihandlar.se', 'E326 Kaliumlaktat ger både pH-kontroll och kalium. Läs om detta fördelaktiga tillsatsämne.'),

-- More Emulsifiers and Stabilizers (E400-499)
('E402', 'Kaliumalginat', 'Potassium Alginate', 'e402-kaliumalginat', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturlig gelbildare från tång med kalium', 'Kaliumalginat utvinns från brunalger och fungerar som naturlig gelbildare och förtjockare. Det tillför även kalium som är bra för hjärtat och musklerna.', 'E402 Kaliumalginat - Naturlig gelbildare med kalium | Vihandlar.se', 'E402 Kaliumalginat är naturligt och tillför kalium. Läs om denna hälsosamma gelbildare från alger.'),

('E403', 'Ammoniumalginat', 'Ammonium Alginate', 'e403-ammoniumalginat', 'Förtjockningsmedel', 'Naturlig', 3, 'Neutral', NULL, NULL, 'Alginat med ammonium, används sparsamt', 'Ammoniumalginat är en form av alginat som innehåller ammonium. Det används som förtjockare men mer begränsat än andra alginater på grund av ammoniuminnehållet.', 'E403 Ammoniumalginat - Begränsat användbart alginat | Vihandlar.se', 'E403 Ammoniumalginat används begränsat. Läs om denna alginatform och dess användning.'),

('E404', 'Kalciumalginat', 'Calcium Alginate', 'e404-kalciumalginat', 'Förtjockningsmedel', 'Naturlig', 2, 'Positiv', NULL, NULL, 'Naturlig gelbildare med kalciumtillskott', 'Kalciumalginat kombinerar alginatets gelbildande egenskaper med kalciumets hälsofördelar. Det används som förtjockare och kan bidra till kalciumintaget.', 'E404 Kalciumalginat - Gelbildare med kalciumbonus | Vihandlar.se', 'E404 Kalciumalginat ger både gelbildning och kalcium. Läs om detta fördelaktiga alginat.'),

('E408', 'Furcellaran', 'Furcellaran', 'e408-furcellaran', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturlig gelbildare från dansk rödalg', 'Furcellaran utvinns från rödalgen Furcellaria som växer i Östersjön. Det fungerar som naturlig gelbildare och är särskilt populärt i Danmark där algen skördas.', 'E408 Furcellaran - Dansk naturlig gelbildare | Vihandlar.se', 'E408 Furcellaran är en naturlig gelbildare från Östersjön. Läs om denna danska specialitet.'),

('E409', 'Arabinogalaktan', 'Arabinogalactan', 'e409-arabinogalaktan', 'Förtjockningsmedel', 'Naturlig', 2, 'Positiv', NULL, NULL, 'Naturlig fiber med prebiotiska egenskaper', 'Arabinogalaktan är en naturlig fiber från lärkträd som fungerar som förtjockare. Det har prebiotiska egenskaper och kan stödja tarmhälsan genom att främja nyttiga bakterier.', 'E409 Arabinogalaktan - Prebiotisk fiber från träd | Vihandlar.se', 'E409 Arabinogalaktan stödjer tarmhälsan. Läs om denna prebiotiska fiber från lärkträd.'),

('E413', 'Tragakantgummi', 'Tragacanth', 'e413-tragakant', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral', NULL, NULL, 'Naturligt gummi från buskar i Mellanöstern', 'Tragakantgummi utvinns från buskar i Mellanöstern och är ett av de äldsta kända förtjockningsmedlen. Det ger utmärkt textur och stabilitet i livsmedel.', 'E413 Tragakantgummi - Antikt naturligt förtjockningsmedel | Vihandlar.se', 'E413 Tragakantgummi har använts i årtusenden. Läs om detta traditionella naturliga gummi.'),

('E414', 'Akaciegummi', 'Gum Arabic', 'e414-akaciegummi', 'Förtjockningsmedel', 'Naturlig', 1, 'Positiv', NULL, NULL, 'Naturligt gummi från akacieträd med hälsofördelar', 'Akaciegummi (gum arabicum) utvinns från akacieträd i Afrika. Det är ett av de säkraste förtjockningsmedlen och kan ha prebiotiska effekter som stödjer tarmhälsan.', 'E414 Akaciegummi - Säkraste naturliga gummi | Vihandlar.se', 'E414 Akaciegummi är extremt säkert och hälsosamt. Läs om detta naturliga gummi från Afrika.');

-- Add health effects for key new additives
UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Hormonstörning", "Allergiska reaktioner"], "suspected": ["Fortplantningspåverkan"], "risk_groups": ["Gravida", "Barn", "Hormonsensitiva"]}',
  common_products = '[{"category": "Konserver", "products": ["Sylt", "Läsk"], "average_amount": "50-200mg per portion"}]'
WHERE e_number IN ('E214', 'E215');

UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Neurologiska symptom", "Leverpåverkan"], "suspected": ["Immunsystemspåverkan"], "risk_groups": ["Barn", "Leverpatienter"]}',
  common_products = '[{"category": "Snabbmat", "products": ["Pommes frites", "Chips"], "average_amount": "100-300mg per portion"}]'
WHERE e_number = 'E319';

UPDATE public.e_additives SET 
  health_effects = '{"benefits": ["Prebiotisk", "Tarmhälsa"], "documented": ["Stödjer nyttiga bakterier"], "risk_groups": []}',
  common_products = '[{"category": "Kosttillskott", "products": ["Fibertillskott"], "average_amount": "5-15g per portion"}]'
WHERE e_number IN ('E409', 'E414');