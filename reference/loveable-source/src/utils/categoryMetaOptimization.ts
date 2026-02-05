/**
 * SEO-optimering för produktkategorier
 */

/**
 * Generera optimerad titel för kategorisida
 */
export const generateCategoryTitle = (
  categoryName: string,
  productCount?: number
): string => {
  const parts = [`Handla ${categoryName} Online`];
  
  if (productCount && productCount > 0) {
    parts.push(`${productCount}+ produkter`);
  }
  
  parts.push('Vihandlar.se');
  
  return parts.join(' | ').substring(0, 60);
};

/**
 * Generera meta description för kategori
 */
export const generateCategoryDescription = (
  categoryName: string,
  productCount?: number,
  description?: string
): string => {
  if (description && description.length > 0) {
    return description.substring(0, 155);
  }
  
  let desc = `Handla ${categoryName} online. `;
  
  if (productCount && productCount > 0) {
    desc += `Jämför priser på ${productCount}+ produkter från flera butiker. `;
  }
  
  desc += 'Snabb leverans direkt hem.';
  
  return desc.substring(0, 155);
};

/**
 * Generera keywords för kategori
 */
export const generateCategoryKeywords = (categoryName: string): string => {
  const keywords: string[] = [
    categoryName,
    `handla ${categoryName}`,
    `köp ${categoryName} online`,
    `${categoryName} online`,
    'mat online',
    'jämför priser',
  ];
  
  return keywords.join(', ');
};

/**
 * Generera H1 för kategorisida
 */
export const generateCategoryH1 = (
  categoryName: string,
  productCount?: number
): string => {
  if (productCount && productCount > 0) {
    return `Handla ${categoryName} Online - ${productCount}+ Produkter`;
  }
  return `Handla ${categoryName} Online`;
};
