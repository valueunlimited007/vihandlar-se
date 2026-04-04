import type { Metadata } from "next";
import {
  Info,
  ShoppingCart,
  FileText,
  Link2,
  Database,
  Scale,
  Shield,
  AlertTriangle,
  RefreshCw,
  Mail,
  Gavel,
} from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Allmänna villkor | vihandlar.se",
  description:
    "Läs de allmänna villkoren för vihandlar.se. Information om användning, affiliate-länkar, ansvarsbegränsning och tillämplig lag.",
  alternates: {
    canonical: "https://vihandlar.se/villkor",
  },
  openGraph: {
    title: "Allmänna villkor | vihandlar.se",
    description:
      "Allmänna villkor för användning av vihandlar.se.",
    url: "https://vihandlar.se/villkor",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Hem", url: "https://vihandlar.se" },
  { name: "Allmänna villkor", url: "https://vihandlar.se/villkor" },
]);

export default function VillkorPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Allmänna villkor
        </h1>
        <p className="text-lg text-muted-foreground">
          Senast uppdaterad: 2026-03-28
        </p>
      </div>

      {/* 1. Om tjänsten */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Info className="w-6 h-6 text-primary" />
          1. Om tjänsten
        </h2>
        <div className="bg-primary/5 rounded-2xl p-6">
          <p className="text-muted-foreground">
            vihandlar.se är en gratis informationsplattform som erbjuder
            inköpslistor, livsmedelsguide, E-ämnesinformation och
            produktjämförelse. Tjänsten drivs av Value Unlimited och är
            tillgänglig för alla utan kostnad eller registrering.
          </p>
        </div>
      </section>

      {/* 2. Användning */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-primary" />
          2. Användning
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tjänsten är gratis att använda och kräver ingen registrering. Du
            får använda vihandlar.se för personligt, icke-kommersiellt bruk.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Skapa och dela inköpslistor</li>
            <li>Söka information om livsmedel och E-ämnen</li>
            <li>Jämföra produkter och priser</li>
            <li>Använda E-nummerskannern</li>
          </ul>
          <p className="text-muted-foreground">
            Automatiserad eller systematisk insamling av data från tjänsten
            utan skriftligt tillstånd är inte tillåtet.
          </p>
        </div>
      </section>

      {/* 3. Innehåll och information */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          3. Innehåll och information
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Informationen på vihandlar.se är sammanställd från offentliga och
            tillförlitliga källor:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Näringsvärden</strong> — hämtade från Livsmedelsverkets
              livsmedelsdatabas
            </li>
            <li>
              <strong>E-ämnesdata</strong> — baserad på forskning och
              riskbedömningar från EFSA (Europeiska myndigheten för
              livsmedelssäkerhet)
            </li>
            <li>
              <strong>Produktinformation</strong> — hämtad från svenska
              nätbutiker och uppdateras regelbundet
            </li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 dark:bg-amber-950/20 dark:border-amber-800">
            <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-400">
              Ej medicinsk rådgivning
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Informationen på vihandlar.se är avsedd som allmän information och
              ersätter inte professionell medicinsk eller nutritionell
              rådgivning. Konsultera alltid en läkare eller dietist vid
              specifika hälsofrågor.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Affiliate-länkar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Link2 className="w-6 h-6 text-primary" />
          4. Affiliate-länkar
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Sektionen &quot;Handla&quot; på vihandlar.se innehåller
            affiliate-länkar via Adtraction och andra affiliate-nätverk. Det
            innebär att vi kan få provision om du klickar på en länk och gör
            ett köp hos en av våra partnerbutiker.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 dark:bg-green-950/20 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300">
              <strong>Ingen extra kostnad:</strong> Affiliate-länkarna påverkar
              aldrig priset du betalar. Du betalar samma pris som du hade gjort
              utan att gå via vihandlar.se.
            </p>
          </div>
          <p className="text-muted-foreground">
            Affiliate-intäkterna hjälper oss att finansiera och underhålla
            tjänsten. Vi rekommenderar aldrig produkter eller butiker baserat
            på provision — vår information är oberoende.
          </p>
        </div>
      </section>

      {/* 5. Inköpslistor */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Database className="w-6 h-6 text-primary" />
          5. Inköpslistor
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Inköpslistor skapas och lagras i Vercel KV (Redis). Listor som
            inte används aktivt har en begränsad livstid (TTL) och kan raderas
            automatiskt efter inaktivitet.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Inga garantier ges för permanent datalagring</li>
            <li>Delade listor är tillgängliga för alla som har länken</li>
            <li>
              Vi rekommenderar att inte lagra känslig information i listor
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Immaterialrätt */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Scale className="w-6 h-6 text-primary" />
          6. Immaterialrätt
        </h2>
        <p className="text-muted-foreground">
          Allt innehåll på vihandlar.se — inklusive design, texter,
          logotyper, grafik och källkod — tillhör vihandlar.se / Value
          Unlimited och skyddas av svensk och internationell
          upphovsrättslagstiftning. Du får inte kopiera, distribuera eller
          använda innehållet för kommersiella ändamål utan skriftligt
          tillstånd.
        </p>
      </section>

      {/* 7. Integritetspolicy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          7. Integritetspolicy
        </h2>
        <p className="text-muted-foreground">
          Vi värnar om din integritet. Läs vår fullständiga{" "}
          <a
            href="/integritet"
            className="text-primary underline hover:text-primary/80"
          >
            integritetspolicy
          </a>{" "}
          för information om hur vi hanterar data, cookies och dina
          rättigheter enligt GDPR.
        </p>
      </section>

      {/* 8. Ansvarsbegränsning */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-primary" />
          8. Ansvarsbegränsning
        </h2>
        <div className="bg-muted/30 rounded-lg p-6">
          <p className="text-muted-foreground">
            Tjänsten tillhandahålls &quot;som den är&quot; utan garantier av
            något slag. vihandlar.se ansvarar inte för eventuella fel eller
            brister i informationen, tillfälliga driftstörningar, förlust av
            data i inköpslistor, eller beslut som fattas baserat på
            informationen på sajten. Vi strävar efter att hålla all information
            korrekt och uppdaterad men kan inte garantera att så alltid är
            fallet.
          </p>
        </div>
      </section>

      {/* 9. Ändringar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-primary" />
          9. Ändringar av villkoren
        </h2>
        <p className="text-muted-foreground">
          Vi förbehåller oss rätten att uppdatera dessa villkor vid behov.
          Väsentliga ändringar meddelas via meddelande på sajten. Fortsatt
          användning av tjänsten efter en uppdatering innebär att du
          accepterar de nya villkoren.
        </p>
      </section>

      {/* 10. Kontakt */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Mail className="w-6 h-6 text-primary" />
          10. Kontakt
        </h2>
        <div className="bg-muted/30 rounded-lg p-6">
          <p className="text-muted-foreground mb-4">
            Har du frågor om dessa villkor eller om tjänsten i övrigt?
          </p>
          <div className="space-y-2">
            <p className="font-medium">Kontaktuppgifter:</p>
            <p className="text-sm text-muted-foreground">
              E-post: hej@vihandlar.se
            </p>
            <p className="text-sm text-muted-foreground">
              Vi svarar normalt inom 48 timmar.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Tillämplig lag */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Gavel className="w-6 h-6 text-primary" />
          11. Tillämplig lag
        </h2>
        <p className="text-muted-foreground">
          Dessa villkor regleras av och tolkas i enlighet med svensk lag.
          Eventuella tvister ska i första hand lösas genom förhandling. Om
          enighet inte kan uppnås ska tvisten avgöras av svensk domstol.
        </p>
      </section>
    </div>
  );
}
