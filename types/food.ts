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
  category_id: string;
  subcategory: string | null;
  
  // Förvaring
  storage_method: string;
  shelf_life_opened: string;
  shelf_life_unopened: string;
  can_freeze: boolean;
  freezing_tips: string | null;
  
  // Säsong & allergener
  season: string[] | null;
  allergens: string[];
  
  // Näringsvärden per 100g
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  salt: number;
  key_vitamins: Record<string, string>;
  key_minerals: Record<string, string>;
  
  // Beskrivningar
  short_description: string;
  long_description: string | null;
  usage_tips: string[];
  substitutes: Substitute[];
  faq: FAQ[];
  common_in_lists: string[];
  
  // SEO
  meta_title: string;
  meta_description: string;
  
  created_at?: string;
  updated_at?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

// Svenska bokstäver för alfabetisk navigering
export const SWEDISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'Å', 'Ä', 'Ö'
] as const;

export type SwedishLetter = typeof SWEDISH_ALPHABET[number];
