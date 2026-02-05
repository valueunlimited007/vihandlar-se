import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

interface PublicList {
  slug: string;
  title: string;
  description?: string;
  updated_at: string;
}

const fetchPublicLists = async (): Promise<PublicList[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const res = await fetch('https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/lists', {
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 10) : [];
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const usePublicLists = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['public-lists'],
    queryFn: fetchPublicLists,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000
  });

  const fetchState = {
    loading: isLoading,
    error: error?.message || null,
    data: data || []
  };

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return { fetchState, handleRetry };
};