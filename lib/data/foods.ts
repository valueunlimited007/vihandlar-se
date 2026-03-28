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
 * Normalize and hydrate raw food entries:
 * - Derive `letter` for entries that lack it
 * - Normalize `food_number` / `source` from legacy fields
 * - Ensure `category_slug` is populated where possible
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
