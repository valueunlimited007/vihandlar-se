import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Scan, CheckCircle2, Users, TrendingDown, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingList } from '@/hooks/useShoppingList';
import { toast } from 'sonner';

const LandingPage = () => {
  const [listName, setListName] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { createList } = useShoppingList();

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) {
      toast.error('Ange ett namn för din lista');
      return;
    }
    
    setCreating(true);
    try {
      const list = await createList(listName);
      if (list?.share_token) {
        navigate(`/list/${list.share_token}`);
      }
    } catch (error) {
      toast.error('Kunde inte skapa listan. Försök igen.');
    } finally {
      setCreating(false);
    }
  };

  const stats = [
    { value: '10,000+', label: 'Inköpslistor' },
    { value: '7,709', label: 'Produkter' },
    { value: '650+', label: 'E-ämnen' },
    { value: '500+', label: 'Livsmedel' }
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ViHandlar.se',
    description: 'Din kompletta matassistent med delad inköpslista, prisjämförelse och E-ämnesscanner',
    url: 'https://vihandlar.se',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vihandlar.se/shopping?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Layout>
      <SEO
        title="ViHandlar.se - Smart Matassistent | Inköpslista, Prisjämförelse & E-ämnesscanner"
        description="Din kompletta matassistent. Dela inköpslistor i realtid, jämför priser på 7,709 produkter, och scanna E-ämnen direkt."
        keywords="inköpslista, delad inköpslista, prisjämförelse mat, e-ämnesscanner, handla mat online"
        schemaData={schemaData}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Sveriges smartaste matplattform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Din smarta matassistent
              <br />
              - allt på ett ställe
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Planera, handla smart och ät hälsosamt med Sveriges modernaste matplattform
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
              <Link to="/inkopslistor">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Skapa inköpslista
                </Button>
              </Link>
              <Link to="/shopping">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Package className="w-5 h-5 mr-2" />
                  Till shoppen
                </Button>
              </Link>
              <Link to="/e-amnen/scanner">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Scan className="w-5 h-5 mr-2" />
                  Scanna e-ämnen
                </Button>
              </Link>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Service 1: Delad Inköpslista */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingCart className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Delad Inköpslista</CardTitle>
              <CardDescription className="text-base">
                Skapa och dela inköpslistor som uppdateras live. Perfekt för familjer som handlar tillsammans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Realtidsuppdatering mellan alla enheter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Dela med QR-kod eller länk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Checka av när du handlar</span>
                </li>
              </ul>

              {/* Quick Create Form */}
              <form onSubmit={handleCreateList} className="space-y-3 pt-4 border-t">
                <Input
                  type="text"
                  placeholder="Min inköpslista..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  autoComplete="off"
                  className="w-full"
                  disabled={creating}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={creating}
                >
                  {creating ? 'Skapar...' : 'Skapa lista nu'}
                </Button>
                <Link to="/inkopslistor" className="block">
                  <Button variant="ghost" className="w-full text-sm">
                    Läs mer om inköpslistor →
                  </Button>
                </Link>
              </form>
            </CardContent>
          </Card>

          {/* Service 2: Handla Varor */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in animation-delay-100">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Handla Varor</CardTitle>
              <CardDescription className="text-base">
                Hitta bästa pris på matvaror från Delitea med fler butiker på väg.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Realtidspriser från Delitea (fler på väg)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Sök bland 7,709 produkter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Filtrera på kategori och butik</span>
                </li>
              </ul>

              <div className="pt-4 border-t">
                <Link to="/shopping">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    Börja handla
                  </Button>
                </Link>
                <Link to="/shopping" className="block mt-2">
                  <Button variant="ghost" className="w-full text-sm">
                    Se alla produkter →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Service 3: Scanna E-ämnen */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in animation-delay-200">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Scanna E-ämnen</CardTitle>
              <CardDescription className="text-base">
                Ta kort på ingredienslistor och få omedelbar analys av alla E-ämnen och deras hälsopåverkan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">AI-powered OCR scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">650+ E-ämnen i databasen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Riskbedömning och förklaring</span>
                </li>
              </ul>

              <div className="pt-4 border-t">
                <Link to="/e-amnen/scanner">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    Scanna nu
                  </Button>
                </Link>
                <Link to="/e-amnen" className="block mt-2">
                  <Button variant="ghost" className="w-full text-sm">
                    Utforska E-ämnen →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why ViHandlar Section */}
      <section className="bg-gradient-to-br from-muted/50 to-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Varför ViHandlar?</h2>
            <p className="text-lg text-muted-foreground">
              Allt du behöver för smartare matval och effektivare inköp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Smart & Hälsosamt</h3>
              <p className="text-muted-foreground">
                AI-driven analys av e-ämnen och näringsinnehåll för smartare matval
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Spara Pengar</h3>
              <p className="text-muted-foreground">
                Realtidspriser från Delitea och hitta bästa erbjudanden
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Dela med Familjen</h3>
              <p className="text-muted-foreground">
                Samarbeta i realtid på inköpslistor med hela familjen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Över 10,000 sökningar per månad
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">650+</div>
                <div className="text-sm text-muted-foreground">E-ämnen katalogiserade</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">7,709</div>
                <div className="text-sm text-muted-foreground">Produkter indexerade</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Inköpslistor skapade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-glow py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Redo att börja?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Välj vilken tjänst du vill börja med och upplev skillnaden med ViHandlar
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inkopslistor">
              <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Skapa inköpslista
              </Button>
            </Link>
            <Link to="/shopping">
              <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                <Package className="w-5 h-5 mr-2" />
                Handla varor
              </Button>
            </Link>
            <Link to="/e-amnen/scanner">
              <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                <Scan className="w-5 h-5 mr-2" />
                Scanna E-ämnen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
