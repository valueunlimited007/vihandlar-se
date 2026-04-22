import type { Metadata } from "next";
import Link from "next/link";
import {
  Handshake,
  ShoppingBag,
  Globe,
  Factory,
  HeartPulse,
  Mail,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Partnerskap | vihandlar.se",
  description:
    "Samarbeta med vihandlar.se — Sveriges matplattform med 13 700+ sidor, 2 625 livsmedel, 353 E-ämnen och 10 500+ produkter. Vi söker affiliate-partners och samarbeten.",
  alternates: {
    canonical: "https://vihandlar.se/partnerskap",
  },
  openGraph: {
    title: "Partnerskap | vihandlar.se",
    description:
      "Samarbeta med vihandlar.se — Sveriges matplattform.",
    url: "https://vihandlar.se/partnerskap",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Hem", url: "https://vihandlar.se" },
  { name: "Partnerskap", url: "https://vihandlar.se/partnerskap" },
]);

const stats = [
  { label: "Indexerade sidor", value: "13 700+" },
  { label: "Livsmedel", value: "2 625" },
  { label: "E-ämnen", value: "353" },
  { label: "Produkter", value: "12 800+" },
];

const partners = [
  {
    icon: ShoppingBag,
    title: "Matbutiker och e-handlare",
    description:
      "Vi driver kvalificerad trafik till svenska matbutiker online via affiliate-partnerskap. Våra besökare söker aktivt efter produkter att köpa.",
  },
  {
    icon: Globe,
    title: "Affiliate-nätverk",
    description:
      "Vi samarbetar med Adtraction och söker fler nätverk som Awin och TradeDoubler. Kontakta oss för att diskutera integration.",
  },
  {
    icon: Factory,
    title: "Livsmedelsproducenter",
    description:
      "Nå medvetna konsumenter som aktivt söker information om ingredienser, näringsvärden och matval. Vi erbjuder synlighet i rätt kontext.",
  },
  {
    icon: HeartPulse,
    title: "Hälso- och nutritionsföretag",
    description:
      "Vår publik är intresserad av hälsa, näring och medvetna matval. Perfekt för kosttillskott, hälsoprodukter och nutritionsföretag.",
  },
];

export default function PartnerskapPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Handshake className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Samarbeta med vihandlar.se
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sveriges matplattform med tusentals besökare som aktivt söker
          information om livsmedel, E-ämnen och produkter.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 bg-primary/5 rounded-2xl"
          >
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Platform description */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          Om plattformen
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            vihandlar.se är en svensk informationsplattform för mat och
            livsmedel. Vi erbjuder inköpslistor, en komplett livsmedelsguide
            med näringsvärden från Livsmedelsverket, detaljerad
            E-ämnesinformation med riskbedömningar, samt produktjämförelse med
            priser från svenska nätbutiker.
          </p>
          <p>
            Vår publik består av medvetna konsumenter som aktivt söker
            information om mat, hälsa och näring — en engagerad målgrupp med
            hög köpintention.
          </p>
        </div>
      </div>

      {/* Who we're looking for */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Vi söker samarbeten med</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card
              key={partner.title}
              className="border-primary/20 hover:border-primary/40 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <partner.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{partner.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary/5 rounded-2xl p-8 mb-16">
        <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">
          Intresserad av ett samarbete?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Kontakta oss för att diskutera hur vi kan samarbeta. Vi svarar
          normalt inom 48 timmar.
        </p>
        <a
          href="mailto:info@valueunlimited.io"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          <Mail className="w-4 h-4" />
          info@valueunlimited.io
        </a>
      </div>

      {/* Value Unlimited */}
      <div className="border-t pt-8 text-center">
        <p className="text-muted-foreground mb-4">
          vihandlar.se är en del av Value Unlimited — vi bygger digitala
          produkter som förenklar vardagen.
        </p>
        <a
          href="https://valueunlimited.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
        >
          valueunlimited.io
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
