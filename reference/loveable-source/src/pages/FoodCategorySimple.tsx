import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';

const FoodCategorySimple = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  return (
    <Layout>
      <Helmet>
        <title>{`Kategori: ${categorySlug} - Livsmedel och näringsvärden | ViHandlar`}</title>
        <meta name="description" content={`Utforska alla livsmedel inom kategorin ${categorySlug}. Komplett information om näringsvärden, förvaring och användning.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/livsmedel" className="hover:text-foreground">Livsmedel A-Ö</Link>
          <span className="mx-2">›</span>
          <span>{categorySlug}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kategori: {categorySlug}</h1>
          <p className="text-muted-foreground">
            Livsmedel inom denna kategori kommer snart att laddas här.
          </p>
        </div>

        {/* Hero Ads */}
        <AffiliateAdsSection variant="hero" className="mb-8" />

        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Vi arbetar på att lägga till livsmedel för kategorin {categorySlug}.
            </p>
            <Link to="/livsmedel" className="text-primary hover:underline">
              ← Tillbaka till alla livsmedel
            </Link>
          </CardContent>
        </Card>

        {/* Inline Ad */}
        <AffiliateAdsSection variant="inline" className="mb-8" />

        {/* Footer Ad */}
        <AffiliateAdsSection variant="footer" />
      </div>
    </Layout>
  );
};

export default FoodCategorySimple;
