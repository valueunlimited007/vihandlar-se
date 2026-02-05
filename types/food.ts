// types/food.ts

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  salt: number;
}

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
  letter: string; // A-Ö
  alternative_names: string[] | null;
  category_id: string | null;
  subcategory: string | null;

  // Förvaring
  storage_method: string | null;
  shelf_life_opened: string | null;
  shelf_life_unopened: string | null;
  can_freeze: boolean | null;
  freezing_tips: string | null;

  // Säsong & allergener
  season: string[] | null;
  allergens: string[] | null;

  // Näringsvärden per 100g
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  fiber: number | null;
  salt: number | null;
  key_vitamins: Record<string, string> | null;
  key_minerals: Record<string, string> | null;

  // Beskrivningar
  short_description: string | null;
  long_description: string | null;
  usage_tips: string[] | null;
  substitutes: Substitute[] | null;
  related_foods: string[] | null;
  faq: FAQ[] | null;
  common_in_lists: string[] | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  created_at?: string;
  updated_at?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
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
