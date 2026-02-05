import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { SEO } from '@/components/SEO'
import { ProductCard } from '@/components/shopping/ProductCard'
import { StoreFilter } from '@/components/shopping/StoreFilter'
import { CategoryMultiFilter } from '@/components/shopping/CategoryMultiFilter'
import { ProductAutocomplete } from '@/components/shopping/ProductAutocomplete'
import { PopularSearches } from '@/components/shopping/PopularSearches'
import { useProducts, useStores, type SortOption } from '@/hooks/useProducts'
import { useTopCategories } from '@/hooks/useProductCategories'
import { ProductSort } from '@/components/shopping/ProductSort'
import { generateShoppingHubTitle, generateShoppingHubDescription } from '@/utils/productMetaOptimization'
import { createShoppingHubSchema } from '@/utils/productSchemaMarkup'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShoppingBag, Info } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function ShoppingHub() {
  const [searchParams, setSearchParams] = useSearchParams()
  const storeSlug = searchParams.get('store') || undefined
  const category = searchParams.get('category') || undefined
  const searchQuery = searchParams.get('q') || undefined
  const sortBy = (searchParams.get('sort') as SortOption) || (searchQuery ? 'relevance' : 'name')
  const page = parseInt(searchParams.get('page') || '1')
  
  // Parse selected categories from URL
  const categoriesParam = searchParams.get('categories')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoriesParam ? categoriesParam.split(',').filter(Boolean) : []
  )
  
  const [searchInput, setSearchInput] = useState(searchQuery || '')
  
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    params.delete('page')
    setSearchParams(params)
  }

  const handlePopularSearchClick = (query: string) => {
    handleSearch(query)
  }
  
  // Update selectedCategories when URL changes
  useEffect(() => {
    const categoriesParam = searchParams.get('categories')
    setSelectedCategories(categoriesParam ? categoriesParam.split(',').filter(Boolean) : [])
  }, [searchParams])
  
  const { data, isLoading, error } = useProducts({ 
    storeSlug, 
    category, 
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    search: searchQuery,
    sortBy,
    page 
  })
  const { data: stores } = useStores()
  const { data: topCategories, isLoading: categoriesLoading } = useTopCategories(12)
  
  const totalPages = data ? Math.ceil(data.total / 24) : 0
  
  const handleStoreChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('store')
    } else {
      params.set('store', value)
    }
    params.delete('page')
    setSearchParams(params)
  }
  
  const handleCategoriesChange = (categories: string[]) => {
    const params = new URLSearchParams(searchParams)
    if (categories.length > 0) {
      params.set('categories', categories.join(','))
    } else {
      params.delete('categories')
    }
    params.delete('page')
    setSearchParams(params)
  }
  
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', newSort)
    params.delete('page') // Reset to page 1 when sorting changes
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const title = generateShoppingHubTitle(searchQuery, storeSlug)
  const description = generateShoppingHubDescription(stores?.length, data?.total)
  const schema = createShoppingHubSchema(data?.total || 0)

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonical="https://vihandlar.se/shopping"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 rounded-2xl p-8 md:p-12 mb-8 border border-border shadow-lg">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hitta bästa priset på matvaror
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Jämför priser från {stores?.length || 0} butiker och hitta de bästa erbjudandena
              </p>
            </div>

            <div className="space-y-6">
              <ProductAutocomplete
                initialValue={searchQuery || ''}
                onSearch={handleSearch}
              />
              
              {!searchQuery && (
                <PopularSearches onSearchClick={handlePopularSearchClick} />
              )}
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StoreFilter value={storeSlug} onChange={handleStoreChange} />
            <ProductSort value={sortBy} onChange={handleSortChange} />
            <CategoryMultiFilter
              selectedCategories={selectedCategories}
              onCategoriesChange={handleCategoriesChange}
              limit={30}
            />
          </div>
        </div>

        {/* Kategori-navigation */}
        <div className="mb-8 bg-muted/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Bläddra efter kategori</h2>
            <Link to="/shopping/kategorier" className="text-sm text-primary hover:underline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Se alla kategorier →
            </Link>
          </div>
          
          {categoriesLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="p-4 bg-background rounded-lg border border-border">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          )}

          {!categoriesLoading && topCategories && topCategories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCategories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/shopping/kategori/${category.slug}`}
                  className="p-4 bg-background rounded-lg hover:shadow-md transition-all border border-border hover:border-primary"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.product_count?.toLocaleString('sv-SE') || 0} produkter
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!categoriesLoading && (!topCategories || topCategories.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Inga kategorier tillgängliga ännu.</p>
              <p className="text-sm mt-2">
                Kategorier genereras automatiskt från produktdata.
              </p>
            </div>
          )}
        </div>

        {/* Annonsmärkning */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription>
            ℹ️ Sidan innehåller reklam genom annonslänkar till matbutiker
          </AlertDescription>
        </Alert>

        {/* Results Header */}
        {!isLoading && data && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Visar {data.products.length} av {data.total.toLocaleString('sv-SE')} produkter
              {selectedCategories.length > 0 && (
                <span className="ml-2 text-primary font-medium">
                  ({selectedCategories.length} {selectedCategories.length === 1 ? 'kategori' : 'kategorier'} vald{selectedCategories.length === 1 ? '' : 'a'})
                </span>
              )}
            </div>
            <ProductSort 
              value={sortBy} 
              onChange={handleSortChange}
              hasSearch={!!searchQuery}
            />
          </div>
        )}

        {/* Results */}
        {isLoading && (
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
              {searchQuery 
                ? `Inga produkter hittades för "${searchQuery}".` 
                : 'Inga produkter hittades.'
              }
            </AlertDescription>
          </Alert>
        )}

        {data && data.products.length > 0 && (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Visar {data.products.length} av {data.total.toLocaleString('sv-SE')} produkter
            </div>
            
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
            *Vihandlar.se kan erhålla provision på försäljning från butiker.
          </p>
        </div>
      </div>
    </Layout>
  )
}
