import { ShoppingItem } from '@/hooks/useShoppingList';

const CATEGORY_ORDER = {
  frukt: 1,
  grönt: 2,
  mejeri: 3,
  kött: 4,
  fisk: 5,
  torra: 6,
  frys: 7,
  städ: 8,
  hygien: 9,
  övrigt: 10,
};

const categorizeItem = (itemName: string): string => {
  const name = itemName.toLowerCase();
  
  // Frukt & Grönt
  if (name.includes('banan') || name.includes('äpple') || name.includes('apelsin') || 
      name.includes('päron') || name.includes('vindruv') || name.includes('kiwi') ||
      name.includes('mango') || name.includes('citron')) {
    return 'frukt';
  }
  
  if (name.includes('tomat') || name.includes('gurka') || name.includes('löök') || 
      name.includes('potatis') || name.includes('morot') || name.includes('paprika') ||
      name.includes('sallad') || name.includes('broccoli') || name.includes('spenat')) {
    return 'grönt';
  }
  
  // Mejeri
  if (name.includes('mjölk') || name.includes('ost') || name.includes('smör') || 
      name.includes('ägg') || name.includes('yoghurt') || name.includes('fil') ||
      name.includes('grädde') || name.includes('keso')) {
    return 'mejeri';
  }
  
  // Kött & Fisk
  if (name.includes('kött') || name.includes('kyckling') || name.includes('korv') || 
      name.includes('bacon') || name.includes('köttfärs') || name.includes('fläsk') ||
      name.includes('nöt') || name.includes('lamm')) {
    return 'kött';
  }
  
  if (name.includes('fisk') || name.includes('lax') || name.includes('tonfisk') || 
      name.includes('räkor') || name.includes('torsk')) {
    return 'fisk';
  }
  
  // Torra varor
  if (name.includes('bröd') || name.includes('pasta') || name.includes('ris') || 
      name.includes('mjöl') || name.includes('socker') || name.includes('kaffe') ||
      name.includes('te') || name.includes('kex') || name.includes('flingor')) {
    return 'torra';
  }
  
  // Frys
  if (name.includes('glass') || name.includes('frysta') || name.includes('fryst')) {
    return 'frys';
  }
  
  // Hygien
  if (name.includes('toalettpapper') || name.includes('tandkräm') || name.includes('schampo') || 
      name.includes('tvål') || name.includes('deodorant')) {
    return 'hygien';
  }
  
  // Städ
  if (name.includes('diskmedel') || name.includes('tvättmedel') || name.includes('rengöring')) {
    return 'städ';
  }
  
  return 'övrigt';
};

export const useSmartSorting = () => {
  const sortItems = (items: ShoppingItem[]): ShoppingItem[] => {
    return [...items].sort((a, b) => {
      const categoryA = categorizeItem(a.name);
      const categoryB = categorizeItem(b.name);
      
      const orderA = CATEGORY_ORDER[categoryA as keyof typeof CATEGORY_ORDER] || 10;
      const orderB = CATEGORY_ORDER[categoryB as keyof typeof CATEGORY_ORDER] || 10;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // If same category, sort alphabetically
      return a.name.localeCompare(b.name, 'sv');
    });
  };

  return { sortItems, categorizeItem };
};