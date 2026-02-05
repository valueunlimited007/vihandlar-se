import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductSuggestion {
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  store: {
    name: string;
    slug: string;
  };
}

export const useProductAutocomplete = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ['product-autocomplete', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return [];
      }

      const { data, error } = await supabase
        .from('products')
        .select('name, slug, price, image_url, stores(name, slug)')
        .eq('in_stock', true)
        .ilike('name', `%${debouncedQuery}%`)
        .order('name')
        .limit(8);

      if (error) {
        console.error('Autocomplete error:', error);
        return [];
      }

      // Mappa om data från Supabase (stores plural → store singular)
      return (data || []).map(item => ({
        name: item.name,
        slug: item.slug,
        price: item.price,
        image_url: item.image_url,
        store: item.stores  // Mappa från plural till singular
      })) as ProductSuggestion[];
    },
    enabled: debouncedQuery.length >= 2,
  });

  return {
    suggestions,
    isSearching: isLoading && debouncedQuery.length >= 2,
  };
};
