import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Grid3X3, Package, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { buildBreadcrumbSchema } from "@/lib/schema";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getAllProductCategories,
} from "@/lib/data/products";
import { getAllStores } from "@/lib/data/stores";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

const ITEMS_PER_PAGE = 24;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Kategori hittades inte" };
  }

  const title =
    category.seo_title ??
    `${category.name} - Handla online | vihandlar.se`;
  const description =
    category.seo_description ??
    `Jämför priser på ${category.product_count ?? ""} ${category.name.toLowerCase()}-produkter. Snabb leverans direkt hem.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://vihandlar.se/handla/kategori/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://vihandlar.se/handla/kategori/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page: pageParam, sort } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const stores = getAllStores();
  const storeName = stores[0]?.name ?? "Delitea";

  let allProducts = getProductsByCategory(slug);

  // Sort
  switch (sort) {
    case "price_asc":
      allProducts = [...allProducts].sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      allProducts = [...allProducts].sort((a, b) => b.price - a.price);
      break;
    case "name":
      allProducts = [...allProducts].sort((a, b) =>
        a.name.localeCompare(b.name, "sv")
      );
      break;
    case "discount":
      allProducts = [...allProducts].sort((a, b) => {
        const dA =
          a.original_price && a.original_price > a.price
            ? ((a.original_price - a.price) / a.original_price) * 100
            : 0;
        const dB =
          b.original_price && b.original_price > b.price
            ? ((b.original_price - b.price) / b.original_price) * 100
            : 0;
        return dB - dA;
      });
      break;
  }

  const total = allProducts.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const products = allProducts.slice(start, start + ITEMS_PER_PAGE);

  // Build sort URL helper
  const buildUrl = (newPage: number, newSort?: string) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", String(newPage));
    if (newSort && newSort !== "default") params.set("sort", newSort);
    const qs = params.toString();
    return `/handla/kategori/${slug}${qs ? `?${qs}` : ""}`;
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "Handla", url: "https://vihandlar.se/handla" },
    { name: category.name, url: `https://vihandlar.se/handla/kategori/${slug}` },
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Hem
        </Link>
        <span>/</span>
        <Link href="/handla" className="hover:text-primary transition-colors">
          Handla
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/handla"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Tillbaka till Handla
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3">
          <Badge variant="secondary" className="gap-1">
            <Package className="w-3 h-3" />
            {total} produkt{total !== 1 ? "er" : ""}
          </Badge>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-6 p-3 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Visar {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)} av{" "}
          {total}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Sortera:
          </span>
          <div className="flex gap-1">
            {[
              { value: "default", label: "Relevans" },
              { value: "name", label: "A-Ö" },
              { value: "price_asc", label: "Lägst pris" },
              { value: "price_desc", label: "Högst pris" },
              { value: "discount", label: "Rabatt" },
            ].map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl(1, opt.value)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  (sort ?? "default") === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border hover:bg-muted"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              storeName={storeName}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-xl">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">
            Inga produkter i denna kategori
          </p>
          <Link
            href="/handla"
            className="text-sm text-primary hover:underline"
          >
            Utforska alla produkter
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {page > 1 ? (
            <Link
              href={buildUrl(page - 1, sort)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Föregående
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed">
              Föregående
            </span>
          )}

          <span className="text-sm text-muted-foreground">
            Sida {page} av {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={buildUrl(page + 1, sort)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Nästa
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed">
              Nästa
            </span>
          )}
        </div>
      )}
    </div>
  );
}
