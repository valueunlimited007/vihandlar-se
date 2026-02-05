import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { useFoodBySlug } from '@/hooks/useFoods';
import { LongevityNutritionChart } from '@/components/LongevityNutritionChart';
import { LongevitySynergies } from '@/components/LongevitySynergies';
import { createBreadcrumbSchema, createFoodSchema } from '@/utils/schemaMarkup';
import { ShoppingCTA } from '@/components/ShoppingCTA';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';

const FoodDetailSimple = () => {
  const { letter, foodSlug } = useParams<{ letter: string; foodSlug: string }>();
  const { data: food, isLoading } = useFoodBySlug(foodSlug || '');

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Livsmedel A-Ö', url: '/livsmedel' },
    { name: food?.letter || '', url: `/livsmedel/${food?.letter?.toLowerCase()}` },
    { name: food?.name || '', url: `/livsmedel/${food?.letter?.toLowerCase()}/${foodSlug}` }
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);
  const foodSchema = food ? createFoodSchema(food) : null;

  return (
    <Layout>
      <Helmet>
        <title>{food ? `${food.name} - Näringsvärde och information | ViHandlar` : `${foodSlug} | ViHandlar`}</title>
        <meta name="description" content={food?.meta_description || `Komplett information om ${food?.name || foodSlug} - näringsvärden, förvaring, användning och hållbarhet.`} />
        <link rel="canonical" href={`https://vihandlar.se/livsmedel/${food?.letter?.toLowerCase()}/${foodSlug}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {foodSchema && <script type="application/ld+json">{JSON.stringify(foodSchema)}</script>}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/livsmedel" className="hover:text-foreground">Livsmedel A-Ö</Link>
          <span className="mx-2">›</span>
          {food && (
            <>
              <Link to={`/livsmedel/${food.letter.toLowerCase()}`} className="hover:text-foreground">
                Livsmedel på {food.letter}
              </Link>
              <span className="mx-2">›</span>
            </>
          )}
          <span>{food?.name || foodSlug}</span>
        </nav>

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Laddar livsmedelsinformation...</p>
            </CardContent>
          </Card>
        ) : food ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{food.name}</h1>
              {food.short_description && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {food.short_description}
                </p>
              )}
              {food.updated_at && (
                <p className="text-sm text-muted-foreground mt-4">
                  Senast uppdaterad: {new Date(food.updated_at).toLocaleDateString('sv-SE')}
                </p>
              )}
            </div>

            {/* Main content area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Näringsvärden */}
                <Card>
                  <CardHeader>
                    <CardTitle>Näringsvärden per 100g</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {food.calories && (
                        <div>
                          <span className="font-semibold">Energi:</span>
                          <p>{food.calories} kcal</p>
                        </div>
                      )}
                      {food.protein && (
                        <div>
                          <span className="font-semibold">Protein:</span>
                          <p>{food.protein} g</p>
                        </div>
                      )}
                      {food.fat && (
                        <div>
                          <span className="font-semibold">Fett:</span>
                          <p>{food.fat} g</p>
                        </div>
                      )}
                      {food.carbohydrates && (
                        <div>
                          <span className="font-semibold">Kolhydrater:</span>
                          <p>{food.carbohydrates} g</p>
                        </div>
                      )}
                      {food.fiber && (
                        <div>
                          <span className="font-semibold">Fiber:</span>
                          <p>{food.fiber} g</p>
                        </div>
                      )}
                      {food.salt && (
                        <div>
                          <span className="font-semibold">Salt:</span>
                          <p>{food.salt} g</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Förvaring */}
                {food.storage_method && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Förvaring & Hållbarhet</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><span className="font-semibold">Förvaring:</span> {food.storage_method}</p>
                        {food.shelf_life_unopened && (
                          <p><span className="font-semibold">Hållbarhet oöppnad:</span> {food.shelf_life_unopened}</p>
                        )}
                        {food.shelf_life_opened && (
                          <p><span className="font-semibold">Hållbarhet öppnad:</span> {food.shelf_life_opened}</p>
                        )}
                        {food.can_freeze && (
                          <p><span className="font-semibold">Frysning:</span> {food.freezing_tips || 'Kan frysas'}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Longevity Nutrition Chart */}
                <LongevityNutritionChart food={food} />
                
                {/* Longevity Synergies */}
                <LongevitySynergies food={food} />

                {/* Usage Tips */}
                {food.usage_tips && food.usage_tips.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Användningstips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1">
                        {food.usage_tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Detailed Description */}
                {food.long_description && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Detaljerad information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {food.long_description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* FAQ */}
                {food.faq && food.faq.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Vanliga frågor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {food.faq.map((item, index) => (
                          <div key={index}>
                            <h4 className="font-semibold mb-1">{item.question}</h4>
                            <p className="text-muted-foreground text-sm">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Add to list CTA */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lägg till i lista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Lägg till {food.name} i din inköpslista
                    </p>
                    <Button disabled className="w-full">
                      Lägg till i lista
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Funktionen kommer snart
                    </p>
                  </CardContent>
                </Card>

                {/* Shopping list CTA */}
                <Card>
                  <CardHeader>
                    <CardTitle>Planera ditt inköp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Skapa en smart inköpslista med {food.name} och andra varor
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/">
                        Skapa inköpslista
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Sidebar Ads */}
                <AffiliateAdsSection variant="sidebar" />
              </div>
            </div>

            {/* Shopping CTA */}
            <div className="mt-8">
              <ShoppingCTA 
                foodName={food.name}
                searchQuery={food.name}
              />
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Livsmedlet "{foodSlug}" hittades inte.
              </p>
              <Link to="/livsmedel" className="text-primary hover:underline">
                ← Tillbaka till Livsmedel A-Ö
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default FoodDetailSimple;
