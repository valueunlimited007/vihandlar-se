-- Add high-priority E-additives batch 7 - More common colors, acids, and emulsifiers
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E133 - Brilliant Blue already added, continuing with others

-- E142 - Green S (Synthetic green dye)
('E142', 'Grön S', 'Green S', 'e142-gron-s', 'Färgämne', 'Syntetisk', 6, 'Negativ',
 5, 'EFSA', 'Kan orsaka hyperaktivitet och allergiska reaktioner hos känsliga barn.',
 '{"documented": ["Allergiska reaktioner", "Astma-anfall"], "suspected": ["Hyperaktivitet", "ADHD-förvärring"], "benefits": ["Stabil grön färg"], "risk_groups": ["Allergiker", "Astmatiker", "Känsliga barn"]}',
 '[{"category": "Godis", "products": ["Grönt lösgodis", "Mintgodis", "Gelé"], "average_amount": "10-80mg/100g"}, {"category": "Drycker", "products": ["Gröna sportdrycker", "Alcopops"], "average_amount": "5-50mg/l"}, {"category": "Glass", "products": ["Mintglass", "Pistage-glass"], "average_amount": "10-100mg/100g"}]',
 ARRAY['Undvik grön-färgade produkter till allergiska barn', 'Kontrollera reaktioner vid första intag', 'Välj naturligt färgade alternativ med klorofyll', 'Begränsa konstgjort godis'],
 ARRAY['Klorofyll (E140)', 'Spirulinaextrakt', 'Matcha', 'Spenatextrakt'],
 'Grön S (E142) är en syntetisk grön färg som kan orsaka allergiska reaktioner och hyperaktivitet.',
 'Grön S (E142) är en syntetisk azofärg som används för att skapa grön färg i livsmedel. Den kan orsaka allergiska reaktioner och har kopplats till hyperaktivitet hos känsliga barn. Många producenter har ersatt E142 med naturliga alternativ som klorofyll eller spirulina för att undvika potentiella hälsorisker.',
 'E142 Grön S - Syntetisk Grön Färg & Säkra Naturliga Alternativ',
 'E142 (Grön S): Syntetisk grön färg, allergirisker, hyperaktivitetsvarning och säkra naturliga gröna alternativ. ✓ Allergivarning ✓ Naturliga alternativ'
),

-- E160c - Paprika extract (Natural, generally safe)
('E160c', 'Paprikaextrakt', 'Paprika extract', 'e160c-paprikaextrakt', 'Färgämne', 'Naturlig', 2, 'Neutral',
 1.5, 'EFSA', 'Generellt säkert för barn men kan orsaka allergiska reaktioner hos paprika-allergiker.',
 '{"documented": ["Allergiska reaktioner hos paprika-allergiker"], "suspected": [], "benefits": ["Naturlig orange/röd färg", "Antioxidant", "Vitamin C"], "risk_groups": ["Paprika-allergiker", "Nattskuggeväxter-allergiker"]}',
 '[{"category": "Ost", "products": ["Färgad ost", "Cheddar"], "average_amount": "10-200mg/kg"}, {"category": "Snacks", "products": ["Paprika-chips", "Kryddade nötter"], "average_amount": "100-1000mg/kg"}, {"category": "Kryddor", "products": ["Paprikapulver", "Kryddblandningar"], "average_amount": "Natural levels"}]',
 ARRAY['Paprika-allergiker bör undvika', 'Testa små mängder vid osäkerhet', 'Generellt säkert för de flesta'],
 ARRAY['Naturligt paprikapulver', 'Tomatpulver', 'Morötter-extrakt', 'Beta-karoten (E160a)'],
 'Paprikaextrakt (E160c) är en naturlig orange/röd färg från paprika med antioxidant-egenskaper.',
 'Paprikaextrakt (E160c) utvinns från paprika och innehåller karotenoider som ger orange till röd färg. Det är naturligt och innehåller antioxidanter samt vitamin C. Generellt säkert men kan orsaka allergiska reaktioner hos personer som är allergiska mot paprika eller andra nattskuggeväxter.',
 'E160c Paprikaextrakt - Naturlig Paprikafärg & Antioxidanter',
 'E160c (Paprikaextrakt): Naturlig orange/röd färg från paprika, antioxidanter, vitamin C, allergivarning för paprika-känsliga. ✓ Naturlig ✓ Antioxidanter'
),

-- E210 - Benzoic acid (Preservative, moderate concern)
('E210', 'Bensoesyra', 'Benzoic acid', 'e210-bensoesyra', 'Konserveringsmedel', 'Naturlig/Syntetisk', 4, 'Neutral',
 5, 'WHO/FAO', 'Kan orsaka hyperaktivitet i kombination med färgämnen. Astmatiker bör vara försiktiga.',
 '{"documented": ["Astma-förvärring", "Allergiska reaktioner"], "suspected": ["Hyperaktivitet med färgämnen", "Hudreaktioner"], "benefits": ["Effektiv mot jäst och bakterier", "Naturligt förekommande"], "risk_groups": ["Astmatiker", "Allergiker", "Barn (med färgämnen)"]}',
 '[{"category": "Bär & Frukt", "products": ["Tranbärsjuice", "Plommoner"], "average_amount": "Natural levels"}, {"category": "Kosmetika", "products": ["Ansiktscremer", "Schampo"], "average_amount": "0.1-0.5%"}, {"category": "Såser", "products": ["Vissa marinader"], "average_amount": "100-500mg/kg"}]',
 ARRAY['Astmatiker bör undvika eller begränsa', 'Undvik kombination med konstgjorda färgämnen', 'Testa små mängder vid allergi', 'Välj alternativa konserveringsmedel'],
 ARRAY['Sorbinsyra (E200)', 'Askorbinsyra (E300)', 'Ättiksyra (E260)', 'Naturlig fermentering'],
 'Bensoesyra (E210) är ett konserveringsmedel som kan förvärra astma och orsaka allergier.',
 'Bensoesyra (E210) förekommer naturligt i bär som tranbär och plommoner, men produceras oftast syntetiskt. Det är effektivt mot jäst och bakterier i sura miljöer men kan förvärra astma och orsaka allergiska reaktioner. I kombination med konstgjorda färgämnen kan det bidra till hyperaktivitet hos känsliga barn.',
 'E210 Bensoesyra - Astmarisker, Allergier & Konserveringsalternativ',
 'E210 (Bensoesyra): Konserveringsmedel i bär och produkter, astmarisker, allergiska reaktioner och säkrare alternativ. ✓ Astmavarning'
),

-- E296 - Malic acid (Apple acid, safe)
('E296', 'Äppelsyra', 'Malic acid', 'e296-appelsyra', 'Surhetsreglerande medel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig syra från äpplen som kroppen också producerar.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig syrlig smak", "Förekommer i kroppen", "Energiproduktion"], "risk_groups": []}',
 '[{"category": "Godis", "products": ["Surt godis", "Tuggummi", "Sur fruktsmak"], "average_amount": "0.5-3%"}, {"category": "Drycker", "products": ["Fruktjuice", "Sportdrycker"], "average_amount": "0.1-1%"}, {"category": "Bakverk", "products": ["Surdegsbröd", "Fruktkakor"], "average_amount": "0.1-0.5%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturlig syra från äpplen'],
 ARRAY['Äpplen (naturlig äppelsyra)', 'Citronjuice', 'Vinäger', 'Naturliga sura frukter'],
 'Äppelsyra (E296) är en naturlig syra från äpplen som kroppen också producerar för energi.',
 'Äppelsyra (E296) är en naturlig syra som förekommer i äpplen och andra frukter. Den produceras också naturligt i kroppen som en del av energicykeln (Krebs-cykeln). Används för att ge syrlig smak och som pH-reglerare. Helt säker eftersom det är naturligt förekommande både i mat och i kroppen.',
 'E296 Äppelsyra - Naturlig Äppelsyra för Energi & Syrlig Smak',
 'E296 (Äppelsyra): Naturlig syra från äpplen, produceras i kroppen, energicykeln, säker för alla. ✓ Naturlig ✓ Kroppsegen ✓ Äpplen'
),

-- E620 - Glutamic acid (Amino acid, very safe)
('E620', 'Glutaminsyra', 'Glutamic acid', 'e620-glutaminsyra', 'Smakförstärkare', 'Naturlig', 1, 'Neutral',
 NULL, 'WHO/FAO', 'Mycket säkert för barn. Naturlig aminosyra som kroppen producerar och behöver.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig aminosyra", "Viktigt för hjärnfunktion", "Protein-byggsteen", "Umami-smak"], "risk_groups": []}',
 '[{"category": "Naturliga källor", "products": ["Tomater", "Ost", "Svamp"], "average_amount": "Natural levels"}, {"category": "Kött", "products": ["Kött", "Fisk", "Fågel"], "average_amount": "Natural levels"}, {"category": "Kryddor", "products": ["Glutamat-salt"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturlig aminosyra som kroppen behöver'],
 ARRAY['Naturlig glutamat från tomater', 'Aged ost', 'Svamp', 'Fermenterade produkter'],
 'Glutaminsyra (E620) är en naturlig aminosyra som kroppen behöver för hjärnfunktion.',
 'Glutaminsyra (E620) är en av de 20 aminosyrorna som bygger upp protein och är särskilt viktig för hjärn- och nervsystemet. Den ger den umami-smak som finns naturligt i tomater, ost och svamp. Kroppen producerar och behöver glutamat, så det är helt säkert. Det är grundformen av MSG (E621).',
 'E620 Glutaminsyra - Naturlig Aminosyra för Hjärnfunktion & Umami',
 'E620 (Glutaminsyra): Naturlig aminosyra för hjärnfunktion, umami-smak, produceras i kroppen, säker för alla. ✓ Naturlig ✓ Hjärnfunktion ✓ Aminosyra'
),

-- E901 - Beeswax (Natural, safe but not vegan)
('E901', 'Bivax', 'Beeswax', 'e901-bivax', 'Överdragsmedel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturligt vax från bin.',
 '{"documented": [], "suspected": [], "benefits": ["Naturligt skyddande överdrag", "Bevarar friskhet", "Naturligt från bin"], "risk_groups": ["Veganer", "Bi-allergiker (sällsynt)"]}',
 '[{"category": "Godis", "products": ["Glansigt godis", "Choklad"], "average_amount": "Tunt överdrag"}, {"category": "Frukt", "products": ["Vaxade äpplen", "Citrusfrukter"], "average_amount": "Tunt överdrag"}, {"category": "Kosmetika", "products": ["Läppbalsam", "Hudkrämer"], "average_amount": "Variable"}]',
 ARRAY['Inga hälsorisker - naturligt vax', 'Veganer bör kontrollera märkning', 'Kan skrapas bort från frukt om önskat'],
 ARRAY['Karnaubavax (E903 - vegansk)', 'Kandelillvax', 'Naturliga växtbaserade vax'],
 'Bivax (E901) är naturligt vax från bin som används som skyddande överdrag.',
 'Bivax (E901) produceras naturligt av bin och har använts av människor i tusentals år. Det används som överdrag på frukt, godis och som ingrediens i kosmetika. Helt säkert för människor men inte lämpligt för veganer. Det skyddar mot fukt och bevarar produkternas friskhet.',
 'E901 Bivax - Naturligt Vax från Bin för Skydd & Glans',
 'E901 (Bivax): Naturligt vax från bin, skyddande överdrag, säker för alla, inte vegansk. ✓ Naturlig ✓ Bin-produkt ✓ Säker'
),

-- E903 - Carnauba wax (Natural, vegan safe)
('E903', 'Karnaubavax', 'Carnauba wax', 'e903-karnaubavax', 'Överdragsmedel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturligt växtbaserat vax från palmträd.',
 '{"documented": [], "suspected": [], "benefits": ["Veganskt naturligt vax", "Skyddande överdrag", "Hårt och glänsande"], "risk_groups": []}',
 '[{"category": "Godis", "products": ["Glansigt godis", "Chokladöverdrag"], "average_amount": "Tunt överdrag"}, {"category": "Tabletter", "products": ["Medicintabletter", "Vitamintabletter"], "average_amount": "Tunt överdrag"}, {"category": "Kosmetika", "products": ["Läppstift", "Mascara"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt växtbaserat vax'],
 ARRAY['Bivax (E901 - icke vegansk)', 'Andra växtbaserade vax', 'Naturliga överdrag'],
 'Karnaubavax (E903) är naturligt vax från brasiliansk palmträd - perfekt för veganer.',
 'Karnaubavax (E903) utvinns från blad av den brasilianska karnaubapalmen och kallas ofta "drottningen av vax" för sina excellenta egenskaper. Det är hårdare och mer glänsande än bivax och är helt veganskt. Används för att ge glans och skydd åt godis, tabletter och kosmetika.',
 'E903 Karnaubavax - Veganskt Naturligt Palmvax från Brasilien',
 'E903 (Karnaubavax): Veganskt naturligt vax från brasiliansk palm, glänsande överdrag, säker för alla. ✓ Vegansk ✓ Naturlig ✓ Palmvax'
),

-- E331 - Sodium citrate (Safe, natural)
('E331', 'Natriumcitrat', 'Sodium citrate', 'e331-natriumcitrat', 'Surhetsreglerande medel', 'Naturlig', 2, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn. Natriumsalt av naturlig citronsyra.',
 '{"documented": [], "suspected": [], "benefits": ["Stabiliserar pH", "Emulgerar", "Naturligt natriumsalt"], "risk_groups": ["Personer på natriumrestriktiv diet"]}',
 '[{"category": "Läsk", "products": ["Sprite", "7UP", "Citrus-läsk"], "average_amount": "100-500mg/l"}, {"category": "Ost", "products": ["Smältost", "Processost"], "average_amount": "0.1-3%"}, {"category": "Konserver", "products": ["Tomatkonserver", "Fruktkonserver"], "average_amount": "100-1000mg/kg"}]',
 ARRAY['Inga särskilda försiktighetsåtgärder', 'Personer med högt blodtryck bör begränsa natriumintag generellt'],
 ARRAY['Citronsyra (E330)', 'Kalciumcitrat', 'Naturlig citronjuice'],
 'Natriumcitrat (E331) är natriumsaltet av naturlig citronsyra - säkert som pH-reglerare.',
 'Natriumcitrat (E331) är natriumsaltet av citronsyra och används som pH-reglerare och emulgeringsmedel. Det hjälper till att stabilisera surhetsgraden och förbättra texturer i produkter som smältost och läsk. Säkert för de flesta, men personer på natriumrestriktiv diet bör vara medvetna om sitt totala natriumintag.',
 'E331 Natriumcitrat - pH-reglerare från Citronsyra & Natriumbalans',
 'E331 (Natriumcitrat): Natriumsalt av citronsyra, pH-reglerare, emulgator, säkert med natriumhänsyn. ✓ Naturlig bas ✓ pH-reglerare'
),

-- E450 - Diphosphates (Common emulsifier, moderate concern)
('E450', 'Difosfater', 'Diphosphates', 'e450-difosfater', 'Emulgeringsmedel', 'Syntetisk', 4, 'Neutral',
 70, 'EFSA', 'Kan påverka mineralbalans vid höga doser. Begränsa vid njurproblem.',
 '{"documented": ["Mineralbalans-störningar vid höga doser"], "suspected": ["Påverkan på njurar", "Kalcium-fosfor imbalans"], "benefits": ["Förbättrar textur", "Emulgerar", "Bakförbättrare"], "risk_groups": ["Personer med njurproblem", "Högt fosforintag"]}',
 '[{"category": "Kött", "products": ["Korv", "Skinka", "Processade köttprodukter"], "average_amount": "0.1-0.5%"}, {"category": "Bakverk", "products": ["Bröd", "Kakor", "Bakpulver"], "average_amount": "0.2-2%"}, {"category": "Desserter", "products": ["Instant-pudding", "Cake-mix"], "average_amount": "0.5-3%"}]',
 ARRAY['Personer med njurproblem bör begränsa', 'Begränsa processade köttprodukter', 'Välj alternativ vid hög fosforkonsumtion', 'Läs ingredienslistor på bakningshjälpmedel'],
 ARRAY['Lecithin (E322)', 'Naturlig emulgering', 'Mindre processade alternativ'],
 'Difosfater (E450) kan påverka mineralbalans och bör begränsas av personer med njurproblem.',
 'Difosfater (E450) är en grupp fosforsalter som används som emulgatorer och bakförbättrare. De kan störa kroppens mineral-balans, särskilt kalcium-fosfor-balansen, vid höga doser. Personer med njurproblem bör vara särskilt försiktiga eftersom njurarna reglerar fosforbalansen i kroppen.',
 'E450 Difosfater - Mineralbalans, Njurhälsa & Emulgeringsalternativ',
 'E450 (Difosfater): Emulgatorer som kan påverka mineralbalans, njurhälsovarning, begränsa processade produkter. ✓ Njurvarning ✓ Mineralbalans'
),

-- E1200 - Polydextrose (Synthetic fiber, generally safe)
('E1200', 'Polydextros', 'Polydextrose', 'e1200-polydextros', 'Förtjockningsmedel', 'Syntetisk', 3, 'Neutral',
 NULL, 'EFSA', 'Kan orsaka magbesvär vid höga doser men är prebiotiskt och fiberlikt.',
 '{"documented": ["Laxerande effekt vid höga doser", "Gasbildning"], "suspected": [], "benefits": ["Låg kaloriinnehåll", "Prebiotisk effekt", "Fiberliknande"], "risk_groups": ["Personer med IBS", "Känsliga mag-tarmsystem"]}',
 '[{"category": "Dietprodukter", "products": ["Light-produkter", "Fiberbar"], "average_amount": "1-10g/portion"}, {"category": "Godis", "products": ["Sockerfritt godis", "Diabetikergodis"], "average_amount": "2-15g/100g"}, {"category": "Bakverk", "products": ["Fiber-berikat bröd"], "average_amount": "1-5%"}]',
 ARRAY['Börja med små mängder för att undvika magbesvär', 'Begränsa till <15g per dag initialt', 'Drick mycket vatten', 'Bra som fiberersättning men gradvis introduktion'],
 ARRAY['Naturliga fibrer', 'Pektin (E440)', 'Inulin', 'Psyllium'],
 'Polydextros (E1200) är en syntetisk fiber med låg kaloriinnehåll som kan orsaka magbesvär.',
 'Polydextros (E1200) är en syntetisk fiber med endast 1 kalori per gram jämfört med 4 för vanligt socker. Det har prebiotiska egenskaper och kan hjälpa tarmhälsan, men kan orsaka gasbildning och magbesvär vid höga doser. Används ofta i dietprodukter som fiber-ersättning.',
 'E1200 Polydextros - Syntetisk Fiber med Prebiotiska Fördelar',
 'E1200 (Polydextros): Syntetisk låg-kalorifiber, prebiotiska fördelar, magbesvär vid höga doser, dietprodukter. ✓ Fiber ✓ Låg-kalori ✓ Prebiotisk'
);

-- We now have 65+ E-additives covering most important categories