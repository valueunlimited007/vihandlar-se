import { useParams, Link } from 'react-router-dom';
import { useEAdditiveBySlug } from '@/hooks/useEAdditives';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  createEAdditiveSchema, 
  createEAdditiveArticleSchema, 
  createHealthEffectsFAQSchema,
  createEAdditiveBreadcrumbSchema 
} from '@/utils/eAdditiveSchemaMarkup';
import { 
  generateOptimizedTitle, 
  generateOptimizedDescription, 
  generateFocusKeywords 
} from '@/utils/eAdditiveMetaOptimization';
import { Layout } from '@/components/Layout';
import { RiskGauge } from '@/components/RiskGauge';
import { ADICalculator } from '@/components/ADICalculator';
import { ContributeInfoCard } from '@/components/ContributeInfoCard';
import { AIOptimizedFactBox } from '@/components/AIOptimizedFactBox';
import { SulfiteWarningBanner } from '@/components/SulfiteWarningBanner';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Calculator, 
  ShoppingBag, 
  Heart, 
  Shield,
  Lightbulb,
  Leaf,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function EAdditiveDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: additive, isLoading, error } = useEAdditiveBySlug(slug || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-40" />
              <Skeleton className="h-32" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !additive) {
    return (
      <Layout>
        <div className="container py-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-muted-foreground">E-ämne hittades inte</h1>
          <p className="text-muted-foreground">Det E-ämne du söker efter kunde inte hittas.</p>
          <Link to="/e-amnen" className="text-primary hover:text-primary/80">
            ← Tillbaka till E-ämnen
          </Link>
        </div>
      </Layout>
    );
  }

  const healthEffects = additive.health_effects as any || {};
  const commonProducts = additive.common_products as any[] || [];
  
  // Check if this is a sulfite (E220-E228)
  const isSulfite = /^E22[0-8]$/.test(additive.e_number);
  
  // Generate schema markup
  const eAdditiveSchema = createEAdditiveSchema(additive);
  const articleSchema = createEAdditiveArticleSchema(additive);
  const faqSchema = createHealthEffectsFAQSchema(additive);
  const breadcrumbSchema = createEAdditiveBreadcrumbSchema(additive);

  return (
    <Layout>
      <SEO 
        title={additive.meta_title || generateOptimizedTitle(additive)}
        description={additive.meta_description || generateOptimizedDescription(additive)}
        keywords={generateFocusKeywords(additive)}
        canonical={`/e-amnen/${additive.slug}`}
        focusKeyword={additive.e_number}
        ogType="article"
        article={{
          publishedTime: "2024-01-01T00:00:00+01:00",
          modifiedTime: new Date().toISOString(),
          author: "ViHandlar Expertpanel",
          section: "E-ämnen Guide",
          tags: [additive.e_number, additive.name, additive.category, "livsmedelstillsats"]
        }}
        schemaData={[
          eAdditiveSchema,
          articleSchema,
          breadcrumbSchema,
          ...(faqSchema ? [faqSchema] : [])
        ]}
      />

      <main className="container py-8 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumbs 
          items={[
            { name: 'Hem', url: '/' },
            { name: 'E-ämnen', url: '/e-amnen' },
            { name: additive.e_number, current: true }
          ]}
          variant="enhanced"
          className="mb-6"
        />

        {/* Header */}
        <div className="space-y-4">
          <Link 
            to="/e-amnen"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till E-ämnen
          </Link>
          
          {/* Sulfite Warning Banner */}
          {isSulfite && <SulfiteWarningBanner />}
          
          {/* Risk Warning Banner */}
          {(additive.risk_score || 0) >= 7 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                <strong>Hög risk:</strong> {additive.children_note || 'Detta E-ämne kan medföra hälsorisker.'}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Risk Groups Warning - shows even for lower risk_score */}
          {healthEffects.risk_groups && healthEffects.risk_groups.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <strong className="text-orange-700 dark:text-orange-400">
                  Särskilda riskgrupper:
                </strong>
                <ul className="mt-2 ml-4 list-disc text-orange-700 dark:text-orange-400">
                  {healthEffects.risk_groups.map((group: string, i: number) => (
                    <li key={i}>{group}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                {additive.e_number} - {additive.name}
              </h1>
              {additive.common_name && (
                <p className="text-xl text-muted-foreground">
                  {additive.common_name}
                </p>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{additive.category}</Badge>
                {additive.origin && (
                  <Badge variant="outline">{additive.origin}</Badge>
                )}
                {additive.longevity_impact && (
                  <Badge 
                    variant={additive.longevity_impact === 'Positiv' ? 'default' : 'secondary'}
                    className={additive.longevity_impact === 'Negativ' ? 'bg-red-100 text-red-700' : ''}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Longevity: {additive.longevity_impact}
                  </Badge>
                )}
              </div>
            </div>
            <RiskGauge score={additive.risk_score || 0} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Vad är {additive.e_number}?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {additive.short_description}
                </p>
                {additive.long_description && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{additive.long_description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Effects */}
            {(healthEffects.documented?.length || healthEffects.suspected?.length || healthEffects.benefits?.length) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Hälsoeffekter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthEffects.documented?.length > 0 && (
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Dokumenterade biverkningar
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        {healthEffects.documented.map((effect: string, index: number) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {healthEffects.suspected?.length > 0 && (
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Misstänkta effekter
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        {healthEffects.suspected.map((effect: string, index: number) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {healthEffects.benefits?.length > 0 && (
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Potentiella fördelar
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        {healthEffects.benefits.map((benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {healthEffects.risk_groups?.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                        Särskilt riskutsatta grupper
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {healthEffects.risk_groups.map((group: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-yellow-300 text-yellow-700">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Common Products */}
            {commonProducts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Var hittar man {additive.e_number}?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commonProducts.map((product, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold text-lg mb-2">{product.category}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {product.products?.map((productName: string, i: number) => (
                            <Badge key={i} variant="outline">{productName}</Badge>
                          ))}
                        </div>
                        {product.average_amount && (
                          <p className="text-sm text-muted-foreground">
                            Genomsnittlig mängd: <strong>{product.average_amount}</strong>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI-Optimized Fact Box */}
            <AIOptimizedFactBox additive={additive} />

            {/* ADI Information */}
            {additive.adi_value && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="w-5 h-5" />
                    ADI-information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Acceptabelt dagligt intag (ADI)
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {additive.adi_value} mg/kg
                    </p>
                    {additive.adi_source && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Källa: {additive.adi_source}
                      </p>
                    )}
                  </div>
                  
                  {/* Praktiskt exempel */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm mb-2">
                      <strong>Exempel:</strong> För en person på 70 kg:
                    </p>
                    <p className="text-sm">
                      Max per dag: <strong>{(additive.adi_value * 70).toFixed(0)} mg</strong>
                    </p>
                    {isSulfite && (
                      <>
                        <p className="text-xs text-muted-foreground mt-2">
                          Detta motsvarar exempelvis:
                        </p>
                        <ul className="text-xs text-muted-foreground list-disc list-inside mt-1">
                          <li>~140 ml vin (vid 350 mg/l)</li>
                          <li>~16 g torkade aprikoser (vid 3000 mg/kg)</li>
                        </ul>
                      </>
                    )}
                  </div>
                  
                  {/* EFSA-varning för sulfiter */}
                  {isSulfite && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        EFSA har noterat att vissa konsumentgrupper kan överskrida ADI-värdet vid hög konsumtion av vin och torkad frukt.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {additive.children_note && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Barn:</strong> {additive.children_note}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Avoidance Tips */}
            {additive.avoidance_tips?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Så undviker du {additive.e_number}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {additive.avoidance_tips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Natural Alternatives */}
            {additive.natural_alternatives?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Naturliga alternativ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {additive.natural_alternatives.map((alternative, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {alternative}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ADI Calculator */}
            <ADICalculator additive={additive} />

            {/* Sidebar Ads */}
            <AffiliateAdsSection variant="sidebar" />

            {/* Contribute Information */}
            <ContributeInfoCard additive={additive} />
          </div>
        </div>
      </main>
    </Layout>
  );
}