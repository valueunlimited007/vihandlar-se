import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const ORIGIN = "https://vihandlar.se";
const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Vary": "Origin",
};

const BUCKET_MS = 5 * 60 * 1000;

function getBucketDate(now = Date.now()) {
  const bucketStart = Math.floor(now / BUCKET_MS) * BUCKET_MS;
  return new Date(bucketStart);
}

async function hashETag(input: unknown) {
  const enc = new TextEncoder();
  const data = enc.encode(typeof input === "string" ? input : JSON.stringify(input));
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `W/"${hashHex}"`;
}

function withBaseHeaders(init: ResponseInit = {}, contentType = "application/json; charset=utf-8") {
  return {
    ...init,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300, must-revalidate",
      ...corsHeaders,
      ...(init.headers || {}),
    },
  } satisfies ResponseInit;
}

function buildLinkHeader(self: string) {
  return [
    `<${ORIGIN}/llms.txt>; rel="policy llms"; type="text/plain"`,
    `<${ORIGIN}/sitemap.xml>; rel="sitemap"`,
    `<${ORIGIN}/robots.txt>; rel="robots"`,
    `<${ORIGIN}/.well-known/security.txt>; rel="security"`,
    `<${self}>; rel="self canonical"`
  ].join(", ");
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const bucketDate = getBucketDate();
  const lastModified = bucketDate.toUTCString();
  const linkHeader = buildLinkHeader(`${ORIGIN}/api/health.json`);

  const payload = {
    status: "ok",
    service: "vihandlar.se",
    version: "1.0.0",
    runtime: "deno",
    timestamp: new Date().toISOString(),
    links: {
      lists_index: "https://vihandlar.se/api/lists.json",
      list_detail: "https://vihandlar.se/api/lists/{slug}.json",
      robots: "https://vihandlar.se/robots.txt",
      llms: "https://vihandlar.se/llms.txt",
      security: "https://vihandlar.se/.well-known/security.txt",
      related_ro: "https://listacumparaturi.ro/",
    },
  } as const;

  const etag = await hashETag({ payload, lastModified });
  if (req.headers.get("if-none-match") === etag) {
    return new Response(null, withBaseHeaders({ status: 304, headers: { Link: linkHeader } }));
  }

  return new Response(JSON.stringify(payload), withBaseHeaders({ headers: { ETag: etag, "Last-Modified": lastModified, Link: linkHeader } }));
});
