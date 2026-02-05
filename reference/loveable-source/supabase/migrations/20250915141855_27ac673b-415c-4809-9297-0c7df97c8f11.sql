-- Add high-priority E-additives batch 3
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E124 - Nykockin (Red dye, Southampton study)
('E124', 'Nykockin', 'Ponceau 4R', 'e124-nykockin', 'Färgämne', 'Syntetisk', 7, 'Negativ',
 0.7, 'EFSA', 'Kan orsaka hyperaktivitet hos känsliga barn. Southampton-studien visar samband.',
 '{"documented": ["Hyperaktivitet hos känsliga barn", "Allergiska reaktioner"], "suspected": ["ADHD-förvärring", "Astma"], "benefits": ["Stabil röd färg"], "risk_groups": ["Barn med ADHD", "Allergiker", "Astmatiker"]}',
 '[{"category": "Godis", "products": ["Rödt lösgodis", "Tuggummi", "Gelé"], "average_amount": "10-100mg/100g"}, {"category": "Drycker", "products": ["Röda läskedrycker", "Energidrycker"], "average_amount": "5-50mg/l"}, {"category": "Desserter", "products": ["Glass", "Puddingar", "Tårtdekoration"], "average_amount": "10-80mg/100g"}]',
 ARRAY['Undvik röd-färgade produkter till känsliga barn', 'Kontrollera varningstexter på förpackningar', 'Välj naturligt färgade alternativ', 'Begränsa energidrycker och godis'],
 ARRAY['Rödbetsjuice', 'Antocyaner från blåbär', 'Hibiskus', 'Körsbärsextrakt'],
 'Nykockin (E124) är en syntetisk röd färg som kan orsaka hyperaktivitet hos känsliga barn.',
 'Nykockin (E124), även känt som Ponceau 4R, är en syntetisk azofärg som ingick i Southampton-studien 2007. Studien visade att E124 kan öka hyperaktivitet och minska uppmärksamheten hos barn. EU kräver varningstext på produkter som innehåller E124. Många producenter har ersatt det med naturliga alternativ.',
 'E124 Nykockin (Ponceau 4R) - Hyperaktivitet & Säkra Alternativ',
 'E124 (Nykockin/Ponceau 4R): Southampton-studien, hyperaktivitetsrisker hos barn, EU-varningar och naturliga röda alternativ. ✓ Säkerhetsinformation'
),

-- E129 - Allurarött AC (Red dye, Southampton study)
('E129', 'Allurarött AC', 'Allura Red AC', 'e129-allurarott-ac', 'Färgämne', 'Syntetisk', 7, 'Negativ',
 7, 'FDA/EFSA', 'Kan orsaka hyperaktivitet hos känsliga barn. Southampton-studien bekräftar risker.',
 '{"documented": ["Hyperaktivitet hos känsliga barn", "Allergiska reaktioner"], "suspected": ["ADHD-förvärring", "Immunsystemsstörningar"], "benefits": ["Stabil röd färg"], "risk_groups": ["Barn med ADHD", "Allergiker", "Immunsensitiva"]}',
 '[{"category": "Godis", "products": ["Röda gelégodisar", "Skumbananer", "Kola"], "average_amount": "10-150mg/100g"}, {"category": "Drycker", "products": ["Röda sportdrycker", "Läsk", "Fruktdrycker"], "average_amount": "5-40mg/l"}, {"category": "Snacks", "products": ["Röda chips", "Popcorn", "Nötter"], "average_amount": "20-100mg/100g"}]',
 ARRAY['Undvik röd-färgade snacks och godis till barn', 'Kontrollera ingredienslistor på drycker', 'Välj produkter märkta "utan konstgjorda färgämnen"', 'Begränsa processat snacks'],
 ARRAY['Tomatpuré', 'Paprikaextrakt', 'Rödbetskoncentrat', 'Hibiskusextrakt'],
 'Allurarött AC (E129) är en syntetisk röd färg som kan orsaka hyperaktivitet hos känsliga barn.',
 'Allurarött AC (E129) är en syntetisk azofärg som ofta ersätter den förbjudna färgen Amarant (E123). Den ingick i Southampton-studien som visade samband med hyperaktivitet hos barn. Trots att den är godkänd i EU och USA, rekommenderar många barnläkare att undvika den för känsliga barn.',
 'E129 Allurarött AC - Hyperaktivitet & Southampton-studien 2024',
 'E129 (Allurarött AC): Southampton-studien, hyperaktivitetsrisker, säkerhetsvarningar och naturliga röda alternativ. ✓ Vetenskaplig evidens'
),

-- E150a - Sockerkulör (Caramel color, generally safe)
('E150a', 'Sockerkulör', 'Karamell färg', 'e150a-sockerkulor', 'Färgämne', 'Naturlig', 2, 'Neutral',
 NULL, 'EFSA', 'Säkert - naturlig karamellfärg utan kemiska tillsatser.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig brun färg", "Hitzestabil", "pH-stabil"], "risk_groups": []}',
 '[{"category": "Läsk", "products": ["Coca-Cola", "Pepsi", "Root beer"], "average_amount": "100-1500mg/l"}, {"category": "Godis", "products": ["Karameller", "Choklad", "Toffee"], "average_amount": "500-3000mg/kg"}, {"category": "Såser", "products": ["Soja", "Worcestershire", "Grill-såser"], "average_amount": "1000-5000mg/kg"}]',
 ARRAY['Inga särskilda försiktighetsåtgärder - säkert att använda'],
 ARRAY['Naturlig karamellisering', 'Bränt socker', 'Mörk melassås'],
 'Sockerkulör (E150a) är en naturlig brun färg gjord genom upphettning av socker utan kemiska tillsatser.',
 'Sockerkulör E150a är den enklaste och säkraste formen av karamellfärg. Den framställs genom att värma socker tills det karamelliserar och blir brunt. Inga kemikalier tillsätts i processen, vilket gör det till ett naturligt och säkert färgämne som har använts i hundratals år.',
 'E150a Sockerkulör - Naturlig Karamellfärg utan Kemikalier',
 'E150a (Sockerkulör): Naturlig karamellfärg från upphettat socker, säker att använda, inga kemiska tillsatser. ✓ Naturlig ✓ Säker för alla'
),

-- E150d - Sockerkulör ammoniaksulfit (Caramel IV, controversial)
('E150d', 'Sockerkulör ammoniaksulfitprocessen', 'Karamell IV', 'e150d-sockerkulor-ammoniaksulfit', 'Färgämne', 'Syntetisk', 5, 'Neutral',
 100, 'EFSA', 'Innehåller 4-MEI som misstänks vara cancerframkallande i höga doser.',
 '{"documented": [], "suspected": ["Cancer (4-MEI)", "Immunsystemsstörningar"], "benefits": ["Stabil brun färg", "Löser sig bra"], "risk_groups": ["Personer med hög konsumtion av cola"]}',
 '[{"category": "Cola", "products": ["Coca-Cola", "Pepsi", "Cola Zero"], "average_amount": "100-200mg/l"}, {"category": "Öl", "products": ["Mörkt öl", "Stout", "Porter"], "average_amount": "50-500mg/l"}, {"category": "Bakery", "products": ["Mörkt bröd", "Kakor", "Sirap"], "average_amount": "100-1000mg/kg"}]',
 ARRAY['Begränsa cola-konsumtion', 'Välj E150a istället för E150d när möjligt', 'Diversifiera dryckeskonsumtion', 'Kontrollera etiketter på mörka produkter'],
 ARRAY['E150a (ren sockerkulör)', 'Kakao för brun färg', 'Kaffe-extrakt', 'Mörk sirap'],
 'Sockerkulör E150d innehåller 4-MEI som misstänks vara cancerframkallande i stora mängder.',
 'Sockerkulör E150d framställs med ammoniak och sulfit vilket skapar 4-metylimidazol (4-MEI), ett ämne som misstänks vara cancerframkallande. Kalifornien kräver varningstext för produkter med höga halter. Trots att EFSA anser nuvarande nivåer säkra, rekommenderar många att begränsa intag av produkter med höga halter E150d.',
 'E150d Sockerkulör (Ammoniak-sulfit) - 4-MEI Cancerrisker & Alternativ',
 'E150d (Sockerkulör ammoniaksulfit): 4-MEI cancerrisker, användning i cola, kalifornisk varning och säkrare alternativ. ✓ Säkerhetsinfo'
),

-- E171 - Titandioxid (Controversial whitener, banned in EU food)
('E171', 'Titandioxid', 'Titanium dioxide', 'e171-titandioxid', 'Färgämne', 'Syntetisk', 8, 'Negativ',
 NULL, 'Förbjuden i EU från 2022', 'Förbjuden i EU-livsmedel sedan 2022. Nanopartiklar misstänks vara skadliga.',
 '{"documented": ["Inflammatoriska reaktioner i djurstudier"], "suspected": ["Cancer", "DNA-skador", "Immunsystemsstörningar"], "benefits": ["Vit färg", "Opacitet"], "risk_groups": ["Alla - förbjuden i EU-livsmedel"]}',
 '[{"category": "Kosmetika", "products": ["Solkräm", "Foundation", "Tandkräm"], "average_amount": "Variable"}, {"category": "Mediciner", "products": ["Tabletter", "Kapslar"], "average_amount": "Variable"}, {"category": "Förbjuden i", "products": ["EU-livsmedel sedan 2022"], "average_amount": "0mg - förbjuden"}]',
 ARRAY['Förbjuden i EU-livsmedel - undvik importerat godis', 'Kontrollera kosmetika och tandkräm', 'Välj titandioxidfria alternativ', 'Läs etiketter på importerade produkter'],
 ARRAY['Kalciumkarbonat (E170)', 'Zinkoxid', 'Risstärkelse', 'Naturliga vita färgämnen'],
 'Titandioxid (E171) är förbjuden i EU-livsmedel sedan 2022 på grund av hälsorisker från nanopartiklar.',
 'Titandioxid (E171) förbjöds i EU-livsmedel 2022 efter att EFSA inte kunde utesluta genotoxiska effekter. Nanopartiklar kan ackumuleras i kroppen och orsaka inflammation. Fortfarande tillåten i kosmetika och mediciner, men många länder överväger totalt förbud. USA och andra länder använder det fortfarande i livsmedel.',
 'E171 Titandioxid - EU-förbud, Nanopartikelrisker & Alternativ 2024',
 'E171 (Titandioxid): Förbjuden i EU-livsmedel 2022, nanopartikelrisker, genotoxiska effekter och säkra vita alternativ. ✓ EU-förbud ✓ Hälsovarning'
),

-- E202 - Kaliumsorbat (Safe preservative)
('E202', 'Kaliumsorbat', 'Potassium sorbate', 'e202-kaliumsorbat', 'Konserveringsmedel', 'Syntetisk', 1, 'Neutral',
 25, 'WHO/FAO', 'Säkert för barn. Ett av de mildaste konserveringsmedlen.',
 '{"documented": [], "suspected": [], "benefits": ["Effektivt mot jäst och mögel", "Milt konserveringsmedel", "Brett användningsområde"], "risk_groups": []}',
 '[{"category": "Vin", "products": ["Vitt vin", "Rosé", "Mousserande"], "average_amount": "100-200mg/l"}, {"category": "Juice", "products": ["Äppeljuice", "Druvsaft", "Smoothies"], "average_amount": "200-1000mg/l"}, {"category": "Mejeri", "products": ["Ost", "Yoghurt", "Crème fraiche"], "average_amount": "100-1000mg/kg"}]',
 ARRAY['Inga särskilda försiktighetsåtgärder - säkert konserveringsmedel'],
 ARRAY['Sorbinsyra (E200)', 'Askorbinsyra (E300)', 'Naturlig fermentering', 'Kylförvaring'],
 'Kaliumsorbat (E202) är ett säkert konserveringsmedel som förhindrar jäst- och mögeltillväxt.',
 'Kaliumsorbat (E202) är kaliumsaltet av sorbinsyra och anses vara ett av de säkraste konserveringsmedlen. Det är särskilt effektivt mot jäst och mögel och används ofta i vin, juice och mejeriprodukter. ADI-värdet är högt vilket innebär att det krävs mycket stora mängder för att orsaka problem.',
 'E202 Kaliumsorbat - Säkert Konserveringsmedel för Vin & Juice',
 'E202 (Kaliumsorbat): Säkert konserveringsmedel mot jäst och mögel, användning i vin och juice, högt ADI-värde. ✓ Säkert för alla'
),

-- E212 - Kaliumbenzoat (Preservative)
('E212', 'Kaliumbenzoat', 'Potassium benzoate', 'e212-kaliumbenzoat', 'Konserveringsmedel', 'Syntetisk', 4, 'Neutral',
 5, 'WHO/FAO', 'Säkrare än natriumbenzoat men kan fortfarande orsaka reaktioner hos känsliga.',
 '{"documented": ["Allergiska reaktioner hos känsliga"], "suspected": ["Astma-förvärring", "Hyperaktivitet"], "benefits": ["Effektiv konservering i sura miljöer"], "risk_groups": ["Astmatiker", "Allergibenägna personer"]}',
 '[{"category": "Läsk", "products": ["Diet-läsk", "Sportdrycker"], "average_amount": "100-300mg/l"}, {"category": "Såser", "products": ["Salladsdressing", "Marinader"], "average_amount": "500-1500mg/kg"}, {"category": "Konserver", "products": ["Inlagda grönsaker", "Relish"], "average_amount": "200-1000mg/kg"}]',
 ARRAY['Astmatiker bör vara försiktiga', 'Testa små mängder vid allergi', 'Välj alternativ om reaktioner uppstår', 'Begränsa tillsammans med färgämnen'],
 ARRAY['Sorbinsyra (E200)', 'Kaliumsorbat (E202)', 'Askorbinsyra (E300)', 'Ättiksyra (E260)'],
 'Kaliumbenzoat (E212) är ett konserveringsmedel som kan orsaka reaktioner hos astmatiker och allergiker.',
 'Kaliumbenzoat (E212) är kaliumsaltet av bensoesyra och används som konserveringsmedel i sura livsmedel. Det är något säkrare än natriumbenzoat men kan fortfarande orsaka allergiska reaktioner hos känsliga personer. Särskilt problematiskt för astmatiker som kan få förvärrade symtom.',
 'E212 Kaliumbenzoat - Konservering, Astmarisker & Alternativ',
 'E212 (Kaliumbenzoat): Konserveringsmedel i sura livsmedel, astmarisker, allergiska reaktioner och säkrare alternativ. ✓ Säkerhetsinfo'
),

-- E621 - Already added (MSG), skipping

-- E950 - Acesulfam K (Artificial sweetener)
('E950', 'Acesulfam K', 'Ace K', 'e950-acesulfam-k', 'Sötningsmedel', 'Syntetisk', 4, 'Neutral',
 9, 'EFSA', 'Säkrare än många andra konstgjorda sötningsmedel men begränsa ändå intaget.',
 '{"documented": [], "suspected": ["Insulinpåverkan", "Tarmflora-störningar"], "benefits": ["Värmetåligt", "Långtidslagring", "Inget bittert eftersmak"], "risk_groups": ["Diabetiker (övervakning)", "Personer med IBS"]}',
 '[{"category": "Läsk", "products": ["Coca-Cola Zero", "Pepsi Max", "Fanta Zero"], "average_amount": "30-200mg/l"}, {"category": "Godis", "products": ["Sockerfritt godis", "Tuggummi"], "average_amount": "100-500mg/100g"}, {"category": "Bakning", "products": ["Bakpulver för diabetiker", "Sötstoff"], "average_amount": "Variable"}]',
 ARRAY['Begränsa "light"- och "zero"-produkter', 'Diabetiker bör övervaka blodsocker', 'Rotera mellan olika sötningsmedel', 'Observera mag-tarmreaktioner'],
 ARRAY['Stevia', 'Erytritol', 'Xylitol', 'Monk fruit', 'Naturlig honung'],
 'Acesulfam K (E950) är ett konstgjort sötningsmedel som är 200 gånger sötare än socker.',
 'Acesulfam K (E950) är ett konstgjort sötningsmedel som ofta kombineras med andra sötningsmedel för att minska bittert eftersmak. Det är värmetåligt vilket gör det lämpligt för bakning. Nyare forskning tyder på att det kan påverka insulinresponsen och tarmfloran, men det anses säkrare än aspartam.',
 'E950 Acesulfam K (Ace K) - Säkerhet, Bakning & Tarmhälsa 2024',
 'E950 (Acesulfam K): Konstgjort sötningsmedel, säkerhet vs andra sötningsmedel, insulinpåverkan och naturliga alternativ. ✓ Jämförelser'
),

-- E952 - Cyklamat (Artificial sweetener, banned in some countries)
('E952', 'Cyklamat', 'Cyclamate', 'e952-cyklamat', 'Sötningsmedel', 'Syntetisk', 6, 'Negativ',
 7, 'EFSA', 'Förbjudet i USA sedan 1969. Kan orsaka cancerrisker enligt vissa studier.',
 '{"documented": ["Minskat fertilitet i djurstudier"], "suspected": ["Cancer", "Kromosomskador"], "benefits": ["Mycket sött", "Stabilt"], "risk_groups": ["Gravida", "Fertilitetsplanerade", "Barn"]}',
 '[{"category": "Läsk", "products": ["Vissa europeiska diet-läsk"], "average_amount": "50-400mg/l"}, {"category": "Tabletter", "products": ["Sötningsmedel-tabletter"], "average_amount": "10-50mg/tablett"}, {"category": "Bakning", "products": ["Diabetikerprodukter"], "average_amount": "Variable"}]',
 ARRAY['Gravida bör undvika helt', 'Förbjudet i USA - undvik importprodukter', 'Välj andra sötningsmedel', 'Kontrollera fertilitet vid hög konsumtion', 'Begränsa för barn'],
 ARRAY['Stevia', 'Sukralos (E955)', 'Erytritol', 'Xylitol'],
 'Cyklamat (E952) är förbjudet i USA och misstänks kunna orsaka cancer och fertilitetsproblem.',
 'Cyklamat (E952) förbjöds i USA 1969 efter djurstudier som visade cancerrisker och fertilitetseffekter. Trots att det fortfarande är godkänt i EU med begränsningar, rekommenderar många att undvika det, särskilt gravida och barn. Det är 30-50 gånger sötare än socker.',
 'E952 Cyklamat - USA-förbud, Cancerrisker & Säkra Alternativ 2024',
 'E952 (Cyklamat): Förbjudet i USA sedan 1969, cancerrisker, fertilitetseffekter och säkrare sötningsmedel. ✓ Säkerhetsvarning'
);

-- Update sitemap with more E-additives URLs
-- This will be handled automatically when more pages are created