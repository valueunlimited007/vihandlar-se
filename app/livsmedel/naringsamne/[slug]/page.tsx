import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BarChart3, FlaskConical, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllNutrients,
  getNutrientBySlug,
  getTopFoodsForNutrient,
} from "@/lib/data/nutrients";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/schema";

export const revalidate = 3600; // ISR: rebuild every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const nutrients = getAllNutrients();
  return nutrients.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nutrient = getNutrientBySlug(slug);

  if (!nutrient) {
    return { title: "Näringsämne hittades inte" };
  }

  const title = `${nutrient.name} i livsmedel – Topp 50 rikaste livsmedlen`;
  const description = `${nutrient.description} Se vilka livsmedel som innehåller mest ${nutrient.name.toLowerCase()} per 100 gram. Data från Livsmedelsverket.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://vihandlar.se/livsmedel/naringsamne/${nutrient.slug}`,
    },
    openGraph: {
      title: `${nutrient.name} – Rikaste livsmedlen`,
      description,
      url: `https://vihandlar.se/livsmedel/naringsamne/${nutrient.slug}`,
    },
  };
}

function formatValue(value: number, unit: string): string {
  if (value >= 1000) {
    return `${Math.round(value).toLocaleString("sv-SE")} ${unit}`;
  }
  if (value >= 10) {
    return `${Number(value.toFixed(1))} ${unit}`;
  }
  if (value >= 1) {
    return `${Number(value.toFixed(2))} ${unit}`;
  }
  return `${Number(value.toFixed(3))} ${unit}`;
}

function getRdiPercent(value: number, rdi: number): number {
  return Math.round((value / rdi) * 100);
}

function getRdiBarColor(percent: number): string {
  if (percent >= 100) return "bg-green-500";
  if (percent >= 50) return "bg-emerald-400";
  if (percent >= 25) return "bg-yellow-400";
  return "bg-orange-300";
}

export default async function NutrientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const nutrient = getNutrientBySlug(slug);

  if (!nutrient) {
    notFound();
  }

  const topFoods = getTopFoodsForNutrient(nutrient.field, 50);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "Livsmedel", url: "https://vihandlar.se/livsmedel" },
    { name: "Näringsämnen", url: "https://vihandlar.se/livsmedel/naringsamne" },
    {
      name: nutrient.name,
      url: `https://vihandlar.se/livsmedel/naringsamne/${nutrient.slug}`,
    },
  ]);

  const collectionSchema = buildCollectionPageSchema({
    name: `${nutrient.name} i livsmedel`,
    description: `Topp ${topFoods.length} livsmedel med mest ${nutrient.name.toLowerCase()} per 100 gram`,
    url: `https://vihandlar.se/livsmedel/naringsamne/${nutrient.slug}`,
    numberOfItems: topFoods.length,
  });

  // Aggregate categories for summary
  const categoryCounts: Record<string, number> = {};
  for (const food of topFoods) {
    const cat = food.category || "Övrigt";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Back link */}
      <Link
        href="/livsmedel/naringsamne"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Alla näringsämnen
      </Link>

      {/* Title Block */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold">{nutrient.name}</h1>
          <Badge variant="secondary" className="text-sm">
            {nutrient.unit}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mb-3">
          {nutrient.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{nutrient.categoryName}</Badge>
          {nutrient.rdi && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              RDI: {nutrient.rdi} {nutrient.rdiUnit || nutrient.unit}/dag
              {nutrient.rdiSource && ` (${nutrient.rdiSource})`}
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {topFoods.length}
            </div>
            <div className="text-xs text-muted-foreground">Livsmedel rankade</div>
          </CardContent>
        </Card>
        {topFoods.length > 0 && (
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatValue(topFoods[0].value, nutrient.unit)}
              </div>
              <div className="text-xs text-muted-foreground">Högsta innehåll</div>
            </CardContent>
          </Card>
        )}
        {nutrient.rdi && topFoods.length > 0 && (
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {getRdiPercent(topFoods[0].value, nutrient.rdi)}%
              </div>
              <div className="text-xs text-muted-foreground">
                av RDI (nr 1)
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {topCategories.length > 0 ? topCategories[0][0] : "–"}
            </div>
            <div className="text-xs text-muted-foreground">Rikaste kategorin</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content — Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Topp {topFoods.length} livsmedel med mest {nutrient.name.toLowerCase()}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sorterat efter innehåll per 100 gram
              </p>
            </CardHeader>
            <CardContent>
              {topFoods.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">
                  Inga livsmedel med {nutrient.name.toLowerCase()}-data hittades.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-3 pr-2 text-muted-foreground font-medium w-10">
                          #
                        </th>
                        <th className="py-3 pr-4 text-muted-foreground font-medium">
                          Livsmedel
                        </th>
                        <th className="py-3 pr-4 text-muted-foreground font-medium text-right whitespace-nowrap">
                          Per 100g
                        </th>
                        {nutrient.rdi && (
                          <th className="py-3 text-muted-foreground font-medium w-48 hidden sm:table-cell">
                            % av RDI
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {topFoods.map((food, index) => {
                        const rdiPercent = nutrient.rdi
                          ? getRdiPercent(food.value, nutrient.rdi)
                          : null;
                        const barWidth = rdiPercent
                          ? Math.min(rdiPercent, 100)
                          : 0;

                        return (
                          <tr
                            key={food.slug}
                            className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                          >
                            {/* Rank */}
                            <td className="py-3 pr-2 text-muted-foreground font-mono text-xs">
                              {index + 1}
                            </td>

                            {/* Food name + category */}
                            <td className="py-3 pr-4">
                              <Link
                                href={`/livsmedel/${food.slug}`}
                                className="font-medium text-foreground hover:text-primary transition-colors"
                              >
                                {food.name}
                              </Link>
                              {food.category && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {food.category}
                                </div>
                              )}
                            </td>

                            {/* Value */}
                            <td className="py-3 pr-4 text-right font-medium whitespace-nowrap">
                              {formatValue(food.value, nutrient.unit)}
                            </td>

                            {/* RDI bar */}
                            {nutrient.rdi && (
                              <td className="py-3 hidden sm:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${getRdiBarColor(rdiPercent ?? 0)}`}
                                      style={{ width: `${barWidth}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground font-mono w-12 text-right">
                                    {rdiPercent}%
                                  </span>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="w-5 h-5 text-primary" />
                Om {nutrient.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground">Kategori</div>
                <div className="text-sm font-medium">{nutrient.categoryName}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Enhet</div>
                <div className="text-sm font-medium">{nutrient.unit} per 100g</div>
              </div>
              {nutrient.rdi && (
                <div>
                  <div className="text-xs text-muted-foreground">
                    Rekommenderat dagligt intag
                  </div>
                  <div className="text-sm font-medium">
                    {nutrient.rdi} {nutrient.rdiUnit || nutrient.unit}
                  </div>
                  {nutrient.rdiSource && (
                    <div className="text-xs text-muted-foreground">
                      Källa: {nutrient.rdiSource}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Categories */}
          {topCategories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  Rikaste kategorierna
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topCategories.map(([cat, count]) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground truncate mr-2">
                        {cat}
                      </span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {count} st
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick links to related nutrients */}
          {(() => {
            const siblings = getAllNutrients().filter(
              (n) =>
                n.category === nutrient.category && n.slug !== nutrient.slug
            );
            if (siblings.length === 0) return null;
            return (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Fler i {nutrient.categoryName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {siblings.map((n) => (
                      <Link key={n.slug} href={`/livsmedel/naringsamne/${n.slug}`}>
                        <Badge
                          variant="outline"
                          className="hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                        >
                          {n.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      </div>

      {/* Source attribution */}
      <div className="mt-12 p-4 rounded-lg bg-muted/50 border text-sm text-muted-foreground">
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
          . Alla näringsvärden per 100 gram livsmedel.
        </p>
      </div>
    </div>
  );
}
