import type { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, BookOpen, Scan, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllEAdditives } from "@/lib/data/e-additives";
import { E_CATEGORIES, RISK_LEVELS } from "@/types/e-additive";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "E-ämnesguide – Förstå livsmedelstillsatser | ViHandlar",
  description:
    "Komplett guide till E-ämnen och livsmedelstillsatser. Lär dig tolka ingredienslistor, förstå risknivåer, ADI-värden och hur du gör medvetna matval.",
  alternates: {
    canonical: "https://vihandlar.se/e-amnen/guide",
  },
  openGraph: {
    title: "E-ämnesguide – Förstå livsmedelstillsatser",
    description: "Lär dig tolka ingredienslistor och förstå risknivåer.",
    url: "https://vihandlar.se/e-amnen/guide",
  },
};

export default function EAmnenGuidePage() {
  const allAdditives = getAllEAdditives();
  const highRisk = allAdditives.filter((a) => a.risk_score >= 7);
  const mediumRisk = allAdditives.filter((a) => a.risk_score >= 4 && a.risk_score <= 6);
  const lowRisk = allAdditives.filter((a) => a.risk_score <= 3);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "E-ämnen", url: "https://vihandlar.se/e-amnen" },
    { name: "Guide", url: "https://vihandlar.se/e-amnen/guide" },
  ]);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Hem</Link>
        <span className="mx-2">›</span>
        <Link href="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
        <span className="mx-2">›</span>
        <span>Guide</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
        E-ämnesguide
      </h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
        Allt du behöver veta om livsmedelstillsatser – från vad E-nummer betyder
        till hur du gör medvetna val i butiken.
      </p>

      {/* Section 1: Vad är E-ämnen? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-primary" />
          Vad är E-ämnen?
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            E-ämnen (E-nummer) är livsmedelstillsatser som godkänts av EU för
            användning i livsmedel. Bokstaven &quot;E&quot; står för Europa, och varje
            tillsats har ett unikt nummer som identifierar den.
          </p>
          <p>
            Tillsatser kan ha olika syften: konservering, färgning,
            smakförstärkning, förtjockning med mera. Alla E-ämnen har genomgått
            säkerhetsbedömning av EFSA (European Food Safety Authority) innan de
            godkänns.
          </p>
          <p>
            I vår databas har vi {allAdditives.length} E-ämnen med detaljerad
            information om risker, hälsoeffekter och ADI-värden.
          </p>
        </div>
      </section>

      {/* Section 2: Kategorier */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          E-ämneskategorier
        </h2>
        <p className="text-muted-foreground mb-6">
          E-ämnen är indelade i kategorier baserat på deras funktion:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {E_CATEGORIES.map((cat) => {
            const count = allAdditives.filter(
              (a) => a.category.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return (
              <Card key={cat.slug}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        E{cat.range}
                      </p>
                    </div>
                    <Badge variant="secondary">{count} st</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Section 3: Risknivåer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-primary" />
          Risknivåer
        </h2>
        <p className="text-muted-foreground mb-6">
          Vi bedömer varje E-ämne på en skala från 1-10 baserat på vetenskaplig
          forskning:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {lowRisk.length}
              </div>
              <div className="font-medium mt-1">{RISK_LEVELS.LOW.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Risknivå 1-3
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Anses vara säkra vid normal konsumtion
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {mediumRisk.length}
              </div>
              <div className="font-medium mt-1">{RISK_LEVELS.MEDIUM.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Risknivå 4-6
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Bör konsumeras med måtta
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {highRisk.length}
              </div>
              <div className="font-medium mt-1">{RISK_LEVELS.HIGH.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Risknivå 7-10
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Bör undvikas eller begränsas starkt
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 4: ADI-värden */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Vad är ADI-värden?
        </h2>
        <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
          <p className="text-muted-foreground">
            <strong>ADI</strong> (Acceptable Daily Intake) anger hur mycket av
            ett ämne du kan äta varje dag under hela livet utan hälsorisk.
            Värdet anges i milligram per kilo kroppsvikt per dag (mg/kg/dag).
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                <strong>Beräkning:</strong> 70 kg person × ADI-värde = max daglig dos i mg
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                <strong>Källa:</strong> EFSA (European Food Safety Authority)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                <strong>Säkerhetsmarginal:</strong> ADI inkluderar vanligen en 100x säkerhetsfaktor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips för medvetna matval</h2>
        <div className="space-y-4">
          {[
            "Läs ingredienslistor – ju kortare lista, desto bättre",
            "Använd vår E-ämnesscanner för att snabbt analysera produkter",
            "Var extra försiktig med högrisk E-ämnen (risknivå 7-10)",
            "Barn och gravida bör vara extra uppmärksamma",
            "Ekologiska produkter innehåller färre tillsatser",
            "Välj produkter med naturliga färgämnen istället för syntetiska",
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/e-amnen"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-4 h-4" />
          Utforska alla E-ämnen
        </Link>
        <Link
          href="/skanner"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
        >
          <Scan className="w-4 h-4" />
          Scanna ingredienser
        </Link>
      </div>
    </div>
  );
}
