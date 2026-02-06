import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Källor och referenser - ViHandlar",
  description:
    "Alla källor och referenser som används för näringsdata och hälsoinformation på ViHandlar. Vetenskapligt underlag från Livsmedelsverket, USDA, Harvard och mer.",
  alternates: {
    canonical: "https://vihandlar.se/kallor",
  },
  openGraph: {
    title: "Källor och referenser - ViHandlar",
    description:
      "Vetenskapligt underlag från Livsmedelsverket, USDA, Harvard och mer.",
    url: "https://vihandlar.se/kallor",
  },
};

const sources = [
  {
    name: "Livsmedelsverket",
    description:
      "Sveriges officiella myndighet för livsmedelssäkerhet och näring",
    url: "https://www.livsmedelsverket.se",
    type: "Officiell myndighet",
  },
  {
    name: "USDA FoodData Central",
    description:
      "USA:s officiella näringsdatabas med omfattande livsmedelsinformation",
    url: "https://fdc.nal.usda.gov",
    type: "Internationell databas",
  },
  {
    name: "EFSA (European Food Safety Authority)",
    description: "Europeiska myndigheten för livsmedelssäkerhet",
    url: "https://www.efsa.europa.eu",
    type: "Europeisk myndighet",
  },
  {
    name: "Harvard T.H. Chan School of Public Health",
    description: "Ledande forskning inom näring och folkhälsa",
    url: "https://www.hsph.harvard.edu/nutritionsource",
    type: "Akademisk institution",
  },
  {
    name: "Blue Zones Research",
    description:
      "Forskning om långlivade populationer och deras kostvanor",
    url: "https://www.bluezones.com",
    type: "Forskningsinstitut",
  },
  {
    name: "PubMed/NCBI",
    description:
      "Internationell databas för medicinska och näringsvetenskapliga studier",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    type: "Vetenskaplig databas",
  },
];

export default function KallorPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Hem
        </Link>
        <span className="mx-2">›</span>
        <span>Källor och referenser</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Källor och referenser</h1>
        <p className="text-lg text-muted-foreground">
          All information om livsmedel, näringsvärden och hälsofördelar på
          ViHandlar baseras på trovärdiga och vetenskapligt underbyggda källor.
          Vi använder endast officiella myndigheter, välrenommerade akademiska
          institutioner och peer-reviewed forskning.
        </p>
      </div>

      {/* Quality Assurance */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Våra kvalitetsgarantier
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              • All näringsdata kommer från officiella myndigheter som
              Livsmedelsverket och USDA
            </li>
            <li>
              • Hälsopåståenden baseras på peer-reviewed vetenskaplig forskning
            </li>
            <li>
              • Källor uppdateras regelbundet för att säkerställa aktuell
              information
            </li>
            <li>• Alla påståenden är måttfulla och balanserade</li>
            <li>
              • Vi undviker överdrivna hälsopåståenden och
              &quot;superfood&quot;-marknadsföring
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {sources.map((source) => (
          <Card
            key={source.name}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{source.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {source.type}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground my-4">
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
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-semibold">Vår metodik</h2>
          <div>
            <h3 className="font-semibold mb-2">Näringsdata</h3>
            <p className="text-muted-foreground text-sm">
              Primärt använder vi Livsmedelsverkets databas för svenska
              livsmedel. För internationella produkter kompletterar vi med USDA
              FoodData Central. Alla värden anges per 100g färskvikt om inget
              annat anges.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hälsoinformation</h3>
            <p className="text-muted-foreground text-sm">
              Hälsofördelar och effekter baseras på systematiska översikter,
              meta-analyser och randomiserade kontrollerade studier publicerade i
              peer-reviewed tidskrifter. Vi inkluderar endast väletablerade
              forskningsresultat.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Uppdateringsfrekvens</h3>
            <p className="text-muted-foreground text-sm">
              Information uppdateras löpande när nya forskningsresultat
              publiceras eller när officiella näringsdatabaser uppdateras.
              Senaste uppdatering anges på varje livsmedelssida.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact for corrections */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Hittat fel eller saknar källor?
          </h2>
          <p className="text-muted-foreground mb-4">
            Vi strävar efter att hålla all information korrekt och uppdaterad. Om
            du hittar felaktig information eller saknar källhänvisningar,
            kontakta oss gärna på{" "}
            <a
              href="mailto:hej@vihandlar.se"
              className="text-primary hover:underline"
            >
              hej@vihandlar.se
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
