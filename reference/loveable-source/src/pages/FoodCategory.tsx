import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import { useFoodsByCategory, useFoodCategory } from '@/hooks/useFoods';
import { createBreadcrumbSchema } from '@/utils/schemaMarkup';

const FoodCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { data: category } = useFoodCategory(categorySlug || '');
  const { data: foods = [], isLoading } = useFoodsByCategory(categorySlug || '');

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Livsmedel A-Ö', url: '/livsmedel' },
    { name: category?.name || '', url: `/livsmedel/kategori/${categorySlug}` }
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${category?.name || 'Kategori'} - Livsmedel och näringsvärden | ViHandlar`}</title>
        <meta name="description" content={category?.description || `Utforska alla livsmedel inom kategorin ${category?.name}. Komplett information om näringsvärden, förvaring och användning.`} />
        <link rel="canonical" href={`https://vihandlar.se/livsmedel/kategori/${categorySlug}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/livsmedel" className="hover:text-foreground">Livsmedel A-Ö</Link>
          <span className="mx-2">›</span>
          <span>{category?.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
          <p className="text-muted-foreground">
            {category?.description}
          </p>
        </div>

        {/* Foods Grid */}
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <Card key={food.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <Link 
                      to={`/livsmedel/produkt/${food.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {food.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{food.subcategory}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {food.short_description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/livsmedel/produkt/${food.slug}`}
                      className="text-primary hover:underline text-sm"
                    >
                      Läs mer →
                    </Link>
                    <button className="text-xs px-3 py-1 bg-muted rounded hover:bg-muted/80 transition-colors">
                      + Lista
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Inga livsmedel hittades i denna kategori än.
              </p>
              <Link to="/livsmedel" className="text-primary hover:underline mt-4 inline-block">
                ← Tillbaka till alla livsmedel
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default FoodCategory;