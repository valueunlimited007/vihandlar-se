/**
 * Schema.org markup för produktkategorier
 */

interface Product {
  name: string;
  slug: string;
  image_url?: string;
  price: number;
  brand?: string;
}

interface Category {
  name: string;
  slug: string;
  description?: string;
  product_count?: number;
}

/**
 * Skapa CollectionPage schema för kategori
 */
export const createCategorySchema = (
  category: Category,
  products: Product[]
): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - Produkter Online`,
    description: category.description || `Handla ${category.name} online från flera butiker`,
    url: `https://vihandlar.se/shopping/kategori/${category.slug}`,
    numberOfItems: category.product_count || products.length,
  };
};

/**
 * Skapa BreadcrumbList schema för kategorisida
 */
export const createCategoryBreadcrumbSchema = (
  categoryName: string,
  categorySlug: string,
  parentCategory?: { name: string; slug: string }
): object => {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Hem',
      item: 'https://vihandlar.se/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shopping',
      item: 'https://vihandlar.se/shopping',
    },
  ];

  let position = 3;

  if (parentCategory) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: parentCategory.name,
      item: `https://vihandlar.se/shopping/kategori/${parentCategory.slug}`,
    });
  }

  items.push({
    '@type': 'ListItem',
    position,
    name: categoryName,
    item: `https://vihandlar.se/shopping/kategori/${categorySlug}`,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
};

/**
 * Skapa ItemList schema för produkter i kategori
 */
export const createCategoryItemListSchema = (
  categoryName: string,
  products: Product[]
): object => {
  const items = products.slice(0, 20).map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      url: `https://vihandlar.se/shopping/produkt/${product.slug}`,
      image: product.image_url,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'SEK',
      },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} - Produkter`,
    numberOfItems: products.length,
    itemListElement: items,
  };
};
