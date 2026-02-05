import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { Calculator, Shield, AlertTriangle, Info, User } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface EAdditiveADIChartProps {
  additives: EAdditive[];
  variant?: 'scatter' | 'bar' | 'safety' | 'personal';
  className?: string;
}

export const EAdditiveADIChart = ({ 
  additives, 
  variant = 'scatter',
  className 
}: EAdditiveADIChartProps) => {
  const [bodyWeight, setBodyWeight] = useState<number>(70);
  const [selectedCategory, setSelectedCategory] = useState<string>('alla');

  // Process ADI data
  const processADIData = () => {
    const withADI = additives.filter(additive => 
      additive.adi_value && additive.adi_value > 0
    );

    // Categories for filtering
    const categories = [...new Set(additives.map(a => a.category))];

    // Filter by category if selected
    const filteredData = selectedCategory === 'alla' 
      ? withADI 
      : withADI.filter(a => a.category === selectedCategory);

    return { withADI: filteredData, allCategories: categories };
  };

  const { withADI, allCategories } = processADIData();

  // Chart configurations
  const adiChartConfig = {
    adi_value: {
      label: 'ADI-värde (mg/kg)',
      color: 'hsl(var(--primary))',
    },
    risk_score: {
      label: 'Risknivå',
      color: 'hsl(var(--destructive))',
    },
  };

  // Prepare data for different variants
  const scatterData = withADI.map(additive => ({
    ...additive,
    x: additive.adi_value,
    y: additive.risk_score || 0,
    dailySafe: (additive.adi_value || 0) * bodyWeight,
    riskColor: (additive.risk_score || 0) >= 7 ? 'hsl(var(--destructive))' : 
                (additive.risk_score || 0) >= 4 ? 'hsl(var(--warning))' : 'hsl(var(--success))'
  }));

  const barData = withADI
    .sort((a, b) => (b.adi_value || 0) - (a.adi_value || 0))
    .slice(0, 20)
    .map(additive => ({
      ...additive,
      name: additive.e_number,
      value: additive.adi_value,
      dailySafe: (additive.adi_value || 0) * bodyWeight,
      fill: (additive.risk_score || 0) >= 7 ? 'hsl(var(--destructive))' : 
            (additive.risk_score || 0) >= 4 ? 'hsl(var(--warning))' : 'hsl(var(--success))'
    }));

  const safetyRanges = [
    { range: '0-1 mg/kg', count: 0, additives: [] as EAdditive[] },
    { range: '1-5 mg/kg', count: 0, additives: [] as EAdditive[] },
    { range: '5-15 mg/kg', count: 0, additives: [] as EAdditive[] },
    { range: '15+ mg/kg', count: 0, additives: [] as EAdditive[] }
  ];

  withADI.forEach(additive => {
    const adi = additive.adi_value || 0;
    if (adi <= 1) {
      safetyRanges[0].count++;
      safetyRanges[0].additives.push(additive);
    } else if (adi <= 5) {
      safetyRanges[1].count++;
      safetyRanges[1].additives.push(additive);
    } else if (adi <= 15) {
      safetyRanges[2].count++;
      safetyRanges[2].additives.push(additive);
    } else {
      safetyRanges[3].count++;
      safetyRanges[3].additives.push(additive);
    }
  });

  const personalSafetyData = withADI.map(additive => ({
    ...additive,
    name: additive.e_number,
    dailyLimit: (additive.adi_value || 0) * bodyWeight,
    weeklyLimit: (additive.adi_value || 0) * bodyWeight * 7,
    category: additive.category
  })).sort((a, b) => b.dailyLimit - a.dailyLimit).slice(0, 15);

  const renderChart = () => {
    switch (variant) {
      case 'scatter':
        return (
          <ChartContainer config={adiChartConfig} className="h-96">
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
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
                        <p className="font-semibold">{data.e_number} - {data.name}</p>
                        <div className="space-y-1 mt-2 text-sm">
                          <p>ADI: {data.adi_value} mg/kg</p>
                          <p>Risknivå: {data.risk_score}/10</p>
                          <p>Daglig säker dos (70kg): {data.dailySafe.toFixed(1)} mg</p>
                          <Badge variant="outline" className="mt-2">
                            {data.category}
                          </Badge>
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

      case 'bar':
        return (
          <ChartContainer config={adiChartConfig} className="h-96">
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
                label={{ value: 'ADI-värde (mg/kg)', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="value"
                radius={[2, 2, 0, 0]}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.e_number} - {data.name}</p>
                        <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                          <p>ADI: {data.value} mg/kg</p>
                          <p>Daglig säker dos ({bodyWeight}kg): {data.dailySafe.toFixed(1)} mg</p>
                          <p>Risknivå: {data.risk_score}/10</p>
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

      case 'safety':
        return (
          <ChartContainer config={adiChartConfig} className="h-80">
            <BarChart data={safetyRanges} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="range"
                className="fill-muted-foreground"
              />
              <YAxis 
                className="fill-muted-foreground"
                label={{ value: 'Antal E-ämnen', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">ADI-område: {label}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.count} E-ämnen
                        </p>
                        {data.additives.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium">Exempel:</p>
                            {data.additives.slice(0, 3).map((additive: EAdditive) => (
                              <p key={additive.id} className="text-xs text-muted-foreground">
                                {additive.e_number} ({additive.adi_value} mg/kg)
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </BarChart>
          </ChartContainer>
        );

      case 'personal':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Din kroppsvikt (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Math.max(30, Math.min(200, Number(e.target.value))))}
                  autoComplete="off"
                  className="w-20 mt-1"
                  min="30"
                  max="200"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Beräknar säkra doser baserat på din vikt
              </div>
            </div>

            <ChartContainer config={adiChartConfig} className="h-96">
              <BarChart data={personalSafetyData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name"
                  className="fill-muted-foreground"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis 
                  className="fill-muted-foreground"
                  label={{ value: 'Daglig säker dos (mg)', angle: -90, position: 'insideLeft' }}
                />
                <Bar 
                  dataKey="dailyLimit"
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length > 0) {
                      const data = payload[0].payload as any;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.e_number} - {data.name}</p>
                          <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                            <p>ADI: {data.adi_value} mg/kg</p>
                            <p><strong>Din dagliga säkra dos:</strong> {data.dailyLimit.toFixed(1)} mg</p>
                            <p>Veckovis säkert: {data.weeklyLimit.toFixed(0)} mg</p>
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
          </div>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (variant) {
      case 'scatter': return 'ADI vs Risknivå (Korrelation)';
      case 'bar': return 'Högsta ADI-värden';
      case 'safety': return 'ADI-säkerhetsområden';
      case 'personal': return 'Personlig ADI-kalkylator';
      default: return 'ADI-analys';
    }
  };

  const getChartDescription = () => {
    switch (variant) {
      case 'scatter': return 'Jämför acceptabelt dagligt intag mot risknivå för att se samband';
      case 'bar': return 'E-ämnen med högst acceptabelt dagligt intag (mg per kg kroppsvikt)';
      case 'safety': return 'Fördelning av E-ämnen baserat på ADI-säkerhetsområden';
      case 'personal': return 'Beräkna din personliga säkra dagliga dos baserat på kroppsvikt';
      default: return 'ADI-värden för E-ämnen';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          {getChartTitle()}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {getChartDescription()}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline">
            {withADI.length} E-ämnen med ADI-data
          </Badge>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>ADI = Acceptabelt Dagligt Intag</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {withADI.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga E-ämnen med ADI-data hittades</p>
          </div>
        ) : (
          renderChart()
        )}
      </CardContent>
    </Card>
  );
};