import Link from "next/link";
import { Search, ShoppingCart, Apple, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods } from "@/lib/data/foods";

const features = [
  {
    icon: Search,
    title: "E-nummerskanner",
    description:
      "Scanna ingredienslistor och få omedelbar riskbedömning av alla tillsatser.",
    href: "/e-amnen",
    color: "bg-primary/20",
  },
  {
    icon: Apple,
    title: "Livsmedelsguide",
    description:
      "Komplett guide till svenska livsmedel med näringsvärden och tips.",
    href: "/livsmedel",
    color: "bg-accent/20",
  },
  {
    icon: ShoppingCart,
    title: "Smarta Inköpslistor",
    description:
      "Skapa och dela inköpslistor i realtid med familj och vänner.",
    href: "/inkopslistor",
    color: "bg-primary/20",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Trygg mat",
    description: "Förstå vad som finns i maten du köper",
  },
  {
    icon: Zap,
    title: "Snabbt & enkelt",
    description: "Scanna, sök eller bläddra bland 267+ E-nummer",
  },
  {
    icon: Users,
    title: "Dela med familjen",
    description: "Inköpslistor som hela hushållet kan redigera samtidigt",
  },
];

export default function HomePage() {
  const eAdditiveCount = getAllEAdditives().length;
  const foodCount = getAllFoods().length;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-balance">
              Vet vad du{" "}
              <span className="text-primary">äter</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-100">
              Scanna ingredienslistor, utforska{" "}
              <strong>{eAdditiveCount} E-nummer</strong> och{" "}
              <strong>{foodCount} livsmedel</strong>. Skapa smarta inköpslistor
              du kan dela med familjen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-200">
              <Button asChild size="lg" className="text-lg h-14 px-8 rounded-xl hover-scale">
                <Link href="/e-amnen">
                  <Search className="mr-2 h-5 w-5" />
                  Utforska E-nummer
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 rounded-xl hover-scale">
                <Link href="/inkopslistor">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Skapa inköpslista
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative gradient circles */}
        <div className="absolute top-20 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group bg-card/60 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
            >
              <div
                className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h2>
              <p className="text-muted-foreground">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Handla smartare, <span className="text-primary">lev bättre</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">{eAdditiveCount}</div>
            <div className="text-sm text-muted-foreground mt-1">E-nummer</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">{foodCount}</div>
            <div className="text-sm text-muted-foreground mt-1">Livsmedel</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
            <div className="text-sm text-muted-foreground mt-1">Produkter</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Gratis</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Redo att handla smartare?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Utforska alla E-nummer, hitta hälsosammare livsmedel och skapa
            inköpslistor som hela familjen kan använda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl hover-scale">
              <Link href="/e-amnen">Utforska E-nummer</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl hover-scale">
              <Link href="/livsmedel">Se livsmedelsguiden</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
