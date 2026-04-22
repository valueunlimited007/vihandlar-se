/**
 * Import products from an Adtraction CSV product feed into data/products.json.
 *
 * Usage:
 *   npx tsx scripts/import-adtraction.ts <store-slug>
 *
 * Examples:
 *   npx tsx scripts/import-adtraction.ts coffee-friend
 *   npx tsx scripts/import-adtraction.ts delitea
 *
 * Behavior:
 * - Loads the store config from data/stores.json (matched by slug).
 * - Fetches the CSV feed (tab-delimited, single-quote text-delimited).
 * - Replaces all existing products that have the store's store_id OR whose
 *   slug ends with `-<store-slug>`; then appends the freshly parsed products.
 * - After writing products.json, regenerates data/product-categories.json
 *   from the full product set (via generate-product-categories.ts).
 */

import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { Product, Store } from "../types/store";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "..", "data");
const STORES_FILE = resolve(DATA_DIR, "stores.json");
const PRODUCTS_FILE = resolve(DATA_DIR, "products.json");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeSlug(text: string, maxLength = 80): string {
  const slug = text
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength);
  return slug || "product";
}

function buildTrackingUrl(store: Store, productUrl: string): string {
  const encoded = encodeURIComponent(productUrl);
  const base = store.affiliate_config.trackingBase;
  if (base) return `${base}&url=${encoded}`;
  const adId =
    store.affiliate_config.programAdId ?? store.affiliate_config.programId;
  return `https://go.adt242.com/t/t?a=${adId}&as=${store.affiliate_config.channelId}&t=2&tk=1&url=${encoded}`;
}

/**
 * Parse a single CSV line with tab delimiter and single-quote text delimiter.
 * Matches the Adtraction CSV export format used across stores.
 */
function parseCSVLine(line: string): string[] {
  const columns: string[] = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "'" && (i === 0 || line[i - 1] !== "\\")) {
      inQuote = !inQuote;
    } else if (char === "\t" && !inQuote) {
      columns.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  columns.push(current.trim());
  return columns;
}

function parseNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const n = parseFloat(raw.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function parseBool(raw: string | undefined): boolean {
  if (!raw) return true;
  const v = raw.trim().toLowerCase();
  return v === "" || v === "1" || v === "true" || v === "yes" || v === "ja";
}

/**
 * Returns true when any material (user-visible / SEO-relevant) field differs
 * between the previous record and the freshly parsed one. Used to decide
 * whether to bump `last_updated` — otherwise every bi-monthly import would
 * churn every row in products.json just from the timestamp.
 */
function hasMaterialChange(
  prev: Product,
  next: Omit<Product, "id" | "created_at" | "last_updated">,
): boolean {
  return (
    prev.name !== next.name ||
    prev.slug !== next.slug ||
    prev.description !== next.description ||
    prev.price !== next.price ||
    prev.original_price !== next.original_price ||
    prev.currency !== next.currency ||
    prev.brand !== next.brand ||
    prev.category !== next.category ||
    prev.image_url !== next.image_url ||
    prev.product_url !== next.product_url ||
    prev.ean !== next.ean ||
    prev.in_stock !== next.in_stock ||
    prev.shipping_cost !== next.shipping_cost
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const storeSlug = process.argv[2];
  if (!storeSlug) {
    console.error("Usage: npx tsx scripts/import-adtraction.ts <store-slug>");
    process.exit(1);
  }

  // Safeguard: refuse to replace an existing catalog with far fewer products,
  // which usually means the feed was truncated or partially broken. Set
  // IMPORT_MIN_RATIO=0 to disable (e.g. initial imports).
  const minRatio = Number(process.env.IMPORT_MIN_RATIO ?? "0.5");
  const minAbsolute = Number(process.env.IMPORT_MIN_ABSOLUTE ?? "50");

  const stores: Store[] = JSON.parse(readFileSync(STORES_FILE, "utf-8"));
  const store = stores.find((s) => s.slug === storeSlug && s.is_active);
  if (!store) {
    console.error(`Store "${storeSlug}" not found or inactive in stores.json`);
    process.exit(1);
  }

  console.log(`[IMPORT] Store: ${store.name} (${store.slug})`);
  console.log(`[IMPORT] Feed: ${store.feed_url}`);

  const response = await fetch(store.feed_url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; vihandlar-import/1.0)",
      Accept: "text/csv, text/plain, */*",
    },
  });

  if (!response.ok) {
    console.error(
      `[IMPORT] Failed to fetch feed: ${response.status} ${response.statusText}`,
    );
    process.exit(1);
  }

  const csv = await response.text();
  const lines = csv.split(/\r?\n/);
  console.log(
    `[IMPORT] Feed size: ${csv.length} bytes, ${lines.length} lines (incl. header)`,
  );

  // Load existing catalog up front so we can preserve stable identifiers
  // (id, created_at, slug) for products that are simply being refreshed.
  const existing: Product[] = JSON.parse(readFileSync(PRODUCTS_FILE, "utf-8"));
  const suffix = `-${store.slug}`;
  const retained = existing.filter(
    (p) => p.store_id !== store.id && !p.slug.endsWith(suffix),
  );
  const previousStoreProducts = existing.filter(
    (p) => p.store_id === store.id || p.slug.endsWith(suffix),
  );

  // Index previous products by their stable key (SKU per store). Because the
  // initial Delitea import used a different store_id than what's in
  // stores.json, we also fall back to matching on product_id alone when the
  // slug suffix proves the product came from this store.
  const previousByKey = new Map<string, Product>();
  const previousByProductId = new Map<string, Product>();
  for (const p of previousStoreProducts) {
    previousByKey.set(`${p.store_id}|${p.product_id}`, p);
    previousByProductId.set(p.product_id, p);
  }

  // Reserve slugs from other stores so we never collide across partners.
  const takenSlugs = new Set<string>(retained.map((p) => p.slug));

  const parsed: Product[] = [];
  const seenSlugsThisFeed = new Set<string>();
  let preserved = 0;
  let fresh = 0;
  let refreshed = 0;
  let skippedEmpty = 0;
  let skippedMissingFields = 0;
  let skippedInvalidPrice = 0;
  let skippedShortRow = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      skippedEmpty++;
      continue;
    }

    const cols = parseCSVLine(line);
    if (cols.length < 9) {
      skippedShortRow++;
      continue;
    }

    const sku = cols[0];
    const name = cols[1];
    const description = cols[2] || null;
    const category = cols[3] || null;
    const price = parseNumber(cols[4]);
    const shipping = parseNumber(cols[5]);
    const currency = cols[6] || "SEK";
    const inStock = parseBool(cols[7]);
    const productUrl = cols[8];
    const imageUrl = cols[9] || null;
    const brand = cols[11] || null;
    const originalPrice = parseNumber(cols[12]);
    const ean = cols[13] || null;

    if (!sku || !name || !productUrl) {
      skippedMissingFields++;
      continue;
    }
    if (price == null || price <= 0) {
      skippedInvalidPrice++;
      continue;
    }

    const prior =
      previousByKey.get(`${store.id}|${sku}`) ?? previousByProductId.get(sku);

    // Pick a slug. Reuse the prior slug for URL stability across imports;
    // otherwise derive one from the product name and disambiguate collisions.
    let slug: string;
    if (prior?.slug) {
      slug = prior.slug;
    } else {
      let candidate = `${normalizeSlug(name, 80)}-${store.slug}`;
      if (seenSlugsThisFeed.has(candidate) || takenSlugs.has(candidate)) {
        candidate = `${candidate}-${normalizeSlug(sku, 12)}`;
      }
      slug = candidate;
    }
    seenSlugsThisFeed.add(slug);

    const material = {
      name,
      slug,
      description,
      price,
      original_price: originalPrice,
      currency,
      brand,
      category,
      image_url: imageUrl,
      product_url: buildTrackingUrl(store, productUrl),
      ean,
      in_stock: inStock,
      shipping_cost: shipping != null && shipping > 0 ? shipping : null,
    };

    const isNew = !prior;
    const changed = prior ? hasMaterialChange(prior, { store_id: store.id, product_id: sku, ...material }) : false;
    const now = new Date().toISOString();

    if (isNew) fresh++;
    else {
      preserved++;
      if (changed) refreshed++;
    }

    // Emit fields in a stable order matching the current shape of
    // data/products.json so the bi-monthly cron produces zero diff when
    // nothing materially changed. Don't reshuffle this — a one-time
    // cleanup commit was paid to land on this exact order.
    parsed.push({
      store_id: store.id,
      product_id: sku,
      name: material.name,
      slug: material.slug,
      description: material.description,
      price: material.price,
      original_price: material.original_price,
      currency: material.currency,
      brand: material.brand,
      category: material.category,
      image_url: material.image_url,
      product_url: material.product_url,
      ean: material.ean,
      in_stock: material.in_stock,
      shipping_cost: material.shipping_cost,
      id: prior?.id ?? randomUUID(),
      created_at: prior?.created_at ?? now,
      last_updated: isNew || changed ? now : (prior?.last_updated ?? now),
    } as Product);
  }

  console.log(
    `[IMPORT] Parsed ${parsed.length} products — ${preserved} preserved (${refreshed} with material change), ${fresh} new. Skipped — empty:${skippedEmpty} short:${skippedShortRow} missing:${skippedMissingFields} invalidPrice:${skippedInvalidPrice}`,
  );

  const previousStoreCount = previousStoreProducts.length;
  console.log(
    `[IMPORT] Previously had ${previousStoreCount} ${store.slug} products; parsed ${parsed.length} fresh.`,
  );

  if (parsed.length < minAbsolute) {
    console.error(
      `[IMPORT] Aborting: parsed only ${parsed.length} products (minimum ${minAbsolute}). Feed may be broken.`,
    );
    process.exit(1);
  }
  if (
    previousStoreCount > 0 &&
    parsed.length < previousStoreCount * minRatio
  ) {
    console.error(
      `[IMPORT] Aborting: parsed ${parsed.length} products is less than ${Math.round(minRatio * 100)}% of previous ${previousStoreCount}. Feed may be truncated. Set IMPORT_MIN_RATIO=0 to override.`,
    );
    process.exit(1);
  }

  const merged = [...retained, ...parsed].sort((a, b) =>
    a.name.localeCompare(b.name, "sv"),
  );

  writeFileSync(
    PRODUCTS_FILE,
    JSON.stringify(merged, null, 2) + "\n",
    "utf-8",
  );
  console.log(
    `[IMPORT] Wrote ${merged.length} total products to data/products.json`,
  );
}

main().catch((err) => {
  console.error("[IMPORT] Fatal error:", err);
  process.exit(1);
});
