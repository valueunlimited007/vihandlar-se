import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type ProductCategory = Tables<'product_categories'>;

interface CategoryWithChildren extends ProductCategory {
  children?: ProductCategory[];
}

/**
 * Hämta alla produktkategorier
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as ProductCategory[];
    },
    staleTime: 1000 * 60 * 30, // 30 minuter
  });
};

/**
 * Hämta en specifik kategori via slug
 */
export const useCategory = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['product-category', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');

      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as ProductCategory;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 30,
  });
};

/**
 * Hämta top kategorier baserat på produktantal
 */
export const useTopCategories = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-categories', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('product_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as ProductCategory[];
    },
    staleTime: 1000 * 60 * 60, // 1 timme
  });
};

/**
 * Hämta kategoriträd (hierarkisk struktur)
 */
export const useCategoryTree = () => {
  return useQuery({
    queryKey: ['category-tree'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      // Bygg hierarkisk struktur
      const categories = data as ProductCategory[];
      const rootCategories: CategoryWithChildren[] = [];
      const categoryMap = new Map<string, CategoryWithChildren>();

      // Först, skapa en map av alla kategorier
      categories.forEach(cat => {
        categoryMap.set(cat.id, { ...cat, children: [] });
      });

      // Sedan, bygg trädet
      categories.forEach(cat => {
        const category = categoryMap.get(cat.id)!;
        if (cat.parent_id) {
          const parent = categoryMap.get(cat.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(category);
          }
        } else {
          rootCategories.push(category);
        }
      });

      return rootCategories;
    },
    staleTime: 1000 * 60 * 60,
  });
};

/**
 * Hämta produkter för en kategori
 */
export const useCategoryProducts = (
  categorySlug: string | undefined,
  options?: {
    page?: number;
    limit?: number;
    storeSlug?: string;
  }
) => {
  const page = options?.page || 1;
  const limit = options?.limit || 24;
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ['category-products', categorySlug, page, limit, options?.storeSlug],
    queryFn: async () => {
      if (!categorySlug) throw new Error('Category slug is required');

      // STEG 1: Hämta kategorin först för att få category_path
      const { data: category, error: catError } = await supabase
        .from('product_categories')
        .select('category_path')
        .eq('slug', categorySlug)
        .single();

      if (catError || !category?.category_path) {
        throw new Error('Category not found');
      }

      // STEG 2: Matcha produkter mot category_path istället för slug
      let query = supabase
        .from('products')
        .select('*, stores!inner(*)', { count: 'exact' })
        .eq('category', category.category_path)  // ✅ Matcha mot full sökväg!
        .eq('in_stock', true);

      if (options?.storeSlug) {
        query = query.eq('stores.slug', options.storeSlug);
      }

      const { data, error, count } = await query
        .order('name')
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        products: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      };
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5,
  });
};
