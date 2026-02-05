import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  Store,
  Tag,
  TrendingDown,
  Package,
  Grid3X3,
  ArrowRight,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { ProductSearch } from "@/components/ProductSearch";
import {
  getProductCount,
  getTopCategories,
  getAllProductCategories,
  getFeaturedProducts,
  getDiscountedProducts,
} from "@/lib/data/products";
import { getAllStores } from "@/lib/data/stores";
import { getAffiliateDisclaimer } from "@/lib/data/stores";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Handla online - Jämför priser på 10 000+ produkter",
  description:
    "Handla mat online från Delitea. Jämför priser på över 10 000 produkter. Snabb leverans direkt hem till dig.",
  keywords: [
    "handla mat online",
    "jämför matpriser",
    "Delitea",
    "matbutik online",
    "livsmedel online",
  ],
  alternates: {
    canonical: "https://vihandlar.se/handla",
  },
  openGraph: {
    title: "Handla online - Jämför priser | vihandlar.se",
    description:
      "Handla mat online från Delitea. Jämför priser på över 10 000 produkter.",
    type: "website",
    url: "https://vihandlar.se/handla",
  },
};

export default function ShoppingPage() {
  const productCount = getProductCount();
  const topCategories = getTopCategories(24);
  const allCategories = getAllProductCategories();
  const featuredProducts = getFeaturedProducts(40);
  const discountedProducts = getDiscountedProducts(8);
  const stores = getAllStores();
  const storeName = stores[0]?.name ?? "Delitea";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <Badge
          variant="secondary"
          className="mb-4 gap-1.5 px-3 py-1 text-sm"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {productCount.toLocaleString("sv-SE")}+ produkter
        </Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Handla mat online
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utforska {productCount.toLocaleString("sv-SE")} produkter från{" "}
          {storeName}. Jämför priser, hitta erbjudanden och handla smidigt
          online.
        </p>
      </div>

      {/* Affiliate disclaimer */}
      <div className="mb-8 p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          {getAffiliateDisclaimer()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {productCount.toLocaleString("sv-SE")}
            </div>
            <div className="text-xs text-muted-foreground">Produkter</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Grid3X3 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{allCategories.length}</div>
            <div className="text-xs text-muted-foreground">Kategorier</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Store className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stores.length}</div>
            <div className="text-xs text-muted-foreground">
              {stores.length === 1 ? "Butik" : "Butiker"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <TrendingDown className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {discountedProducts.length}+
            </div>
            <div className="text-xs text-muted-foreground">Erbjudanden</div>
          </CardContent>
        </Card>
      </div>

      {/* Discounted Products */}
      {discountedProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Tag className="w-5 h-5 text-red-500" />
              Bästa erbjudanden
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeName={storeName}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-primary" />
          Populära kategorier
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {topCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/handla/kategori/${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-4 bg-card border rounded-xl transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                {cat.product_count != null && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {cat.product_count} produkter
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {allCategories.length > 24 && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Visar {topCategories.length} av {allCategories.length} kategorier.
              Använd sökfältet nedan för att hitta fler.
            </p>
          </div>
        )}
      </section>

      {/* Searchable Products */}
      <section id="produkter">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Alla produkter
        </h2>
        <ProductSearch
          categories={allCategories}
          featuredProducts={featuredProducts}
        />
      </section>

      {/* SEO: Category Links */}
      <section className="mt-16 pt-8 border-t">
        <h2 className="text-lg font-semibold mb-4">Alla kategorier</h2>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/handla/kategori/${cat.slug}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {cat.name}
              {cat.product_count != null && ` (${cat.product_count})`}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
