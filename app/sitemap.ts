import type { MetadataRoute } from "next";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods, getAllFoodCategories } from "@/lib/data/foods";
import { getAllProducts } from "@/lib/data/products";
import { getAllProductCategories } from "@/lib/data/products";
import { E_CATEGORIES } from "@/types/e-additive";

const BASE_URL = "https://vihandlar.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // AI policy files
  const aiPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/om`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/funktioner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/integritet`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kallor`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/sajtkarta`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/inkopslista`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/skanner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/e-amnen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/livsmedel`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/handla`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // E-ämnes kategori-sidor
  const eCategoryPages: MetadataRoute.Sitemap = E_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/e-amnen/kategori/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // E-ämnes nummer/serie-sidor
  const eSeriesPages: MetadataRoute.Sitemap = [1, 2, 3, 4, 5, 6, 9].map(
    (series) => ({
      url: `${BASE_URL}/e-amnen/nummer/${series}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  // E-ämnen guide + alla
  const eExtraPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/e-amnen/guide`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/e-amnen/alla`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  // Livsmedelskategorisidor
  const foodCategories = getAllFoodCategories();
  const foodCategoryPages: MetadataRoute.Sitemap = foodCategories.map((c) => ({
    url: `${BASE_URL}/livsmedel/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // E-additive pages
  const eAdditives = getAllEAdditives();
  const eAdditivePages: MetadataRoute.Sitemap = eAdditives.map((e) => ({
    url: `${BASE_URL}/e-amnen/${e.slug}`,
    lastModified: e.updated_at || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Food pages
  const foods = getAllFoods();
  const foodPages: MetadataRoute.Sitemap = foods.map((f) => ({
    url: `${BASE_URL}/livsmedel/${f.slug}`,
    lastModified: f.updated_at || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Product category pages
  const categories = getAllProductCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/handla/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  // Product pages (top 1000 by priority)
  const products = getAllProducts().slice(0, 1000);
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/handla/produkt/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));

  return [
    ...aiPages,
    ...staticPages,
    ...eCategoryPages,
    ...eSeriesPages,
    ...eExtraPages,
    ...foodCategoryPages,
    ...eAdditivePages,
    ...foodPages,
    ...categoryPages,
    ...productPages,
  ];
}
