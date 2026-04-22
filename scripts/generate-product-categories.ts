/**
 * Regenerate data/product-categories.json from the current data/products.json.
 *
 * Usage:
 *   npx tsx scripts/generate-product-categories.ts
 *
 * The Adtraction feeds expose a free-text `category` field per product (e.g.
 * "kok-hushall - bartillbehor - Bartillbehör" for Delitea, "Espressomaskiner"
 * or "Kaffebönor - Mörkrost" for Coffee Friend). This script builds a single
 * flat category list where each unique `category` string in products.json
 * becomes one product_category row. Existing categories that still have matching
 * products keep their UUIDs; new categories get fresh UUIDs.
 */

import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { Product, ProductCategory } from "../types/store";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "..", "data");
const PRODUCTS_FILE = resolve(DATA_DIR, "products.json");
const CATEGORIES_FILE = resolve(DATA_DIR, "product-categories.json");

function slugify(text: string, maxLength = 100): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[åä]/g, "a")
    .replace(/[ö]/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (!slug) return "category";
  if (slug.length > maxLength) return slug.slice(0, maxLength).replace(/-+$/, "");
  return slug;
}

function uniqueSlug(baseName: string, parts: string[], used: Set<string>): string {
  let slug = slugify(baseName);
  if (!used.has(slug)) return slug;

  if (parts.length >= 2) {
    const parent = parts[parts.length - 2];
    const withParent = slugify(`${parent}-${baseName}`);
    if (!used.has(withParent)) return withParent;
  }
  if (parts.length >= 3) {
    const withGp = slugify(parts.slice(-3).join("-"));
    if (!used.has(withGp)) return withGp;
  }

  let counter = 2;
  let candidate = `${slug}-${counter}`;
  while (used.has(candidate)) {
    counter++;
    candidate = `${slug}-${counter}`;
  }
  return candidate;
}

function main() {
  const products: Product[] = JSON.parse(readFileSync(PRODUCTS_FILE, "utf-8"));

  // Count products per category_path (in-stock only, matching Loveable behavior).
  const counts = new Map<string, number>();
  for (const p of products) {
    if (!p.category) continue;
    if (p.in_stock === false) continue;
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }

  // Preserve existing UUIDs where the category_path still exists.
  let existing: ProductCategory[] = [];
  try {
    existing = JSON.parse(readFileSync(CATEGORIES_FILE, "utf-8"));
  } catch {
    existing = [];
  }
  const existingByPath = new Map<string, ProductCategory>();
  for (const c of existing) {
    if (c.category_path) existingByPath.set(c.category_path, c);
  }

  const usedSlugs = new Set<string>();
  const usedNames = new Map<string, number>(); // "name|parentSlug" heuristic
  const out: ProductCategory[] = [];

  // Sort paths for deterministic output.
  const paths = [...counts.keys()].sort((a, b) => a.localeCompare(b, "sv"));

  const now = new Date().toISOString();

  for (const path of paths) {
    const count = counts.get(path) ?? 0;
    const parts = path
      .split(" - ")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) continue;

    const name = parts[parts.length - 1];
    const prior = existingByPath.get(path);

    let slug: string;
    if (prior && !usedSlugs.has(prior.slug)) {
      slug = prior.slug;
    } else {
      slug = uniqueSlug(name, parts, usedSlugs);
    }
    usedSlugs.add(slug);
    usedNames.set(`${name}|${slug}`, (usedNames.get(`${name}|${slug}`) ?? 0) + 1);

    out.push({
      id: prior?.id ?? randomUUID(),
      name,
      slug,
      parent_id: null,
      category_path: path,
      description: prior?.description ?? `Produkter inom ${name.toLowerCase()}.`,
      seo_title:
        prior && prior.product_count === count
          ? prior.seo_title
          : `Handla ${name} Online - ${count}+ produkter | Vihandlar.se`,
      seo_description:
        prior && prior.product_count === count
          ? prior.seo_description
          : `Jämför priser på ${count}+ ${name.toLowerCase()}-produkter från flera butiker. Snabb leverans direkt hem.`,
      product_count: count,
      created_at: prior?.created_at ?? now,
      updated_at: now,
    });
  }

  // Sort alphabetically by name for human readability.
  out.sort((a, b) => a.name.localeCompare(b.name, "sv"));

  writeFileSync(CATEGORIES_FILE, JSON.stringify(out, null, 2) + "\n", "utf-8");
  console.log(
    `[CATEGORIES] Wrote ${out.length} categories to data/product-categories.json`,
  );
}

main();
