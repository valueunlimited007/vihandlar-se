import { useState, useEffect, useMemo } from 'react';
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

export const useEAdditiveAdvancedSearch = () => {
  const [filters, setFilters] = useState<EAdditiveFilters>({
    searchTerm: '',
    category: 'all',
    riskLevel: 'all',
    sortBy: 'e_number',
    sortDirection: 'asc'
  });
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.searchTerm]);

  // Fetch all additives (we'll filter client-side for better UX)
  const { data: allAdditives, isLoading } = useQuery({
    queryKey: ['e-additives-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('*')
        .eq('is_published', true)
        .order('e_number');
      
      if (error) throw error;
      return data as EAdditive[];
    }
  });

  // Filter and sort results
  const filteredResults = useMemo(() => {
    if (!allAdditives) return [];

    let filtered = allAdditives.filter(additive => {
      // Search filter
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        const matchesSearch = 
          additive.e_number.toLowerCase().includes(searchLower) ||
          additive.name.toLowerCase().includes(searchLower) ||
          additive.common_name?.toLowerCase().includes(searchLower) ||
          additive.category.toLowerCase().includes(searchLower) ||
          additive.short_description?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'all' && additive.category !== filters.category) {
        return false;
      }

      // Risk level filter
      if (filters.riskLevel !== 'all') {
        const riskScore = additive.risk_score || 0;
        switch (filters.riskLevel) {
          case 'low': return riskScore <= 3;
          case 'medium': return riskScore >= 4 && riskScore <= 6;
          case 'high': return riskScore >= 7;
          default: return true;
        }
      }

      // Origin filter
      if (filters.origin && filters.origin !== 'all') {
        if (!additive.origin || additive.origin !== filters.origin) {
          return false;
        }
      }

      // Has ADI filter
      if (filters.hasAdi !== undefined) {
        const hasAdi = additive.adi_value !== null && additive.adi_value !== undefined;
        if (filters.hasAdi !== hasAdi) {
          return false;
        }
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'e_number':
          aValue = parseInt(a.e_number.replace('E', ''));
          bValue = parseInt(b.e_number.replace('E', ''));
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'risk_score':
          aValue = a.risk_score || 0;
          bValue = b.risk_score || 0;
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'adi_value':
          aValue = a.adi_value || 0;
          bValue = b.adi_value || 0;
          break;
        default:
          return 0;
      }

      if (filters.sortDirection === 'desc') {
        [aValue, bValue] = [bValue, aValue];
      }

      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      
      return aValue - bValue;
    });

    return filtered;
  }, [allAdditives, debouncedSearchTerm, filters]);

  const updateFilter = (key: keyof EAdditiveFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'all',
      riskLevel: 'all',
      sortBy: 'e_number',
      sortDirection: 'asc'
    });
  };

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm !== '' || 
           filters.category !== 'all' || 
           filters.riskLevel !== 'all' ||
           filters.origin !== undefined ||
           filters.hasAdi !== undefined;
  }, [filters]);

  // Get unique values for filter options
  const getUniqueOrigins = () => {
    if (!allAdditives) return [];
    const origins = allAdditives
      .map(a => a.origin)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    return origins.sort();
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    results: filteredResults,
    isLoading,
    hasActiveFilters,
    totalCount: allAdditives?.length || 0,
    availableOrigins: getUniqueOrigins()
  };
};