import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle,
  ShoppingBag,
  Shield,
  Calculator,
  Leaf,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskGauge } from "@/components/RiskGauge";
import { ProductCard } from "@/components/ProductCard";
import {
  getAllEAdditives,
  getEAdditiveBySlug,
} from "@/lib/data/e-additives";
import { getRelatedProductsForEAdditive } from "@/lib/data/products";
import { getRiskLevel, type CommonProduct } from "@/types/e-additive";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllEAdditives().map((additive) => ({
    slug: additive.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const additive = getEAdditiveBySlug(slug);

  if (!additive) {
    return { title: "E-ämne hittades inte" };
  }

  const title =
    additive.meta_title ||
    `${additive.e_number} ${additive.name} – Hälsoeffekter & Risknivå`;
  const description =
    additive.meta_description ||
    `${additive.e_number} (${additive.name}): Risknivå ${additive.risk_score}/10. ${additive.short_description || "Läs om hälsoeffekter, ADI-värde och var tillsatsen används."}`;

  return {
    title,
    description,
    keywords: [
      additive.e_number,
      additive.name,
      additive.common_name,
      additive.category,
      "E-ämne",
      "tillsats",
      "riskbedömning",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: `https://vihandlar.se/e-amnen/${additive.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://vihandlar.se/e-amnen/${additive.slug}`,
    },
  };
}

export default async function EAdditiveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const additive = getEAdditiveBySlug(slug);

  if (!additive) {
    notFound();
  }

  const riskLevel = getRiskLevel(additive.risk_score);
  const isHighRisk = additive.risk_score >= 7;
  const relatedProducts = getRelatedProductsForEAdditive(additive, 4);
  const adiMax = additive.adi_value ? Math.round(additive.adi_value * 70) : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${additive.e_number} ${additive.name} – Hälsoeffekter & Risknivå`,
    description:
      additive.short_description ||
      `Information om ${additive.e_number} (${additive.name}), risknivå ${additive.risk_score}/10.`,
    url: `https://vihandlar.se/e-amnen/${additive.slug}`,
    publisher: {
      "@type": "Organization",
      name: "vihandlar.se",
      url: "https://vihandlar.se",
    },
    mainEntityOfPage: `https://vihandlar.se/e-amnen/${additive.slug}`,
    ...(additive.updated_at && { dateModified: additive.updated_at }),
    ...(additive.created_at && { datePublished: additive.created_at }),
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
        name: "E-ämnen",
        item: "https://vihandlar.se/e-amnen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${additive.e_number} ${additive.name}`,
        item: `https://vihandlar.se/e-amnen/${additive.slug}`,
      },
    ],
  };

  // Build FAQ schema if health effects have useful data
  const faqEntries: { question: string; answer: string }[] = [];
  if (additive.short_description) {
    faqEntries.push({
      question: `Vad är ${additive.e_number} (${additive.name})?`,
      answer: additive.short_description,
    });
  }
  if (additive.health_effects?.documented?.length) {
    faqEntries.push({
      question: `Vilka biverkningar har ${additive.e_number}?`,
      answer: `Dokumenterade biverkningar: ${additive.health_effects.documented.join(", ")}.`,
    });
  }
  if (additive.children_note) {
    faqEntries.push({
      question: `Är ${additive.e_number} säkert för barn?`,
      answer: additive.children_note,
    });
  }

  const faqSchema =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Back link */}
      <Link
        href="/e-amnen"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tillbaka till E-ämnen
      </Link>

      {/* High risk warning banner */}
      {isHighRisk && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <div>
              <span className="font-semibold text-red-700 dark:text-red-400">
                Hög risk
              </span>
              {additive.children_note && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {additive.children_note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Risk group warning */}
      {additive.health_effects?.risk_groups &&
        additive.health_effects.risk_groups.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <p className="font-semibold text-orange-700 dark:text-orange-400 text-sm mb-2">
              Särskilda riskgrupper:
            </p>
            <ul className="list-disc list-inside text-sm text-orange-600 dark:text-orange-400 space-y-1">
              {additive.health_effects.risk_groups.map((group, i) => (
                <li key={i}>{group}</li>
              ))}
            </ul>
          </div>
        )}

      {/* Title Block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {additive.e_number} – {additive.name}
          </h1>
          {additive.common_name && (
            <p className="text-lg text-muted-foreground mb-4">
              {additive.common_name}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{additive.category}</Badge>
            {additive.origin && (
              <Badge variant="outline" className="gap-1">
                <Leaf className="w-3 h-3" />
                {additive.origin}
              </Badge>
            )}
            {additive.longevity_impact && (
              <Badge
                variant={
                  additive.longevity_impact === "Negativ"
                    ? "destructive"
                    : "default"
                }
              >
                {additive.longevity_impact}
              </Badge>
            )}
          </div>
        </div>

        <RiskGauge score={additive.risk_score} size="lg" showLabel />
      </div>

      {/* Risk disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Riskbedömningen är baserad på tillgänglig forskning och är inte en officiell EFSA-bedömning.
            För officiell information, se{" "}
            <a href="https://www.efsa.europa.eu/" target="_blank" rel="noopener noreferrer" className="underline font-medium">efsa.europa.eu</a>.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Vad är {additive.e_number}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              {additive.short_description && (
                <p className="text-muted-foreground mb-4">
                  {additive.short_description}
                </p>
              )}
              {additive.long_description && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{additive.long_description}</p>
                </div>
              )}
              {!additive.short_description && !additive.long_description && (
                <p className="text-muted-foreground italic">
                  Detaljerad beskrivning saknas för detta E-ämne.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Health Effects */}
          {additive.health_effects && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Hälsoeffekter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Documented side effects */}
                {additive.health_effects.documented &&
                  additive.health_effects.documented.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Dokumenterade biverkningar
                      </h4>
                      <ul className="space-y-1">
                        {additive.health_effects.documented.map(
                          (effect, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-red-400 mt-1">•</span>
                              {effect}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Suspected effects */}
                {additive.health_effects.suspected &&
                  additive.health_effects.suspected.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Misstänkta effekter
                      </h4>
                      <ul className="space-y-1">
                        {additive.health_effects.suspected.map(
                          (effect, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-yellow-400 mt-1">•</span>
                              {effect}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Benefits */}
                {additive.health_effects.benefits &&
                  additive.health_effects.benefits.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Potentiella fördelar
                      </h4>
                      <ul className="space-y-1">
                        {additive.health_effects.benefits.map(
                          (benefit, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-green-400 mt-1">•</span>
                              {benefit}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}

          {/* Common Products */}
          {additive.common_products && additive.common_products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Var hittar man {additive.e_number}?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {typeof additive.common_products[0] === "string" ? (
                  <div className="flex flex-wrap gap-1.5">
                    {(additive.common_products as unknown as string[]).map(
                      (product, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {product}
                        </Badge>
                      )
                    )}
                  </div>
                ) : (
                  (additive.common_products as CommonProduct[]).map(
                    (product, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-primary/30 pl-4"
                      >
                        <h4 className="font-semibold text-sm mb-2">
                          {product.category}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {product.products.map((p, j) => (
                            <Badge
                              key={j}
                              variant="secondary"
                              className="text-xs"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                        {product.average_amount && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Genomsnittlig mängd: {product.average_amount}
                          </p>
                        )}
                      </div>
                    )
                  )
                )}
              </CardContent>
            </Card>
          )}

          {/* Related products — livsmedel som typiskt kan innehålla ämnet */}
          {relatedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Livsmedel som kan innehålla {additive.e_number}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Produkter från våra partnerbutiker där {additive.name.toLowerCase()} kan förekomma som tillsats. Läs alltid ingrediensförteckningen på förpackningen.
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
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="space-y-6">
          {/* ADI Information */}
          {additive.adi_value && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calculator className="w-5 h-5 text-primary" />
                  ADI-information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {additive.adi_value} mg/kg
                  </div>
                  <div className="text-xs text-muted-foreground">
                    kroppsvikt per dag
                  </div>
                  {additive.adi_source && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Källa: {additive.adi_source}
                    </div>
                  )}
                </div>

                {adiMax && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs font-medium mb-1">
                      För en person på 70 kg:
                    </p>
                    <p className="text-sm font-semibold">
                      Max per dag:{" "}
                      <span className="text-primary">{adiMax} mg</span>
                    </p>
                  </div>
                )}

                {additive.children_note && (
                  <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                      {additive.children_note}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Avoidance Tips */}
          {additive.avoidance_tips && additive.avoidance_tips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5 text-green-500" />
                  Undvikandetips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additive.avoidance_tips.map((tip, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Natural Alternatives */}
          {additive.natural_alternatives &&
            additive.natural_alternatives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Naturliga alternativ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {additive.natural_alternatives.map((alt, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {alt}
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
