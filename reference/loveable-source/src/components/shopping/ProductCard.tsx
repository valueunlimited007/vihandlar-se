import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductWithStore } from '@/hooks/useProducts'

interface ProductCardProps {
  product: ProductWithStore
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const store = product.stores
  const hasDiscount = product.original_price && product.original_price > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price!) * 100)
    : 0

  return (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/shopping/${store.slug}/${product.slug}`} className="flex-1 flex flex-col">
        <CardContent className="p-4 space-y-4 flex-1 flex flex-col">
          {/* Product Image */}
          <div className="relative">
            {product.image_url ? (
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                
                {/* Hover Quick View Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                </div>

                {/* Discount Badge */}
                {hasDiscount && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-2 left-2 text-xs font-bold shadow-lg"
                  >
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-lg bg-muted flex items-center justify-center border border-border">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-3 flex-1 flex flex-col">
            {/* Store Badge */}
            <Badge 
              variant="secondary" 
              className="text-xs w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              {store.name}
            </Badge>

            <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Brand */}
            {product.brand && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {product.brand}
              </p>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Price Section */}
            <div className="space-y-1 pt-2 border-t border-border">
              {hasDiscount ? (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-bold text-primary">
                      {product.price.toFixed(2)} kr
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {product.original_price!.toFixed(2)} kr
                    </span>
                  </div>
                  <p className="text-xs font-medium text-destructive">
                    Spara {(product.original_price! - product.price).toFixed(2)} kr
                  </p>
                </>
              ) : (
                <span className="text-xl font-bold text-primary block">
                  {product.price.toFixed(2)} kr
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button 
          asChild 
          className={cn(
            "w-full group-hover:shadow-lg transition-all",
            hasDiscount && "bg-destructive hover:bg-destructive/90"
          )}
          size="default"
        >
          <Link to={`/shopping/${store.slug}/${product.slug}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Se produkt
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
