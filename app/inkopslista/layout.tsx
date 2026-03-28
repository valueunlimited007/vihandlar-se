import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skapa delad inköpslista",
  description:
    "Skapa och dela inköpslistor i realtid. Dela via QR-kod, checka av varor och använd röstinmatning. Gratis utan registrering.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista",
  },
  openGraph: {
    title: "Skapa delad inköpslista",
    description:
      "Skapa och dela inköpslistor i realtid. Dela via QR-kod och röstinmatning.",
    url: "https://vihandlar.se/inkopslista",
  },
};

export default function InkopslistaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ViHandlar \u2013 Delad Ink\u00f6pslista",
    description:
      "Skapa och dela ink\u00f6pslistor i realtid med familjen. R\u00f6stinmatning, QR-kod delning och realtidssynkronisering.",
    url: "https://vihandlar.se/inkopslista",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    inLanguage: "sv-SE",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
    },
    featureList: [
      "Realtidsdelning mellan enheter",
      "R\u00f6stinmatning p\u00e5 svenska",
      "QR-kod delning",
      "Ingen registrering kr\u00e4vs",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {children}
    </>
  );
}
