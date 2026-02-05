"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { EAdditiveCard } from "@/components/EAdditiveCard";
import type { EAdditive } from "@/types/e-additive";
import { E_CATEGORIES, getRiskLevel } from "@/types/e-additive";

interface EAdditiveSearchProps {
  additives: EAdditive[];
}

export function EAdditiveSearch({ additives }: EAdditiveSearchProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    additives.forEach((a) => {
      cats.set(a.category, (cats.get(a.category) || 0) + 1);
    });
    return Array.from(cats.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }, [additives]);

  const filtered = useMemo(() => {
    let result = additives;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.e_number.toLowerCase().includes(q) ||
          a.common_name?.toLowerCase().includes(q) ||
          a.short_description?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      result = result.filter(
        (a) => a.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (riskFilter) {
      const [min, max] = riskFilter.split("-").map(Number);
      result = result.filter(
        (a) => a.risk_score >= min && a.risk_score <= max
      );
    }

    return result;
  }, [additives, query, categoryFilter, riskFilter]);

  const hasActiveFilters = query || categoryFilter || riskFilter;

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="bg-card border rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök E-nummer eller namn (t.ex. E100, Kurkumin)..."
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

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-48"
            >
              <option value="">Alla kategorier</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-40"
          >
            <option value="">Alla risker</option>
            <option value="1-3">Låg (1-3)</option>
            <option value="4-6">Medel (4-6)</option>
            <option value="7-10">Hög (7-10)</option>
          </select>

          {/* Clear Button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setQuery("");
                setCategoryFilter("");
                setRiskFilter("");
              }}
              className="h-10 px-4 rounded-lg border border-input bg-background text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Rensa
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-muted-foreground">
          Visar{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          av {additives.length} E-ämnen
          {hasActiveFilters && (
            <span className="text-primary"> (filtrerade)</span>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((additive) => (
            <EAdditiveCard key={additive.id} additive={additive} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Inga resultat</h3>
          <p className="text-muted-foreground mb-4">
            Inga E-ämnen matchade dina filter. Prova att ändra sökkriterier.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategoryFilter("");
              setRiskFilter("");
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
