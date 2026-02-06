import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-ämnesscanner – Scanna ingredienslistor | ViHandlar",
  description:
    "Scanna ingredienslistor med kameran eller ladda upp en bild. Få direkt information om alla E-ämnen, risknivåer och hälsoeffekter.",
  alternates: {
    canonical: "https://vihandlar.se/skanner",
  },
  openGraph: {
    title: "E-ämnesscanner – Scanna ingredienslistor",
    description:
      "Scanna ingredienslistor och få direkt info om E-ämnen och risknivåer.",
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
