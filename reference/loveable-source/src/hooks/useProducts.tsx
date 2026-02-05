import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

export type Product = Tables<'products'>
export type Store = Tables<'stores'>

export interface ProductWithStore extends Product {
  stores: Store
}

export type SortOption = 
  | 'relevance' 
  | 'name' 
  | 'price_asc' 
  | 'price_desc' 
  | 'discount' 
  | 'newest'

interface UseProductsParams {
  storeSlug?: string
  category?: string
  categories?: string[] // Multiple categories support
  search?: string
  sortBy?: SortOption
  page?: number
  limit?: number
}

/**
 * Fetch products with optional filters
 */
export const useProducts = ({ 
  storeSlug, 
  category, 
  categories,
  search, 
  sortBy = 'name',
  page = 1, 
  limit = 24 
}: UseProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', storeSlug, category, categories, search, sortBy, page],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*, stores!inner(*)', { count: 'exact' })
        .eq('in_stock', true)
      
      // Apply sorting based on sortBy parameter
      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('price', { ascending: false })
          break
        case 'discount':
          // Sort by discount percentage (original_price - price) / original_price
          query = query
            .not('original_price', 'is', null)
            .order('original_price', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'relevance':
          // For search relevance, rely on text search ranking (default when searching)
          if (search) {
            query = query.order('name') // PostgreSQL text search handles relevance
          } else {
            query = query.order('name')
          }
          break
        case 'name':
        default:
          query = query.order('name')
          break
      }
      
      query = query.range((page - 1) * limit, page * limit - 1)
      
      if (storeSlug) {
        query = query.eq('stores.slug', storeSlug)
      }
      
      // Single category filter (legacy support)
      if (category) {
        query = query.eq('category', category)
      }
      
      // Multiple categories filter
      if (categories && categories.length > 0) {
        query = query.in('category', categories)
      }
      
      if (search && search.trim().length > 0) {
        query = query.textSearch('name', search, { 
          type: 'websearch', 
          config: 'swedish' 
        })
      }
      
      const { data, error, count } = await query
      
      if (error) throw error
      
      return { 
        products: (data as ProductWithStore[]) || [], 
        total: count || 0 
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

/**
 * Fetch a single product by store and slug
 */
export const useProduct = (storeSlug: string, productSlug: string) => {
  return useQuery({
    queryKey: ['product', storeSlug, productSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, stores!inner(*)')
        .eq('stores.slug', storeSlug)
        .eq('slug', productSlug)
        .maybeSingle()
      
      if (error) throw error
      if (!data) throw new Error('Product not found')
      
      return data as ProductWithStore
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

/**
 * Fetch all active stores
 */
export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .order('name')
      
      if (error) throw error
      
      return data as Store[]
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

/**
 * Fetch a single store by slug
 */
export const useStore = (slug: string) => {
  return useQuery({
    queryKey: ['store', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle()
      
      if (error) throw error
      if (!data) throw new Error('Store not found')
      
      return data as Store
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

/**
 * Fetch categories, optionally filtered by store
 */
export const useCategories = (storeSlug?: string) => {
  return useQuery({
    queryKey: ['categories', storeSlug],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('category, stores!inner(slug)')
        .not('category', 'is', null)
      
      if (storeSlug) {
        query = query.eq('stores.slug', storeSlug)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      
      // Get unique categories
      const categories = [...new Set(data.map(p => p.category as string))]
      return categories.sort()
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

/**
 * Get product count for a store
 */
export const useProductCount = (storeSlug: string) => {
  return useQuery({
    queryKey: ['product-count', storeSlug],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('products')
        .select('*, stores!inner(slug)', { count: 'exact', head: true })
        .eq('stores.slug', storeSlug)
        .eq('in_stock', true)
      
      if (error) throw error
      
      return count || 0
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}
