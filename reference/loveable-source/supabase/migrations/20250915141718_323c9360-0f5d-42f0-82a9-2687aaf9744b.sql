-- Add high-priority E-additives batch 2
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E100 - Kurkumin (Natural yellow, safe)
('E100', 'Kurkumin', 'Gurkmeja-extrakt', 'e100-kurkumin', 'Färgämne', 'Naturlig', 1, 'Positiv',
 3, 'EFSA', 'Säkert för barn. Naturlig färg från gurkmeja.',
 '{"documented": [], "suspected": [], "benefits": ["Antioxidant", "Antiinflammatorisk", "Naturlig färg"], "risk_groups": []}',
 '[{"category": "Kryddor", "products": ["Curry", "Gurkmeja", "Senap"], "average_amount": "10-100mg/100g"}, {"category": "Bageri", "products": ["Gult bröd", "Kex"], "average_amount": "5-20mg/100g"}, {"category": "Mejeri", "products": ["Färgad ost", "Smör"], "average_amount": "2-10mg/100g"}]',
 ARRAY['Inga särskilda försiktighetsåtgärder - naturlig och säker'],
 ARRAY['Naturlig gurkmeja', 'Saffran', 'Paprikapulver'],
 'Kurkumin (E100) är en naturlig gul färg utvunnen från gurkmeja, känd för sina antioxidant-egenskaper.',
 'Kurkumin (E100) är en naturlig färg som utvinns från gurkmeja (Curcuma longa). Den har använts i tusentals år både som krydda och färgämne. Kurkumin är välkänt för sina antioxidant- och antiinflammatoriska egenskaper. Det är en av de säkraste färgämnena och anses ha hälsofördelar snarare än risker.',
 'E100 Kurkumin (Gurkmeja) - Naturlig Färg med Hälsofördelar 2024',
 'Allt om E100 (Kurkumin): Naturlig gul färg från gurkmeja med antioxidant-egenskaper. ✓ Säkert för barn ✓ Hälsofördelar ✓ Naturligt ursprung'
),

-- E101 - Riboflavin (Vitamin B2)
('E101', 'Riboflavin', 'Vitamin B2', 'e101-riboflavin', 'Färgämne', 'Naturlig/Syntetisk', 1, 'Positiv',
 NULL, 'WHO', 'Säkert - det är ett vitamin som kroppen behöver.',
 '{"documented": [], "suspected": [], "benefits": ["Vitamin B2", "Nödvändigt för metabolism", "Ger gul-orange färg"], "risk_groups": []}',
 '[{"category": "Kosttillskott", "products": ["Vitamintabletter", "B-komplex"], "average_amount": "1-10mg/tablett"}, {"category": "Berikade livsmedel", "products": ["Frukostflingor", "Mjölkprodukter"], "average_amount": "0.1-2mg/100g"}]',
 ARRAY['Inga försiktighetsåtgärder - det är ett essentiellt vitamin'],
 ARRAY['Naturlig riboflavin från jäst', 'Kött', 'Mjölkprodukter', 'Gröna bladgrönsaker'],
 'Riboflavin (E101) är vitamin B2, en essentiell näringsämne som också används som gul-orange färg.',
 'Riboflavin (E101) är vitamin B2, en vattenlöslig vitamin som är essentiell för kroppens metabolism. Den används både som näringstillskott och som naturlig gul-orange färg i livsmedel. Eftersom det är ett essentiellt vitamin finns det inga säkerhetsproblem - tvärtom är det nödvändigt för god hälsa.',
 'E101 Riboflavin (Vitamin B2) - Essentiell Vitamin & Säker Färg',
 'E101 (Riboflavin) är vitamin B2 - en essentiell näringsämne som används som säker gul-orange färg. ✓ Hälsosamt ✓ Vitamin B2 ✓ Säkert för alla åldrar'
),

-- E110 - Para-orange (Controversial dye)
('E110', 'Para-orange', 'Sunset Yellow FCF', 'e110-para-orange', 'Färgämne', 'Syntetisk', 7, 'Negativ',
 2.5, 'EFSA', 'Kan orsaka hyperaktivitet hos känsliga barn. Southampton-studien bekräftar risker.',
 '{"documented": ["Hyperaktivitet hos känsliga barn", "Allergiska reaktioner"], "suspected": ["ADHD-förvärring", "Astma-förvärring"], "benefits": ["Billig orange färg"], "risk_groups": ["Barn med ADHD", "Allergiker", "Astmatiker"]}',
 '[{"category": "Godis", "products": ["Orange lösgodis", "Tuggummi", "Marshallows"], "average_amount": "10-100mg/100g"}, {"category": "Drycker", "products": ["Orange läsk", "Saft", "Sportdrycker"], "average_amount": "5-50mg/l"}, {"category": "Bakvaror", "products": ["Muffins", "Glasyr", "Tårtdekorer"], "average_amount": "20-80mg/100g"}]',
 ARRAY['Undvik orange-färgade produkter till barn', 'Läs ingredienslistor noga', 'Välj produkter märkta "utan konstgjorda färgämnen"', 'Begränsa processat godis'],
 ARRAY['Beta-karoten', 'Annattoextrakt (E160b)', 'Paprikaextrakt', 'Morötssaft'],
 'Para-orange (E110) är en syntetisk orange färg som kan orsaka hyperaktivitet hos känsliga barn.',
 'Para-orange (E110), även känt som Sunset Yellow FCF, är en syntetisk azofärg som används för att ge orange färg åt livsmedel. Southampton-studien från 2007 visade tydliga samband med hyperaktivitet hos barn. EU kräver varningstext på produkter med E110. Många länder har begränsat eller förbjudit användningen i barnprodukter.',
 'E110 Para-orange - Hyperaktivitetsrisker & Säkra Alternativ 2024',
 'E110 (Para-orange/Sunset Yellow): Southampton-studien, hyperaktivitet hos barn, säkerhetsvarningar och naturliga alternativ. ✓ Vetenskaplig evidens'
),

-- E120 - Karmin (Insect-derived, allergenic)
('E120', 'Karmin', 'Cochineal', 'e120-karmin', 'Färgämne', 'Naturlig', 4, 'Neutral',
 5, 'EFSA', 'Kan orsaka allergiska reaktioner. Undvik vid kocklos-allergi.',
 '{"documented": ["Allergiska reaktioner", "Astma-anfall"], "suspected": ["Anafylaktiska reaktioner"], "benefits": ["Naturlig röd färg", "Färgstabil"], "risk_groups": ["Allergiker", "Astmatiker", "Vegetarianer/Veganer"]}',
 '[{"category": "Godis", "products": ["Röda gelégodisar", "Marsipan", "Rött godis"], "average_amount": "10-200mg/100g"}, {"category": "Drycker", "products": ["Röda läskedrycker", "Fruktdrycker"], "average_amount": "5-30mg/l"}, {"category": "Kosmetika", "products": ["Läppstift", "Rouge", "Ögonskugga"], "average_amount": "Variable"}]',
 ARRAY['Undvik vid allergi mot kocklös', 'Kontrollera vegetarisk märkning', 'Läs ingrediensförteckningar noga', 'Testa små mängder först vid osäkerhet'],
 ARRAY['Rödbetsjuice', 'Antocyaner (E163)', 'Paprikaextrakt', 'Hibiskusextrakt'],
 'Karmin (E120) är en naturlig röd färg som utvinns från kocklöss-insekter och kan orsaka allergier.',
 'Karmin (E120) är en naturlig röd färg som utvinns från honhöns kocklöss (Dactylopius coccus). Trots att det är naturligt kan det orsaka allvarliga allergiska reaktioner hos känsliga personer. Det är inte lämpligt för vegetarianer eller veganer eftersom det kommer från insekter. Färgen är mycket stabil och ger en intensiv röd nyans.',
 'E120 Karmin (Kocklös) - Allergier, Vegetarisk Status & Alternativ',
 'E120 (Karmin): Naturlig röd färg från kocklös-insekter, allergirisker, vegetarisk status och säkra alternativ. ✓ Allergiinfo ✓ Vegetarisk guide'
),

-- E122 - Azorubin (Controversial red dye)
('E122', 'Azorubin', 'Carmoisin', 'e122-azorubin', 'Färgämne', 'Syntetisk', 6, 'Negativ',
 4, 'EFSA', 'Kan orsaka hyperaktivitet och allergiska reaktioner hos barn.',
 '{"documented": ["Hyperaktivitet hos känsliga barn", "Allergiska reaktioner"], "suspected": ["ADHD-förvärring", "Hudutslag"], "benefits": ["Stabil röd färg"], "risk_groups": ["Barn med ADHD", "Allergiker", "Astmatiker"]}',
 '[{"category": "Godis", "products": ["Rött lösgodis", "Gelé", "Kola"], "average_amount": "10-50mg/100g"}, {"category": "Bakvaror", "products": ["Röd glasyr", "Muffins", "Tårtdekoration"], "average_amount": "5-30mg/100g"}, {"category": "Drycker", "products": ["Röda drycker", "Alkoholfria cocktails"], "average_amount": "2-20mg/l"}]',
 ARRAY['Undvik röd-färgade produkter till känsliga barn', 'Kontrollera märkning för varningstext', 'Välj naturligt färgade alternativ', 'Begränsa konstgjort godis'],
 ARRAY['Rödbetsjuice', 'Antocyaner från bär', 'Karmin (för icke-veganer)', 'Hibiskusextrakt'],
 'Azorubin (E122) är en syntetisk röd färg som kan orsaka hyperaktivitet hos känsliga barn.',
 'Azorubin (E122), även känt som Carmoisin, är en syntetisk azofärg som ger en intensiv röd färg. Den ingick i Southampton-studien som visade samband med hyperaktivitet hos barn. EU kräver varningstext: "kan ha negativ inverkan på barns aktivitet och uppmärksamhet". Många producenter har ersatt E122 med naturliga alternativ.',
 'E122 Azorubin (Carmoisin) - Hyperaktivitet & Säkra Alternativ 2024',
 'E122 (Azorubin/Carmoisin): Southampton-studien, hyperaktivitetsrisker hos barn, EU-varningar och naturliga röda alternativ. ✓ Säkerhetsinfo'
),

-- E211 - Natriumbenzoat (Common preservative)
('E211', 'Natriumbenzoat', 'Sodium Benzoate', 'e211-natriumbenzoat', 'Konserveringsmedel', 'Syntetisk', 5, 'Neutral',
 5, 'WHO/FAO', 'Kan orsaka hyperaktivitet i kombination med konstgjorda färgämnen.',
 '{"documented": ["Hyperaktivitet i kombination med azofärger", "Astma-förvärring"], "suspected": ["Migrän", "Magsår-irritation"], "benefits": ["Effektiv konservering", "Förhindrar jäst och mögel"], "risk_groups": ["Barn (i kombination med färgämnen)", "Astmatiker"]}',
 '[{"category": "Läsk", "products": ["Coca-Cola", "Pepsi", "Sprite"], "average_amount": "100-500mg/l"}, {"category": "Såser", "products": ["Ketchup", "Majonnäs", "Dressingar"], "average_amount": "500-1000mg/kg"}, {"category": "Saft", "products": ["Fruktjuicer", "Koncentrat"], "average_amount": "200-800mg/l"}]',
 ARRAY['Begränsa läsk och saft med E211', 'Undvik kombination med konstgjorda färgämnen', 'Välj konserveringsmedelfria alternativ när möjligt', 'Kontrollera astma-reaktioner'],
 ARRAY['Sorbinsyra (E200)', 'Askorbinsyra (E300)', 'Naturlig fermentering', 'Kylförvaring'],
 'Natriumbenzoat (E211) är ett vanligt konserveringsmedel som kan orsaka hyperaktivitet kombinerat med färgämnen.',
 'Natriumbenzoat (E211) är ett av de mest använda konserveringsmedlen i livsmedelsindustrin. Det är effektivt mot jäst, mögel och bakterier i sura miljöer (pH under 4,5). Southampton-studien visade att E211 i kombination med konstgjorda färgämnen kan öka hyperaktivitet hos barn. Det kan också förvärra astma hos känsliga personer.',
 'E211 Natriumbenzoat - Hyperaktivitet, Astma & Säkra Alternativ',
 'E211 (Natriumbenzoat): Vanligt konserveringsmedel, Southampton-studien, hyperaktivitetsrisker och naturliga alternativ. ✓ Säkerhetsinfo'
),

-- E220 - Svaveldioxid (Sulfite preservative)
('E220', 'Svaveldioxid', 'Sulfur dioxide', 'e220-svaveldioxid', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ',
 0.7, 'WHO/FAO', 'Farligt för astmatiker. Kan utlösa allvarliga astmaanfall.',
 '{"documented": ["Astmaanfall", "Allergiska reaktioner", "Huvudvärk"], "suspected": ["Hyperaktivitet", "Magbesvär"], "benefits": ["Antioxidant", "Förhindrar brunfärgning"], "risk_groups": ["Astmatiker", "Allergiker", "Sulfitsensitiva personer"]}',
 '[{"category": "Vin", "products": ["Vitt vin", "Rött vin", "Mousserande"], "average_amount": "10-350mg/l"}, {"category": "Torkad frukt", "products": ["Russin", "Aprikoser", "Mango"], "average_amount": "500-2000mg/kg"}, {"category": "Juice", "products": ["Äppeljuice", "Citrusjuice"], "average_amount": "10-100mg/l"}]',
 ARRAY['Astmatiker ska undvika helt', 'Läs etiketter på vin och torkad frukt', 'Välj ekologiska alternativ', 'Skölj torkad frukt före konsumtion', 'Kontrollera sulfitfri märkning'],
 ARRAY['Askorbinsyra (E300)', 'Naturlig torkning utan tillsatser', 'Fryst frukt', 'Färsk frukt'],
 'Svaveldioxid (E220) är ett konserveringsmedel som kan vara farligt för astmatiker och allergiker.',
 'Svaveldioxid (E220) används främst som antioxidant och konserveringsmedel, särskilt i vin och torkad frukt. Det förhindrar brunfärgning och bakterietillväxt. För astmatiker kan E220 vara mycket farligt och utlösa allvarliga astmaanfall. EU kräver obligatorisk märkning när halten överstiger 10 mg/kg eller 10 mg/liter.',
 'E220 Svaveldioxid - Astmarisker, Vin & Sulfitfria Alternativ 2024',
 'E220 (Svaveldioxid): Farligt för astmatiker, användning i vin och torkad frukt, sulfitallergier och säkra alternativ. ✓ Astmavarning'
),

-- E300 - Askorbinsyra (Vitamin C)
('E300', 'Askorbinsyra', 'Vitamin C', 'e300-askorbinsyra', 'Antioxidationsmedel', 'Naturlig/Syntetisk', 1, 'Positiv',
 NULL, 'WHO', 'Säkert - det är vitamin C som kroppen behöver dagligen.',
 '{"documented": [], "suspected": [], "benefits": ["Vitamin C", "Antioxidant", "Förhindrar skörbjugg", "Stärker immunförsvaret"], "risk_groups": []}',
 '[{"category": "Juice", "products": ["Apelsinjuice", "Äppeljuice", "Multivitamin"], "average_amount": "100-500mg/l"}, {"category": "Konserver", "products": ["Fruktkonserver", "Sylt", "Marmelad"], "average_amount": "100-1000mg/kg"}, {"category": "Kosttillskott", "products": ["C-vitamintabletter", "Multivitaminer"], "average_amount": "500-1000mg/tablett"}]',
 ARRAY['Inga försiktighetsåtgärder - det är ett essentiellt vitamin'],
 ARRAY['Citrusfrukter', 'Kiwi', 'Jordgubbar', 'Paprika', 'Broccoli'],
 'Askorbinsyra (E300) är vitamin C - en essentiell antioxidant som också används som konserveringsmedel.',
 'Askorbinsyra (E300) är vitamin C, en vattenlöslig vitamin som är essentiell för människans hälsa. Den används både som näringstillskott och som naturlig antioxidant i livsmedel för att förhindra oxidation och bevara färg. Vitamin C är nödvändigt för immunförsvaret, kollagenbildning och järnupptag.',
 'E300 Askorbinsyra (Vitamin C) - Essentiell Antioxidant & Hälsa',
 'E300 (Askorbinsyra) är vitamin C - essentiell antioxidant för immunförsvar och hälsa. ✓ Säkert för alla ✓ Hälsofördelar ✓ Naturligt'
),

-- E951 already added, skipping

-- E320 - BHA (Controversial antioxidant)
('E320', 'BHA', 'Butylerad hydroxianisol', 'e320-bha', 'Antioxidationsmedel', 'Syntetisk', 8, 'Negativ',
 0.5, 'WHO/FAO', 'Misstänks vara cancerframkallande. Begränsa eller undvik helt.',
 '{"documented": ["Allergiska reaktioner", "Hudutslag"], "suspected": ["Cancer", "Hormonstörningar", "Hyperaktivitet"], "benefits": ["Förhindrar harskhet i fetter"], "risk_groups": ["Gravida", "Barn", "Hormonsensitiva personer"]}',
 '[{"category": "Flingor", "products": ["Frukostflingor", "Müsli"], "average_amount": "10-100mg/kg"}, {"category": "Bakverk", "products": ["Kex", "Kakor", "Bröd"], "average_amount": "20-200mg/kg"}, {"category": "Snacks", "products": ["Chips", "Nötter", "Popcorn"], "average_amount": "50-200mg/kg"}]',
 ARRAY['Undvik produkter med E320', 'Läs innehållsförteckningar noga', 'Välj BHA-fria alternativ', 'Kontrollera särskilt barnprodukter', 'Begränsa processade livsmedel'],
 ARRAY['Vitamin E (E306-E309)', 'Askorbinsyra (E300)', 'Rozmarinextrakt', 'Naturliga antioxidanter'],
 'BHA (E320) är en syntetisk antioxidant som misstänks vara cancerframkallande och bör undvikas.',
 'BHA (E320) - Butylerad hydroxianisol - är en syntetisk antioxidant som används för att förhindra harskhet i fettrika livsmedel. Den är klassad som "möjligen cancerframkallande för människor" av WHO:s cancerforskningsorganisation (IARC). Många länder har begränsat användningen och det finns säkrare naturliga alternativ tillgängliga.',
 'E320 BHA - Cancerrisker, Hormonstörningar & Säkra Alternativ 2024',
 'E320 (BHA): Misstänkt cancerframkallande antioxidant, hormonstörningar, IARC-klassning och naturliga alternativ. ✓ Säkerhetsvarning'
);

-- Performance indexes already exist from previous migration