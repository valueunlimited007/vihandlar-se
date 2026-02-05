-- Stor batch med viktiga saknade E-ämnen från Livsmedelsverket 
-- Del 3: Fokus på högre nummer och viktiga kategorier

INSERT INTO e_additives (
  e_number, name, common_name, category, slug, 
  short_description, long_description, risk_score, 
  adi_value, adi_source, origin, health_effects, 
  common_products, avoidance_tips, natural_alternatives,
  children_note, longevity_impact
) VALUES

-- SAKNADE EMULGERINGSMEDEL FORTSÄTTNING

-- E429 - Peptidasbehandlad kasein
('E429', 'Peptidasbehandlad kasein', 'Enzymsbehandlat mjölkprotein', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e429-peptidasbehandlad-kasein',
'Enzymatiskt behandlat mjölkprotein för emulgering.',
'Peptidasbehandlad kasein är mjölkprotein som behandlats med enzymer för att förbättra emulgeringsegenskaperna.',
2, NULL, 'Quantum satis', 'Mjölkprotein',
'{"positive": ["Naturligt mjölkprotein", "Proteinrik"], "negative": [], "neutral": ["Innehåller laktos"]}',
'{"categories": ["Mejerivaror", "Proteinprodukter"], "note": "Funktionellt mjölkprotein"}',
ARRAY['Säkert för de flesta', 'Undvik vid mjölkallergi'],
ARRAY['Naturligt kasein', 'Andra mjölkproteiner'],
'Säkert för barn (ej vid mjölkallergi)',
'Positiv'),

-- SAKNADE OLIKA TILLSATSER

-- E445 - Glycerolestrar av trähartser
('E445', 'Glycerolestrar av trähartser', 'Hartskådestrar', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e445-glycerolestrar-trahartser',
'Estrar från naturliga trähartser för emulgering.',
'Framställs från naturliga hartser från tallar och andra träd. Används som emulgeringsmedel i drycker.',
3, 12.5, 'mg/kg kroppsvikt/dag - EFSA', 'Naturlig (träharts)',
'{"positive": ["Naturligt från träd"], "negative": [], "neutral": ["Begränsad användning"]}',
'{"categories": ["Citrusdrycker", "Aromoljer"], "note": "Emulgeringsmedel för oljor"}',
ARRAY['Säkert inom ADI-gräns'],
ARRAY['Lecithin', 'Andra emulgeringsmedel'],
'Säkert för barn inom gränser',
'Neutral'),

-- E446 - Succistearin
('E446', 'Succistearin', 'Bärnstenssyrastearin', 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel', 'e446-succistearin',
'Ester av bärnstenssyra och stearin för emulgering.',
'Succistearin är en ester som fungerar som emulgeringsmedel och stabilisator.',
3, NULL, 'Ej fastställt', 'Syntetisk',
'{"positive": ["Effektivt emulgeringsmedel"], "negative": [], "neutral": ["Sällan använt"]}',
'{"categories": ["Margarin", "Bakverk"], "note": "Sällan använt"}',
ARRAY['Säkert vid godkänd användning'],
ARRAY['Naturliga emulgeringsmedel'],
'Säkert för barn',
'Neutral'),

-- SAKNADE 500-SERIEN

-- E504 - Magnesiumkarbonater
('E504', 'Magnesiumkarbonater', 'Magnesiasalter', 'Övriga tillsatser', 'e504-magnesiumkarbonat',
'Magnesiumsalter för surareglering och mineralförstärkning.',
'Magnesiumkarbonater fungerar som surahets-reglerare och antikantmedel, samtidigt som de tillför magnesium.',
2, NULL, 'Quantum satis', 'Mineral',
'{"positive": ["Magnesiumkälla", "Surahetsregulator"], "negative": [], "neutral": ["Antiklumpmedel"]}',
'{"categories": ["Bakpulver", "Salter", "Kosttillskott"], "note": "Magnesiumtillskott"}',
ARRAY['Fördelaktigt för magnesiumintag'],
ARRAY['Naturliga magnesiumkällor'],
'Fördelaktigt för barn (magnesium)',
'Positiv'),

-- E505 - Järnkarbonat (Ferrokarbonat)
('E505', 'Järnkarbonat', 'Ferrokarbonat', 'Övriga tillsatser', 'e505-jarnkarbonat',
'Järnsalt för mineralförstärkning och färgning.',
'Järnkarbonat används för järnberikning och kan ge svag grå färgning.',
2, NULL, 'Quantum satis', 'Järnmineral',
'{"positive": ["Järnkälla", "Näringsberikning"], "negative": [], "neutral": ["Kan påverka färg"]}',
'{"categories": ["Berikat mjöl", "Kosttillskott"], "note": "Järnberikning"}',
ARRAY['Fördelaktigt för järnintag'],
ARRAY['Naturliga järnrika livsmedel som kött'],
'Fördelaktigt för barn (järn)',
'Positiv'),

-- E507 - Saltsyra (Hydrokloridsyra)
('E507', 'Saltsyra', 'Hydrokloridsyra', 'Övriga tillsatser', 'e507-saltsyra',
'Stark syra för pH-reglering i livsmedelstillverkning.',
'Saltsyra används för pH-justering i industriell livsmedelstillverkning. Neutraliseras i slutprodukten.',
3, NULL, 'Quantum satis', 'Syntetisk syra',
'{"positive": ["pH-kontroll"], "negative": [], "neutral": ["Industriell användning"]}',
'{"categories": ["Industriell bearbetning"], "note": "pH-justering"}',
ARRAY['Neutraliseras i slutprodukten'],
ARRAY['Andra syror för pH-kontroll'],
'Säkert i färdig produkt',
'Neutral'),

-- E508 - Kaliumklorid
('E508', 'Kaliumklorid', 'Kaliumsalt', 'Övriga tillsatser', 'e508-kaliumklorid',
'Kaliumsalt som saltminskning och gelningsmedel.',
'Kaliumklorid används som saltminskning med lägre natrium och som gelningsmedel.',
2, NULL, 'Quantum satis', 'Mineral',
'{"positive": ["Kaliumkälla", "Natriumminskning"], "negative": [], "neutral": ["Bitter smak i höga doser"]}',
'{"categories": ["Saltminskning", "Gelanning"], "note": "Lågnatiumulnäringsal"}',
ARRAY['Fördelaktigt som natriumalternativ'],
ARRAY['Naturligt kalium från mat'],
'Fördelaktigt för barn',
'Positiv'),

-- E509 - Kalciumklorid
('E509', 'Kalciumklorid', 'Kalciumsalt', 'Övriga tillsatser', 'e509-kalciumklorid',
'Kalciumsalt för fast struktur och mineralförstärkning.',
'Kalciumklorid håller frukt och grönsaker fasta och tillför kalcium.',
2, NULL, 'Quantum satis', 'Mineral',
'{"positive": ["Kalciumkälla", "Behåller textur"], "negative": [], "neutral": ["Saltighet"]}',
'{"categories": ["Konserver", "Pickles", "Tofu"], "note": "Strukturförstärkare"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturligt kalcium från mjölk'],
'Fördelaktigt för barn (kalcium)',
'Positiv'),

-- E510 - Ammoniumklorid
('E510', 'Ammoniumklorid', 'Salmiak', 'Övriga tillsatser', 'e510-ammoniumklorid',
'Ammoniumsalt med karakteristisk smak.',
'Ammoniumklorid ger den typiska salmiaksmakmaken och används som smakämne.',
4, NULL, 'Begränsad användning', 'Syntetisk',
'{"positive": ["Karakteristisk smak"], "negative": ["Kan vara skarp"], "neutral": ["Nordisk tradition"]}',
'{"categories": ["Salmiakgodis", "Vissa läsk"], "note": "Nordisk smaktradition"}',
ARRAY['Måttlig konsumtion', 'Stark smak'],
ARRAY['Andra naturliga smaker'],
'Måttlig användning för barn',
'Neutral'),

-- E511 - Magnesiumklorid
('E511', 'Magnesiumklorid', 'Magnesiumsalt', 'Övriga tillsatser', 'e511-magnesiumklorid',
'Magnesiumsalt för koagulering och mineralförstärkning.',
'Magnesiumklorid används för att koagulera protein och som magnesiumkälla.',
2, NULL, 'Quantum satis', 'Mineral',
'{"positive": ["Magnesiumkälla", "Proteinkoagulering"], "negative": [], "neutral": ["Saltsmak"]}',
'{"categories": ["Tofu", "Sojaprotein", "Kosttillskott"], "note": "Tofu-koagulant"}',
ARRAY['Fördelaktigt för magnesiumintag'],
ARRAY['Naturligt magnesium från gröna bladgrönsaker'],
'Fördelaktigt för barn (magnesium)',
'Positiv'),

-- E512 - Tenn(II)klorid (Stannoklorid)
('E512', 'Tenn(II)klorid', 'Stannoklorid', 'Övriga tillsatser', 'e512-tennklorid',
'Tennförebindelse som antioxidant i konserver.',
'Tenn(II)klorid används som antioxidant i vitfärgade konserver för att behålla färgen.',
5, 2, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Effektivt antioxidant"], "negative": ["Tungmetall", "Begränsad användning"], "neutral": ["Bara i konserver"]}',
'{"categories": ["Vita konserver", "Sparris", "Glass"], "note": "Färgbevarande"}',
ARRAY['Begränsa konserverintag', 'Variera kostvalued'],
ARRAY['Naturliga antioxidanter'],
'Begränsad användning för barn',
'Negativ'),

-- E513 - Svavelsyra
('E513', 'Svavelsyra', 'Sulfuric acid', 'Övriga tillsatser', 'e513-svavelsyra',
'Stark syra för industriell pH-kontroll.',
'Svavelsyra används för pH-justering i industriell livsmedelsproduktion och neutraliseras.',
3, NULL, 'Quantum satis', 'Syntetisk syra',
'{"positive": ["Effektiv pH-kontroll"], "negative": [], "neutral": ["Industriell användning"]}',
'{"categories": ["Industriell bearbetning"], "note": "pH-justering"}',
ARRAY['Neutraliseras i slutprodukt'],
ARRAY['Andra pH-regulatorer'],
'Säkert i färdig produkt',
'Neutral'),

-- E514 - Natriumsulfater
('E514', 'Natriumsulfater', 'Natriumsalt av svavelsyra', 'Övriga tillsatser', 'e514-natriumsulfat',
'Natriumsalt för texturkontroll och bearbetning.',
'Natriumsulfater används för att kontrollera textur och som bearbetningshjälpmedel.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Texturkontroll"], "negative": [], "neutral": ["Bearbetningshjälpmedel"]}',
'{"categories": ["Vissa bearbetade produkter"], "note": "Bearbetningshjälpmedel"}',
ARRAY['Säkert vid godkända nivåer'],
ARRAY['Naturliga texturförbättrare'],
'Säkert för barn',
'Neutral'),

-- E515 - Kaliumsulfater
('E515', 'Kaliumsulfater', 'Kaliumsalt av svavelsyra', 'Övriga tillsatser', 'e515-kaliumsulfat',
'Kaliumsalt för bearbetning och mineralförstärkning.',
'Kaliumsulfater används som bearbetningshjälpmedel och tillför kalium.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kaliumkälla"], "negative": [], "neutral": ["Bearbetningshjälpmedel"]}',
'{"categories": ["Bearbetningshjälp"], "note": "Kaliumkälla"}',
ARRAY['Fördelaktigt för kaliumintag'],
ARRAY['Naturligt kalium från frukt'],
'Fördelaktigt för barn',
'Positiv'),

-- E516 - Kalciumsulfat
('E516', 'Kalciumsulfat', 'Gips', 'Övriga tillsatser', 'e516-kalciumsulfat',
'Kalciumsalt för koagulering och mineralförstärkning.',
'Kalciumsulfat används för proteinkoagulering och som kalciumkälla.',
2, NULL, 'Quantum satis', 'Mineral',
'{"positive": ["Kalciumkälla", "Proteinkoagulering"], "negative": [], "neutral": ["Traditionellt koagulant"]}',
'{"categories": ["Tofu", "Bröd", "Kosttillskott"], "note": "Traditionell koagulant"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturligt kalcium från mejerivaror'],
'Fördelaktigt för barn (kalcium)',
'Positiv'),

-- E517 - Ammoniumsulfat
('E517', 'Ammoniumsulfat', 'Ammoniumsalt av svavelsyra', 'Övriga tillsatser', 'e517-ammoniumsulfat',
'Ammoniumsalt för jästnäring och bearbetning.',
'Ammoniumsulfat fungerar som näring för jäst i brödtillverkning.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Jästnäring"], "negative": [], "neutral": ["Bearbetningshjälpmedel"]}',
'{"categories": ["Bröd", "Jästprodukter"], "note": "Jästnäring"}',
ARRAY['Säkert vid brödbak'],
ARRAY['Naturliga jästnäringsämnen'],
'Säkert för barn',
'Neutral'),

-- E520 - Aluminiumsulfat
('E520', 'Aluminiumsulfat', 'Aluminiumsalt av svavelsyra', 'Övriga tillsatser', 'e520-aluminiumsulfat',
'Aluminiumsalt för klaring och bearbetning.',
'Aluminiumsulfat används för klaring av vätskor och som bearbetningshjälpmedel.',
6, 1, 'mg/kg kroppsvikt/dag - EFSA (som aluminum)', 'Syntetisk',
'{"positive": ["Effektiv klarning"], "negative": ["Aluminiumexponering", "Begränsad användning"], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Äggvitor", "Vissa bearbetningar"], "note": "Begränsad användning"}',
ARRAY['Begränsa aluminiumexponering totalt', 'Undvik onödig exponering'],
ARRAY['Naturliga klarningsmetoder'],
'Undvik för barn',
'Negativ'),

-- SAKNADE SILKAMEDEL

-- E550 - Natriumsilikater
('E550', 'Natriumsilikater', 'Natriumsalt av kiselsyra', 'Övriga tillsatser', 'e550-natriumsilikat',
'Natriumsilikater som antiklumpmedel och stabilisator.',
'Natriumsilikater förhindrar klumpbildning och fungerar som stabilisator.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Antiklumpeffekt"], "negative": [], "neutral": ["Stabilisator"]}',
'{"categories": ["Pulver", "Torrprodukter"], "note": "Antiklumpmedel"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Naturligt kiseloxid'],
'Säkert för barn',
'Neutral'),

-- E552 - Kalciumsilikat
('E552', 'Kalciumsilikat', 'Kalciumsalt av kiselsyra', 'Övriga tillsatser', 'e552-kalciumsilikat',
'Kalciumsilikat som antiklumpmedel och kalciumkälla.',
'Kalciumsilikat förhindrar klumpbildning och tillför kalcium.',
2, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kalciumkälla", "Antiklump"], "negative": [], "neutral": ["Stabilisator"]}',
'{"categories": ["Pulverprodukter", "Kryddor"], "note": "Kalciumförstärkt antiklump"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturligt kalcium'],
'Fördelaktigt för barn (kalcium)',
'Positiv'),

-- E553a - Magnesiumsilikat (Talk)
('E553a', 'Magnesiumsilikat', 'Talk', 'Övriga tillsatser', 'e553a-magnesiumsilikat',
'Naturligt mineral som antiklumpmedel.',
'Magnesiumsilikat (talk) är ett naturligt mineral som används som antiklumpmedel.',
4, NULL, 'Begränsad användning', 'Naturligt mineral',
'{"positive": ["Naturligt mineral"], "negative": ["Potentiell förorening"], "neutral": ["Antiklump"]}',
'{"categories": ["Tabletter", "Vissa pulver"], "note": "Naturligt men begränsat"}',
ARRAY['Säkerställ hög kvalitet', 'Begränsad användning'],
ARRAY['Andra naturliga antiklumpmedel'],
'Försiktig användning för barn',
'Neutral'),

-- E553b - Talkpulver
('E553b', 'Talkpulver', 'Fint talkpulver', 'Övriga tillsatser', 'e553b-talkpulver',
'Fint malet talk som antiklumpmedel.',
'Talkpulver är finmalet magnesiumsilikat som används som antiklumpmedel.',
4, NULL, 'Begränsad användning', 'Naturligt mineral',
'{"positive": ["Mycket effektivt"], "negative": ["Kvalitetskrav"], "neutral": ["Naturligt"]}',
'{"categories": ["Kosttillskott", "Tabletter"], "note": "Strikt kvalitetskontroll"}',
ARRAY['Endast farmaceutisk kvalitet'],
ARRAY['Andra antiklumpmedel'],
'Endast hög kvalitet för barn',
'Neutral'),

-- E554 - Natriumaluminiumsilikat
('E554', 'Natriumaluminiumsilikat', 'Aluminiumsilikat', 'Övriga tillsatser', 'e554-natriumaluminiumsilikat',
'Syntetiskt silikat med aluminiuminnehåll.',
'Natriumaluminiumsilikat används som antiklumpmedel men innehåller aluminium.',
6, 1, 'mg/kg kroppsvikt/dag - EFSA (som aluminium)', 'Syntetisk',
'{"positive": ["Effektivt antiklump"], "negative": ["Aluminiuminnehåll", "Begränsad användning"], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Salt", "Kryddor"], "note": "Aluminiumhaltigt"}',
ARRAY['Begränsa total aluminiumexponering', 'Undvik vid möjligt'],
ARRAY['Aluminiumfria antiklumpmedel'],
'Undvik för barn',
'Negativ'),

-- E555 - Kaliumaluminiumsilikat
('E555', 'Kaliumaluminiumsilikat', 'Kalium-aluminium silikat', 'Övriga tillsatser', 'e555-kaliumaluminiumsilikat',
'Silikat med både kalium och aluminium.',
'Kaliumaluminiumsilikat fungerar som antiklumpmedel men innehåller aluminium.',
6, 1, 'mg/kg kroppsvikt/dag - EFSA (som aluminium)', 'Syntetisk',
'{"positive": ["Kaliumkälla"], "negative": ["Aluminiuminnehåll"], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Vissa kryddor"], "note": "Aluminiumhaltigt"}',
ARRAY['Begränsa aluminiumintag totalt'],
ARRAY['Aluminiumfria alternativ'],
'Undvik för barn',
'Negativ'),

-- E556 - Kalciumaluminiumsilikat
('E556', 'Kalciumaluminiumsilikat', 'Kalcium-aluminium silikat', 'Övriga tillsatser', 'e556-kalciumaluminiumsilikat',
'Silikat med kalcium och aluminium.',
'Kalciumaluminiumsilikat används som antiklumpmedel men innehåller aluminium.',
6, 1, 'mg/kg kroppsvikt/dag - EFSA (som aluminium)', 'Syntetisk',
'{"positive": ["Kalciumkälla"], "negative": ["Aluminiuminnehåll"], "neutral": ["Teknisk funktion"]}',
'{"categories": ["Vissa torrprodukter"], "note": "Aluminiumhaltigt"}',
ARRAY['Undvik vid möjligt', 'Begränsa aluminiumtotal'],
ARRAY['Kalciumsilikat (E552)', 'Andra aluminiumfria alternativ'],
'Undvik för barn',
'Negativ'),

-- E557 - Zinksilikat
('E557', 'Zinksilikat', 'Zinksalt av kiselsyra', 'Övriga tillsatser', 'e557-zinksilikat',
'Zinksilikat som antiklumpmedel och zinkkälla.',
'Zinksilikat fungerar som antiklumpmedel och tillför zink.',
3, 15, 'mg/dag zink - rekommenderat intag', 'Syntetisk',
'{"positive": ["Zinkkälla", "Antiklump"], "negative": [], "neutral": ["Sällan använt"]}',
'{"categories": ["Kosttillskott"], "note": "Zinktillskott"}',
ARRAY['Fördelaktigt för zinkintag'],
ARRAY['Naturligt zink från kött'],
'Fördelaktigt för barn (zink)',
'Positiv');