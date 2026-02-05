"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Food, FoodCategory } from "@/types/food";
import { SWEDISH_ALPHABET } from "@/types/food";

interface FoodSearchProps {
  foods: Food[];
  categories: FoodCategory[];
  letterCounts: Record<string, number>;
}

export function FoodSearch({ foods, categories, letterCounts }: FoodSearchProps) {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const filtered = useMemo(() => {
    let result = foods;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.short_description?.toLowerCase().includes(q) ||
          f.subcategory?.toLowerCase().includes(q)
      );
    }

    if (activeLetter) {
      result = result.filter(
        (f) => f.letter.toUpperCase() === activeLetter
      );
    }

    if (activeCategory) {
      result = result.filter((f) => f.category_id === activeCategory);
    }

    return result.sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }, [foods, query, activeLetter, activeCategory]);

  const hasActiveFilters = query || activeLetter || activeCategory;

  return (
    <div>
      {/* Search */}
      <div className="bg-card border border-primary/20 rounded-xl p-4 mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök livsmedel (t.ex. Apelsin, Lax, Havregryn)..."
            className="w-full h-10 pl-9 pr-9 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {SWEDISH_ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() =>
                  setActiveLetter(isActive ? "" : letter)
                }
                disabled={count === 0}
                className={cn(
                  "alphabet-item",
                  isActive && "alphabet-item-active",
                  count === 0 && "alphabet-item-disabled"
                )}
                title={count > 0 ? `${count} livsmedel` : "Inga livsmedel"}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveCategory("")}
          className={cn(
            "category-pill",
            !activeCategory && "category-pill-active"
          )}
        >
          Alla
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.id ? "" : cat.id
              )
            }
            className={cn(
              "category-pill",
              activeCategory === cat.id && "category-pill-active"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-4 text-center">
        Visar{" "}
        <span className="font-semibold text-foreground">
          {filtered.length}
        </span>{" "}
        av {foods.length} livsmedel
        {hasActiveFilters && (
          <>
            <span className="text-primary"> (filtrerade)</span>
            {" · "}
            <button
              onClick={() => {
                setQuery("");
                setActiveLetter("");
                setActiveCategory("");
              }}
              className="text-primary hover:underline"
            >
              Rensa filter
            </button>
          </>
        )}
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((food) => (
            <Link
              key={food.id}
              href={`/livsmedel/${food.slug}`}
              className="group block rounded-lg border bg-card shadow-sm overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:border-primary/40 transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {food.name}
                    </h3>
                    {food.subcategory && (
                      <p className="text-xs text-muted-foreground">
                        {food.subcategory}
                      </p>
                    )}
                  </div>
                  {food.calories != null && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {food.calories} kcal
                    </Badge>
                  )}
                </div>

                {food.short_description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {food.short_description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {food.can_freeze && (
                    <Badge variant="secondary" className="text-xs">
                      Frysbar
                    </Badge>
                  )}
                  {food.allergens && food.allergens.length > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      Allergen
                    </Badge>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t">
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Läs mer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Inga resultat</h3>
          <p className="text-muted-foreground mb-4">
            Inga livsmedel matchade dina filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveLetter("");
              setActiveCategory("");
            }}
            className="text-primary hover:underline text-sm font-medium"
          >
            Rensa alla filter
          </button>
        </div>
      )}
    </div>
  );
}
