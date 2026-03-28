// lib/data/foods.ts
import foodsData from '@/data/foods.json';
import categoriesData from '@/data/food-categories.json';
import type { Food, FoodCategory } from '@/types/food';

/**
 * Derive the first letter (A-Ö) from a food name.
 * Handles Swedish characters correctly.
 */
function deriveLetter(name: string): string {
  const first = name.charAt(0).toUpperCase();
  // Normalize common unicode variants
  return first;
}

/**
 * Mapping from legacy UUID category_id values (from the original 68 foods)
 * to the new category slug system used by the expanded database.
 */
const LEGACY_CATEGORY_MAP: Record<string, string> = {
  '253c25d0-7c29-41e1-8b80-ca4e061e192e': 'frukt-bar',
  'e654b609-4eed-4da6-8153-abf8ae179442': 'gronsaker-baljvaxter',
  '99db3018-223e-4828-a3b7-5f6467ec9e4e': 'kott',
  '96a6077f-068d-4b0b-9db1-16d2f6b2611a': 'smaksattare-kryddor',
  'd1e3d3cb-6006-4aa5-8326-3d35a0723e29': 'pasta-ris-gryn',
  '5cf4f015-56b6-465a-a606-dd896d815ac4': 'mejeri',
  '992dd8ca-229c-4ba9-8546-05b975a60cd9': 'fisk-skaldjur',
  '2b7562b7-e366-4be3-bffd-48b81962a5d3': 'notter-fron',
};

/**
 * Normalize and hydrate raw food entries:
 * - Derive `letter` for entries that lack it
 * - Normalize `food_number` / `source` from legacy fields
 * - Map legacy UUID `category_id` to `category_slug`
 */
function hydrateFoods(raw: unknown[]): Food[] {
  return (raw as Record<string, unknown>[]).map((entry) => {
    // Derive letter if missing
    if (!entry.letter && typeof entry.name === 'string') {
      entry.letter = deriveLetter(entry.name);
    }

    // Normalize legacy Livsmedelsverket fields
    if (entry.lv_food_number && !entry.food_number) {
      entry.food_number = entry.lv_food_number;
    }
    if (entry.lv_source && !entry.source) {
      entry.source = entry.lv_source;
    }

    // Map legacy UUID category_id to category_slug
    if (!entry.category_slug && typeof entry.category_id === 'string') {
      const mapped = LEGACY_CATEGORY_MAP[entry.category_id];
      if (mapped) {
        entry.category_slug = mapped;
      }
    }

    return entry as unknown as Food;
  });
}

const foods: Food[] = hydrateFoods(foodsData as unknown[]);
const categories: FoodCategory[] = categoriesData as FoodCategory[];

// Pre-built lookup maps for fast access
const foodBySlug = new Map<string, Food>(foods.map(f => [f.slug, f]));
const categoryBySlug = new Map<string, FoodCategory>(categories.map(c => [c.slug, c]));

/**
 * Hämta alla livsmedel
 */
export function getAllFoods(): Food[] {
  return foods;
}

/**
 * Hämta livsmedel via slug
 */
export function getFoodBySlug(slug: string): Food | undefined {
  return foodBySlug.get(slug);
}

/**
 * Hämta livsmedel per bokstav
 */
export function getFoodsByLetter(letter: string): Food[] {
  return foods.filter(f =>
    f.letter.toUpperCase() === letter.toUpperCase()
  );
}

/**
 * Hämta livsmedel per kategori.
 * Supports both legacy category_id (UUID) and new category_slug.
 * Pass a category slug (e.g. "fisk-skaldjur") — matches against
 * both category_slug and the old category_id-based lookup.
 */
export function getFoodsByCategory(categorySlug: string): Food[] {
  return foods.filter(f =>
    f.category_slug === categorySlug ||
    f.category_id === categorySlug
  );
}

/**
 * Sök livsmedel (fuzzy name + description + subcategory)
 */
export function searchFoods(query: string): Food[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return foods.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.short_description?.toLowerCase().includes(q) ||
    f.subcategory?.toLowerCase().includes(q)
  );
}

/**
 * Hämta alla kategorier (sorterade på svenska)
 */
export function getAllFoodCategories(): FoodCategory[] {
  return categories.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
}

/**
 * Hämta kategori via slug
 */
export function getFoodCategoryBySlug(slug: string): FoodCategory | undefined {
  return categoryBySlug.get(slug);
}

/**
 * Hämta alla bokstäver som har livsmedel
 */
export function getAvailableLetters(): string[] {
  const letters = new Set(foods.map(f => f.letter.toUpperCase()));
  return Array.from(letters).sort((a, b) => {
    // Sortera enligt svensk alfabetisk ordning
    const order = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
    return order.indexOf(a) - order.indexOf(b);
  });
}

/**
 * Hämta antal livsmedel per bokstav
 */
export function getFoodsCountByLetter(): Record<string, number> {
  const counts: Record<string, number> = {};
  foods.forEach(f => {
    const letter = f.letter.toUpperCase();
    counts[letter] = (counts[letter] || 0) + 1;
  });
  return counts;
}

/**
 * Hämta antal livsmedel per kategori (using category_slug)
 */
export function getFoodsCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  foods.forEach(f => {
    const key = f.category_slug || f.category_id;
    if (key) {
      counts[key] = (counts[key] || 0) + 1;
    }
  });
  return counts;
}

/**
 * Hämta livsmedel med specifik allergen
 */
export function getFoodsWithAllergen(allergen: string): Food[] {
  return foods.filter(f =>
    f.allergens?.some(a => a.toLowerCase() === allergen.toLowerCase())
  );
}

/**
 * Hämta livsmedel utan allergener
 */
export function getFoodsWithoutAllergens(allergens: string[]): Food[] {
  const lowerAllergens = allergens.map(a => a.toLowerCase());
  return foods.filter(f =>
    !f.allergens?.some(a => lowerAllergens.includes(a.toLowerCase()))
  );
}

/**
 * Hämta livsmedel som kan frysas
 */
export function getFreezableFoods(): Food[] {
  return foods.filter(f => f.can_freeze);
}
