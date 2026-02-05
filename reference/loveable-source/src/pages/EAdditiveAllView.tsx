import { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EAdditiveGridSkeleton } from '@/components/EAdditiveCardSkeleton';
import { RiskGauge } from '@/components/RiskGauge';
import { EAdditiveFavoriteButton } from '@/components/EAdditiveFavoriteButton';
import { Link, useSearchParams } from 'react-router-dom';
import { useEAdditives, useEAdditiveCategories } from '@/hooks/useEAdditives';
import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown, AlertCircle } from 'lucide-react';

// Lazy load comparison component for better performance
const EAdditiveCompareView = lazy(() => 
  import('@/components/EAdditiveCompareView').then(module => ({ 
    default: module.EAdditiveCompareView 
  }))
);

const ITEMS_PER_PAGE = 20;

type SortOption = 'e_number' | 'name' | 'risk_score' | 'category';
type SortDirection = 'asc' | 'desc';

export const EAdditiveAllView = () => {
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('e_number');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const riskParam = searchParams.get('risk');
    if (riskParam === 'high') {
      setRiskFilter('high');
    } else if (riskParam === 'low') {
      setRiskFilter('low');
    } else if (riskParam === 'medium') {
      setRiskFilter('medium');
    }
  }, [searchParams]);

  const { data: additives, isLoading: additivesLoading, error: additivesError } = useEAdditives();
  const { data: categories, isLoading: categoriesLoading } = useEAdditiveCategories();

  // Filter and sort additives
  const filteredAdditives = useMemo(() => {
    if (!additives) return [];

    let filtered = additives.filter(additive => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          additive.e_number.toLowerCase().includes(searchLower) ||
          additive.name.toLowerCase().includes(searchLower) ||
          additive.common_name?.toLowerCase().includes(searchLower) ||
          additive.category.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && additive.category !== selectedCategory) {
        return false;
      }

      // Risk filter
      if (riskFilter !== 'all') {
        const riskScore = additive.risk_score || 0;
        switch (riskFilter) {
          case 'low': return riskScore <= 3;
          case 'medium': return riskScore >= 4 && riskScore <= 6;
          case 'high': return riskScore >= 7;
          default: return true;
        }
      }

      return true;
    });

    // Sort additives
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'e_number':
          aValue = parseInt(a.e_number.replace('E', ''));
          bValue = parseInt(b.e_number.replace('E', ''));
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'risk_score':
          aValue = a.risk_score || 0;
          bValue = b.risk_score || 0;
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [additives, searchTerm, selectedCategory, riskFilter, sortBy, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAdditives.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAdditives = filteredAdditives.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setRiskFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || riskFilter !== 'all';

  // Comparison handlers
  const toggleComparisonSelection = (additiveId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(additiveId) 
        ? prev.filter(id => id !== additiveId)
        : prev.length < 3 ? [...prev, additiveId] : prev
    );
  };

  const clearComparison = () => {
    setSelectedForComparison([]);
    setShowComparison(false);
  };

  if (additivesError) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                Kunde inte ladda E-ämnen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ett fel uppstod när E-ämnen skulle laddas. Försök igen senare.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full mt-4"
              >
                Ladda om sidan
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <ErrorBoundary>
      <Layout>
        <SEO 
          title="Alla E-ämnen A-Ö - Komplett databas | ViHandlar"
          description={`Utforska alla ${additives?.length || '350+'} E-ämnen med avancerad filtrering. Sök efter risknivå, kategori och namn. ADI-värden och hälsoeffekter.`}
          keywords="e-ämnen databas, livsmedelstillsatser lista, e-nummer sökning, risknivå filter, ADI-värden"
          canonical="/e-amnen/alla"
          schemaData={[
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Alla E-ämnen A-Ö",
              "description": "Komplett databas över E-ämnen och livsmedelstillsatser",
              "numberOfItems": additives?.length || 0,
              "itemListElement": paginatedAdditives.map((additive, index) => ({
                "@type": "ListItem", 
                "position": startIndex + index + 1,
                "item": {
                  "@type": "ChemicalSubstance",
                  "name": additive.name,
                  "identifier": additive.e_number,
                  "url": `https://vihandlar.se/e-amnen/${additive.slug}`
                }
              }))
            }
          ]}
        />

        <div className="container py-8 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Hem</Link>
              <span className="mx-2">›</span>
              <Link to="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
              <span className="mx-2">›</span>
              <span>Alla E-ämnen</span>
            </nav>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Alla E-ämnen A-Ö
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Utforska vår kompletta databas med {filteredAdditives.length} E-ämnen. Filtrera efter risknivå, kategori och sök fritt.
              </p>
              <p className="text-sm text-muted-foreground">
                Ny till E-ämnen? Läs vår{' '}
                <Link to="/e-amnen/guide" className="text-primary hover:underline font-medium">
                  kompletta guide till E-ämnen
                </Link>
                {' '}för att komma igång.
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtrera och sök
              </CardTitle>
              <CardDescription>
                Använd filtren nedan för att hitta specifika E-ämnen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and main filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Sök E-nummer eller namn..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                    aria-label="Sök efter E-ämnen"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger aria-label="Välj kategori">
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

                <Select value={riskFilter} onValueChange={(value) => {
                  setRiskFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger aria-label="Välj risknivå">
                    <SelectValue placeholder="Alla risknivåer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla risknivåer</SelectItem>
                    <SelectItem value="low">Låg risk (1-3)</SelectItem>
                    <SelectItem value="medium">Medel risk (4-6)</SelectItem>
                    <SelectItem value="high">Hög risk (7-10)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={`${sortBy}-${sortDirection}`} onValueChange={(value) => {
                  const [newSortBy, newDirection] = value.split('-') as [SortOption, SortDirection];
                  setSortBy(newSortBy);
                  setSortDirection(newDirection);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger aria-label="Välj sortering">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sortera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="e_number-asc">E-nummer (stigande)</SelectItem>
                    <SelectItem value="e_number-desc">E-nummer (fallande)</SelectItem>
                    <SelectItem value="name-asc">Namn (A-Ö)</SelectItem>
                    <SelectItem value="name-desc">Namn (Ö-A)</SelectItem>
                    <SelectItem value="risk_score-desc">Risknivå (hög-låg)</SelectItem>
                    <SelectItem value="risk_score-asc">Risknivå (låg-hög)</SelectItem>
                    <SelectItem value="category-asc">Kategori (A-Ö)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter summary and clear */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {filteredAdditives.length} av {additives?.length || 0} E-ämnen
                  {hasActiveFilters && ' (filtrerade)'}
                </div>
                
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Rensa filter
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comparison View */}
          {showComparison && selectedForComparison.length > 0 && (
            <ErrorBoundary>
              <Suspense fallback={<EAdditiveGridSkeleton count={selectedForComparison.length} />}>
                <EAdditiveCompareView
                  additives={additives?.filter(a => selectedForComparison.includes(a.id)) || []}
                  onRemove={(id) => toggleComparisonSelection(id)}
                  onAdd={() => setShowComparison(false)}
                  maxItems={3}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          {/* Comparison Controls */}
          {selectedForComparison.length > 0 && !showComparison && (
            <Card className="border-primary/40">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      {selectedForComparison.length} E-ämnen valda för jämförelse
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearComparison}
                    >
                      Rensa
                    </Button>
                  </div>
                  <Button
                    onClick={() => setShowComparison(true)}
                    disabled={selectedForComparison.length < 2}
                  >
                    Jämför E-ämnen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {additivesLoading ? (
            <EAdditiveGridSkeleton />
          ) : paginatedAdditives.length > 0 && !showComparison ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedAdditives.map((additive) => (
                  <div key={additive.id} className="relative">
                    <Link
                      to={`/e-amnen/${additive.slug}`}
                      className="block"
                      aria-label={`Läs mer om ${additive.e_number} - ${additive.name}`}
                    >
                      <Card className="hover:border-primary/40 transition-colors h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <CardTitle className="text-lg">{additive.e_number}</CardTitle>
                              <p className="font-medium text-muted-foreground">
                                {additive.name}
                              </p>
                              {additive.common_name && (
                                <p className="text-sm text-muted-foreground">
                                  ({additive.common_name})
                                </p>
                              )}
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {additive.category}
                                </Badge>
                                {additive.origin && (
                                  <Badge variant="outline" className="text-xs">
                                    {additive.origin}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                              <RiskGauge score={additive.risk_score || 0} size="sm" />
                              <EAdditiveFavoriteButton 
                                additive={additive}
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {additive.short_description}
                          </p>
                          {additive.adi_value && (
                            <p className="text-xs text-muted-foreground mt-2">
                              ADI: {additive.adi_value} mg/kg kroppsvikt
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleComparisonSelection(additive.id);
                              }}
                              className={selectedForComparison.includes(additive.id) ? "bg-primary text-primary-foreground" : ""}
                              disabled={!selectedForComparison.includes(additive.id) && selectedForComparison.length >= 3}
                              aria-label={
                                selectedForComparison.includes(additive.id) 
                                  ? `Ta bort ${additive.e_number} från jämförelse` 
                                  : `Lägg till ${additive.e_number} i jämförelse`
                              }
                            >
                              {selectedForComparison.includes(additive.id) ? "✓ Vald" : "Jämför"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav 
                  className="flex items-center justify-center space-x-2 mt-8"
                  aria-label="Paginering för E-ämnen"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Föregående sida"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Föregående
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          aria-label={`Gå till sida ${pageNum}`}
                          aria-current={pageNum === currentPage ? "page" : undefined}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Nästa sida"
                  >
                    Nästa
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </nav>
              )}
            </>
          ) : !showComparison ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Inga resultat</h3>
                <p className="text-muted-foreground mb-4">
                  Inga E-ämnen matchade dina filter. Prova att ändra sökkriterier.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Rensa alla filter
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </Layout>
    </ErrorBoundary>
  );
};