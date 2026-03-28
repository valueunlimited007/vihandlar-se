// types/food.ts

export interface Substitute {
  name: string;
  reason: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Food {
  id: string;
  name: string;
  slug: string;
  letter: string; // A-Ö (derived at load time for new entries)
  alternative_names?: string[] | null;
  category_id: string | null;
  subcategory: string | null;
  category_slug: string | null;

  // Förvaring
  storage_method: string | null;
  shelf_life_opened: string | null;
  shelf_life_unopened: string | null;
  can_freeze: boolean | null;
  freezing_tips: string | null;

  // Säsong & allergener
  season: string[] | null;
  allergens: string[] | null;

  // Näringsvärden per 100g — grundläggande
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  fiber: number | null;
  salt: number | null;

  // Näringsvärden per 100g — utökade
  sugar_total: number | null;
  added_sugar: number | null;
  free_sugar: number | null;
  saturated_fat: number | null;
  monounsaturated_fat: number | null;
  polyunsaturated_fat: number | null;
  cholesterol: number | null;
  water: number | null;
  energy_kj: number | null;
  alcohol: number | null;
  whole_grain: number | null;

  // Vitaminer
  vitamin_a: number | null;
  retinol: number | null;
  beta_carotene: number | null;
  vitamin_d: number | null;
  vitamin_e: number | null;
  vitamin_k: number | null;
  thiamin_b1: number | null;
  riboflavin_b2: number | null;
  niacin_b3: number | null;
  vitamin_b6: number | null;
  folate: number | null;
  vitamin_b12: number | null;
  vitamin_c: number | null;

  // Mineraler
  phosphorus: number | null;
  iodine: number | null;
  iron: number | null;
  calcium: number | null;
  potassium: number | null;
  magnesium: number | null;
  sodium: number | null;
  selenium: number | null;
  zinc: number | null;

  // Fettsyror
  omega_3: number | null;
  epa: number | null;
  dha: number | null;

  // Nyckelsammanfattningar (äldre format)
  key_vitamins: Record<string, string> | null;
  key_minerals: Record<string, string> | null;

  // Beskrivningar
  short_description: string | null;
  long_description: string | null;
  usage_tips: string[] | null;
  substitutes: Substitute[] | null;
  related_foods?: string[] | null;
  common_in_lists?: string[] | null;
  faq: FAQ[] | null;

  // Livsmedelsverket-referens
  food_number: number | null;
  source: string | null;
  /** @deprecated Use food_number instead */
  lv_food_number?: number | null;
  /** @deprecated Use source instead */
  lv_source?: string | null;
  waste_percent: number | null;

  // SEO & metadata
  meta_title: string | null;
  meta_description: string | null;
  is_published?: boolean;

  created_at?: string;
  updated_at?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count?: number;
  created_at?: string;
  updated_at?: string;
}

// Svenska bokstäver för alfabetisk navigering
export const SWEDISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'Å', 'Ä', 'Ö'
] as const;

export type SwedishLetter = typeof SWEDISH_ALPHABET[number];
