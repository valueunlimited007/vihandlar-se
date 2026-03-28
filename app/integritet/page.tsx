import type { Metadata } from "next";
import { Shield, Eye, Lock, Mic, Database, Mail } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Integritetspolicy - ViHandlar GDPR & Datasäkerhet",
  description:
    "Läs ViHandlars integritetspolicy. Vi respekterar din integritet och följer GDPR. Läs om hur vi hanterar dina data och skyddar din personliga information.",
  alternates: {
    canonical: "https://vihandlar.se/integritet",
  },
  openGraph: {
    title: "Integritetspolicy - ViHandlar",
    description:
      "Vi respekterar din integritet och följer GDPR.",
    url: "https://vihandlar.se/integritet",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Hem", url: "https://vihandlar.se" },
  { name: "Integritetspolicy", url: "https://vihandlar.se/integritet" },
]);

export default function IntegritetPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Integritetspolicy
        </h1>
        <p className="text-lg text-muted-foreground">
          Senast uppdaterad: 2026-03-28
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <div className="bg-primary/5 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Vår integritetsprincip
              </h2>
              <p className="text-muted-foreground">
                ViHandlar respekterar din integritet. Vi samlar endast in den
                data som behövs för att tjänsten ska fungera och delar aldrig din
                information med tredje part för marknadsföring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Collection */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Database className="w-6 h-6 text-primary" />
          Vilken data samlar vi in?
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">
              Inköpslistor och innehåll
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Namn på inköpslistor som du skapar</li>
              <li>Varor och produkter som läggs till i listor</li>
              <li>Status på varor (avbockade/ej avbockade)</li>
              <li>Tidpunkter för när ändringar görs</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Syfte:</strong> För att visa dina listor och synkronisera
              i realtid mellan enheter.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Teknisk information</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>IP-adress och allmän geografisk plats</li>
              <li>Webbläsare och enhetstyp</li>
              <li>Besökstidpunkter och användaraktivitet</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Syfte:</strong> För att förbättra tjänstens prestanda och
              säkerhet.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Data */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Mic className="w-6 h-6 text-primary" />
          Röstinmatning och ljuddata
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 dark:bg-amber-950/20 dark:border-amber-800">
          <h3 className="font-semibold mb-3 text-amber-800 dark:text-amber-400">
            Viktigt om röstfunktionen
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            ViHandlar använder OpenAI Whisper via säkra API-anrop för optimal
            svensk taligenkänning. Ljudfiler skickas krypterat, bearbetas och
            raderas omedelbart efter transkribering. Inga ljudupptagningar sparas
            permanent.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">
              Hur röstinmatning fungerar:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                Du trycker på mikrofonknappen och talar i upp till 4 sekunder
              </li>
              <li>Ljudfilen skickas krypterat till vår server</li>
              <li>
                OpenAI Whisper bearbetar ljudet och returnerar svensk text
              </li>
              <li>Texten filtreras och läggs till i din lista</li>
              <li>Ljudfilen raderas omedelbart efter bearbetning</li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground">
            Denna process säkerställer både hög kvalitet på svensk taligenkänning
            och stark integritet. Ljuddata lagras aldrig permanent och all
            överföring sker krypterat.
          </p>
        </div>
      </section>

      {/* Data Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Eye className="w-6 h-6 text-primary" />
          Hur använder vi din data?
        </h2>

        <div className="space-y-4">
          {[
            {
              title: "Tillhandahålla tjänsten:",
              text: "Visa dina listor, synkronisera mellan enheter och möjliggöra delning.",
            },
            {
              title: "Förbättra ViHandlar:",
              text: "Analysera användningsmönster för att förbättra prestanda och användarvänlighet.",
            },
            {
              title: "Säkerhet:",
              text: "Skydda mot missbruk, spam och säkerhetshot.",
            },
            {
              title: "Kundservice:",
              text: "Svara på supportfrågor och lösa tekniska problem.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong>{item.title}</strong> {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sharing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Delar vi din data?
        </h2>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 dark:bg-green-950/20 dark:border-green-800">
          <h3 className="font-semibold mb-2 text-green-800 dark:text-green-400">
            Kort svar: Nej
          </h3>
          <p className="text-green-700 dark:text-green-300">
            Vi säljer, hyr ut eller delar aldrig din personliga information med
            tredje part för marknadsföringsändamål.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">
            Vi kan dela data endast i dessa fall:
          </h4>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Med ditt uttryckliga samtycke</li>
            <li>För att följa lag eller rättslig process</li>
            <li>För att skydda säkerhet och rättigheter</li>
            <li>
              Med tjänsteleverantörer som hjälper oss driva ViHandlar (t.ex.
              molntjänster)
            </li>
          </ul>
        </div>
      </section>

      {/* Storage and Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Lock className="w-6 h-6 text-primary" />
          Datasäkerhet och lagring
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Säkerhetsåtgärder</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                All dataöverföring sker via krypterad HTTPS-anslutning
              </li>
              <li>Regelbundna säkerhetsuppdateringar och övervakning</li>
              <li>Begränsad åtkomst till databaser för våra system</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Datalagring</h3>
            <p className="text-muted-foreground mb-3">
              Din data lagras på säkra servrar via Vercel KV. Data som inte är
              kopplad till aktiv användning raderas automatiskt efter 30 dagar
              inaktivitet.
            </p>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Dina rättigheter (GDPR)
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Rätt till information</h4>
              <p className="text-sm text-muted-foreground">
                Du har rätt att veta vilken data vi har om dig.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rätt till rättelse</h4>
              <p className="text-sm text-muted-foreground">
                Du kan begära att felaktig information korrigeras.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rätt till radering</h4>
              <p className="text-sm text-muted-foreground">
                Du kan begära att dina data raderas helt.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">
                Rätt till dataportabilitet
              </h4>
              <p className="text-sm text-muted-foreground">
                Du kan begära att få ut dina data i ett läsbart format.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rätt att invända</h4>
              <p className="text-sm text-muted-foreground">
                Du kan invända mot viss behandling av dina data.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rätt till begränsning</h4>
              <p className="text-sm text-muted-foreground">
                Du kan begära att behandlingen begränsas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Webbanalys */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Webbanalys
        </h2>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 dark:bg-green-950/20 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300">
              Denna webbplats använder{" "}
              <a href="https://besokskollen.se" target="_blank" rel="noopener" className="underline font-medium">
                Besökskollen – cookiefri webbanalys
              </a>{" "}
              för besöksstatistik. Besökskollen är en integritetsvänlig analystjänst
              utvecklad av{" "}
              <a href="https://savri.io" target="_blank" rel="noopener" className="underline font-medium">
                Savri – privacy-friendly web analytics
              </a>{" "}
              som inte använder cookies och inte samlar in några personuppgifter.
              All data är aggregerad och inga enskilda besökare kan identifieras.
              Tjänsten är helt GDPR-kompatibel och all data behandlas inom EU.
            </p>
          </div>
        </div>
      </section>

      {/* Cookies */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Cookies
        </h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            ViHandlar använder minimal mängd cookies:
          </p>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Nödvändiga cookies</h4>
              <p className="text-sm text-muted-foreground">
                För att komma ihåg dina inställningar och listor (localStorage).
                Dessa kan inte stängas av.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Vi använder inga cookies för reklam eller tredjepartsanalys.
            Besöksstatistik hanteras cookiefritt via Besökskollen (se ovan).
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <Mail className="w-6 h-6 text-primary" />
          Kontakta oss
        </h2>

        <div className="bg-muted/30 rounded-lg p-6">
          <p className="text-muted-foreground mb-4">
            Har du frågor om hur vi behandlar din data eller vill utöva dina
            rättigheter?
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

      {/* Updates */}
      <section className="border-t pt-8">
        <h3 className="font-semibold mb-4">
          Ändringar av denna policy
        </h3>
        <p className="text-muted-foreground text-sm">
          Vi kan uppdatera denna integritetspolicy vid behov. Väsentliga
          ändringar meddelas via meddelande på sajten. Fortsatt användning
          innebär att du accepterar eventuella ändringar.
        </p>
      </section>
    </div>
  );
}
