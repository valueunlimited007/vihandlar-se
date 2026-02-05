import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS and caching config
const ORIGIN = "https://vihandlar.se";
const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Vary": "Origin",
};

// 5-minute cache bucket in ms
const BUCKET_MS = 5 * 60 * 1000;

// Seed fallback (shape aligned with API)
const seedLists = [
  {
    slug: "basinkop",
    title: "Basinköp",
    description: "Enkel vardagslista för basvaror.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
    items_count: 3,
  },
  {
    slug: "storhandling",
    title: "Storhandling",
    description: "Veckovis storhandel med allt som behövs.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
    items_count: 3,
  },
  {
    slug: "bbq-helg",
    title: "BBQ-helg",
    description: "Grillfestens inköp för en perfekt helg.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
    items_count: 3,
  },
];

const seedItems: Record<string, Array<{ name: string; quantity?: string; category?: string; checked: boolean; position: number }>> = {
  basinkop: [
    { name: "Mjölk", quantity: "1 l", category: "Mejeri", checked: false, position: 0 },
    { name: "Bröd", quantity: "1", category: "Bageri", checked: false, position: 1 },
    { name: "Ägg", quantity: "12", category: "Mejeri", checked: false, position: 2 },
  ],
  storhandling: [
    { name: "Pasta", quantity: "2", category: "Torrvaror", checked: false, position: 0 },
    { name: "Krossade tomater", quantity: "4", category: "Konserver", checked: false, position: 1 },
    { name: "Kaffe", quantity: "1", category: "Dryck", checked: false, position: 2 },
  ],
  "bbq-helg": [
    { name: "Grillkol", quantity: "1 säck", category: "Övrigt", checked: false, position: 0 },
    { name: "Entrecôte", quantity: "1 kg", category: "Kött", checked: false, position: 1 },
    { name: "Majskolvar", quantity: "4", category: "Grönt", checked: false, position: 2 },
  ],
};

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
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;
  // Extract slug from patterns like /lists/frukost-vecka
  const pathParts = path.split('/').filter(Boolean);
  const listsIndex = pathParts.indexOf('lists');
  const slug = listsIndex >= 0 && pathParts[listsIndex + 1] 
    ? decodeURIComponent(pathParts[listsIndex + 1]) 
    : "";

  // Allow POST via supabase.functions.invoke too
  let bodyParams: any = null;
  try {
    if (req.method === "POST") bodyParams = await req.json().catch(() => null);
  } catch (_) { /* ignore */ }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  const bucketDate = getBucketDate();
  const lastModified = bucketDate.toUTCString();

  try {
    if (req.method !== "GET" && req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), withBaseHeaders({ status: 405 }));
    }

    // DETAIL: prefer path slug; fallback to POST body.slug
    const effectiveSlug = slug || bodyParams?.slug || "";
    let selfUrl = `${ORIGIN}/api/lists.json`;
    if (effectiveSlug) selfUrl = `${ORIGIN}/api/lists/${encodeURIComponent(effectiveSlug)}.json`;
    const linkHeader = buildLinkHeader(selfUrl);

    if (effectiveSlug) {
      // Fetch public list by slug
      const { data: list, error: listError } = await supabase
        .from("public_lists")
        .select("id, slug, title, description, lang, updated_at, is_public")
        .eq("slug", effectiveSlug)
        .eq("is_public", true)
        .maybeSingle();

      if (listError) throw listError;

      if (!list) {
        return new Response(JSON.stringify({ error: "Not found" }), withBaseHeaders({ status: 404, headers: { Link: linkHeader } }));
      }

      const { data: items, error: itemsError } = await supabase
        .from("public_items")
        .select("name, quantity, category, checked, position")
        .eq("list_id", list.id)
        .order("position", { ascending: true });

      if (itemsError) throw itemsError;

      const payload = {
        slug: list.slug,
        title: list.title,
        description: list.description,
        lang: list.lang,
        updated_at: list.updated_at,
        items: items ?? [],
      };

      const etag = await hashETag({ payload, lastModified });
      if (req.headers.get("if-none-match") === etag) {
        return new Response(null, withBaseHeaders({ status: 304, headers: { Link: linkHeader } }));
      }

      return new Response(JSON.stringify(payload), withBaseHeaders({ headers: { ETag: etag, "Last-Modified": lastModified, Link: linkHeader } }));
    }

    // INDEX
    const { data: lists, error: listsError } = await supabase
      .from("public_lists")
      .select("id, slug, title, description, lang, updated_at")
      .eq("is_public", true)
      .order("updated_at", { ascending: false });

    if (listsError) throw listsError;

    let responseLists:
      Array<{ slug: string; title: string; description: string | null; lang: string; updated_at: string; items_count: number }>
      = [];

    if (!lists || lists.length === 0) {
      responseLists = seedLists;
    } else {
      const { data: counts, error: countError } = await supabase
        .from("public_items")
        .select("list_id, id");
      if (countError) throw countError;
      const mapCounts = new Map<string, number>();
      counts?.forEach((row: any) => {
        mapCounts.set(row.list_id, (mapCounts.get(row.list_id) || 0) + 1);
      });

      responseLists = lists.map((l: any) => ({
        slug: l.slug,
        title: l.title,
        description: l.description,
        lang: l.lang,
        updated_at: l.updated_at,
        items_count: mapCounts.get(l.id) || 0,
      }));

      // If any list has 0 items, try fallback seed for items_count display
      responseLists = responseLists.map((l) => ({
        ...l,
        items_count: l.items_count || (seedItems[l.slug]?.length ?? 0),
      }));
    }

    const etag = await hashETag({ responseLists, lastModified });
    if (req.headers.get("if-none-match") === etag) {
      return new Response(null, withBaseHeaders({ status: 304, headers: { Link: linkHeader } }));
    }

    return new Response(JSON.stringify(responseLists), withBaseHeaders({ headers: { ETag: etag, "Last-Modified": lastModified, Link: linkHeader } }));
  } catch (e) {
    // Fallback to in-memory seed
    const payload = slug
      ? {
          slug,
          title: seedLists.find((l) => l.slug === slug)?.title || slug,
          description: seedLists.find((l) => l.slug === slug)?.description || null,
          lang: "sv-SE",
          updated_at: new Date().toISOString(),
          items: seedItems[slug] || [],
        }
      : seedLists;

    const etag = await hashETag({ payload, lastModified });
    const linkHeader = buildLinkHeader(`${ORIGIN}/api/lists${slug ? `/${encodeURIComponent(slug)}` : ""}.json`);
    if (req.headers.get("if-none-match") === etag) {
      return new Response(null, withBaseHeaders({ status: 304, headers: { Link: linkHeader } }));
    }

    return new Response(JSON.stringify(payload), withBaseHeaders({ headers: { ETag: etag, "Last-Modified": lastModified, Link: linkHeader } }));
  }
});
