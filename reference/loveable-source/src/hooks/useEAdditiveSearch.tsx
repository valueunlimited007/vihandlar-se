import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EAdditive } from './useEAdditives';

export const useEAdditiveSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search query with filters
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['e-additives-search', debouncedSearchTerm, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true);

      // Apply category filter
      if (selectedCategory && selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Apply search term filter
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        
        // Search in multiple fields
        query = query.or(
          `e_number.ilike.%${searchLower}%,` +
          `name.ilike.%${searchLower}%,` +
          `common_name.ilike.%${searchLower}%`
        );
      }

      query = query.order('e_number').limit(20);
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as EAdditive[];
    },
    enabled: debouncedSearchTerm.length > 0 || selectedCategory !== null
  });

  const hasActiveSearch = debouncedSearchTerm.length > 0 || selectedCategory !== null;

  const filteredResults = useMemo(() => {
    if (!searchResults) return [];
    
    return searchResults.sort((a, b) => {
      // Prioritize exact E-number matches
      if (debouncedSearchTerm) {
        const termLower = debouncedSearchTerm.toLowerCase();
        const aExact = a.e_number.toLowerCase() === termLower;
        const bExact = b.e_number.toLowerCase() === termLower;
        
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        // Then prioritize E-number starts with
        const aStarts = a.e_number.toLowerCase().startsWith(termLower);
        const bStarts = b.e_number.toLowerCase().startsWith(termLower);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
      }
      
      // Finally sort by E-number
      return a.e_number.localeCompare(b.e_number);
    });
  }, [searchResults, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    searchResults: filteredResults,
    isSearching,
    hasActiveSearch,
    clearSearch: () => {
      setSearchTerm('');
      setSelectedCategory(null);
    }
  };
};