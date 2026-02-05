import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Globe, 
  Database, 
  Scan, 
  ShoppingCart,
  Map,
  Bot,
  Search,
  List,
  Zap
} from 'lucide-react';
import { AIOptimizedHomepageFactBox } from '@/components/AIOptimizedHomepageFactBox';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import SitemapSection from '@/components/sitemap/SitemapSection';
import AlphabetGrid from '@/components/sitemap/AlphabetGrid';
import EAdditiveGrid from '@/components/sitemap/EAdditiveGrid';
import PublicListsSection from '@/components/sitemap/PublicListsSection';
import { SitemapSearch } from '@/components/sitemap/SitemapSearch';
import { usePublicLists } from '@/hooks/usePublicLists';

interface SitemapSectionType {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: SitemapLink[];
}

interface SitemapLink {
  name: string;
  url: string;
  description?: string;
  lastModified?: string;
  priority?: 'high' | 'medium' | 'low';
  external?: boolean;
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Pre-defined static data to avoid recreation on every render
const MAIN_SECTIONS: SitemapSectionType[] = [
    {
      title: "Huvudnavigation",
      description: "De viktigaste sidorna för snabb tillgång",
      icon: <Globe className="h-5 w-5" />,
      links: [
        {
          name: "Hem",
          url: "/",
          description: "Kom igång med smarta inköpslistor och realtidssynkronisering",
          priority: "high",
          lastModified: "2025-01-17"
        },
        {
          name: "Funktioner",
          url: "/funktioner", 
          description: "Se alla funktioner som gör mathandling enklare",
          priority: "high"
        },
        {
          name: "Om ViHandlar",
          url: "/om",
          description: "Vår vision om medveten konsumtion",
          priority: "medium"
        },
        {
          name: "Integritetspolicy",
          url: "/integritet",
          description: "Så skyddar vi din integritet",
          priority: "medium"
        }
      ]
    },
    {
      title: "Inköpslistor",
      description: "Samarbeta i realtid med familj och vänner",
      icon: <List className="h-5 w-5" />,
      links: [
        {
          name: "Inköpslista Guide",
          url: "/inkopslista",
          description: "Lär dig skapa och dela smarta inköpslistor",
          priority: "high"
        },
        {
          name: "Offentliga Listor",
          url: "/listor",
          description: "Använd färdiga mallar för vanliga inköp",
          priority: "high"
        }
      ]
    },
    {
      title: "Livsmedel & Näring",
      description: "Näringsdata och hälsoeffekter för 2500+ livsmedel",
      icon: <Database className="h-5 w-5" />,
      links: [
        {
          name: "Livsmedel A-Ö",
          url: "/livsmedel",
          description: "Upptäck kalorier, vitaminer och mineraler",
          priority: "high"
        },
        {
          name: "Källor & Referenser", 
          url: "/kallor",
          description: "Vetenskapliga källor bakom vår data",
          priority: "medium"
        }
      ]
    },
    {
      title: "E-ämnen & Säkerhet",
      description: "Detaljerad information om 354 livsmedelstillsatser",
      icon: <Scan className="h-5 w-5" />,
      links: [
        {
          name: "E-ämnen Hub",
          url: "/e-amnen", 
          description: "Utforska E-ämnen och deras hälsoeffekter",
          priority: "high"
        },
        {
          name: "E-ämnen Guide",
          url: "/e-amnen/guide",
          description: "Lär dig tolka ingredienslistor",
          priority: "high"
        },
        {
          name: "E-ämnen Scanner",
          url: "/e-amnen/scanner",
          description: "Ta foto och analysera ingredienser direkt",
          priority: "high"
        },
        {
          name: "Alla E-ämnen A-Ö",
          url: "/e-amnen/alla",
          description: "Komplett databas med riskbedömningar",
          priority: "high"
        }
      ]
    },
    {
      title: "Shopping & Produkter",
      description: "Hitta bäst pris på 7000+ produkter från svenska butiker",
      icon: <ShoppingCart className="h-5 w-5" />,
      links: [
        {
          name: "Shopping Hub",
          url: "/shopping",
          description: "Jämför priser och hitta erbjudanden",
          priority: "high"
        },
        {
          name: "Delitea Butik",
          url: "/shopping/delitea",
          description: "Kvalitetsprodukter från Delitea.se",
          priority: "high"
        },
        {
          name: "Bläddra A-Ö",
          url: "/shopping/produkter",
          description: "Hitta produkter alfabetiskt",
          priority: "high"
        },
        {
          name: "Produktkategorier",
          url: "/shopping/kategorier",
          description: "Shoppa efter kategori",
          priority: "high"
        }
      ]
    }
  ];

// Pre-defined technical links to avoid recreation
const TECHNICAL_LINKS: SitemapLink[] = [
    {
      name: "Sitemap XML",
      url: "https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/sitemap",
      description: "Maskinläsbar XML-sitemap för sökmotorer",
      external: true,
      priority: "medium"
    },
    {
      name: "Robots.txt",
      url: "https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/robots", 
      description: "Instruktioner för sökrobotar och crawlers",
      external: true,
      priority: "low"
    },
    {
      name: "LLMs.txt (AI)",
      url: "/llms.txt",
      description: "AI-optimerad metadata för stora språkmodeller",
      external: true,
      priority: "high"
    },
    {
      name: "LLMs.txt English",
      url: "/llms.en.txt",
      description: "English version of AI metadata",
      external: true,
      priority: "medium"
    },
    {
      name: "Security.txt", 
      url: "/.well-known/security.txt",
      description: "Säkerhetsinformation och kontaktuppgifter",
      external: true,
      priority: "low"
    },
    {
      name: "Health Check",
      url: "https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/health",
      description: "Systemhälsa och API-status",
      external: true,
      priority: "medium"
    },
    {
      name: "Public Lists API",
      url: "https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/lists", 
      description: "JSON API för offentliga inköpslistor",
      external: true,
      priority: "medium"
    },
    {
      name: "AI Knowledge API",
      url: "https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/llms",
      description: "AI-system integration endpoint",
      external: true,
      priority: "high"
    }
  ];

const DynamicSitemap = memo(() => {
  const { fetchState, handleRetry } = usePublicLists();

  // Flatten all links for search functionality
  const allSearchableLinks = useMemo(() => {
    const links: Array<{ name: string; url: string; description?: string; category: string }> = [];
    
    MAIN_SECTIONS.forEach(section => {
      section.links.forEach(link => {
        links.push({
          name: link.name,
          url: link.url,
          description: link.description,
          category: section.title
        });
      });
    });
    
    return links;
  }, []);

  return (
    <Layout>
      <AIOptimizedHomepageFactBox />
      <SEO
        title="Sajtkarta - ViHandlar | Hitta allt innehåll på en plats"
        description="Komplett sajtkarta för ViHandlar med alla sidor, API-endpoints, tekniska resurser och AI-optimerade länkar. Perfekt för navigation och SEO."
        keywords="sajtkarta, sitemap, navigation, ViHandlar innehåll, API endpoints, tekniska resurser, AI metadata"
        canonical="https://vihandlar.se/sajtkarta"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebPage", 
          "name": "ViHandlar Sajtkarta",
          "description": "Komplett överblick över allt innehåll på ViHandlar",
          "url": "https://vihandlar.se/sajtkarta",
          "mainContentOfPage": {
            "@type": "WebPageElement",
            "cssSelector": "main"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Hem",
                "item": "https://vihandlar.se"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Sajtkarta",
                "item": "https://vihandlar.se/sajtkarta"
              }
            ]
          }
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Map className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sajtkarta
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Navigera enkelt genom allt innehåll på ViHandlar. Använd sökfunktionen eller bläddra genom kategorierna nedan.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <Database className="h-4 w-4 mr-1" />
              2500+ Livsmedel
            </Badge>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <Scan className="h-4 w-4 mr-1" />
              354 E-ämnen
            </Badge>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <ShoppingCart className="h-4 w-4 mr-1" />
              7000+ Produkter
            </Badge>
          </div>
        </div>

        {/* Search */}
        <SitemapSearch allLinks={allSearchableLinks} />

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Snabblänkar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              to="/inkopslista" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <List className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Skapa Inköpslista</h3>
              <p className="text-sm text-muted-foreground">Kom igång med smarta, delade listor</p>
            </Link>
            <Link 
              to="/e-amnen/scanner" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Scan className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Scanna E-ämnen</h3>
              <p className="text-sm text-muted-foreground">Analysera ingredienser med kameran</p>
            </Link>
            <Link 
              to="/livsmedel" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Database className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Sök Livsmedel</h3>
              <p className="text-sm text-muted-foreground">Hitta näringsdata för alla livsmedel</p>
            </Link>
            <Link 
              to="/shopping" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <ShoppingCart className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Handla Mat Online</h3>
              <p className="text-sm text-muted-foreground">Jämför priser från svenska butiker</p>
            </Link>
            <Link 
              to="/listor" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <List className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Offentliga Listor</h3>
              <p className="text-sm text-muted-foreground">Använd färdiga mallar</p>
            </Link>
            <Link 
              to="/e-amnen/guide" 
              onClick={scrollToTop}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Scan className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">E-ämnen Guide</h3>
              <p className="text-sm text-muted-foreground">Lär dig om livsmedelstillsatser</p>
            </Link>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Main Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Alla Sidor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {MAIN_SECTIONS.map((section, index) => (
              <SitemapSection
                key={index}
                title={section.title}
                description={section.description}
                icon={section.icon}
                links={section.links}
              />
            ))}
          </div>
        </div>


        {/* Public Lists Section - Hidden until shopping list functionality is implemented
        <ErrorBoundary fallback={
          <PublicListsSection 
            fetchState={{ loading: false, error: "Kunde inte ladda listor", data: [] }}
            onRetry={() => {}}
          />
        }>
          <PublicListsSection fetchState={fetchState} onRetry={handleRetry} />
        </ErrorBoundary>
        */}

        <Separator className="my-12" />

        {/* Detailed Category Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Bläddra efter Kategori</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlphabetGrid />
            <EAdditiveGrid />
          </div>
        </div>

        <Separator className="my-12" />

        {/* Technical & AI Resources */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Tekniska Resurser för Utvecklare
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              API-endpoints och maskinläsbar metadata
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECHNICAL_LINKS.map((link, index) => (
                <div key={index} className="group border-2 border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <div className="flex-1">
                    {link.external ? (
                      <a
                        href={link.url.startsWith('http') ? link.url : `https://vihandlar.se${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-semibold text-primary hover:underline flex items-center gap-2"
                      >
                        {link.name}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="font-semibold text-primary hover:underline"
                        onClick={scrollToTop}
                      >
                        {link.name}
                      </Link>
                    )}
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI and GEO Information */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI & GEO-Optimering
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                ViHandlar är optimerat för Generative Engine Optimization (GEO) och AI-system med strukturerad data, 
                citation-vänlig formatering och maskinläsbar metadata.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>✅ Schema.org JSON-LD markup</div>
                <div>✅ AI-extractable fact boxes</div>
                <div>✅ Citation timestamps</div>
                <div>✅ Conversational query optimization</div>
                <div>✅ Multi-modal content support</div>
                <div>✅ Real-time data freshness indicators</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer call-to-action */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl border-2 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Börja använda ViHandlar idag</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gör mathandling smartare med delade inköpslistor, näringsanalys och E-ämnesscanning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="shadow-lg">
              <Link to="/" onClick={scrollToTop}>
                Kom igång gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/funktioner" onClick={scrollToTop}>
                Se alla funktioner
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
});

DynamicSitemap.displayName = 'DynamicSitemap';

export default DynamicSitemap;