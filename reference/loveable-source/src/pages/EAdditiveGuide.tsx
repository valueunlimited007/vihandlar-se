import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RiskGauge } from '@/components/RiskGauge';
import { ADICalculator } from '@/components/ADICalculator';
import { EAdditiveCategoryChart } from '@/components/EAdditiveCategoryChart';
import { EAdditiveCard } from '@/components/EAdditiveCard';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';
import { useEAdditives } from '@/hooks/useEAdditives';
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Calculator,
  Search,
  Filter,
  BarChart3,
  Microscope,
  Heart,
  Users,
  Info,
  Star,
  Target,
  Lightbulb,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import { 
  createFAQSchema, 
  createHowToSchema, 
  createEducationalSchema,
  createWebPageSchema 
} from '@/utils/schemaMarkup';

const EAdditiveGuide = () => {
  const { data: additives = [] } = useEAdditives();

  // Get featured additives for examples
  const highRiskAdditives = additives.filter(a => a.risk_score >= 7).slice(0, 3);
  const lowRiskAdditives = additives.filter(a => a.risk_score <= 3).slice(0, 3);
  const commonAdditives = additives.slice(0, 6);

  // Enhanced schema markup for rich snippets and AI optimization
  const faqData = [
    {
      question: "Vad är E-ämnen och hur fungerar de?",
      answer: "E-ämnen är livsmedelstillsatser som har godkänts för användning inom EU. De har alla genomgått rigorösa säkerhetstester och fått ett unikt E-nummer. E-ämnen används för att konservera mat, förbättra smak, konsistens eller utseende."
    },
    {
      question: "Är alla E-ämnen farliga för hälsan?",
      answer: "Nej, de flesta E-ämnen är säkra när de används enligt rekommendationerna. Många är till och med naturliga ämnen som vitamin C (E300) eller beta-karoten (E160a). Vår databas visar risknivåer för att hjälpa dig göra informerade val."
    },
    {
      question: "Vad betyder ADI-värdet?",
      answer: "ADI (Acceptable Daily Intake) är den mängd av ett E-ämne som en person kan konsumera dagligen hela livet utan hälsorisk. Det uttrycks i milligram per kilogram kroppsvikt per dag och inkluderar stora säkerhetsmarginaler."
    },
    {
      question: "Hur beräknar jag min säkra dos av ett E-ämne?",
      answer: "Använd vår ADI-kalkylator där du anger din vikt och får reda på hur mycket av ett specifikt E-ämne du säkert kan konsumera dagligen. Formeln är: ADI-värde × din vikt i kg = säker daglig dos i mg."
    },
    {
      question: "Vilka E-ämnen bör jag undvika?",
      answer: "E-ämnen med hög risknivå (7-10 på vår skala) bör konsumeras med försiktighet. Detta inkluderar vissa färgämnen som tartrazin (E102) och vissa konserveringsmedel. Använd vår databas för att kontrollera specifika ämnen."
    },
    {
      question: "Är E-ämnen säkra för barn?",
      answer: "Barn kan vara mer känsliga för vissa E-ämnen. Särskild försiktighet bör iakttas med vissa färgämnen och konserveringsmedel. Vår databas innehåller specifika noteringar för barn när relevant."
    },
    {
      question: "Var hittar jag E-ämnen på produktetiketter?",
      answer: "E-ämnen finns listade i ingrediensförteckningen, antingen som E-nummer (ex. E200) eller kemiskt namn (ex. sorbinsyra). De listas i fallande ordning efter vikt i produkten."
    },
    {
      question: "Kan jag undvika E-ämnen helt?",
      answer: "Det är svårt att undvika alla E-ämnen då många är naturliga och nödvändiga för livsmedelssäkerheten. Fokusera på att undvika E-ämnen med höga risknivåer och välj produkter med färre tillsatser när möjligt."
    }
  ];

  const howToSteps = [
    {
      name: "Sök efter E-ämne",
      text: "Använd sökfunktionen för att hitta ett specifikt E-nummer eller kemiskt namn. Du kan också bläddra alfabetiskt eller efter kategori."
    },
    {
      name: "Läs säkerhetsinformation",
      text: "Kontrollera risknivån (1-10 skala), ADI-värdet och eventuella hälsovarningar. Rött betyder högre risk, grönt betyder lägre risk."
    },
    {
      name: "Beräkna din säkra dos",
      text: "Använd ADI-kalkylatorn genom att ange din vikt. Detta visar hur mycket av ämnet du säkert kan konsumera dagligen."
    },
    {
      name: "Jämför alternativ",
      text: "Använd jämförelsefunktionen för att se skillnader mellan liknande E-ämnen och välja säkrare alternativ."
    },
    {
      name: "Spara favoriter",
      text: "Markera E-ämnen du ofta kontrollerar som favoriter för snabb åtkomst i framtiden."
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Den kompletta E-ämnesguiden 2024 - Säkerhet, ADI-värden & Databas",
    "alternativeHeadline": "Allt du behöver veta om livsmedelstillsatser och E-nummer",
    "description": "Omfattande guide om E-ämnen, livsmedelstillsatser, säkerhet och hur du använder vår E-ämnesdatabas. Lär dig om ADI-värden, risknivåer och kategorier med över 300 E-ämnen.",
    "author": {
      "@type": "Organization",
      "name": "ViHandlar",
      "url": "https://vihandlar.se"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ViHandlar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vihandlar.se/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png"
      }
    },
    "datePublished": "2024-01-01T00:00:00+01:00",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://vihandlar.se/e-amnen/guide"
    },
    "articleSection": "E-ämnen Guide",
    "wordCount": 3500,
    "inLanguage": "sv-SE",
    "isAccessibleForFree": true,
    "genre": "Utbildningsartikel",
    "educationalLevel": "Allmänheten",
    "keywords": "e-ämnen, livsmedelstillsatser, ADI värden, e-nummer säkerhet, konserveringsmedel, färgämnen, databas",
    "about": [
      {
        "@type": "Thing",
        "name": "Livsmedelstillsatser"
      },
      {
        "@type": "Thing", 
        "name": "E-ämnen"
      },
      {
        "@type": "Thing",
        "name": "Livsmedelssäkerhet"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "EFSA",
        "description": "Europeiska myndigheten för livsmedelssäkerhet"
      },
      {
        "@type": "Thing",
        "name": "ADI-värden"
      }
    ]
  };

  const faqSchema = createFAQSchema(faqData);
  const howToSchema = createHowToSchema("Använd E-ämnesdatabasen effektivt", howToSteps);
  const educationalSchema = createEducationalSchema({
    name: "Komplett E-ämnesguide",
    description: "Lär dig allt om livsmedelstillsatser och E-ämnen",
    url: "https://vihandlar.se/e-amnen/guide",
    educationalLevel: "Allmänheten",
    learningResourceType: "Guide/Tutorial",
    author: "ViHandlar",
    keywords: ["e-ämnen", "livsmedelstillsatser", "säkerhet", "ADI"]
  });
  
  const webPageSchema = createWebPageSchema({
    name: "E-ämnesguiden - Komplett guide till livsmedelstillsatser",
    description: "Omfattande guide om E-ämnen med databas över 300+ tillsatser",
    url: "https://vihandlar.se/e-amnen/guide",
    breadcrumbs: [
      { name: "Hem", url: "https://vihandlar.se" },
      { name: "E-ämnen", url: "https://vihandlar.se/e-amnen" },
      { name: "Guide", url: "https://vihandlar.se/e-amnen/guide" }
    ],
    speakable: {
      cssSelector: ["h1", "h2", ".tldr-content"]
    }
  });

  return (
    <ErrorBoundary>
      <Layout>
        <Helmet>
          <title>Den kompletta E-ämnesguiden 2024 - Säkerhet, ADI-värden & Databas | Vihandlar</title>
          <meta name="description" content="✅ Komplett guide till E-ämnen och livsmedelstillsatser. ADI-kalkylatorer, risknivåer, säkerhetsinformation för 300+ E-ämnen. Vetenskapligt baserad databas." />
          <meta name="keywords" content="e-ämnen guide, livsmedelstillsatser säkerhet, ADI kalkylator, e-nummer databas, konserveringsmedel risker, färgämnen biverkningar, antioxidanter naturliga" />
          <link rel="canonical" href="https://vihandlar.se/e-amnen/guide" />
          
          {/* Enhanced meta tags for AI and rich snippets */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="author" content="ViHandlar - Experter på livsmedelstillsatser" />
          <meta name="subject" content="Livsmedelstillsatser och E-ämnen guide" />
          <meta name="rating" content="General" />
          <meta name="language" content="sv-SE" />
          
          {/* Open Graph Enhanced */}
          <meta property="og:title" content="🔬 Kompletta E-ämnesguiden 2024 - Säkerhet & ADI-värden" />
          <meta property="og:description" content="Vetenskapligt baserad guide till E-ämnen. ADI-kalkylatorer, risknivåer och säkerhetsinformation för 300+ livsmedelstillsatser." />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://vihandlar.se/e-amnen/guide" />
          <meta property="og:locale" content="sv_SE" />
          <meta property="article:author" content="ViHandlar" />
          <meta property="article:section" content="E-ämnen Guide" />
          <meta property="article:tag" content="e-ämnen, livsmedelstillsatser, ADI, säkerhet" />
          
          {/* Twitter Card Enhanced */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="🔬 Kompletta E-ämnesguiden 2024" />
          <meta name="twitter:description" content="Allt om E-ämnen: säkerhet, ADI-kalkylatorer, risknivåer för 300+ livsmedelstillsatser. Vetenskapligt baserad information." />
          <meta name="twitter:creator" content="@vihandlar" />

          {/* Multiple Schema.org markup for rich snippets */}
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(howToSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(educationalSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(webPageSchema)}
          </script>
        </Helmet>

        <article className="container mx-auto py-8 max-w-4xl space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Link to="/" className="hover:text-primary">Hem</Link>
              <span>›</span>
              <Link to="/e-amnen" className="hover:text-primary">E-ämnen</Link>
              <span>›</span>
              <span>Guide</span>
            </div>
            
            <header>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Den kompletta guiden till E-ämnen
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Allt du behöver veta om livsmedelstillsatser, säkerhet och hur du använder vår avancerade E-ämnesdatabas
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Omfattande guide
                </Badge>
                <Badge variant="secondary">
                  <Shield className="h-4 w-4 mr-1" />
                  Säkerhetsinformation
                </Badge>
                <Badge variant="secondary">
                  <Calculator className="h-4 w-4 mr-1" />
                  ADI-kalkylatorer
                </Badge>
                <Badge variant="secondary">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {additives.length}+ E-ämnen
                </Badge>
                <Badge variant="outline">
                  <Award className="h-4 w-4 mr-1" />
                  Vetenskapligt baserad
                </Badge>
              </div>
            </header>

            {/* TL;DR Section for AI optimization */}
            <div className="tldr-content bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border-l-4 border-l-primary">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Zap className="h-5 w-5 text-primary" />
                Snabbfakta om E-ämnen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><strong>300+ E-ämnen:</strong> Alla EU-godkända livsmedelstillsatser</p>
                  <p><strong>ADI-värden:</strong> Säkra dagliga doser för varje ämne</p>
                  <p><strong>Risknivåer:</strong> 1-10 skala baserad på forskning</p>
                </div>
                <div className="space-y-2">
                  <p><strong>5 huvudkategorier:</strong> Färg, konservering, antioxidanter m.m.</p>
                  <p><strong>Gratis verktyg:</strong> Kalkylatorer, jämförelser, databas</p>
                  <p><strong>Uppdaterat 2024:</strong> Senaste forskningen inkluderad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Ads */}
          <AffiliateAdsSection variant="hero" className="my-8" />

          {/* Table of Contents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Innehållsförteckning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Link to="#vad-ar-eamnen" className="block p-2 rounded hover:bg-muted">1. Vad är E-ämnen?</Link>
                  <Link to="#kategorier" className="block p-2 rounded hover:bg-muted">2. Kategorier och klassificering</Link>
                  <Link to="#sakerhet" className="block p-2 rounded hover:bg-muted">3. Säkerhet och ADI-värden</Link>
                  <Link to="#risknivaer" className="block p-2 rounded hover:bg-muted">4. Risknivåer och bedömning</Link>
                </div>
                <div className="space-y-2">
                  <Link to="#anvand-databasen" className="block p-2 rounded hover:bg-muted">5. Använd vår databas</Link>
                  <Link to="#verktyg" className="block p-2 rounded hover:bg-muted">6. Verktyg och funktioner</Link>
                  <Link to="#vanliga-eamnen" className="block p-2 rounded hover:bg-muted">7. Vanliga E-ämnen</Link>
                  <Link to="#tips-rad" className="block p-2 rounded hover:bg-muted">8. Tips och råd</Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 1: What are E-additives */}
          <section id="vad-ar-eamnen" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">1. Vad är E-ämnen?</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg">
                E-ämnen, även kallade livsmedelstillsatser, är ämnen som tillsätts i mat för att förbättra dess egenskaper, 
                hållbarhet eller utseende. Bokstaven "E" står för Europa och visar att ämnet är godkänt för användning 
                inom EU enligt <Link to="/e-amnen/alla" className="text-primary hover:underline">EU:s lagstiftning om livsmedelstillsatser</Link>.
              </p>
              
              <p>
                Varje E-ämne har genomgått rigorösa säkerhetstester och fått ett unikt nummer. I vår databas hittar du 
                <Link to="/e-amnen/alla" className="text-primary hover:underline">över {additives.length} E-ämnen</Link> med 
                detaljerad information om säkerhet, användning och hälsoeffekter.
              </p>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Viktigt att veta:</strong> Att ett ämne har E-nummer betyder att det är säkerhetstestat och 
                  godkänt, men det betyder inte nödvändigtvis att det är hälsosamt i stora mängder.
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold mt-6">Varför använder vi E-ämnen?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Konservering:</strong> Förlänger hållbarheten och förhindrar bakterietillväxt</li>
                <li><strong>Textur:</strong> Förbättrar konsistens och mouthfeel</li>
                <li><strong>Smak:</strong> Förstärker eller modifierar smaker</li>
                <li><strong>Utseende:</strong> Ger färg och gör produkter mer tilltalande</li>
                <li><strong>Näringsinnehåll:</strong> Tillför vitaminer och mineraler</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Categories */}
          <section id="kategorier" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">2. Kategorier och klassificering</h2>
            
            <p className="text-lg">
              E-ämnen delas in i olika kategorier baserat på deras funktion. Varje kategori har sitt eget nummerintervall:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Link to="/e-amnen/kategori/färgämnen" className="hover:text-primary">
                      E100-E199: Färgämnen
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ger mat färg och gör den mer tilltalande. Exempel: 
                    <Link to="/e-amnen/e102" className="text-primary hover:underline"> E102 (Tartrazin)</Link>, 
                    <Link to="/e-amnen/e160a" className="text-primary hover:underline"> E160a (Beta-karoten)</Link>.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/kategori/färgämnen">Utforska färgämnen</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Link to="/e-amnen/kategori/konserveringsmedel" className="hover:text-primary">
                      E200-E299: Konserveringsmedel
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Förhindrar bakterier och förlänger hållbarheten. Exempel: 
                    <Link to="/e-amnen/e200" className="text-primary hover:underline"> E200 (Sorbinsyra)</Link>, 
                    <Link to="/e-amnen/e211" className="text-primary hover:underline"> E211 (Natriumbensoat)</Link>.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/kategori/konserveringsmedel">Se konserveringsmedel</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Link to="/e-amnen/kategori/antioxidanter" className="hover:text-primary">
                      E300-E399: Antioxidanter
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Förhindrar oxidation och håller mat färsk. Exempel: 
                    <Link to="/e-amnen/e300" className="text-primary hover:underline"> E300 (Askorbinsyra)</Link>, 
                    <Link to="/e-amnen/e306" className="text-primary hover:underline"> E306 (Tokoferol)</Link>.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/kategori/antioxidanter">Utforska antioxidanter</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Link to="/e-amnen/kategori/sötningsmedel" className="hover:text-primary">
                      E400-E499: Emulgeringsmedel
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Blandar ingredienser och förbättrar textur. Exempel: 
                    <Link to="/e-amnen/e471" className="text-primary hover:underline"> E471 (Mono- och diglycerider)</Link>.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/kategori/emulgeringsmedel">Se emulgeringsmedel</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-muted-foreground">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Link to="/e-amnen/kategori/förtjockningsmedel" className="hover:text-primary">
                      E1000+: Övriga ämnen
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Olika funktioner som sötningsmedel, gasmedel och förtjockningsmedel.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla">Se alla kategorier</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {additives.length > 0 && (
                <div className="space-y-8 mb-32">
                  <h3 className="text-xl font-semibold mb-8">Kategorifördelning i vår databas:</h3>
                  
                  {/* Chart Container with better mobile spacing */}
                  <div className="w-full max-w-4xl mx-auto mb-12">
                    <EAdditiveCategoryChart additives={additives} variant="pie" />
                  </div>

                  {/* Category Facts Box with clear separation */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 sm:p-6 rounded-lg border border-orange-200 dark:border-orange-800 mt-16 space-y-4">
                    <h4 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-200">
                      <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                      Intressanta fakta om kategorier
                    </h4>
                    
                    {/* Mobile-optimized facts grid */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 text-xs sm:text-sm text-orange-700 dark:text-orange-300">
                      <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                        <div className="font-medium mb-1">Mest använda:</div>
                        <div>Antioxidanter (E300-399) återfinns i de flesta bearbetade livsmedel</div>
                      </div>
                      <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                        <div className="font-medium mb-1">Mest diskuterade:</div>
                        <div>Färgämnen (E100-199) på grund av potentiella allergiska reaktioner</div>
                      </div>
                      <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                        <div className="font-medium mb-1">Nödvändigast:</div>
                        <div>Konserveringsmedel (E200-299) förhindrar livsmedelsförgiftning</div>
                      </div>
                      <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                        <div className="font-medium mb-1">Naturligast:</div>
                        <div>Många antioxidanter kommer från frukt och grönsaker</div>
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </section>

          {/* Section 3: Safety and ADI */}
          <section id="sakerhet" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">3. Säkerhet och ADI-värden</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg">
                <strong>ADI (Acceptable Daily Intake)</strong> är den mängd av ett E-ämne som en person kan konsumera 
                dagligen hela livet utan hälsorysk. ADI-värdet uttrycks i milligram per kilogram kroppsvikt per dag (mg/kg/dag).
              </p>

              <Alert>
                <Calculator className="h-4 w-4" />
                <AlertDescription>
                  <strong>Räkna ut din säkra dos:</strong> Använd vår <Link to="/e-amnen/alla" className="text-primary hover:underline">ADI-kalkylator</Link> för 
                  att beräkna hur mycket av ett E-ämne du säkert kan konsumera baserat på din vikt.
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold mt-6">Så fastställs ADI-värden:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Omfattande djurtester för att identifiera högsta säkra dos</li>
                <li>Säkerhetsfaktor på minst 100 tillämpas (ofta 1000)</li>
                <li>Expertpanel utvärderar all tillgänglig data</li>
                <li>ADI-värde fastställs med stor säkerhetsmarginal</li>
              </ol>
            </div>

            {/* Example ADI Calculator */}
            {commonAdditives.length > 0 && commonAdditives[0].adi_value && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Testa ADI-kalkylatorn:</h3>
                <ADICalculator additive={commonAdditives[0]} />
              </div>
            )}

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Microscope className="h-5 w-5" />
                Vetenskaplig grund
              </h3>
              <p>
                Alla E-ämnen i vår databas har genomgått omfattande säkerhetsprövning av <strong>EFSA</strong> 
                (European Food Safety Authority). Vi uppdaterar kontinuerligt informationen baserat på ny forskning.
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/kallor">Läs mer om våra källor</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Section 4: Risk Levels */}
          <section id="risknivaer" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">4. Risknivåer och bedömning</h2>
            
            <p className="text-lg">
              Vi använder en risknivåskala från 1-10 för att hjälpa dig förstå säkerheten hos olika E-ämnen. 
              Denna bedömning baseras på vetenskaplig forskning, ADI-värden och kända hälsoeffekter.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 text-sm sm:text-base">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Låg risk (1-3)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <RiskGauge score={2} size="md" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Anses generellt säkra vid normal konsumtion. Ofta naturliga ämnen eller väl studerade syntetiska ämnen.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla?risk=low">Se lågriskämnen</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700 text-sm sm:text-base">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                    Måttlig risk (4-6)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <RiskGauge score={5} size="md" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Kan ha vissa bieffekter för känsliga individer eller vid hög konsumtion. Kräver uppmärksamhet.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla?risk=medium">Se måttliga ämnen</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 text-sm sm:text-base">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Hög risk (7-10)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <RiskGauge score={8} size="md" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Kan ha dokumenterade hälsorisker. Bör undvikas eller konsumeras mycket begränsat.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla?risk=high">Se högriskämnen</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* High Risk Examples */}
            {highRiskAdditives.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Exempel på högriskämnen att vara försiktig med:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {highRiskAdditives.map((additive) => (
                    <EAdditiveCard key={additive.id} additive={additive} variant="compact" />
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Button asChild>
                    <Link to="/e-amnen/alla?risk=high">Se alla högriskämnen →</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Low Risk Examples */}
            {lowRiskAdditives.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Exempel på säkra alternativ (låg risk):</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {lowRiskAdditives.map((additive) => (
                    <EAdditiveCard key={additive.id} additive={additive} variant="compact" />
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <Link to="/e-amnen/alla?risk=low">Se alla lågriskämnen →</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Statistics Fact Box */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
                <BarChart3 className="h-5 w-5" />
                Statistik: E-ämnen i vår databas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-700 dark:text-purple-300">
                <div className="text-center">
                  <div className="text-2xl font-bold">{additives.length}</div>
                  <div>Totalt E-ämnen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{additives.filter(a => a.risk_score <= 3).length}</div>
                  <div>Låg risk (1-3)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{additives.filter(a => a.risk_score >= 7).length}</div>
                  <div>Hög risk (7-10)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{additives.filter(a => a.origin === 'naturlig').length}</div>
                  <div>Naturliga</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Using the database */}
          <section id="anvand-databasen" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">5. Använd vår E-ämnesdatabas</h2>
            
            <p className="text-lg">
              Vår databas innehåller <strong>{additives.length}+ E-ämnen</strong> med detaljerad information. 
              Här är olika sätt att hitta informationen du behöver:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Sök efter E-nummer eller namn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Sök direkt efter E-nummer (t.ex. "E102") eller namn (t.ex. "Tartrazin") för snabb åtkomst.
                  </p>
                  <Button asChild>
                    <Link to="/e-amnen">Använd sökfunktionen</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtrera efter kategori
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Browsa efter kategori som färgämnen, konserveringsmedel eller antioxidanter.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/kategori/färgämnen">Färgämnen</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/kategori/konserveringsmedel">Konserveringsmedel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Browsa numeriskt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Utforska E-ämnen organiserat efter nummerserier för systematisk genomgång.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/nummer/1">E100-199</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/nummer/2">E200-299</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/nummer/3">E300-399</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Filtrera efter risknivå
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hitta ämnen baserat på deras säkerhetsnivå för att göra medvetna val.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/alla?risk=high">Högrisk</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/e-amnen/alla?risk=low">Lågrisk</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Heart className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro-tips:</strong> Använd vår <Link to="/e-amnen/alla" className="text-primary hover:underline">avancerade sökning</Link> för 
                att kombinera flera filter och hitta exakt den information du behöver.
              </AlertDescription>
            </Alert>
          </section>

          {/* Section 6: Tools and Features */}
          <section id="verktyg" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">6. Verktyg och funktioner</h2>
            
            <p className="text-lg">
              Vår plattform erbjuder flera avancerade verktyg för att hjälpa dig förstå och använda E-ämnesinformation:
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    ADI-kalkylator
                  </CardTitle>
                  <CardDescription>
                    Beräkna säker daglig dos baserat på din kroppsvikt och familjesituation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Funktioner:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Individuell dosberäkning</li>
                        <li>• Familjekalkylator för flera personer</li>
                        <li>• Säkerhetsmarginalanalys</li>
                        <li>• Varningar vid överdosering</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tillgänglig för:</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Alla E-ämnen med fastställda ADI-värden. Hitta ämnen med ADI-kalkylatorer genom att 
                        <Link to="/e-amnen/alla?adi=true" className="text-primary hover:underline"> filtrera efter ADI-värde</Link>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Datavisualisering
                  </CardTitle>
                  <CardDescription>
                    Interaktiva diagram och grafer för bättre förståelse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Våra visualiseringsverktyg inkluderar:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <RiskGauge score={6} size="md" />
                        <p className="text-sm mt-2">Riskgauges</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <BarChart3 className="h-8 w-8 mx-auto text-primary" />
                        <p className="text-sm mt-2">Kategorigrafer</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Microscope className="h-8 w-8 mx-auto text-primary" />
                        <p className="text-sm mt-2">ADI-diagram</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Jämförelseverktyg
                  </CardTitle>
                  <CardDescription>
                    Jämför olika E-ämnen sida vid sida för bättre beslut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Använd vårt jämförelseverktyg för att ställa E-ämnen mot varandra och se skillnader i:
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1">
                      <li>• Risknivåer</li>
                      <li>• ADI-värden</li>
                      <li>• Ursprung (naturligt/syntetiskt)</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Hälsoeffekter</li>
                      <li>• Användningsområden</li>
                      <li>• Alternativ</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link to="/e-amnen/alla">Testa jämförelseverktyget</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 7: Common E-additives */}
          <section id="vanliga-eamnen" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">7. Vanliga E-ämnen du bör känna till</h2>
            
            <p className="text-lg">
              Här är några av de mest förekommande E-ämnena i våra livsmedel, från säkra naturliga ämnen 
              till de som kräver mer försiktighet:
            </p>

            {commonAdditives.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commonAdditives.map((additive) => (
                    <EAdditiveCard key={additive.id} additive={additive} variant="detailed" />
                  ))}
                </div>
                
                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link to="/e-amnen/alla">
                      Utforska alla {additives.length}+ E-ämnen i vår databas →
                    </Link>
                  </Button>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">✓ Rekommenderade E-ämnen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Link to="/e-amnen/e300" className="block p-2 rounded hover:bg-muted">
                      <strong>E300 (Askorbinsyra)</strong> - Vitamin C, naturlig antioxidant
                    </Link>
                    <Link to="/e-amnen/e160a" className="block p-2 rounded hover:bg-muted">
                      <strong>E160a (Beta-karoten)</strong> - Naturlig orange färg, provitamin A
                    </Link>
                    <Link to="/e-amnen/e306" className="block p-2 rounded hover:bg-muted">
                      <strong>E306 (Tokoferol)</strong> - Vitamin E, naturlig konservering
                    </Link>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla?risk=low">Se alla rekommenderade</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">⚠ E-ämnen att begränsa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Link to="/e-amnen/e102" className="block p-2 rounded hover:bg-muted">
                      <strong>E102 (Tartrazin)</strong> - Kan orsaka allergiska reaktioner
                    </Link>
                    <Link to="/e-amnen/e211" className="block p-2 rounded hover:bg-muted">
                      <strong>E211 (Natriumbensoat)</strong> - Kan bilda bensen i kombination med C-vitamin
                    </Link>
                    <Link to="/e-amnen/e621" className="block p-2 rounded hover:bg-muted">
                      <strong>E621 (Natriumglutamat)</strong> - Kan orsaka huvudvärk hos känsliga
                    </Link>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/e-amnen/alla?risk=high">Se alla högriskämnen</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Frequently Asked Questions Section */}
          <section id="faq" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2 flex items-center gap-2">
              <HelpCircle className="h-7 w-7" />
              Vanliga frågor om E-ämnen
            </h2>
            
            <p className="text-lg">
              Här svarar vi på de mest frekventa frågorna om E-ämnen och livsmedelstillsatser:
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="faq-item">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Fact Box */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
                <Star className="h-5 w-5" />
                Fakta: Säkerhetstestning av E-ämnen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700 dark:text-blue-300">
                <div className="text-center">
                  <div className="text-2xl font-bold">100x</div>
                  <div>Säkerhetsfaktor minimum</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10+</div>
                  <div>År av studier före godkännande</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">27</div>
                  <div>EU-länder med samma standard</div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced HowTo Section */}
          <section id="anvand-databasen-guide" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2 flex items-center gap-2">
              <Target className="h-7 w-7" />
              Steg-för-steg: Använd E-ämnesdatabasen effektivt
            </h2>
            
            <p className="text-lg">
              Följ denna guide för att maximera nyttan av vår E-ämnesdatabas och verktyg:
            </p>

            <div className="space-y-6">
              {howToSteps.map((step, index) => (
                <Card key={index} className="how-to-step">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">
                        {index + 1}
                      </div>
                      {step.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pro Tips Fact Box */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-green-800 dark:text-green-200">
                <Lightbulb className="h-5 w-5" />
                Pro-tips för experter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-300">
                <ul className="space-y-2">
                  <li>• Använd filtrera för att hitta alternativ till högriskämnen</li>
                  <li>• Spara jämförelser för framtida referens</li>
                  <li>• Sätt upp notiser för nya forskningsuppdateringar</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Kombinera ADI-beräkningar för flera ämnen</li>
                  <li>• Använd kategorifilter för målad sökning</li>
                  <li>• Exportera data för vidare analys</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Tips and Advice */}
          <section id="tips-rad" className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2">8. Praktiska tips och råd</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Säker användning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li>• Läs alltid innehållsförteckningar noggrant</li>
                    <li>• Använd vår <Link to="/e-amnen" className="text-primary hover:underline">sökfunktion</Link> för okända E-nummer</li>
                    <li>• Begränsa produkter med många E-ämnen</li>
                    <li>• Välj ekologiska alternativ när möjligt</li>
                    <li>• Beräkna din ADI med våra kalkylatorer</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    För känsliga grupper
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Barn:</strong> Extra försiktighet med <Link to="/e-amnen/alla?risk=high" className="text-primary hover:underline">högriskämnen</Link></li>
                    <li>• <strong>Gravida:</strong> Undvik diskutabla ämnen helt</li>
                    <li>• <strong>Allergiker:</strong> Kontrollera korsreaktioner</li>
                    <li>• <strong>Astmatiker:</strong> Var försiktig med <Link to="/e-amnen/kategori/konserveringsmedel" className="text-primary hover:underline">konserveringsmedel</Link></li>
                    <li>• <strong>ADHD:</strong> Begränsa vissa <Link to="/e-amnen/kategori/färgämnen" className="text-primary hover:underline">färgämnen</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Smarta val i butik
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li>• Använd vår app för realtidskontroll</li>
                    <li>• Jämför liknande produkter</li>
                    <li>• Prioritera kortare innehållsförteckningar</li>
                    <li>• Leta efter naturliga alternativ</li>
                    <li>• Spara favoritprodukter för snabb åtkomst</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link to="/">Prova vår shoppinglista</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Microscope className="h-5 w-5 text-blue-600" />
                    Fortsatt lärande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    <li>• Följ uppdateringar från <Link to="/kallor" className="text-primary hover:underline">våra källor</Link></li>
                    <li>• Läs vetenskaplig forskning regelbundet</li>
                    <li>• Delta i diskussioner om livsmedelssäkerhet</li>
                    <li>• Utforska <Link to="/e-amnen/alla" className="text-primary hover:underline">nya E-ämnen</Link> som tillkommer</li>
                    <li>• Dela kunskap med familj och vänner</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Kom ihåg:</strong> Målet är inte att undvika alla E-ämnen, utan att göra medvetna val 
                baserat på vetenskaplig information. Många E-ämnen är säkra och nödvändiga för livsmedelssäkerhet.
              </AlertDescription>
            </Alert>
          </section>

          {/* Inline Ad */}
          <AffiliateAdsSection variant="inline" className="my-8" />

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl text-center space-y-4">
            <h2 className="text-2xl font-bold">Börja utforska E-ämnens värld idag</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Med vår omfattande databas och avancerade verktyg kan du göra välgrundade beslut 
              om livsmedelstillsatser. Upptäck, jämför och lär dig mer om de E-ämnen som påverkar din hälsa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/e-amnen">Utforska E-ämnesdatabasen</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/e-amnen/alla">Se alla E-ämnen</Link>
              </Button>
            </div>
          </section>

          {/* Footer Ad */}
          <AffiliateAdsSection variant="footer" className="my-8" />

          {/* Footer Navigation */}
          <nav className="border-t pt-8">
            <h3 className="font-semibold mb-4">Relaterade sidor:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link to="/e-amnen" className="text-primary hover:underline">E-ämnen startsida</Link>
              <Link to="/e-amnen/alla" className="text-primary hover:underline">Alla E-ämnen</Link>
              <Link to="/livsmedel" className="text-primary hover:underline">Livsmedel</Link>
              <Link to="/kallor" className="text-primary hover:underline">Källor</Link>
              <Link to="/e-amnen/kategori/färgämnen" className="text-primary hover:underline">Färgämnen</Link>
              <Link to="/e-amnen/kategori/konserveringsmedel" className="text-primary hover:underline">Konserveringsmedel</Link>
              <Link to="/e-amnen/kategori/antioxidanter" className="text-primary hover:underline">Antioxidanter</Link>
              <Link to="/integritet" className="text-primary hover:underline">Integritetspolicy</Link>
            </div>
          </nav>
        </article>
      </Layout>
    </ErrorBoundary>
  );
};

export default EAdditiveGuide;