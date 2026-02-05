import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  createOrganizationSchema, 
  createWebSiteSchema, 
  createBreadcrumbSchema,
  createFAQSchema,
  createHowToSchema,
  createEducationalSchema,
  createWebPageSchema,
  createItemListSchema
} from '@/utils/schemaMarkup';
import { ShoppingCTA } from '@/components/ShoppingCTA';
import { Utensils, Search, Star, HelpCircle, Target, BarChart3, Award, Zap, Info, Lightbulb } from 'lucide-react';

const ALPHABET_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];

const FoodHub = () => {
  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Livsmedel A-Ö', url: '/livsmedel' }
  ];

  // Enhanced FAQ data for rich snippets
  const faqData = [
    {
      question: "Var hittar jag näringsinformation för livsmedel?",
      answer: "I vår Livsmedel A-Ö databas hittar du detaljerad näringsinformation för över 500 livsmedel, inklusive kalorier, protein, fett, kolhydrater och vitaminer per 100g."
    },
    {
      question: "Hur förvarar jag olika livsmedel på bästa sätt?",
      answer: "Varje livsmedel i vår databas har specifika förvaringsråd. Vi anger optimal temperatur, plats (kyl, frys, rumstemperatur) och hur länge produkten håller sig."
    },
    {
      question: "Vilka livsmedel kan jag frysa in?",
      answer: "Vi anger tydligt för varje livsmedel om det är frysbart eller inte, samt hur länge det håller sig i frysen. Många livsmedel som frukt, grönsaker och kött går bra att frysa."
    },
    {
      question: "Hur hittar jag information om ett specifikt livsmedel?",
      answer: "Använd alfabetisk navigation (A-Ö) för att bläddra efter första bokstaven, eller välj en kategori som mejeri, kött, grönsaker etc. för att hitta relaterade livsmedel."
    },
    {
      question: "Innehåller databasen information om allergener?",
      answer: "Ja, vi anger allergener och intoleranser för relevanta livsmedel, samt ger tips för dem med specifika dietkrav som glutenfritt, laktosfritt eller veganskt."
    },
    {
      question: "Kan jag lägga till livsmedel i min inköpslista?",
      answer: "Ja! Från varje livsmedels informationssida kan du enkelt lägga till produkten i din delade inköpslista och planera dina inköp mer effektivt."
    }
  ];

  const howToSteps = [
    {
      name: "Välj navigationsmetod",
      text: "Bläddra alfabetiskt (A-Ö) eller välj en specifik kategori som mejeri, kött, grönsaker, frukt eller fisk för att hitta livsmedel."
    },
    {
      name: "Läs näringsinformation",
      text: "På varje livsmedels sida hittar du detaljerade näringsvärden per 100g, inklusive kalorier, makronutrienter och viktiga vitaminer och mineraler."
    },
    {
      name: "Kontrollera förvaring och hållbarhet",
      text: "Se hur du bäst förvarar livsmedlet, hur länge det håller sig och om det går att frysa för längre hållbarhet."
    },
    {
      name: "Använd praktiska tips",
      text: "Läs våra användningstips för matlagning, förberedelse och hur du får ut det mesta av varje livsmedel."
    },
    {
      name: "Lägg till i inköpslista",
      text: "Klicka på 'Lägg till i lista' för att spara livsmedlet i din delade inköpslista och planera dina inköp smartare."
    }
  ];

  const organizationSchema = createOrganizationSchema();
  const websiteSchema = createWebSiteSchema();
  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);
  const faqSchema = createFAQSchema(faqData);
  const howToSchema = createHowToSchema("Använd livsmedeldatabasen effektivt", howToSteps);
  
  const educationalSchema = createEducationalSchema({
    name: "Livsmedel A-Ö Guide",
    description: "Komplett databas med näringsinformation för 500+ livsmedel",
    url: "https://vihandlar.se/livsmedel",
    educationalLevel: "Allmänheten",
    learningResourceType: "Database/Reference",
    author: "ViHandlar",
    keywords: ["livsmedel", "näringsvärden", "förvaring", "hållbarhet"]
  });

  const webPageSchema = createWebPageSchema({
    name: "Livsmedel A-Ö - Komplett guide till näringsvärden",
    description: "Databas med näringsinformation för 500+ livsmedel",
    url: "https://vihandlar.se/livsmedel",
    breadcrumbs: breadcrumbItems,
    speakable: {
      cssSelector: ["h1", "h2", ".tldr-content"]
    }
  });

  const itemListSchema = createItemListSchema({
    name: "Svenska livsmedel A-Ö",
    description: "Alfabetisk lista över livsmedel med näringsinformation",
    items: ALPHABET_LETTERS.map(letter => ({
      name: `Livsmedel som börjar på ${letter}`,
      url: `https://vihandlar.se/livsmedel/${letter.toLowerCase()}`,
      description: `Alla livsmedel som börjar på bokstaven ${letter} med näringsvärden och förvaringstips`
    }))
  });

  return (
    <Layout>
      <Helmet>
        <title>Livsmedel A-Ö - Komplett guide till näringsvärden 2024 | ViHandlar</title>
        <meta name="description" content="✅ Komplett databas med 500+ livsmedel från A-Ö. Näringsvärden, förvaringstips, hållbarhet och användning. Sök efter bokstav eller kategori." />
        <meta name="keywords" content="livsmedel näringsvärde, förvaring tips, hållbarhet mat, vitaminer mineraler, matlagning guide, kalorier per 100g, frysbar mat, livsmedel databas" />
        <link rel="canonical" href="https://vihandlar.se/livsmedel" />
        
        {/* Enhanced meta tags for AI and rich snippets */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="ViHandlar - Livsmedelsexperter" />
        <meta name="subject" content="Livsmedel näringsinformation och förvaringsguide" />
        <meta name="language" content="sv-SE" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content="🥗 Livsmedel A-Ö - Komplett näringsdatabas 2024" />
        <meta property="og:description" content="500+ livsmedel med detaljerade näringsvärden, förvaringstips och användning. Från A till Ö - allt du behöver veta om mat." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vihandlar.se/livsmedel" />
        <meta property="og:locale" content="sv_SE" />
        
        {/* Twitter Card Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🥗 Livsmedel A-Ö - Näringsdatabas" />
        <meta name="twitter:description" content="500+ livsmedel med näringsvärden, förvaringstips och användning från A till Ö." />
        <meta name="twitter:creator" content="@vihandlar" />

        {/* Multiple Schema.org markup for rich snippets */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(educationalSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Hem</Link>
          <span className="mx-2">›</span>
          <span>Livsmedel A-Ö</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Livsmedel A-Ö</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Upptäck allt om dina favoritlivsmedel. Näringsvärden, förvaringstips, 
            hållbarhet och användning för hundratals livsmedel - sorterat från A till Ö.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary">
              <Utensils className="h-4 w-4 mr-1" />
              500+ Livsmedel
            </Badge>
            <Badge variant="secondary">
              <BarChart3 className="h-4 w-4 mr-1" />
              Näringsvärden
            </Badge>
            <Badge variant="secondary">
              <Star className="h-4 w-4 mr-1" />
              Förvaringstips
            </Badge>
            <Badge variant="outline">
              <Award className="h-4 w-4 mr-1" />
              Uppdaterat 2024
            </Badge>
          </div>
        </div>

        {/* TL;DR Section for AI optimization */}
        <div className="tldr-content bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border-l-4 border-l-green-500 mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-green-800 dark:text-green-200">
            <Zap className="h-5 w-5" />
            TL;DR - Snabbfakta om livsmedel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-300">
            <div className="space-y-2">
              <p><strong>500+ livsmedel:</strong> Komplett databas från A till Ö</p>
              <p><strong>Näringsvärden:</strong> Kalorier, protein, fett, kolhydrater per 100g</p>
              <p><strong>Förvaringstips:</strong> Optimal temperatur och hållbarhet</p>
            </div>
            <div className="space-y-2">
              <p><strong>Kategorier:</strong> Mejeri, kött, grönsaker, frukt, fisk</p>
              <p><strong>Praktiska tips:</strong> Matlagning och användning</p>
              <p><strong>Frysinformation:</strong> Vad som går att frysa och hur länge</p>
            </div>
          </div>
        </div>

        {/* Alphabet Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bläddra efter bokstav</CardTitle>
            <CardDescription>Välj en bokstav för att se alla livsmedel som börjar på den bokstaven</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-3">
              {ALPHABET_LETTERS.map((letter) => (
                <Link
                  key={letter}
                  to={`/livsmedel/${letter.toLowerCase()}`}
                  className="flex items-center justify-center h-12 w-12 border rounded-lg hover:bg-muted transition-colors font-semibold"
                >
                  {letter}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Populära kategorier</CardTitle>
            <CardDescription>Utforska livsmedel efter kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link to="/livsmedel/kategori/mejeri" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🥛 Mejeri</div>
                <div className="text-sm text-muted-foreground">Mjölk, ost, yoghurt</div>
              </Link>
              <Link to="/livsmedel/kategori/kott" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🥩 Kött</div>
                <div className="text-sm text-muted-foreground">Nöt, fläsk, kyckling</div>
              </Link>
              <Link to="/livsmedel/kategori/gronsaker" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🥬 Grönsaker</div>
                <div className="text-sm text-muted-foreground">Färska grönsaker</div>
              </Link>
              <Link to="/livsmedel/kategori/frukt-bar" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🍎 Frukt & Bär</div>
                <div className="text-sm text-muted-foreground">Färsk & torkad frukt</div>
              </Link>
              <Link to="/livsmedel/kategori/fisk-skaldjur" className="p-4 border rounded-lg hover:bg-muted transition-colors text-center">
                <div className="font-medium">🐟 Fisk</div>
                <div className="text-sm text-muted-foreground">Fisk & skaldjur</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Shopping CTA */}
        <div className="mb-8">
          <ShoppingCTA 
            foodName="livsmedel"
            searchQuery="mat"
          />
        </div>

        {/* Statistics Fact Box */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
            <BarChart3 className="h-5 w-5" />
            Statistik: Vår livsmedelsdatabas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div>Livsmedel totalt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">29</div>
              <div>Bokstäver (A-Ö)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15+</div>
              <div>Kategorier</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div>Svenskt fokus</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Vanliga frågor om livsmedel
            </CardTitle>
            <CardDescription>Svar på de mest frekventa frågorna om vår livsmedelsdatabas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqData.slice(0, 4).map((faq, index) => (
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

        {/* How-to Guide Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Så här använder du livsmedelsdatabasen
            </CardTitle>
            <CardDescription>Steg-för-steg guide för att hitta information om livsmedel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {howToSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{step.name}</h4>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips Fact Box */} 
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mb-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
            <Lightbulb className="h-5 w-5" />
            Pro-tips för matlagning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700 dark:text-purple-300">
            <ul className="space-y-2">
              <li>• Använd näringsinformationen för att balansera måltider</li>
              <li>• Kontrollera frysmöjligheter innan storhandling</li>
              <li>• Läs förvaringstips för att minska matsvinn</li>
            </ul>
            <ul className="space-y-2">
              <li>• Jämför liknande livsmedel för bästa näringsvärde</li>
              <li>• Använd användningstips för inspiration</li>
              <li>• Lägg till favoriter i din inköpslista direkt</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Planera dina inköp smartare</h2>
            <p className="text-muted-foreground mb-6">
              Skapa delade inköpslistor med familj och vänner. Lägg till livsmedel direkt från våra informationssidor.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Skapa inköpslista →
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FoodHub;