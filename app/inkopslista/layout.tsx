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
  return children;
}
