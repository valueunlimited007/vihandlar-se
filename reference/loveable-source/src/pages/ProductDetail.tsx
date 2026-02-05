import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { ProductSchema } from '@/components/shopping/ProductSchema'
import { useProduct } from '@/hooks/useProducts'
import { generateProductTitle, generateProductDescription, generateProductKeywords } from '@/utils/productMetaOptimization'
import { generateAffiliateLink, getAffiliateDisclaimer, getAffiliateLinkProps } from '@/utils/affiliateTracking'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink, Package, Truck, Tag } from 'lucide-react'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import { categoryToSlug } from '@/lib/utils'

export default function ProductDetail() {
  const { store: storeSlug, slug: productSlug } = useParams<{ store: string; slug: string }>()
  const { data: product, isLoading, error } = useProduct(storeSlug!, productSlug!)
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-[1200px]">
          <Skeleton className="h-[600px]" />
        </div>
      </Layout>
    )
  }
  
  if (error || !product) {
    return (
      <Layout>
        <SEO 
          title="Produkt hittades inte | Vihandlar.se"
          description="Den efterfrågade produkten kunde inte hittas."
        />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Produkten kunde inte hittas.</AlertDescription>
          </Alert>
          <Button asChild className="mt-4">
            <Link to="/shopping">Tillbaka till shopping</Link>
          </Button>
        </div>
      </Layout>
    )
  }
  
  const store = product.stores
  const affiliateLink = product.product_url // Already contains affiliate tracking from feed
  const disclaimer = getAffiliateDisclaimer(store)
  const linkProps = getAffiliateLinkProps()
  
  const title = generateProductTitle(product, store)
  const description = generateProductDescription(product, store)
  const keywords = generateProductKeywords(product, store)
  
  const hasDiscount = product.original_price && product.original_price > product.price

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={`https://vihandlar.se/shopping/${store.slug}/${product.slug}`}
        ogType="product"
        ogImage={product.image_url || undefined}
      />
      <ProductSchema product={product} />

      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Hem</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/shopping">Shopping</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {product.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/shopping/kategori/${categoryToSlug(product.category)}`}>
                      {product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Annonsmärkning */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription>
            ℹ️ Sidan innehåller reklam genom annonslänkar för {store.name}
          </AlertDescription>
        </Alert>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{store.name}</span>
                {product.brand && (
                  <>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{product.brand}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price Box */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">
                      {product.price} {product.currency}
                    </span>
                    {hasDiscount && (
                      <span className="text-xl text-muted-foreground line-through">
                        {product.original_price} {product.currency}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck size={16} />
                    {product.shipping_cost === 0 ? (
                      <span className="font-semibold text-primary">Fri frakt</span>
                    ) : product.shipping_cost ? (
                      <span>Frakt: {product.shipping_cost} {product.currency}</span>
                    ) : (
                      <span>Fraktkostnad beräknas i kassan</span>
                    )}
                  </div>
                  
                  {product.in_stock && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Package size={16} />
                      <span>I lager</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Buy Button */}
            <Button 
              asChild 
              size="lg" 
              className="w-full text-lg h-14"
            >
              <a href={affiliateLink} {...linkProps}>
                Köp hos {store.name}
                <ExternalLink className="ml-2" size={20} />
              </a>
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {disclaimer}
            </p>

            {/* Product Info */}
            <div className="pt-4 border-t border-border space-y-2">
              {product.category && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag size={16} className="text-muted-foreground" />
                  <Link 
                    to={`/shopping/${store.slug}?category=${encodeURIComponent(product.category)}`}
                    className="text-primary hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
              )}
              {product.ean && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">EAN:</span> {product.ean}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Produktbeskrivning</h2>
              <div className="prose max-w-none text-foreground">
                {product.description}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Disclaimer */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            *{disclaimer}
          </p>
        </div>
      </div>
    </Layout>
  )
}
