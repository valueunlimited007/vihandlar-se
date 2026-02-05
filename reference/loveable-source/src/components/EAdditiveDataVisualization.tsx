import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { EAdditiveRiskChart } from './EAdditiveRiskChart';
import { EAdditiveADIChart } from './EAdditiveADIChart';
import { EAdditiveCategoryChart } from './EAdditiveCategoryChart';
import { EAdditiveComparisonChart } from './EAdditiveComparisonChart';
import { BarChart3, PieChart, Radar, GitCompare, Calculator, Layers } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface EAdditiveDataVisualizationProps {
  additives: EAdditive[];
  title?: string;
  showComparison?: boolean;
  selectedAdditives?: EAdditive[];
  onComparisonChange?: (additives: EAdditive[]) => void;
  className?: string;
}

export const EAdditiveDataVisualization = ({ 
  additives, 
  title = 'E-ämnes Datavisualisering',
  showComparison = true,
  selectedAdditives = [],
  onComparisonChange,
  className 
}: EAdditiveDataVisualizationProps) => {
  const [activeRiskVariant, setActiveRiskVariant] = useState<'bar' | 'pie' | 'radial' | 'distribution'>('bar');
  const [activeADIVariant, setActiveADIVariant] = useState<'scatter' | 'bar' | 'safety' | 'personal'>('scatter');
  const [activeCategoryVariant, setActiveCategoryVariant] = useState<'pie' | 'bar' | 'treemap' | 'risk-distribution'>('pie');
  const [activeComparisonVariant, setActiveComparisonVariant] = useState<'radar' | 'bar' | 'line' | 'scatter'>('radar');

  const handleAddToComparison = (additive: EAdditive) => {
    if (selectedAdditives.find(a => a.id === additive.id)) return;
    
    const newSelection = [...selectedAdditives, additive];
    if (newSelection.length > 5) {
      newSelection.shift(); // Remove first if more than 5
    }
    onComparisonChange?.(newSelection);
  };

  const handleRemoveFromComparison = (additiveId: string) => {
    const newSelection = selectedAdditives.filter(a => a.id !== additiveId);
    onComparisonChange?.(newSelection);
  };

  const getVariantIcon = (variant: string) => {
    switch (variant) {
      case 'bar': case 'distribution': return <BarChart3 className="w-4 h-4" />;
      case 'pie': case 'radial': return <PieChart className="w-4 h-4" />;
      case 'radar': return <Radar className="w-4 h-4" />;
      case 'scatter': return <GitCompare className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  if (additives.length === 0) {
    return (
      <Card className={cn("animate-fade-in", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">
            Inga E-ämnen att visualisera
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">
          Interaktiv dataanalys av {additives.length} E-ämnen med olika visualiseringsmetoder
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline">{additives.length} E-ämnen</Badge>
          <Badge variant="outline">
            {additives.filter(a => a.adi_value && a.adi_value > 0).length} med ADI-data
          </Badge>
          <Badge variant="outline">
            {additives.filter(a => (a.risk_score || 0) >= 7).length} högrisk
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="risk" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Riskanalys</span>
            <span className="sm:hidden">Risk</span>
          </TabsTrigger>
          <TabsTrigger value="adi" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">ADI-analys</span>
            <span className="sm:hidden">ADI</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Kategorier</span>
            <span className="sm:hidden">Kat.</span>
          </TabsTrigger>
          {showComparison && (
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline">Jämförelse</span>
              <span className="sm:hidden">Jämf.</span>
            </TabsTrigger>
          )}
        </TabsList>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Riskanalys
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visualisera riskfördelning med olika diagramtyper
                  </p>
                </div>
                <div className="flex gap-2">
                  {(['bar', 'pie', 'radial', 'distribution'] as const).map((variant) => (
                    <Button
                      key={variant}
                      size="sm"
                      variant={activeRiskVariant === variant ? 'default' : 'outline'}
                      onClick={() => setActiveRiskVariant(variant)}
                      className="flex items-center gap-1"
                    >
                      {getVariantIcon(variant)}
                      <span className="capitalize">{variant}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <EAdditiveRiskChart 
            additives={additives} 
            variant={activeRiskVariant}
            showDetails={true}
          />
        </TabsContent>

        {/* ADI Analysis Tab */}
        <TabsContent value="adi" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    ADI-analys
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Analysera acceptabelt dagligt intag och säkerhetsmarginaler
                  </p>
                </div>
                <div className="flex gap-2">
                  {(['scatter', 'bar', 'safety', 'personal'] as const).map((variant) => (
                    <Button
                      key={variant}
                      size="sm"
                      variant={activeADIVariant === variant ? 'default' : 'outline'}
                      onClick={() => setActiveADIVariant(variant)}
                      className="flex items-center gap-1"
                    >
                      {getVariantIcon(variant)}
                      <span className="capitalize">{variant}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <EAdditiveADIChart 
            additives={additives} 
            variant={activeADIVariant}
          />
        </TabsContent>

        {/* Categories Analysis Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Kategorianalys
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Utforska fördelning och risker inom olika E-ämnes kategorier
                  </p>
                </div>
                <div className="flex gap-2">
                  {(['pie', 'bar', 'treemap', 'risk-distribution'] as const).map((variant) => (
                    <Button
                      key={variant}
                      size="sm"
                      variant={activeCategoryVariant === variant ? 'default' : 'outline'}
                      onClick={() => setActiveCategoryVariant(variant)}
                      className="flex items-center gap-1"
                    >
                      {getVariantIcon(variant)}
                      <span className="capitalize">{variant}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <EAdditiveCategoryChart 
            additives={additives} 
            variant={activeCategoryVariant}
          />
        </TabsContent>

        {/* Comparison Tab */}
        {showComparison && (
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-primary" />
                      E-ämnes Jämförelse
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Jämför upp till 5 E-ämnen sida vid sida med olika metoder
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {(['radar', 'bar', 'line', 'scatter'] as const).map((variant) => (
                      <Button
                        key={variant}
                        size="sm"
                        variant={activeComparisonVariant === variant ? 'default' : 'outline'}
                        onClick={() => setActiveComparisonVariant(variant)}
                        className="flex items-center gap-1"
                      >
                        {getVariantIcon(variant)}
                        <span className="capitalize">{variant}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick selection for popular additives */}
            {selectedAdditives.length < 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Snabbval - Populära E-ämnen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {additives
                      .filter(a => !selectedAdditives.find(s => s.id === a.id))
                      .slice(0, 8)
                      .map((additive) => (
                        <Button
                          key={additive.id}
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToComparison(additive)}
                          className="flex items-center gap-2"
                        >
                          {additive.e_number}
                          <Badge variant="secondary" className="text-xs">
                            Risk: {additive.risk_score || 'N/A'}
                          </Badge>
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <EAdditiveComparisonChart 
              additives={selectedAdditives} 
              variant={activeComparisonVariant}
              onRemoveAdditive={handleRemoveFromComparison}
              onAddMore={() => {
                // Could implement a modal for selecting more additives
                console.log('Add more additives');
              }}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};