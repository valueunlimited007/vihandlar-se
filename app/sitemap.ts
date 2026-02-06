import type { MetadataRoute } from "next";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods } from "@/lib/data/foods";
import { getAllProducts } from "@/lib/data/products";
import { getAllProductCategories } from "@/lib/data/products";

const BASE_URL = "https://vihandlar.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

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
    ...staticPages,
    ...eAdditivePages,
    ...foodPages,
    ...categoryPages,
    ...productPages,
  ];
}
