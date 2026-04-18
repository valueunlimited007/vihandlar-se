import type { MetadataRoute } from "next";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods, getAllFoodCategories } from "@/lib/data/foods";
import { getAllProducts, getAllProductCategories } from "@/lib/data/products";
import { getAllNutrients } from "@/lib/data/nutrients";
import { E_CATEGORIES } from "@/types/e-additive";

const BASE_URL = "https://vihandlar.se";
const PRODUCTS_PER_SITEMAP = 5000;

function toDateStr(dateStr: string | undefined | null): string | undefined {
  if (!dateStr) return undefined;
  try {
    let s = dateStr.replace(" ", "T");
    s = s.replace(/([+-]\d{2})$/, "$1:00");
    const d = new Date(s);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().split("T")[0];
  } catch {
    return undefined;
  }
}

export async function generateSitemaps() {
  const totalProducts = getAllProducts().length;
  const productChunks = Math.ceil(totalProducts / PRODUCTS_PER_SITEMAP);
  return Array.from({ length: 3 + productChunks }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const numId = Number(id);
  switch (numId) {
    case 0:
      return buildStaticEntries();
    case 1:
      return buildEAdditiveEntries();
    case 2:
      return buildFoodEntries();
    default:
      return buildProductEntries(numId - 3);
  }
}

function buildStaticEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/e-amnen`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/livsmedel`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/handla`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/inkopslista`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/skanner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/om`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/funktioner`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sajtkarta`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/kallor`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/integritet`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/villkor`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/partnerskap`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/e-amnen/guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/e-amnen/alla`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/llms.txt`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${BASE_URL}/llms-full.txt`, changeFrequency: "weekly", priority: 0.3 },
  ];

  for (const cat of E_CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/e-amnen/kategori/${cat.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const series of [1, 2, 3, 4, 5, 6, 9]) {
    entries.push({
      url: `${BASE_URL}/e-amnen/nummer/${series}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const c of getAllFoodCategories()) {
    entries.push({
      url: `${BASE_URL}/livsmedel/kategori/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const c of getAllProductCategories()) {
    entries.push({
      url: `${BASE_URL}/handla/kategori/${c.slug}`,
      changeFrequency: "daily",
      priority: 0.6,
    });
  }

  entries.push({
    url: `${BASE_URL}/livsmedel/naringsamne`,
    changeFrequency: "weekly",
    priority: 0.8,
  });
  for (const n of getAllNutrients()) {
    entries.push({
      url: `${BASE_URL}/livsmedel/naringsamne/${n.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}

function buildEAdditiveEntries(): MetadataRoute.Sitemap {
  return getAllEAdditives().map((e) => ({
    url: `${BASE_URL}/e-amnen/${e.slug}`,
    lastModified: toDateStr(e.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

function buildFoodEntries(): MetadataRoute.Sitemap {
  return getAllFoods().map((f) => ({
    url: `${BASE_URL}/livsmedel/${f.slug}`,
    lastModified: toDateStr(f.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

function buildProductEntries(chunk: number): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const start = chunk * PRODUCTS_PER_SITEMAP;
  const end = Math.min(start + PRODUCTS_PER_SITEMAP, products.length);
  return products.slice(start, end).map((p) => ({
    url: `${BASE_URL}/handla/produkt/${p.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));
}
