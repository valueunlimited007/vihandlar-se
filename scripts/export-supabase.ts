/**
 * Export all static data from Supabase to JSON files in data/
 *
 * Usage: npx tsx scripts/export-supabase.ts
 *
 * Reads SUPABASE_URL and SUPABASE_ANON_KEY from environment or .env file.
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://giznqbjxcxllmgamxgaa.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpem5xYmp4Y3hsbG1nYW14Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODk1NjEsImV4cCI6MjA2OTU2NTU2MX0.KoDcKxTYlrUhF-Vf2_e3A6LeMA_UgIaQe6TYXkzNzek";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DATA_DIR = resolve(import.meta.dirname ?? __dirname, "..", "data");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function writeJson(filename: string, data: unknown) {
  const path = resolve(DATA_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8");
  return path;
}

/** Fetch all rows from a table, paginating in chunks of 1000 to avoid limits. */
async function fetchAll(
  table: string,
  options?: {
    filter?: (q: ReturnType<typeof supabase.from>) => ReturnType<typeof supabase.from>;
    order?: string;
    select?: string;
  }
) {
  const PAGE_SIZE = 1000;
  let allRows: Record<string, unknown>[] = [];
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    let query = supabase
      .from(table)
      .select(options?.select ?? "*")
      .range(from, from + PAGE_SIZE - 1);

    if (options?.order) {
      query = query.order(options.order);
    }

    // Apply custom filters (e.g. .eq('is_published', true))
    if (options?.filter) {
      query = options.filter(query as any) as any;
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching ${table}: ${error.message}`);
    }

    if (!data || data.length === 0) {
      hasMore = false;
    } else {
      allRows = allRows.concat(data);
      from += PAGE_SIZE;
      if (data.length < PAGE_SIZE) {
        hasMore = false;
      }
    }
  }

  return allRows;
}

// ---------------------------------------------------------------------------
// Export definitions
// ---------------------------------------------------------------------------

interface ExportTask {
  label: string;
  table: string;
  filename: string;
  order?: string;
  select?: string;
  filter?: (q: any) => any;
  /** Custom post-processing */
  transform?: (rows: Record<string, unknown>[]) => unknown;
}

const exports: ExportTask[] = [
  {
    label: "E-additives",
    table: "e_additives",
    filename: "e-additives.json",
    order: "e_number",
    filter: (q) => q.eq("is_published", true),
  },
  {
    label: "Foods",
    table: "foods",
    filename: "foods.json",
    order: "name",
  },
  {
    label: "Food categories",
    table: "food_categories",
    filename: "food-categories.json",
    order: "sort_order",
  },
  {
    label: "Stores",
    table: "stores",
    filename: "stores.json",
    order: "name",
    filter: (q) => q.eq("is_active", true),
  },
  {
    label: "Products",
    table: "products",
    filename: "products.json",
    order: "name",
  },
  {
    label: "Product categories",
    table: "product_categories",
    filename: "product-categories.json",
    order: "name",
  },
  {
    label: "Public lists",
    table: "public_lists",
    filename: "public-lists.json",
    order: "title",
    filter: (q) => q.eq("is_public", true),
  },
  {
    label: "Public items",
    table: "public_items",
    filename: "public-items.json",
    order: "position",
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== Supabase → JSON Export ===");
  console.log(`URL: ${SUPABASE_URL}`);
  console.log(`Output: ${DATA_DIR}\n`);

  const results: { label: string; rows: number; file: string }[] = [];

  for (const task of exports) {
    try {
      const rows = await fetchAll(task.table, {
        order: task.order,
        filter: task.filter,
        select: task.select,
      });

      const output = task.transform ? task.transform(rows) : rows;
      const path = writeJson(task.filename, output);
      const count = Array.isArray(output) ? output.length : "N/A";

      results.push({ label: task.label, rows: count as number, file: task.filename });
      console.log(`  ✓ ${task.label}: ${count} rows → ${task.filename}`);
    } catch (err: any) {
      console.error(`  ✗ ${task.label}: ${err.message}`);
      results.push({ label: task.label, rows: -1, file: task.filename });
    }
  }

  // Now merge public_items into public_lists
  try {
    const listsPath = resolve(DATA_DIR, "public-lists.json");
    const itemsPath = resolve(DATA_DIR, "public-items.json");
    const lists: any[] = JSON.parse(require("fs").readFileSync(listsPath, "utf-8"));
    const items: any[] = JSON.parse(require("fs").readFileSync(itemsPath, "utf-8"));

    const merged = lists.map((list) => ({
      ...list,
      items: items
        .filter((item) => item.list_id === list.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
    }));

    writeJson("public-lists.json", merged);
    console.log(`\n  ✓ Merged ${items.length} items into ${lists.length} public lists`);
  } catch (err: any) {
    console.error(`\n  ✗ Could not merge public items: ${err.message}`);
  }

  // Summary
  console.log("\n=== Summary ===");
  console.log("Table".padEnd(25) + "Rows".padStart(8) + "  File");
  console.log("-".repeat(55));
  for (const r of results) {
    const rowStr = r.rows === -1 ? "ERROR" : String(r.rows);
    console.log(r.label.padEnd(25) + rowStr.padStart(8) + `  ${r.file}`);
  }
  console.log();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
