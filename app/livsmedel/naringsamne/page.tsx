import type { Metadata } from "next";
import Link from "next/link";
import { getAllNutrients, getNutrientCategories } from "@/lib/data/nutrients";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Näringsämnen – Vitaminer, Mineraler & Makronäringsämnen",
  description:
    "Utforska alla näringsämnen i livsmedel. Se vilka livsmedel som innehåller mest vitamin C, järn, protein, omega-3 och fler. Data från Livsmedelsverkets databas med 2 600+ livsmedel.",
  alternates: { canonical: "https://vihandlar.se/livsmedel/naringsamne" },
  openGraph: {
    title: "Näringsämnen – Vitaminer, Mineraler & Makro",
    description:
      "Utforska alla näringsämnen. Se vilka livsmedel som är rikast på varje vitamin och mineral.",
    url: "https://vihandlar.se/livsmedel/naringsamne",
  },
};

export default function NaringsamnenPage() {
  const allNutrients = getAllNutrients();
  const categories = getNutrientCategories();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "Livsmedel", url: "https://vihandlar.se/livsmedel" },
    { name: "Näringsämnen", url: "https://vihandlar.se/livsmedel/naringsamne" },
  ]);

  const collectionSchema = buildCollectionPageSchema({
    name: "Näringsämnen",
    description:
      "Alla näringsämnen i livsmedel med rankade livsmedelslistor",
    url: "https://vihandlar.se/livsmedel/naringsamne",
    numberOfItems: allNutrients.length,
  });

  // Group by category
  const grouped: Record<string, typeof allNutrients> = {};
  for (const n of allNutrients) {
    if (!grouped[n.categoryName]) grouped[n.categoryName] = [];
    grouped[n.categoryName].push(n);
  }

  // Category display order
  const categoryOrder = [
    "Makronäringsämnen",
    "Vitaminer",
    "Mineraler",
    "Fettsyror",
    "Övrigt",
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Hem
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/livsmedel" className="hover:text-foreground">
          Livsmedel
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <span>Näringsämnen</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        Näringsämnen
      </h1>
      <p className="text-lg text-muted-foreground mb-4 max-w-3xl">
        Utforska {allNutrients.length} näringsämnen och se vilka livsmedel som
        innehåller mest av varje. Data från Livsmedelsverkets livsmedelsdatabas
        med 2 600+ livsmedel.
      </p>
      <p className="text-sm text-muted-foreground mb-12">
        Klicka på ett näringsämne för att se en komplett rankning av alla
        livsmedel.
      </p>

      {categoryOrder.map((catName) => {
        const nutrients = grouped[catName];
        if (!nutrients) return null;

        return (
          <section key={catName} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{catName}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nutrients.map((n) => (
                <Link
                  key={n.slug}
                  href={`/livsmedel/naringsamne/${n.slug}`}
                >
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-0.5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center justify-between">
                        {n.name}
                        <Badge variant="secondary" className="text-xs">
                          {n.unit}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {n.description}
                      </p>
                      {n.rdi && (
                        <p className="text-xs text-primary mt-2">
                          RDI: {n.rdi} {n.rdiUnit || n.unit}/dag
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Source */}
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
