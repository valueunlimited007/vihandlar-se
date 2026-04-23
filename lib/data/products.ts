// lib/data/products.ts
import productsData from "@/data/products.json";
import productCategoriesData from "@/data/product-categories.json";
import type { Product, ProductCategory } from "@/types/store";
import type { EAdditive } from "@/types/e-additive";

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
 * Hämta relaterade produkter för ett livsmedel (matchning via namn/kategori)
 */
export function getRelatedProductsForFood(
  foodName: string,
  foodCategory: string | null,
  limit: number = 4
): Product[] {
  const searchTerms = foodName
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((t) => t.length > 3);

  const scored: { product: Product; score: number }[] = [];

  for (const product of products) {
    const pName = product.name.toLowerCase();
    const pCategory = (product.category || "").toLowerCase();
    let score = 0;

    // Exact food name match in product name
    if (pName.includes(foodName.toLowerCase())) {
      score += 10;
    }

    // Partial keyword matches
    for (const term of searchTerms) {
      if (pName.includes(term)) score += 3;
      if (pCategory.includes(term)) score += 1;
    }

    if (score > 0) {
      scored.push({ product, score });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
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

const STOPWORDS = new Set([
  "och",
  "eller",
  "med",
  "utan",
  "som",
  "till",
  "för",
  "produkter",
  "livsmedel",
  "övriga",
  "andra",
  "olika",
  "typer",
  "sorter",
  "varianter",
  "kosttillskott",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,/.\-–—&()]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 3 && !STOPWORDS.has(t));
}

// Delitea-kategorier börjar med ett rot-prefix (Supabase-exportformat).
// De här är uppenbart matrelaterade rotar — allt här är ätbart.
// Källa: jq-analys av data/products.json kategori-roots.
const FOOD_ROOT_PREFIXES = [
  "bakning-",
  "bonor-",
  "dessert-konfektyr-snacks",
  "dryck -",
  "dryck-",
  "flingor-och-musli",
  "foretag-storpack",
  "hart-brod-och-fika",
  "hogtider-tillfallen",
  "kaffe-te",
  "konserver-chark",
  "kram-soppor-och-mixer",
  "kryddor",
  "notter-fron-torkad-frukt",
  "olja-vin-vinager",
  "pasta-pastasas",
  "presentboxar",
  "ris-gryn-matkorn",
  "smaksattare",
  "socker-sirap-och-honung",
  "sylt-marmelad",
  "varldens-mat",
];

// Substring-patterns som avslöjar utrustning, serviser, reservdelar och
// rengöringsprodukter. Kontrolleras EFTER food-allowlist så att
// "dessert-konfektyr-snacks - glass-tillbehor" inte felaktigt nekas på
// "tillbehor"-suffixet.
const NON_FOOD_PATTERNS = [
  "maskin",
  "kvarn",
  "bryggare",
  "kokare",
  "rostare",
  "fritös",
  "blender",
  "mixer",
  "filter",
  "tillbehör",
  "reservdel",
  "slang",
  "packning",
  "o-ring",
  "rengöring",
  "avkalk",
  "skedar",
  "bestick",
  "kannor",
  "koppar",
  "mugg",
  "brödrost",
  "airfryer",
  "vattenkokare",
  "kok-hushall",
  "elgrillar",
  "hydro flask",
  "sodastream",
];

// Coffee Friend har kategorier utan hierarkisk prefix (t.ex. "Kaffebönor",
// "Choklad"). De flesta är non-food — fångas av patterns ovan — men några
// enstaka livsmedels-nyckelord behöver explicit allowlist.
const COFFEE_FRIEND_FOOD_KEYWORDS = [
  "kaffebönor",
  "choklad",
  "kakao",
  "godis",
  "smaksätt",
];

/**
 * Avgör om en produkt är ett ätbart livsmedel (kan innehålla E-ämnen) eller
 * utrustning/tillbehör (espressomaskin, kopp, servett, rengöringsmedel).
 *
 * Används för att filtrera affiliate-widgeten på E-ämnes-sidor så vi inte
 * visar kaffemaskiner under rubriken "Livsmedel som kan innehålla E141".
 * Default är FALSE — okända kategorier räknas som non-food så inget smiter
 * igenom tyst.
 */
export function isFoodProduct(
  product: Pick<Product, "category">,
): boolean {
  const cat = (product.category ?? "").toLowerCase();
  if (!cat) return false;

  // 1. Delitea food root — garantera TRUE innan vi kollar substring-deny,
  //    annars skulle "dessert...glass-tillbehor" nekas på "tillbehor".
  for (const prefix of FOOD_ROOT_PREFIXES) {
    if (cat.startsWith(prefix)) return true;
  }

  // 2. Explicit non-food (utrustning/serviser/delar/rengöring).
  for (const pattern of NON_FOOD_PATTERNS) {
    if (cat.includes(pattern)) return false;
  }

  // 3. Coffee Friend enstaka food-kategorier.
  for (const keyword of COFFEE_FRIEND_FOOD_KEYWORDS) {
    if (cat.includes(keyword)) return true;
  }

  return false;
}

/**
 * Extrahera fria sökningstermer från det polymorfa common_products-fältet.
 * Adtractions/Loveables export-data kan vara antingen:
 *   - string[]                                    (t.ex. E504)
 *   - Array<{ category?, products?: string[] }>   (typed shape)
 *   - { note?, categories?: string[] }            (t.ex. E464, E425, E334)
 *   - null / undefined
 * Returnerar en platt lista av strängar att tokenisera vidare.
 */
function extractCommonProductTerms(raw: unknown): string[] {
  if (!raw) return [];
  const out: string[] = [];

  if (Array.isArray(raw)) {
    for (const entry of raw) {
      if (typeof entry === "string") out.push(entry);
      else if (entry && typeof entry === "object") {
        const e = entry as { category?: unknown; products?: unknown };
        if (typeof e.category === "string") out.push(e.category);
        if (Array.isArray(e.products)) {
          for (const p of e.products) if (typeof p === "string") out.push(p);
        }
      }
    }
    return out;
  }

  if (typeof raw === "object") {
    const obj = raw as { categories?: unknown; products?: unknown };
    if (Array.isArray(obj.categories)) {
      for (const c of obj.categories) if (typeof c === "string") out.push(c);
    }
    if (Array.isArray(obj.products)) {
      for (const p of obj.products) if (typeof p === "string") out.push(p);
    }
  }

  return out;
}

/**
 * Hämta produkter som typiskt kan innehålla detta E-ämne.
 *
 * Matchar på common_products-termer (t.ex. "Bakpulver", "Mjölkprodukter")
 * plus E-ämnets namn/common_name mot produktens namn/kategori. Returnerar
 * bara produkter med score > 0, så listan blir tom om inget matchar —
 * anropande sida ska dölja widgeten när returen är tom.
 *
 * OBS: Detta visar produkter som *i verkligheten ofta innehåller* ämnet,
 * inte produkter som säljer ämnet självt. UI:t måste vara tydligt om det.
 */
export function getRelatedProductsForEAdditive(
  additive: Pick<
    EAdditive,
    "name" | "common_name" | "common_products" | "category"
  >,
  limit: number = 4,
): Product[] {
  const terms = new Set<string>();
  for (const t of tokenize(additive.name)) terms.add(t);
  if (additive.common_name) {
    for (const t of tokenize(additive.common_name)) terms.add(t);
  }
  for (const raw of extractCommonProductTerms(additive.common_products)) {
    for (const t of tokenize(raw)) terms.add(t);
  }

  if (terms.size === 0) return [];

  const scored: { product: Product; score: number }[] = [];

  for (const product of products) {
    if (product.in_stock === false) continue;
    const pName = product.name.toLowerCase();
    const pCategory = (product.category ?? "").toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (pName.includes(term)) score += 3;
      if (pCategory.includes(term)) score += 2;
    }

    if (score > 0) {
      scored.push({ product, score });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}
