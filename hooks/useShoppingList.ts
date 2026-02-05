"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ShoppingList, ShoppingListItem } from "@/types/shopping-list";

const LOCAL_STORAGE_KEY = "vihandlar_lists";
const USER_ID_KEY = "vihandlar_user_id";

function getUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = `anon_${crypto.randomUUID()}`;
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

function getLocalListIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalListId(shareToken: string): void {
  const ids = getLocalListIds();
  if (!ids.includes(shareToken)) {
    ids.unshift(shareToken);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
  }
}

function removeLocalListId(shareToken: string): void {
  const ids = getLocalListIds().filter((id) => id !== shareToken);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}

// Cache list data in localStorage for offline/fast load
function cacheList(list: ShoppingList): void {
  try {
    localStorage.setItem(`list_cache:${list.shareToken}`, JSON.stringify(list));
  } catch {
    // Storage full or unavailable
  }
}

function getCachedList(token: string): ShoppingList | null {
  try {
    const raw = localStorage.getItem(`list_cache:${token}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useShoppingList(shareToken?: string) {
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Load list from API (or cache)
  const loadList = useCallback(
    async (token: string) => {
      setLoading(true);
      setError(null);

      // Show cached data immediately
      const cached = getCachedList(token);
      if (cached) setList(cached);

      try {
        const res = await fetch(`/api/lists/${token}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Listan hittades inte");
            setList(null);
          } else {
            throw new Error("Serverfel");
          }
          return;
        }
        const data = (await res.json()) as ShoppingList;
        setList(data);
        cacheList(data);
      } catch {
        if (!cached) {
          setError("Kunde inte ladda listan");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load on mount if token provided
  useEffect(() => {
    if (shareToken) {
      loadList(shareToken);
    }
  }, [shareToken, loadList]);

  // SSE realtime connection
  useEffect(() => {
    if (!shareToken) return;

    const connectSSE = () => {
      const es = new EventSource(`/api/lists/${shareToken}/stream`);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "update" && data.list) {
            setList(data.list);
            cacheList(data.list);
          } else if (data.type === "deleted") {
            setList(null);
            setError("Listan har tagits bort");
          }
        } catch {
          // Ignore parse errors
        }
      };

      es.onerror = () => {
        es.close();
        // Reconnect after 5 seconds
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [shareToken]);

  // Create a new list
  const createList = useCallback(async (name: string): Promise<ShoppingList | null> => {
    setLoading(true);
    setError(null);

    try {
      const userId = getUserId();
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userId }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Kunde inte skapa lista");
        return null;
      }

      const newList = (await res.json()) as ShoppingList;
      saveLocalListId(newList.shareToken);
      cacheList(newList);
      setList(newList);
      return newList;
    } catch {
      setError("Kunde inte skapa lista");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item(s)
  const addItem = useCallback(
    async (
      name: string,
      quantity?: string,
      unit?: string,
      category?: string
    ): Promise<ShoppingListItem | null> => {
      if (!list) return null;

      // Optimistic update
      const tempId = `temp_${Date.now()}`;
      const now = new Date().toISOString();
      const optimisticItem: ShoppingListItem = {
        id: tempId,
        listId: list.id,
        name: name.trim(),
        quantity: quantity || null,
        unit: unit || null,
        category: category || null,
        completed: false,
        position: list.items.length,
        createdAt: now,
        updatedAt: now,
      };

      setList((prev) =>
        prev
          ? { ...prev, items: [...prev.items, optimisticItem] }
          : prev
      );

      try {
        const res = await fetch(`/api/lists/${list.shareToken}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, quantity, unit, category }),
        });

        if (!res.ok) {
          // Revert optimistic update
          setList((prev) =>
            prev
              ? { ...prev, items: prev.items.filter((i) => i.id !== tempId) }
              : prev
          );
          return null;
        }

        const data = await res.json();
        const addedItem = data.items?.[0] as ShoppingListItem;

        // Replace optimistic item with real one
        setList((prev) => {
          if (!prev) return prev;
          const items = prev.items.map((i) =>
            i.id === tempId ? addedItem : i
          );
          const updated = { ...prev, items };
          cacheList(updated);
          return updated;
        });

        return addedItem;
      } catch {
        // Revert optimistic update
        setList((prev) =>
          prev
            ? { ...prev, items: prev.items.filter((i) => i.id !== tempId) }
            : prev
        );
        return null;
      }
    },
    [list]
  );

  // Toggle item completion
  const toggleItem = useCallback(
    async (itemId: string) => {
      if (!list) return;

      // Optimistic update
      setList((prev) => {
        if (!prev) return prev;
        const items = prev.items.map((i) =>
          i.id === itemId ? { ...i, completed: !i.completed } : i
        );
        const updated = { ...prev, items };
        cacheList(updated);
        return updated;
      });

      try {
        await fetch(`/api/lists/${list.shareToken}/items/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "toggle" }),
        });
      } catch {
        // Revert on failure — next SSE update will correct
      }
    },
    [list]
  );

  // Delete item
  const deleteItem = useCallback(
    async (itemId: string) => {
      if (!list) return;

      // Optimistic update
      const prevItems = list.items;
      setList((prev) => {
        if (!prev) return prev;
        const items = prev.items.filter((i) => i.id !== itemId);
        const updated = { ...prev, items };
        cacheList(updated);
        return updated;
      });

      try {
        const res = await fetch(
          `/api/lists/${list.shareToken}/items/${itemId}`,
          { method: "DELETE" }
        );
        if (!res.ok) {
          // Revert
          setList((prev) =>
            prev ? { ...prev, items: prevItems } : prev
          );
        }
      } catch {
        setList((prev) =>
          prev ? { ...prev, items: prevItems } : prev
        );
      }
    },
    [list]
  );

  // Delete list
  const removeList = useCallback(async () => {
    if (!list) return;

    try {
      await fetch(`/api/lists/${list.shareToken}`, { method: "DELETE" });
      removeLocalListId(list.shareToken);
      localStorage.removeItem(`list_cache:${list.shareToken}`);
      setList(null);
    } catch {
      setError("Kunde inte ta bort listan");
    }
  }, [list]);

  // Get all user's lists
  const getMyLists = useCallback(async (): Promise<ShoppingList[]> => {
    const tokens = getLocalListIds();
    const lists: ShoppingList[] = [];

    for (const token of tokens) {
      // Try cache first
      const cached = getCachedList(token);
      if (cached) {
        lists.push(cached);
        continue;
      }

      try {
        const res = await fetch(`/api/lists/${token}`);
        if (res.ok) {
          const data = (await res.json()) as ShoppingList;
          lists.push(data);
          cacheList(data);
        } else {
          // List no longer exists, remove from local
          removeLocalListId(token);
        }
      } catch {
        // Skip failed fetches
      }
    }

    return lists.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, []);

  // Computed values
  const pendingItems = list?.items.filter((i) => !i.completed) ?? [];
  const completedItems = list?.items.filter((i) => i.completed) ?? [];

  return {
    list,
    loading,
    error,
    pendingItems,
    completedItems,
    createList,
    loadList,
    addItem,
    toggleItem,
    deleteItem,
    removeList,
    getMyLists,
    saveLocalListId,
  };
}
