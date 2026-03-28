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
  ShoppingBag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getFoodBySlug,
  getAllFoodCategories,
  getFoodCategoryBySlug,
} from "@/lib/data/foods";
import { getRelatedProductsForFood } from "@/lib/data/products";
import { ProductCard } from "@/components/ProductCard";
import type { Food } from "@/types/food";

function generateFoodFaq(food: Food): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  // 1. Calories question (always if calories exist)
  if (food.calories != null) {
    faqs.push({
      question: `Hur många kalorier har ${food.name}?`,
      answer: `${food.name} innehåller ${food.calories} kcal per 100 gram.${food.protein != null ? ` Det innehåller också ${food.protein}g protein, ${food.fat}g fett och ${food.carbohydrates}g kolhydrater.` : ''}`,
    });
  }

  // 2. Protein question (if protein data)
  if (food.protein != null && food.protein > 5) {
    faqs.push({
      question: `Hur mycket protein finns i ${food.name}?`,
      answer: `${food.name} innehåller ${food.protein}g protein per 100 gram.${food.protein > 15 ? ' Det är en bra proteinkälla.' : ''}`,
    });
  }

  // 3. Storage question (if storage_method exists)
  if (food.storage_method) {
    faqs.push({
      question: `Hur förvarar man ${food.name}?`,
      answer: food.storage_method + (food.shelf_life_opened ? ` Hållbarhet efter öppning: ${food.shelf_life_opened}.` : ''),
    });
  }

  // 4. Freezing question (if can_freeze data)
  if (food.can_freeze != null) {
    faqs.push({
      question: `Kan man frysa ${food.name}?`,
      answer: food.can_freeze
        ? `Ja, ${food.name} kan frysas.${food.freezing_tips ? ` Tips: ${food.freezing_tips}` : ''}`
        : `Nej, ${food.name} rekommenderas inte att frysas.`,
    });
  }

  // 5. Vitamin/mineral highlight (if notable nutrients)
  const highlights: string[] = [];
  if (food.vitamin_c != null && food.vitamin_c > 20) highlights.push(`${food.vitamin_c} mg C-vitamin`);
  if (food.iron != null && food.iron > 2) highlights.push(`${food.iron} mg järn`);
  if (food.calcium != null && food.calcium > 100) highlights.push(`${food.calcium} mg kalcium`);
  if (food.vitamin_d != null && food.vitamin_d > 2) highlights.push(`${food.vitamin_d} µg D-vitamin`);
  if (food.omega_3 != null && food.omega_3 > 0.5) highlights.push(`${food.omega_3}g omega-3`);

  if (highlights.length > 0) {
    faqs.push({
      question: `Vilka näringsämnen finns i ${food.name}?`,
      answer: `${food.name} innehåller bland annat ${highlights.join(', ')} per 100 gram. Källa: Livsmedelsverkets livsmedelsdatabas 2025.`,
    });
  }

  // 6. Category-based generic question (fallback)
  if (food.subcategory && faqs.length < 3) {
    faqs.push({
      question: `Vilken typ av livsmedel är ${food.name}?`,
      answer: `${food.name} tillhör kategorin ${food.subcategory}.${food.calories != null ? ` Det innehåller ${food.calories} kcal per 100 gram.` : ''}`,
    });
  }

  return faqs;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // ISR: rebuild every hour

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

  // Resolve category: try category_slug first (new foods), then fall back to category_id (original 68)
  const category = food.category_slug
    ? getFoodCategoryBySlug(food.category_slug)
    : food.category_id
      ? getAllFoodCategories().find((c) => c.id === food.category_id)
      : undefined;

  const hasNutrition = food.calories != null;

  const relatedProducts = getRelatedProductsForFood(
    food.name,
    food.subcategory || food.category_slug || null,
    4
  );

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

  // Use existing FAQ for original foods, otherwise generate from data
  const faqItems = food.faq && food.faq.length > 0
    ? food.faq
    : generateFoodFaq(food);

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map(
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

          {/* Sugar breakdown */}
          {(food.sugar_total != null || food.added_sugar != null || food.free_sugar != null) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-pink-500" />
                  Socker per 100g
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {food.sugar_total != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Totalt socker</span>
                      <span className="font-medium">{food.sugar_total} g</span>
                    </div>
                  )}
                  {food.added_sugar != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tillsatt socker</span>
                      <span className="font-medium">{food.added_sugar} g</span>
                    </div>
                  )}
                  {food.free_sugar != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fritt socker</span>
                      <span className="font-medium">{food.free_sugar} g</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fatty acids breakdown */}
          {(food.saturated_fat != null || food.monounsaturated_fat != null || food.polyunsaturated_fat != null || food.omega_3 != null || food.cholesterol != null) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  Fettsyror per 100g
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {food.saturated_fat != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mättat fett</span>
                      <span className="font-medium">{food.saturated_fat} g</span>
                    </div>
                  )}
                  {food.monounsaturated_fat != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Enkelomättat fett</span>
                      <span className="font-medium">{food.monounsaturated_fat} g</span>
                    </div>
                  )}
                  {food.polyunsaturated_fat != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fleromättat fett</span>
                      <span className="font-medium">{food.polyunsaturated_fat} g</span>
                    </div>
                  )}
                  {food.omega_3 != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Omega-3</span>
                      <span className="font-medium">{food.omega_3} g</span>
                    </div>
                  )}
                  {food.cholesterol != null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Kolesterol</span>
                      <span className="font-medium">{food.cholesterol} mg</span>
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
          {faqItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Vanliga frågor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, i) => (
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
          {/* Vitamins — new numeric fields or legacy key_vitamins */}
          {(() => {
            const vitaminRows: { label: string; value: string }[] = [];
            if (food.vitamin_a != null) vitaminRows.push({ label: "Vitamin A", value: `${food.vitamin_a} \u00b5g` });
            if (food.vitamin_d != null) vitaminRows.push({ label: "Vitamin D", value: `${food.vitamin_d} \u00b5g` });
            if (food.vitamin_e != null) vitaminRows.push({ label: "Vitamin E", value: `${food.vitamin_e} mg` });
            if (food.vitamin_k != null) vitaminRows.push({ label: "Vitamin K", value: `${food.vitamin_k} \u00b5g` });
            if (food.thiamin_b1 != null) vitaminRows.push({ label: "Tiamin (B1)", value: `${food.thiamin_b1} mg` });
            if (food.riboflavin_b2 != null) vitaminRows.push({ label: "Riboflavin (B2)", value: `${food.riboflavin_b2} mg` });
            if (food.niacin_b3 != null) vitaminRows.push({ label: "Niacin (B3)", value: `${food.niacin_b3} mg` });
            if (food.vitamin_b6 != null) vitaminRows.push({ label: "Vitamin B6", value: `${food.vitamin_b6} mg` });
            if (food.folate != null) vitaminRows.push({ label: "Folat", value: `${food.folate} \u00b5g` });
            if (food.vitamin_b12 != null) vitaminRows.push({ label: "Vitamin B12", value: `${food.vitamin_b12} \u00b5g` });
            if (food.vitamin_c != null) vitaminRows.push({ label: "Vitamin C", value: `${food.vitamin_c} mg` });

            // Fall back to legacy key_vitamins if no numeric vitamins
            if (vitaminRows.length === 0 && food.key_vitamins && Object.keys(food.key_vitamins).length > 0) {
              Object.entries(food.key_vitamins).forEach(([key, value]) => {
                vitaminRows.push({ label: `Vitamin ${key}`, value });
              });
            }

            if (vitaminRows.length === 0) return null;

            return (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Vitaminer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vitaminRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Minerals — new numeric fields or legacy key_minerals */}
          {(() => {
            const mineralRows: { label: string; value: string }[] = [];
            if (food.iron != null) mineralRows.push({ label: "Järn", value: `${food.iron} mg` });
            if (food.calcium != null) mineralRows.push({ label: "Kalcium", value: `${food.calcium} mg` });
            if (food.potassium != null) mineralRows.push({ label: "Kalium", value: `${food.potassium} mg` });
            if (food.magnesium != null) mineralRows.push({ label: "Magnesium", value: `${food.magnesium} mg` });
            if (food.phosphorus != null) mineralRows.push({ label: "Fosfor", value: `${food.phosphorus} mg` });
            if (food.iodine != null) mineralRows.push({ label: "Jod", value: `${food.iodine} \u00b5g` });
            if (food.selenium != null) mineralRows.push({ label: "Selen", value: `${food.selenium} \u00b5g` });
            if (food.zinc != null) mineralRows.push({ label: "Zink", value: `${food.zinc} mg` });
            if (food.sodium != null) mineralRows.push({ label: "Natrium", value: `${food.sodium} mg` });

            // Fall back to legacy key_minerals if no numeric minerals
            if (mineralRows.length === 0 && food.key_minerals && Object.keys(food.key_minerals).length > 0) {
              Object.entries(food.key_minerals).forEach(([key, value]) => {
                mineralRows.push({ label: key, value });
              });
            }

            if (mineralRows.length === 0) return null;

            return (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Leaf className="w-5 h-5 text-blue-500" />
                    Mineraler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mineralRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

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

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Handla {food.name} online
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Relaterade produkter från Delitea
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Affiliatelänkar. Vi kan få provision vid köp utan extra kostnad för dig.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Source attribution */}
      {food.source === "Livsmedelsverkets livsmedelsdatabas 2025" && (
        <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
          <p>
            Källa:{" "}
            <a
              href="https://soknaringsinnehall.livsmedelsverket.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Livsmedelsverkets livsmedelsdatabas 2025
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
