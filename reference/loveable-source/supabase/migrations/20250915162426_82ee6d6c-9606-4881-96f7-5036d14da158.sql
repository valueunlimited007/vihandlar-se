-- Fortsätter med komplettering av E-ämnes databasen
-- Del 2: Fler viktiga E-nummer från Livsmedelsverket

INSERT INTO e_additives (
  e_number, name, common_name, category, slug, 
  short_description, long_description, risk_score, 
  adi_value, adi_source, origin, health_effects, 
  common_products, avoidance_tips, natural_alternatives,
  children_note, longevity_impact
) VALUES

-- SAKNADE ANTIOXIDANTER FORTSÄTTNING

-- E308 - Gamma-tokoferol
('E308', 'Gamma-tokoferol', 'Vitamin E gamma', 'Antioxidationsmedel', 'e308-gamma-tokoferol',
'Naturlig form av vitamin E med antioxidantegenskaper.',
'Gamma-tokoferol är en av de naturliga formerna av vitamin E och fungerar som antioxidant i livsmedel.',
1, NULL, 'Quantum satis', 'Naturlig vitamin E',
'{"positive": ["Vitamin E", "Naturligt antioxidant", "Hälsofördelaktigt"], "negative": [], "neutral": ["Sällan tillsatt"]}',
'{"categories": ["Oljor", "Kosttillskott", "Nötter"], "note": "Naturlig vitamin E"}',
ARRAY['Helt säkert och fördelaktigt'],
ARRAY['Naturliga nötter', 'Solrosolja', 'Vetegroddar'],
'Fördelaktigt för barn',
'Positiv'),

-- E309 - Delta-tokoferol
('E309', 'Delta-tokoferol', 'Vitamin E delta', 'Antioxidationsmedel', 'e309-delta-tokoferol',
'En av de naturliga formerna av vitamin E.',
'Delta-tokoferol är en mindre vanlig form av naturlig vitamin E som används som antioxidant.',
1, NULL, 'Quantum satis', 'Naturlig vitamin E',
'{"positive": ["Naturlig vitamin E", "Antioxidant"], "negative": [], "neutral": ["Minst aktiv E-vitamin form"]}',
'{"categories": ["Oljor", "Kosttillskott"], "note": "Naturlig men mindre aktiv"}',
ARRAY['Helt säkert'],
ARRAY['Naturliga E-vitaminkällor'],
'Säkert för barn',
'Positiv'),

-- SAKNADE 300-SERIEN FORTSÄTTNING

-- E332 - Kaliumcitrater
('E332', 'Kaliumcitrater', 'Kaliumsalt av citronsyra', 'Antioxidationsmedel', 'e332-kaliumcitrat',
'Kaliumsalt av citronsyra, antioxidant och pH-regulator.',
'Kaliumcitrat fungerar som antioxidant och pH-regulator. Tillför kalium och har mild alkaliserande effekt.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Kaliumkälla", "pH-regulator"], "negative": [], "neutral": ["Mild smakpåverkan"]}',
'{"categories": ["Drycker", "Konserver", "Bakpulver"], "note": "pH-regulator"}',
ARRAY['Säkert och kan vara fördelaktigt'],
ARRAY['Naturlig citronsyra', 'Bananer (kalium)'],
'Fördelaktigt för barn (kalium)',
'Positiv'),

-- E333 - Kalciumcitrater
('E333', 'Kalciumcitrater', 'Kalciumsalt av citronsyra', 'Antioxidationsmedel', 'e333-kalciumcitrat',
'Kalciumsalt av citronsyra för antioxidation och mineralförstärkning.',
'Kalciumcitrat fungerar som antioxidant och är en bigtillgänglig kalciumkälla. Används både för konservering och näring.',
1, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Kalciumkälla", "Bigtillgängligt", "Antioxidant"], "negative": [], "neutral": ["Kan påverka surhetsgrad"]}',
'{"categories": ["Kosttillskott", "Fruktjuicer", "Funktionella livsmedel"], "note": "Näringstillskott"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturliga kalciumkällor som mjölk'],
'Mycket fördelaktigt för barn',
'Positiv'),

-- E334 - L-Vinsyra
('E334', 'L-Vinsyra', 'Naturlig vinsyra', 'Antioxidationsmedel', 'e334-l-vinsyra',
'Naturlig syra från druvor med antioxidantegenskaper.',
'L-Vinsyra är en naturlig syra som finns i druvor och används som antioxidant och surhetsreglerare.',
2, NULL, 'Quantum satis', 'Naturlig (druvor)',
'{"positive": ["Naturlig från druvor", "pH-regulator"], "negative": [], "neutral": ["Syrlig smak"]}',
'{"categories": ["Vin", "Bakpulver", "Godis"], "note": "Naturlig druvsyra"}',
ARRAY['Helt säkert och naturligt'],
ARRAY['Färska druvor', 'Citronsyra'],
'Säkert för barn',
'Positiv'),

-- E335 - Natriumtartrater
('E335', 'Natriumtartrater', 'Natriumsalt av vinsyra', 'Antioxidationsmedel', 'e335-natriumtartrat',
'Natriumsalt av vinsyra för antioxidation och pH-kontroll.',
'Natriumtartrat är natriumsaltet av naturlig vinsyra och fungerar som antioxidant och stabilisator.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Från naturlig vinsyra"], "negative": [], "neutral": ["Stabilisator"]}',
'{"categories": ["Bakverk", "Konditoriprodukter"], "note": "Stabilisator"}',
ARRAY['Säkert att använda'],
ARRAY['Naturlig vinsyra'],
'Säkert för barn',
'Neutral'),

-- E336 - Kaliumtartrater
('E336', 'Kaliumtartrater', 'Kaliumsalt av vinsyra', 'Antioxidationsmedel', 'e336-kaliumtartrat',
'Kaliumsalt av vinsyra, antioxidant och stabilisator.',
'Kaliumtartrat fungerar som antioxidant och stabilisator, samtidigt som det tillför kalium.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Kaliumkälla", "Från naturlig vinsyra"], "negative": [], "neutral": ["Stabiliserande effekt"]}',
'{"categories": ["Bakverk", "Vin"], "note": "Bakningshjälpmedel"}',
ARRAY['Fördelaktigt för kaliumintag'],
ARRAY['Naturlig vinsyra från druvor'],
'Fördelaktigt för barn',
'Positiv'),

-- E337 - Natriumkaliumtartrat
('E337', 'Natriumkaliumtartrat', 'Seignettesalt', 'Antioxidationsmedel', 'e337-natriumkaliumtartrat',
'Dubbelt salt av vinsyra med stabiliserande egenskaper.',
'Natriumkaliumtartrat är en dubbel salt av vinsyra som används som stabilisator och emulgeringsmedel.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Stabilisator", "Från vinsyra"], "negative": [], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Konditoriprodukter", "Tekniska tillämpningar"], "note": "Stabilisator"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Andra naturliga stabilisatorer'],
'Säkert för barn',
'Neutral'),

-- E339 - Natriumfosfater
('E339', 'Natriumfosfater', 'Natriumsalt av fosforsyra', 'Antioxidationsmedel', 'e339-natriumfosfat',
'Natriumfosfater används som antioxidant och emulgeringsmedel.',
'Natriumfosfater har mångsidiga funktioner som antioxidant, emulgeringsmedel och pH-regulator i livsmedel.',
4, 70, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Mångsidiga funktioner"], "negative": ["Kan påverka kalciumupptagning", "Fosfatöverskott"], "neutral": ["Vanligt använt"]}',
'{"categories": ["Kött", "Korv", "Ost", "Drycker"], "note": "Multifunktionell"}',
ARRAY['Begränsa intag av mycket bearbetade livsmedel', 'Balansera med kalciumrika livsmedel'],
ARRAY['Naturliga antioxidanter', 'Citronsyra'],
'Måttlig användning för barn',
'Negativ'),

-- E340 - Kaliumfosfater
('E340', 'Kaliumfosfater', 'Kaliumsalt av fosforsyra', 'Antioxidationsmedel', 'e340-kaliumfosfat',
'Kaliumfosfater fungerar som antioxidant och mineralförstärkning.',
'Kaliumfosfater har liknande egenskaper som natriumfosfater men tillför kalium istället för natrium.',
4, 70, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Kaliumkälla"], "negative": ["Fosfatöverskott"], "neutral": ["Ersätter natrium"]}',
'{"categories": ["Kött", "Mejerivaror", "Bakprodukter"], "note": "Kaliumkälla"}',
ARRAY['Måttlig användning', 'Balansera med naturligt kalium'],
ARRAY['Bananer', 'Naturligt kalium'],
'Måttlig användning för barn',
'Neutral'),

-- E343 - Magnesiumfosfater
('E343', 'Magnesiumfosfater', 'Magnesiumsalt av fosforsyra', 'Antioxidationsmedel', 'e343-magnesiumfosfat',
'Magnesiumfosfater tillför magnesium och fungerar som antioxidant.',
'Magnesiumfosfater används både för sina tekniska egenskaper och som magnesiumkälla.',
3, 70, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Magnesiumkälla"], "negative": ["Fosfatgrupp"], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Kosttillskott", "Vissa livsmedel"], "note": "Magnesiumtillförsel"}',
ARRAY['Fördelaktigt för magnesiumintag'],
ARRAY['Naturliga magnesiumkällor som nötter'],
'Fördelaktigt för barn (magnesium)',
'Positiv'),

-- SAKNADE 400-SERIEN - EMULGERINGSMEDEL

-- E402 - Kaliumalginat
('E402', 'Kaliumalginat', 'Kaliumsalt av alginsyra', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e402-kaliumalginat',
'Kaliumsalt av naturlig alginsyra från bruna alger.',
'Kaliumalginat utvinns från bruna alger och används som förtjockningsmedel och stabilisator.',
2, NULL, 'Quantum satis', 'Naturlig (alger)',
'{"positive": ["Naturligt från alger", "Fiberlikt"], "negative": [], "neutral": ["Förtjockningsmedel"]}',
'{"categories": ["Glass", "Såser", "Sallader"], "note": "Naturlig algfiber"}',
ARRAY['Helt säkert och naturligt'],
ARRAY['Naturlig agar', 'Gelatin'],
'Säkert för barn',
'Positiv'),

-- E403 - Ammoniumalginat
('E403', 'Ammoniumalginat', 'Ammoniumsalt av alginsyra', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e403-ammoniumalginat',
'Ammoniumsalt av alginsyra för gelering och stabilisering.',
'Ammoniumalginat har liknande egenskaper som andra alginater men används mer sällan.',
2, NULL, 'Quantum satis', 'Naturlig (alger)',
'{"positive": ["Naturlig algfiber"], "negative": [], "neutral": ["Mindre vanligt använt"]}',
'{"categories": ["Speciella tillämpningar"], "note": "Sällan använt"}',
ARRAY['Säkert vid användning'],
ARRAY['Andra naturliga alginater'],
'Säkert för barn',
'Neutral'),

-- E404 - Kalciumalginat
('E404', 'Kalciumalginat', 'Kalciumsalt av alginsyra', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e404-kalciumalginat',
'Kalciumsalt av alginsyra med geilerande egenskaper.',
'Kalciumalginat bildar starka geler och används i molekylär gastronomi och livsmedelsindustrin.',
2, NULL, 'Quantum satis', 'Naturlig (alger)',
'{"positive": ["Naturligt från alger", "Kalciumkälla"], "negative": [], "neutral": ["Molekylär gastronomi"]}',
'{"categories": ["Molekylär gastronomi", "Glass"], "note": "Speciell gelering"}',
ARRAY['Helt säkert'],
ARRAY['Naturlig gelatin', 'Agar'],
'Säkert för barn',
'Positiv'),

-- E408 - Bakjästglukan
('E408', 'Bakjästglukan', 'Beta-glukan från jäst', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e408-bakjastglukan',
'Naturlig beta-glukan från bakjäst med hälsofördelar.',
'Bakjästglukan är en naturlig fibertyp från jäst som har immunstärkande och kolesterolsänkande effekter.',
1, NULL, 'Quantum satis', 'Naturlig (jäst)',
'{"positive": ["Immunförstärkande", "Kolesterolsänkande", "Naturlig fiber"], "negative": [], "neutral": ["Funktionell fiber"]}',
'{"categories": ["Funktionella livsmedel", "Kosttillskott", "Bröd"], "note": "Hälsofrämjande fiber"}',
ARRAY['Mycket fördelaktigt för hälsan'],
ARRAY['Havre', 'Korn', 'Svamp'],
'Mycket fördelaktigt för barn',
'Positiv'),

-- E409 - Arabinogalaktan
('E409', 'Arabinogalaktan', 'Fiber från lärkträd', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e409-arabinogalaktan',
'Naturlig fiber från lärkträd med prebiotiska egenskaper.',
'Arabinogalaktan är en naturlig fiber som fungerar som prebiotikum och stärker immunförsvaret.',
1, NULL, 'Quantum satis', 'Naturlig (träd)',
'{"positive": ["Prebiotisk", "Immunförstärkande", "Naturlig fiber"], "negative": [], "neutral": ["Från träd"]}',
'{"categories": ["Kosttillskott", "Funktionella livsmedel"], "note": "Prebiotisk fiber"}',
ARRAY['Mycket hälsofrämjande'],
ARRAY['Andra prebiotiska fibrer'],
'Mycket fördelaktigt för barn',
'Positiv'),

-- E411 - Havrekärnmjöl
('E411', 'Havrekärnmjöl', 'Fiber från havre', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e411-havrekarnmjol',
'Naturlig fiber från havre med kolesterolsänkande effekter.',
'Havrekärnmjöl innehåller beta-glukan som sänker kolesterol och stabiliserar blodsockret.',
1, NULL, 'Quantum satis', 'Naturlig (havre)',
'{"positive": ["Kolesterolsänkande", "Blodsockerstabiliserande", "Naturlig fiber"], "negative": [], "neutral": ["Förtjockningsmedel"]}',
'{"categories": ["Funktionella livsmedel", "Bakverk"], "note": "Hälsofibrer"}',
ARRAY['Mycket hälsofrämjande'],
ARRAY['Hel havre', 'Havremjöl'],
'Mycket fördelaktigt för barn',
'Positiv'),

-- E419 - Gummi ghatti
('E419', 'Gummi ghatti', 'Naturligt trädgummi', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e419-gummi-ghatti',
'Naturligt gummi från Anogeissus latifolia träd.',
'Gummi ghatti är ett naturligt trädgummi som används som emulgeringsmedel och stabilisator.',
2, NULL, 'Quantum satis', 'Naturlig (träd)',
'{"positive": ["Naturligt trädgummi"], "negative": [], "neutral": ["Sällan använt i Europa"]}',
'{"categories": [], "note": "Mycket sällan använt"}',
ARRAY['Säkert vid användning'],
ARRAY['Gummi arabicum', 'Xantangummi'],
'Säkert för barn',
'Neutral'),

-- E424 - Curdlan
('E424', 'Curdlan', 'Mikrobiell polysackarid', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e424-curdlan',
'Naturlig polysackarid från bakterier med unika gelerande egenskaper.',
'Curdlan produceras av bakterier och bildar termostabila geler som tål uppvärmning.',
2, NULL, 'Quantum satis', 'Mikrobiell',
'{"positive": ["Naturlig från bakterier", "Termostabil"], "negative": [], "neutral": ["Speciell gelering"]}',
'{"categories": ["Kött", "Sås"], "note": "Termostabil gelering"}',
ARRAY['Säkert och naturligt'],
ARRAY['Andra naturliga gelatiniseringsmedel'],
'Säkert för barn',
'Positiv'),

-- E428 - Gellan
('E428', 'Gellan', 'Mikrobiell polysackarid', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e428-gellan',
'Mikrobiell polysackarid med exceptionella gelerande egenskaper.',
'Gellan produceras av bakterien Sphingomonas elodea och bildar mycket starka geler vid låga koncentrationer.',
2, NULL, 'Quantum satis', 'Mikrobiell',
'{"positive": ["Mycket effektiv", "Naturlig från bakterier"], "negative": [], "neutral": ["Hög koncentrationseffekt"]}',
'{"categories": ["Drycker", "Konfekt", "Vegetariska produkter"], "note": "Mycket effektiv"}',
ARRAY['Säkert och effektivt'],
ARRAY['Agar', 'Gelatin'],
'Säkert för barn',
'Positiv');