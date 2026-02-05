// lib/data/foods.ts
import foodsData from '@/data/foods.json';
import categoriesData from '@/data/food-categories.json';
import type { Food, FoodCategory } from '@/types/food';

const foods: Food[] = foodsData as Food[];
const categories: FoodCategory[] = categoriesData as FoodCategory[];

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
  return foods.find(f => f.slug === slug);
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
 * Hämta livsmedel per kategori
 */
export function getFoodsByCategory(categoryId: string): Food[] {
  return foods.filter(f => f.category_id === categoryId);
}

/**
 * Sök livsmedel
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
 * Hämta alla kategorier
 */
export function getAllFoodCategories(): FoodCategory[] {
  return categories.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
}

/**
 * Hämta kategori via slug
 */
export function getFoodCategoryBySlug(slug: string): FoodCategory | undefined {
  return categories.find(c => c.slug === slug);
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
 * Hämta antal livsmedel per kategori
 */
export function getFoodsCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  foods.forEach(f => {
    if (f.category_id) {
      counts[f.category_id] = (counts[f.category_id] || 0) + 1;
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
