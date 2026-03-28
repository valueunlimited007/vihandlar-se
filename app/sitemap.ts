import type { MetadataRoute } from "next";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods, getAllFoodCategories } from "@/lib/data/foods";
import { getAllProducts } from "@/lib/data/products";
import { getAllProductCategories } from "@/lib/data/products";
import { E_CATEGORIES } from "@/types/e-additive";

const BASE_URL = "https://vihandlar.se";

function toISODate(dateStr: string | undefined | null, fallback: string): string {
  if (!dateStr) return fallback;
  try {
    const d = new Date(dateStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return fallback;
    return d.toISOString();
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/e-amnen`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/livsmedel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/handla`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/inkopslista`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/skanner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/om`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/funktioner`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sajtkarta`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/kallor`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/integritet`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/e-amnen/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/e-amnen/alla`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/llms.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
    { url: `${BASE_URL}/llms-full.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  // E-ämnes kategori-sidor (7)
  const eCategoryPages: MetadataRoute.Sitemap = E_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/e-amnen/kategori/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // E-ämnes nummer/serie-sidor (7)
  const eSeriesPages: MetadataRoute.Sitemap = [1, 2, 3, 4, 5, 6, 9].map((series) => ({
    url: `${BASE_URL}/e-amnen/nummer/${series}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Livsmedelskategorisidor (28)
  const foodCategories = getAllFoodCategories();
  const foodCategoryPages: MetadataRoute.Sitemap = foodCategories.map((c) => ({
    url: `${BASE_URL}/livsmedel/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Produktkategorisidor (144)
  const productCategories = getAllProductCategories();
  const productCategoryPages: MetadataRoute.Sitemap = productCategories.map((c) => ({
    url: `${BASE_URL}/handla/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  // E-ämnen detaljsidor (353) — FIX: convert dates to ISO format
  const eAdditives = getAllEAdditives();
  const eAdditivePages: MetadataRoute.Sitemap = eAdditives.map((e) => ({
    url: `${BASE_URL}/e-amnen/${e.slug}`,
    lastModified: toISODate(e.updated_at, now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Livsmedelssidor (2625) — FIX: convert dates to ISO format
  const foods = getAllFoods();
  const foodPages: MetadataRoute.Sitemap = foods.map((f) => ({
    url: `${BASE_URL}/livsmedel/${f.slug}`,
    lastModified: toISODate(f.updated_at, now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ALL produktsidor (10 500+) — previously only 1000!
  const products = getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/handla/produkt/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...eCategoryPages,
    ...eSeriesPages,
    ...foodCategoryPages,
    ...productCategoryPages,
    ...eAdditivePages,
    ...foodPages,
    ...productPages,
  ];
}
