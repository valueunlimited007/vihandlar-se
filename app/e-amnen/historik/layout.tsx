import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skanningshistorik",
  description:
    "Se dina tidigare skanningar av ingredienslistor. Granska E-ämnen och riskbedömningar från alla dina skannade produkter.",
  alternates: {
    canonical: "https://vihandlar.se/e-amnen/historik",
  },
  openGraph: {
    title: "Skanningshistorik",
    description:
      "Se dina tidigare skanningar av ingredienslistor och riskbedömningar.",
    url: "https://vihandlar.se/e-amnen/historik",
  },
};

export default function HistorikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
