import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProductAutocomplete } from '@/hooks/useProductAutocomplete';
import { cn } from '@/lib/utils';

interface ProductAutocompleteProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export const ProductAutocomplete = ({
  initialValue = '',
  onSearch,
  className,
}: ProductAutocompleteProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { suggestions, isSearching } = useProductAutocomplete(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectProduct = (storeSlug: string, productSlug: string) => {
    navigate(`/shopping/${storeSlug}/${productSlug}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const product = suggestions[selectedIndex];
          handleSelectProduct(product.store.slug, product.slug);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 text-primary font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Sök bland 7 709 produkter..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="h-14 pl-12 pr-12 text-lg bg-background border-2 border-border focus:border-primary transition-colors"
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        )}
      </form>

      {isOpen && query.length >= 2 && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-background border-2 border-border rounded-lg shadow-2xl overflow-hidden animate-fade-in"
        >
          <div className="max-h-[400px] overflow-y-auto">
            {suggestions.map((product, index) => (
              <button
                key={`${product.store.slug}-${product.slug}`}
                onClick={() => handleSelectProduct(product.store.slug, product.slug)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left',
                  selectedIndex === index && 'bg-muted'
                )}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border border-border"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded border border-border flex items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {highlightMatch(product.name, query)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {product.store.name}
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {product.price.toFixed(2)} kr
                </div>
              </button>
            ))}
          </div>
          <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground text-center">
            Tryck <kbd className="px-2 py-1 bg-background rounded border border-border">Enter</kbd> för att se alla resultat
          </div>
        </div>
      )}

      {isOpen && query.length >= 2 && suggestions.length === 0 && !isSearching && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-background border-2 border-border rounded-lg shadow-2xl p-4 text-center text-sm text-muted-foreground animate-fade-in"
        >
          Inga produkter hittades för "{query}"
        </div>
      )}
    </div>
  );
};
