-- Complete Phase 1: Update the 7 most common incomplete E-additives with comprehensive data
-- Using correct longevity_impact values: Neutral, Positiv, Negativ

-- E481 - Natriumstearoyl-2-laktylat
UPDATE e_additives SET
  common_name = 'Natriumstearoyllaktylat',
  short_description = 'En emulgeringsmedel som används för att förbättra deg- och bakegenskaper',
  long_description = 'Natriumstearoyl-2-laktylat är en syntetisk emulgeringsmedel som bildas genom reaktion mellan stearinsyra och mjölksyra. Det används främst i bakverk för att förbättra degstyrka, volym och hållbarhet. Denna tillsats hjälper till att skapa en jämnare textur och förlänger produkternas hållbarhet.',
  risk_score = 2,
  origin = 'Syntetisk',
  longevity_impact = 'Neutral',
  adi_value = 20.0,
  adi_source = 'EFSA',
  children_note = 'Inga särskilda begränsningar för barn',
  health_effects = '{"documented": ["Generellt säker för konsumtion", "Vältolererad av de flesta människor"], "suspected": [], "benefits": ["Förbättrar brödens textur och volym", "Förlänger hållbarhet"], "risk_groups": ["Personer med mjölkproteinallergi bör vara försiktiga"]}',
  common_products = '["Bröd och bakprodukter", "Kakor och kex", "Pizza- och pastadeg", "Tortillas", "Degprodukter"]',
  avoidance_tips = ARRAY['Läs ingrediensförteckningar på bakprodukter', 'Välj ekologiska alternativ', 'Baka hemma med naturliga ingredienser'],
  natural_alternatives = ARRAY['Lecithin', 'Äggula', 'Naturlig degförbättrare'],
  meta_title = 'E481 Natriumstearoyl-2-laktylat - Emulgeringsmedel i bröd',
  meta_description = 'E481 är en emulgeringsmedel som förbättrar degegenskaper i bröd och bakverk. Läs om säkerhet, användning och hälsoeffekter.',
  is_published = true
WHERE e_number = 'E481';

-- E482 - Kalciumstearoyl-2-laktylat  
UPDATE e_additives SET
  common_name = 'Kalciumstearoyllaktylat',
  short_description = 'En emulgeringsmedel som stärker deg och förbättrar bakresultat',
  long_description = 'Kalciumstearoyl-2-laktylat är en degförstärkare och emulgeringsmedel som används för att förbättra brödens struktur och volym. Det hjälper till att skapa en finare porstruktur och gör brödet mjukare och mer hållbart över tid. Denna tillsats är särskilt vanlig i kommersiella bröd och bakprodukter.',
  risk_score = 2,
  origin = 'Syntetisk',
  longevity_impact = 'Neutral',
  adi_value = 20.0,
  adi_source = 'EFSA',
  children_note = 'Säker för barn i normala mängder',
  health_effects = '{"documented": ["Säker för de flesta människor", "Vältolererad"], "suspected": [], "benefits": ["Förbättrar brödens kvalitet", "Minskar behov av andra tillsatser"], "risk_groups": ["Personer med mjölkproteinallergi"]}',
  common_products = '["Bröd och bullar", "Wienerbrö och sött bröd", "Fryst degprodukter", "Industriella bakprodukter", "Glutenfria bröd"]',
  avoidance_tips = ARRAY['Kontrollera ingredienslistor', 'Välj hantverksbagerier', 'Baka eget bröd'],
  natural_alternatives = ARRAY['Ägg', 'Naturlig jäst', 'Surdeg'],
  meta_title = 'E482 Kalciumstearoyl-2-laktylat - Degförstärkare i bröd',
  meta_description = 'E482 förbättrar degstyrka och brödens kvalitet. Information om säkerhet, användning och naturliga alternativ.',
  is_published = true
WHERE e_number = 'E482';

-- E491 - Sorbitanmonostearat
UPDATE e_additives SET
  common_name = 'Span 60',
  short_description = 'Emulgeringsmedel som binder samman vatten och fett',
  long_description = 'Sorbitanmonostearat är en emulgeringsmedel som hjälper till att blanda vatten och fett i livsmedelsprodukter. Det används för att skapa stabila emulsioner och förbättra texturen i många produkter. Denna tillsats är särskilt användbar i bakverk, godis och mejeriproduktimiteringar.',
  risk_score = 2,
  origin = 'Syntetisk',
  longevity_impact = 'Neutral',
  adi_value = 25.0,
  adi_source = 'EFSA',
  children_note = 'Säker för barn enligt fastställda gränsvärden',
  health_effects = '{"documented": ["Generellt säker för konsumtion", "Inga kända allvarliga biverkningar"], "suspected": [], "benefits": ["Förbättrar produktstabilitet", "Minskar separation av ingredienser"], "risk_groups": ["Inga kända riskgrupper"]}',
  common_products = '["Bakverk och kakor", "Glass och frysta desserter", "Choklad och konfektyr", "Margariner", "Blandningar för bakning"]',
  avoidance_tips = ARRAY['Läs ingrediensförteckningar noga', 'Välj produkter med färre tillsatser', 'Använd naturliga emulgeringsmedel hemma'],
  natural_alternatives = ARRAY['Lecithin', 'Äggula', 'Naturlig honung'],
  meta_title = 'E491 Sorbitanmonostearat - Emulgeringsmedel i bakverk',
  meta_description = 'E491 stabiliserar emulsioner i bakverk och godis. Läs om säkerhet, användningsområden och hälsoeffekter.',
  is_published = true
WHERE e_number = 'E491';

-- E494 - Sorbitanmonooleat
UPDATE e_additives SET
  common_name = 'Span 80',
  short_description = 'Emulgeringsmedel för stabila vatten-i-olja emulsioner',
  long_description = 'Sorbitanmonooleat är en kraftfull emulgeringsmedel som används för att skapa stabila vatten-i-olja emulsioner. Det används främst i bakverk, margariner och andra produkter där en jämn blandning av vatten och fett krävs. Denna tillsats hjälper till att förhindra separation och förlänger produkternas hållbarhet.',
  risk_score = 2,
  origin = 'Syntetisk',
  longevity_impact = 'Neutral',
  adi_value = 25.0,
  adi_source = 'EFSA',
  children_note = 'Säker för barn i rekommenderade doser',
  health_effects = '{"documented": ["Säker för normalt intag", "Vältolererad av de flesta"], "suspected": [], "benefits": ["Förbättrar produktkonsistens", "Förlänger hållbarhet"], "risk_groups": ["Inga specifika riskgrupper identifierade"]}',
  common_products = '["Margariner och bredbart fett", "Bakverk och tårtor", "Chokladprodukter", "Krämiga såser och dressingar", "Frozen desserts"]',
  avoidance_tips = ARRAY['Kontrollera produktetiketter', 'Välj ekologiska alternativ', 'Tillaga mer hemlagad mat'],
  natural_alternatives = ARRAY['Solroslechithin', 'Äggula', 'Naturlig bivax'],
  meta_title = 'E494 Sorbitanmonooleat - Emulgeringsmedel i margarin',
  meta_description = 'E494 skapar stabila emulsioner i margariner och bakverk. Information om säkerhet och användning.',
  is_published = true
WHERE e_number = 'E494';

-- E504 - Magnesiumkarbonater
UPDATE e_additives SET
  common_name = 'Magnesiumkarbonat',
  short_description = 'Surhetsreglerande medel och antiklumpningsmedel',
  long_description = 'Magnesiumkarbonater används som surhetsreglerande medel, antiklumpningsmedel och förtjockningsmedel i livsmedel. Det hjälper till att kontrollera pH-värden och förhindrar att pulverformiga produkter klumpar ihop sig. Som ett naturligt mineral är det också en källa till magnesium.',
  risk_score = 1,
  origin = 'Naturlig/Syntetisk',
  longevity_impact = 'Positiv',
  adi_value = null,
  adi_source = 'EFSA - Ingen ADI nödvändig',
  children_note = 'Säker för barn, kan till och med bidra med magnesium',
  health_effects = '{"documented": ["Säker och naturlig", "Källa till magnesium", "Hjälper neutralisera syra"], "suspected": [], "benefits": ["Bidrar med magnesium", "Naturlig pH-buffert", "Stödjer matsmältningen"], "risk_groups": ["Personer med njurproblem bör begränsa intaget"]}',
  common_products = '["Bakpulver och jäspulver", "Pulverformiga drycker", "Tabletter och kosttillskott", "Kött- och fiskprodukter", "Mjölkprodukter"]',
  avoidance_tips = ARRAY['Generellt inte nödvändigt att undvika', 'Kontrollera med läkare vid njurproblem', 'Naturlig och säker tillsats'],
  natural_alternatives = ARRAY['Natriumbikarbonat', 'Kalciumkarbonat', 'Citronsyra'],
  meta_title = 'E504 Magnesiumkarbonater - Naturlig surhetsreglerare',
  meta_description = 'E504 är en säker och naturlig surhetsreglerare som också bidrar med magnesium. Läs om användning och fördelar.',
  is_published = true
WHERE e_number = 'E504';

-- E507 - Saltsyra
UPDATE e_additives SET
  common_name = 'Saltsyra, Hydrokloridsyra',
  short_description = 'Stark syra som används för surhetsreglering',
  long_description = 'Saltsyra är en stark oorganisk syra som används för att justera pH-värden i livsmedel. Den används också i livsmedelsindustrin för rengöring och sterilisering av utrustning. I mycket små mängder kan den användas som surhetsreglerande medel i vissa livsmedelsprodukter.',
  risk_score = 3,
  origin = 'Syntetisk',
  longevity_impact = 'Neutral',
  adi_value = null,
  adi_source = 'EFSA - Quantum satis (så mycket som behövs)',
  children_note = 'Säker i de små mängder som används i livsmedel',
  health_effects = '{"documented": ["Säker i tillåtna mängder", "Används i mycket små kvantiteter"], "suspected": ["Kan irritera i höga koncentrationer"], "benefits": ["Effektiv pH-kontroll", "Bidrar till livsmedelssäkerhet"], "risk_groups": ["Personer med känslig mage", "Barn - endast i mycket små mängder"]}',
  common_products = '["pH-justerade drycker", "Konserverade kött- och fiskprodukter", "Vissa ostsorter", "Industriellt processade livsmedel", "Sojasås och andra fermenterade produkter"]',
  avoidance_tips = ARRAY['Vanligtvis används i så små mängder att undvikande inte är nödvändigt', 'Kontrollera etiketter vid magsensitivitet', 'Välj mindre processade livsmedel'],
  natural_alternatives = ARRAY['Citronsyra', 'Vinäger', 'Vinsyra'],
  meta_title = 'E507 Saltsyra - Surhetsreglerare i livsmedel',
  meta_description = 'E507 saltsyra används för pH-kontroll i livsmedel. Information om säkerhet och användning i små mängder.',
  is_published = true
WHERE e_number = 'E507';

-- E509 - Kalciumklorid
UPDATE e_additives SET
  common_name = 'Kalciumklorid',
  short_description = 'Stabiliseringsmedel och kalciumkälla',
  long_description = 'Kalciumklorid används som stabiliseringsmedel, förtjockningsmedel och kalciumkälla i livsmedel. Det hjälper till att bevara frukternas och grönsakernas fasthet vid konservering och kan förbättra texturen i olika produkter. Som ett kalciumsalt bidrar det också med detta viktiga mineral.',
  risk_score = 1,
  origin = 'Naturlig/Syntetisk',
  longevity_impact = 'Positiv',
  adi_value = null,
  adi_source = 'EFSA - Ingen ADI nödvändig',
  children_note = 'Säker för barn och bidrar med kalcium',
  health_effects = '{"documented": ["Säker och naturlig", "Källa till kalcium", "Stödjer benhälsa"], "suspected": [], "benefits": ["Bidrar med kalcium", "Stärker benvävnad", "Naturligt mineral"], "risk_groups": ["Personer med njursten (kalciumoxalat) bör vara försiktiga"]}',
  common_products = '["Konserverade frukter och grönsaker", "Ostprodukter", "Sportdrycker", "Tofuprodukter", "Fryst mat"]',
  avoidance_tips = ARRAY['Generellt inte nödvändigt att undvika', 'Konsultera läkare vid njurstensproblematik', 'Naturlig och nyttig tillsats'],
  natural_alternatives = ARRAY['Kalciumcitrat', 'Kalciumkarbonat', 'Naturliga kalciumkällor'],
  meta_title = 'E509 Kalciumklorid - Stabiliseringsmedel och kalciumkälla',
  meta_description = 'E509 stabiliserar livsmedel och bidrar med kalcium. Läs om användning, fördelar och säkerhet.',
  is_published = true
WHERE e_number = 'E509';