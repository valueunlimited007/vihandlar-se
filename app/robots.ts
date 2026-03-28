import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const aiCrawlerDisallow = ["/api/", "/inkopslista/"];

  return {
    rules: [
      // --- Default rule ---
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/inkopslista/dela/"],
      },

      // --- OpenAI crawlers ---
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Anthropic crawlers ---
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Google AI crawlers ---
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Perplexity ---
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Apple crawlers ---
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Meta crawlers ---
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Meta-ExternalFetcher",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "FacebookExternalHit",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Microsoft / Bing ---
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Other AI crawlers ---
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Diffbot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: aiCrawlerDisallow,
      },

      // --- Blocked SEO scrapers ---
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
      {
        userAgent: "BLEXBot",
        disallow: ["/"],
      },
      {
        userAgent: "PetalBot",
        disallow: ["/"],
      },
    ],
    sitemap: "https://vihandlar.se/sitemap.xml",
    // AI policy files:
    // - https://vihandlar.se/llms.txt
    // - https://vihandlar.se/llms-full.txt
  };
}
