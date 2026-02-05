import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useEAdditiveLetterCounts } from '@/hooks/useEAdditives';
import { createOrganizationSchema, createWebSiteSchema, createBreadcrumbSchema } from '@/utils/schemaMarkup';

// E-numbers typically start with E followed by numbers 1-9
const E_NUMBER_LETTERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const EAdditiveAlphabet = () => {
  const { data: letterCounts = {} } = useEAdditiveLetterCounts();

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'E-ämnen', url: '/e-amnen' },
    { name: 'E-ämnen A-Ö', url: '/e-amnen/alla' }
  ];

  const organizationSchema = createOrganizationSchema();
  const websiteSchema = createWebSiteSchema();
  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  return (
    <Layout>
      <Helmet>
        <title>E-ämnen A-Ö - Komplett guide till livsmedelstillsatser | ViHandlar</title>
        <meta name="description" content="Upptäck alla E-ämnen från E1 till E9XX. Risknivåer, ADI-värden, hälsoeffekter och naturliga alternativ för över 350 livsmedelstillsatser." />
        <meta name="keywords" content="e-ämnen, livsmedelstillsatser, konserveringsmedel, färgämnen, sötningsmedel, emulgeringsmedel, stabiliseringsmedel" />
        <link rel="canonical" href="https://vihandlar.se/e-amnen/alla" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <Link to="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
          <span className="mx-2">›</span>
          <span>E-ämnen A-Ö</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">E-ämnen A-Ö</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upptäck alla E-ämnen sorterade numeriskt. Risknivåer, ADI-värden, 
            hälsoeffekter och naturliga alternativ för över 350 livsmedelstillsatser.
          </p>
        </div>

        {/* Number Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bläddra efter E-nummer</CardTitle>
            <CardDescription>Välj ett nummer för att se alla E-ämnen som börjar med det numret</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {E_NUMBER_LETTERS.map((letter) => {
                const count = letterCounts[letter] || 0;
                return (
                  <Link
                    key={letter}
                    to={`/e-amnen/nummer/${letter}`}
                    className="flex flex-col items-center justify-center h-16 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-semibold text-lg">E{letter}XX</span>
                    <span className="text-xs text-muted-foreground">{count} st</span>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Populära kategorier</CardTitle>
            <CardDescription>Utforska E-ämnen efter kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link to="/e-amnen/kategori/Färgämnen" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🎨 Färgämnen</div>
                <div className="text-sm text-muted-foreground">E100-E199</div>
              </Link>
              <Link to="/e-amnen/kategori/Konserveringsmedel" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🛡️ Konserveringsmedel</div>
                <div className="text-sm text-muted-foreground">E200-E299</div>
              </Link>
              <Link to="/e-amnen/kategori/Antioxidanter" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🔬 Antioxidanter</div>
                <div className="text-sm text-muted-foreground">E300-E399</div>
              </Link>
              <Link to="/e-amnen/kategori/Emulgeringsmedel" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🥄 Emulgeringsmedel</div>
                <div className="text-sm text-muted-foreground">E400-E499</div>
              </Link>
              <Link to="/e-amnen/kategori/Sötningsmedel" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🍯 Sötningsmedel</div>
                <div className="text-sm text-muted-foreground">E950-E999</div>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default EAdditiveAlphabet;