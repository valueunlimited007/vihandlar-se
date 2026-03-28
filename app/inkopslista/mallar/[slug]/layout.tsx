import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inköpslistmall",
  description:
    "Färdig inköpslistmall att använda direkt. Kopiera till din egen lista och börja handla smartare med vihandlar.se.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista",
  },
  openGraph: {
    title: "Inköpslistmall",
    description:
      "Färdig inköpslistmall att använda direkt. Börja handla smartare.",
    url: "https://vihandlar.se/inkopslista",
  },
};

export default function MallarSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
