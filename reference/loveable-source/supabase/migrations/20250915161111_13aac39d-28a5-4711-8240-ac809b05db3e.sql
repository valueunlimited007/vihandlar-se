-- Final targeted batch - Only add truly missing important E-additives

INSERT INTO public.e_additives (e_number, name, common_name, slug, category, origin, risk_score, longevity_impact, adi_value, adi_source, short_description, long_description, meta_title, meta_description) VALUES

-- Commonly used emulsifiers and stabilizers that we're likely missing
('E430', 'Polyoxyetylen (8) stearate', 'Polyoxyl Stearate', 'e430-polyoxyl-stearate', 'Emulgeringsmedel', 'Syntetisk', 4, 'Neutral', NULL, NULL, 'Syntetiskt emulgeringsmedel för fetter', 'Polyoxyetylen (8) stearate är ett syntetiskt emulgeringsmedel som hjälper blanda fetter och vatten. Det används i margariner och andra fettrika produkter för att skapa stabil emulsion.', 'E430 Polyoxyl Stearate - Syntetiskt emulgeringsmedel | Vihandlar.se', 'E430 Polyoxyl Stearate hjälper blanda fett och vatten. Läs om detta syntetiska emulgeringsmedel.'),

('E431', 'Polyoxyetylen (40) stearat', 'Polyoxyl 40 Stearate', 'e431-polyoxyl-40-stearate', 'Emulgeringsmedel', 'Syntetisk', 4, 'Neutral', NULL, NULL, 'Syntetiskt emulgeringsmedel med längre kedja', 'Polyoxyetylen (40) stearat är en variant av polyoxylstearat med längre polyetylenglykolkedja. Det ger bättre emulgeringsegenskaper än E430 och används i mer krävande tillämpningar.', 'E431 Polyoxyl 40 Stearate - Förbättrat emulgeringsmedel | Vihandlar.se', 'E431 Polyoxyl 40 Stearate har förbättrade emulgeringsegenskaper. Läs om denna avancerade variant.'),

-- More commonly used sweeteners
('E962', 'Aspartam-acesulfamsalt', 'Aspartame-Acesulfame Salt', 'e962-aspartam-acesulfam', 'Sötningsmedel', 'Syntetisk', 5, 'Negativ', 20.0, 'WHO/EFSA', 'Kombination av två kontroversiella sötningsmedel', 'Aspartam-acesulfamsalt kombinerar aspartam och acesulfam-K för att ge bättre smak än vardera enskilt. Det har samma potentiella risker som båda komponenterna och bör undvikas av PKU-patienter.', 'E962 Aspartam-acesulfamsalt - Dubbel sötningsmedelsrisk | Vihandlar.se', 'E962 kombinerar risker från aspartam och acesulfam. Läs om detta kombinerade sötningsmedel.'),

('E964', 'Polyglycitolsirap', 'Polyglycitol Syrup', 'e964-polyglycitolsirap', 'Sötningsmedel', 'Syntetisk', 3, 'Neutral', NULL, NULL, 'Sockeralkoholsirap med mild sötma', 'Polyglycitolsirap är en blandning av sorbitol, maltitol och andra sockeralkoholer. Det ger mild sötma och används ofta i sockerfria produkter, men kan orsaka maginbesvär i större mängder.', 'E964 Polyglycitolsirap - Mild sockeralkohol | Vihandlar.se', 'E964 Polyglycitolsirap kan orsaka magbesvär. Läs om denna milda sockeralkohol.'),

('E966', 'Laktitol', 'Lactitol', 'e966-laktitol', 'Sötningsmedel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Sockeralkohol från laktos med prebiotiska effekter', 'Laktitol framställs från laktos och har cirka hälften av sockrets sötma. Det har prebiotiska egenskaper som kan gynna tarmhälsan, men kan orsaka laxerande effekt.', 'E966 Laktitol - Prebiotisk sockeralkohol | Vihandlar.se', 'E966 Laktitol har prebiotiska fördelar men kan vara laxerande. Läs om denna sockeralkohol.'),

('E969', 'Advantam', 'Advantame', 'e969-advantam', 'Sötningsmedel', 'Syntetisk', 3, 'Neutral', 5.0, 'WHO/EFSA', 'Nytt intensivt sötningsmedel besläktat med aspartam', 'Advantam är ett av de nyaste intensiva sötningsmedlen, cirka 20000 gånger sötare än socker. Det är besläktat med aspartam men kan användas av PKU-patienter. Långtidsstudier pågår fortfarande.', 'E969 Advantam - Nyaste intensiva sötningsmedlet | Vihandlar.se', 'E969 Advantam är extremt sött och säkrare än aspartam. Läs om detta nya sötningsmedel.'),

-- Important stabilizers and thickeners
('E460', 'Cellulosa', 'Cellulose', 'e460-cellulosa', 'Förtjockningsmedel', 'Naturlig', 1, 'Positiv', NULL, NULL, 'Naturlig fiber från växter', 'Cellulosa är en naturlig fiber som utvinns från växtcellväggar. Den används som förtjockningsmedel och bulkmedel och har positiva effekter på matsmältningen och mättnadskänslan.', 'E460 Cellulosa - Naturlig fiber med hälsofördelar | Vihandlar.se', 'E460 Cellulosa är nyttig naturlig fiber. Läs om denna växtfiber och dess hälsofördelar.'),

('E461', 'Metylcellulosa', 'Methylcellulose', 'e461-metylcellulosa', 'Förtjockningsmedel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Modifierad cellulosa med förbättrade egenskaper', 'Metylcellulosa är kemiskt modifierad cellulosa som ger bättre gelbildande och förtjockande egenskaper. Den används i glutenfria produkter som ersättning för gluten.', 'E461 Metylcellulosa - Glutenersättare från cellulosa | Vihandlar.se', 'E461 Metylcellulosa ersätter gluten i bakverk. Läs om denna modifierade cellulosa.'),

('E463', 'Hydroxipropylcellulosa', 'Hydroxypropyl Cellulose', 'e463-hydroxipropylcellulosa', 'Förtjockningsmedel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Avancerad cellulosamododifikation för bättre stabilitet', 'Hydroxipropylcellulosa är en avancerat modifierad cellulosa som ger utmärkt stabilitet och konsistens. Den används i produkter där hög kvalitet på texturen krävs.', 'E463 Hydroxipropylcellulosa - Avancerad texturstabilisator | Vihandlar.se', 'E463 Hydroxipropylcellulosa ger superior textur. Läs om denna avancerade cellulosamodifikation.'),

-- Important emulsifiers
('E472a', 'Mono- och diacetylvin- och fettsyremonoglycerid', 'Acetylated Monoglycerides', 'e472a-acetylerade-monoglycerider', 'Emulgeringsmedel', 'Syntetisk', 3, 'Neutral', NULL, NULL, 'Modifierade monoglycerider för bättre emulgering', 'Acetylerade monoglycerider är kemiskt modifierade fetter som fungerar som effektiva emulgeringsmedel. De hjälper till att skapa stabila emulsioner i margariner och bakverk.', 'E472a Acetylerade monoglycerider - Effektiva emulgeringsmedel | Vihandlar.se', 'E472a är modifierade fetter för bättre emulgering. Läs om dessa tekniska emulgeringsmedel.'),

('E472b', 'Mjölksyraestrar av mono- och diglycerid', 'Lactic Acid Esters', 'e472b-mjolksyraestrar', 'Emulgeringsmedel', 'Syntetisk', 2, 'Neutral', NULL, NULL, 'Mjölksyrabaserade emulgeringsmedel', 'Mjölksyraestrar av mono- och diglycerider kombinerar mjölksyrans naturlighet med glyceridernas emulgerande egenskaper. De anses vara säkra och används brett i bageriprodukter.', 'E472b Mjölksyraestrar - Naturligt baserade emulgeringsmedel | Vihandlar.se', 'E472b baseras på naturlig mjölksyra. Läs om dessa säkra emulgeringsmedel.'),

-- Anti-caking agents
('E535', 'Natriumferrocyanid', 'Sodium Ferrocyanide', 'e535-natriumferrocyanid', 'Klumpförhindare', 'Syntetisk', 5, 'Negativ', 0.025, 'WHO/EFSA', 'Cyanidinnehållande klumpförhindare i salt', 'Natriumferrocyanid används för att förhindra klumpbildning i salt. Trots namnet innehåller det cyanid som är hårt bundet, men väcker ändå oro hos konsumenter på grund av cyanidkopplingen.', 'E535 Natriumferrocyanid - Cyanidinnehållande i salt | Vihandlar.se', 'E535 Natriumferrocyanid innehåller cyanid i bunden form. Läs om detta kontroversiella klumpförhindare.'),

('E536', 'Kaliumferrocyanid', 'Potassium Ferrocyanide', 'e536-kaliumferrocyanid', 'Klumpförhindare', 'Syntetisk', 5, 'Negativ', 0.025, 'WHO/EFSA', 'Kaliumvariant av cyanidinnehållande klumpförhindare', 'Kaliumferrocyanid är kaliumvarianten av ferrocyanid och används som klumpförhindare i salt. Liksom E535 innehåller det bundet cyanid vilket väcker säkerhetsfrågor.', 'E536 Kaliumferrocyanid - Kaliumcyanid i salt | Vihandlar.se', 'E536 Kaliumferrocyanid innehåller bundet cyanid. Läs om denna kaliumvariant av klumpförhindare.');

-- Add health effects for important new additives
UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Samma som aspartam + acesulfam"], "suspected": ["Kombinerade biverkningar"], "risk_groups": ["PKU-patienter", "Gravida", "Barn"]}',
  common_products = '[{"category": "Läsk", "products": ["Coca-Cola Zero", "Pepsi Max"], "average_amount": "100-200mg per 33cl"}]'
WHERE e_number = 'E962';

UPDATE public.e_additives SET 
  health_effects = '{"benefits": ["Naturlig fiber", "Mättnadskänsla"], "documented": ["Förbättrar matsmältning"], "risk_groups": []}',
  common_products = '[{"category": "Fiberprodukter", "products": ["Tabletter", "Pulver"], "average_amount": "500-2000mg per portion"}]'
WHERE e_number = 'E460';

UPDATE public.e_additives SET 
  health_effects = '{"documented": ["Cyanidinnehåll"], "suspected": ["Toxiska effekter vid höga doser"], "risk_groups": ["Barn", "Gravida"]}',
  common_products = '[{"category": "Salt", "products": ["Bordssalt", "Kryddsalt"], "average_amount": "10mg per kg salt"}]'
WHERE e_number IN ('E535', 'E536');