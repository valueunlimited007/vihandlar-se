// lib/seo.ts — Centralized SEO configuration for vihandlar.se

import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "vihandlar.se",
  alternateName: "ViHandlar",
  tagline: "Din smarta matassistent - allt på ett ställe",
  description:
    "Sveriges smartaste matplattform. Skapa delade inköpslistor, scanna E-ämnen, jämför priser på 10 000+ produkter och utforska 68+ livsmedel.",
  url: "https://vihandlar.se",
  locale: "sv_SE",
  language: "sv-SE",
  logo: "https://vihandlar.se/icon.svg",
  themeColor: "#FF8000",
} as const;

/**
 * Build a title string with the site name appended.
 * Example: seoTitle("E-ämnen A-Ö") => "E-ämnen A-Ö | vihandlar.se"
 */
export function seoTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_CONFIG.name}`;
}

/**
 * Create a full Next.js Metadata object for a page.
 */
export function createPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: { url: string; alt: string };
}): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    type = "website",
    image,
  } = options;

  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type,
      url,
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      ...(image && { images: [image] }),
    },
  };
}
