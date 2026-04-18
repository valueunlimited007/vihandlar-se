import type { MetadataRoute } from "next";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods, getAllFoodCategories } from "@/lib/data/foods";
import { getAllProducts, getAllProductCategories } from "@/lib/data/products";
import { getAllNutrients } from "@/lib/data/nutrients";
import { E_CATEGORIES } from "@/types/e-additive";

const BASE_URL = "https://vihandlar.se";

function toDateStr(dateStr: string | undefined | null, fallback: string): string {
  if (!dateStr) return fallback;
  try {
    let s = dateStr.replace(" ", "T");
    s = s.replace(/([+-]\d{2})$/, "$1:00");
    const d = new Date(s);
    if (isNaN(d.getTime())) return fallback;
    return d.toISOString().split("T")[0];
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split("T")[0];

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
    { url: `${BASE_URL}/villkor`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/partnerskap`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/e-amnen/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/e-amnen/alla`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/llms.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
    { url: `${BASE_URL}/llms-full.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  const eCategoryPages: MetadataRoute.Sitemap = E_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/e-amnen/kategori/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const eSeriesPages: MetadataRoute.Sitemap = [1, 2, 3, 4, 5, 6, 9].map((series) => ({
    url: `${BASE_URL}/e-amnen/nummer/${series}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const foodCategoryPages: MetadataRoute.Sitemap = getAllFoodCategories().map((c) => ({
    url: `${BASE_URL}/livsmedel/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productCategoryPages: MetadataRoute.Sitemap = getAllProductCategories().map((c) => ({
    url: `${BASE_URL}/handla/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const eAdditivePages: MetadataRoute.Sitemap = getAllEAdditives().map((e) => ({
    url: `${BASE_URL}/e-amnen/${e.slug}`,
    lastModified: toDateStr(e.updated_at, now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const foodPages: MetadataRoute.Sitemap = getAllFoods().map((f) => ({
    url: `${BASE_URL}/livsmedel/${f.slug}`,
    lastModified: toDateStr(f.updated_at, now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const nutrientPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/livsmedel/naringsamne`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...getAllNutrients().map((n) => ({
      url: `${BASE_URL}/livsmedel/naringsamne/${n.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const productPages: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
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
    ...nutrientPages,
    ...productPages,
  ];
}
