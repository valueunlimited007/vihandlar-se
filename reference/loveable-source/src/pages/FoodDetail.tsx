import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'react-router-dom';
import { useFoodBySlug } from '@/hooks/useFoods';
import { 
  createBreadcrumbSchema, 
  createFoodSchema,
  createFAQSchema,
  createWebPageSchema,
  createEducationalSchema
} from '@/utils/schemaMarkup';
import { AIOptimizedFoodFactBox } from '@/components/AIOptimizedFoodFactBox';
import { ShoppingCTA } from '@/components/ShoppingCTA';
import { Star, Award, Info, HelpCircle, BarChart3, Thermometer, Clock, Snowflake } from 'lucide-react';

const FoodDetail = () => {
  const { foodSlug } = useParams<{ foodSlug: string }>();
  const { data: food, isLoading } = useFoodBySlug(foodSlug || '');

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Livsmedel A-Ö', url: '/livsmedel' },
    { name: food?.letter || '', url: `/livsmedel/${food?.letter?.toLowerCase()}` },
    { name: food?.name || '', url: `/livsmedel/produkt/${foodSlug}` }
  ];

  // Enhanced FAQ data specific to this food item
  const foodFAQData = food ? [
    {
      question: `Hur många kalorier har ${food.name}?`,
      answer: `${food.name} innehåller ${food.calories || 'information saknas'} kalorier per 100 gram.`
    },
    {
      question: `Hur ska jag förvara ${food.name}?`,
      answer: `${food.name} ska förvaras ${food.storage_method || 'enligt förpackningens anvisningar'}.`
    },
    {
      question: `Kan jag frysa ${food.name}?`,
      answer: food.can_freeze ? `Ja, ${food.name} kan frysas.` : `Nej, ${food.name} rekommenderas inte att frysas.`
    },
    {
      question: `Vilka näringsvärden har ${food.name}?`,
      answer: `Per 100g innehåller ${food.name}: ${food.protein ? `${food.protein}g protein, ` : ''}${food.fat ? `${food.fat}g fett, ` : ''}${food.carbohydrates ? `${food.carbohydrates}g kolhydrater` : 'näringsuppgifter varierar'}.`
    }
  ].filter(faq => faq.answer.includes('information saknas') === false) : [];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);
  const foodSchema = food ? createFoodSchema(food) : null;
  const faqSchema = food && foodFAQData.length > 0 ? createFAQSchema(foodFAQData) : null;
  
  const webPageSchema = food ? createWebPageSchema({
    name: `${food.name} - Näringsvärde och information`,
    description: food.short_description || `Detaljerad information om ${food.name}`,
    url: `https://vihandlar.se/livsmedel/produkt/${food.slug}`,
    breadcrumbs: breadcrumbItems,
    speakable: {
      cssSelector: ["h1", ".nutrition-facts", ".storage-info"]
    }
  }) : null;

  const educationalSchema = food ? createEducationalSchema({
    name: `${food.name} - Näringsguide`,
    description: `Lär dig allt om ${food.name} - näringsvärden, förvaring och användning`,
    url: `https://vihandlar.se/livsmedel/produkt/${food.slug}`,
    educationalLevel: "Allmänheten",
    learningResourceType: "Reference",
    author: "ViHandlar",
    keywords: [food.name, "näringsvärde", "förvaring", food.subcategory || "livsmedel"]
  }) : null;

  // Create rating based on nutritional value (simplified example)
  const nutritionRating = food ? Math.min(5, Math.max(1, 
    (food.protein || 0) * 0.1 + 
    (food.fiber || 0) * 0.2 + 
    (food.calories ? (food.calories < 200 ? 1 : 0) : 0) + 2
  )) : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!food) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Livsmedel hittades inte</h1>
          <p className="text-muted-foreground mb-8">Det livsmedel du söker efter finns inte i vår databas.</p>
          <Link to="/livsmedel" className="text-primary hover:underline">
            ← Tillbaka till alla livsmedel
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AIOptimizedFoodFactBox food={food} />
      <Helmet>
        <title>{food.meta_title || `${food.name} - Näringsvärde och information 2024 | ViHandlar`}</title>
        <meta name="description" content={food.meta_description || `✅ Komplett guide till ${food.name}: näringsvärden, kalorier, förvaring, hållbarhet och användningstips. Uppdaterad ${new Date().getFullYear()}.`} />
        <meta name="keywords" content={`${food.name} näringsvärde, ${food.name} kalorier, ${food.name} förvaring, ${food.subcategory}, ${food.name} hållbarhet, ${food.name} protein fett kolhydrater`} />
        <link rel="canonical" href={`https://vihandlar.se/livsmedel/produkt/${food.slug}`} />
        
        {/* Enhanced meta tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="ViHandlar - Livsmedelsexperter" />
        <meta name="subject" content={`${food.name} näringsinformation`} />
        <meta name="language" content="sv-SE" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content={`🥗 ${food.name} - Näringsvärden & Tips`} />
        <meta property="og:description" content={`Detaljerad information om ${food.name}: ${food.calories ? `${food.calories} kcal/100g, ` : ''}näringsvärden, förvaring och användning.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://vihandlar.se/livsmedel/produkt/${food.slug}`} />
        <meta property="og:locale" content="sv_SE" />
        <meta property="article:section" content="Livsmedel" />
        <meta property="article:tag" content={`${food.name}, näringsvärde, ${food.subcategory}`} />
        
        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${food.name} - Näringsvärden`} />
        <meta name="twitter:description" content={food.short_description} />
        <meta name="twitter:creator" content="@vihandlar" />

        {/* Schema markup */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {foodSchema && <script type="application/ld+json">{JSON.stringify(foodSchema)}</script>}
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {webPageSchema && <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>}
        {educationalSchema && <script type="application/ld+json">{JSON.stringify(educationalSchema)}</script>}
        
        {/* Nutritional rating schema */}
        {nutritionRating && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Food",
                "name": food.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": nutritionRating,
                "bestRating": 5,
                "worstRating": 1
              },
              "name": `Näringsbetyg för ${food.name}`,
              "reviewBody": `Näringsbetyg baserat på protein, fiber och kaloriinnehåll.`,
              "author": {
                "@type": "Organization",
                "name": "ViHandlar"
              }
            })}
          </script>
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/livsmedel" className="hover:text-foreground">Livsmedel A-Ö</Link>
          <span className="mx-2">›</span>
          <Link to={`/livsmedel/${food.letter?.toLowerCase()}`} className="hover:text-foreground">{food.letter}</Link>
          <span className="mx-2">›</span>
          <span>{food.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{food.name}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            {food.short_description}
          </p>
          
          {/* Badges for key properties */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="secondary">
              <Star className="h-4 w-4 mr-1" />
              {food.subcategory}
            </Badge>
            {food.calories && (
              <Badge variant="outline">
                <BarChart3 className="h-4 w-4 mr-1" />
                {food.calories} kcal/100g
              </Badge>
            )}
            {food.can_freeze && (
              <Badge variant="outline">
                <Snowflake className="h-4 w-4 mr-1" />
                Frysbar
              </Badge>
            )}
            {nutritionRating && (
              <Badge variant="outline">
                <Award className="h-4 w-4 mr-1" />
                Näringsbetyg: {nutritionRating.toFixed(1)}/5
              </Badge>
            )}
          </div>
          
          {food.updated_at && (
            <p className="text-sm text-muted-foreground">
              Senast uppdaterad: {new Date(food.updated_at).toLocaleDateString('sv-SE')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Snabbfakta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Kategori</div>
                    <div>{food.subcategory}</div>
                  </div>
                  {food.storage_method && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Förvaring</div>
                      <div>{food.storage_method}</div>
                    </div>
                  )}
                  {food.shelf_life_unopened && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Hållbarhet (oöppnad)</div>
                      <div>{food.shelf_life_unopened}</div>
                    </div>
                  )}
                  {food.can_freeze && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Frysbarhet</div>
                      <div>Kan frysas</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shopping CTA */}
            <ShoppingCTA foodName={food.name} />

            {/* Nutrition */}
            {food.calories && (
              <Card>
                <CardHeader>
                  <CardTitle className="nutrition-facts">Näringsvärde per 100g</CardTitle>
                  <CardDescription>Detaljerade näringsvärden och makronutrienter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{food.calories}</div>
                      <div className="text-sm text-muted-foreground">kcal</div>
                    </div>
                    {food.protein && (
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{food.protein}g</div>
                        <div className="text-sm text-muted-foreground">Protein</div>
                      </div>
                    )}
                    {food.fat && (
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{food.fat}g</div>
                        <div className="text-sm text-muted-foreground">Fett</div>
                      </div>
                    )}
                    {food.carbohydrates && (
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{food.carbohydrates}g</div>
                        <div className="text-sm text-muted-foreground">Kolhydrater</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Additional nutrition facts */}
                  {(food.fiber || food.salt) && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Ytterligare näringsvärden:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {food.fiber && (
                          <div>
                            <span className="font-medium">Fiber:</span> {food.fiber}g
                          </div>
                        )}
                        {food.salt && (
                          <div>
                            <span className="font-medium">Salt:</span> {food.salt}g
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Usage Tips */}
            {food.usage_tips && food.usage_tips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Användning & tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {food.usage_tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {tip}
                      </li>
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
                  <CardDescription>Omfattande beskrivning och bakgrundsinformation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {food.long_description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* FAQ Section for this food */}
            {foodFAQData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Vanliga frågor om {food.name}
                  </CardTitle>
                  <CardDescription>Svar på de mest frekventa frågorna</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {foodFAQData.map((faq, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <h4 className="font-medium mb-2 flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="text-sm text-muted-foreground pl-6">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Storage and Handling Facts */}
            {(food.storage_method || food.shelf_life_unopened || food.can_freeze) && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-green-800 dark:text-green-200 storage-info">
                  <Info className="h-5 w-5" />
                  Förvaring och hantering
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700 dark:text-green-300">
                  {food.storage_method && (
                    <div className="flex items-start gap-2">
                      <Thermometer className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Förvaring:</div>
                        <div>{food.storage_method}</div>
                      </div>
                    </div>
                  )}
                  {food.shelf_life_unopened && (
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Hållbarhet:</div>
                        <div>{food.shelf_life_unopened}</div>
                      </div>
                    </div>
                  )}
                  {food.can_freeze !== undefined && (
                    <div className="flex items-start gap-2">
                      <Snowflake className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Frysning:</div>
                        <div>{food.can_freeze ? 'Ja, kan frysas' : 'Ej rekommenderat'}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add to List CTA */}
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Lägg till i inköpslista</CardTitle>
                <CardDescription>
                  Spara {food.name} i din delade inköpslista
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => console.log('Add to list')}>
                  + Lägg till i lista
                </Button>
              </CardContent>
            </Card>

            {/* Main Service CTA */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Planera dina inköp smartare</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Skapa delade inköpslistor med familj och vänner
                </p>
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Skapa inköpslista →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FoodDetail;