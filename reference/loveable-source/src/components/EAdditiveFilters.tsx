import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';

interface EAdditiveFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  categories: string[];
  categoriesLoading: boolean;
  resultsCount: number;
  totalCount: number;
  onClearFilters: () => void;
  onPageChange?: (page: number) => void;
  compact?: boolean;
}

export const EAdditiveFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  categories,
  categoriesLoading,
  resultsCount,
  totalCount,
  onClearFilters,
  compact = false
}: EAdditiveFiltersProps) => {
  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || riskFilter !== 'all';

  const sortOptions = [
    { value: 'e_number-asc', label: 'E-nummer (stigande)' },
    { value: 'e_number-desc', label: 'E-nummer (fallande)' },
    { value: 'name-asc', label: 'Namn (A-Ö)' },
    { value: 'name-desc', label: 'Namn (Ö-A)' },
    { value: 'risk_score-desc', label: 'Risknivå (hög-låg)' },
    { value: 'risk_score-asc', label: 'Risknivå (låg-hög)' },
    { value: 'category-asc', label: 'Kategori (A-Ö)' }
  ];

  const handleSortChange = (value: string) => {
    const [newSortBy, newDirection] = value.split('-') as [string, 'asc' | 'desc'];
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  const currentSortValue = `${sortBy}-${sortDirection}`;

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Sök E-nummer eller namn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla kategorier</SelectItem>
            {!categoriesLoading && categories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla risker</SelectItem>
            <SelectItem value="low">Låg (1-3)</SelectItem>
            <SelectItem value="medium">Medel (4-6)</SelectItem>
            <SelectItem value="high">Hög (7-10)</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtrera och sök
        </CardTitle>
        <CardDescription>
          Använd filtren för att hitta specifika E-ämnen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Sök E-nummer eller namn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Alla kategorier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kategorier</SelectItem>
              {!categoriesLoading && categories?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Alla risknivåer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla risknivåer</SelectItem>
              <SelectItem value="low">Låg risk (1-3)</SelectItem>
              <SelectItem value="medium">Medel risk (4-6)</SelectItem>
              <SelectItem value="high">Hög risk (7-10)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currentSortValue} onValueChange={handleSortChange}>
            <SelectTrigger>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sortera" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Aktiva filter:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Sök: {searchTerm}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setSearchTerm('')}
                />
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setSelectedCategory('all')}
                />
              </Badge>
            )}
            {riskFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {riskFilter === 'low' ? 'Låg risk' : riskFilter === 'medium' ? 'Medel risk' : 'Hög risk'}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => setRiskFilter('all')}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Results summary */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {resultsCount} av {totalCount} E-ämnen{hasActiveFilters && ' (filtrerade)'}
          </div>
          
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Rensa alla filter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};