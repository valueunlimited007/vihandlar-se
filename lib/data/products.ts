// lib/data/products.ts
import productsData from '@/data/products.json';
import productCategoriesData from '@/data/product-categories.json';
import type { Product, ProductCategory } from '@/types/store';

const products: Product[] = productsData as Product[];
const productCategories: ProductCategory[] = productCategoriesData as ProductCategory[];

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
 * Hämta produkter som är i lager
 */
export function getInStockProducts(): Product[] {
  return products.filter(p => p.in_stock !== false);
}

/**
 * Hämta antal produkter
 */
export function getProductCount(): number {
  return products.length;
}
