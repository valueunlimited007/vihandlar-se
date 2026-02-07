// types/shopping-list.ts

export interface ShoppingListItem {
  id: string;
  listId: string;
  name: string;
  quantity: string | null;
  unit: string | null;
  category: string | null;
  completed: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  shareToken: string;
  items: ShoppingListItem[];
  createdAt: string;
  updatedAt: string;
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

// Presence
export interface PresenceEntry {
  sessionId: string;
  deviceType: string;
  joinedAt: string;
  lastSeen: string;
}

// SSE event types
export type ListEvent =
  | { type: "item_added"; item: ShoppingListItem }
  | { type: "item_updated"; item: ShoppingListItem }
  | { type: "item_deleted"; itemId: string }
  | { type: "list_updated"; list: Pick<ShoppingList, "name" | "updatedAt"> };

// Kategorier för inköpslistor
export const LIST_CATEGORIES = [
  "Mejeri",
  "Kött",
  "Fisk",
  "Frukt",
  "Grönsaker",
  "Bageri",
  "Fryst",
  "Torrvaror",
  "Konserver",
  "Dryck",
  "Hygien",
  "Städ",
  "Övrigt",
] as const;

export type ListCategory = (typeof LIST_CATEGORIES)[number];

// Enheter
export const UNITS = [
  "st",
  "kg",
  "g",
  "l",
  "dl",
  "ml",
  "förp",
  "påse",
  "burk",
  "flaska",
] as const;

export type Unit = (typeof UNITS)[number];

// Quick-add suggestions (top items by priority)
export const QUICK_ADD_ITEMS = [
  { name: "Mjölk", category: "Mejeri" },
  { name: "Bröd", category: "Bageri" },
  { name: "Smör", category: "Mejeri" },
  { name: "Ägg", category: "Mejeri" },
  { name: "Ost", category: "Mejeri" },
  { name: "Bananer", category: "Frukt" },
  { name: "Äpplen", category: "Frukt" },
  { name: "Potatis", category: "Grönsaker" },
  { name: "Lök", category: "Grönsaker" },
  { name: "Morötter", category: "Grönsaker" },
  { name: "Tomater", category: "Grönsaker" },
  { name: "Gurka", category: "Grönsaker" },
  { name: "Kycklingfilé", category: "Kött" },
  { name: "Köttfärs", category: "Kött" },
  { name: "Pasta", category: "Torrvaror" },
  { name: "Ris", category: "Torrvaror" },
  { name: "Yoghurt", category: "Mejeri" },
  { name: "Kaffe", category: "Dryck" },
] as const;

// Validation
export const ITEM_NAME_REGEX = /^[\w\s\-åäöÅÄÖéÉüÜ.,!?()\/&%:]+$/;
export const MAX_ITEM_NAME_LENGTH = 100;
export const MAX_LIST_NAME_LENGTH = 50;
