-- Lägger till ett urval av verkligt saknade E-nummer från slutet av Livsmedelsverkets lista
-- Fokuserar på höga nummer som säkert saknas

INSERT INTO e_additives (
  e_number, name, common_name, category, slug, 
  short_description, long_description, risk_score, 
  adi_value, adi_source, origin, health_effects, 
  common_products, avoidance_tips, natural_alternatives,
  children_note, longevity_impact
) VALUES

-- HÖGRE E-NUMMER SOM SÄKERT SAKNAS

-- E586 - 4-hexylresorcinol
('E586', '4-hexylresorcinol', 'Hexylresorcinol', 'Antioxidationsmedel', 'e586-4-hexylresorcinol',
'Syntetiskt antioxidant som förhindrar färgförändringar.',
'4-hexylresorcinol används för att förhindra brunfärgning av färsk frukt och skaldjur.',
4, 0.5, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Förhindrar brunfärgning"], "negative": ["Syntetisk kemikalie"], "neutral": ["Begränsad användning"]}',
'{"categories": ["Färsk frukt", "Skaldjur"], "note": "Anti-brunfärgning"}',
ARRAY['Begränsa till godkända användningar'],
ARRAY['Naturliga antioxidanter som citronsyra'],
'Begränsad användning för barn',
'Negativ'),

-- E626 - Guanylsyra
('E626', 'Guanylsyra', '5-Guanylat', 'Övriga tillsatser', 'e626-guanylsyra',
'Nukleotid som fungerar som smakförstärkare.',
'Guanylsyra är en nukleotid som förstärker umami-smak, ofta i kombination med glutamat.',
3, NULL, 'Quantum satis', 'Syntetisk/mikrobiell',
'{"positive": ["Förstärker naturlig smak"], "negative": [], "neutral": ["Synergistisk med glutamat"]}',
'{"categories": ["Snacks", "Kryddor", "Färdigrätter"], "note": "Smakförstärkare"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Naturliga smaker och kryddor'],
'Säkert för barn',
'Neutral'),

-- E627 - Dinatriumguanylat
('E627', 'Dinatriumguanylat', 'Natriumsalt av guanylsyra', 'Övriga tillsatser', 'e627-dinatriumguanylat',
'Natriumsalt av guanylsyra för smakförstärkning.',
'Dinatriumguanylat är en kraftfull smakförstärkare som ofta kombineras med MSG.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kraftfull smakförstärkare"], "negative": [], "neutral": ["Synergistisk effekt"]}',
'{"categories": ["Snacks", "Kryddmixer", "Färdigrätter"], "note": "Kombineras med MSG"}',
ARRAY['Säkert vid normal konsumtion'],
ARRAY['Naturliga umami-källor som svamp'],
'Säkert för barn',
'Neutral'),

-- E628 - Dikaliumguanylat
('E628', 'Dikaliumguanylat', 'Kaliumsalt av guanylsyra', 'Övriga tillsatser', 'e628-dikaliumguanylat',
'Kaliumsalt av guanylsyra för smakförstärkning.',
'Dikaliumguanylat fungerar som smakförstärkare och tillför kalium istället för natrium.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Smakförstärkare", "Kalium istället för natrium"], "negative": [], "neutral": ["Ersätter natriumvarianten"]}',
'{"categories": ["Hälsosamma snacks", "Kryddor"], "note": "Kaliumalternativ"}',
ARRAY['Fördelaktigt kaliumalternativ'],
ARRAY['Naturliga umami-smaker'],
'Fördelaktigt för barn (kalium)',
'Positiv'),

-- E629 - Kalciumguanylat
('E629', 'Kalciumguanylat', 'Kalciumsalt av guanylsyra', 'Övriga tillsatser', 'e629-kalciumguanylat',
'Kalciumsalt av guanylsyra för smak och mineraltillförsel.',
'Kalciumguanylat kombinerar smakförstärkning med kalciumtillförsel.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kalciumkälla", "Smakförstärkning"], "negative": [], "neutral": ["Kombinerar funktioner"]}',
'{"categories": ["Funktionella snacks"], "note": "Dubbelfunktion"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturliga umami och kalciumkällor'],
'Fördelaktigt för barn',
'Positiv'),

-- E630 - Inosinsyra
('E630', 'Inosinsyra', '5-Inosinat', 'Övriga tillsatser', 'e630-inosinsyra',
'Nukleotid för smakförstärkning.',
'Inosinsyra är en nukleotid som förstärker umami-smak, naturligt förekommande i kött.',
3, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Förstärker naturlig smak", "Naturligt i kött"], "negative": [], "neutral": ["Smakförstärkare"]}',
'{"categories": ["Snacks", "Kryddblandningar"], "note": "Naturlig i kött"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Naturliga kötteksrakts smak'],
'Säkert för barn',
'Neutral'),

-- E631 - Dinatriuminosinat
('E631', 'Dinatriuminosinat', 'Natriumsalt av inosinsyra', 'Övriga tillsatser', 'e631-dinatriuminosinat',
'Natriumsalt av inosinsyra för intensiv smakförstärkning.',
'Dinatriuminosinat är en mycket kraftfull smakförstärkare som multiplicerar MSG:s effekt.',
4, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Mycket kraftfull smakförstärkning"], "negative": ["Kan maskera dålig råvarukvalitet"], "neutral": ["Synergistisk med MSG"]}',
'{"categories": ["Snacks", "Färdigrätter", "Kryddor"], "note": "Mycket kraftfull"}',
ARRAY['Använd måttligt', 'Prioritera naturliga smaker'],
ARRAY['Naturliga umami-källor'],
'Måttlig användning för barn',
'Negativ'),

-- E632 - Dikaliuminosinat
('E632', 'Dikaliuminosinat', 'Kaliumsalt av inosinsyra', 'Övriga tillsatser', 'e632-dikaliuminosinat',
'Kaliumsalt av inosinsyra för smakförstärkning.',
'Dikaliuminosinat fungerar som smakförstärkare och tillför kalium.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kaliumkälla", "Smakförstärkare"], "negative": [], "neutral": ["Kaliumalternativ"]}',
'{"categories": ["Kaliumberikade snacks"], "note": "Hälsosammare alternativ"}',
ARRAY['Fördelaktigt kaliumalternativ'],
ARRAY['Naturligt kalium och smak'],
'Fördelaktigt för barn',
'Positiv'),

-- E633 - Kalciuminosinat
('E633', 'Kalciuminosinat', 'Kalciumsalt av inosinsyra', 'Övriga tillsatser', 'e633-kalciuminosinat',
'Kalciumsalt av inosinsyra för smak och nutrition.',
'Kalciuminosinat kombinerar smakförstärkning med kalciumtillförsel.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kalciumkälla", "Smakförstärkning"], "negative": [], "neutral": ["Dubbel funktion"]}',
'{"categories": ["Funktionella livsmedel"], "note": "Kombinerad funktion"}',
ARRAY['Fördelaktigt för kalcium'],
ARRAY['Naturliga källor för båda funktionerna'],
'Fördelaktigt för barn',
'Positiv'),

-- E634 - Kalcium-5'-ribonukleotider
('E634', 'Kalcium-5-ribonukleotider', 'Kalciumsalt av ribonukleotider', 'Övriga tillsatser', 'e634-kalcium-ribonukleotider',
'Kalciumsalt av ribonukleotider för smakförstärkning.',
'Kalcium-5-ribonukleotider kombinerar flera nukleotider för optimal smakförstärkning med kalciumtillförsel.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kalciumkälla", "Komplex smakförstärkning"], "negative": [], "neutral": ["Nukleotidkombination"]}',
'{"categories": ["Premium snacks", "Funktionella livsmedel"], "note": "Avancerad smakförstärkning"}',
ARRAY['Fördelaktigt för näringsintag'],
ARRAY['Naturliga smakkombinationer'],
'Fördelaktigt för barn',
'Positiv'),

-- E640 - Glycin
('E640', 'Glycin', 'Enklaste aminosyran', 'Övriga tillsatser', 'e640-glycin',
'Naturlig aminosyra med sötande och smakförstärkande egenskaper.',
'Glycin är den enklaste aminosyran och ger mild sötma samtidigt som den förstärker andra smaker.',
1, NULL, 'Quantum satis', 'Naturlig aminosyra',
'{"positive": ["Naturlig aminosyra", "Mild sötma", "Proteinbyggsten"], "negative": [], "neutral": ["Mild smakpåverkan"]}',
'{"categories": ["Kosttillskott", "Funktionella livsmedel"], "note": "Naturlig aminosyra"}',
ARRAY['Mycket säkert och naturligt'],
ARRAY['Proteinrika livsmedel'],
'Mycket säkert för barn',
'Positiv'),

-- E641 - L-Leucin
('E641', 'L-Leucin', 'Essentiell aminosyra', 'Övriga tillsatser', 'e641-l-leucin',
'Essentiell aminosyra viktigt för muskelprotein.',
'L-Leucin är en essentiell aminosyra som är särskilt viktig för muskeluppbyggnad och smakförstärkning.',
1, NULL, 'Quantum satis', 'Naturlig aminosyra',
'{"positive": ["Essentiell aminosyra", "Muskeluppbyggnad", "Naturlig"], "negative": [], "neutral": ["Proteinkomponent"]}',
'{"categories": ["Kosttillskott", "Proteinprodukter"], "note": "Essentiell aminosyra"}',
ARRAY['Mycket fördelaktigt för muskelbygge'],
ARRAY['Proteinrika livsmedel som kött och mjölk'],
'Mycket fördelaktigt för barn',
'Positiv'),

-- E650 - Zinkacetat
('E650', 'Zinkacetat', 'Zinksalt av ättiksyra', 'Övriga tillsatser', 'e650-zinkacetat',
'Zinksalt av ättiksyra för zinkberikning.',
'Zinkacetat är en bigtillgänglig form av zink som används för näringsberikring.',
2, 15, 'mg/dag zink - rekommenderat intag', 'Syntetisk',
'{"positive": ["Zinkkälla", "Bigtillgängligt"], "negative": [], "neutral": ["Metallsmak vid höga doser"]}',
'{"categories": ["Kosttillskott", "Berikade livsmedel"], "note": "Zinkberikning"}',
ARRAY['Fördelaktigt för zinkintag'],
ARRAY['Naturligt zink från kött och nötter'],
'Fördelaktigt för barn (zink)',
'Positiv');