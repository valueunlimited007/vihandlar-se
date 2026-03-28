import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inköpslista",
  description:
    "Visa och redigera din inköpslista. Dela via länk, checka av varor i realtid och använd röstinmatning. Gratis utan registrering.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista",
  },
  openGraph: {
    title: "Inköpslista",
    description:
      "Visa och redigera din inköpslista. Dela via länk och synka i realtid.",
    url: "https://vihandlar.se/inkopslista",
  },
};

export default function ListByIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
