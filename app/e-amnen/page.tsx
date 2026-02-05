import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  BookOpen,
  Scan,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/RiskGauge";
import { EAdditiveCard } from "@/components/EAdditiveCard";
import { EAdditiveSearch } from "@/components/EAdditiveSearch";
import {
  getAllEAdditives,
  getHighRiskAdditives,
  getSafeAdditives,
} from "@/lib/data/e-additives";
import { E_CATEGORIES } from "@/types/e-additive";

export const metadata: Metadata = {
  title: "E-ämnen A-Ö – Komplett guide till livsmedelstillsatser",
  description:
    "Utforska alla E-nummer med riskbedömning, hälsoeffekter och ADI-värden. Scanna ingredienslistor och förstå vad du äter.",
  keywords: [
    "E-nummer",
    "E-ämnen",
    "tillsatser",
    "livsmedel",
    "hälsa",
    "riskbedömning",
    "ADI",
    "scanner",
  ],
  alternates: {
    canonical: "https://vihandlar.se/e-amnen",
  },
};

export default function EAmnenPage() {
  const allAdditives = getAllEAdditives();
  const highRisk = getHighRiskAdditives();
  const safe = getSafeAdditives();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              E-ämnen A-Ö
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Komplett guide till {allAdditives.length} livsmedelstillsatser med
              riskbedömning, hälsoeffekter och vetenskaplig information
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">
                {allAdditives.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Totalt E-ämnen
              </div>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {highRisk.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Hög risk</div>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {safe.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Låg risk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <Link
            href="/skanner"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">Scanner</div>
              <div className="text-xs text-muted-foreground">
                Scanna ingredienser
              </div>
            </div>
          </Link>

          <Link
            href="#hog-risk"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-red-400/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <div className="font-medium text-sm">Riskbedömning</div>
              <div className="text-xs text-muted-foreground">
                Vetenskaplig risknivå
              </div>
            </div>
          </Link>

          <Link
            href="#kategorier"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">Kategorier</div>
              <div className="text-xs text-muted-foreground">
                {E_CATEGORIES.length} kategorier
              </div>
            </div>
          </Link>

          <Link
            href="#alla"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="font-medium text-sm">Komplett guide</div>
              <div className="text-xs text-muted-foreground">
                Alla {allAdditives.length} E-ämnen
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* High Risk Alert */}
      <section id="hog-risk" className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                Högrisk E-ämnen att undvika
              </h2>
              <Badge
                variant="destructive"
                className="ml-auto"
              >
                {highRisk.length} st
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {highRisk.slice(0, 6).map((additive) => (
                <Link
                  key={additive.id}
                  href={`/e-amnen/${additive.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-background border hover:shadow-md transition-all"
                >
                  <RiskGauge score={additive.risk_score} size="sm" />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-red-700 dark:text-red-400">
                      {additive.e_number}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {additive.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {highRisk.length > 6 && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-4 text-center">
                + {highRisk.length - 6} till med hög risk
              </p>
            )}
          </div>
        </div>
      </section>

      {/* E-nummer Series Navigation */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            E-nummer per serie
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => {
              const count = allAdditives.filter((a) =>
                a.e_number.replace("E", "").startsWith(num)
              ).length;
              return (
                <Link
                  key={num}
                  href={`/e-amnen?serie=${num}`}
                  className="flex flex-col items-center gap-1 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
                >
                  <span className="text-lg font-bold text-primary">
                    E{num}XX
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {count > 0 ? `${count} st` : "Serie"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="kategorier"
        className="bg-gradient-to-br from-muted/50 to-background py-12"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              E-ämnen per kategori
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {E_CATEGORIES.map((cat) => {
                const count = allAdditives.filter(
                  (a) =>
                    a.category.toLowerCase() === cat.name.toLowerCase()
                ).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/e-amnen?kategori=${cat.slug}`}
                    className="p-4 rounded-xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-[1.02] group"
                  >
                    <div className="font-semibold group-hover:text-primary transition-colors">
                      {cat.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {cat.range} · {count} st
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All E-Additives with Search */}
      <section id="alla" className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Alla E-ämnen
          </h2>
          <EAdditiveSearch additives={allAdditives} />
        </div>
      </section>
    </div>
  );
}
