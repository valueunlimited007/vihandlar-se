-- Final batch: Viktiga höga E-nummer från Livsmedelsverkets lista
-- Målsättning: närma oss 316-330 E-ämnen totalt

INSERT INTO e_additives (
  e_number, name, common_name, category, slug, 
  short_description, long_description, risk_score, 
  adi_value, adi_source, origin, health_effects, 
  common_products, avoidance_tips, natural_alternatives,
  children_note, longevity_impact
) VALUES

-- KRITISKA SAKNADE HÖGA E-NUMMER FRÅN LIVSMEDELSVERKET

-- E442 - Ammoniumfosfatider
('E442', 'Ammoniumfosfatider', 'Ammoniumsalter av fosfatidsyra', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e442-ammoniumfosfatider',
'Ammoniumsalter av fosfatidsyra för emulgering.',
'Ammoniumfosfatider är syntetiska emulgerare som används i choklad och bakverk.',
4, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Effektiv emulgering"], "negative": ["Syntetiskt"], "neutral": ["Vanligt i choklad"]}',
'{"categories": ["Choklad", "Bakverk"], "note": "Choklademulgering"}',
ARRAY['Säkert vid normal konsumtion'],
ARRAY['Naturligt lecitin'],
'Säkert för barn',
'Neutral'),

-- E444 - Sackarosacetatisobutyrat
('E444', 'Sackarosacetatisobutyrat', 'SAIB', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e444-sackarosacetatisobutyrat',
'Modifierad sackaros för densitetskontroll i drycker.',
'SAIB används för att matcha densiteten hos aromolja med vatten i drycker.',
4, 10, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Densitetskontroll"], "negative": ["Kemiskt modifierad sackaros"], "neutral": ["Specialiserad användning"]}',
'{"categories": ["Läsk", "Aromade drycker"], "note": "Densitetsutjämnare"}',
ARRAY['Säkert inom ADI-gräns'],
ARRAY['Naturliga emulgeringsmedel'],
'Säkert för barn inom gränser',
'Neutral'),

-- E451 - Trifosfater
('E451', 'Trifosfater', 'Trinatriumfosfat', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e451-trifosfater',
'Komplexa natriumfosfater för emulgering och pH-kontroll.',
'Trifosfater används för att förbättra textur och emulgering i bearbetade livsmedel.',
5, 70, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Texturförbättring"], "negative": ["Fosfatöverskott", "Påverkar mineraler"], "neutral": ["Vanligt i bearbetad mat"]}',
'{"categories": ["Korv", "Kött", "Ost"], "note": "Texturförbättrare"}',
ARRAY['Begränsa bearbetade livsmedel', 'Balansera med kalciumrika livsmedel'],
ARRAY['Naturliga texturförbättrare'],
'Begränsad användning för barn',
'Negativ'),

-- E452 - Polyfosfater
('E452', 'Polyfosfater', 'Komplexa natriumpolyfosfater', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e452-polyfosfater',
'Komplexa fosfatkedjor för avancerad texturkontroll.',
'Polyfosfater bildar långa kedjor som kraftigt förbättrar textur i bearbetade produkter.',
6, 70, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Kraftfull texturförbättring"], "negative": ["Starkt fosfatöverskott", "Kan påverka njurar"], "neutral": ["Industriell standard"]}',
'{"categories": ["Korv", "Färdigmat", "Fiskprodukter"], "note": "Industriell texturförbättring"}',
ARRAY['Undvik vid njurproblem', 'Begränsa starkt bearbetade produkter'],
ARRAY['Naturlig textur från hemlagad mat'],
'Undvik för barn',
'Negativ'),

-- E456 - Kaliumpolyaspartat
('E456', 'Kaliumpolyaspartat', 'Polymeriserat kaliumaspartat', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e456-kaliumpolyaspartat',
'Polymere aminosyra för texturförbättring.',
'Kaliumpolyaspartat är en polymeriserad aminosyra som förbättrar textur.',
3, NULL, 'Quantum satis', 'Syntetisk (från aminosyra)',
'{"positive": ["Från aminosyra", "Kaliumkälla"], "negative": [], "neutral": ["Polymer"]}',
'{"categories": ["Vissa specialprodukter"], "note": "Begränsad användning"}',
ARRAY['Säkert vid godkänd användning'],
ARRAY['Naturliga texturförbättrare'],
'Säkert för barn',
'Neutral'),

-- E459 - Betacyklodextrin
('E459', 'Betacyklodextrin', 'Cirkulär stärkelsemolekyl', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e459-betacyklodextrin',
'Cirkulär stärkelsemolekyl för inkapsling av aromämnen.',
'Betacyklodextrin har en hålighet som kan kapsla in aromämnen och skydda dem.',
2, NULL, 'Quantum satis', 'Modifierad stärkelse',
'{"positive": ["Från stärkelse", "Aromskydd"], "negative": [], "neutral": ["Inkapslingsteknologi"]}',
'{"categories": ["Aromade produkter", "Funktionella livsmedel"], "note": "Arominkapsling"}',
ARRAY['Säkert och tekniskt avancerat'],
ARRAY['Naturlig stärkelse'],
'Säkert för barn',
'Positiv'),

-- E462 - Etylcellulosa
('E462', 'Etylcellulosa', 'Etylrad cellulosa', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e462-etylcellulosa',
'Modifierad cellulosa för filmbildning och förtjockning.',
'Etylcellulosa är kemiskt modifierad cellulosa som bildar filmer och förtjockar.',
3, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Från cellulosa"], "negative": ["Kemisk modifiering"], "neutral": ["Filmbildare"]}',
'{"categories": ["Tabletter", "Filmer"], "note": "Filmbildande"}',
ARRAY['Säkert vid godkänd användning'],
ARRAY['Naturlig cellulosa'],
'Säkert för barn',
'Neutral'),

-- E464 - Hydroxipropylmetylcellulosa
('E464', 'Hydroxipropylmetylcellulosa', 'HPMC', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e464-hydroxipropylmetylcellulosa',
'Modifierad cellulosa för gelering och filmbildning.',
'HPMC är en mångsidigt modifierad cellulosa som bildar termoreversibla geler.',
2, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Termoreversibel", "Från cellulosa"], "negative": [], "neutral": ["Teknisk polymer"]}',
'{"categories": ["Vegetariska kapslar", "Vissa livsmedel"], "note": "Vegetariansk gelatinalternativ"}',
ARRAY['Säkert och vegetarianskt'],
ARRAY['Naturlig gelatin'],
'Säkert för barn',
'Positiv'),

-- E465 - Metyletylcellulosa
('E465', 'Metyletylcellulosa', 'MEC', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e465-metyletylcellulosa',
'Dubbelmodifierad cellulosa för specialfunktioner.',
'Metyletylcellulosa kombinerar egenskaper från både metyl- och etylcellulosa.',
3, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Kombinerade egenskaper"], "negative": ["Komplex modifiering"], "neutral": ["Sällan använt"]}',
'{"categories": [], "note": "Mycket sällan använt"}',
ARRAY['Säkert vid användning'],
ARRAY['Enklare cellulosaderivat'],
'Säkert för barn',
'Neutral'),

-- E466 - Natriumkarboximetylcellulosa
('E466', 'Natriumkarboximetylcellulosa', 'CMC-natrium', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e466-natriumkarboximetylcellulosa',
'Vattenlöslig cellulosamodifiering för förtjockning.',
'CMC-natrium är en av de vanligaste cellulosaderivaten för förtjockning.',
2, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Från cellulosa", "Mycket effektiv"], "negative": [], "neutral": ["Vanligt använt"]}',
'{"categories": ["Glass", "Såser", "Veganska produkter"], "note": "Vanlig förtjockare"}',
ARRAY['Säkert och effektivt'],
ARRAY['Naturliga förtjockningsmedel'],
'Säkert för barn',
'Positiv'),

-- E468 - Tvärbunden natriumkarboximetylcellulosa
('E468', 'Tvärbunden natriumkarboximetylcellulosa', 'Tvärbunden CMC', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e468-tvarbunden-cmc',
'Tvärbunden cellulosamodifiering för stabilare gelering.',
'Tvärbunden CMC har förbättrad stabilitet och gelningsförmåga.',
3, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Förbättrad stabilitet"], "negative": ["Komplex kemisk modifiering"], "neutral": ["Specialiserat"]}',
'{"categories": ["Specialprodukter"], "note": "Förbättrad version"}',
ARRAY['Säkert vid godkänd användning'],
ARRAY['Vanlig CMC'],
'Säkert för barn',
'Neutral'),

-- E469 - Enzymatiskt hydrolyserad karboximetylcellulosa
('E469', 'Enzymatiskt hydrolyserad karboximetylcellulosa', 'Enzymnedbruten CMC', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e469-enzymatiskt-hydrolyserad-cmc',
'Enzymatiskt nedbruten CMC för kontrollerad viskositet.',
'Genom enzymatisk nedbrytning får denna CMC kontrollerade egenskaper.',
2, NULL, 'Quantum satis', 'Enzymatiskt modifierad cellulosa',
'{"positive": ["Enzymatisk process", "Kontrollerade egenskaper"], "negative": [], "neutral": ["Avancerad teknologi"]}',
'{"categories": ["Avancerade livsmedel"], "note": "Precisionsmodifierad"}',
ARRAY['Säkert och tekniskt avancerat'],
ARRAY['Standard CMC'],
'Säkert för barn',
'Positiv'),

-- E470a - Natrium-, kalium- och kalciumsalter av fettsyror
('E470a', 'Natrium-, kalium- och kalciumsalter av fettsyror', 'Fettsyresalter', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e470a-fettsyresalter',
'Salter av naturliga fettsyror för emulgering.',
'Fettsyresalter är naturliga emulgeringsmedel baserade på vanliga fettsyror.',
2, NULL, 'Quantum satis', 'Naturlig (fettsyror)',
'{"positive": ["Från naturliga fettsyror", "Mineralförstärkning"], "negative": [], "neutral": ["Vanliga salter"]}',
'{"categories": ["Bakverk", "Margarin"], "note": "Naturliga emulgeringsmedel"}',
ARRAY['Helt säkert och naturligt'],
ARRAY['Äggula', 'Naturligt lecitin'],
'Mycket säkert för barn',
'Positiv'),

-- E470b - Magnesiumsalter av fettsyror
('E470b', 'Magnesiumsalter av fettsyror', 'Magnesium fettsyresalter', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e470b-magnesiumsalter-fettsyror',
'Magnesiumsalter av naturliga fettsyror.',
'Magnesiumsalter av fettsyror fungerar som emulgerare och tillför magnesium.',
2, NULL, 'Quantum satis', 'Naturlig (fettsyror + magnesium)',
'{"positive": ["Magnesiumkälla", "Naturliga fettsyror"], "negative": [], "neutral": ["Emulgerare"]}',
'{"categories": ["Bakverk", "Kosttillskott"], "note": "Magnesiumförstärkt"}',
ARRAY['Fördelaktigt för magnesiumintag'],
ARRAY['Naturligt magnesium från gröna bladgrönsaker'],
'Fördelaktigt för barn (magnesium)',
'Positiv'),

-- CELLULOSA FORTSÄTTNING

-- E463a - Lågsubstituerad hydroxipropylcellulosa
('E463a', 'Lågsubstituerad hydroxipropylcellulosa', 'L-HPC', 'Övriga tillsatser', 'e463a-lagsubstituerad-hydroxipropylcellulosa',
'Lågsubstituerad cellulosamodifiering för särskilda egenskaper.',
'L-HPC har unika svällningsegenskaper och används i specialtillämpningar.',
2, NULL, 'Quantum satis', 'Modifierad cellulosa',
'{"positive": ["Kontrollerad svällning"], "negative": [], "neutral": ["Specialiserad cellulosaderivat"]}',
'{"categories": ["Tabletter", "Specialprodukter"], "note": "Kontrollerad svällning"}',
ARRAY['Säkert vid användning'],
ARRAY['Andra cellulosaderivat'],
'Säkert för barn',
'Neutral'),

-- VIKTIGA EMULGERINGSMEDEL FORTSÄTTNING

-- E472c - Mono- och diglyceriders citronsyraestrar
('E472c', 'Mono- och diglyceriders citronsyraestrar', 'Citrem', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e472c-mono-diglycerider-citronsyra',
'Mono- och diglycerider modifierade med citronsyra.',
'Citronsyraestrar av mono- och diglycerider har förbättrade emulgeringsegenskaper.',
3, NULL, 'Quantum satis', 'Modifierade naturliga fetter',
'{"positive": ["Från naturliga fetter", "Förbättrade egenskaper"], "negative": [], "neutral": ["Kemisk modifiering"]}',
'{"categories": ["Bakverk", "Margarin"], "note": "Förbättrat emulgeringsmedel"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Vanliga mono- och diglycerider'],
'Säkert för barn',
'Neutral'),

-- E472d - Mono- och diglyceriders vinsyraestrar
('E472d', 'Mono- och diglyceriders vinsyraestrar', 'DATEM med vinsyra', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e472d-mono-diglycerider-vinsyra',
'Mono- och diglycerider modifierade med vinsyra.',
'Vinsyraestrar av mono- och diglycerider förbättrar deg-egenskaper.',
3, NULL, 'Quantum satis', 'Modifierade naturliga fetter',
'{"positive": ["Förbättrar brödegenskaper", "Från naturliga källor"], "negative": [], "neutral": ["Bageritillsats"]}',
'{"categories": ["Bröd", "Bakverk"], "note": "Brödförbättrare"}',
ARRAY['Säkert för brödkonsumtion'],
ARRAY['Naturlig jäst och degtekniker'],
'Säkert för barn',
'Neutral'),

-- E472e - Mono- och diglyceriders mono- och diacetylvinsyraestrar
('E472e', 'Mono- och diglyceriders mono- och diacetylvinsyraestrar', 'DATEM', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e472e-datem',
'Komplexa estrar för avancerad degbehandling.',
'DATEM är en komplex ester som kraftigt förbättrar degstrukturen.',
3, NULL, 'Quantum satis', 'Komplex modifiering',
'{"positive": ["Förbättrar degstruktur"], "negative": [], "neutral": ["Komplex kemi"]}',
'{"categories": ["Industriellt bröd", "Bakverk"], "note": "Professionell degförbättrare"}',
ARRAY['Säkert i färdiga produkter'],
ARRAY['Naturliga degförbättringsmetoder'],
'Säkert för barn',
'Neutral'),

-- E472f - Blandade ättik- och vinsyraestrar av mono- och diglycerider
('E472f', 'Blandade ättik- och vinsyraestrar av mono- och diglycerider', 'Blandade estrar', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e472f-blandade-estrar',
'Kombination av ättik- och vinsyraestrar för optimerade egenskaper.',
'Denna kombination ger optimerade emulgerings- och degegenskaper.',
3, NULL, 'Quantum satis', 'Modifierade naturliga fetter',
'{"positive": ["Optimerade egenskaper"], "negative": [], "neutral": ["Komplexa blandningar"]}',
'{"categories": ["Premium bakverk"], "note": "Optimerad prestanda"}',
ARRAY['Säkert i bakverk'],
ARRAY['Enklare emulgeringsmedel'],
'Säkert för barn',
'Neutral'),

-- E473 - Sackarosestrar av fettsyror
('E473', 'Sackarosestrar av fettsyror', 'Sockerfettsyraestrar', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e473-sackarosestrar',
'Estrar av vanligt socker och fettsyror för emulgering.',
'Sackarosestrar är emulgeringsmedel gjorda av vanligt socker och naturliga fettsyror.',
3, 30, 'mg/kg kroppsvikt/dag - EFSA', 'Semi-naturlig',
'{"positive": ["Från socker och naturliga fettsyror"], "negative": [], "neutral": ["Emulgeringsmedel"]}',
'{"categories": ["Bakverk", "Glass"], "note": "Socker-fett emulgering"}',
ARRAY['Säkert inom ADI'],
ARRAY['Naturligt lecitin'],
'Säkert för barn inom gränser',
'Neutral'),

-- E474 - Sackarosestrar i blandning med mono- och diglycerider
('E474', 'Sackarosestrar i blandning med mono- och diglycerider', 'Kombinerade estrar', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e474-sackarosestrar-blandning',
'Kombination av sockerestrar och mono-/diglycerider.',
'Denna blandning kombinerar egenskaper från båda emulgeringstyperna.',
3, 30, 'mg/kg kroppsvikt/dag - EFSA', 'Semi-naturlig',
'{"positive": ["Kombinerade fördelar"], "negative": [], "neutral": ["Komplex blandning"]}',
'{"categories": ["Bakverk", "Margarin"], "note": "Kombinerad emulgering"}',
ARRAY['Säkert inom ADI-gräns'],
ARRAY['Enklare emulgeringsmedel'],
'Säkert för barn inom gränser',
'Neutral'),

-- E475 - Polyglycerolestrar av fettsyror
('E475', 'Polyglycerolestrar av fettsyror', 'PGE', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e475-polyglycerolestrar',
'Komplexa estrar för avancerad emulgering.',
'PGE är komplexa emulgeringsmedel med mångsidiga egenskaper.',
4, 7.5, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Mångsidiga egenskaper"], "negative": ["Komplex syntes"], "neutral": ["Avancerad teknologi"]}',
'{"categories": ["Margarin", "Bakverk"], "note": "Avancerat emulgeringsmedel"}',
ARRAY['Säkert inom ADI-värde'],
ARRAY['Enklare naturliga emulgeringsmedel'],
'Säkert för barn inom gränser',
'Neutral'),

-- E476 - Polyglycerolpolyricinoleat
('E476', 'Polyglycerolpolyricinoleat', 'PGPR', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e476-pgpr',
'Syntetiskt emulgeringsmedel för choklad och konfekt.',
'PGPR är specialiserat för att minska viskositeten i chokladmassa.',
4, 7.5, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Mycket effektiv i choklad"], "negative": ["Syntetiskt"], "neutral": ["Specialiserad användning"]}',
'{"categories": ["Choklad", "Konfekt"], "note": "Chokladspecialist"}',
ARRAY['Säkert inom ADI för chokladälskare'],
ARRAY['Naturligt lecitin i choklad'],
'Säkert för barn inom gränser',
'Neutral'),

-- E477 - 1,2-Propylenglykolestrar av fettsyror
('E477', '1,2-Propylenglykolestrar av fettsyror', 'Propylenglykolemulgerare', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e477-propylenglykolestrar',
'Estrar av propylenglykol och fettsyror för emulgering.',
'Dessa estrar är effektiva emulgeringsmedel för många tillämpningar.',
4, 25, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Effektiv emulgering"], "negative": ["Från propylenglykol"], "neutral": ["Industriell standard"]}',
'{"categories": ["Bakverk", "Margarin"], "note": "Industriellt emulgeringsmedel"}',
ARRAY['Säkert inom ADI-värde'],
ARRAY['Naturliga emulgeringsmedel'],
'Säkert för barn inom gränser',
'Neutral');