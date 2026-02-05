import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import { useFoodsByLetter } from '@/hooks/useFoods';
import { createBreadcrumbSchema, createItemListSchema } from '@/utils/schemaMarkup';
import { ShoppingCTA } from '@/components/ShoppingCTA';

const FoodLetter = () => {
  const { letter } = useParams<{ letter: string }>();
  const upperLetter = letter?.toUpperCase() || '';
  const { data: foods = [], isLoading } = useFoodsByLetter(upperLetter);

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Livsmedel A-Ö', url: '/livsmedel' },
    { name: `Livsmedel på ${upperLetter}`, url: `/livsmedel/${letter}` }
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);
  const itemListSchema = createItemListSchema({
    name: `Livsmedel som börjar på ${upperLetter}`,
    description: `Alla livsmedel som börjar på bokstaven ${upperLetter} med näringsvärden och användningstips`,
    items: foods.map(food => ({
      name: food.name,
      url: `https://vihandlar.se/livsmedel/produkt/${food.slug}`,
      description: food.short_description || ''
    }))
  });

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
        <title>{`Livsmedel som börjar på ${upperLetter} - Näringsvärden och tips | ViHandlar`}</title>
        <meta name="description" content={`Upptäck alla livsmedel som börjar på ${upperLetter}. Komplett information om näringsvärden, förvaring och användning för varje livsmedel.`} />
        <link rel="canonical" href={`https://vihandlar.se/livsmedel/${letter}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/livsmedel" className="hover:text-foreground">Livsmedel A-Ö</Link>
          <span className="mx-2">›</span>
          <span>Livsmedel på {upperLetter}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Livsmedel som börjar på {upperLetter}</h1>
          <p className="text-muted-foreground">
            {foods.length > 0 ? `${foods.length} livsmedel` : 'Inga livsmedel'} som börjar på bokstaven {upperLetter}
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
                Inga livsmedel hittades för bokstaven {upperLetter}. Vi arbetar ständigt med att lägga till fler livsmedel.
              </p>
              <Link to="/livsmedel" className="text-primary hover:underline mt-4 inline-block">
                ← Tillbaka till alla livsmedel
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Shopping CTA */}
        {foods.length > 0 && (
          <div className="mt-8">
            <ShoppingCTA 
              foodName={`livsmedel som börjar på ${upperLetter}`}
              searchQuery={upperLetter}
            />
          </div>
        )}

        {/* Back to hub */}
        <div className="mt-8 text-center">
          <Link to="/livsmedel" className="text-primary hover:underline">
            ← Se alla bokstäver
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default FoodLetter;