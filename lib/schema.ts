// lib/schema.ts — JSON-LD structured data helpers

import { SITE_CONFIG } from "@/lib/seo";

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// WebSite (with SearchAction)
// ---------------------------------------------------------------------------

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.alternateName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/e-amnen?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: SITE_CONFIG.description,
    sameAs: [],
  };
}

// ---------------------------------------------------------------------------
// CollectionPage — for hub/listing pages
// ---------------------------------------------------------------------------

export function buildCollectionPageSchema(options: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: SITE_CONFIG.language,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    numberOfItems: options.numberOfItems,
  };
}

// ---------------------------------------------------------------------------
// ItemList — for listing pages with individual items
// ---------------------------------------------------------------------------

interface ItemListEntry {
  name: string;
  url: string;
}

export function buildItemListSchema(
  listName: string,
  items: ItemListEntry[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Product (extended helper)
// ---------------------------------------------------------------------------

interface ProductSchemaInput {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  brand?: string | null;
  ean?: string | null;
  price: number;
  currency?: string;
  originalPrice?: number | null;
  inStock?: boolean;
  storeName: string;
}

export function buildProductSchema(product: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.image && { image: product.image }),
    ...(product.description && { description: product.description }),
    ...(product.brand && {
      brand: { "@type": "Brand", name: product.brand },
    }),
    ...(product.ean && { gtin13: product.ean }),
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/handla/produkt/${product.slug}`,
      priceCurrency: product.currency ?? "SEK",
      price: product.price,
      availability:
        product.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: product.storeName,
      },
    },
  };
}
