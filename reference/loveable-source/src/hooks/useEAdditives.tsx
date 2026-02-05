import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Use the database type for EAdditive
export type EAdditive = Database['public']['Tables']['e_additives']['Row'];

export const useEAdditives = () => {
  return useQuery({
    queryKey: ['e-additives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true)
        .order('e_number');
      
      if (error) throw error;
      return data as EAdditive[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2
  });
};

export const useEAdditiveBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['e-additive', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as EAdditive | null;
    },
    enabled: !!slug,
    staleTime: 15 * 60 * 1000, // 15 minutes for individual items
    gcTime: 45 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  });
};

export const useEAdditivesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['e-additives-category', category],
    queryFn: async () => {
      // Decode URL-encoded category back to original format
      const decodedCategory = decodeURIComponent(category)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log('Category URL param:', category);
      console.log('Decoded category:', decodedCategory);
      
      // Try multiple matching strategies
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true)
        .or(`category.eq.${decodedCategory},category.ilike.%${decodedCategory}%,category.eq.${category}`)
        .order('e_number');
      
      if (error) throw error;
      console.log('Found additives:', data?.length);
      return data as EAdditive[];
    },
    enabled: !!category
  });
};

export const useEAdditiveCategories = () => {
  return useQuery({
    queryKey: ['e-additive-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('category')
        .eq('is_published', true)
        .order('category');
      
      if (error) throw error;
      
      // Get unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      return uniqueCategories;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes for categories (rarely change)
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2
  });
};

export const useEAdditivesByLetter = (letter: string) => {
  return useQuery({
    queryKey: ['e-additives-letter', letter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true)
        .ilike('e_number', `E${letter}%`)
        .order('e_number');
      
      if (error) throw error;
      return data as EAdditive[];
    },
    enabled: !!letter
  });
};

export const useEAdditiveLetterCounts = () => {
  return useQuery({
    queryKey: ['e-additive-letter-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('e_number')
        .eq('is_published', true);
      
      if (error) throw error;
      
      // Count E-additives by first letter
      const counts: Record<string, number> = {};
      data.forEach(item => {
        const firstLetter = item.e_number.charAt(1); // Skip 'E' and get the first digit/letter
        counts[firstLetter] = (counts[firstLetter] || 0) + 1;
      });
      
      return counts;
    },
    staleTime: 20 * 60 * 1000, // 20 minutes
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2
  });
};