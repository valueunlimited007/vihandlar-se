import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.delitea.se",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // llms.txt
      {
        source: "/.well-known/llms.txt",
        destination: "/llms.txt",
        permanent: true,
      },

      // === Livsmedel: old /livsmedel/:letter/:slug → /livsmedel/:slug ===
      {
        source: "/livsmedel/:letter([a-zA-ZåäöÅÄÖ])/:slug",
        destination: "/livsmedel/:slug",
        permanent: true,
      },
      // === Livsmedel: old letter landing pages /livsmedel/:letter → /livsmedel ===
      {
        source: "/livsmedel/:letter([a-zA-ZåäöÅÄÖ])",
        destination: "/livsmedel",
        permanent: true,
      },

      // === Shopping → Handla redirects (301) ===
      {
        source: "/shopping",
        destination: "/handla",
        permanent: true,
      },
      {
        source: "/shopping/delitea",
        destination: "/handla",
        permanent: true,
      },
      {
        source: "/shopping/produkter",
        destination: "/handla",
        permanent: true,
      },
      {
        source: "/shopping/produkter/:letter",
        destination: "/handla",
        permanent: true,
      },
      {
        source: "/shopping/kategorier",
        destination: "/handla",
        permanent: true,
      },
      {
        source: "/shopping/kategori/:slug",
        destination: "/handla/kategori/:slug",
        permanent: true,
      },
      // Product detail: /shopping/:store/:slug → /handla/produkt/:slug
      {
        source: "/shopping/:store/:slug",
        destination: "/handla/produkt/:slug",
        permanent: true,
      },
      // Catch-all for /shopping/:store (store pages) → /handla
      {
        source: "/shopping/:store",
        destination: "/handla",
        permanent: true,
      },

      // === Scanner redirects ===
      {
        source: "/e-amnen/scanner",
        destination: "/skanner",
        permanent: true,
      },
      {
        source: "/scanner",
        destination: "/skanner",
        permanent: true,
      },
      // Old shared scan URL: /scan/:token → /skanner
      {
        source: "/scan/:token",
        destination: "/skanner",
        permanent: true,
      },

      // === Inköpslista redirects ===
      {
        source: "/inkopslistor",
        destination: "/inkopslista",
        permanent: true,
      },
      // Old shared list URL: /list/:token → /inkopslista/dela/:token
      {
        source: "/list/:token",
        destination: "/inkopslista/dela/:token",
        permanent: true,
      },
      // /listor → /inkopslista
      {
        source: "/listor",
        destination: "/inkopslista",
        permanent: true,
      },
      // /listor/:slug → /inkopslista/mallar/:slug
      {
        source: "/listor/:slug",
        destination: "/inkopslista/mallar/:slug",
        permanent: true,
      },

      // === Integritetspolicy redirect ===
      {
        source: "/integritetspolicy",
        destination: "/integritet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
