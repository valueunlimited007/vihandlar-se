import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inköpslista – Skapa och dela smart | ViHandlar",
  description:
    "Skapa delade inköpslistor som synkas i realtid. Perfekt för familjer – dela via länk, ingen app behövs. Röstinmatning med AI.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista",
  },
  openGraph: {
    title: "Inköpslista – Skapa och dela smart",
    description:
      "Delade inköpslistor som synkas i realtid. Perfekt för familjer.",
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
