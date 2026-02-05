-- Lägg till verkligt saknade E-ämnen från Livsmedelsverkets lista
-- Fokus på viktiga E-nummer som saknas

INSERT INTO e_additives (
  e_number, name, common_name, category, slug, 
  short_description, long_description, risk_score, 
  adi_value, adi_source, origin, health_effects, 
  common_products, avoidance_tips, natural_alternatives,
  children_note, longevity_impact
) VALUES

-- SAKNADE FÄRGÄMNEN
-- E150b - Sockerkulör kaustiksulfitprocessen
('E150b', 'Sockerkulör', 'Kaustiksulfitprocessen', 'Färgämne', 'e150b-sockerkulor-kaustiksulfit',
'Brun sockerkulör framställd genom kaustiksulfitprocessen.',
'Denna typ av sockerkulör framställs genom behandling av socker med kaustiksulfit. Används för att ge brun färg åt livsmedel.',
3, NULL, 'Ej fastställt', 'Socker',
'{"positive": ["Naturligt ursprung från socker"], "negative": [], "neutral": ["Vanlig livsmedelsfärg"]}',
'{"categories": ["Läsk", "Öl", "Såser", "Bakverk"], "note": "Vanligt i mörka drycker"}',
ARRAY['Generellt säkert att använda'],
ARRAY['Karamelliserat socker', 'Mörk sirap'],
'Säkert för barn',
'Neutral'),

-- E150c - Sockerkulör ammoniakprocessen  
('E150c', 'Sockerkulör', 'Ammoniakprocessen', 'Färgämne', 'e150c-sockerkulor-ammoniak',
'Brun sockerkulör framställd genom ammoniakprocessen.',
'Framställs genom behandling av socker med ammoniak. Kan innehålla spår av 4-metylimidazol som kan vara problematiskt i stora mängder.',
4, NULL, 'Ej fastställt', 'Socker',
'{"positive": ["Naturligt ursprung"], "negative": ["Kan innehålla 4-metylimidazol"], "neutral": ["Vanligt använt"]}',
'{"categories": ["Cola", "Mörka läsk", "Såser"], "note": "Vanligt i mörka drycker"}',
ARRAY['Måttlig konsumtion av produkter med E150c', 'Variera dryckesval'],
ARRAY['E150a (enkel sockerkulör)', 'Naturligt karamelliserat socker'],
'Måttlig användning för barn',
'Negativ'),

-- E153 - Vegetabiliskt kol
('E153', 'Vegetabiliskt kol', 'Kolsvart', 'Färgämne', 'e153-vegetabiliskt-kol',
'Svart färgämne framställt från förkolnat växtmaterial.',
'Framställs genom förkolarning av växtmaterial som trä, nötter eller fruktkärnor. Används för att ge svart färg.',
2, NULL, 'Quantum satis', 'Växtmaterial',
'{"positive": ["Naturligt ursprung", "Väl tolererat"], "negative": [], "neutral": ["Ger svart färg"]}',
'{"categories": ["Godis", "Glass", "Kaviarsimulation", "Dekorationer"], "note": "Används för svart färg"}',
ARRAY['Generellt säkert'],
ARRAY['Aktivt kol (ej för färgning)', 'Naturligt svart från bläck från bläckfisk'],
'Säkert för barn',
'Neutral'),

-- SAKNADE KONSERVERINGSMEDEL

-- E219 - p-Hydroxibensoesyrametylesterns natriumsalt
('E219', 'p-Hydroxibensoesyrametylesterns natriumsalt', 'Natriumsalt av metylparaben', 'Konserveringsmedel', 'e219-natrium-metylparaben',
'Natriumsalt av metylparaben, konserveringsmedel.',
'Natriumsaltet av metylparaben (E218). Vattenlösligt konserveringsmedel med liknande egenskaper som andra parabener.',
4, 10, 'mg/kg kroppsvikt/dag - EFSA', 'Syntetisk',
'{"positive": ["Effektiv konservering"], "negative": ["Paraben", "Potentiella hormoneffekter"], "neutral": ["Vattenlösligt"]}',
'{"categories": ["Bakverk", "Såser", "Kosmetika"], "note": "Begränsad användning"}',
ARRAY['Begränsa exponering', 'Undvik vid allergi'],
ARRAY['E200-serien (sorbater)', 'Naturlig konservering'],
'Försiktighet för barn',
'Negativ'),

-- E222 - Natriumvätesulfit
('E222', 'Natriumvätesulfit', 'Natriumbisulfit', 'Konserveringsmedel', 'e222-natriumvatesulfit',
'Svavelhaltigt konserveringsmedel och antioxidant.',
'Natriumvätesulfit frigör svaveldioxid och fungerar både som konserveringsmedel och antioxidant. Kan orsaka allergiska reaktioner.',
6, 0.7, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Effektiv konservering", "Antioxidant"], "negative": ["Allergiframkallande", "Astma", "B1-vitaminförstöring"], "neutral": ["Svavelförebindelse"]}',
'{"categories": ["Vin", "Torkad frukt", "Färsk frukt", "Potatis"], "note": "Vanligt i vin"}',
ARRAY['Undvik vid svavelkänslighet', 'Allergiker ska vara försiktiga', 'Kan förstöra B1-vitamin'],
ARRAY['Askorbinsyra (E300)', 'Naturliga antioxidanter', 'Kylning'],
'Undvik för barn med astma',
'Negativ'),

-- E226 - Kalciumsulfit
('E226', 'Kalciumsulfit', 'Kalciumsalt av svavelsyrlighet', 'Konserveringsmedel', 'e226-kalciumsulfit',
'Kalciumsalt som frigör svaveldioxid för konservering.',
'Kalciumsulfit fungerar genom att frigöra svaveldioxid som har konserverande och antioxiderande effekt.',
6, 0.7, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Effektiv konservering"], "negative": ["Samma risker som svaveldioxid", "Allergiframkallande"], "neutral": ["Kalciumsalt"]}',
'{"categories": ["Torkad frukt", "Vissa bageriprodukter"], "note": "Mindre vanligt"}',
ARRAY['Samma försiktighet som för svaveldioxid'],
ARRAY['Naturlig antioxidanter', 'Kylning'],
'Försiktighet för astmatiska barn',
'Negativ'),

-- E228 - Kaliumvätesulfit  
('E228', 'Kaliumvätesulfit', 'Kaliumbisulfit', 'Konserveringsmedel', 'e228-kaliumvatesulfit',
'Kaliumsalt som fungerar som konserveringsmedel.',
'Kaliumvätesulfit frigör svaveldioxid och har samma egenskaper som andra sulfiter.',
6, 0.7, 'mg/kg kroppsvikt/dag - WHO/FAO', 'Syntetisk',
'{"positive": ["Konserverande effekt"], "negative": ["Allergiframkallande", "Astmautlösande"], "neutral": ["Kaliumsalt"]}',
'{"categories": ["Vin", "Fruktprodukter"], "note": "Används i vinindustrin"}',
ARRAY['Undvik vid svavelkänslighet'],
ARRAY['Naturlig konservering', 'Kylning'],
'Undvik för barn med andningsproblem',
'Negativ'),

-- E242 - Dimetyldikarbonat  
('E242', 'Dimetyldikarbonat', 'DMDC', 'Konserveringsmedel', 'e242-dimetyldikarbonat',
'Konserveringsmedel som bryts ner snabbt i vätskor.',
'Dimetyldikarbonat är ett konserveringsmedel som huvudsakligen används i drycker. Det bryts ner snabbt till koldioxid och metanol.',
4, NULL, 'Bryts ner snabbt', 'Syntetisk',
'{"positive": ["Bryts ner snabbt", "Effektiv mot jäst"], "negative": ["Bildade metanol"], "neutral": ["Används i drycker"]}',
'{"categories": ["Vin", "Äppelcider", "Fruktjuicer"], "note": "Huvudsakligen drycker"}',
ARRAY['Generellt säkert vid godkända nivåer'],
ARRAY['Pastörisering', 'Sterilfiltrering'],
'Säkert för barn i normala mängder',
'Neutral'),

-- E243 - Etyllauroylarginat
('E243', 'Etyllauroylarginat', 'LAE', 'Konserveringsmedel', 'e243-etyllauroylarginat',
'Konserveringsmedel framställt från naturliga aminosyror.',
'Etyllauroylarginat är ett konserveringsmedel baserat på aminosyrorna arginin och laurinsyra. Bryts ner till naturliga komponenter.',
3, 5, 'mg/kg kroppsvikt/dag - EFSA', 'Semi-naturlig',
'{"positive": ["Bryts ner naturligt", "Baserat på aminosyror"], "negative": [], "neutral": ["Relativt nytt"]}',
'{"categories": ["Kött", "Sallader", "Färdigmat"], "note": "Relativt ny konserveringsmetod"}',
ARRAY['Generellt säkert'],
ARRAY['Naturliga aminosyror', 'Kylning'],
'Säkert för barn',
'Positiv'),

-- E261 - Kaliumacetater
('E261', 'Kaliumacetater', 'Kaliumsalt av ättiksyra', 'Konserveringsmedel', 'e261-kaliumacetat',
'Kaliumsalt av ättiksyra, används som konserveringsmedel.',
'Kaliumacetat är kaliumsaltet av ättiksyra. Används som konserveringsmedel och pH-regulator.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Naturlig syra", "Säker"], "negative": [], "neutral": ["Mild konservering"]}',
'{"categories": ["Bröd", "Konserver", "Såser"], "note": "Mild konserveringseffekt"}',
ARRAY['Mycket säkert'],
ARRAY['Naturlig ättiksyra', 'Fermentering'],
'Helt säkert för barn',
'Positiv'),

-- E262 - Natriumacetater
('E262', 'Natriumacetater', 'Natriumsalt av ättiksyra', 'Konserveringsmedel', 'e262-natriumacetat',
'Natriumsalt av ättiksyra, konserveringsmedel och smakförstärkare.',
'Natriumacetat är natriumsaltet av ättiksyra. Används som konserveringsmedel och kan förstärka salt- och syrlig smak.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Från naturlig ättiksyra", "Säker"], "negative": [], "neutral": ["Smakpåverkan"]}',
'{"categories": ["Snacks", "Såser", "Pickles"], "note": "Ger syrlig smak"}',
ARRAY['Helt säkert'],
ARRAY['Naturlig vinäger', 'Citronsyra'],
'Säkert för barn',
'Positiv'),

-- E263 - Kalciumacetat
('E263', 'Kalciumacetat', 'Kalciumsalt av ättiksyra', 'Konserveringsmedel', 'e263-kalciumacetat',
'Kalciumsalt av ättiksyra för konservering och pH-kontroll.',
'Kalciumacetat fungerar som konserveringsmedel och pH-regulator. Tillför också kalcium.',
2, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Kalciumkälla", "Naturlig syra"], "negative": [], "neutral": ["Mild effekt"]}',
'{"categories": ["Bageriprodukter", "Konserver"], "note": "Tillför kalcium"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Naturlig ättiksyra', 'Kalciumkarbonat'],
'Fördelaktigt för barn (kalcium)',
'Positiv'),

-- E267 - Buffrad vinäger
('E267', 'Buffrad vinäger', 'Dehydrerad vinäger', 'Konserveringsmedel', 'e267-buffrad-vinager',
'Koncentrerad vinäger med konserverande egenskaper.',
'Buffrad vinäger är en koncentrerad form av vinäger som används som naturligt konserveringsmedel.',
1, NULL, 'Quantum satis', 'Naturlig',
'{"positive": ["Helt naturlig", "Traditionell konservering"], "negative": [], "neutral": ["Syrlig smak"]}',
'{"categories": ["Pickles", "Såser", "Marinader"], "note": "Naturlig konservering"}',
ARRAY['Helt säkert och naturligt'],
ARRAY['Färsk vinäger', 'Citronsyra'],
'Mycket säkert för barn',
'Positiv'),

-- SAKNADE ANTIOXIDANTER

-- E280 - Propionsyra
('E280', 'Propionsyra', 'Propansyra', 'Konserveringsmedel', 'e280-propionsyra',
'Naturligt förekommande fettsyra med konserverande egenskaper.',
'Propionsyra är en naturlig fettsyra som produceras av bakterier i kolon och används som konserveringsmedel mot mögel.',
3, NULL, 'Quantum satis', 'Naturlig/syntetisk',
'{"positive": ["Naturlig fettsyra", "Effektiv mot mögel"], "negative": [], "neutral": ["Kan påverka smak"]}',
'{"categories": ["Bröd", "Bakverk", "Ost"], "note": "Vanligt i bröd"}',
ARRAY['Säkert vid normal användning'],
ARRAY['Naturlig fermentering', 'Kylning'],
'Säkert för barn',
'Neutral'),

-- E281 - Natriumpropionat
('E281', 'Natriumpropionat', 'Natriumsalt av propionsyra', 'Konserveringsmedel', 'e281-natriumpropionat',
'Natriumsalt av propionsyra för konservering.',
'Natriumpropionat är det vanligaste saltet av propionsyra och används främst i bakverk för att förhindra mögeltillväxt.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Effektiv mögelskydd", "Väl studerat"], "negative": [], "neutral": ["Kan påverka smak"]}',
'{"categories": ["Bröd", "Tårtor", "Bakverk"], "note": "Standard i kommersiellt bröd"}',
ARRAY['Säkert att konsumera'],
ARRAY['Naturlig fermentering', 'Surdeg'],
'Säkert för barn',
'Neutral'),

-- E282 - Kalciumpropionat
('E282', 'Kalciumpropionat', 'Kalciumsalt av propionsyra', 'Konserveringsmedel', 'e282-kalciumpropionat',
'Kalciumsalt av propionsyra, konserveringsmedel.',
'Kalciumpropionat fungerar som konserveringsmedel och tillför även kalcium. Används främst i bakverk.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Kalciumkälla", "Mögelskydd"], "negative": [], "neutral": ["Smakpåverkan"]}',
'{"categories": ["Bröd", "Bakverk", "Vissa ostar"], "note": "Tillför kalcium"}',
ARRAY['Fördelaktigt för kalciumintag'],
ARRAY['Surdegsbröd', 'Naturlig fermentering'],
'Fördelaktigt för barn (kalcium)',
'Positiv'),

-- E283 - Kaliumpropionat
('E283', 'Kaliumpropionat', 'Kaliumsalt av propionsyra', 'Konserveringsmedel', 'e283-kaliumpropionat',
'Kaliumsalt av propionsyra för mögelkontroll.',
'Kaliumpropionat används som konserveringsmedel mot mögel, främst i bakverk och vissa mejerivaror.',
3, NULL, 'Quantum satis', 'Syntetisk',
'{"positive": ["Effektiv mögelkontroll"], "negative": [], "neutral": ["Mindre vanligt än E281/E282"]}',
'{"categories": ["Bakverk", "Vissa ostar"], "note": "Mindre vanligt"}',
ARRAY['Säkert att använda'],
ARRAY['Naturlig konservering'],
'Säkert för barn',
'Neutral'),

-- E297 - Fumarsyra
('E297', 'Fumarsyra', 'trans-Butendisyra', 'Konserveringsmedel', 'e297-fumarsyra',
'Naturlig organisk syra med konserverande egenskaper.',
'Fumarsyra är en naturlig syra som förekommer i många växter och svampar. Används som konserveringsmedel och surhetsreglerare.',
2, NULL, 'Quantum satis', 'Naturlig',
'{"positive": ["Naturligt förekommande", "Syrareglering"], "negative": [], "neutral": ["Syrlig smak"]}',
'{"categories": ["Drycker", "Bakverk", "Dessert"], "note": "Naturlig surhetsreglerare"}',
ARRAY['Mycket säkert'],
ARRAY['Citronsyra', 'Vinsteinsyra'],
'Säkert för barn',
'Positiv');