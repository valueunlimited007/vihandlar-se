-- Phase 1: Fix artificial food names with proper Swedish names
-- Replace "Xylem Kale" with proper Swedish "Grönkål" 
-- Replace "Paulo Dulce" with proper Swedish "Honungsmelon"
-- Add proper sources and improve descriptions

UPDATE foods 
SET 
  name = 'Grönkål',
  slug = 'gronkal',
  short_description = 'Näringsrik bladgrönsak med höga halter av K-vitamin och antioxidanter',
  long_description = 'Grönkål är en av de mest näringsrika grönsakerna med extremt höga halter av K-vitamin, C-vitamin och folsyra. Innehåller också kraftfulla antioxidanter som lutein och zeaxantin. Forskning visar att grönkål kan stödja hjärt-kärlhälsan och har antiinflammatoriska egenskaper. Källa: Livsmedelsverket och USDA FoodData Central.',
  usage_tips = ARRAY[
    'Massera med olivolja för att mildra bitterheten i sallader',
    'Baka till knapriga chips i ugnen på 150°C',
    'Mixa i gröna smoothies tillsammans med frukt',
    'Använd som bas i hälsosamma bowls'
  ],
  meta_title = 'Grönkål - Näringsrik superfood full av K-vitamin | ViHandlar',
  meta_description = 'Upptäck grönkåls höga halt av K-vitamin, antioxidanter och hälsofördelar. Komplett näringsinfo från Livsmedelsverket och användarguide.'
WHERE slug = 'xylem-kale-gronkal';

UPDATE foods 
SET 
  name = 'Honungsmelon',
  slug = 'honungsmelon', 
  short_description = 'Söt och saftig melon med högt innehåll av vitamin A och C',
  long_description = 'Honungsmelon är en söt och saftig frukt som är rik på vitamin A (betakaroten) och C. Innehåller också kalium som är viktigt för hjärtfunktionen och blodtrycksreglering. Meloner har lågt kaloriinnehåll och högt vatteninnehåll vilket gör dem perfekta för återfuktning. Källa: Livsmedelsverket och europeiska näringsdatabasen.',
  usage_tips = ARRAY[
    'Välj melon som ger lite efter tryck vid stjälkänden',
    'Servera kyld som efterrätt eller mellanmål', 
    'Kombinera med prosciutto för italiensk antipasti',
    'Mixa till refrescherande smoothies'
  ],
  meta_title = 'Honungsmelon - Söt frukt rik på vitamin A och C | ViHandlar',
  meta_description = 'Lär dig om honungsmelons näringsfördelar, höga halt av vitamin A och C. Information från Livsmedelsverket om val och förvaring.'
WHERE slug = 'paulo-dulce-honungsmelon';