import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';
import { GitCompare, X, Plus, AlertTriangle, Shield, Calculator } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';

interface EAdditiveComparisonChartProps {
  additives: EAdditive[];
  maxComparisons?: number;
  variant?: 'radar' | 'bar' | 'line' | 'scatter';
  onRemoveAdditive?: (additiveId: string) => void;
  onAddMore?: () => void;
  className?: string;
}

export const EAdditiveComparisonChart = ({ 
  additives, 
  maxComparisons = 5,
  variant = 'radar',
  onRemoveAdditive,
  onAddMore,
  className 
}: EAdditiveComparisonChartProps) => {

  // Process comparison data
  const processComparisonData = () => {
    if (additives.length === 0) return [];

    // Define comparison metrics
    const metrics = [
      { key: 'risk_score', label: 'Risknivå', max: 10, inverse: true },
      { key: 'adi_value', label: 'ADI-värde', max: 50, inverse: false },
      { key: 'longevity_impact', label: 'Longevity', max: 10, inverse: false },
      { key: 'safety_score', label: 'Säkerhet', max: 10, inverse: false },
      { key: 'natural_score', label: 'Naturlighet', max: 10, inverse: false }
    ];

    return metrics.map(metric => {
      const dataPoint: any = { metric: metric.label };
      
      additives.forEach((additive, index) => {
        let value = 0;
        
        switch (metric.key) {
          case 'risk_score':
            value = metric.inverse ? (11 - (additive.risk_score || 5)) : (additive.risk_score || 5);
            break;
          case 'adi_value':
            value = Math.min((additive.adi_value || 0), metric.max);
            break;
          case 'longevity_impact':
            value = additive.longevity_impact === 'Positiv' ? 8 : 
                   additive.longevity_impact === 'Negativ' ? 2 : 5;
            break;
          case 'safety_score':
            value = additive.risk_score ? (11 - additive.risk_score) : 5;
            break;
          case 'natural_score':
            value = additive.origin === 'Naturligt' ? 9 : 
                   additive.origin === 'Syntetiskt' ? 3 : 6;
            break;
        }
        
        dataPoint[`${additive.e_number}`] = value;
        dataPoint[`${additive.e_number}_raw`] = {
          value,
          originalValue: metric.key === 'risk_score' ? additive.risk_score :
                        metric.key === 'adi_value' ? additive.adi_value : value,
          additive
        };
      });

      return dataPoint;
    });
  };

  const processBarData = () => {
    return additives.map(additive => ({
      name: additive.e_number,
      fullName: `${additive.e_number} - ${additive.name}`,
      risk: additive.risk_score || 0,
      adi: additive.adi_value || 0,
      safety: additive.risk_score ? (11 - additive.risk_score) : 5,
      category: additive.category,
      riskColor: (additive.risk_score || 0) >= 7 ? 'hsl(var(--destructive))' : 
                 (additive.risk_score || 0) >= 4 ? 'hsl(var(--warning))' : 'hsl(var(--success))'
    }));
  };

  const processLineData = () => {
    const categories = ['Risknivå', 'ADI-värde', 'Säkerhet', 'Naturlighet'];
    
    return categories.map(category => {
      const dataPoint: any = { category };
      
      additives.forEach(additive => {
        let value = 0;
        switch (category) {
          case 'Risknivå':
            value = additive.risk_score || 0;
            break;
          case 'ADI-värde':
            value = Math.min((additive.adi_value || 0), 20);
            break;
          case 'Säkerhet':
            value = additive.risk_score ? (11 - additive.risk_score) : 5;
            break;
          case 'Naturlighet':
            value = additive.origin === 'Naturligt' ? 9 : 
                   additive.origin === 'Syntetiskt' ? 3 : 6;
            break;
        }
        dataPoint[additive.e_number] = value;
      });

      return dataPoint;
    });
  };

  const comparisonData = processComparisonData();
  const barData = processBarData();
  const lineData = processLineData();

  // Chart configurations
  const comparisonConfig = {
    risk: { label: 'Risknivå', color: 'hsl(var(--destructive))' },
    adi: { label: 'ADI-värde', color: 'hsl(var(--primary))' },
    safety: { label: 'Säkerhet', color: 'hsl(var(--success))' },
  };

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--destructive))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--accent))',
  ];

  if (additives.length === 0) {
    return (
      <Card className={cn("animate-fade-in", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-primary" />
            E-ämnes Jämförelse
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">
            Välj E-ämnen att jämföra för att se en detaljerad analys
          </p>
          {onAddMore && (
            <Button onClick={onAddMore} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Lägg till E-ämnen
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    switch (variant) {
      case 'radar':
        return (
          <ChartContainer config={comparisonConfig} className="h-96">
            <RadarChart data={comparisonData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid className="stroke-muted" />
              <PolarAngleAxis 
                dataKey="metric" 
                className="fill-foreground text-xs"
                tick={{ fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 10]} 
                className="fill-muted-foreground text-xs"
                tick={false}
              />
              {additives.map((additive, index) => (
                <Radar
                  key={additive.id}
                  name={additive.e_number}
                  dataKey={additive.e_number}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  strokeWidth={2}
                  fillOpacity={0.1}
                />
              ))}
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{label}</p>
                        {payload.map((entry, index) => {
                          const rawData = comparisonData.find(d => d.metric === label)?.[`${entry.name}_raw`];
                          return (
                            <div key={index} className="flex items-center gap-2 mb-1">
                              <div 
                                className="w-3 h-3 rounded" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-sm">
                                {entry.name}: {entry.value}
                                {rawData && (
                                  <span className="text-muted-foreground ml-1">
                                    (urspr: {rawData.originalValue})
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadarChart>
          </ChartContainer>
        );

      case 'bar':
        return (
          <ChartContainer config={comparisonConfig} className="h-96">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name"
                className="fill-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                className="fill-muted-foreground"
                label={{ value: 'Värde', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="risk" 
                name="Risknivå"
                fill="hsl(var(--destructive))"
                opacity={0.8}
              />
              <Bar 
                dataKey="safety" 
                name="Säkerhet"
                fill="hsl(var(--success))"
                opacity={0.8}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.fullName}</p>
                        <div className="space-y-1 mt-2 text-sm">
                          <p>Risknivå: {data.risk}/10</p>
                          <p>Säkerhet: {data.safety}/10</p>
                          <p>ADI: {data.adi} mg/kg</p>
                          <Badge variant="outline">{data.category}</Badge>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={comparisonConfig} className="h-96">
            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="category"
                className="fill-muted-foreground"
              />
              <YAxis 
                className="fill-muted-foreground"
                label={{ value: 'Värde', angle: -90, position: 'insideLeft' }}
              />
              {additives.map((additive, index) => (
                <Line
                  key={additive.id}
                  type="monotone"
                  dataKey={additive.e_number}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={additive.e_number}
                />
              ))}
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded" 
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm">
                              {entry.name}: {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ChartContainer>
        );

      case 'scatter':
        const scatterData = additives.map(additive => ({
          x: additive.adi_value || 0,
          y: additive.risk_score || 0,
          name: additive.e_number,
          fullName: `${additive.e_number} - ${additive.name}`,
          category: additive.category
        }));

        return (
          <ChartContainer config={comparisonConfig} className="h-96">
            <ScatterChart data={scatterData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number"
                dataKey="x"
                name="ADI-värde"
                unit=" mg/kg"
                className="fill-muted-foreground"
                label={{ value: 'ADI-värde (mg/kg)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number"
                dataKey="y"
                name="Risknivå"
                domain={[0, 10]}
                className="fill-muted-foreground"
                label={{ value: 'Risknivå', angle: -90, position: 'insideLeft' }}
              />
              <Scatter 
                dataKey="y" 
                fill="hsl(var(--primary))"
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.fullName}</p>
                        <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                          <p>ADI: {data.x} mg/kg</p>
                          <p>Risknivå: {data.y}/10</p>
                          <Badge variant="outline">{data.category}</Badge>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </ScatterChart>
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (variant) {
      case 'radar': return 'Radarjämförelse';
      case 'bar': return 'Stapeldiagram Jämförelse';
      case 'line': return 'Linjediagram Jämförelse';
      case 'scatter': return 'ADI vs Risk Jämförelse';
      default: return 'E-ämnes Jämförelse';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-primary" />
            {getChartTitle()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {additives.length}/{maxComparisons} E-ämnen
            </Badge>
            {onAddMore && additives.length < maxComparisons && (
              <Button onClick={onAddMore} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Selected additives */}
        <div className="flex flex-wrap gap-2">
          {additives.map((additive, index) => (
            <Badge 
              key={additive.id} 
              variant="secondary"
              className="flex items-center gap-2"
              style={{ borderColor: colors[index % colors.length] }}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              {additive.e_number}
              {onRemoveAdditive && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onRemoveAdditive(additive.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {/* Summary insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h4 className="font-semibold text-sm">Högst Risk</h4>
            </div>
            {(() => {
              const highest = additives.reduce((max, current) => 
                (current.risk_score || 0) > (max.risk_score || 0) ? current : max
              );
              return (
                <div className="text-sm">
                  <p className="font-medium">{highest.e_number}</p>
                  <p className="text-muted-foreground">Risk: {highest.risk_score}/10</p>
                </div>
              );
            })()}
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-success" />
              <h4 className="font-semibold text-sm">Säkrast</h4>
            </div>
            {(() => {
              const safest = additives.reduce((min, current) => 
                (current.risk_score || 10) < (min.risk_score || 10) ? current : min
              );
              return (
                <div className="text-sm">
                  <p className="font-medium">{safest.e_number}</p>
                  <p className="text-muted-foreground">Risk: {safest.risk_score}/10</p>
                </div>
              );
            })()}
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">Högst ADI</h4>
            </div>
            {(() => {
              const highestADI = additives.reduce((max, current) => 
                (current.adi_value || 0) > (max.adi_value || 0) ? current : max
              );
              return (
                <div className="text-sm">
                  <p className="font-medium">{highestADI.e_number}</p>
                  <p className="text-muted-foreground">
                    ADI: {highestADI.adi_value || 'N/A'} mg/kg
                  </p>
                </div>
              );
            })()}
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};