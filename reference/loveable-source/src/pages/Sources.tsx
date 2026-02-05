import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const Sources = () => {
  const sources = [
    {
      name: 'Livsmedelsverket',
      description: 'Sveriges officiella myndighet för livsmedelssäkerhet och näring',
      url: 'https://www.livsmedelsverket.se',
      type: 'Officiell myndighet'
    },
    {
      name: 'USDA FoodData Central',
      description: 'USA:s officiella näringsdatabas med omfattande livsmedelsinformation',
      url: 'https://fdc.nal.usda.gov',
      type: 'Internationell databas'
    },
    {
      name: 'EFSA (European Food Safety Authority)',
      description: 'Europeiska myndigheten för livsmedelssäkerhet',
      url: 'https://www.efsa.europa.eu',
      type: 'Europeisk myndighet'
    },
    {
      name: 'Harvard T.H. Chan School of Public Health',
      description: 'Ledande forskning inom näring och folkhälsa',
      url: 'https://www.hsph.harvard.edu/nutritionsource',
      type: 'Akademisk institution'
    },
    {
      name: 'Blue Zones Research',
      description: 'Forskning om långlivade populationer och deras kostvanor',
      url: 'https://www.bluezones.com',
      type: 'Forskningsinstitut'
    },
    {
      name: 'PubMed/NCBI',
      description: 'Internationell databas för medicinska och näringsvetenskapliga studier',
      url: 'https://pubmed.ncbi.nlm.nih.gov',
      type: 'Vetenskaplig databas'
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Källor och referenser - ViHandlar"
        description="Alla källor och referenser som används för näringsdata och hälsoinformation på ViHandlar. Vetenskapligt underlag från Livsmedelsverket, USDA, Harvard och mer."
        canonical="https://vihandlar.se/kallor"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <span>Källor och referenser</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Källor och referenser</h1>
          <p className="text-lg text-muted-foreground">
            All information om livsmedel, näringsvärden och hälsofördelar på ViHandlar baseras på 
            trovärdiga och vetenskapligt underbyggda källor. Vi använder endast officiella 
            myndigheter, välrenommerade akademiska institutioner och peer-reviewed forskning.
          </p>
        </div>

        {/* Quality Assurance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Våra kvalitetsgarantier</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• All näringsdata kommer från officiella myndigheter som Livsmedelsverket och USDA</li>
              <li>• Hälsopåståenden baseras på peer-reviewed vetenskaplig forskning</li>
              <li>• Källor uppdateras regelbundet för att säkerställa aktuell information</li>
              <li>• Alla påståenden är måttfulla och balanserade</li>
              <li>• Vi undviker överdrivna hälsopåståenden och "superfood"-marknadsföring</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sources.map((source, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <CardDescription className="mt-1">{source.type}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {source.description}
                </p>
                <a 
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Besök webbplats →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Methodology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vår metodik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Näringsdata</h3>
              <p className="text-muted-foreground text-sm">
                Primärt använder vi Livsmedelsverkets databas för svenska livsmedel. 
                För internationella produkter kompletterar vi med USDA FoodData Central. 
                Alla värden anges per 100g färskvikt om inget annat anges.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hälsoinformation</h3>
              <p className="text-muted-foreground text-sm">
                Hälsofördelar och effekter baseras på systematiska översikter, 
                meta-analyser och randomiserade kontrollerade studier publicerade 
                i peer-reviewed tidskrifter. Vi inkluderar endast väletablerade 
                forskningsresultat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Uppdateringsfrekvens</h3>
              <p className="text-muted-foreground text-sm">
                Information uppdateras löpande när nya forskningsresultat publiceras 
                eller när officiella näringsdatabaser uppdateras. Senaste uppdatering 
                anges på varje livsmedelssida.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact for corrections */}
        <Card>
          <CardHeader>
            <CardTitle>Hittat fel eller saknar källor?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Vi strävar efter att hålla all information korrekt och uppdaterad. 
              Om du hittar felaktig information eller saknar källhänvisningar, 
              kontakta oss gärna.
            </p>
            <p className="text-sm text-muted-foreground">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Sources;