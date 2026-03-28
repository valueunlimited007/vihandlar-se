// lib/data/nutrients.ts

import { getAllFoods } from "@/lib/data/foods";

export interface NutrientConfig {
  slug: string;
  name: string;           // Swedish display name
  field: string;          // Field name in Food type
  unit: string;           // g, mg, µg, kcal, kJ, %
  category: "macro" | "vitamin" | "mineral" | "fatty_acid" | "other";
  categoryName: string;   // Swedish category name
  description: string;    // Short description (1-2 sentences)
  rdi?: number;           // Recommended daily intake (for adults)
  rdiUnit?: string;       // Unit for RDI
  rdiSource?: string;     // Source for RDI value
}

export const NUTRIENTS: NutrientConfig[] = [
  // === Makronäringsämnen ===
  {
    slug: "kalorier",
    name: "Kalorier",
    field: "calories",
    unit: "kcal",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Energiinnehåll i kilokalorier. Anger hur mycket energi livsmedlet ger kroppen.",
    rdi: 2000,
    rdiUnit: "kcal",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "energi-kj",
    name: "Energi (kJ)",
    field: "energy_kj",
    unit: "kJ",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Energiinnehåll i kilojoule. Internationell enhet för energi i livsmedel.",
    rdi: 8400,
    rdiUnit: "kJ",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "protein",
    name: "Protein",
    field: "protein",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Protein är nödvändigt för muskler, celler och immunförsvaret. Byggstenarna i kroppen.",
    rdi: 50,
    rdiUnit: "g",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "fett",
    name: "Fett, totalt",
    field: "fat",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Totalt fettinnehåll. Fett ger energi och hjälper kroppen ta upp fettlösliga vitaminer.",
    rdi: 70,
    rdiUnit: "g",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "kolhydrater",
    name: "Kolhydrater",
    field: "carbohydrates",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Tillgängliga kolhydrater ger kroppen snabb energi. Hjärnans primära bränsle.",
    rdi: 260,
    rdiUnit: "g",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "fiber",
    name: "Fiber",
    field: "fiber",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Kostfiber främjar matsmältningen, mättar och bidrar till god tarmhälsa.",
    rdi: 25,
    rdiUnit: "g",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "socker",
    name: "Sockerarter, totalt",
    field: "sugar_total",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Totalt sockerinnehåll inklusive naturliga och tillsatta sockerarter.",
  },
  {
    slug: "vatten",
    name: "Vatten",
    field: "water",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Vatteninnehåll per 100 gram. Livsmedel med hög vattenhalt har generellt lägre energitäthet.",
  },
  {
    slug: "alkohol",
    name: "Alkohol",
    field: "alcohol",
    unit: "g",
    category: "macro",
    categoryName: "Makronäringsämnen",
    description: "Alkoholinnehåll (etanol) per 100 gram. Ger 7 kcal per gram men saknar näringsvärde.",
  },

  // === Vitaminer ===
  {
    slug: "vitamin-a",
    name: "Vitamin A",
    field: "vitamin_a",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin A är viktigt för synen, immunförsvaret och celldelning. Finns som retinol i animaliska produkter och betakaroten i grönsaker.",
    rdi: 900,
    rdiUnit: "µg RE",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "retinol",
    name: "Retinol",
    field: "retinol",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Retinol är den aktiva formen av vitamin A som finns i animaliska livsmedel som lever, ägg och mejeriprodukter.",
  },
  {
    slug: "betakaroten",
    name: "Betakaroten",
    field: "beta_carotene",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Betakaroten är en karoten som kroppen omvandlar till vitamin A. Finns i orange och gröna grönsaker som morötter och spenat.",
  },
  {
    slug: "vitamin-d",
    name: "Vitamin D",
    field: "vitamin_d",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin D behövs för kalciumupptag och starka ben. Bildas i huden av solljus men behöver ofta tillskott i Sverige.",
    rdi: 10,
    rdiUnit: "µg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-e",
    name: "Vitamin E",
    field: "vitamin_e",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin E är en antioxidant som skyddar cellerna mot oxidativ stress.",
    rdi: 10,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-k",
    name: "Vitamin K",
    field: "vitamin_k",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin K behövs för blodets koagulering och benhälsa. Finns rikligt i gröna bladgrönsaker.",
    rdi: 75,
    rdiUnit: "µg",
    rdiSource: "EFSA",
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C",
    field: "vitamin_c",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin C stärker immunförsvaret, ökar järnupptaget och är en kraftfull antioxidant. Finns rikligt i citrusfrukter, paprika och bär.",
    rdi: 75,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-b1",
    name: "Tiamin (B1)",
    field: "thiamin_b1",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Tiamin (vitamin B1) behövs för energiomsättningen och nervsystemets funktion.",
    rdi: 1.1,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-b2",
    name: "Riboflavin (B2)",
    field: "riboflavin_b2",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Riboflavin (vitamin B2) bidrar till energiomsättningen och hjälper till att omvandla mat till energi.",
    rdi: 1.4,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-b3",
    name: "Niacin (B3)",
    field: "niacin_b3",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Niacin (vitamin B3) behövs för energiomsättningen, nervsystemet och hudens hälsa.",
    rdi: 16,
    rdiUnit: "mg NE",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-b6",
    name: "Vitamin B6",
    field: "vitamin_b6",
    unit: "mg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin B6 är viktigt för proteinomsättningen, bildning av röda blodkroppar och immunförsvaret.",
    rdi: 1.4,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12",
    field: "vitamin_b12",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Vitamin B12 behövs för nervsystemet och bildning av röda blodkroppar. Finns främst i animaliska livsmedel.",
    rdi: 2,
    rdiUnit: "µg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "folat",
    name: "Folat",
    field: "folate",
    unit: "µg",
    category: "vitamin",
    categoryName: "Vitaminer",
    description: "Folat (folsyra/vitamin B9) är viktigt för celldelning och fostrets utveckling. Extra viktigt vid graviditet.",
    rdi: 300,
    rdiUnit: "µg",
    rdiSource: "Livsmedelsverket",
  },

  // === Mineraler ===
  {
    slug: "jarn",
    name: "Järn",
    field: "iron",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Järn transporterar syre i blodet via hemoglobin. Järnbrist är en av världens vanligaste bristsjukdomar.",
    rdi: 15,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "kalcium",
    name: "Kalcium",
    field: "calcium",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Kalcium bygger starka ben och tänder. Viktigt för muskelkontraktion och nervfunktion.",
    rdi: 800,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "kalium",
    name: "Kalium",
    field: "potassium",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Kalium reglerar vätskebalansen, blodtrycket och muskel- och nervfunktionen.",
    rdi: 3500,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "magnesium",
    name: "Magnesium",
    field: "magnesium",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Magnesium behövs för muskler, nerver, skelett och energiomsättning. Medverkar i hundratals enzymatiska reaktioner.",
    rdi: 350,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "fosfor",
    name: "Fosfor",
    field: "phosphorus",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Fosfor är en viktig del av ben och tänder samt cellmembran och DNA.",
    rdi: 600,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "jod",
    name: "Jod",
    field: "iodine",
    unit: "µg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Jod behövs för sköldkörtelns hormonproduktion som styr ämnesomsättningen.",
    rdi: 150,
    rdiUnit: "µg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "selen",
    name: "Selen",
    field: "selenium",
    unit: "µg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Selen är en antioxidant som skyddar cellerna och bidrar till sköldkörtelns funktion och immunförsvaret.",
    rdi: 60,
    rdiUnit: "µg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "zink",
    name: "Zink",
    field: "zinc",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Zink bidrar till immunförsvaret, sårläkning, celldelning och smak- och luktsinnet.",
    rdi: 9,
    rdiUnit: "mg",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "natrium",
    name: "Natrium",
    field: "sodium",
    unit: "mg",
    category: "mineral",
    categoryName: "Mineraler",
    description: "Natrium reglerar vätskebalansen. De flesta får i sig för mycket via salt (NaCl).",
  },

  // === Fettsyror ===
  {
    slug: "mattat-fett",
    name: "Mättat fett",
    field: "saturated_fat",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Mättat fett bör begränsas. Högt intag ökar risken för hjärt-kärlsjukdom.",
  },
  {
    slug: "enkelomattat-fett",
    name: "Enkelomättat fett",
    field: "monounsaturated_fat",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Enkelomättat fett (t.ex. olivolja) är bra för hjärtat och sänker LDL-kolesterol.",
  },
  {
    slug: "fleromattatt-fett",
    name: "Fleromättat fett",
    field: "polyunsaturated_fat",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Fleromättat fett (omega-3 och omega-6) är essentiellt -- kroppen kan inte tillverka det själv.",
  },
  {
    slug: "omega-3",
    name: "Omega-3",
    field: "omega_3",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Omega-3-fettsyror (EPA, DHA, ALA) minskar inflammation och är bra för hjärta och hjärna. Finns rikligt i fet fisk.",
  },
  {
    slug: "epa",
    name: "EPA",
    field: "epa",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Eikosapentaensyra (EPA) är en omega-3-fettsyra med antiinflammatoriska egenskaper. Finns främst i fet fisk.",
  },
  {
    slug: "dha",
    name: "DHA",
    field: "dha",
    unit: "g",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Dokosahexaensyra (DHA) är en omega-3-fettsyra viktig för hjärnans och ögonens funktion. Finns främst i fet fisk.",
  },
  {
    slug: "kolesterol",
    name: "Kolesterol",
    field: "cholesterol",
    unit: "mg",
    category: "fatty_acid",
    categoryName: "Fettsyror",
    description: "Kolesterol behövs för cellmembran och hormonproduktion. Finns enbart i animaliska produkter.",
  },

  // === Övrigt ===
  {
    slug: "salt",
    name: "Salt",
    field: "salt",
    unit: "g",
    category: "other",
    categoryName: "Övrigt",
    description: "Salt (NaCl) ger smak men kan höja blodtrycket vid för högt intag. Rekommenderat max 6 g per dag.",
    rdi: 6,
    rdiUnit: "g",
    rdiSource: "Livsmedelsverket",
  },
  {
    slug: "fullkorn",
    name: "Fullkorn",
    field: "whole_grain",
    unit: "g",
    category: "other",
    categoryName: "Övrigt",
    description: "Fullkorn innehåller hela sädeskornet inklusive kli, grodd och endosperm. Ger fiber, vitaminer och mineraler.",
  },
  {
    slug: "tillsatt-socker",
    name: "Tillsatt socker",
    field: "added_sugar",
    unit: "g",
    category: "other",
    categoryName: "Övrigt",
    description: "Tillsatt socker är socker som tillförts vid tillverkning, inte det naturliga sockret i frukter och mjölk.",
  },
  {
    slug: "fritt-socker",
    name: "Fritt socker",
    field: "free_sugar",
    unit: "g",
    category: "other",
    categoryName: "Övrigt",
    description: "Fritt socker inkluderar tillsatt socker samt naturligt socker i juice och honung. Bör begränsas till under 10 % av energiintaget.",
  },
];

// Pre-built lookup maps for fast access
const nutrientBySlug = new Map<string, NutrientConfig>(
  NUTRIENTS.map((n) => [n.slug, n])
);
const nutrientByField = new Map<string, NutrientConfig>(
  NUTRIENTS.map((n) => [n.field, n])
);

// Data access functions

export function getAllNutrients(): NutrientConfig[] {
  return NUTRIENTS;
}

export function getNutrientBySlug(slug: string): NutrientConfig | undefined {
  return nutrientBySlug.get(slug);
}

export function getNutrientByField(field: string): NutrientConfig | undefined {
  return nutrientByField.get(field);
}

export function getNutrientsByCategory(
  category: NutrientConfig["category"]
): NutrientConfig[] {
  return NUTRIENTS.filter((n) => n.category === category);
}

export function getNutrientCategories(): string[] {
  return [...new Set(NUTRIENTS.map((n) => n.categoryName))];
}

/**
 * Get top foods for a specific nutrient, sorted by highest content.
 * Returns foods with non-null, positive values for the given nutrient field.
 */
export function getTopFoodsForNutrient(
  nutrientField: string,
  limit: number = 50
): { name: string; slug: string; value: number; category: string }[] {
  const foods = getAllFoods();

  return foods
    .map((f) => ({
      name: f.name,
      slug: f.slug,
      value: (f as unknown as Record<string, unknown>)[nutrientField] as number | null,
      category: f.subcategory || f.category_slug || "",
    }))
    .filter(
      (f): f is { name: string; slug: string; value: number; category: string } =>
        f.value != null && f.value > 0
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
