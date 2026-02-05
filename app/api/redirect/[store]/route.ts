import { NextRequest, NextResponse } from "next/server";
import { getStoreBySlug } from "@/lib/data/stores";

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

  // Validate URL - must be a valid URL pointing to a known domain
  let targetUrl: URL;
  try {
    targetUrl = new URL(url);
  } catch {
    return NextResponse.json(
      { error: "Invalid url parameter" },
      { status: 400 }
    );
  }

  // Only allow redirect to known affiliate domains
  const allowedDomains = [
    "go.adt242.com",
    "track.adtraction.com",
    "clk.tradedoubler.com",
    "www.awin1.com",
    "www.delitea.se",
  ];

  if (!allowedDomains.some((d) => targetUrl.hostname === d)) {
    return NextResponse.json(
      { error: "URL domain not allowed" },
      { status: 403 }
    );
  }

  return NextResponse.redirect(url, 302);
}
