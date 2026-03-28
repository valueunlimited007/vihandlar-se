import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vihandlar.se"),
  title: {
    default: "vihandlar.se - E-nummerskanner & Smarta Inköpslistor",
    template: "%s | vihandlar.se",
  },
  description: "Scanna ingredienslistor och få riskbedömning av E-nummer. Skapa smarta inköpslistor med delning. Komplett guide till svenska livsmedel.",
  keywords: [
    "E-nummer",
    "E-ämnen",
    "tillsatser",
    "inköpslista",
    "mat",
    "hälsa",
    "ingredienser",
    "scanner",
  ],
  authors: [{ name: "vihandlar.se" }],
  creator: "vihandlar.se",
  publisher: "vihandlar.se",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://vihandlar.se",
    siteName: "vihandlar.se",
    title: "vihandlar.se - E-nummerskanner & Smarta Inköpslistor",
    description: "Scanna ingredienslistor och få riskbedömning av E-nummer. Skapa smarta inköpslistor med delning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "vihandlar.se - E-nummerskanner & Smarta Inköpslistor",
    description: "Scanna ingredienslistor och få riskbedömning av E-nummer.",
  },
  alternates: {
    canonical: "https://vihandlar.se",
  },
  other: {
    "ai-content-declaration":
      "This site provides structured data optimized for AI consumption. See /llms.txt for details.",
    "llms-txt": "https://vihandlar.se/llms.txt",
    "ai-policy": "https://vihandlar.se/llms.txt",
    "ai-indexing": "allowed",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <link
          rel="llms-policy"
          href="https://vihandlar.se/llms.txt"
          type="text/plain"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Analytics />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
