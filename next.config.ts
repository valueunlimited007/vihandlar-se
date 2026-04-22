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
      {
        protocol: "https",
        hostname: "www.coffeefriend.se",
      },
      {
        protocol: "https",
        hostname: "media.coffeefriend.se",
      },
      {
        protocol: "https",
        hostname: "cdn.coffeefriend.se",
      },
      {
        protocol: "https",
        hostname: "images.coffeefriend.se",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // --- Existing security headers ---
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // --- Additional security headers (A grade on SecurityHeaders.com) ---
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self), geolocation=()",
          },

          // --- Link headers (RFC 8288) for AI discovery ---
          {
            key: "Link",
            value: [
              '<https://vihandlar.se/llms.txt>; rel="ai-info"; type="text/plain"',
              '<https://vihandlar.se/llms.txt>; rel="llms-txt"; type="text/plain"',
              '<https://vihandlar.se/llms.txt>; rel="alternate"; type="text/plain"; title="LLM Information"',
              '<https://vihandlar.se/llms-full.txt>; rel="ai-info-full"; type="text/plain"',
              '<https://vihandlar.se/robots.txt>; rel="robots"',
              '<https://vihandlar.se/sitemap.xml>; rel="sitemap"; type="application/xml"',
            ].join(", "),
          },

          // --- Custom X-headers for AI crawlers ---
          { key: "X-LLM-Policy", value: "https://vihandlar.se/llms.txt" },
          {
            key: "X-LLM-Full-Policy",
            value: "https://vihandlar.se/llms-full.txt",
          },
          { key: "X-AI-Indexable", value: "true" },
          { key: "X-Content-Language", value: "sv-SE" },
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large",
          },
          {
            key: "X-Robots-Policy",
            value: "https://vihandlar.se/robots.txt",
          },
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
