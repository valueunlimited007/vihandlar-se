import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import { useEAdditivesByLetter } from '@/hooks/useEAdditives';
import { RiskGauge } from '@/components/RiskGauge';
import { Badge } from '@/components/ui/badge';
import { createBreadcrumbSchema, createItemListSchema } from '@/utils/schemaMarkup';
import { AlertTriangle } from 'lucide-react';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';

const EAdditiveLetter = () => {
  const { letter } = useParams<{ letter: string }>();
  const { data: additives = [], isLoading } = useEAdditivesByLetter(letter || '');

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'E-ämnen', url: '/e-amnen' },
    { name: 'E-ämnen A-Ö', url: '/e-amnen/alla' },
    { name: `E${letter}XX-serien`, url: `/e-amnen/nummer/${letter}` }
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);
  const itemListSchema = createItemListSchema({
    name: `E-ämnen i E${letter}XX-serien`,
    description: `Alla E-ämnen som börjar med E${letter} med risknivåer och hälsoinformation`,
    items: additives.map(additive => ({
      name: `${additive.e_number} - ${additive.name}`,
      url: `https://vihandlar.se/e-amnen/${additive.slug}`,
      description: additive.short_description || ''
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
                <div key={i} className="h-40 bg-muted rounded"></div>
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
        <title>{`E${letter}XX-serien - E-ämnen Guide | ViHandlar`}</title>
        <meta name="description" content={`Upptäck alla E-ämnen i E${letter}XX-serien. Komplett information om risknivåer, ADI-värden och hälsoeffekter för varje livsmedelstillsats.`} />
        <meta name="keywords" content={`e${letter}xx, e-ämnen serie ${letter}, livsmedelstillsatser, risknivå, adi-värden, säkerhet`} />
        <link rel="canonical" href={`https://vihandlar.se/e-amnen/nummer/${letter}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization", 
          "name": "ViHandlar",
          "url": "https://vihandlar.se"
        })}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
          <span className="mx-2">›</span>
          <Link to="/e-amnen/alla" className="hover:text-foreground">E-ämnen A-Ö</Link>
          <span className="mx-2">›</span>
          <span>E{letter}XX-serien</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">E{letter}XX-serien</h1>
          <p className="text-muted-foreground">
            {additives.length > 0 ? `${additives.length} E-ämnen` : 'Inga E-ämnen'} som börjar med E{letter}
          </p>
        </div>

        {/* Hero Ads */}
        <AffiliateAdsSection variant="hero" className="mb-8" />

        {/* E-additives Grid */}
        {additives.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additives.map((additive) => (
                <Card key={additive.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          <Link 
                            to={`/e-amnen/${additive.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {additive.e_number}
                          </Link>
                        </CardTitle>
                        <CardDescription>{additive.name}</CardDescription>
                        {additive.common_name && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {additive.common_name}
                          </p>
                        )}
                      </div>
                      {additive.risk_score && (
                        <RiskGauge score={additive.risk_score} size="sm" showLabel={false} />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {additive.risk_score && additive.risk_score > 6 && (
                      <div className="flex items-center space-x-2 mb-3 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Hög risk</span>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {additive.short_description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">
                        {additive.category}
                      </Badge>
                      {additive.origin && (
                        <Badge variant="outline">
                          {additive.origin}
                        </Badge>
                      )}
                      {additive.longevity_impact && (
                        <Badge 
                          variant={
                            additive.longevity_impact === 'Negativ' 
                              ? 'destructive' 
                              : additive.longevity_impact === 'Positiv' 
                              ? 'default' 
                              : 'secondary'
                          }
                        >
                          {additive.longevity_impact}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/e-amnen/${additive.slug}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Läs mer →
                      </Link>
                      {additive.risk_score && (
                        <span className="text-xs text-muted-foreground">
                          Risk: {additive.risk_score}/10
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Inline Ad */}
            <AffiliateAdsSection variant="inline" className="my-8" />

            {/* Footer Ad */}
            <AffiliateAdsSection variant="footer" className="mt-4" />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Inga E-ämnen hittades för E{letter}XX-serien. Vi arbetar ständigt med att lägga till fler E-ämnen.
              </p>
              <Link to="/e-amnen/alla" className="text-primary hover:underline mt-4 inline-block">
                ← Tillbaka till alla E-ämnen
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Back to hub */}
        <div className="mt-8 text-center">
          <Link to="/e-amnen/alla" className="text-primary hover:underline">
            ← Se alla E-nummer
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EAdditiveLetter;
