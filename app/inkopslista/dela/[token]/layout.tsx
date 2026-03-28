import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delad inköpslista",
  description:
    "Visa och redigera en delad inköpslista i realtid. Checka av varor tillsammans, synkas automatiskt utan app eller registrering.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista",
  },
  openGraph: {
    title: "Delad inköpslista",
    description:
      "Redigera en delad inköpslista i realtid. Synkas automatiskt.",
    url: "https://vihandlar.se/inkopslista",
  },
};

export default function DeladListaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
