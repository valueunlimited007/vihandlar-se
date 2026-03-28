// lib/data/products.ts
import productsData from "@/data/products.json";
import productCategoriesData from "@/data/product-categories.json";
import type { Product, ProductCategory } from "@/types/store";

const products: Product[] = productsData as Product[];
const productCategories: ProductCategory[] =
  productCategoriesData as ProductCategory[];

// Pre-built indexes for O(1) lookups
const productBySlug = new Map<string, Product>();
for (const p of products) {
  productBySlug.set(p.slug, p);
}

const categoryBySlug = new Map<string, ProductCategory>();
for (const c of productCategories) {
  categoryBySlug.set(c.slug, c);
}

// Pre-group products by category slug for fast category lookups
const productsByCategorySlug = new Map<string, Product[]>();
for (const p of products) {
  if (!p.category) continue;
  // Match product category string to category slug
  for (const cat of productCategories) {
    if (cat.category_path && p.category === cat.category_path) {
      const existing = productsByCategorySlug.get(cat.slug) ?? [];
      existing.push(p);
      productsByCategorySlug.set(cat.slug, existing);
      break;
    }
  }
}

/**
 * Hämta alla produkter
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Hämta alla produktkategorier
 */
export function getAllProductCategories(): ProductCategory[] {
  return productCategories;
}

/**
 * Hämta produktkategorier med produkter (sorterade efter antal)
 */
export function getTopCategories(limit?: number): ProductCategory[] {
  const sorted = [...productCategories].sort(
    (a, b) => (b.product_count ?? 0) - (a.product_count ?? 0)
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Hämta produkt via slug (O(1))
 */
export function getProductBySlug(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

/**
 * Hämta kategori via slug (O(1))
 */
export function getCategoryBySlug(
  slug: string
): ProductCategory | undefined {
  return categoryBySlug.get(slug);
}

/**
 * Hämta produkter i en kategori
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return productsByCategorySlug.get(categorySlug) ?? [];
}

/**
 * Hämta produkter som är i lager
 */
export function getInStockProducts(): Product[] {
  return products.filter((p) => p.in_stock !== false);
}

/**
 * Hämta antal produkter
 */
export function getProductCount(): number {
  return products.length;
}

/**
 * Sök produkter via namn (case-insensitive)
 */
export function searchProducts(
  query: string,
  options?: { limit?: number; inStockOnly?: boolean }
): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const limit = options?.limit ?? 50;
  const results: Product[] = [];

  for (const p of products) {
    if (options?.inStockOnly && p.in_stock === false) continue;
    if (p.name.toLowerCase().includes(q)) {
      results.push(p);
      if (results.length >= limit) break;
    }
  }

  return results;
}

/**
 * Hämta produkter med paginering
 */
export function getProductsPaginated(options: {
  page: number;
  perPage: number;
  categorySlug?: string;
  sort?: string;
  inStockOnly?: boolean;
}): { products: Product[]; total: number; totalPages: number } {
  const { page, perPage, categorySlug, sort, inStockOnly } = options;

  let filtered = categorySlug
    ? getProductsByCategory(categorySlug)
    : products;

  if (inStockOnly) {
    filtered = filtered.filter((p) => p.in_stock !== false);
  }

  // Sort
  const sorted = [...filtered];
  switch (sort) {
    case "price_asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "sv"));
      break;
    case "discount":
      sorted.sort((a, b) => {
        const discountA =
          a.original_price && a.original_price > a.price
            ? ((a.original_price - a.price) / a.original_price) * 100
            : 0;
        const discountB =
          b.original_price && b.original_price > b.price
            ? ((b.original_price - b.price) / b.original_price) * 100
            : 0;
        return discountB - discountA;
      });
      break;
    default:
      // Default: newest first
      break;
  }

  const total = sorted.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const paginatedProducts = sorted.slice(start, start + perPage);

  return { products: paginatedProducts, total, totalPages };
}

/**
 * Hämta unika varumärken
 */
export function getUniqueBrands(): string[] {
  const brands = new Set<string>();
  for (const p of products) {
    if (p.brand) brands.add(p.brand);
  }
  return [...brands].sort((a, b) => a.localeCompare(b, "sv"));
}

/**
 * Hämta featured/populära produkter (med bilder och i lager)
 */
export function getFeaturedProducts(limit: number = 12): Product[] {
  return products
    .filter((p) => p.in_stock !== false && p.image_url)
    .slice(0, limit);
}

/**
 * Hämta relaterade produkter (samma kategori, exkludera angiven slug)
 */
export function getRelatedProducts(
  categoryPath: string,
  excludeSlug: string,
  limit: number = 4
): Product[] {
  // Find the category slug matching this category path
  for (const cat of productCategories) {
    if (cat.category_path && cat.category_path === categoryPath) {
      return (productsByCategorySlug.get(cat.slug) ?? [])
        .filter((p) => p.slug !== excludeSlug)
        .slice(0, limit);
    }
  }
  // Fallback: filter all products by category string
  return products
    .filter((p) => p.category === categoryPath && p.slug !== excludeSlug)
    .slice(0, limit);
}

/**
 * Hämta produkter med rabatt
 */
export function getDiscountedProducts(limit: number = 12): Product[] {
  return products
    .filter(
      (p) =>
        p.in_stock !== false &&
        p.original_price != null &&
        p.original_price > p.price &&
        p.image_url
    )
    .sort((a, b) => {
      const discA = ((a.original_price! - a.price) / a.original_price!) * 100;
      const discB = ((b.original_price! - b.price) / b.original_price!) * 100;
      return discB - discA;
    })
    .slice(0, limit);
}
