-- Add high-priority E-additives batch 8 - More preservatives, acids, and commonly used additives
INSERT INTO public.e_additives (
  e_number, name, common_name, slug, category, origin, risk_score, longevity_impact,
  adi_value, adi_source, children_note, health_effects, common_products,
  avoidance_tips, natural_alternatives, short_description, long_description,
  meta_title, meta_description
) VALUES

-- E218 - Methylparaben (Preservative with hormone concerns)
('E218', 'p-Hydroxibensoesyrametylester', 'Methylparaben', 'e218-p-hydroxibensoesyrametylester', 'Konserveringsmedel', 'Syntetisk', 6, 'Negativ',
 0.3, 'EFSA', 'Misstänks störa hormonsystemet. Begränsa för barn och gravida.',
 '{"documented": ["Allergiska reaktioner", "Hudirritationer"], "suspected": ["Hormonstörningar", "Östrogen-liknande effekter", "Fertilitetseffekter"], "benefits": ["Effektivt konserveringsmedel", "Brett spektrum"], "risk_groups": ["Gravida", "Hormonkänsliga", "Barn", "Personer med hormonstörningar"]}',
 '[{"category": "Kosmetika", "products": ["Ansiktskrämer", "Smink", "Duschmjöl"], "average_amount": "0.1-0.8%"}, {"category": "Mediciner", "products": ["Flytande mediciner", "Sirap"], "average_amount": "0.1-0.2%"}, {"category": "Livsmedel", "products": ["Vissa konserver", "Såser"], "average_amount": "100-1000mg/kg"}]',
 ARRAY['Begränsa för gravida och barn', 'Välj parabenfria kosmetika', 'Kontrollera ingredienslistor', 'Undvik vid hormonkänslighet', 'Läs medicin-bipacksedlar'],
 ARRAY['Sorbinsyra (E200)', 'Askorbinsyra (E300)', 'Naturliga konserveringsmedel', 'Parabenfria alternativ'],
 'p-Hydroxibensoesyrametylester (E218) är ett konserveringsmedel som misstänks störa hormonsystemet.',
 'p-Hydroxibensoesyrametylester (E218), även känd som methylparaben, är ett konserveringsmedel som kan ha östrogen-liknande effekter i kroppen. Det kan störa hormonsystemet och påverka fertilitet enligt vissa studier. Särskilt problematiskt under graviditet och för barn. Många väljer parabenfria alternativ.',
 'E218 Methylparaben - Hormonstörningar, Graviditetsrisker & Parabenfria Alternativ',
 'E218 (p-Hydroxibensoesyrametylester): Konserveringsmedel med hormonstörningar, graviditetsrisker, parabenfria alternativ. ✓ Hormonvarning ✓ Graviditetsvarning'
),

-- E285 - Sodium tetraborate (Dangerous, should be avoided)
('E285', 'Natriumtetraborat', 'Borax', 'e285-natriumtetraborat-borax', 'Konserveringsmedel', 'Syntetisk', 9, 'Negativ',
 0.16, 'EFSA', 'FARLIGT! Förbjudet i många länder. Toxiskt för barn. Undvik helt.',
 '{"documented": ["Reproduktionstoxicitet", "Fosterskador", "Hormonstörningar"], "suspected": ["Cancer", "Utvecklingsstörningar"], "benefits": ["Kraftfullt konserveringsmedel"], "risk_groups": ["Gravida", "Barn", "Fertilitetsplanerade", "Alla bör undvika"]}',
 '[{"category": "Förbjuden i", "products": ["EU-livsmedel (begränsad)", "Många länder"], "average_amount": "Undvik helt"}, {"category": "Industri", "products": ["Rengöringsmedel", "Insekticider"], "average_amount": "Ej för konsumtion"}, {"category": "Import", "products": ["Vissa importerade produkter"], "average_amount": "Kontrollera förbud"}]',
 ARRAY['UNDVIK HELT - toxiskt!', 'Förbjudet i många länder', 'Kontrollera importerade produkter', 'Särskilt farligt för gravida och barn', 'Läs ingredienslistor mycket noga'],
 ARRAY['Alla andra säkrare konserveringsmedel', 'Sorbinsyra (E200)', 'Askorbinsyra (E300)', 'Kyl-förvaring'],
 'Natriumtetraborat/Borax (E285) är extremt farligt och toxiskt - undvik helt!',
 'Natriumtetraborat (E285), även känt som borax, är ett mycket farligt konserveringsmedel som kan orsaka fosterskador, hormonstörningar och reproduktionstoxicitet. Det är förbjudet eller starkt begränsat i många länder. Absolut inte säkert för konsumtion, särskilt för gravida och barn. Undvik helt!',
 'E285 Natriumtetraborat (Borax) - FARLIGT! Toxiskt & Förbjudet',
 'E285 (Natriumtetraborat/Borax): FARLIGT konserveringsmedel, reproduktionstoxiskt, fosterskador, förbjudet i många länder. ✓ FARLIGT ✓ Undvik helt!'
),

-- E422 - Glycerol (Safe, natural humectant)
('E422', 'Glycerol', 'Glycerin', 'e422-glycerol', 'Fuktighetsbevarande medel', 'Naturlig', 1, 'Neutral',
 NULL, 'EFSA', 'Mycket säkert för barn. Naturlig alkohol som kroppen också producerar.',
 '{"documented": [], "suspected": [], "benefits": ["Naturlig fuktighet", "Mjukgörande", "Naturligt i kroppen", "Söt smak"], "risk_groups": []}',
 '[{"category": "Bakverk", "products": ["Mjuka kakor", "Tårtor", "Bröd"], "average_amount": "1-5%"}, {"category": "Kosmetika", "products": ["Hudkräm", "Tandkräm", "Schampo"], "average_amount": "1-20%"}, {"category": "Medicin", "products": ["Hostmedicin", "Kapslar"], "average_amount": "Variable"}]',
 ARRAY['Inga försiktighetsåtgärder - naturligt och säkert'],
 ARRAY['Naturlig glycerol från växtoljor', 'Honung (innehåller naturlig glycerol)', 'Naturlig fuktighet'],
 'Glycerol (E422) är en naturlig alkohol som håller produkter mjuka och fuktiga - helt säker.',
 'Glycerol (E422), även känt som glycerin, är en naturlig trevärd alkohol som produceras vid fett-nedbrytning. Det finns naturligt i alla fetter och oljor och produceras även i kroppen. Används för att hålla produkter mjuka och fuktiga. Helt säkert och används också i kosmetika och mediciner.',
 'E422 Glycerol (Glycerin) - Naturlig Fuktighetsbevarande Alkohol',
 'E422 (Glycerol): Naturlig alkohol för fuktighet, produceras i kroppen, mjukgörande, säker för alla. ✓ Naturlig ✓ Kroppsegen ✓ Säker'
),

-- E953 - Isomalt (Sugar alcohol for diabetics)
('E953', 'Isomalt', 'Isomalt', 'e953-isomalt', 'Sötningsmedel', 'Syntetisk', 3, 'Neutral',
 NULL, 'EFSA', 'Säkert för barn och bra för tänderna, men kan orsaka magbesvär vid höga doser.',
 '{"documented": ["Laxerande effekt vid höga doser", "Magbesvär"], "suspected": [], "benefits": ["Tandvänligt", "Mycket likt socker", "Bra för bakning", "Låg påverkan på blodsocker"], "risk_groups": ["Personer med IBS", "Känsliga mag-tarmsystem"]}',
 '[{"category": "Diabetikerprodukter", "products": ["Diabetikerchoklad", "Sockerfritt godis"], "average_amount": "Variable"}, {"category": "Bakning", "products": ["Diabetiker-bakverk", "Sockerfri bakning"], "average_amount": "Variable"}, {"category": "Godis", "products": ["Hård karamell", "Klubbor"], "average_amount": "50-100% av söthet"}]',
 ARRAY['Börja med små mängder för att undvika magbesvär', 'Begränsa till <20g per dag initialt', 'Mycket bra för tänderna', 'Perfekt för diabetiker-bakning'],
 ARRAY['Xylitol (E967)', 'Erytritol', 'Maltitol (E965)', 'Stevia (E960)'],
 'Isomalt (E953) är ett tandvänligt sötningsmedel som är perfekt för diabetiker och bakning.',
 'Isomalt (E953) framställs från socker men har endast hälften så många kalorier och minimal påverkan på blodsocker. Det är särskilt populärt för bakning eftersom det beter sig mycket likt vanligt socker när det värms upp. Tandvänligt och säkert, men kan orsaka magbesvär vid höga doser likt andra sockeralkoholer.',
 'E953 Isomalt - Diabetikersötningsmedel för Bakning & Tandskydd',
 'E953 (Isomalt): Sötningsmedel för diabetiker och bakning, tandvänligt, halvt så många kalorier, magbesvär-varning. ✓ Diabetikerlämplig ✓ Bakning ✓ Tandvänligt'
);

-- Now we have covered most high-priority E-additives from the major categories