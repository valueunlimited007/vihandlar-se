import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Package, Store, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProducts, useCategories, useProductCount } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shopping/ProductCard";
import { StoreFilter } from "@/components/shopping/StoreFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductSchema } from "@/components/shopping/ProductSchema";

export default function DeliteaShop() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '');
  
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || undefined;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 24;

  // Fetch Delitea products
  const { data: productsData, isLoading } = useProducts({
    storeSlug: 'delitea',
    search: searchQuery,
    category,
    page,
    limit,
  });

  // Fetch categories for Delitea
  const { data: categories } = useCategories('delitea');

  // Get total product count
  const { data: totalProducts } = useProductCount('delitea');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (localSearch.trim()) {
      params.set('q', localSearch.trim());
    } else {
      params.delete('q');
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handleCategoryFilter = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === category) {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const totalPages = Math.ceil((productsData?.total || 0) / limit);

  return (
    <Layout>
      <Helmet>
        <title>Delitea - Premium Delikatesser Online | Vihandlar.se</title>
        <meta 
          name="description" 
          content={`Handla exklusiva delikatesser från Delitea. Över ${totalProducts?.toLocaleString('sv-SE') || '7,800'} produkter inkl. ostar, charkuterier, olivoljor och gourmetprodukter. Snabb leverans.`}
        />
        <meta name="keywords" content="delitea, delikatesser, gourmet, ost, charkuteri, olivolja, premium mat, exklusiva livsmedel" />
        <link rel="canonical" href="https://vihandlar.se/shopping/delitea" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Delitea - Premium Delikatesser | Vihandlar.se" />
        <meta property="og:description" content={`Handla exklusiva delikatesser från Delitea. Över ${totalProducts?.toLocaleString('sv-SE') || '7,800'} produkter.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vihandlar.se/shopping/delitea" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Store className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Delitea</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Premium Delikatesser & Gourmetprodukter
          </p>
          <p className="text-sm text-muted-foreground">
            <Package className="w-4 h-4 inline mr-1" />
            <span className="font-semibold text-primary">
              {totalProducts?.toLocaleString('sv-SE') || '7,800'}+ produkter
            </span> i lager
          </p>
        </div>

        {/* Search Bar */}
        <Card className="max-w-3xl mx-auto mb-8 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Sök i Deliteas sortiment..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  autoComplete="off"
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" size="lg">
                Sök
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Category Filters */}
        {categories && categories.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              Filtrera per kategori:
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 12).map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors px-4 py-2"
                  onClick={() => handleCategoryFilter(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {searchQuery && (
              <span>
                Visar resultat för <span className="font-semibold">"{searchQuery}"</span> •{" "}
              </span>
            )}
            {category && (
              <span>
                Kategori: <span className="font-semibold">{category}</span> •{" "}
              </span>
            )}
            <span className="font-semibold">{productsData?.total || 0}</span> produkter
          </p>
          
          {(searchQuery || category) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchParams({});
                setLocalSearch('');
              }}
            >
              Rensa filter
            </Button>
          )}
        </div>

        {/* Affiliate Disclaimer */}
        <Alert className="max-w-5xl mx-auto mb-8">
          <ExternalLink className="h-4 w-4" />
          <AlertDescription>
            Genom att klicka på en produkt går du vidare till Delitea för att slutföra ditt köp. 
            Vihandlar.se kan erhålla provision på försäljning.
          </AlertDescription>
        </Alert>

        {/* Products Grid */}
        {isLoading ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : productsData && productsData.products.length > 0 ? (
          <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {productsData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', String(page - 1));
                    setSearchParams(params);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={page === 1}
                >
                  Föregående
                </Button>
                
                <span className="text-sm text-muted-foreground px-4">
                  Sida {page} av {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', String(page + 1));
                    setSearchParams(params);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={page === totalPages}
                >
                  Nästa
                </Button>
              </div>
            )}

            {/* Schema Markup for first 8 products */}
            {productsData.products.slice(0, 8).map(product => (
              <ProductSchema key={product.id} product={product} />
            ))}
          </>
        ) : (
          <Card className="max-w-2xl mx-auto text-center p-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Inga produkter hittades</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `Tyvärr hittade vi inga produkter som matchar "${searchQuery}"`
                : "Prova att justera dina filter eller sök efter något annat"}
            </p>
            <Button
              onClick={() => {
                setSearchParams({});
                setLocalSearch('');
              }}
            >
              Visa alla produkter
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
}
