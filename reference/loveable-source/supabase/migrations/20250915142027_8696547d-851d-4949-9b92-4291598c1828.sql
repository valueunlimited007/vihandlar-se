-- Add high-priority E-additives batch 4 - Common emulsifiers, thickeners, and more preservatives
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E322 - Lecithin (Natural emulsifier, safe)
('E322', 'Lecitin', 'Soy/Sunflower lecithin', 'e322-lecitin', 'Emulgeringsmedel', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Säkert för barn. Naturlig fettemulgator som finns i ägg och soja.',
 '{"documented": [], "suspected": [], "benefits": ["Emulgerar fett och vatten", "Naturligt näringsämne", "Stödjer hjärnfunktion"], "risk_groups": ["Sällsynt: sojaallergiker"]}',
 '[{"category": "Choklad", "products": ["Mjölkchoklad", "Mörk choklad", "Godis"], "average_amount": "0.1-0.5%"}, {"category": "Bakverk", "products": ["Bröd", "Kakor", "Tårtor"], "average_amount": "0.2-1%"}, {"category": "Margarin", "products": ["Smör-alternativ", "Matfett"], "average_amount": "0.5-2%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och säkert', 'Sojaallergiker kan välja solroslecitin'],
 ARRAY['Äggula (naturligt lecitin)', 'Solroslecitin (E322)', 'Naturlig emulgering'],
 'Lecitin (E322) är en naturlig emulgator som finns i ägg, soja och solrosor - helt säker att använda.',
 'Lecitin (E322) är en naturlig fettemulgator som finns naturligt i äggula, soja och solrosfrön. Det hjälper att blanda fett och vatten i produkter som choklad och bakverk. Lecitin är inte bara säkert utan också nyttigt - det stödjer hjärnfunktion och cellmembran. Industriellt lecitin utvinns oftast från soja eller solrosor.',
 'E322 Lecitin - Naturlig Emulgator från Soja & Solrosor',
 'E322 (Lecitin): Naturlig emulgator från ägg, soja och solrosor, hjärnhälsa, säker för alla åldrar. ✓ Naturlig ✓ Hälsosam ✓ Säker'
),

-- E407 - Carrageenan (Controversial thickener)
('E407', 'Karragenan', 'Carrageenan', 'e407-karragenan', 'Förtjockningsmedel', 'Naturlig', 6, 'Negativ',
 75, 'EFSA', 'Kan orsaka magtarmbesvär. Begränsa för känsliga barn.',
 '{"documented": ["Mag-tarmirritationer", "Inflammatoriska reaktioner"], "suspected": ["IBS-förvärring", "Tarmbarriärskador"], "benefits": ["Naturlig förtjockning", "Vegansk gelatinalternativ"], "risk_groups": ["Personer med IBS", "Känsliga mag-tarmsystem", "Spädbarn"]}',
 '[{"category": "Mejeri", "products": ["Grädde", "Glass", "Yoghurt"], "average_amount": "0.01-0.5%"}, {"category": "Kött-alternativ", "products": ["Vegetarisk korv", "Veganskt kött"], "average_amount": "0.1-1%"}, {"category": "Desserter", "products": ["Pudding", "Mousse", "Gelé"], "average_amount": "0.05-0.8%"}]',
 ARRAY['Personer med IBS bör undvika', 'Begränsa för känsliga barn', 'Kontrollera veganska produkter särskilt', 'Välj karragenanfria alternativ när möjligt'],
 ARRAY['Agar-agar', 'Pektin', 'Gelatin (icke-vegansk)', 'Guarkärnmjöl', 'Xantangummi'],
 'Karragenan (E407) är en naturlig förtjockare från havsalger som kan orsaka mag-tarmbesvär.',
 'Karragenan (E407) utvinns från röda havsalger och används som förtjocknings- och stabiliseringsmedel. Trots att det är naturligt kan det orsaka inflammatoriska reaktioner i mag-tarmsystemet, särskilt hos känsliga personer. Forskning visar att det kan skada tarmbarriären och förvärra IBS. Många väljer att undvika det trots EFSA:s godkännande.',
 'E407 Karragenan - Mag-tarmbesvär, IBS & Naturliga Alternativ',
 'E407 (Karragenan): Naturlig förtjockare från havsalger, mag-tarmbesvär, IBS-risker och säkrare alternativ. ✓ Hälsovarning ✓ Naturliga alternativ'
),

-- E410 - Johannesbrödkärnmjöl (Safe thickener)
('E410', 'Johannesbrödkärnmjöl', 'Locust bean gum', 'e410-johannesbrodnjonmol', 'Förtjockningsmedel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn. Naturlig fiber från johannesbrödträd.',
 '{"dokumenterade": [], "misstänkta": [], "fördelar": ["Naturlig fiber", "Prebiotisk effekt", "Glutenfri förtjockare"], "riskgrupper": []}',
 '[{"category": "Glass", "products": ["Mjukglass", "Gelato", "Sorbet"], "average_amount": "0.1-0.5%"}, {"category": "Glutenfritt", "products": ["Glutenfritt bröd", "GF-bakverk"], "average_amount": "0.2-1%"}, {"category": "Såser", "products": ["Salladsdressing", "Dip-såser"], "average_amount": "0.1-0.8%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och säkert'],
 ARRAY['Guarkärnmjöl', 'Xantangummi', 'Majsstärkelse', 'Potatismjöl'],
 'Johannesbrödkärnmjöl (E410) är en säker naturlig förtjockare från medelhavsträdet johannesbrödträd.',
 'Johannesbrödkärnmjöl (E410) utvinns från frön av johannesbrödträdet som växer i Medelhavet. Det är en ren naturlig fiber som fungerar som förtjocknings- och stabiliseringsmedel. Har också prebiotiska egenskaper som kan gynna tarmhälsan. Helt säkert att använda och särskilt värdefullt i glutenfria produkter.',
 'E410 Johannesbrödkärnmjöl - Säker Naturlig Förtjockare & Fiber',
 'E410 (Johannesbrödkärnmjöl): Naturlig förtjockare från johannesbrödträd, prebiotisk fiber, säker för alla. ✓ Naturlig ✓ Hälsosam ✓ Glutenfri'
),

-- E412 - Guarkärnmjöl (Safe thickener)  
('E412', 'Guarkärnmjöl', 'Guar gum', 'e412-guarkarnmjol', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral',
 10, 'WHO/FAO', 'Säkert i normala mängder men kan orsaka gasbildning i höga doser.',
 '{"documented": ["Gasbildning vid höga doser"], "suspected": ["Mag-tarmbesvär vid överkonsumtion"], "benefits": ["Naturlig fiber", "Sänker kolesterol", "Glutenfri"], "risk_groups": ["Personer med tarmkänslighet vid höga doser"]}',
 '[{"category": "Glutenfritt", "products": ["Glutenfritt bröd", "GF-pizza"], "average_amount": "0.2-2%"}, {"category": "Glass", "products": ["Mjukglass", "Frozen yogurt"], "average_amount": "0.1-0.5%"}, {"category": "Såser", "products": ["Ketchup", "Dressingar"], "average_amount": "0.1-1%"}]',
 ARRAY['Börja med små mängder vid hemmabakning', 'Drick mycket vatten när du äter produkter med guarkärnmjöl', 'Undvik höga doser vid tarmkänslighet'],
 ARRAY['Johannesbrödkärnmjöl (E410)', 'Xantangummi (E415)', 'Majsstärkelse', 'Potatismjöl'],
 'Guarkärnmjöl (E412) är en naturlig förtjockare från guarbönor som är säker i normala mängder.',
 'Guarkärnmjöl (E412) utvinns från frön av guarbönor och är en populär naturlig förtjockare, särskilt i glutenfria produkter. Det är en löslig fiber som kan sänka kolesterolnivåer och stabilisera blodsocker. I mycket höga doser kan det orsaka gasbildning, men i normala livsmedelsmängder är det helt säkert.',
 'E412 Guarkärnmjöl - Naturlig Förtjockare för Glutenfria Produkter',
 'E412 (Guarkärnmjöl): Naturlig förtjockare från guarbönor, kolesterolsänkande, säker i normala doser. ✓ Naturlig ✓ Glutenfri ✓ Fiberkälla'
),

-- E415 - Xantangummi (Safe thickener)
('E415', 'Xantangummi', 'Xanthan gum', 'e415-xantangummi', 'Förtjockningsmedel', 'Naturlig', 2, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn. Framställs genom naturlig bakteriell fermentering.',
 '{"documented": ["Laxerande effekt vid mycket höga doser"], "suspected": [], "benefits": ["Glutenfri förtjockare", "Stabiliserar emulsioner", "Förbättrar textur"], "risk_groups": ["Sällsynt: personer med extrem tarmkänslighet"]}',
 '[{"category": "Glutenfritt", "products": ["Glutenfritt bröd", "GF-bakverk"], "average_amount": "0.1-1%"}, {"category": "Dressingar", "products": ["Salladsdressing", "Såser"], "average_amount": "0.05-0.3%"}, {"category": "Glass", "products": ["Mjukglass", "Sorbet"], "average_amount": "0.1-0.4%"}]',
 ARRAY['Inga särskilda försiktighetsåtgärder - säkert att använda'],
 ARRAY['Guarkärnmjöl (E412)', 'Johannesbrödkärnmjöl (E410)', 'Majsstärkelse', 'Agar-agar'],
 'Xantangummi (E415) är en säker naturlig förtjockare framställd genom bakteriell fermentering.',
 'Xantangummi (E415) produceras genom att bakterien Xanthomonas campestris fermenterar socker. Trots det tekniska framställningssättet är slutprodukten helt naturlig och säker. Det är särskilt värdefullt i glutenfri bakning där det ersätter glutens bindande egenskaper. Inga hälsorisker i normala användningsmängder.',
 'E415 Xantangummi - Glutenfri Bakning & Säker Förtjockare',
 'E415 (Xantangummi): Naturlig förtjockare från bakteriell fermentering, glutenfri bakning, säker för alla. ✓ Naturlig ✓ Glutenfri ✓ Säker'
),

-- E440 - Pektin (Natural, very safe)
('E440', 'Pektin', 'Pectin', 'e440-pektin', 'Gelningsmedel', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig fiber från frukt som har hälsofördelar.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig fiber", "Sänker kolesterol", "Prebiotisk", "Stödjer tarmhälsa"], "risk_groups": []}',
 '[{"category": "Marmelad", "products": ["Sylt", "Gelé", "Marmelad"], "average_amount": "0.5-1.5%"}, {"category": "Godis", "products": ["Fruktgelé", "Pastiller"], "average_amount": "1-3%"}, {"category": "Mejeri", "products": ["Yoghurt", "Fruktdrycker"], "average_amount": "0.1-0.8%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och hälsosamt'],
 ARRAY['Naturligt pektin från äpplen', 'Citruspeels', 'Agar-agar', 'Gelatin'],
 'Pektin (E440) är en naturlig fiber från frukt som är helt säker och har hälsofördelar.',
 'Pektin (E440) är en naturlig fiber som finns i frukter, särskilt äpplen och citrusfrukter. Det används för att gelera sylt och marmelad men har också hälsofördelar - det kan sänka kolesterol, stabilisera blodsocker och fungera som prebiotikum. Ett av de säkraste och nyttigaste tillsatsämnena som finns.',
 'E440 Pektin - Naturlig Fiber med Hälsofördelar för Sylt & Hälsa',
 'E440 (Pektin): Naturlig fiber från frukt, kolesterolsänkande, prebiotisk, säker för alla. ✓ Hälsofördelar ✓ Naturlig ✓ Fiberkälla'
),

-- E471 - Mono- och diglycerider (Common emulsifier, generally safe)
('E471', 'Mono- och diglycerider av fettsyror', 'Glycerol esters', 'e471-mono-diglycerider', 'Emulgeringsmedel', 'Syntetisk/Naturlig', 2, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn. Naturliga fettmolekyler som också finns i kroppen.',
 '{"documented": [], "suspected": [], "benefits": ["Förbättrar textur", "Emulgerar fett och vatten", "Naturligt förekommande"], "risk_groups": ["Veganer (kan komma från animaliska källor)"]}',
 '[{"category": "Bakverk", "products": ["Bröd", "Kakor", "Wienerbrö d"], "average_amount": "0.2-0.5%"}, {"category": "Margarin", "products": ["Smör-alternativ", "Matfett"], "average_amount": "0.5-2%"}, {"category": "Glass", "products": ["Glass", "Frozen desserts"], "average_amount": "0.1-0.5%"}]',
 ARRAY['Veganer bör kontrollera källa (kan vara animalisk)', 'Inga andra försiktighetsåtgärder'],
 ARRAY['Lecitin (E322)', 'Naturlig emulgering', 'Äggula'],
 'Mono- och diglycerider (E471) är naturliga fettmolekyler som används som emulgatorer.',
 'Mono- och diglycerider (E471) är naturliga komponenter av fetter som också produceras i kroppen under matsmältningen. De används för att förbättra textur och blanda fett med vatten i bakverk och andra produkter. Helt säkra att använda men veganer bör kontrollera källan eftersom de kan komma från animaliska fetter.',
 'E471 Mono- & Diglycerider - Naturliga Emulgatorer i Bakning',
 'E471 (Mono- & diglycerider): Naturliga fettmolekyler som emulgatorer, säkra för alla, vegetarisk källkontroll. ✓ Naturlig ✓ Säker ✓ Vanlig'
),

-- E500 - Natriumkarbonat (Baking soda, very safe)
('E500', 'Natriumkarbonat', 'Sodium carbonate/bicarbonate', 'e500-natriumkarbonat', 'Bakpulver', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Används sedan urminnes tider som bakpulver och matlagning.',
 '{"documented": [], "suspected": [], "benefits": ["Naturligt bakpulver", "pH-reglerare", "Traditionellt säkert"], "risk_groups": []}',
 '[{"category": "Bakning", "products": ["Bakpulver", "Bröd", "Kakor"], "average_amount": "0.5-2%"}, {"category": "Läsk", "products": ["Mineralvatten", "Sodavatten"], "average_amount": "Variable"}, {"category": "Konfektyr", "products": ["Lakrits", "Tuggummi"], "average_amount": "0.1-1%"}]',
 ARRAY['Inga försiktighetsåtgärder - traditionellt säkert'],
 ARRAY['Bakpulver (hemmabakning)', 'Potaska (traditionell)'],
 'Natriumkarbonat (E500) är vanligt bakpulver - ett av de äldsta och säkraste tillsatsämnena.',
 'Natriumkarbonat (E500) inkluderar natriumkarbonat och natriumbikarbonat (vanligt bakpulver). Dessa har använts i matlagning i hundratals år och är helt säkra. Natriumbikarbonat används i hemmabak och som pH-reglerare i många livsmedel. En av de mest naturliga och säkra tillsatserna som finns.',
 'E500 Natriumkarbonat (Bakpulver) - Traditionellt Säkert Bakningsmedel',
 'E500 (Natriumkarbonat): Vanligt bakpulver, traditionellt säkert, används i bakning i hundratals år. ✓ Naturligt ✓ Traditionsrikt ✓ Säkert'
),

-- E954 - Sakarin (Artificial sweetener, oldest)
('E954', 'Sakarin', 'Saccharin', 'e954-sakarin', 'Sötningsmedel', 'Syntetisk', 5, 'Neutral',
 2.5, 'EFSA', 'Säkrare än många nyare sötningsmedel men kan ha metallisk bismak.',
 '{"documented": ["Metallisk bismak"], "suspected": ["Allergiski reaktioner (sällsynt)"], "benefits": ["Mycket sött", "Stabil", "Inget kaloriinnehåll"], "risk_groups": ["Personer känsliga för sulfonamider"]}',
 '[{"category": "Tabletter", "products": ["Sötningsmedel-tabletter", "Hermesetas"], "average_amount": "10-20mg/tablett"}, {"category": "Diet-produkter", "products": ["Light-läsk", "Diabetikerprodukter"], "average_amount": "30-100mg/l"}, {"category": "Tandkräm", "products": ["Sockerfri tandkräm"], "average_amount": "Variable"}]',
 ARRAY['Begränsa vid sulfonamid-allergi', 'Kombinera med andra sötningsmedel för bättre smak', 'Kontrollera bismak-känslighet'],
 ARRAY['Stevia', 'Erytritol', 'Xylitol', 'Sukralos (E955)'],
 'Sakarin (E954) är det äldsta konstgjorda sötningsmedlet, säkert men med metallisk bismak.',
 'Sakarin (E954) upptäcktes 1879 och är det äldsta konstgjorda sötningsmedlet. Det är 300-400 gånger sötare än socker. Trots tidiga canceroro (baserad på råttstudier med extrema doser) anses det nu säkert. Huvudproblemet är den metalliska bismaken som många upplever, varför det ofta kombineras med andra sötningsmedel.',
 'E954 Sakarin - Äldsta Sötningsmedlet, Säkerhet & Bismak 2024',
 'E954 (Sakarin): Äldsta konstgjorda sötningsmedlet sedan 1879, säkerhet, metallisk bismak och moderna alternativ. ✓ Historiskt ✓ Säkert'
);

-- Continue with more E-additives in next batch