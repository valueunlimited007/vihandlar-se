"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product, ProductCategory } from "@/types/store";

interface ProductSearchProps {
  categories: ProductCategory[];
  featuredProducts: Product[];
}

const SORT_OPTIONS = [
  { value: "default", label: "Relevans" },
  { value: "name", label: "Namn (A-Ö)" },
  { value: "price_asc", label: "Lägst pris" },
  { value: "price_desc", label: "Högst pris" },
] as const;

export function ProductSearch({
  categories,
  featuredProducts,
}: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("default");

  const filteredProducts = useMemo(() => {
    let result = featuredProducts;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "sv"));
        break;
      case "price_asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [featuredProducts, query, sort]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <div className="space-y-8">
      {/* Search + Sort Bar */}
      <div className="bg-card border border-primary/20 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Sök bland 10 000+ produkter..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {(query || selectedCategory) && (
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <span>
              {filteredProducts.length} produkt
              {filteredProducts.length !== 1 ? "er" : ""}
            </span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 text-primary hover:text-primary/80"
              >
                <X className="w-3 h-3" />
                Rensa filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category suggestions when searching */}
      {query.trim() && filteredCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Kategorier som matchar
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredCategories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/handla/kategori/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {cat.name}
                {cat.product_count && (
                  <span className="text-xs opacity-70">
                    ({cat.product_count})
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductSearchCard key={product.id} product={product} />
          ))}
        </div>
      ) : query.trim() ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Inga produkter hittades</p>
          <p className="text-sm text-muted-foreground mb-4">
            Prova ett annat sökord eller utforska våra kategorier
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-sm text-primary hover:underline"
          >
            Rensa sökning
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ProductSearchCard({ product }: { product: Product }) {
  const hasDiscount =
    product.original_price != null && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.original_price! - product.price) / product.original_price!) *
          100
      )
    : 0;

  return (
    <Link
      href={`/handla/produkt/${product.slug}`}
      className="group flex flex-col bg-card border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ShoppingCart className="w-8 h-8 text-muted-foreground opacity-20" />
          </div>
        )}
        {hasDiscount && (
          <Badge
            variant="destructive"
            className="absolute top-1.5 left-1.5 text-[10px]"
          >
            -{discountPercent}%
          </Badge>
        )}
      </div>
      <div className="p-2.5 flex-1 flex flex-col">
        <h4 className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h4>
        <div className="mt-auto pt-1.5">
          <span className="text-sm font-bold text-primary">
            {product.price.toFixed(0)} kr
          </span>
          {hasDiscount && (
            <span className="text-[10px] text-muted-foreground line-through ml-1.5">
              {product.original_price!.toFixed(0)} kr
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
