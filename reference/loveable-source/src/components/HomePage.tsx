import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/useShoppingList";
import { toast } from "sonner";
import { ShoppingCart, List, Search, Package, BookOpen, Mic, Users, Zap, Plus } from "lucide-react";

const vihandlarLogo = '/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png';
import { AIOptimizedHomepageFactBox } from "./AIOptimizedHomepageFactBox";
import { ProductSearchHero } from "./ProductSearchHero";
import { createOrganizationSchema, createWebSiteSchema, createHowToSchema } from '@/utils/schemaMarkup';

export const HomePage = () => {
  const [listName, setListName] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { createList } = useShoppingList();

  // SEO Schema Data
  const schemaData = [
    createOrganizationSchema(),
    createWebSiteSchema(),
    createHowToSchema(
      "Skapa delad inköpslista online",
      [
        { name: "Skapa ny lista", text: "Klicka på 'Skapa lista' och ge din inköpslista ett namn" },
        { name: "Dela med familjen", text: "Kopiera länken och dela med familj och vänner" },
        { name: "Lägg till varor", text: "Alla kan nu lägga till varor i realtid med text eller röst" },
        { name: "Handla tillsammans", text: "Bocka av varor medan ni handlar och se uppdateringar direkt" }
      ]
    )
  ];

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) return;

    setCreating(true);
    try {
      const list = await createList(listName || 'Min lista');
      if (list) {
        navigate(`/list/${list.share_token}`);
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout>
      <AIOptimizedHomepageFactBox />
      <SEO
        title="ViHandlar - Delad Inköpslista Online | Skapa och Dela Inköpslistor Gratis"
        description="Sveriges smartaste delade inköpslista. Skapa, dela och handla tillsammans med familj och vänner. Gratis online inköpslista med röstinmatning och realtidsuppdateringar."
        keywords="delad inköpslista, online inköpslista, familjens inköpslista, handlingslista, röstinmatning shopping, realtid inköpslista, gratis handlingslista, dela inköpslista, handla tillsammans"
        canonical="https://vihandlar.se/"
        focusKeyword="delad inköpslista online"
        schemaData={schemaData}
      />
      {/* Mobile Design (preserved exactly as is) */}
      <div className="md:hidden min-h-[80vh] bg-gradient-to-br from-background to-muted/20">
        <div className="container max-w-md mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-primary mb-2">
              Dela inköpslista online i realtid med familjen
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Skapa och dela inköpslistor online med familj och vänner
            </p>
          </div>

          {/* Create List Form */}
          <div className="bg-card rounded-2xl p-6 border shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Skapa och dela en ny inköpslista</h2>
            <form onSubmit={handleCreateList} className="space-y-4">
              <Input
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="T.ex. Veckohandling, ICA-listan..."
                autoComplete="off"
                className="h-12"
              />
              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={creating}
              >
                {creating ? (
                  "Skapar lista..."
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Skapa lista
                  </>
                )}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-3">
              Du får en länk som du kan dela med andra för att handla tillsammans.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Röstinmatning med AI</h3>
                <p className="text-sm text-muted-foreground">
                  Säg namnet på varan så läggs den till automatiskt. Använder OpenAI Whisper för perfekt svensk igenkänning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Delning utan registrering</h3>
                <p className="text-sm text-muted-foreground">
                  Beständiga länkar som aldrig "dör". Den som får länken kan direkt börja lägga till varor utan att skapa konto.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Realtidsuppdatering</h3>
                <p className="text-sm text-muted-foreground">
                  Alla ändringar syns direkt för alla som har listan. Bocka av medan du handlar!
                </p>
              </div>
            </div>
          </div>

          {/* CTA to Features */}
          <div className="text-center mt-8">
            <Button variant="outline" asChild className="mb-6">
              <a href="/funktioner">
                Se alla funktioner
              </a>
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Smart inköpslista online med röstinmatning och realtidsdelning
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Design (modern and enhanced) */}
      <div className="hidden md:block min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight">
                    Dela inköpslista online i realtid
                    <span className="text-accent block">med familjen</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                    Skapa och dela inköpslistor online med familj och vänner
                  </p>
                </div>

                {/* Create List Form - Desktop */}
                <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border shadow-2xl max-w-lg">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Skapa och dela en ny inköpslista</h2>
                  <form onSubmit={handleCreateList} className="space-y-6">
                    <Input
                      value={listName}
                      onChange={(e) => setListName(e.target.value)}
                      placeholder="T.ex. Veckohandling, ICA-listan..."
                      className="h-14 text-lg rounded-xl"
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-xl rounded-xl hover-scale"
                      disabled={creating}
                    >
                      {creating ? (
                        "Skapar lista..."
                      ) : (
                        <>
                          <Plus className="w-6 h-6 mr-3" />
                          Skapa lista
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="text-center text-muted-foreground mt-4">
                    Du får en länk som du kan dela med andra för att handla tillsammans.
                  </p>
                </div>
              </div>

              {/* Right Column - Visual Element */}
              <div className="relative hidden lg:block">
                <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border">
                  <img 
                    src={vihandlarLogo} 
                    alt="ViHandlar - Delad inköpslista online" 
                    className="w-full max-w-md mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Desktop */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-6">
              Funktioner som gör skillnad
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upptäck varför tusentals familjer väljer ViHandlar för sina inköpslistor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-card/60 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Röstinmatning med AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                Säg namnet på varan så läggs den till automatiskt. Använder OpenAI Whisper för perfekt svensk igenkänning.
              </p>
            </div>

            <div className="group bg-card/60 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Delning utan registrering</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beständiga länkar som aldrig "dör". Den som får länken kan direkt börja lägga till varor utan att skapa konto.
              </p>
            </div>

            <div className="group bg-card/60 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Realtidsuppdatering</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alla ändringar syns direkt för alla som har listan. Bocka av medan du handlar!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section - Desktop */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
              Redo att börja handla smartare?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upptäck alla funktioner som gör ViHandlar till den ultimata inköpslistan för moderna familjer.
            </p>
            <Button variant="outline" size="lg" asChild className="hover-scale text-lg px-8 py-4">
              <a href="/funktioner">
                Se alla funktioner →
              </a>
            </Button>
          </div>
        </div>

        {/* Footer Section - Desktop */}
        <div className="border-t bg-muted/20 py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-lg text-muted-foreground">
              Smart inköpslista online med röstinmatning och realtidsdelning
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};