// types/shopping-list.ts

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string | null;
  unit: string | null;
  category: string | null;
  completed: boolean;
  position: number;
  created_at: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  created_at: string;
  updated_at: string;
}

export interface PublicList {
  slug: string;
  title: string;
  description: string | null;
  lang: string;
  is_public: boolean;
  items: PublicListItem[];
  updated_at: string;
  created_at: string;
}

export interface PublicListItem {
  name: string;
  quantity: string | null;
  category: string | null;
  checked: boolean;
  position: number;
}

export interface SharedList {
  token: string;
  items: ShoppingListItem[];
  created_at: string;
  expires_at: string;
}

// Kategorier för inköpslistor
export const LIST_CATEGORIES = [
  'Mejeri',
  'Kött',
  'Fisk',
  'Frukt',
  'Grönsaker',
  'Bageri',
  'Fryst',
  'Torrvaror',
  'Konserver',
  'Dryck',
  'Hygien',
  'Städ',
  'Övrigt',
] as const;

export type ListCategory = typeof LIST_CATEGORIES[number];

// Enheter
export const UNITS = [
  'st',
  'kg',
  'g',
  'l',
  'dl',
  'ml',
  'förp',
  'påse',
  'burk',
  'flaska',
] as const;

export type Unit = typeof UNITS[number];
