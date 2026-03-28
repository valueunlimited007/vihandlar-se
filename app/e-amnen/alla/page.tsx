import type { Metadata } from "next";
import Link from "next/link";
import { EAdditiveSearch } from "@/components/EAdditiveSearch";
import { getAllEAdditives, getHighRiskAdditives, getSafeAdditives } from "@/lib/data/e-additives";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Alla E-ämnen A-Ö – Komplett databas | ViHandlar",
  description:
    "Komplett databas med alla E-ämnen sorterade med sök, filter och riskbedömning. Hitta detaljerad information om varje livsmedelstillsats.",
  alternates: {
    canonical: "https://vihandlar.se/e-amnen/alla",
  },
  openGraph: {
    title: "Alla E-ämnen A-Ö – Komplett databas",
    description: "Sök, filtrera och utforska alla E-ämnen med riskbedömning.",
    url: "https://vihandlar.se/e-amnen/alla",
  },
};

export default function AllaEAmnenPage() {
  const allAdditives = getAllEAdditives();
  const highRisk = getHighRiskAdditives();
  const safe = getSafeAdditives();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "E-ämnen", url: "https://vihandlar.se/e-amnen" },
    { name: "Alla E-ämnen", url: "https://vihandlar.se/e-amnen/alla" },
  ]);

  const collectionSchema = buildCollectionPageSchema({
    name: "Alla E-ämnen",
    description: `Komplett databas med ${allAdditives.length} E-ämnen`,
    url: "https://vihandlar.se/e-amnen/alla",
    numberOfItems: allAdditives.length,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Hem</Link>
        <span className="mx-2">›</span>
        <Link href="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
        <span className="mx-2">›</span>
        <span>Alla E-ämnen</span>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Alla E-ämnen A-Ö
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Komplett databas med {allAdditives.length} livsmedelstillsatser.
            Sök, filtrera och jämför E-ämnen.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {safe.length} låg risk
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              {allAdditives.length - safe.length - highRisk.length} medel risk
            </span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {highRisk.length} hög risk
            </span>
          </div>
        </div>

        <EAdditiveSearch additives={allAdditives} />
      </div>
    </div>
  );
}
