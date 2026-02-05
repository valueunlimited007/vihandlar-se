import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import { useFoodsByLetter } from '@/hooks/useFoods';
import { ShoppingCTA } from '@/components/ShoppingCTA';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';

const FoodLetterSimple = () => {
  const { letter } = useParams<{ letter: string }>();
  const upperLetter = letter?.toUpperCase() || '';
  const { data: foods, isLoading } = useFoodsByLetter(upperLetter);

  return (
    <Layout>
      <Helmet>
        <title>{`Livsmedel som börjar på ${upperLetter} - Näringsvärden och tips | ViHandlar`}</title>
        <meta name="description" content={`Upptäck alla livsmedel som börjar på ${upperLetter}. Komplett information om näringsvärden, förvaring och användning för varje livsmedel.`} />
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
            {foods?.length ? `${foods.length} livsmedel som börjar på ${upperLetter}` : `Inga livsmedel hittades för bokstaven ${upperLetter}`}
          </p>
        </div>

        {/* Hero Ads: Matkomfort + Linas */}
        <AffiliateAdsSection variant="hero" className="mb-8" />

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Laddar livsmedel...</p>
            </CardContent>
          </Card>
        ) : foods && foods.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Card key={food.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>
                      <Link 
                        to={`/livsmedel/${letter?.toLowerCase()}/${food.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {food.name}
                      </Link>
                    </CardTitle>
                    {food.subcategory && (
                      <CardDescription>{food.subcategory}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {food.short_description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {food.short_description}
                      </p>
                    )}
                    <Link
                      to={`/livsmedel/${letter?.toLowerCase()}/${food.slug}`}
                      className="text-primary hover:underline text-sm inline-flex items-center"
                    >
                      Läs mer →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Inline Ad: Hemköp */}
            <AffiliateAdsSection variant="inline" className="my-8" />

            {/* Shopping CTA */}
            <div className="mt-8">
              <ShoppingCTA 
                foodName={`livsmedel som börjar på ${upperLetter}`}
                searchQuery={upperLetter}
              />
            </div>

            {/* Footer Ad: Factor */}
            <AffiliateAdsSection variant="footer" className="mt-8" />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Inga livsmedel hittades för bokstaven {upperLetter}.
              </p>
              <Link to="/livsmedel" className="text-primary hover:underline">
                ← Tillbaka till alla bokstäver
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default FoodLetterSimple;
