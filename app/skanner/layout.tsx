import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-nummerskanner – Scanna ingredienser",
  description:
    "Fotografera ingredienslistor och få omedelbar analys av E-ämnen med riskbedömning. Identifiera farliga tillsatser direkt i butiken.",
  alternates: {
    canonical: "https://vihandlar.se/skanner",
  },
  openGraph: {
    title: "E-nummerskanner – Scanna ingredienser",
    description:
      "Fotografera ingredienslistor och få omedelbar analys av E-ämnen.",
    url: "https://vihandlar.se/skanner",
  },
};

export default function SkannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ViHandlar E-nummerskanner",
    description:
      "AI-driven OCR-skanner som identifierar E-ämnen i ingredienslistor och ger riskbedömning",
    url: "https://vihandlar.se/skanner",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    inLanguage: "sv-SE",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
    },
    featureList: [
      "AI-driven OCR-skanning av ingredienslistor",
      "Automatisk identifiering av E-nummer",
      "Riskbedömning med färgkodning",
      "Stöd för kamerafoton",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {children}
    </>
  );
}
