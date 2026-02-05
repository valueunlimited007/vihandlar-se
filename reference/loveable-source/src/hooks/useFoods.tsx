import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Food {
  id: string;
  name: string;
  slug: string;
  letter: string;
  alternative_names?: string[];
  category_id?: string;
  subcategory?: string;
  storage_method?: string;
  shelf_life_opened?: string;
  shelf_life_unopened?: string;
  can_freeze?: boolean;
  freezing_tips?: string;
  season?: string[];
  allergens?: string[];
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  fiber?: number;
  salt?: number;
  key_vitamins?: Record<string, string>;
  key_minerals?: Record<string, string>;
  short_description?: string;
  long_description?: string;
  usage_tips?: string[];
  substitutes?: Array<{name: string; reason: string}>;
  meta_title?: string;
  meta_description?: string;
  faq?: Array<{question: string; answer: string}>;
  common_in_lists?: string[];
  related_foods?: string[];
  created_at: string;
  updated_at: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useFoodsByLetter = (letter: string) => {
  return useQuery({
    queryKey: ['foods', 'letter', letter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('letter', letter)
        .order('name');
      
      if (error) throw error;
      return data as Food[];
    },
    enabled: !!letter
  });
};

export const useFoodsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['foods', 'category', categorySlug],
    queryFn: async () => {
      const { data: category } = await supabase
        .from('food_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (!category) return [];

      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('category_id', category.id)
        .order('name');
      
      if (error) throw error;
      return data as Food[];
    },
    enabled: !!categorySlug
  });
};

export const useFoodBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['food', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Food;
    },
    enabled: !!slug
  });
};

export const useFoodCategory = (slug: string) => {
  return useQuery({
    queryKey: ['food-category', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_categories')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as FoodCategory;
    },
    enabled: !!slug
  });
};

export const useAllFoodCategories = () => {
  return useQuery({
    queryKey: ['food-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as FoodCategory[];
    }
  });
};