import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface FoodCountByLetter {
  letter: string;
  count: number;
}

const fetchFoodCountsByLetter = async (): Promise<FoodCountByLetter[]> => {
  const { data, error } = await supabase
    .from('foods')
    .select('letter')
    .order('letter');

  if (error) {
    throw new Error(`Failed to fetch food counts: ${error.message}`);
  }

  // Count foods by letter
  const letterCounts = (data || []).reduce((acc: Record<string, number>, food) => {
    const letter = food.letter?.toUpperCase() || '';
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});

  // Create array with all letters A-Z, Å, Ä, Ö
  const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];
  
  return allLetters.map(letter => ({
    letter,
    count: letterCounts[letter] || 0
  }));
};

export const useFoodCountsByLetter = () => {
  return useQuery({
    queryKey: ['food-counts-by-letter'],
    queryFn: fetchFoodCountsByLetter,
    staleTime: 30 * 60 * 1000, // 30 minutes - food counts don't change often
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    retryDelay: 1000
  });
};