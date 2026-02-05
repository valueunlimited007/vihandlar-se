import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EAdditive } from './useEAdditives';

export interface EAdditiveFilters {
  searchTerm: string;
  category: string;
  riskLevel: string;
  origin?: string;
  hasAdi?: boolean;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEBOUNCE_DELAY = 300;

export const useEAdditiveOptimizedSearch = () => {
  const [filters, setFilters] = useState<EAdditiveFilters>({
    searchTerm: '',
    category: 'all',
    riskLevel: 'all',
    sortBy: 'e_number',
    sortDirection: 'asc'
  });
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term with improved performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [filters.searchTerm]);

  // Enhanced caching with stale-while-revalidate pattern
  const { data: allAdditives, isLoading, error } = useQuery({
    queryKey: ['e-additives-optimized'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select(`
          id,
          e_number,
          name,
          common_name,
          category,
          risk_score,
          origin,
          adi_value,
          short_description,
          slug,
          is_published
        `)
        .eq('is_published', true)
        .order('e_number');
      
      if (error) throw error;
      return data as EAdditive[];
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION * 2,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  // Memoized filtering with performance optimizations
  const filteredResults = useMemo(() => {
    if (!allAdditives) return [];

    const searchLower = debouncedSearchTerm.toLowerCase();
    
    let filtered = allAdditives.filter(additive => {
      // Early returns for performance
      if (filters.category !== 'all' && additive.category !== filters.category) {
        return false;
      }

      if (filters.riskLevel !== 'all') {
        const riskScore = additive.risk_score || 0;
        switch (filters.riskLevel) {
          case 'low': if (riskScore > 3) return false; break;
          case 'medium': if (riskScore < 4 || riskScore > 6) return false; break;
          case 'high': if (riskScore < 7) return false; break;
        }
      }

      if (filters.origin && filters.origin !== 'all' && additive.origin !== filters.origin) {
        return false;
      }

      if (filters.hasAdi !== undefined) {
        const hasAdi = additive.adi_value !== null && additive.adi_value !== undefined;
        if (filters.hasAdi !== hasAdi) return false;
      }

      // Search filter (most expensive, do last)
      if (searchLower) {
        return (
          additive.e_number.toLowerCase().includes(searchLower) ||
          additive.name.toLowerCase().includes(searchLower) ||
          additive.common_name?.toLowerCase().includes(searchLower) ||
          additive.category.toLowerCase().includes(searchLower) ||
          additive.short_description?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Optimized sorting
    const sortMultiplier = filters.sortDirection === 'desc' ? -1 : 1;
    
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'e_number':
          const aNum = parseInt(a.e_number.replace('E', ''));
          const bNum = parseInt(b.e_number.replace('E', ''));
          comparison = aNum - bNum;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'risk_score':
          comparison = (a.risk_score || 0) - (b.risk_score || 0);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'adi_value':
          comparison = (a.adi_value || 0) - (b.adi_value || 0);
          break;
      }
      
      return comparison * sortMultiplier;
    });

    return filtered;
  }, [allAdditives, debouncedSearchTerm, filters]);

  const updateFilter = useCallback((key: keyof EAdditiveFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      category: 'all',
      riskLevel: 'all',
      sortBy: 'e_number',
      sortDirection: 'asc'
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm !== '' || 
           filters.category !== 'all' || 
           filters.riskLevel !== 'all' ||
           filters.origin !== undefined ||
           filters.hasAdi !== undefined;
  }, [filters]);

  // Get unique origins (memoized for performance)
  const availableOrigins = useMemo(() => {
    if (!allAdditives) return [];
    const origins = allAdditives
      .map(a => a.origin)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    return origins.sort();
  }, [allAdditives]);

  return {
    filters,
    updateFilter,
    clearFilters,
    results: filteredResults,
    isLoading,
    error,
    hasActiveFilters,
    totalCount: allAdditives?.length || 0,
    availableOrigins
  };
};