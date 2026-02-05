import type { Tables } from '@/integrations/supabase/types'

type Product = Tables<'products'>
type Store = Tables<'stores'>

/**
 * Generate optimized title for product page
 */
export const generateProductTitle = (product: Product, store: Store): string => {
  const parts = [product.name]
  
  if (product.brand) {
    parts.push(product.brand)
  }
  
  parts.push(store.name)
  parts.push('Vihandlar.se')
  
  return parts.join(' | ').substring(0, 60)
}

/**
 * Generate optimized meta description for product
 */
export const generateProductDescription = (product: Product, store: Store): string => {
  let description = ''
  
  if (product.description && product.description.length > 0) {
    description = product.description.substring(0, 130)
  } else {
    description = `${product.name}${product.brand ? ` från ${product.brand}` : ''}`
  }
  
  const suffix = ` Köp från ${store.name} via Vihandlar.se.`
  const maxLength = 155 - suffix.length
  
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...'
  }
  
  return description + suffix
}

/**
 * Generate focus keywords for product
 */
export const generateProductKeywords = (product: Product, store: Store): string => {
  const keywords: string[] = []
  
  keywords.push(product.name)
  
  if (product.brand) {
    keywords.push(product.brand)
    keywords.push(`${product.brand} ${product.name}`)
  }
  
  if (product.category) {
    keywords.push(product.category)
  }
  
  keywords.push(store.name)
  keywords.push(`köp ${product.name}`)
  keywords.push('mat online')
  keywords.push('handla mat')
  
  return keywords.join(', ')
}

/**
 * Generate optimized title for store listing page
 */
export const generateStoreTitle = (store: Store, category?: string, itemCount?: number): string => {
  const parts = [store.name]
  
  if (category) {
    parts.push(category)
  } else if (itemCount) {
    parts.push(`${itemCount} produkter`)
  }
  
  parts.push('Matbutik Online')
  parts.push('Vihandlar.se')
  
  return parts.join(' | ').substring(0, 60)
}

/**
 * Generate meta description for store page
 */
export const generateStoreDescription = (store: Store, itemCount?: number): string => {
  let description = store.description || `Handla mat och delikatesser från ${store.name}.`
  
  if (itemCount && itemCount > 0) {
    description += ` Över ${itemCount.toLocaleString('sv-SE')} produkter.`
  }
  
  description += ' Snabb leverans direkt hem till dörren.'
  
  return description.substring(0, 155)
}

/**
 * Generate title for shopping hub (all stores)
 */
export const generateShoppingHubTitle = (query?: string, storeSlug?: string): string => {
  const parts = ['Handla Mat Online']
  
  if (query) {
    parts.unshift(`"${query}"`)
  }
  
  if (storeSlug) {
    parts.push(storeSlug.charAt(0).toUpperCase() + storeSlug.slice(1))
  } else {
    parts.push('Jämför Butiker')
  }
  
  parts.push('Vihandlar.se')
  
  return parts.join(' | ').substring(0, 60)
}

/**
 * Generate meta description for shopping hub
 */
export const generateShoppingHubDescription = (totalStores?: number, totalProducts?: number): string => {
  let description = 'Handla mat online från flera butiker. '
  
  if (totalStores && totalStores > 1) {
    description += `Jämför priser från ${totalStores} matbutiker. `
  }
  
  if (totalProducts && totalProducts > 0) {
    description += `Över ${totalProducts.toLocaleString('sv-SE')} produkter. `
  }
  
  description += 'Hitta bästa pris och handla smart.'
  
  return description.substring(0, 155)
}
