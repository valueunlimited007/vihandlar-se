import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingCart,
  Users,
  Zap,
  Smartphone,
  Shield,
  Heart,
  Mic,
  ArrowUpDown,
  Scan,
  Search,
  BookOpen,
  List,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Om ViHandlar - Smart mathandel med E-ämnesscanning & näringsguider",
  description:
    "ViHandlar erbjuder smarta inköpslistor, E-ämnesscanner, komplett livsmedelsguide och produktjämförelse. Gör din mathandel enklare och hälsosammare.",
  alternates: {
    canonical: "https://vihandlar.se/om",
  },
  openGraph: {
    title: "Om ViHandlar - Smart mathandel",
    description:
      "Smarta inköpslistor, E-ämnesscanner och livsmedelsguide.",
    url: "https://vihandlar.se/om",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Om ViHandlar",
  url: "https://vihandlar.se/om",
  description: "ViHandlar är Sveriges smartaste matplattform med E-nummerskanner, delade inköpslistor och produktjämförelse.",
  inLanguage: "sv-SE",
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Hem", url: "https://vihandlar.se" },
  { name: "Om ViHandlar", url: "https://vihandlar.se/om" },
]);

export default function OmPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Om ViHandlar
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Vi skapar moderna verktyg som förenklar vardagen. ViHandlar började som
          en inköpslista online som familjer faktiskt vill använda – och har nu
          vuxit till en komplett plattform för smartare matval.
        </p>
        <p className="text-lg text-muted-foreground/80 mt-4 italic">
          &quot;Ska vi handla? Ja, ViHandlar.se&quot;
        </p>
      </div>

      {/* Services Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Våra tjänster
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Från smarta inköpslistor till E-ämnesscanning och näringsguider – allt
          för att göra din mathandel enklare och hälsosammare.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Smarta Inköpslistor
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dela inköpslistor i realtid med familjen. Ingen app krävs –
                fungerar direkt i webbläsaren.
              </p>
              <Link
                href="/inkopslista"
                className="text-sm text-primary hover:underline"
              >
                Skapa lista →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Produktsök</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hitta bäst pris på 7000+ produkter från svenska butiker. Jämför
                priser och handla smart.
              </p>
              <Link
                href="/handla"
                className="text-sm text-primary hover:underline"
              >
                Handla Mat →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Scan className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                E-ämnes Scanner
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scanna eller fotografera ingredienslistor och få direkt
                information om alla E-ämnen och deras hälsoeffekter.
              </p>
              <Link
                href="/skanner"
                className="text-sm text-primary hover:underline"
              >
                Scanna nu →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-ämnes Guide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Komplett databas med detaljerad information om E-ämnen, risker,
                ADI-värden och naturliga alternativ.
              </p>
              <Link
                href="/e-amnen"
                className="text-sm text-primary hover:underline"
              >
                Utforska guide →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livsmedelsguide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upptäck näringsinnehåll, förvaring, hållbarhet och hälsoeffekter
                för 2500+ livsmedel.
              </p>
              <Link
                href="/livsmedel"
                className="text-sm text-primary hover:underline"
              >
                Sök livsmedel →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                <List className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Offentliga Listor
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Färdiga inköpslistor för olika ändamål – från veckohandling till
                specialkost.
              </p>
              <Link
                href="/inkopslista"
                className="text-sm text-primary hover:underline"
              >
                Se listor →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Vårt uppdrag</h2>
          <p className="text-muted-foreground mb-4">
            Att handla mat tillsammans ska vara enkelt och roligt, inte
            frustrerande. Vi såg hur familjer slösade tid på att skicka
            SMS-listor fram och tillbaka, missa varor och handla dubbelt.
          </p>
          <p className="text-muted-foreground">
            ViHandlar löser detta genom att låta alla i familjen samarbeta på
            samma lista i realtid. Ingen krånglig app-installation eller
            registrering – bara dela inköpslista och börja handla tillsammans.
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
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Modern teknik för enkel användning
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Mobilförst</h3>
            <p className="text-sm text-muted-foreground">
              Designad för telefonen först, men fungerar lika bra på surfplatta
              och dator.
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
              Fungerar direkt i webbläsaren. Mottagaren behöver inte skapa
              konto.
            </p>
          </div>
        </div>
      </div>

      {/* Features Deep Dive */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">
          Funktioner som gör skillnad
        </h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mic className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Röstinmatning med AI</h3>
              <p className="text-muted-foreground">
                Säg namnet på varan så läggs den till automatiskt. Använder
                OpenAI Whisper för perfekt svensk igenkänning.
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
                Beständiga länkar som aldrig &quot;dör&quot;. Den som får länken
                kan direkt börja lägga till varor utan att skapa konto.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Dela via:</strong> SMS, WhatsApp, Messenger, iMessage,
                e-post, Slack eller var som helst där du kan skicka en länk.
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
                Alla ändringar syns direkt för alla som har listan. Bocka av
                medan du handlar!
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
                Automatisk organisering av varor efter kategorier för effektivare
                shopping.
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
        <h2 className="text-3xl font-semibold text-center mb-4">
          Vanliga frågor
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Svar på de vanligaste frågorna om ViHandlar och våra tjänster.
        </p>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              q: "Behöver jag registrera mig för att använda ViHandlar?",
              a: "Nej! Du kan börja använda ViHandlar direkt utan registrering. Skapa en lista och dela länken med vem du vill. Mottagaren behöver inte heller skapa konto.",
            },
            {
              q: "Är ViHandlar gratis?",
              a: "Ja, alla grundfunktioner är helt gratis. Du kan skapa obegränsat antal listor, dela dem med vem du vill och använda alla funktioner utan kostnad.",
            },
            {
              q: "Hur fungerar E-ämnesscannern?",
              a: "Ta ett foto av ingredienslistan på en produkt eller skriv in E-numren manuellt. Scannern identifierar alla E-ämnen och ger dig detaljerad information om risker, hälsoeffekter och ADI-värden direkt.",
            },
            {
              q: "Varifrån kommer produktpriserna?",
              a: "Vi hämtar priser från svenska nätbutiker som Delitea och andra partners. Priserna uppdateras regelbundet för att ge dig aktuell information när du söker produkter.",
            },
            {
              q: "Hur exakt är näringsdata för livsmedel?",
              a: "Vår livsmedelsdata kommer från Livsmedelsverket och andra pålitliga källor. Vi uppdaterar databasen löpande med över 2500+ livsmedel och deras näringsinnehåll.",
            },
            {
              q: "Kan flera personer redigera samma lista samtidigt?",
              a: "Ja! Det är precis därför vi byggde ViHandlar. Alla som har länken kan lägga till, bocka av och ta bort varor. Allt synkas i realtid så alla ser samma lista direkt.",
            },
            {
              q: "Fungerar ViHandlar på mobilen?",
              a: "Absolut! ViHandlar är designat mobilförst och fungerar perfekt på alla smartphones och surfplattor. Ingen app behövs - det fungerar direkt i webbläsaren.",
            },
            {
              q: "Är mina listor privata?",
              a: "Ja, dina listor är helt privata. Endast de som har den unika länken kan se och redigera listan. Vi spårar inte vad du handlar och säljer aldrig din data.",
            },
          ].map((faq) => (
            <Card key={faq.q}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/30 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Redo att förenkla er mathandel?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa din första lista och upplev skillnaden direkt.
        </p>
        <Link
          href="/inkopslista"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          Skapa lista →
        </Link>
      </div>
    </div>
  );
}
