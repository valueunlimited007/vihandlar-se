import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Info,
  Utensils,
  Lightbulb,
  Thermometer,
  Clock,
  Snowflake,
  HelpCircle,
  BarChart3,
  Leaf,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllFoods,
  getFoodBySlug,
  getAllFoodCategories,
} from "@/lib/data/foods";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFoods().map((food) => ({
    slug: food.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const food = getFoodBySlug(slug);

  if (!food) {
    return { title: "Livsmedel hittades inte" };
  }

  const title =
    food.meta_title || `${food.name} – Näringsvärde & Tips | Livsmedel A-Ö`;
  const description =
    food.meta_description ||
    `${food.name}: ${food.calories ?? "?"} kcal per 100g. ${food.short_description || "Läs om näringsvärden, förvaring och matlagning."}`;

  return {
    title,
    description,
    keywords: [
      food.name,
      food.subcategory,
      "livsmedel",
      "näringsvärde",
      "kalorier",
      "mat",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: `https://vihandlar.se/livsmedel/${food.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://vihandlar.se/livsmedel/${food.slug}`,
    },
  };
}

export default async function FoodDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const food = getFoodBySlug(slug);

  if (!food) {
    notFound();
  }

  const categories = getAllFoodCategories();
  const category = categories.find((c) => c.id === food.category_id);

  const hasNutrition = food.calories != null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${food.name} – Näringsvärde & Tips`,
    description:
      food.short_description ||
      `Information om ${food.name}, näringsvärden, förvaring och matlagning.`,
    url: `https://vihandlar.se/livsmedel/${food.slug}`,
    publisher: {
      "@type": "Organization",
      name: "vihandlar.se",
      url: "https://vihandlar.se",
    },
    mainEntityOfPage: `https://vihandlar.se/livsmedel/${food.slug}`,
    ...(food.updated_at && { dateModified: food.updated_at }),
    ...(food.created_at && { datePublished: food.created_at }),
    inLanguage: "sv-SE",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://vihandlar.se",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Livsmedel",
        item: "https://vihandlar.se/livsmedel",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: food.name,
        item: `https://vihandlar.se/livsmedel/${food.slug}`,
      },
    ],
  };

  const nutritionSchema = hasNutrition
    ? {
        "@context": "https://schema.org",
        "@type": "NutritionInformation",
        calories: food.calories != null ? `${food.calories} kcal` : undefined,
        proteinContent:
          food.protein != null ? `${food.protein} g` : undefined,
        fatContent: food.fat != null ? `${food.fat} g` : undefined,
        carbohydrateContent:
          food.carbohydrates != null ? `${food.carbohydrates} g` : undefined,
        fiberContent: food.fiber != null ? `${food.fiber} g` : undefined,
        sodiumContent: food.salt != null ? `${food.salt} g` : undefined,
        servingSize: "100 g",
      }
    : null;

  const faqSchema =
    food.faq && food.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: food.faq.map(
            (item: { question: string; answer: string }) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })
          ),
        }
      : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {nutritionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(nutritionSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Back link */}
      <Link
        href="/livsmedel"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tillbaka till Livsmedel A-Ö
      </Link>

      {/* Title Block */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{food.name}</h1>
        {food.short_description && (
          <p className="text-lg text-muted-foreground mb-4">
            {food.short_description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {category && (
            <Badge variant="secondary">{category.name}</Badge>
          )}
          {food.subcategory && (
            <Badge variant="outline">{food.subcategory}</Badge>
          )}
          {food.calories != null && (
            <Badge variant="outline" className="gap-1">
              <BarChart3 className="w-3 h-3" />
              {food.calories} kcal/100g
            </Badge>
          )}
          {food.can_freeze && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 gap-1">
              <Snowflake className="w-3 h-3" />
              Frysbar
            </Badge>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Snabbfakta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {category && (
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Kategori
                      </div>
                      <div className="text-sm font-medium">
                        {category.name}
                      </div>
                    </div>
                  </div>
                )}
                {food.storage_method && (
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Förvaring
                      </div>
                      <div className="text-sm font-medium">
                        {food.storage_method}
                      </div>
                    </div>
                  </div>
                )}
                {food.shelf_life_unopened && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Hållbarhet (oöppnad)
                      </div>
                      <div className="text-sm font-medium">
                        {food.shelf_life_unopened}
                      </div>
                    </div>
                  </div>
                )}
                {food.can_freeze != null && (
                  <div className="flex items-center gap-2">
                    <Snowflake className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Frysbar
                      </div>
                      <div className="text-sm font-medium">
                        {food.can_freeze ? "Ja" : "Nej"}
                        {food.freezing_tips && (
                          <span className="text-muted-foreground font-normal">
                            {" "}
                            – {food.freezing_tips}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Nutrition */}
          {hasNutrition && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Näringsvärden per 100g
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {food.calories}
                    </div>
                    <div className="text-xs text-muted-foreground">kcal</div>
                  </div>
                  {food.protein != null && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {food.protein}g
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Protein
                      </div>
                    </div>
                  )}
                  {food.fat != null && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {food.fat}g
                      </div>
                      <div className="text-xs text-muted-foreground">Fett</div>
                    </div>
                  )}
                  {food.carbohydrates != null && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {food.carbohydrates}g
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Kolhydrater
                      </div>
                    </div>
                  )}
                  {food.fiber != null && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {food.fiber}g
                      </div>
                      <div className="text-xs text-muted-foreground">Fiber</div>
                    </div>
                  )}
                  {food.salt != null && (
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {food.salt}g
                      </div>
                      <div className="text-xs text-muted-foreground">Salt</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Tips */}
          {food.usage_tips && food.usage_tips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Användningstips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {food.usage_tips.map((tip, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Long Description */}
          {food.long_description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Om {food.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{food.long_description}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQ */}
          {food.faq && food.faq.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Vanliga frågor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {food.faq.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-sm mb-1">
                      {item.question}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Storage & Handling */}
          {(food.storage_method || food.shelf_life_opened || food.freezing_tips) && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Förvaring & Hållbarhet
              </h3>
              <div className="space-y-3">
                {food.storage_method && (
                  <div className="text-sm">
                    <span className="font-medium text-green-800 dark:text-green-300">
                      Förvaring:{" "}
                    </span>
                    <span className="text-green-700 dark:text-green-400">
                      {food.storage_method}
                    </span>
                  </div>
                )}
                {food.shelf_life_opened && (
                  <div className="text-sm">
                    <span className="font-medium text-green-800 dark:text-green-300">
                      Hållbarhet (öppnad):{" "}
                    </span>
                    <span className="text-green-700 dark:text-green-400">
                      {food.shelf_life_opened}
                    </span>
                  </div>
                )}
                {food.shelf_life_unopened && (
                  <div className="text-sm">
                    <span className="font-medium text-green-800 dark:text-green-300">
                      Hållbarhet (oöppnad):{" "}
                    </span>
                    <span className="text-green-700 dark:text-green-400">
                      {food.shelf_life_unopened}
                    </span>
                  </div>
                )}
                {food.freezing_tips && (
                  <div className="text-sm">
                    <span className="font-medium text-green-800 dark:text-green-300">
                      Frystips:{" "}
                    </span>
                    <span className="text-green-700 dark:text-green-400">
                      {food.freezing_tips}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Vitamins & Minerals */}
          {food.key_vitamins && Object.keys(food.key_vitamins).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Vitaminer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(food.key_vitamins).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        Vitamin {key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {food.key_minerals && Object.keys(food.key_minerals).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Leaf className="w-5 h-5 text-blue-500" />
                  Mineraler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(food.key_minerals).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Substitutes */}
          {food.substitutes && food.substitutes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Utensils className="w-5 h-5 text-primary" />
                  Ersättningsvaror
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {food.substitutes.map((sub, i) => (
                  <div key={i}>
                    <div className="font-medium text-sm">{sub.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {sub.reason}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Allergens */}
          {food.allergens && food.allergens.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-red-600 dark:text-red-400">
                  Allergener
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {food.allergens.map((allergen, i) => (
                    <Badge key={i} variant="destructive" className="text-xs">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Season */}
          {food.season && food.season.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  Säsong
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {food.season.map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
