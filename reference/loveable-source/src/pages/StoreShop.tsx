import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { ProductCard } from '@/components/shopping/ProductCard'
import { useProducts, useStore, useProductCount, useCategories } from '@/hooks/useProducts'
import { generateStoreTitle, generateStoreDescription } from '@/utils/productMetaOptimization'
import { createStoreItemListSchema } from '@/utils/productSchemaMarkup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Helmet } from 'react-helmet-async'

export default function StoreShop() {
  const { store: storeSlug } = useParams<{ store: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || undefined
  const page = parseInt(searchParams.get('page') || '1')
  
  const { data: store, isLoading: storeLoading } = useStore(storeSlug!)
  const { data: productCount } = useProductCount(storeSlug!)
  const { data, isLoading: productsLoading, error } = useProducts({ storeSlug, category, page })
  const { data: categories } = useCategories(storeSlug)
  
  const totalPages = data ? Math.ceil(data.total / 24) : 0
  
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams()
    if (value !== 'all') {
      params.set('category', value)
    }
    setSearchParams(params)
  }
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (storeLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 mb-8" />
        </div>
      </Layout>
    )
  }

  if (!store) {
    return (
      <Layout>
        <SEO 
          title="Butik hittades inte | Vihandlar.se"
          description="Den efterfrågade butiken kunde inte hittas."
        />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Butiken kunde inte hittas.</AlertDescription>
          </Alert>
          <Button asChild className="mt-4">
            <Link to="/shopping">Tillbaka till shopping</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  const title = generateStoreTitle(store, category, productCount)
  const description = generateStoreDescription(store, productCount)
  const schema = data ? createStoreItemListSchema(data.products, store) : null

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonical={`https://vihandlar.se/shopping/${store.slug}`}
      />
      {schema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        </Helmet>
      )}

      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-primary hover:underline">Hem</Link>
          {' > '}
          <Link to="/shopping" className="text-primary hover:underline">Shopping</Link>
          {' > '}
          <span className="text-muted-foreground">{store.name}</span>
        </nav>

        {/* Store Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{store.name}</h1>
          {store.description && (
            <p className="text-lg text-muted-foreground mb-4">
              {store.description}
            </p>
          )}
          {productCount && productCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {productCount.toLocaleString('sv-SE')} produkter tillgängliga
            </p>
          )}
        </div>
          
        {/* Annonsmärkning */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription>
            ℹ️ Sidan innehåller reklam genom annonslänkar för {store.name}
          </AlertDescription>
        </Alert>
          
        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="flex gap-4 items-center mb-6">
            <label className="font-semibold text-sm">Kategori:</label>
            <Select value={category || 'all'} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Alla kategorier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla kategorier</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Products */}
        {productsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(24)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Ett fel uppstod vid hämtning av produkter. Försök igen senare.
            </AlertDescription>
          </Alert>
        )}

        {data && data.products.length === 0 && (
          <Alert>
            <AlertDescription>
              Inga produkter hittades{category ? ` i kategorin "${category}"` : ''}.
            </AlertDescription>
          </Alert>
        )}

        {data && data.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Föregående
                </Button>
                <span className="flex items-center px-4">
                  Sida {page} av {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Nästa
                </Button>
              </div>
            )}
          </>
        )}

        {/* Footer disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            *Du kommer till {store.name} för att slutföra ditt köp. Vihandlar.se kan erhålla provision på försäljning.
          </p>
        </div>
      </div>
    </Layout>
  )
}
