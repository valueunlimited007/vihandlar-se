import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  ShoppingCart,
  Tag,
  Barcode,
  Store,
  Package,
  Info,
  Truck,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/data/products";
import {
  getAllStores,
  getRedirectUrl,
  getAffiliateLinkProps,
  getAffiliateDisclaimer,
} from "@/lib/data/stores";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produkt hittades inte" };
  }

  const stores = getAllStores();
  const storeName = stores[0]?.name ?? "Delitea";

  const title = `${product.name} - Köp hos ${storeName} | vihandlar.se`;
  const description = product.description
    ? product.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : `${product.name} - ${product.price} kr hos ${storeName}. Snabb leverans direkt hem.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://vihandlar.se/handla/produkt/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://vihandlar.se/handla/produkt/${slug}`,
      ...(product.image_url && {
        images: [{ url: product.image_url, alt: `${product.name}${product.brand ? ` från ${product.brand}` : ""} – ${product.price.toFixed(0)} kr hos ${storeName}` }],
      }),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const stores = getAllStores();
  const store = stores[0];
  const storeName = store?.name ?? "Delitea";

  const hasDiscount =
    product.original_price != null && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.original_price! - product.price) / product.original_price!) *
          100
      )
    : 0;
  const savings = hasDiscount
    ? (product.original_price! - product.price).toFixed(0)
    : null;

  const affiliateUrl = getRedirectUrl(store?.slug ?? "delitea", product.product_url);
  const linkProps = getAffiliateLinkProps();

  // Clean HTML from description
  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>/g, "")
    : null;

  // Improved alt text
  const imageAlt = [
    product.name,
    product.brand ? `från ${product.brand}` : null,
    `${product.price.toFixed(0)} kr`,
    `hos ${storeName}`,
  ]
    .filter(Boolean)
    .join(" – ");

  // Dynamic FAQ generation
  const categoryShort = product.category?.split(" - ").pop() ?? null;
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `Vad kostar ${product.name}?`,
      answer: hasDiscount
        ? `${product.name} kostar ${product.price.toFixed(2)} kr hos ${storeName} (ordinarie pris ${product.original_price!.toFixed(2)} kr, du sparar ${savings} kr).`
        : `${product.name} kostar ${product.price.toFixed(2)} kr hos ${storeName}.`,
    },
    {
      question: `Finns ${product.name} i lager?`,
      answer: product.in_stock !== false
        ? `Ja, ${product.name} finns i lager hos ${storeName} och kan beställas direkt.`
        : `${product.name} är tyvärr slut i lager hos ${storeName} just nu.`,
    },
    {
      question: `Var kan jag köpa ${product.name}?`,
      answer: `Du kan köpa ${product.name} online hos ${storeName} med snabb leverans direkt hem.${product.shipping_cost === 0 ? " Fri frakt ingår." : ""}`,
    },
  ];

  if (product.brand) {
    faqItems.push({
      question: `Vem tillverkar ${product.name}?`,
      answer: `${product.name} tillverkas av ${product.brand}.`,
    });
  }

  if (categoryShort) {
    faqItems.push({
      question: `Vilken kategori tillhör ${product.name}?`,
      answer: `${product.name} tillhör kategorin ${categoryShort} hos ${storeName}.`,
    });
  }

  // FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://vihandlar.se",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Handla",
        item: "https://vihandlar.se/handla",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://vihandlar.se/handla/produkt/${slug}`,
      },
    ],
  };

  // Product JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.image_url && { image: product.image_url }),
    ...(cleanDescription && { description: cleanDescription }),
    ...(product.brand && {
      brand: { "@type": "Brand", name: product.brand },
    }),
    ...(product.ean && { gtin13: product.ean }),
    offers: {
      "@type": "Offer",
      url: `https://vihandlar.se/handla/produkt/${slug}`,
      priceCurrency: product.currency ?? "SEK",
      price: product.price,
      availability: product.in_stock !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: storeName,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Hem
        </Link>
        <span>/</span>
        <Link href="/handla" className="hover:text-primary transition-colors">
          Handla
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium line-clamp-1">
          {product.name}
        </span>
      </nav>

      {/* Affiliate disclaimer */}
      <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          {getAffiliateDisclaimer(storeName)}
        </p>
      </div>

      {/* Product Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative aspect-square bg-card border rounded-xl overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={imageAlt}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ShoppingCart className="w-16 h-16 text-muted-foreground opacity-20" />
            </div>
          )}

          {hasDiscount && (
            <Badge
              variant="destructive"
              className="absolute top-4 left-4 text-sm font-bold"
            >
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-muted-foreground">{product.brand}</p>
            )}
          </div>

          {/* Price Card */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toFixed(2)} kr
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.original_price!.toFixed(2)} kr
                  </span>
                )}
              </div>

              {savings && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-3">
                  Du sparar {savings} kr
                </p>
              )}

              {/* Stock & Shipping */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Package className="w-4 h-4" />
                  {product.in_stock !== false ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      I lager
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Slut i lager
                    </span>
                  )}
                </div>
                {product.shipping_cost != null && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Truck className="w-4 h-4" />
                    {product.shipping_cost === 0 ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Fri frakt
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">
                        Frakt: {product.shipping_cost} kr
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Buy Button */}
              <a
                href={affiliateUrl}
                {...linkProps}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                  hasDiscount
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
                    : "bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white shadow-lg shadow-primary/20"
                }`}
              >
                Köp hos {storeName}
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>

          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Produktinformation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.category && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Kategori
                  </span>
                  <span className="font-medium">
                    {product.category.split(" - ").pop()}
                  </span>
                </div>
              )}
              {product.brand && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5" />
                    Varumärke
                  </span>
                  <span className="font-medium">{product.brand}</span>
                </div>
              )}
              {product.ean && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Barcode className="w-3.5 h-3.5" />
                    EAN
                  </span>
                  <span className="font-mono text-xs">{product.ean}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" />
                  Butik
                </span>
                <span className="font-medium">{storeName}</span>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {cleanDescription && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Produktbeskrivning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{cleanDescription}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Vanliga frågor om {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqItems.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-sm mb-1">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Back link */}
      <div className="text-center">
        <Link
          href="/handla"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tillbaka till alla produkter
        </Link>
      </div>
    </div>
  );
}
