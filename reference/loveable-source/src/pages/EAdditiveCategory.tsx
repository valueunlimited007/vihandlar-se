import { useParams, Link } from 'react-router-dom';
import { useEAdditivesByCategory } from '@/hooks/useEAdditives';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Layout } from '@/components/Layout';
import { RiskGauge } from '@/components/RiskGauge';
import { EAdditiveCard } from '@/components/EAdditiveCard';
import { EAdditiveLoadingState } from '@/components/EAdditiveLoadingState';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowLeft, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  generateCategoryTitle, 
  generateCategoryDescription 
} from '@/utils/eAdditiveMetaOptimization';
import { createItemListSchema } from '@/utils/schemaMarkup';

export default function EAdditiveCategory() {
  const { category } = useParams<{ category: string }>();
  const { data: additives, isLoading, error } = useEAdditivesByCategory(category || '');

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Kategori hittades inte</h1>
            <p className="text-muted-foreground mt-2">Den begärda kategorin kunde inte laddas.</p>
            <Link to="/e-amnen">
              <Button className="mt-4">Tillbaka till E-ämnen</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const categoryDisplayName = category 
    ? decodeURIComponent(category)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    : '';
  const highRiskCount = additives?.filter(additive => (additive.risk_score || 0) > 6).length || 0;
  const mediumRiskCount = additives?.filter(additive => {
    const risk = additive.risk_score || 0;
    return risk >= 4 && risk <= 6;
  }).length || 0;
  const lowRiskCount = additives?.filter(additive => (additive.risk_score || 0) < 4).length || 0;

  // Create schema markup for the category page
  const itemListSchema = additives ? createItemListSchema({
    name: `${categoryDisplayName} - E-ämnen`,
    description: generateCategoryDescription(categoryDisplayName, additives.length),
    items: additives.slice(0, 10).map(additive => ({
      name: `${additive.e_number} ${additive.name}`,
      url: `https://vihandlar.se/e-amnen/${additive.slug}`,
      description: additive.short_description
    }))
  }) : null;

  return (
    <Layout>
      <SEO 
        title={generateCategoryTitle(categoryDisplayName, additives?.length || 0)}
        description={generateCategoryDescription(categoryDisplayName, additives?.length || 0)}
        keywords={`${categoryDisplayName.toLowerCase()}, e-ämnen, livsmedelstillsatser, säkerhet, hälsoeffekter, biverkningar, risknivå`}
        canonical={`/e-amnen/kategori/${category}`}
        focusKeyword={categoryDisplayName}
        ogType="website"
        schemaData={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${categoryDisplayName} - E-ämnen`,
            "description": generateCategoryDescription(categoryDisplayName, additives?.length || 0),
            "url": `https://vihandlar.se/e-amnen/kategori/${category}`,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": additives?.length || 0
            }
          },
          ...(itemListSchema ? [itemListSchema] : [])
        ]}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs 
          items={[
            { name: 'Hem', url: '/' },
            { name: 'E-ämnen', url: '/e-amnen' },
            { name: categoryDisplayName, current: true }
          ]}
          variant="enhanced"
          className="mb-6"
        />

        {/* Back button */}
        <Link to="/e-amnen">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka till E-ämnen
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{categoryDisplayName}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alla E-ämnen inom kategorin {categoryDisplayName.toLowerCase()}. 
            {highRiskCount > 0 && (
              <span className="text-destructive font-medium ml-1">
                {highRiskCount} av dessa har hög risk (7-10).
              </span>
            )}
          </p>
        </div>

        {/* Statistics */}
        {!isLoading && additives && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{additives.length}</div>
                <p className="text-xs text-muted-foreground">E-ämnen totalt</p>
                <TrendingUp className="w-6 h-6 mx-auto mt-2 text-primary/60" />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-destructive">{highRiskCount}</div>
                <p className="text-xs text-muted-foreground">Hög risk (7-10)</p>
                <AlertTriangle className="w-6 h-6 mx-auto mt-2 text-destructive/60" />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-warning">{mediumRiskCount}</div>
                <p className="text-xs text-muted-foreground">Måttlig risk (4-6)</p>
                <AlertTriangle className="w-6 h-6 mx-auto mt-2 text-warning/60" />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-success">{lowRiskCount}</div>
                <p className="text-xs text-muted-foreground">Låg risk (1-3)</p>
                <Shield className="w-6 h-6 mx-auto mt-2 text-success/60" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Hero Ads */}
        <AffiliateAdsSection variant="hero" className="mb-8" />

        {/* E-additives grid */}
        {isLoading ? (
          <EAdditiveLoadingState variant="cards" count={9} message="Laddar E-ämnen..." />
        ) : additives && additives.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {additives.map((additive) => (
                <EAdditiveCard
                  key={additive.id}
                  additive={additive}
                  variant="detailed"
                  showFavorite={true}
                />
              ))}
            </div>

            {/* Inline Ad */}
            <AffiliateAdsSection variant="inline" className="my-8" />

            {/* Footer Ad */}
            <AffiliateAdsSection variant="footer" />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Inga E-ämnen hittades</h3>
            <p className="text-muted-foreground">
              Det finns inga E-ämnen i kategorin "{categoryDisplayName}".
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
}
