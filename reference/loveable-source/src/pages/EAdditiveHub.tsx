import { useState, useEffect } from 'react';
import { useEAdditives, useEAdditiveCategories } from '@/hooks/useEAdditives';
import { SEO } from '@/components/SEO';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/RiskGauge';
import { EAdditiveSearch } from '@/components/EAdditiveSearch';
import { EAdditiveCard } from '@/components/EAdditiveCard';
import { EAdditiveLoadingState } from '@/components/EAdditiveLoadingState';
import { CompleteEAdditivesButton } from '@/components/CompleteEAdditivesButton';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';
import { Link } from 'react-router-dom';
import { Camera, Search, BookOpen, List, Zap, BarChart3, AlertTriangle, Shield, Calculator, TrendingUp, Users } from 'lucide-react';


export const EAdditiveHub = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { data: additives, isLoading: additivesLoading } = useEAdditives();
  const { data: categories, isLoading: categoriesLoading } = useEAdditiveCategories();

  // Handle scroll to kategorier section with proper offset
  useEffect(() => {
    if (window.location.hash === '#kategorier') {
      setTimeout(() => {
        const element = document.getElementById('kategorier');
        if (element) {
          const offset = 120; // Account for header + extra space
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, []);

  const highRiskAdditives = additives?.filter(a => (a.risk_score || 0) >= 7) || [];
  const featuredAdditives = additives?.slice(0, 6) || [];
  const totalAdditives = additives?.length || 0;
  const lowRiskCount = additives?.filter(a => (a.risk_score || 0) <= 3).length || 0;

  return (
    <ErrorBoundary>
      <Layout>
        <SEO 
          title="E-ämnen A-Ö - Komplett guide till tillsatser | ViHandlar"
          description="Upptäck säkerheten hos E-ämnen. Interaktiva verktyg för ADI-beräkning, riskmätning och longevity-analys. Få koll på vad du äter."
          keywords="e-ämnen, livsmedelstillsatser, konserveringsmedel, färgämnen, sötningsmedel, emulgeringsmedel, stabiliseringsmedel, ADI-kalkylator, riskmätning"
          canonical="/e-amnen"
          schemaData={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ViHandlar",
              "url": "https://vihandlar.se",
              "logo": "https://vihandlar.se/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png"
            },
            {
              "@context": "https://schema.org", 
              "@type": "WebPage",
              "name": "E-ämnen A-Ö - Komplett guide",
              "description": "Upptäck säkerheten hos E-ämnen. Interaktiva verktyg för ADI-beräkning, riskmätning och longevity-analys.",
              "url": "https://vihandlar.se/e-amnen",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {"@type": "ListItem", "position": 1, "name": "Hem", "item": "https://vihandlar.se"},
                  {"@type": "ListItem", "position": 2, "name": "E-ämnen A-Ö", "item": "https://vihandlar.se/e-amnen"}
                ]
              }
            }
          ]}
        />

        <div className="container py-8 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                E-ämnen A-Ö
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Din kompletta guide till E-ämnen och tillsatser. Få koll på säkerhet, hälsoeffekter och var de finns.
              </p>
            </div>
            
            {/* Statistics Cards */}
            {!additivesLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary">{totalAdditives}</div>
                    <p className="text-sm text-muted-foreground">E-ämnen totalt</p>
                    <BookOpen className="w-8 h-8 mx-auto mt-2 text-primary/60" />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-destructive">{highRiskAdditives.length}</div>
                    <p className="text-sm text-muted-foreground">Högrisk E-ämnen</p>
                    <AlertTriangle className="w-8 h-8 mx-auto mt-2 text-destructive/60" />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-success">{lowRiskCount}</div>
                    <p className="text-sm text-muted-foreground">Lågrisk E-ämnen</p>
                    <Shield className="w-8 h-8 mx-auto mt-2 text-success/60" />
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Complete E-additives Button */}
            {totalAdditives < 350 && (
              <div className="max-w-md mx-auto">
                <CompleteEAdditivesButton />
              </div>
            )}
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Link to="/e-amnen/scanner" className="group">
                <Card className="border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Scanner</h3>
                    <p className="text-muted-foreground">Skanna ingredienslistor och få direktanalys av E-ämnen</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="group border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Riskmätning</h3>
                  <p className="text-muted-foreground">Vetenskapligt baserade riskbedömningar för alla E-ämnen</p>
                </CardContent>
              </Card>
              <Card className="group border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">ADI-kalkylator</h3>
                  <p className="text-muted-foreground">Beräkna säkert dagligt intag baserat på din kroppsvikt</p>
                </CardContent>
              </Card>
              <Link to="/e-amnen/guide" className="group">
                <Card className="border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Komplett guide</h3>
                    <p className="text-muted-foreground">Lär dig allt om E-ämnen, säkerhet och hälsoeffekter</p>
                  </CardContent>
            </Card>
          </Link>

        </div>
          </div>

          {/* Hero Ads */}
          <AffiliateAdsSection variant="hero" className="my-8" />

          {/* Search Section */}
          <EAdditiveSearch onSearchToggle={setIsSearchActive} />

          {/* Content sections - hide when search is active */}
          {!isSearchActive && (
            <>
              {/* High Risk Alert */}
              {!additivesLoading && highRiskAdditives.length > 0 && (
                <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 via-background to-background">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-destructive">
                      <AlertTriangle className="w-6 h-6 animate-pulse" />
                      Högrisk E-ämnen att undvika
                      <Badge variant="destructive" className="ml-auto">
                        {highRiskAdditives.length} st
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-destructive/80">
                      Dessa E-ämnen har högst risk för hälsoproblem enligt vetenskaplig forskning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {highRiskAdditives.slice(0, 3).map((additive) => (
                        <Link
                          key={additive.id}
                          to={`/e-amnen/${additive.slug}`}
                          className="block group"
                        >
                          <div className="p-4 border border-destructive/20 rounded-lg hover:border-destructive/40 transition-all duration-200 bg-background/50 hover:bg-destructive/5 hover:shadow-md">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-destructive group-hover:text-destructive/80">
                                  {additive.e_number}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {additive.name}
                                </p>
                              </div>
                              <RiskGauge score={additive.risk_score || 0} size="sm" showLabel={false} />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {additive.short_description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {highRiskAdditives.length > 3 && (
                      <div className="text-center pt-4 border-t border-destructive/20">
                        <Link 
                          to="/e-amnen/alla?risk=high"
                          className="text-destructive hover:text-destructive/80 font-medium inline-flex items-center gap-2"
                        >
                          Se alla {highRiskAdditives.length} högrisk E-ämnen
                          <TrendingUp className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">Bläddra E-ämnen A-Ö</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Utforska E-ämnen sorterat efter nummerserie eller kategori
                  </p>
                </div>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      E-nummer serier
                    </CardTitle>
                    <CardDescription>Välj en nummerserie för att se alla E-ämnen i den serien</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((letter) => (
                        <Link
                          key={letter}
                          to={`/e-amnen/nummer/${letter}`}
                          className="group"
                        >
                          <div className="flex flex-col items-center justify-center h-20 border-2 border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:scale-105 hover:shadow-md">
                            <span className="font-bold text-lg group-hover:text-primary">E{letter}XX</span>
                            <span className="text-xs text-muted-foreground">Serie</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link 
                        to="/e-amnen/alla"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold hover:underline"
                      >
                        Se alla E-ämnen A-Ö 
                        <BookOpen className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Categories */}
              <div id="kategorier" className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">Kategorier</h2>
                  <p className="text-muted-foreground">Utforska E-ämnen efter användningsområde</p>
                </div>
                
                {categoriesLoading ? (
                  <EAdditiveLoadingState variant="cards" count={8} message="Laddar kategorier..." />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories?.map((category) => (
                       <Link
                        key={category}
                        to={`/e-amnen/kategori/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-').replace(/,/g, ''))}`}
                        className="group block"
                      >
                        <Card className="h-full hover:border-primary/40 hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-background to-muted/20">
                          <CardContent className="p-6 text-center space-y-3">
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {category}
                            </h3>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured E-Additives */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">Mest sökta E-ämnen</h2>
                    <p className="text-muted-foreground">Upptäck de E-ämnen som flest människor söker information om</p>
                  </div>
                  <Link 
                    to="/e-amnen/alla"
                    className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2 hover:underline"
                  >
                    Se alla
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </div>
                
                {additivesLoading ? (
                  <EAdditiveLoadingState variant="cards" count={6} message="Laddar E-ämnen..." />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredAdditives.map((additive) => (
                      <EAdditiveCard
                        key={additive.id}
                        additive={additive}
                        variant="detailed"
                        showFavorite={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Inline Ad */}
              <AffiliateAdsSection variant="inline" className="my-8" />

              {/* Footer Ad */}
              <AffiliateAdsSection variant="footer" />
            </>
          )}
        </div>
      </Layout>
    </ErrorBoundary>
  );
};