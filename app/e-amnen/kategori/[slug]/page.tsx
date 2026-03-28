import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EAdditiveCard } from "@/components/EAdditiveCard";
import { getAllEAdditives, getEAdditivesByCategory, getEAdditiveCategories } from "@/lib/data/e-additives";
import { E_CATEGORIES } from "@/types/e-additive";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const categories = getEAdditiveCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = getEAdditiveCategories();
  const category = categories.find((c) => c.slug === slug);
  const catInfo = E_CATEGORIES.find((c) => c.slug === slug);

  const name = category?.name || slug;
  return {
    title: `${name} – E-ämnen per kategori | ViHandlar`,
    description: `Alla E-ämnen i kategorin ${name}${catInfo ? ` (E${catInfo.range})` : ""}. Detaljerad information om risker och hälsoeffekter.`,
    alternates: {
      canonical: `https://vihandlar.se/e-amnen/kategori/${slug}`,
    },
  };
}

export default async function EAmnenCategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = getEAdditiveCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const additives = getEAdditivesByCategory(category.name);
  const catInfo = E_CATEGORIES.find(
    (c) => c.name.toLowerCase() === category.name.toLowerCase()
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "E-ämnen", url: "https://vihandlar.se/e-amnen" },
    { name: category.name, url: `https://vihandlar.se/e-amnen/kategori/${slug}` },
  ]);

  const collectionSchema = buildCollectionPageSchema({
    name: category.name,
    description: `Alla E-ämnen i kategorin ${category.name}`,
    url: `https://vihandlar.se/e-amnen/kategori/${slug}`,
    numberOfItems: additives.length,
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
        <span>{category.name}</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {category.name}
        </h1>
        <p className="text-muted-foreground mb-8">
          {additives.length} E-ämnen
          {catInfo && ` · Serie E${catInfo.range}`}
        </p>

        {/* Category navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/e-amnen/kategori/${c.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                c.slug === slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary/10"
              }`}
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        {additives.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Inga E-ämnen hittades i denna kategori.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additives.map((additive) => (
              <EAdditiveCard key={additive.id} additive={additive} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
