import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCategories } from '@/hooks/useProductCategories';
import { createBreadcrumbSchema } from '@/utils/schemaMarkup';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const ProductCategoryHub = () => {
  const { data: categories, isLoading } = useCategories();

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Shopping', url: '/shopping' },
    { name: 'Kategorier', url: '/shopping/kategorier' },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  return (
    <Layout>
      <Helmet>
        <title>Produktkategorier - Bläddra efter Kategori | Vihandlar.se</title>
        <meta
          name="description"
          content="Utforska alla produktkategorier. Hitta exakt vad du söker genom att bläddra efter kategori. Jämför priser från flera butiker."
        />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Produktkategorier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bläddra genom alla produktkategorier och hitta exakt vad du söker
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Kategorier */}
        {!isLoading && categories && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shopping/kategori/${category.slug}`}
                className="group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>
                      {category.product_count || 0} produkter
                    </CardDescription>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Ingen data */}
        {!isLoading && categories && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Inga kategorier hittades. Kategorier kommer snart att genereras automatiskt.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
