import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Database,
  Scan,
  ShoppingCart,
  Map,
  Zap,
  List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { E_CATEGORIES } from "@/types/e-additive";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sajtkarta - ViHandlar | Hitta allt innehåll på en plats",
  description:
    "Komplett sajtkarta för ViHandlar med alla sidor, livsmedel, E-ämnen och produkter. Perfekt för navigation.",
  alternates: {
    canonical: "https://vihandlar.se/sajtkarta",
  },
  openGraph: {
    title: "Sajtkarta - ViHandlar",
    description: "Komplett överblick över allt innehåll på ViHandlar.",
    url: "https://vihandlar.se/sajtkarta",
  },
};

const ALPHABET_SV = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

interface SitemapSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: { name: string; url: string; description?: string }[];
}

const sections: SitemapSection[] = [
  {
    title: "Huvudnavigation",
    description: "De viktigaste sidorna för snabb tillgång",
    icon: <Globe className="h-5 w-5" />,
    links: [
      {
        name: "Hem",
        url: "/",
        description:
          "Kom igång med smarta inköpslistor och realtidssynkronisering",
      },
      {
        name: "Funktioner",
        url: "/funktioner",
        description: "Se alla funktioner som gör mathandling enklare",
      },
      {
        name: "Om ViHandlar",
        url: "/om",
        description: "Vår vision om medveten konsumtion",
      },
      {
        name: "Integritetspolicy",
        url: "/integritet",
        description: "Så skyddar vi din integritet",
      },
      {
        name: "Källor",
        url: "/kallor",
        description: "Vetenskapliga källor bakom vår data",
      },
    ],
  },
  {
    title: "Inköpslistor",
    description: "Samarbeta i realtid med familj och vänner",
    icon: <List className="h-5 w-5" />,
    links: [
      {
        name: "Skapa Inköpslista",
        url: "/inkopslista",
        description: "Skapa och dela smarta inköpslistor",
      },
    ],
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
      },
    ],
  },
  {
    title: "E-ämnen & Säkerhet",
    description: "Detaljerad information om livsmedelstillsatser",
    icon: <Scan className="h-5 w-5" />,
    links: [
      {
        name: "E-ämnen Hub",
        url: "/e-amnen",
        description: "Utforska E-ämnen och deras hälsoeffekter",
      },
      {
        name: "E-ämnen Scanner",
        url: "/skanner",
        description: "Ta foto och analysera ingredienser direkt",
      },
    ],
  },
  {
    title: "Shopping & Produkter",
    description: "Hitta bäst pris på 7000+ produkter från svenska butiker",
    icon: <ShoppingCart className="h-5 w-5" />,
    links: [
      {
        name: "Handla Mat",
        url: "/handla",
        description: "Jämför priser och hitta erbjudanden",
      },
    ],
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Hem", url: "https://vihandlar.se" },
  { name: "Sajtkarta", url: "https://vihandlar.se/sajtkarta" },
]);

export default function SajtkartaPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Map className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sajtkarta
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          Navigera enkelt genom allt innehåll på ViHandlar. Bläddra genom
          kategorierna nedan.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="secondary" className="text-sm py-1 px-3">
            <Database className="h-4 w-4 mr-1" />
            2500+ Livsmedel
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">
            <Scan className="h-4 w-4 mr-1" />
            353 E-ämnen
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">
            <ShoppingCart className="h-4 w-4 mr-1" />
            7000+ Produkter
          </Badge>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Snabblänkar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              href: "/inkopslista",
              icon: List,
              title: "Skapa Inköpslista",
              desc: "Kom igång med smarta, delade listor",
            },
            {
              href: "/skanner",
              icon: Scan,
              title: "Scanna E-ämnen",
              desc: "Analysera ingredienser med kameran",
            },
            {
              href: "/livsmedel",
              icon: Database,
              title: "Sök Livsmedel",
              desc: "Hitta näringsdata för alla livsmedel",
            },
            {
              href: "/handla",
              icon: ShoppingCart,
              title: "Handla Mat Online",
              desc: "Jämför priser från svenska butiker",
            },
            {
              href: "/e-amnen",
              icon: Scan,
              title: "E-ämnen Guide",
              desc: "Lär dig om livsmedelstillsatser",
            },
            {
              href: "/om",
              icon: Globe,
              title: "Om ViHandlar",
              desc: "Vår vision och tjänster",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-12" />

      {/* Main Sections */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Alla Sidor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-primary">{section.icon}</div>
                  <h3 className="font-semibold text-lg">{section.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                      {link.description && (
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <hr className="my-12" />

      {/* Browse by Category */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bläddra efter Kategori</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Livsmedel A-Ö */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-3">Livsmedel A-Ö</h3>
              <div className="flex flex-wrap gap-2">
                {ALPHABET_SV.map((letter) => (
                  <Link
                    key={`food-${letter}`}
                    href={`/livsmedel/${letter.toLowerCase()}`}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors border"
                  >
                    {letter}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* E-ämnen */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-3">
                E-ämnen efter kategori
              </h3>
              <div className="space-y-2">
                {E_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/e-amnen/kategori/${cat.slug}`}
                    className="block text-sm text-primary hover:underline"
                  >
                    {cat.name} ({cat.range})
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                  (number) => (
                    <Link
                      key={`enum-${number}`}
                      href={`/e-amnen/nummer/${number}`}
                      className="px-3 py-1 rounded-md text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors border"
                    >
                      E{number}XX
                    </Link>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16 p-10 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl border-2 border-primary/20">
        <h2 className="text-3xl font-bold mb-4">
          Börja använda ViHandlar idag
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Gör mathandling smartare med delade inköpslistor, näringsanalys och
          E-ämnesscanning.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/inkopslista"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            Kom igång gratis
          </Link>
          <Link
            href="/funktioner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
          >
            Se alla funktioner
          </Link>
        </div>
      </div>
    </div>
  );
}
