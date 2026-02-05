-- Add high-priority E-additives batch 5 - More colors, flavor enhancers, and common additives
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E131 - Patent Blue V (Blue dye)
('E131', 'Patentblått V', 'Patent Blue V', 'e131-patentblatt-v', 'Färgämne', 'Syntetisk', 5, 'Negativ',
 2.5, 'EFSA', 'Kan orsaka allergiska reaktioner. Begränsa för känsliga barn.',
 '{"documented": ["Allergiska reaktioner", "Hudutslag"], "suspected": ["Hyperaktivitet", "Andningsbesvär"], "benefits": ["Stabil blå färg"], "risk_groups": ["Allergiker", "Astmatiker", "Känsliga barn"]}',
 '[{"category": "Godis", "products": ["Blå lösgodis", "Tuggummi", "Klubbor"], "average_amount": "10-50mg/100g"}, {"category": "Drycker", "products": ["Blå sportdrycker", "Cocktailblandningar"], "average_amount": "5-30mg/l"}, {"category": "Bakverk", "products": ["Blå glasyr", "Muffins", "Tårtdekoration"], "average_amount": "10-100mg/100g"}]',
 ARRAY['Undvik blå-färgade produkter till allergiska barn', 'Kontrollera reaktioner vid första intag', 'Välj naturligt färgade alternativ', 'Begränsa konstgjorda godis'],
 ARRAY['Spirulinaextrakt', 'Blå färg från blåbär', 'Naturliga blå pigment'],
 'Patentblått V (E131) är en syntetisk blå färg som kan orsaka allergiska reaktioner.',
 'Patentblått V (E131) är en syntetisk färg som ger en intensiv blå nyans. Den kan orsaka allergiska reaktioner hos känsliga personer, särskilt de med befintliga allergier eller astma. Trots att den är godkänd i EU, förbjuds den i vissa länder och många producenter undviker den till förmån för naturliga alternativ.',
 'E131 Patentblått V - Allergier, Astmarisker & Blå Alternativ 2024',
 'E131 (Patentblått V): Syntetisk blå färg, allergirisker, astmavarning och naturliga blå alternativ. ✓ Allergivarning ✓ Säkra alternativ'
),

-- E133 - Brilliant Blue FCF (Blue dye, common in US)
('E133', 'Briljantblått FCF', 'Brilliant Blue FCF', 'e133-briljantblatt-fcf', 'Färgämne', 'Syntetisk', 4, 'Neutral',
 6, 'FDA/EFSA', 'Säkrare än andra blåa färger men kan fortfarande orsaka allergier hos känsliga.',
 '{"documented": ["Allergiska reaktioner hos känsliga"], "suspected": ["Hyperaktivitet (lindrig)"], "benefits": ["Stabil blå färg", "Brett pH-spektrum"], "risk_groups": ["Allergiker", "Personer med färgämnesintolerans"]}',
 '[{"category": "Läsk", "products": ["Blå sportdrycker", "Amerikanska läskedrycker"], "average_amount": "10-100mg/l"}, {"category": "Godis", "products": ["M&Ms blå", "Skittles", "Blå gelé"], "average_amount": "20-200mg/100g"}, {"category": "Glass", "products": ["Blå glass", "Frozen desserter"], "average_amount": "10-50mg/100g"}]',
 ARRAY['Allergiker bör testa små mängder först', 'Kontrollera importerade amerikanska produkter', 'Begränsa vid färgämneskänslighet'],
 ARRAY['Spirulinaextrakt', 'Naturligt blå från alger', 'Antocyaner från blåa bär'],
 'Briljantblått FCF (E133) är en syntetisk blå färg som är vanligare i USA än Europa.',
 'Briljantblått FCF (E133) är en syntetisk färg som är mycket populär i amerikanska livsmedel. Den anses säkrare än många andra syntetiska färger men kan fortfarande orsaka reaktioner hos känsliga personer. Ofta använd i blå M&Ms och andra färgglada godis från USA.',
 'E133 Briljantblått FCF - Amerikansk Blå Färg & Säkerhet 2024',
 'E133 (Briljantblått FCF): Syntetisk blå färg vanlig i USA, säkrare än andra blå färger, allergivarning. ✓ USA-vanlig ✓ Säkerhetsinfo'
),

-- E140 - Chlorophyll (Natural green, very safe)
('E140', 'Klorofyll', 'Chlorophyll', 'e140-klorofyll', 'Färgämne', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig grön färg från växter med hälsofördelar.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig grön färg", "Antioxidant", "Kan stödja detox", "Rik på magnesium"], "risk_groups": []}',
 '[{"category": "Konfektyr", "products": ["Grönt godis", "Tuggummi", "Pastiller"], "average_amount": "10-100mg/100g"}, {"category": "Kosttillskott", "products": ["Klorofylltabletter", "Gröna pulver"], "average_amount": "Variable"}, {"category": "Bakverk", "products": ["Gröna kakor", "Matcha-produkter"], "average_amount": "5-50mg/100g"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och hälsosamt'],
 ARRAY['Spenat-extrakt', 'Matcha', 'Spirulina', 'Gröna bladgrönsaker'],
 'Klorofyll (E140) är naturlig grön färg från växter - helt säker med hälsofördelar.',
 'Klorofyll (E140) är den naturliga gröna färgen i alla växter. Det är inte bara säkert utan har också hälsofördelar som antioxidant-effekter och kan stödja kroppens detoxprocesser. Rik på magnesium och anses ha anti-inflammatoriska egenskaper. Ett av de säkraste och nyttigaste färgämnena som finns.',
 'E140 Klorofyll - Naturlig Grön Färg med Hälsofördelar från Växter',
 'E140 (Klorofyll): Naturlig grön färg från växter, antioxidant, detox-stödjande, magnesiumrik. ✓ Naturlig ✓ Hälsofördelar ✓ Säker'
),

-- E160a - Carotenes (Natural orange, very safe)
('E160a', 'Karotener', 'Beta-carotene', 'e160a-karotener', 'Färgämne', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturligt vitamin A-prekursor från morötter.',
 '{"documented": [], "suspected": [], "benefits": ["Vitamin A-prekursor", "Antioxidant", "Stödjer ögonhälsa", "Naturlig orange färg"], "risk_groups": []}',
 '[{"category": "Margarin", "products": ["Gult smör", "Matfett"], "average_amount": "2-15mg/100g"}, {"category": "Bakverk", "products": ["Gula kakor", "Bröd"], "average_amount": "1-10mg/100g"}, {"category": "Kosttillskott", "products": ["A-vitamin", "Multivitaminer"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt vitamin'],
 ARRAY['Morötter', 'Sötpotatis', 'Mango', 'Aprikoser', 'Gul paprika'],
 'Karotener (E160a) är naturliga orange/gula pigment som omvandlas till vitamin A i kroppen.',
 'Karotener (E160a), främst beta-karoten, är naturliga pigment från morötter, söpotatis och andra orange/gula växter. De omvandlas till vitamin A i kroppen och är viktiga för ögonhälsan och immunförsvaret. Helt säkra och nyttiga - används både som färgämne och näringstillskott.',
 'E160a Karotener (Beta-karoten) - Vitamin A & Naturlig Orange Färg',
 'E160a (Karotener): Naturligt beta-karoten från morötter, vitamin A-prekursor, ögonhälsa, säker för alla. ✓ Vitamin A ✓ Naturlig ✓ Hälsosam'
),

-- E162 - Beetroot red (Natural red, very safe)
('E162', 'Rödbetsrött', 'Beetroot red', 'e162-rodbetsrott', 'Färgämne', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig röd färg från rödbetor med hälsofördelar.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig röd färg", "Antioxidant", "Nitrater för blodcirkulation", "Stödjer uthållighet"], "risk_groups": []}',
 '[{"category": "Godis", "products": ["Röda naturliga gelégodisar", "Fruktgelé"], "average_amount": "Variable"}, {"category": "Juice", "products": ["Rödbetsjuice", "Naturliga juiceblandningar"], "average_amount": "Natural levels"}, {"category": "Mejeri", "products": ["Rosa yoghurt", "Färgad ost"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och hälsosamt', 'OBS: Kan färga urin rosa (harmlöst)'],
 ARRAY['Färsk rödbetsjuice', 'Rödbetor', 'Körsbärsextrakt', 'Hibiskus'],
 'Rödbetsrött (E162) är en naturlig röd färg från rödbetor - helt säker med hälsofördelar.',
 'Rödbetsrött (E162) utvinns från rödbetor och innehåller betalainer som ger den karakteristiska röda färgen. Förutom att vara säkert har det också hälsofördelar genom sitt innehåll av nitrater som kan förbättra blodcirkulationen och uthålligheten. Ett perfekt exempel på hur naturliga färgämnen kan vara både säkra och nyttiga.',
 'E162 Rödbetsrött - Naturlig Röd Färg med Uthållighetsfördelar',
 'E162 (Rödbetsrött): Naturlig röd färg från rödbetor, nitrater för blodcirkulation, uthållighet, säker för alla. ✓ Naturlig ✓ Uthållighet ✓ Hälsosam'
),

-- E163 - Anthocyanins (Natural purple/red, very safe)
('E163', 'Antocyaner', 'Anthocyanins', 'e163-antocyaner', 'Färgämne', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturliga antioxidanter från bär och lila växter.',
 '{"documented": [], "suspected": [], "benefits": ["Kraftfulla antioxidanter", "Antiinflammatoriska", "Stödjer hjärt-kärlhälsa", "Naturlig lila/röd färg"], "risk_groups": []}',
 '[{"category": "Godis", "products": ["Lila/blå gelégodisar", "Naturligt godis"], "average_amount": "Variable"}, {"category": "Drycker", "products": ["Blåbärsjuice", "Körsbärsdrycker"], "average_amount": "Natural levels"}, {"category": "Bakverk", "products": ["Blåbärsmuffins", "Lila glasyr"], "average_amount": "Natural levels"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och mycket hälsosamt'],
 ARRAY['Blåbär', 'Björnbär', 'Körsbär', 'Röd kål', 'Lila morötter'],
 'Antocyaner (E163) är naturliga antioxidanter från bär som ger lila/röd färg och hälsofördelar.',
 'Antocyaner (E163) är naturliga pigment som ger blå-, lila- och rödfärgade frukter och grönsaker deras färg. De är kraftfulla antioxidanter med antiinflammatoriska egenskaper och kan stödja hjärt-kärlhälsan. Forskning visar att de kan förbättra minne och kognitiv funktion. Ett perfekt exempel på hur färgämnen kan vara både vackra och hälsosamma.',
 'E163 Antocyaner - Naturliga Antioxidanter från Bär & Hjärthälsa',
 'E163 (Antocyaner): Naturliga antioxidanter från bär, antiinflammatoriska, hjärt-kärlhälsa, minnesstödjande. ✓ Antioxidanter ✓ Hjärthälsa ✓ Naturlig'
),

-- E170 - Calcium carbonate (Chalk, very safe)
('E170', 'Kalciumkarbonat', 'Calcium carbonate', 'e170-kalciumkarbonat', 'Färgämne', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig kalk som också är ett viktigt mineral.',
 '{"documented": [], "suspected": [], "benefits": ["Kalciumkälla", "Vit färg", "pH-reglerare", "Naturligt mineral"], "risk_groups": []}',
 '[{"category": "Kosttillskott", "products": ["Kalciumtabletter", "Multimineraler"], "average_amount": "100-1000mg/tablett"}, {"category": "Godis", "products": ["Vitt godis", "Tuggummi"], "average_amount": "Variable"}, {"category": "Bakverk", "products": ["Bakpulver", "Mjöl-berikning"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt mineral som kroppen behöver'],
 ARRAY['Naturlig kalk', 'Äggskal (kalcium)', 'Mejeriprοdukter för kalcium'],
 'Kalciumkarbonat (E170) är naturlig kalk som ger vit färg och är en viktig kalciumkälla.',
 'Kalciumkarbonat (E170) är krita eller kalk i sin naturliga form. Det används både som vitt färgämne och som kalciumkälla i kosttillskott. Helt säkert och nyttigt eftersom kroppen behöver kalcium för starka ben och tänder. Ett perfekt exempel på hur mineraler kan fungera både som färgämne och näringstillskott.',
 'E170 Kalciumkarbonat (Kalk) - Vit Färg & Viktig Kalciumkälla',
 'E170 (Kalciumkarbonat): Naturlig kalk som vit färg och kalciumkälla, ben- och tandhälsa, säker för alla. ✓ Kalcium ✓ Naturlig ✓ Nyttig'
),

-- E260 - Acetic acid (Vinegar, very safe)
('E260', 'Ättiksyra', 'Acetic acid', 'e260-attiksyra', 'Konserveringsmedel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig syra från fermentering - vanlig vinäger.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig konservering", "Antimikrobiell", "pH-reglerare", "Traditionellt säkert"], "risk_groups": []}',
 '[{"category": "Dressingar", "products": ["Vinägrett", "Majonnäs", "Marinader"], "average_amount": "0.1-5%"}, {"category": "Konserver", "products": ["Inlagda grönsaker", "Pickles"], "average_amount": "2-8%"}, {"category": "Såser", "products": ["Ketchup", "Chilisås", "BBQ-sås"], "average_amount": "0.5-3%"}]',
 ARRAY['Inga försiktighetsåtgärder - traditionellt säkert som vanlig vinäger'],
 ARRAY['Vanlig vinäger', 'Äppelcidervinäger', 'Balsamvinäger', 'Citronjuice'],
 'Ättiksyra (E260) är vanlig vinäger - en av de äldsta och säkraste konserveringsmetoderna.',
 'Ättiksyra (E260) är huvudkomponenten i vinäger och har använts för konservering i tusentals år. Det är helt naturligt och framställs genom fermentering av alkohol. Förutom att konservera mat har ättiksyra antimikrobiella egenskaper och kan hjälpa till att reglera pH. En av de säkraste och mest traditionella konserveringsmetoderna.',
 'E260 Ättiksyra (Vinäger) - Traditionell Säker Konservering i Tusentals År',
 'E260 (Ättiksyra): Vanlig vinäger, traditionell konservering, antimikrobiell, säker i tusentals år. ✓ Traditionell ✓ Naturlig ✓ Säker'
),

-- E270 - Lactic acid (Very safe, natural)
('E270', 'Mjölksyra', 'Lactic acid', 'e270-mjolksyra', 'Konserveringsmedel', 'Naturlig', 1, 'Positiv',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig syra som produceras i kroppen och vid fermentering.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig konservering", "Produceras i kroppen", "Probiotisk fermentering", "pH-reglerare"], "risk_groups": []}',
 '[{"category": "Mejeri", "products": ["Yoghurt", "Filmjölk", "Ost"], "average_amount": "Natural levels"}, {"category": "Konserver", "products": ["Surkål", "Kimchi", "Inlagda grönsaker"], "average_amount": "0.5-2%"}, {"category": "Bakverk", "products": ["Surdegsbröd", "Konditoriprodukter"], "average_amount": "0.1-1%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturlig syra som kroppen själv producerar'],
 ARRAY['Naturlig fermentering', 'Probiotiska bakterier', 'Citronjuice', 'Vinäger'],
 'Mjölksyra (E270) är en naturlig syra som produceras i kroppen och vid fermentering av mjölkprodukter.',
 'Mjölksyra (E270) är en naturlig syra som produceras av mjölksyrabakterier under fermentering och även i våra muskler under träning. Den är helt säker eftersom kroppen är van vid den och den har probiotiska fördelar. Används för att konservera och ge syrlig smak åt fermenterade produkter som yoghurt och surkål.',
 'E270 Mjölksyra - Naturlig Fermentering & Probiotiska Fördelar',
 'E270 (Mjölksyra): Naturlig syra från fermentering, produceras i kroppen, probiotiska fördelar, säker för alla. ✓ Naturlig ✓ Probiotisk ✓ Säker'
),

-- E967 - Xylitol (Sugar alcohol, dental benefits)
('E967', 'Xylitol', 'Birch sugar', 'e967-xylitol', 'Sötningsmedel', 'Naturlig', 2, 'Positiv',
 NULL, 'EFSA', 'Säkert för barn och bra för tänderna. Kan orsaka magbesvär vid höga doser.',
 '{"documented": ["Magbesvär vid höga doser (>30g/dag)", "Laxerande effekt"], "suspected": [], "benefits": ["Förebygger karies", "Naturligt sötningsmedel", "Lågt GI", "Tandvänligt"], "risk_groups": ["Hundar (toxiskt)", "Personer med känslig mage vid höga doser"]}',
 '[{"category": "Tuggummi", "products": ["Tandvänligt tuggummi", "Xylimax"], "average_amount": "0.5-1g/st"}, {"category": "Tandkräm", "products": ["Fluorfri tandkräm"], "average_amount": "Variable"}, {"category": "Godis", "products": ["Sockerfritt godis", "Pastiller"], "average_amount": "1-5g/portion"}]',
 ARRAY['Börja med små mängder för att undvika magbesvär', 'Håll borta från hundar - toxiskt för dem', 'Bra för tänderna - kan användas dagligen'],
 ARRAY['Erytritol', 'Stevia', 'Monk fruit', 'Sorbitol (E420)'],
 'Xylitol (E967) är ett naturligt sötningsmedel från björk som förebygger karies och är bra för tänderna.',
 'Xylitol (E967) utvinns från björkträ eller majs och är unikt bland sötningsmedel eftersom det faktiskt förebygger karies och gynnar tandhälsan. Det hämmar bakterietillväxt i munnen och stimulerar salivproduktion. Kan orsaka magbesvär vid höga doser men är säkert i normala mängder. Varning: Toxiskt för hundar!',
 'E967 Xylitol (Björksocker) - Tandvänligt Sötningsmedel & Kariesskydd',
 'E967 (Xylitol): Naturligt sötningsmedel från björk, förebygger karies, tandhälsa, säkert för människor. ✓ Tandvänligt ✓ Naturligt ✓ Kariesskydd'
);

-- Add more common E-additives in future batches