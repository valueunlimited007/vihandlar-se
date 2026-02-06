import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllFoodCategories,
  getFoodCategoryBySlug,
  getFoodsByCategory,
} from "@/lib/data/foods";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const categories = getAllFoodCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getFoodCategoryBySlug(slug);
  const name = category?.name || slug;
  return {
    title: `${name} – Livsmedel per kategori | ViHandlar`,
    description: `Utforska alla livsmedel i kategorin ${name}. Näringsdata, förvaringstips och hälsoeffekter.`,
    alternates: {
      canonical: `https://vihandlar.se/livsmedel/kategori/${slug}`,
    },
  };
}

export default async function FoodCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getFoodCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const foods = getFoodsByCategory(category.id);
  const allCategories = getAllFoodCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Hem</Link>
        <span className="mx-2">›</span>
        <Link href="/livsmedel" className="hover:text-foreground">Livsmedel</Link>
        <span className="mx-2">›</span>
        <span>{category.name}</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-muted-foreground mb-4">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground mb-8">
          {foods.length} livsmedel i denna kategori
        </p>

        {/* Category navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/livsmedel/kategori/${c.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                c.slug === slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary/10"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {foods.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Inga livsmedel hittades i denna kategori.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <Link
                key={food.id}
                href={`/livsmedel/${food.slug}`}
                className="p-4 rounded-xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <h2 className="font-semibold text-lg">{food.name}</h2>
                {food.short_description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {food.short_description}
                  </p>
                )}
                {food.calories != null && (
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span>{food.calories} kcal</span>
                    {food.protein != null && <span>{food.protein}g protein</span>}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
