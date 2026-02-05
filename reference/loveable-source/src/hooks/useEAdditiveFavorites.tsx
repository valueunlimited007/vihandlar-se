import { useState, useEffect } from 'react';
import { EAdditive } from './useEAdditives';

const FAVORITES_KEY = 'e-additive-favorites';

export const useEAdditiveFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Add to favorites
  const addToFavorites = (additive: EAdditive) => {
    setFavoriteIds(prev => {
      if (prev.includes(additive.id)) return prev;
      
      const newFavorites = [...prev, additive.id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
      return newFavorites;
    });
  };

  // Remove from favorites
  const removeFromFavorites = (additiveId: string) => {
    setFavoriteIds(prev => {
      const newFavorites = prev.filter(id => id !== additiveId);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
      return newFavorites;
    });
  };

  // Toggle favorite status
  const toggleFavorite = (additive: EAdditive) => {
    if (favoriteIds.includes(additive.id)) {
      removeFromFavorites(additive.id);
    } else {
      addToFavorites(additive);
    }
  };

  // Check if additive is favorite
  const isFavorite = (additiveId: string) => {
    return favoriteIds.includes(additiveId);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavoriteIds([]);
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  return {
    favoriteIds,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount: favoriteIds.length
  };
};