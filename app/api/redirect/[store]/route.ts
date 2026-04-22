import { NextRequest, NextResponse } from "next/server";
import { getStoreBySlug, buildAdtractionUrl } from "@/lib/data/stores";

// Known Adtraction tracking domains
// Includes the shared Adtraction endpoints plus dedicated per-advertiser subdomains.
const TRACKING_DOMAINS = [
  "go.adt242.com",
  "track.adtraction.com",
  "at.coffeefriend.se",
];

// Known store domains (raw product URLs)
const STORE_DOMAINS = [
  "www.delitea.se",
  "delitea.se",
  "www.coffeefriend.se",
  "coffeefriend.se",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ store: string }> }
) {
  const { store: storeSlug } = await params;
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  const store = getStoreBySlug(storeSlug);

  if (!store) {
    return NextResponse.json(
      { error: "Store not found" },
      { status: 404 }
    );
  }

  // Validate URL
  let targetUrl: URL;
  try {
    targetUrl = new URL(url);
  } catch {
    return NextResponse.json(
      { error: "Invalid url parameter" },
      { status: 400 }
    );
  }

  const hostname = targetUrl.hostname;

  // If URL is already an Adtraction tracking URL, redirect directly
  // (product_url from feed already contains complete tracking URL)
  if (TRACKING_DOMAINS.some((d) => hostname === d)) {
    return NextResponse.redirect(url, 302);
  }

  // If URL is a raw store URL, wrap it in Adtraction tracking
  if (STORE_DOMAINS.some((d) => hostname === d)) {
    const trackingUrl = buildAdtractionUrl(store, url);
    return NextResponse.redirect(trackingUrl, 302);
  }

  // Unknown domain — reject
  return NextResponse.json(
    { error: "URL domain not allowed" },
    { status: 403 }
  );
}
