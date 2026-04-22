import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/store";
import { getStoreForProduct } from "@/lib/data/stores";

interface ProductCardProps {
  product: Product;
  storeName?: string;
}

export function ProductCard({
  product,
  storeName,
}: ProductCardProps) {
  const resolvedStoreName =
    storeName ?? getStoreForProduct(product)?.name ?? "vihandlar.se";
  const hasDiscount =
    product.original_price != null && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.original_price! - product.price) / product.original_price!) *
          100
      )
    : 0;
  const savings = hasDiscount
    ? (product.original_price! - product.price).toFixed(0)
    : null;

  return (
    <Link
      href={`/handla/produkt/${product.slug}`}
      className="group flex flex-col bg-card border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={`${product.name}${product.brand ? ` från ${product.brand}` : ""} – köp hos ${resolvedStoreName}`}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <ShoppingCart className="w-12 h-12 opacity-20" />
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 text-xs font-bold"
          >
            -{discountPercent}%
          </Badge>
        )}

        {/* Store badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 text-[10px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          {resolvedStoreName}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
        )}

        <div className="mt-auto pt-2 border-t border-border/50">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-primary">
              {product.price.toFixed(0)} kr
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {product.original_price!.toFixed(0)} kr
              </span>
            )}
          </div>

          {savings && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">
              Spara {savings} kr
            </p>
          )}

          {/* CTA */}
          <div
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-colors ${
              hasDiscount
                ? "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:group-hover:bg-red-600 dark:group-hover:text-white"
                : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Se produkt
          </div>
        </div>
      </div>
    </Link>
  );
}
