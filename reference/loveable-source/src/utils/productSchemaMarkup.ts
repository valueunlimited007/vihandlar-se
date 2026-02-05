import type { Tables } from '@/integrations/supabase/types'

type Product = Tables<'products'>
type Store = Tables<'stores'>

/**
 * Create Schema.org Product markup for a product
 */
export const createProductSchema = (product: Product, store: Store) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || product.name,
    "sku": product.product_id,
    "url": `https://vihandlar.se/shopping/${store.slug}/${product.slug}`,
  }

  // Add image
  if (product.image_url) {
    schema.image = product.image_url
  }

  // Add GTIN/EAN
  if (product.ean) {
    if (product.ean.length === 13) {
      schema.gtin13 = product.ean
    } else if (product.ean.length === 14) {
      schema.gtin14 = product.ean
    } else {
      schema.gtin = product.ean
    }
  }

  // Add brand
  if (product.brand) {
    schema.brand = {
      "@type": "Brand",
      "name": product.brand
    }
  }

  // Add offers
  schema.offers = {
    "@type": "Offer",
    "url": `https://vihandlar.se/shopping/${store.slug}/${product.slug}`,
    "priceCurrency": product.currency || "SEK",
    "price": product.price.toString(),
    "availability": product.in_stock 
      ? "https://schema.org/InStock" 
      : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": store.name,
      "url": store.website_url || `https://vihandlar.se/shopping/${store.slug}`
    },
    "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }

  // Add shipping if available
  if (product.shipping_cost !== null) {
    schema.offers.shippingDetails = {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": product.shipping_cost.toString(),
        "currency": product.currency || "SEK"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "businessDays": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }
      }
    }
  }

  return schema
}

/**
 * Create Schema.org BreadcrumbList for product page
 */
export const createProductBreadcrumbSchema = (product: Product, store: Store) => {
  const items: any[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Hem",
      "item": "https://vihandlar.se/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Shopping",
      "item": "https://vihandlar.se/shopping"
    }
  ]

  // Add category if available
  if (product.category) {
    const categorySlug = product.category.toLowerCase()
      .replace(/[\s&\/]+/g, '-')
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
    
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": product.category,
      "item": `https://vihandlar.se/shopping/kategori/${categorySlug}`
    })
  }

  // Add product as last item
  items.push({
    "@type": "ListItem",
    "position": items.length + 1,
    "name": product.name,
    "item": `https://vihandlar.se/shopping/${store.slug}/${product.slug}`
  })

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  }
}

/**
 * Create Schema.org ItemList for store listing page
 */
export const createStoreItemListSchema = (products: Product[], store: Store) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${store.name} produkter`,
    "description": store.description || `Produkter från ${store.name}`,
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://vihandlar.se/shopping/${store.slug}/${product.slug}`,
      "name": product.name,
      "image": product.image_url
    }))
  }
}

/**
 * Create Schema.org CollectionPage for shopping hub
 */
export const createShoppingHubSchema = (totalProducts: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Handla Mat Online",
    "description": "Jämför priser och handla mat från flera butiker online",
    "url": "https://vihandlar.se/shopping",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalProducts,
      "name": "Produkter från alla butiker"
    }
  }
}
