// lib/kv.ts — Storage abstraction for shopping lists
// Uses Vercel KV (Redis) in production, in-memory fallback for development

import type { ShoppingList, ShoppingListItem } from "@/types/shopping-list";

// ─── In-memory fallback for development ───────────────────────────

const memoryStore = new Map<string, string>();

async function kvGet<T>(key: string): Promise<T | null> {
  try {
    if (process.env.KV_REST_API_URL) {
      const { kv } = await import("@vercel/kv");
      return await kv.get<T>(key);
    }
  } catch {
    // Fall through to memory store
  }
  const value = memoryStore.get(key);
  return value ? (JSON.parse(value) as T) : null;
}

async function kvSet(key: string, value: unknown, ttl?: number): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL) {
      const { kv } = await import("@vercel/kv");
      if (ttl) {
        await kv.set(key, value, { ex: ttl });
      } else {
        await kv.set(key, value);
      }
      return;
    }
  } catch {
    // Fall through to memory store
  }
  memoryStore.set(key, JSON.stringify(value));
}

async function kvDel(key: string): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL) {
      const { kv } = await import("@vercel/kv");
      await kv.del(key);
      return;
    }
  } catch {
    // Fall through to memory store
  }
  memoryStore.delete(key);
}

// ─── ID Generation ────────────────────────────────────────────────

function generateId(): string {
  return crypto.randomUUID();
}

function generateShareToken(): string {
  return crypto.randomUUID();
}

// ─── List Operations ──────────────────────────────────────────────

export async function createList(name: string): Promise<ShoppingList> {
  const now = new Date().toISOString();
  const list: ShoppingList = {
    id: generateId(),
    name: name.trim().slice(0, 50),
    shareToken: generateShareToken(),
    items: [],
    createdAt: now,
    updatedAt: now,
  };

  // Store list data
  await kvSet(`list:${list.id}`, list);
  // Reverse lookup: token → id
  await kvSet(`token:${list.shareToken}`, list.id);

  return list;
}

export async function getListById(id: string): Promise<ShoppingList | null> {
  return kvGet<ShoppingList>(`list:${id}`);
}

export async function getListByToken(
  token: string
): Promise<ShoppingList | null> {
  const listId = await kvGet<string>(`token:${token}`);
  if (!listId) return null;
  return getListById(listId);
}

export async function updateList(list: ShoppingList): Promise<void> {
  list.updatedAt = new Date().toISOString();
  await kvSet(`list:${list.id}`, list);
}

export async function deleteList(id: string): Promise<void> {
  const list = await getListById(id);
  if (list) {
    await kvDel(`token:${list.shareToken}`);
    await kvDel(`list:${id}`);
  }
}

// ─── Item Operations ──────────────────────────────────────────────

export async function addItem(
  listId: string,
  name: string,
  quantity?: string | null,
  unit?: string | null,
  category?: string | null
): Promise<ShoppingListItem | null> {
  const list = await getListById(listId);
  if (!list) return null;

  const now = new Date().toISOString();
  const item: ShoppingListItem = {
    id: generateId(),
    listId,
    name: name.trim().slice(0, 100),
    quantity: quantity?.trim() || null,
    unit: unit?.trim() || null,
    category: category?.trim() || null,
    completed: false,
    position: list.items.length,
    createdAt: now,
    updatedAt: now,
  };

  list.items.push(item);
  await updateList(list);

  return item;
}

export async function toggleItem(
  listId: string,
  itemId: string
): Promise<ShoppingListItem | null> {
  const list = await getListById(listId);
  if (!list) return null;

  const item = list.items.find((i) => i.id === itemId);
  if (!item) return null;

  item.completed = !item.completed;
  item.updatedAt = new Date().toISOString();
  await updateList(list);

  return item;
}

export async function updateItem(
  listId: string,
  itemId: string,
  updates: Partial<Pick<ShoppingListItem, "name" | "quantity" | "unit" | "completed">>
): Promise<ShoppingListItem | null> {
  const list = await getListById(listId);
  if (!list) return null;

  const item = list.items.find((i) => i.id === itemId);
  if (!item) return null;

  if (updates.name !== undefined) item.name = updates.name.trim().slice(0, 100);
  if (updates.quantity !== undefined) item.quantity = updates.quantity;
  if (updates.unit !== undefined) item.unit = updates.unit;
  if (updates.completed !== undefined) item.completed = updates.completed;
  item.updatedAt = new Date().toISOString();

  await updateList(list);
  return item;
}

export async function deleteItem(
  listId: string,
  itemId: string
): Promise<boolean> {
  const list = await getListById(listId);
  if (!list) return false;

  const idx = list.items.findIndex((i) => i.id === itemId);
  if (idx === -1) return false;

  list.items.splice(idx, 1);
  await updateList(list);

  return true;
}

// ─── User Lists (localStorage IDs) ───────────────────────────────

export async function saveUserList(
  userId: string,
  listId: string
): Promise<void> {
  const key = `user:${userId}:lists`;
  const listIds = (await kvGet<string[]>(key)) ?? [];
  if (!listIds.includes(listId)) {
    listIds.push(listId);
    await kvSet(key, listIds);
  }
}

export async function getUserLists(
  userId: string
): Promise<ShoppingList[]> {
  const key = `user:${userId}:lists`;
  const listIds = (await kvGet<string[]>(key)) ?? [];

  const lists: ShoppingList[] = [];
  for (const id of listIds) {
    const list = await getListById(id);
    if (list) lists.push(list);
  }

  return lists.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
