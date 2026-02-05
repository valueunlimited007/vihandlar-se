-- Rensa befintliga listor (valfritt)
-- DELETE FROM public_items WHERE list_id IN (SELECT id FROM public_lists);
-- DELETE FROM public_lists;

-- ============================================
-- FRUKOST-VECKAN
-- ============================================
DO $$
DECLARE
  list_id_frukost UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('frukost-vecka', 'Frukost-veckan', 'Allt du behöver för en veckas varierad och näringsrik frukost', 'sv-SE')
  RETURNING id INTO list_id_frukost;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_frukost, 'Havregryn', '1 kg', 'Frukost', 0),
  (list_id_frukost, 'Banan', '7 st', 'Frukt', 1),
  (list_id_frukost, 'Blåbär', '250 g', 'Frukt', 2),
  (list_id_frukost, 'Naturell yoghurt', '1 kg', 'Mejeri', 3),
  (list_id_frukost, 'Honung', '1 burk', 'Övrigt', 4),
  (list_id_frukost, 'Ägg', '12 st', 'Mejeri', 5),
  (list_id_frukost, 'Fullkornsbröd', '1 limpa', 'Bageri', 6),
  (list_id_frukost, 'Smör', '250 g', 'Mejeri', 7),
  (list_id_frukost, 'Ost', '200 g', 'Mejeri', 8),
  (list_id_frukost, 'Skinka', '150 g', 'Chark', 9),
  (list_id_frukost, 'Apelsinjuice', '1 l', 'Dryck', 10);
END $$;

-- ============================================
-- LCHF-VECKAN
-- ============================================
DO $$
DECLARE
  list_id_lchf UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('lchf-vecka', 'LCHF-veckan', 'Komplett inköpslista för en veckas lågkolhydratskost', 'sv-SE')
  RETURNING id INTO list_id_lchf;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_lchf, 'Kyckling', '1 kg', 'Kött', 0),
  (list_id_lchf, 'Lax', '500 g', 'Fisk', 1),
  (list_id_lchf, 'Ägg', '18 st', 'Mejeri', 2),
  (list_id_lchf, 'Broccoli', '2 st', 'Grönsaker', 3),
  (list_id_lchf, 'Blomkål', '1 st', 'Grönsaker', 4),
  (list_id_lchf, 'Avokado', '4 st', 'Grönsaker', 5),
  (list_id_lchf, 'Spenat', '200 g', 'Grönsaker', 6),
  (list_id_lchf, 'Fetaost', '200 g', 'Mejeri', 7),
  (list_id_lchf, 'Olivolja', '0.5 l', 'Övrigt', 8),
  (list_id_lchf, 'Mandlar', '200 g', 'Övrigt', 9),
  (list_id_lchf, 'Grädde', '3 dl', 'Mejeri', 10);
END $$;

-- ============================================
-- VEGETARISK VECKA
-- ============================================
DO $$
DECLARE
  list_id_veg UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('vegetarisk-vecka', 'Vegetarisk Vecka', 'Proteinrik vegetarisk kost för hela veckan', 'sv-SE')
  RETURNING id INTO list_id_veg;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_veg, 'Kikärtor', '2 burkar', 'Konserver', 0),
  (list_id_veg, 'Linser', '500 g', 'Torra varor', 1),
  (list_id_veg, 'Tofu', '400 g', 'Proteiner', 2),
  (list_id_veg, 'Quinoa', '500 g', 'Torra varor', 3),
  (list_id_veg, 'Tomater', '1 kg', 'Grönsaker', 4),
  (list_id_veg, 'Paprika', '3 st', 'Grönsaker', 5),
  (list_id_veg, 'Zucchini', '2 st', 'Grönsaker', 6),
  (list_id_veg, 'Spenat', '300 g', 'Grönsaker', 7),
  (list_id_veg, 'Halloumi', '250 g', 'Mejeri', 8),
  (list_id_veg, 'Kokosmjölk', '2 burkar', 'Konserver', 9),
  (list_id_veg, 'Sojasås', '1 flaska', 'Kryddor', 10);
END $$;

-- ============================================
-- BARNFAMILJ VECKOHANDLING
-- ============================================
DO $$
DECLARE
  list_id_barn UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('barnfamilj-vecka', 'Barnfamilj Veckohandling', 'Barnvänlig veckohandling med näring och gott humör', 'sv-SE')
  RETURNING id INTO list_id_barn;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_barn, 'Mjölk', '3 l', 'Mejeri', 0),
  (list_id_barn, 'Köttfärs', '1 kg', 'Kött', 1),
  (list_id_barn, 'Pasta', '1 kg', 'Torra varor', 2),
  (list_id_barn, 'Krossade tomater', '2 burkar', 'Konserver', 3),
  (list_id_barn, 'Fruktyoghurt', '6 st', 'Mejeri', 4),
  (list_id_barn, 'Bananer', '10 st', 'Frukt', 5),
  (list_id_barn, 'Äpplen', '8 st', 'Frukt', 6),
  (list_id_barn, 'Gurka', '2 st', 'Grönsaker', 7),
  (list_id_barn, 'Морот', '1 kg', 'Grönsaker', 8),
  (list_id_barn, 'Ost', '500 g', 'Mejeri', 9),
  (list_id_barn, 'Flingor', '1 paket', 'Frukost', 10);
END $$;

-- ============================================
-- STUDENTBUDGET
-- ============================================
DO $$
DECLARE
  list_id_student UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('student-budget', 'Studentbudget', 'Prisvärd veckohandling perfekt för studenter', 'sv-SE')
  RETURNING id INTO list_id_student;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_student, 'Ris', '2 kg', 'Torra varor', 0),
  (list_id_student, 'Pasta', '1 kg', 'Torra varor', 1),
  (list_id_student, 'Köttfärs', '500 g', 'Kött', 2),
  (list_id_student, 'Ägg', '10 st', 'Mejeri', 3),
  (list_id_student, 'Lösvikt tomater', '500 g', 'Grönsaker', 4),
  (list_id_student, 'Lök', '1 kg', 'Grönsaker', 5),
  (list_id_student, 'Vitlök', '1 st', 'Grönsaker', 6),
  (list_id_student, 'Havregryn', '1 kg', 'Frukost', 7),
  (list_id_student, 'Mjölk', '2 l', 'Mejeri', 8),
  (list_id_student, 'Knäckebröd', '1 paket', 'Bageri', 9),
  (list_id_student, 'Bönor', '2 burkar', 'Konserver', 10);
END $$;

-- ============================================
-- FREDAGSMYS
-- ============================================
DO $$
DECLARE
  list_id_fredagsmys UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('fredagsmys', 'Fredagsmys', 'Allt för en mysig fredagskväll hemma', 'sv-SE')
  RETURNING id INTO list_id_fredagsmys;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_fredagsmys, 'Chips', '2 påsar', 'Snacks', 0),
  (list_id_fredagsmys, 'Dipsås', '2 st', 'Snacks', 1),
  (list_id_fredagsmys, 'Läsk', '2 l', 'Dryck', 2),
  (list_id_fredagsmys, 'Godis', '500 g', 'Snacks', 3),
  (list_id_fredagsmys, 'Glass', '1 l', 'Mejeri', 4),
  (list_id_fredagsmys, 'Pizza', '2 st', 'Fryst', 5),
  (list_id_fredagsmys, 'Popcorn', '2 påsar', 'Snacks', 6),
  (list_id_fredagsmys, 'Choklad', '200 g', 'Snacks', 7);
END $$;

-- ============================================
-- FEST FÖR 10 PERSONER
-- ============================================
DO $$
DECLARE
  list_id_fest UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('fest-10-personer', 'Fest för 10 Personer', 'Komplett lista för en lyckad festkväll', 'sv-SE')
  RETURNING id INTO list_id_fest;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_fest, 'Hamburgerbröd', '12 st', 'Bageri', 0),
  (list_id_fest, 'Hamburgare', '1.5 kg', 'Kött', 1),
  (list_id_fest, 'Sallad', '2 st', 'Grönsaker', 2),
  (list_id_fest, 'Tomater', '1 kg', 'Grönsaker', 3),
  (list_id_fest, 'Rödlök', '3 st', 'Grönsaker', 4),
  (list_id_fest, 'Ost', '500 g', 'Mejeri', 5),
  (list_id_fest, 'Dressingssås', '2 flaskor', 'Övrigt', 6),
  (list_id_fest, 'Chips', '4 påsar', 'Snacks', 7),
  (list_id_fest, 'Läsk', '6 l', 'Dryck', 8),
  (list_id_fest, 'Öl', '12 burkar', 'Dryck', 9),
  (list_id_fest, 'Vin', '3 flaskor', 'Dryck', 10),
  (list_id_fest, 'Glass', '2 l', 'Mejeri', 11);
END $$;

-- ============================================
-- MATLÅDEVECKAN
-- ============================================
DO $$
DECLARE
  list_id_matlada UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('matlada-vecka', 'Matlådeveckan', 'Smart meal prep för hela arbetsveckan', 'sv-SE')
  RETURNING id INTO list_id_matlada;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_matlada, 'Kyckling', '1.5 kg', 'Kött', 0),
  (list_id_matlada, 'Ris', '1 kg', 'Torra varor', 1),
  (list_id_matlada, 'Broccoli', '3 st', 'Grönsaker', 2),
  (list_id_matlada, 'Морот', '1 kg', 'Grönsaker', 3),
  (list_id_matlada, 'Paprika', '4 st', 'Grönsaker', 4),
  (list_id_matlada, 'Kikärtor', '2 burkar', 'Konserver', 5),
  (list_id_matlada, 'Quinoa', '500 g', 'Torra varor', 6),
  (list_id_matlada, 'Sojasås', '1 flaska', 'Kryddor', 7),
  (list_id_matlada, 'Olivolja', '0.5 l', 'Övrigt', 8),
  (list_id_matlada, 'Vitlök', '1 st', 'Grönsaker', 9),
  (list_id_matlada, 'Ingefära', '1 st', 'Grönsaker', 10);
END $$;

-- ============================================
-- HÄLSOSAM START
-- ============================================
DO $$
DECLARE
  list_id_halsa UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('halsosam-start', 'Hälsosam Start', 'Smoothies, sallader och hälsosamma mellanmål', 'sv-SE')
  RETURNING id INTO list_id_halsa;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_halsa, 'Spenat', '300 g', 'Grönsaker', 0),
  (list_id_halsa, 'Bananer', '6 st', 'Frukt', 1),
  (list_id_halsa, 'Blåbär', '300 g', 'Frukt', 2),
  (list_id_halsa, 'Avokado', '3 st', 'Grönsaker', 3),
  (list_id_halsa, 'Mandelmjölk', '1 l', 'Mejeri', 4),
  (list_id_halsa, 'Chiafron', '200 g', 'Övrigt', 5),
  (list_id_halsa, 'Nötter', '300 g', 'Övrigt', 6),
  (list_id_halsa, 'Quinoa', '500 g', 'Torra varor', 7),
  (list_id_halsa, 'Sallad', '2 st', 'Grönsaker', 8),
  (list_id_halsa, 'Ruccola', '1 påse', 'Grönsaker', 9),
  (list_id_halsa, 'Fetaost', '150 g', 'Mejeri', 10);
END $$;

-- ============================================
-- VARDAGSMIDDAGAR
-- ============================================
DO $$
DECLARE
  list_id_middag UUID;
BEGIN
  INSERT INTO public_lists (slug, title, description, lang) 
  VALUES ('vardagsmiddagar', 'Vardagsmiddagar', 'Fem enkla och snabba middagsrätter', 'sv-SE')
  RETURNING id INTO list_id_middag;

  INSERT INTO public_items (list_id, name, quantity, category, position) VALUES
  (list_id_middag, 'Köttfärs', '1 kg', 'Kött', 0),
  (list_id_middag, 'Kyckling', '800 g', 'Kött', 1),
  (list_id_middag, 'Pasta', '500 g', 'Torra varor', 2),
  (list_id_middag, 'Ris', '500 g', 'Torra varor', 3),
  (list_id_middag, 'Krossade tomater', '2 burkar', 'Konserver', 4),
  (list_id_middag, 'Grädde', '3 dl', 'Mejeri', 5),
  (list_id_middag, 'Lök', '5 st', 'Grönsaker', 6),
  (list_id_middag, 'Vitlök', '2 st', 'Grönsaker', 7),
  (list_id_middag, 'Paprika', '3 st', 'Grönsaker', 8),
  (list_id_middag, 'Морот', '500 g', 'Grönsaker', 9),
  (list_id_middag, 'Potatis', '1.5 kg', 'Grönsaker', 10);
END $$;

-- Visa alla skapade listor
SELECT pl.title, pl.description, COUNT(pi.id) as antal_varor
FROM public_lists pl
LEFT JOIN public_items pi ON pl.id = pi.list_id
GROUP BY pl.id, pl.title, pl.description
ORDER BY pl.created_at DESC;
