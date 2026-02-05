import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/RiskGauge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEAdditiveSearch } from '@/hooks/useEAdditiveSearch';
import { useEAdditiveCategories } from '@/hooks/useEAdditives';

interface EAdditiveSearchProps {
  onSearchToggle?: (isActive: boolean) => void;
}

export const EAdditiveSearch = ({ onSearchToggle }: EAdditiveSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: categories } = useEAdditiveCategories();
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    isSearching,
    hasActiveSearch,
    clearSearch
  } = useEAdditiveSearch();

  const handleSearchFocus = () => {
    setIsExpanded(true);
    onSearchToggle?.(true);
  };

  const handleClearSearch = () => {
    clearSearch();
    setIsExpanded(false);
    onSearchToggle?.(false);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? null : value);
    if (!isExpanded) {
      setIsExpanded(true);
      onSearchToggle?.(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Sök E-nummer eller namn (t.ex. E100, Kurkumin)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  autoComplete="off"
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Alla kategorier" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border">
                    <SelectItem value="all">Alla kategorier</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value="all" onValueChange={(value) => {
                  // Risk level filter - enhanced functionality
                  if (!isExpanded) {
                    setIsExpanded(true);
                    onSearchToggle?.(true);
                  }
                }}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Risk nivå" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla risker</SelectItem>
                    <SelectItem value="low">Låg (1-3)</SelectItem>
                    <SelectItem value="medium">Medel (4-6)</SelectItem>
                    <SelectItem value="high">Hög (7-10)</SelectItem>
                  </SelectContent>
                </Select>
                
                {hasActiveSearch && (
                  <Button
                    variant="outline"
                    onClick={handleClearSearch}
                    className="whitespace-nowrap"
                  >
                    Rensa
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasActiveSearch && (
        <div className="space-y-4">
          {isSearching ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Söker...</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} resultat
                  {searchTerm && ` för "${searchTerm}"`}
                  {selectedCategory && ` i kategorin "${selectedCategory}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((additive) => (
                  <Link
                    key={additive.id}
                    to={`/e-amnen/${additive.slug}`}
                    className="block"
                  >
                    <Card className="hover:border-primary/40 transition-colors h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{additive.e_number}</CardTitle>
                            <p className="text-sm font-medium text-muted-foreground">
                              {additive.name}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {additive.category}
                            </Badge>
                          </div>
                          <RiskGauge score={additive.risk_score || 0} size="sm" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {additive.short_description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : hasActiveSearch ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Inga resultat</h3>
              <p className="text-muted-foreground mb-4">
                Inga E-ämnen matchade din sökning.
              </p>
              <Button variant="outline" onClick={handleClearSearch}>
                Rensa sökning
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};