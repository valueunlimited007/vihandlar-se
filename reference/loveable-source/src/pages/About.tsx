import { Layout } from '@/components/Layout';
import { ShoppingCart, Users, Zap, Smartphone, Shield, Heart, Mic, Vibrate, ArrowUpDown, Scan, Apple, Search, BookOpen, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { createOrganizationSchema, createBreadcrumbSchema } from '@/utils/schemaMarkup';

const About = () => {
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { createList } = useShoppingList();

  const handleCreateList = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const list = await createList('Min lista');
      if (list) {
        navigate(`/list/${list.share_token}`);
      }
    } finally {
      setCreating(false);
    }
  };

  // SEO Schema Data
  const schemaData = [
    createOrganizationSchema(),
    createBreadcrumbSchema([
      { name: "Hem", url: "https://vihandlar.se/" },
      { name: "Om ViHandlar", url: "https://vihandlar.se/om" }
    ])
  ];

  return (
    <Layout>
        <SEO 
          title="Om ViHandlar - Smart mathandel med E-ämnesscanning & näringsguider"
          description="ViHandlar erbjuder smarta inköpslistor, E-ämnesscanner, komplett livsmedelsguide och produktjämförelse. Gör din mathandel enklare och hälsosammare."
          keywords="om vihandlar, e-ämnesscanner, livsmedelsguide, svensk inköpslista app, produktjämförelse, näringsinnehåll, smart mathandel"
          canonical="https://vihandlar.se/om"
          focusKeyword="om vihandlar"
          schemaData={schemaData}
        />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Om ViHandlar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vi skapar moderna verktyg som förenklar vardagen. ViHandlar började som 
            en inköpslista online som familjer faktiskt vill använda – och har nu vuxit till en komplett plattform för smartare matval.
          </p>
          <p className="text-lg text-muted-foreground/80 mt-4 italic">
            "Ska vi handla? Ja, ViHandlar.se"
          </p>
        </div>

        {/* Services Overview - New Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-center mb-4">Våra tjänster</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Från smarta inköpslistor till E-ämnesscanning och näringsguider – allt för att göra din mathandel enklare och hälsosammare.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smarta Inköpslistor</CardTitle>
                <CardDescription>
                  Dela inköpslistor i realtid med familjen. Ingen app krävs – fungerar direkt i webbläsaren.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/">Skapa lista →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Produktsök</CardTitle>
                <CardDescription>
                  Hitta bäst pris på 7000+ produkter från svenska butiker. Jämför priser och handla smart.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/shopping">Handla Mat →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Scan className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">E-ämnes Scanner</CardTitle>
                <CardDescription>
                  Scanna eller fotografera ingredienslistor och få direkt information om alla E-ämnen och deras hälsoeffekter.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/e-amnen/scanner">Scanna nu →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">E-ämnes Guide</CardTitle>
                <CardDescription>
                  Komplett databas med detaljerad information om E-ämnen, risker, ADI-värden och naturliga alternativ.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/e-amnen">Utforska guide →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-success/20 hover:border-success/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Apple className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl">Livsmedelsguide</CardTitle>
                <CardDescription>
                  Upptäck näringsinnehåll, förvaring, hållbarhet och hälsoeffekter för 2500+ livsmedel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/livsmedel">Sök livsmedel →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-muted hover:border-muted-foreground/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <List className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">Offentliga Listor</CardTitle>
                <CardDescription>
                  Färdiga inköpslistor för olika ändamål – från veckohandling till specialkost.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/listor">Se listor →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">Vårt uppdrag</h2>
            <p className="text-muted-foreground mb-4">
              Att handla mat tillsammans ska vara enkelt och roligt, inte frustrerande. 
              Vi såg hur familjer slösade tid på att skicka SMS-listor fram och tillbaka, 
              missa varor och handla dubbelt.
            </p>
            <p className="text-muted-foreground">
              ViHandlar löser detta genom att låta alla i familjen samarbeta på samma lista i realtid. 
              Ingen krånglig app-installation eller registrering – bara dela inköpslista och börja handla tillsammans.
            </p>
          </div>
          <div className="bg-muted/30 rounded-2xl p-6">
            <h3 className="font-medium mb-4">Varför ViHandlar?</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Byggd av en familj som förstår problemet</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Fokus på enkelhet och hastighet</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Respekterar din integritet och data</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">
            Modern teknik för enkel användning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Mobilförst</h3>
              <p className="text-sm text-muted-foreground">
                Designad för telefonen först, men fungerar lika bra på surfplatta och dator.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Realtid</h3>
              <p className="text-sm text-muted-foreground">
                Alla ändringar syns omedelbart för alla som har listan öppen.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Ingen app krävs</h3>
              <p className="text-sm text-muted-foreground">
                Fungerar direkt i webbläsaren. Mottagaren behöver inte skapa konto.
              </p>
            </div>
          </div>
        </div>

        {/* Features Deep Dive */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8">Funktioner som gör skillnad</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Röstinmatning med AI</h3>
                <p className="text-muted-foreground">
                  Säg namnet på varan så läggs den till automatiskt. Använder OpenAI Whisper för perfekt svensk igenkänning.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Delning utan registrering</h3>
                <p className="text-muted-foreground mb-3">
                  Beständiga länkar som aldrig "dör". Den som får länken kan direkt börja lägga till varor utan att skapa konto.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Dela via:</strong> SMS, WhatsApp, Messenger, iMessage, e-post, Slack eller var som helst där du kan skicka en länk.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Realtidsuppdatering</h3>
                <p className="text-muted-foreground">
                  Alla ändringar syns direkt för alla som har listan. Bocka av medan du handlar!
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <ArrowUpDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Smart Sortering</h3>
                <p className="text-muted-foreground">
                  Automatisk organisering av varor efter kategorier för effektivare shopping.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Vibrate className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Haptisk Feedback</h3>
                <p className="text-muted-foreground">
                  Känslomässig återkoppling genom vibration på mobil för bättre användarupplevelse.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Säker och privat</h3>
                <p className="text-muted-foreground">
                  Din data behandlas säkert och vi spårar inte vad du handlar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-center mb-4">Vanliga frågor</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Svar på de vanligaste frågorna om ViHandlar och våra tjänster.
          </p>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Behöver jag registrera mig för att använda ViHandlar?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nej! Du kan börja använda ViHandlar direkt utan registrering. Skapa en lista och dela länken med vem du vill. Mottagaren behöver inte heller skapa konto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Är ViHandlar gratis?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja, alla grundfunktioner är helt gratis. Du kan skapa obegränsat antal listor, dela dem med vem du vill och använda alla funktioner utan kostnad.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hur fungerar E-ämnesscannern?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ta ett foto av ingredienslistan på en produkt eller skriv in E-numren manuellt. Scannern identifierar alla E-ämnen och ger dig detaljerad information om risker, hälsoeffekter och ADI-värden direkt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Varifrån kommer produktpriserna?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vi hämtar priser från svenska nätbutiker som Delitea och andra partners. Priserna uppdateras regelbundet för att ge dig aktuell information när du söker produkter.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hur exakt är näringsdata för livsmedel?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vår livsmedelsdata kommer från Livsmedelsverket och andra pålitliga källor. Vi uppdaterar databasen löpande med över 2500+ livsmedel och deras näringsinnehåll.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kan flera personer redigera samma lista samtidigt?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja! Det är precis därför vi byggde ViHandlar. Alla som har länken kan lägga till, bocka av och ta bort varor. Allt synkas i realtid så alla ser samma lista direkt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fungerar ViHandlar på mobilen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolut! ViHandlar är designat mobilförst och fungerar perfekt på alla smartphones och surfplattor. Ingen app behövs - det fungerar direkt i webbläsaren.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Är mina listor privata?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja, dina listor är helt privata. Endast de som har den unika länken kan se och redigera listan. Vi spårar inte vad du handlar och säljer aldrig din data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Redo att förenkla er mathandel?
          </h2>
          <p className="text-muted-foreground mb-6">
            Skapa din första lista och upplev skillnaden direkt.
          </p>
          <Button size="lg" onClick={handleCreateList} disabled={creating}>
            {creating ? 'Skapar lista...' : 'Skapa lista →'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;