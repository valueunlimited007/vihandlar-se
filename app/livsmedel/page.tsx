import type { Metadata } from "next";
import Link from "next/link";
import { Utensils, Snowflake, Star, BarChart3 } from "lucide-react";
import { FoodSearch } from "@/components/FoodSearch";
import {
  getAllFoods,
  getAllFoodCategories,
  getFoodsCountByLetter,
  getFreezableFoods,
} from "@/lib/data/foods";
import { buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Livsmedel A-Ö – Komplett guide till svenska livsmedel",
  description:
    "Utforska 68 svenska livsmedel med näringsvärden, förvaringstips, allergener och matlagningsråd. Komplett livsmedelsguide från A till Ö.",
  keywords: [
    "livsmedel",
    "näringsvärde",
    "mat",
    "kalorier",
    "protein",
    "svenska livsmedel",
    "matguide",
  ],
  alternates: {
    canonical: "https://vihandlar.se/livsmedel",
  },
};

export default function LivsmedelPage() {
  const allFoods = getAllFoods();
  const categories = getAllFoodCategories();
  const letterCounts = getFoodsCountByLetter();
  const freezable = getFreezableFoods();

  const avgCalories = Math.round(
    allFoods.reduce((sum, f) => sum + (f.calories ?? 0), 0) /
      allFoods.filter((f) => f.calories != null).length
  );

  const collectionPageSchema = buildCollectionPageSchema({
    name: "Livsmedel A-Ö – Komplett guide till svenska livsmedel",
    description: `Utforska ${allFoods.length} svenska livsmedel med näringsvärden, förvaringstips och matlagningsråd.`,
    url: "https://vihandlar.se/livsmedel",
    numberOfItems: allFoods.length,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "Livsmedel", url: "https://vihandlar.se/livsmedel" },
  ]);

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Livsmedel A-Ö
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Komplett guide till {allFoods.length} svenska livsmedel med
              näringsvärden, förvaringstips och matlagningsråd
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">
                {allFoods.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Livsmedel
              </div>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">
                {categories.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Kategorier
              </div>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {freezable.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Frysbara
              </div>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">
                {avgCalories}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Snitt kcal/100g
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <Link
            href="#alla"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">Alla livsmedel</div>
              <div className="text-xs text-muted-foreground">
                {allFoods.length} st att utforska
              </div>
            </div>
          </Link>

          <Link
            href="#alla"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-medium text-sm">Näringsvärden</div>
              <div className="text-xs text-muted-foreground">
                Per 100g för varje
              </div>
            </div>
          </Link>

          <Link
            href="#alla"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-green-400/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Snowflake className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-medium text-sm">Frysbara</div>
              <div className="text-xs text-muted-foreground">
                {freezable.length} kan frysas
              </div>
            </div>
          </Link>

          <Link
            href="#alla"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="font-medium text-sm">Tips & råd</div>
              <div className="text-xs text-muted-foreground">
                Matlagning & förvaring
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-gradient-to-br from-muted/50 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Kategorier
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {categories.slice(0, 10).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/livsmedel?kategori=${cat.slug}`}
                  className="p-4 rounded-xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-[1.02] group text-center"
                >
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {cat.name}
                  </div>
                  {cat.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {cat.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Foods with Search */}
      <section id="alla" className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Alla livsmedel
          </h2>
          <FoodSearch
            foods={allFoods}
            categories={categories}
            letterCounts={letterCounts}
          />
        </div>
      </section>
    </div>
  );
}
