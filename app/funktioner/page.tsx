import type { Metadata } from "next";
import Link from "next/link";
import {
  Mic,
  Users,
  Zap,
  Smartphone,
  Shield,
  Clock,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title:
    "Funktioner - Allt du behöver veta om ViHandlars inköpslista",
  description:
    "Upptäck alla funktioner i ViHandlar: röstinmatning med AI, realtidsdelning, smart sortering och mycket mer. Perfekt för moderna familjer.",
  alternates: {
    canonical: "https://vihandlar.se/funktioner",
  },
  openGraph: {
    title: "Funktioner - ViHandlar",
    description:
      "Röstinmatning med AI, realtidsdelning, smart sortering och mer.",
    url: "https://vihandlar.se/funktioner",
  },
};

const features = [
  {
    icon: Mic,
    title: "Röstinmatning med AI",
    description:
      "Säg namnet på varan så läggs den till automatiskt. Använder OpenAI Whisper för perfekt svensk igenkänning.",
    details: [
      "Optimerad för svenska med Whisper AI",
      "Smart filtrering av irrelevant innehåll",
      "Fungerar även i bullriga miljöer",
    ],
  },
  {
    icon: Users,
    title: "Delning utan registrering",
    description:
      'Beständiga länkar som aldrig "dör". Den som får länken kan direkt börja lägga till varor utan att skapa konto.',
    details: [
      "Permanenta länkar som fungerar för alltid",
      "Ingen registrering behövs för mottagaren",
      'Fungerar även om skaparen "tappar bort" listan',
    ],
  },
  {
    icon: Zap,
    title: "Realtidsuppdatering",
    description:
      "Alla ändringar syns direkt för alla som har listan. Bocka av medan du handlar!",
    details: [
      "Ser ändringar inom sekunder",
      "Undvik dubbelköp",
      "Följ framstegen i butiken",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobiloptimerad",
    description:
      "Designad för telefonen först, men fungerar lika bra på surfplatta och dator.",
    details: [
      "Snabb och responsiv",
      "Stor text som är lätt att läsa",
      "Fungerar offline grundläggande",
    ],
  },
  {
    icon: Shield,
    title: "Säker och privat",
    description:
      "Din data behandlas säkert och vi spårar inte vad du handlar.",
    details: [
      "Krypterad dataöverföring",
      "Ingen reklam eller spårning",
      "Du äger din data",
    ],
  },
  {
    icon: Clock,
    title: "Alltid tillgänglig",
    description:
      "Fungerar 24/7 utan nedtid. Listor sparas säkert i molnet.",
    details: [
      "99.9% tillgänglighet",
      "Automatisk backup",
      "Snabb global åtkomst",
    ],
  },
  {
    icon: Smartphone,
    title: "PWA-funktionalitet",
    description:
      "Installera ViHandlar som app på hemskärmen. Fungerar offline och ger appliknande upplevelse.",
    details: [
      "Installera direkt från webbläsaren",
      "Fungerar offline för grundläggande funktioner",
      "Snabb start utan appbutik",
    ],
  },
  {
    icon: ArrowUpDown,
    title: "Smart Sortering",
    description:
      "Automatisk organisering av varor efter kategorier för effektivare shopping.",
    details: [
      "Kategoriserar automatiskt",
      "Lär sig dina vanor",
      "Optimerar handlingsrutten",
    ],
  },
];

export default function FunktionerPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Funktioner som förenklar inköpen
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          ViHandlar är byggt för att göra mathandeln smidigare för hela
          familjen. Upptäck alla sätt som ViHandlar kan förbättra er vardag.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Så här enkelt fungerar det
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="font-semibold mb-2">Skapa lista</h3>
            <p className="text-muted-foreground text-sm">
              Gå till ViHandlar.se och skapa en ny inköpslista online med ett
              namn som passar er.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              2
            </div>
            <h3 className="font-semibold mb-2">Dela länken</h3>
            <p className="text-muted-foreground text-sm">
              Skicka beständiga delningslänken som fungerar för alltid. Även om
              familjen &quot;tappar bort&quot; listan kan alla med länken
              fortfarande använda den.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              3
            </div>
            <h3 className="font-semibold mb-2">Handla tillsammans</h3>
            <p className="text-muted-foreground text-sm">
              Alla kan lägga till varor och bocka av när de är inhandlade. Allt
              synkas i realtid!
            </p>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-muted/30 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Har du tips på funktioner?
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Vi utvecklar ständigt ViHandlar baserat på användarfeedback. Dela dina
          idéer med oss!
        </p>
        <div className="text-center">
          <a
            href="mailto:hej@vihandlar.se?subject=Tips%20f%C3%B6r%20ViHandlar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
          >
            Skicka tips till hej@vihandlar.se
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Redo att börja handla tillsammans?
        </h2>
        <p className="text-muted-foreground mb-6">
          Skapa din första delade inköpslista online.
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
