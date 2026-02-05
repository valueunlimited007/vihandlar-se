import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EAdditive } from './useEAdditives';

// Enhanced caching utilities for E-additives
export const useEAdditiveCache = () => {
  const queryClient = useQueryClient();

  // Prefetch related E-additives for better UX
  const prefetchRelatedAdditives = useCallback(async (category?: string, excludeId?: string) => {
    if (!category) return;

    const queryKey = ['e-additives-category', category];
    
    // Check if data is already cached
    const cachedData = queryClient.getQueryData(queryKey);
    if (cachedData) return;

    // Prefetch related additives in the same category
    queryClient.prefetchQuery({
      queryKey,
      queryFn: async () => {
        // This would normally make an API call, but we'll use the cache instead
        const allAdditives = queryClient.getQueryData(['e-additives']) as EAdditive[] || [];
        return allAdditives.filter(additive => 
          additive.category === category && 
          additive.id !== excludeId
        ).slice(0, 10); // Limit to 10 related items
      },
      staleTime: 10 * 60 * 1000
    });
  }, [queryClient]);

  // Smart cache warming for commonly accessed data
  const warmCache = useCallback(async () => {
    // Don't do anything - let the actual hooks handle their own caching
    // This prevents interference with the natural React Query flow
    console.log('Cache warming skipped to prevent interference');
  }, []);

  // Intelligent cache invalidation
  const invalidateRelatedQueries = useCallback((additiveId: string, category?: string) => {
    // Invalidate specific additive
    queryClient.invalidateQueries({ 
      queryKey: ['e-additive'],
      exact: false 
    });

    // Invalidate category-specific queries
    if (category) {
      queryClient.invalidateQueries({ 
        queryKey: ['e-additives-category', category] 
      });
    }

    // Invalidate search results
    queryClient.invalidateQueries({ 
      queryKey: ['e-additives-optimized'] 
    });
  }, [queryClient]);

  // Cache optimization utilities
  const getCacheStats = useCallback(() => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    const eAdditiveQueries = queries.filter(query => 
      query.queryKey[0]?.toString().startsWith('e-additive')
    );

    const stats = {
      totalQueries: eAdditiveQueries.length,
      staleQueries: eAdditiveQueries.filter(q => q.isStale()).length,
      loadingQueries: eAdditiveQueries.filter(q => q.state.fetchStatus === 'fetching').length,
      cachedDataSize: eAdditiveQueries.reduce((size, query) => {
        const data = query.state.data;
        return size + (data ? JSON.stringify(data).length : 0);
      }, 0),
      oldestQuery: Math.min(...eAdditiveQueries.map(q => q.state.dataUpdatedAt || Date.now())),
      newestQuery: Math.max(...eAdditiveQueries.map(q => q.state.dataUpdatedAt || 0))
    };

    return stats;
  }, [queryClient]);

  // Proactive cache management
  const optimizeCache = useCallback(() => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes

    // Only remove very old queries, not all cache
    queries.forEach(query => {
      if (query.state.dataUpdatedAt && (now - query.state.dataUpdatedAt) > maxAge) {
        if (!query.queryKey[0]?.toString().includes('e-additive-categories')) {
          // Don't remove category cache as it's rarely updated
          queryClient.removeQueries({ queryKey: query.queryKey });
        }
      }
    });

    // DON'T clear all cache - this was causing the loading issue
    // queryClient.getQueryCache().clear();
    // queryClient.getMutationCache().clear();
  }, [queryClient]);

  // Background cache refresh
  const backgroundRefresh = useCallback(() => {
    const criticalQueries = [
      ['e-additive-categories'],
      ['e-additive-letter-counts'],
      ['e-additives-optimized']
    ];

    criticalQueries.forEach((queryKey, index) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ 
          queryKey,
          refetchType: 'active' // Only refetch if component is mounted
        });
      }, index * 500); // Stagger refreshes
    });
  }, [queryClient]);

  const cacheUtils = useMemo(() => ({
    prefetchRelatedAdditives,
    warmCache,
    invalidateRelatedQueries,
    getCacheStats,
    optimizeCache,
    backgroundRefresh
  }), [
    prefetchRelatedAdditives,
    warmCache,
    invalidateRelatedQueries,
    getCacheStats,
    optimizeCache,
    backgroundRefresh
  ]);

  return cacheUtils;
};

// Cache configuration presets
export const cachePresets = {
  aggressive: {
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  },
  
  balanced: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  },
  
  fresh: {
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  }
};