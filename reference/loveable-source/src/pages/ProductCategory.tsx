import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { useParams, Link } from 'react-router-dom';
import { useCategory, useCategoryProducts } from '@/hooks/useProductCategories';
import { ProductCard } from '@/components/shopping/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  generateCategoryTitle,
  generateCategoryDescription,
  generateCategoryH1,
} from '@/utils/categoryMetaOptimization';
import {
  createCategorySchema,
  createCategoryBreadcrumbSchema,
  createCategoryItemListSchema,
} from '@/utils/categorySchemaMarkup';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: category, isLoading: categoryLoading } = useCategory(categorySlug);
  const { data: productsData, isLoading: productsLoading } = useCategoryProducts(
    categorySlug,
    { page: currentPage, limit: 24 }
  );

  const isLoading = categoryLoading || productsLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-2/3"></div>
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Kategori hittades inte</h1>
          <Button asChild>
            <Link to="/shopping">Tillbaka till shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 1;

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Shopping', url: '/shopping' },
    { name: category.name, url: `/shopping/kategori/${category.slug}` },
  ];

  const categorySchema = createCategorySchema(
    {
      name: category.name,
      slug: category.slug,
      description: category.description || undefined,
      product_count: category.product_count || undefined,
    },
    products.map(p => ({
      name: p.name,
      slug: p.slug,
      image_url: p.image_url || undefined,
      price: p.price,
      brand: p.brand || undefined,
    }))
  );

  const breadcrumbSchema = createCategoryBreadcrumbSchema(
    category.name,
    category.slug
  );

  const itemListSchema = products.length > 0 
    ? createCategoryItemListSchema(
        category.name,
        products.map(p => ({
          name: p.name,
          slug: p.slug,
          image_url: p.image_url || undefined,
          price: p.price,
          brand: p.brand || undefined,
        }))
      )
    : null;

  const title = generateCategoryTitle(category.name, category.product_count || undefined);
  const description = generateCategoryDescription(
    category.name,
    category.product_count || undefined,
    category.description || undefined
  );
  const h1 = generateCategoryH1(category.name, category.product_count || undefined);

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify(categorySchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {itemListSchema && (
          <script type="application/ld+json">
            {JSON.stringify(itemListSchema)}
          </script>
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero */}
        <div className="mb-8 mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {h1}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Produkter */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Inga produkter hittades i denna kategori.
            </p>
            <Button asChild>
              <Link to="/shopping">Bläddra alla produkter</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Föregående
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Sida {currentPage} av {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Nästa
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
