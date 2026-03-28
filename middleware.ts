import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Dynamic X-Schema-Types header per route (AI crawler optimization)
  let schemaTypes = "Organization";

  if (pathname === "/") {
    schemaTypes = "Organization, WebSite, CollectionPage";
  } else if (pathname.match(/^\/e-amnen\/[^/]+$/) && pathname !== "/e-amnen/alla" && pathname !== "/e-amnen/guide") {
    schemaTypes = "Organization, Article, FAQPage, BreadcrumbList";
  } else if (pathname === "/e-amnen" || pathname === "/e-amnen/alla") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname === "/e-amnen/guide") {
    schemaTypes = "Organization, Article, BreadcrumbList";
  } else if (pathname.match(/^\/livsmedel\/[^/]+$/) && !pathname.startsWith("/livsmedel/kategori")) {
    schemaTypes = "Organization, Article, NutritionInformation, BreadcrumbList";
  } else if (pathname === "/livsmedel") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname.match(/^\/handla\/produkt\/[^/]+$/)) {
    schemaTypes = "Organization, Product, Offer, FAQPage, BreadcrumbList";
  } else if (pathname === "/handla") {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname.startsWith("/handla/kategori/") || pathname.startsWith("/livsmedel/kategori/") || pathname.startsWith("/e-amnen/kategori/") || pathname.startsWith("/e-amnen/nummer/")) {
    schemaTypes = "Organization, CollectionPage, BreadcrumbList";
  } else if (pathname !== "/") {
    schemaTypes = "Organization, BreadcrumbList";
  }

  response.headers.set("X-Schema-Types", schemaTypes);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|public|.*\\..*).*)"],
};
