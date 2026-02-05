import { useState, useEffect } from 'react';

const COMMON_ITEMS = [
  // Mejeri & Kött (alfabetisk ordning)
  { name: 'Bacon', category: 'kött', priority: 6 },
  { name: 'Creme fraiche', category: 'mejeri', priority: 5 },
  { name: 'Fisk', category: 'kött', priority: 6 },
  { name: 'Filmjölk', category: 'mejeri', priority: 6 },
  { name: 'Grädde', category: 'mejeri', priority: 6 },
  { name: 'Kassler', category: 'kött', priority: 5 },
  { name: 'Kött', category: 'kött', priority: 7 },
  { name: 'Kyckling', category: 'kött', priority: 8 },
  { name: 'Mjölk', category: 'mejeri', priority: 10 },
  { name: 'Mozzarella', category: 'mejeri', priority: 5 },
  { name: 'Ost', category: 'mejeri', priority: 8 },
  { name: 'Parmesan', category: 'mejeri', priority: 5 },
  { name: 'Skinka', category: 'kött', priority: 6 },
  { name: 'Smör', category: 'mejeri', priority: 8 },
  { name: 'Yoghurt', category: 'mejeri', priority: 6 },
  { name: 'Ägg', category: 'mejeri', priority: 9 },
  
  // Frukt & Grönt (alfabetisk ordning)
  { name: 'Avokado', category: 'frukt', priority: 6 },
  { name: 'Bananer', category: 'frukt', priority: 9 },
  { name: 'Citroner', category: 'frukt', priority: 5 },
  { name: 'Gurka', category: 'grönt', priority: 6 },
  { name: 'Lök', category: 'grönt', priority: 8 },
  { name: 'Morötter', category: 'grönt', priority: 6 },
  { name: 'Paprika', category: 'grönt', priority: 6 },
  { name: 'Potatis', category: 'grönt', priority: 8 },
  { name: 'Päron', category: 'frukt', priority: 6 },
  { name: 'Sallad', category: 'grönt', priority: 6 },
  { name: 'Tomater', category: 'grönt', priority: 7 },
  { name: 'Vitlök', category: 'grönt', priority: 5 },
  { name: 'Äpplen', category: 'frukt', priority: 8 },
  
  // Torra varor (alfabetisk ordning)
  { name: 'Bröd', category: 'torra', priority: 10 },
  { name: 'Flour', category: 'torra', priority: 4 },
  { name: 'Havregryn', category: 'torra', priority: 5 },
  { name: 'Kaffe', category: 'torra', priority: 8 },
  { name: 'Krossade tomater', category: 'torra', priority: 6 },
  { name: 'Olivolja', category: 'torra', priority: 6 },
  { name: 'Pasta', category: 'torra', priority: 7 },
  { name: 'Ris', category: 'torra', priority: 6 },
  { name: 'Salt', category: 'torra', priority: 4 },
  { name: 'Socker', category: 'torra', priority: 4 },
  { name: 'Spaghetti', category: 'torra', priority: 6 },
  { name: 'Te', category: 'torra', priority: 5 },
  
  // Snacks (alfabetisk ordning)
  { name: 'Chips', category: 'snacks', priority: 5 },
  { name: 'Nötter', category: 'snacks', priority: 4 },
  { name: 'Popcorn', category: 'snacks', priority: 4 },
  
  // Kyla & frys (alfabetisk ordning)
  { name: 'Frysta ärtor', category: 'frys', priority: 4 },
  { name: 'Frysta bär', category: 'frys', priority: 4 },
  { name: 'Glass', category: 'frys', priority: 5 },
  { name: 'Pizza', category: 'frys', priority: 5 },
  
  // Hygien & städ (alfabetisk ordning)
  { name: 'Diskmedel', category: 'städ', priority: 5 },
  { name: 'Schampo', category: 'hygien', priority: 4 },
  { name: 'Såpa', category: 'hygien', priority: 5 },
  { name: 'Tandkräm', category: 'hygien', priority: 5 },
  { name: 'Toalettpapper', category: 'hygien', priority: 7 },
  { name: 'Tvättmedel', category: 'städ', priority: 5 },
];

export const useQuickAddSuggestions = (currentInput: string = '') => {
  const [suggestions, setSuggestions] = useState(COMMON_ITEMS);

  useEffect(() => {
    if (!currentInput.trim()) {
      // Show most popular items when no input - include more items to show new ones
      setSuggestions(
        COMMON_ITEMS
          .sort((a, b) => b.priority - a.priority)
          .slice(0, 18) // Increased to 18 to show more suggestions
      );
    } else {
      // Filter based on input
      const filtered = COMMON_ITEMS
        .filter(item => 
          item.name.toLowerCase().includes(currentInput.toLowerCase()) ||
          item.category.toLowerCase().includes(currentInput.toLowerCase())
        )
        .sort((a, b) => {
          // Exact match first
          const aExact = a.name.toLowerCase() === currentInput.toLowerCase();
          const bExact = b.name.toLowerCase() === currentInput.toLowerCase();
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          
          // Then by priority
          return b.priority - a.priority;
        })
        .slice(0, 4);
      
      setSuggestions(filtered);
    }
  }, [currentInput]);

  return { suggestions };
};