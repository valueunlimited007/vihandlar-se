import Link from "next/link";
import {
  ShoppingCart,
  Package,
  Scan,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { getAllFoods } from "@/lib/data/foods";
import { getAllProducts } from "@/lib/data/products";

export default function LandingPage() {
  const eAdditiveCount = getAllEAdditives().length;
  const foodCount = getAllFoods().length;
  const productCount = getAllProducts().length;

  const stats = [
    { value: "10 000+", label: "Inköpslistor" },
    {
      value: productCount.toLocaleString("sv-SE"),
      label: "Produkter",
    },
    { value: `${eAdditiveCount}+`, label: "E-ämnen" },
    { value: `${foodCount}+`, label: "Livsmedel" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge
              variant="secondary"
              className="mb-6 text-sm px-4 py-2"
            >
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Sveriges smartaste matplattform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Din smarta matassistent
              <br />
              – allt på ett ställe
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Planera, handla smart och ät hälsosamt med Sveriges modernaste
              matplattform
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/inkopslistor">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Skapa inköpslista
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/handla">
                  <Package className="w-5 h-5 mr-2" />
                  Till shoppen
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/e-amnen">
                  <Scan className="w-5 h-5 mr-2" />
                  Scanna e-ämnen
                </Link>
              </Button>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingCart className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Delad Inköpslista</CardTitle>
              <CardDescription className="text-base">
                Skapa och dela inköpslistor som uppdateras live. Perfekt för
                familjer som handlar tillsammans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Realtidsuppdatering mellan alla enheter
                  </span>
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

              <div className="pt-4 border-t space-y-2">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/inkopslistor">Skapa lista nu</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-sm">
                  <Link href="/inkopslistor">Läs mer om inköpslistor →</Link>
                </Button>
              </div>
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
                Hitta bästa pris på matvaror från Delitea med fler butiker på
                väg.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Realtidspriser från Delitea (fler på väg)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Sök bland {productCount.toLocaleString("sv-SE")} produkter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Filtrera på kategori och butik
                  </span>
                </li>
              </ul>

              <div className="pt-4 border-t space-y-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Link href="/handla">Börja handla</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-sm">
                  <Link href="/handla">Se alla produkter →</Link>
                </Button>
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
                Ta kort på ingredienslistor och få omedelbar analys av alla
                E-ämnen och deras hälsopåverkan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">AI-powered OCR-skanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {eAdditiveCount}+ E-ämnen i databasen
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Riskbedömning och förklaring</span>
                </li>
              </ul>

              <div className="pt-4 border-t space-y-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  <Link href="/e-amnen">Scanna nu</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-sm">
                  <Link href="/e-amnen">Utforska E-ämnen →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why ViHandlar Section */}
      <section className="bg-gradient-to-br from-muted/50 to-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Varför ViHandlar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Allt du behöver för smartare matval och effektivare inköp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Smart & Hälsosamt</h3>
              <p className="text-muted-foreground">
                AI-driven analys av e-ämnen och näringsinnehåll för smartare
                matval
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
              Över 10 000 sökningar per månad
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {eAdditiveCount}+
                </div>
                <div className="text-sm text-muted-foreground">
                  E-ämnen katalogiserade
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {productCount.toLocaleString("sv-SE")}
                </div>
                <div className="text-sm text-muted-foreground">
                  Produkter indexerade
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-4xl font-bold text-primary mb-2">
                  10 000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Inköpslistor skapade
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Redo att börja?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Välj vilken tjänst du vill börja med och upplev skillnaden med
            ViHandlar
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              <Link href="/inkopslistor">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Skapa inköpslista
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              <Link href="/handla">
                <Package className="w-5 h-5 mr-2" />
                Handla varor
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              <Link href="/e-amnen">
                <Scan className="w-5 h-5 mr-2" />
                Scanna E-ämnen
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
