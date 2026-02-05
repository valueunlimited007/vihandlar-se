-- Add high-priority E-additives batch 6 - More sweeteners, emulsifiers, and antioxidants
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E420 - Sorbitol (Sugar alcohol, generally safe)
('E420', 'Sorbitol', 'Glucitol', 'e420-sorbitol', 'Sötningsmedel', 'Naturlig', 3, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn men kan orsaka magbesvär och diarré vid höga doser.',
 '{"documented": ["Laxerande effekt vid höga doser", "Magbesvär", "Gasbildning"], "suspected": [], "benefits": ["Tandvänligt", "Lågt GI", "Naturligt förekommande"], "risk_groups": ["Personer med IBS", "Känslig mage vid höga doser"]}',
 '[{"category": "Godis", "products": ["Sockerfritt godis", "Tuggummi", "Pastiller"], "average_amount": "1-10g/portion"}, {"category": "Diabetikerprodukter", "products": ["Diabetikerchoklad", "Bakverk"], "average_amount": "Variable"}, {"category": "Tandkräm", "products": ["Sockerfri tandkräm"], "average_amount": "Variable"}]',
 ARRAY['Börja med små mängder - kan orsaka magbesvär', 'Läs varningstexter om laxerande effekt', 'Begränsa till <20g per dag', 'Bra för tänderna men inte magen i höga doser'],
 ARRAY['Xylitol (E967)', 'Erytritol', 'Stevia', 'Mannitol (E421)'],
 'Sorbitol (E420) är ett naturligt sötningsmedel som är tandvänligt men kan orsaka magbesvär.',
 'Sorbitol (E420) förekommer naturligt i många frukter och bär. Det är ungefär 60% så sött som socker och är tandvänligt eftersom det inte matar kariesbakterier. Huvudnackdelen är dess laxerande effekt - redan 20-30g kan orsaka magbesvär och diarré. Används ofta i sockerfri godis och diabetikerprodukter.',
 'E420 Sorbitol - Tandvänligt Sötningsmedel med Magbesvär-risk',
 'E420 (Sorbitol): Naturligt sötningsmedel från frukt, tandvänligt, laxerande effekt vid höga doser. ✓ Tandvänligt ✓ Naturligt ✓ Dosvarning'
),

-- E421 - Mannitol (Sugar alcohol, similar to sorbitol)
('E421', 'Mannitol', 'Mannite', 'e421-mannitol', 'Sötningsmedel', 'Naturlig', 3, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn men kan orsaka magbesvär vid höga doser, likt sorbitol.',
 '{"documented": ["Laxerande effekt vid höga doser", "Magbesvär"], "suspected": [], "benefits": ["Tandvänligt", "Naturligt förekommande", "Låg kaloriinnehåll"], "risk_groups": ["Personer med IBS", "Känslig mage"]}',
 '[{"category": "Godis", "products": ["Sockerfritt godis", "Medicinska tabletter"], "average_amount": "1-5g/portion"}, {"category": "Kosttillskott", "products": ["Brustabletter", "Vitamintabletter"], "average_amount": "Variable"}, {"category": "Medicin", "products": ["Tabletter", "Kapslar"], "average_amount": "Variable"}]',
 ARRAY['Begränsa intag - kan orsaka magbesvär', 'Läs varningstexter om laxerande effekt', 'Kombinera med andra sötningsmedel för bättre tolerans'],
 ARRAY['Xylitol (E967)', 'Erytritol', 'Stevia', 'Sorbitol (E420)'],
 'Mannitol (E421) är ett naturligt sötningsmedel som liknar sorbitol och kan orsaka magbesvär.',
 'Mannitol (E421) förekommer naturligt i många växter och svampar. Det är ungefär 50% så sött som socker och har liknande egenskaper som sorbitol - tandvänligt men med laxerande effekt vid höga doser. Används ofta som fyllnadsämne i medicintabletter och sockerfri godis.',
 'E421 Mannitol - Naturligt Sötningsmedel med Laxerande Effekt',
 'E421 (Mannitol): Naturligt sötningsmedel från växter, tandvänligt, laxerande effekt likt sorbitol. ✓ Naturligt ✓ Tandvänligt ✓ Dosvarning'
),

-- E965 - Maltitol (Sugar alcohol, popular in diabetic foods)
('E965', 'Maltitol', 'Maltite', 'e965-maltitol', 'Sötningsmedel', 'Syntetisk', 4, 'Neutral',
 NULL, 'EFSA', 'Kan orsaka magbesvär vid höga doser men mindre än sorbitol.',
 '{"documented": ["Laxerande effekt vid höga doser", "Magbesvär"], "suspected": [], "benefits": ["Smakar mycket likt socker", "Tandvänligt", "Halvt så många kalorier"], "risk_groups": ["Personer med IBS", "Känsliga mag-tarmsystem"]}',
 '[{"category": "Diabetikerprodukter", "products": ["Diabetikerchoklad", "Sugarfree-godis"], "average_amount": "Variable"}, {"category": "Bakning", "products": ["Sockerfri bakning", "Diabetiker-bakverk"], "average_amount": "Variable"}, {"category": "Godis", "products": ["Sockerfritt godis", "Halstabletter"], "average_amount": "2-20g/portion"}]',
 ARRAY['Begränsa till <20g per dag för att undvika magbesvär', 'Läs varningstexter om laxerande effekt', 'Bättre tolerans än sorbitol men fortfarande försiktig'],
 ARRAY['Xylitol (E967)', 'Erytritol', 'Stevia', 'Naturlig honung'],
 'Maltitol (E965) är ett sötningsmedel som smakar som socker men kan orsaka magbesvär.',
 'Maltitol (E965) framställs från maltos (maltsocker) och smakar mycket likt vanligt socker med ungefär 90% söthet. Det är populärt i diabetikerprodukter eftersom det har mindre påverkan på blodsocker. Likt andra sockeralkoholer kan det orsaka magbesvär vid höga doser, men toleransen är ofta bättre än för sorbitol.',
 'E965 Maltitol - Diabetikersötningsmedel som Smakar som Socker',
 'E965 (Maltitol): Sötningsmedel för diabetiker, smakar som socker, lägre kaloriinnehåll, magbesvär vid höga doser. ✓ Diabetikerlämplig ✓ Sockerliknande'
),

-- E160b - Annatto (Natural orange/red, generally safe but can cause allergies)
('E160b', 'Annattoextrakt', 'Annatto extract', 'e160b-annattoextrakt', 'Färgämne', 'Naturlig', 3, 'Neutral',
 0.3, 'EFSA', 'Kan orsaka allergiska reaktioner hos känsliga barn. Naturlig men inte allergen-fri.',
 '{"documented": ["Allergiska reaktioner", "Astma-anfall"], "suspected": ["Hyperaktivitet hos känsliga"], "benefits": ["Naturlig orange/röd färg", "Traditionellt använd", "Stabil färg"], "risk_groups": ["Allergiker", "Astmatiker", "Känsliga barn"]}',
 '[{"category": "Ost", "products": ["Cheddar", "Red Leicester", "Färgad ost"], "average_amount": "10-100mg/kg"}, {"category": "Margarin", "products": ["Gult smör", "Matfett"], "average_amount": "5-25mg/kg"}, {"category": "Snacks", "products": ["Chips", "Popcorn"], "average_amount": "10-50mg/kg"}]',
 ARRAY['Allergiker bör testa små mängder först', 'Kontrollera reaktioner vid första intag', 'Undvik vid känd annatto-allergi', 'Astmatiker bör vara försiktiga'],
 ARRAY['Paprikaextrakt (E160c)', 'Beta-karoten (E160a)', 'Gurkmeja (E100)', 'Safflower-extrakt'],
 'Annattoextrakt (E160b) är en naturlig orange färg som kan orsaka allergier hos känsliga personer.',
 'Annattoextrakt (E160b) utvinns från frön av annattobusken (Bixa orellana) och har använts som färgämne i århundraden. Trots att det är naturligt kan det orsaka allergiska reaktioner, särskilt hos astmatiker och känsliga barn. Det är ett av de naturliga färgämnena som faktiskt kan vara problematiskt för vissa personer.',
 'E160b Annattoextrakt - Naturlig Orange Färg med Allergirisker',
 'E160b (Annattoextrakt): Naturlig orange färg från annattobusken, allergirisker, astmavarning och säkrare alternativ. ✓ Naturlig ✓ Allergivarning'
),

-- E290 - Carbon dioxide (Very safe)
('E290', 'Koldioxid', 'Carbon dioxide', 'e290-koldioxid', 'Konserveringsmedel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig gas som finns i atmosfären och andas ut av kroppen.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig konservering", "Skapar kolsyra", "Antimikrobiell", "Helt naturlig"], "risk_groups": []}',
 '[{"category": "Läsk", "products": ["Coca-Cola", "Sprite", "All kolsyrad dryck"], "average_amount": "3-8g/l"}, {"category": "Öl", "products": ["All öl", "Cider"], "average_amount": "4-6g/l"}, {"category": "Vatten", "products": ["Mineralvatten", "Sodavatten"], "average_amount": "2-8g/l"}]',
 ARRAY['Inga försiktighetsåtgärder - helt naturlig gas'],
 ARRAY['Naturlig fermentering (skapar koldioxid)', 'Ingen ersättare behövs - naturlig'],
 'Koldioxid (E290) är naturlig gas som skapar kolsyra i drycker - helt säker.',
 'Koldioxid (E290) är den naturliga gas som skapar kolsyra i drycker. Det är samma gas som finns i atmosfären och som vi andas ut. Helt säker och naturlig, använd för att skapa den pricklande känslan i kolsyrade drycker och för att konservera genom att skapa en syrefri miljö.',
 'E290 Koldioxid - Naturlig Gas för Kolsyra & Konservering',
 'E290 (Koldioxid): Naturlig gas för kolsyra, säker för alla, atmosfärisk gas, konserverande. ✓ Naturlig ✓ Säker ✓ Allmän'
),

-- E960 - Stevioside (Natural sweetener, very safe)
('E960', 'Steviolglykosider', 'Stevia', 'e960-steviolglykosider', 'Sötningsmedel', 'Naturlig', 1, 'Positiv',
 4, 'EFSA', 'Mycket säkert för barn. Naturligt sötningsmedel från stevia-växten.',
 '{"documented": [], "suspected": [], "benefits": ["Naturligt sötningsmedel", "Inget kaloriinnehåll", "Påverkar inte blodsocker", "Antioxidant-egenskaper"], "risk_groups": []}',
 '[{"category": "Sötningsmedel", "products": ["Stevia-tabletter", "Flytande stevia"], "average_amount": "Variable"}, {"category": "Drycker", "products": ["Stevia-sötade läsk", "Té"], "average_amount": "30-200mg/l"}, {"category": "Bakning", "products": ["Stevia-socker", "Diabetiker-bakverk"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och säkert', 'Kan ha svag bismak - kombinera med andra sötningsmedel'],
 ARRAY['Färska stevia-blad', 'Monk fruit', 'Yacon-sirap', 'Naturlig honung'],
 'Steviolglykosider (E960) från stevia-växten är ett naturligt sötningsmedel utan kalorier.',
 'Steviolglykosider (E960) utvinns från stevia-växten (Stevia rebaudiana) och är 200-400 gånger sötare än socker. Det är helt naturligt, innehåller inga kalorier och påverkar inte blodsocker, vilket gör det perfekt för diabetiker. Stevia har använts som sötningsmedel i Sydamerika i över 1000 år och anses vara ett av de säkraste sötningsmedlen.',
 'E960 Steviolglykosider (Stevia) - Naturligt Kaloriefritt Sötningsmedel',
 'E960 (Steviolglykosider): Naturligt sötningsmedel från stevia-växten, kaloriefri, diabetikerlämplig, säker för alla. ✓ Naturlig ✓ Kaloriefri ✓ Diabetikerlämplig'
),

-- E338 - Phosphoric acid (Common in cola, moderate concern)
('E338', 'Fosforsyra', 'Phosphoric acid', 'e338-fosforsyra', 'Surhetsreglerande medel', 'Syntetisk', 5, 'Negativ',
 70, 'EFSA', 'Kan påverka kalciumupptag och benhälsa, särskilt vid hög konsumtion.',
 '{"documented": ["Minskad kalciumabsorption", "Tandemalj-erosion"], "suspected": ["Osteoporos", "Benskörhet"], "benefits": ["Syrlig smak", "Konserverande"], "risk_groups": ["Tonåringar", "Äldre", "Personer med lågt kalciumintag"]}',
 '[{"category": "Cola", "products": ["Coca-Cola", "Pepsi", "Cola-drycker"], "average_amount": "400-700mg/l"}, {"category": "Energidrycker", "products": ["Red Bull typ", "Sportdrycker"], "average_amount": "200-500mg/l"}, {"category": "Konserver", "products": ["Vissa konserver"], "average_amount": "100-500mg/kg"}]',
 ARRAY['Begränsa cola-konsumtion, särskilt för tonåringar', 'Ät kalciumrik mat när du dricker cola', 'Använd sugrör för att skydda tänderna', 'Skölj munnen efter cola-konsumtion'],
 ARRAY['Citronsyra (E330)', 'Äppelsyra (E296)', 'Ättiksyra (E260)'],
 'Fosforsyra (E338) i cola kan påverka kalciumupptag och benhälsa vid hög konsumtion.',
 'Fosforsyra (E338) används främst i cola-drycker för att ge den karakteristiska syrliga smaken. Problem uppstår vid hög konsumtion då fosforsyra kan störa kalcium-fosfor-balansen i kroppen och potentiellt bidra till benskörhet. Särskilt problematiskt för tonåringar som dricker mycket cola under den kritiska benutvecklingsperioden.',
 'E338 Fosforsyra (Cola) - Benhälsa, Kalcium & Hälsorisker 2024',
 'E338 (Fosforsyra): Vanlig i cola, påverkar kalciumupptag, benhälsorisker, tandskador. ✓ Benhälsovarning ✓ Cola-varning'
),

-- E341 - Calcium phosphates (Generally safe, mineral source)
('E341', 'Kalciumfosfater', 'Calcium phosphates', 'e341-kalciumfosfater', 'Emulgeringsmedel', 'Naturlig', 2, 'Neutral',
 70, 'EFSA', 'Säkert för barn. Naturliga mineraler som kroppen behöver för ben och tänder.',
 '{"documented": [], "suspected": [], "benefits": ["Kalcium- och fosforkälla", "Emulgerar", "Naturliga mineraler"], "risk_groups": ["Sällsynt: personer med njurproblem vid mycket höga doser"]}',
 '[{"category": "Mjölkpulver", "products": ["Torrmlölk", "Mjölkersättning"], "average_amount": "0.1-0.5%"}, {"category": "Kosttillskott", "products": ["Kalcium-tabletter", "Multimineraler"], "average_amount": "100-500mg/tablett"}, {"category": "Bakning", "products": ["Bakpulver", "Jästnäring"], "average_amount": "0.1-2%"}]',
 ARRAY['Inga försiktighetsåtgärder - naturliga mineraler', 'Personer med njursten bör begränsa mycket höga doser'],
 ARRAY['Naturligt kalcium och fosfor från mejeri', 'Benmjöl (traditionellt)', 'Mineraltillskott'],
 'Kalciumfosfater (E341) är naturliga mineraler som kroppen behöver för ben och tänder.',
 'Kalciumfosfater (E341) är en grupp naturliga mineralsalter som innehåller både kalcium och fosfor - två essentiella mineraler för ben- och tandhälsa. De används som emulgatorer och mineralberikare i livsmedel. Helt säkra eftersom kroppen behöver dessa mineraler, och de förekommer naturligt i många livsmedel.',
 'E341 Kalciumfosfater - Naturliga Mineraler för Ben & Tandhälsa',
 'E341 (Kalciumfosfater): Naturliga mineraler med kalcium och fosfor, ben- och tandhälsa, säkra emulgatorer. ✓ Mineraler ✓ Ben-hälsa ✓ Naturlig'
),

-- E1103 - Invertase (Natural enzyme, very safe)
('E1103', 'Invertas', 'Invertase enzyme', 'e1103-invertas', 'Enzym', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturligt enzym som också finns i kroppen.',
 '{"documented": [], "suspected": [], "benefits": ["Naturligt enzym", "Förbättrar sockeromvandling", "Traditionellt säkert"], "risk_groups": []}',
 '[{"category": "Godis", "products": ["Chokladtryffel", "Fondant", "Kremfyllning"], "average_amount": "Variable"}, {"category": "Bakverk", "products": ["Kakor", "Tårtor", "Konfektyr"], "average_amount": "0.01-0.1%"}, {"category": "Honung-produkter", "products": ["Konstgjord honung", "Sirap"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt enzym'],
 ARRAY['Naturlig honung (innehåller invertas)', 'Jäst (producerar invertas)', 'Naturlig enzymatisk process'],
 'Invertas (E1103) är ett naturligt enzym som omvandlar sockerarter och är helt säkert.',
 'Invertas (E1103) är ett naturligt enzym som omvandlar sackaros till glukos och fruktos. Det förekommer naturligt i jäst, honung och även i människokroppen. Används i konfektindustrin för att skapa mjukare texturer och förhindra sockerkristallisering. Helt säkert eftersom det är ett naturligt enzym.',
 'E1103 Invertas - Naturligt Enzym för Sockeromsättning i Konfektyr',
 'E1103 (Invertas): Naturligt enzym för sockeromsättning, finns i honung och kroppen, säker för alla. ✓ Naturligt ✓ Enzym ✓ Säker'
);

-- Continue systematically through the Livsmedelsverket list