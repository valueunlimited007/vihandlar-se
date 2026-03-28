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
  return children;
}
