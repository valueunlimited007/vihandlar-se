"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Check,
  Trash2,
  Share2,
  Copy,
  CheckCheck,
  ShoppingCart,
  Loader2,
  X,
  ListChecks,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/useShoppingList";
import { QUICK_ADD_ITEMS } from "@/types/shopping-list";

interface ShoppingListProps {
  shareToken: string;
}

export function ShoppingList({ shareToken }: ShoppingListProps) {
  const {
    list,
    loading,
    error,
    pendingItems,
    completedItems,
    addItem,
    toggleItem,
    deleteItem,
    saveLocalListId,
  } = useShoppingList(shareToken);

  const [inputValue, setInputValue] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  // Save list to user's local storage on first load
  useEffect(() => {
    if (list) {
      saveLocalListId(list.shareToken);
    }
  }, [list, saveLocalListId]);

  const handleAddItem = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Support comma-separated items
    const items = trimmed.split(",").map((s) => s.trim()).filter(Boolean);

    for (const item of items) {
      await addItem(item);
    }

    setInputValue("");
    inputRef.current?.focus();
  };

  const handleQuickAdd = async (name: string) => {
    await addItem(name);
    inputRef.current?.focus();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/inkopslista/dela/${shareToken}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: list?.name ?? "Inköpslista",
          text: "Kolla vår delade inköpslista!",
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // Clipboard failed
    }
  };

  if (loading && !list) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Laddar lista...</p>
      </div>
    );
  }

  if (error && !list) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium mb-2">Listan hittades inte</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!list) return null;

  const filteredSuggestions = QUICK_ADD_ITEMS.filter(
    (s) =>
      !list.items.some(
        (i) => i.name.toLowerCase() === s.name.toLowerCase()
      ) &&
      (!inputValue ||
        s.name.toLowerCase().includes(inputValue.toLowerCase()))
  ).slice(0, inputValue ? 4 : 8);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{list.name}</h1>
          <p className="text-sm text-muted-foreground">
            {pendingItems.length} kvar
            {completedItems.length > 0 &&
              ` · ${completedItems.length} avklarade`}
          </p>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          {shareStatus === "copied" ? (
            <>
              <CheckCheck className="w-4 h-4" />
              Kopierad!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Dela
            </>
          )}
        </button>
      </div>

      {/* Add Item Form */}
      <Card className="border-primary/20">
        <CardContent className="pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddItem();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Lägg till vara..."
              className="flex-1 px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Lägg till
            </button>
          </form>

          {/* Quick add suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {filteredSuggestions.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handleQuickAdd(s.name)}
                  className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  + {s.name}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Items */}
      {pendingItems.length > 0 ? (
        <div className="space-y-1">
          {pendingItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border hover:border-primary/30 transition-colors group"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 hover:border-primary hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0"
                aria-label={`Markera ${item.name} som klar`}
              >
                <Check className="w-3.5 h-3.5 text-transparent group-hover:text-primary/50" />
              </button>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium">{item.name}</span>
                {item.quantity && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {item.quantity}
                    {item.unit ? ` ${item.unit}` : ""}
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1.5 rounded-md text-muted-foreground/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`Ta bort ${item.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <ListChecks className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            {completedItems.length > 0
              ? "Alla varor avklarade!"
              : "Listan är tom. Lägg till varor ovan."}
          </p>
        </div>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <CheckCheck className="w-4 h-4" />
            {showCompleted ? "Dölj" : "Visa"} avklarade (
            {completedItems.length})
          </button>

          {showCompleted && (
            <div className="space-y-1">
              {completedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-transparent group"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0"
                    aria-label={`Markera ${item.name} som ej klar`}
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <span className="text-sm text-muted-foreground line-through flex-1">
                    {item.name}
                    {item.quantity && (
                      <span className="ml-2 text-xs">
                        {item.quantity}
                        {item.unit ? ` ${item.unit}` : ""}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-md text-muted-foreground/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Ta bort ${item.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Share info */}
      <div className="p-3 rounded-lg bg-muted/30 border text-center">
        <p className="text-xs text-muted-foreground">
          Dela denna länk för att handla tillsammans:
        </p>
        <button
          onClick={handleShare}
          className="text-xs text-primary font-medium mt-1 hover:underline flex items-center gap-1 mx-auto"
        >
          <Copy className="w-3 h-3" />
          {typeof window !== "undefined"
            ? `${window.location.origin}/inkopslista/dela/${shareToken}`
            : `/inkopslista/dela/${shareToken}`}
        </button>
      </div>
    </div>
  );
}
