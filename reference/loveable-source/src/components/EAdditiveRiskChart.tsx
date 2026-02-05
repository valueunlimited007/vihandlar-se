import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { AlertTriangle, Shield, TrendingUp, Info } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';

interface EAdditiveRiskChartProps {
  additives: EAdditive[];
  variant?: 'bar' | 'pie' | 'radial' | 'distribution';
  showDetails?: boolean;
  className?: string;
}

export const EAdditiveRiskChart = ({ 
  additives, 
  variant = 'bar',
  showDetails = true,
  className 
}: EAdditiveRiskChartProps) => {
  // Process data for different chart types
  const processRiskData = () => {
    const riskCounts = {
      'Låg (1-3)': 0,
      'Måttlig (4-6)': 0,
      'Hög (7-10)': 0
    };

    const riskDetails: Record<string, EAdditive[]> = {
      'Låg (1-3)': [],
      'Måttlig (4-6)': [],
      'Hög (7-10)': []
    };

    additives.forEach(additive => {
      const risk = additive.risk_score || 0;
      if (risk <= 3) {
        riskCounts['Låg (1-3)']++;
        riskDetails['Låg (1-3)'].push(additive);
      } else if (risk <= 6) {
        riskCounts['Måttlig (4-6)']++;
        riskDetails['Måttlig (4-6)'].push(additive);
      } else {
        riskCounts['Hög (7-10)']++;
        riskDetails['Hög (7-10)'].push(additive);
      }
    });

    return { riskCounts, riskDetails };
  };

  const processDistributionData = () => {
    const distribution = Array.from({ length: 10 }, (_, i) => ({
      score: i + 1,
      count: 0,
      additives: [] as EAdditive[]
    }));

    additives.forEach(additive => {
      const risk = Math.max(1, Math.min(10, additive.risk_score || 5));
      const index = risk - 1;
      distribution[index].count++;
      distribution[index].additives.push(additive);
    });

    return distribution;
  };

  const { riskCounts, riskDetails } = processRiskData();
  const distributionData = processDistributionData();

  // Chart configurations
  const riskChartConfig = {
    count: {
      label: 'Antal E-ämnen',
      color: 'hsl(var(--primary))',
    },
  };

  const pieColors = {
    'Låg (1-3)': 'hsl(var(--success))',
    'Måttlig (4-6)': 'hsl(var(--warning))', 
    'Hög (7-10)': 'hsl(var(--destructive))'
  };

  const barData = Object.entries(riskCounts).map(([level, count]) => ({
    level,
    count,
    fill: pieColors[level as keyof typeof pieColors],
    percentage: ((count / additives.length) * 100).toFixed(1)
  }));

  const pieData = Object.entries(riskCounts).map(([level, count]) => ({
    name: level,
    value: count,
    fill: pieColors[level as keyof typeof pieColors],
    percentage: ((count / additives.length) * 100).toFixed(1)
  }));

  const radialData = Object.entries(riskCounts).map(([level, count], index) => ({
    name: level,
    value: count,
    fill: pieColors[level as keyof typeof pieColors],
    radius: 30 + (index * 15)
  }));

  const getRiskIcon = (level: string) => {
    if (level.includes('Hög')) return <AlertTriangle className="w-4 h-4 text-destructive" />;
    if (level.includes('Måttlig')) return <TrendingUp className="w-4 h-4 text-warning" />;
    return <Shield className="w-4 h-4 text-success" />;
  };

  const renderChart = () => {
    switch (variant) {
      case 'pie':
        return (
          <ChartContainer config={riskChartConfig} className="h-80">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.value} E-ämnen ({data.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </PieChart>
          </ChartContainer>
        );

      case 'radial':
        return (
          <ChartContainer config={riskChartConfig} className="h-80">
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
              <RadialBar dataKey="value" cornerRadius={4} fill="var(--color-count)" />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.value} E-ämnen
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </RadialBarChart>
          </ChartContainer>
        );

      case 'distribution':
        return (
          <ChartContainer config={riskChartConfig} className="h-80">
            <BarChart data={distributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="score" 
                className="fill-muted-foreground"
                label={{ value: 'Risknivå', position: 'insideBottom', offset: -10 }}
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
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">Risknivå {label}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.count} E-ämnen
                        </p>
                        {data.additives.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium">Exempel:</p>
                            {data.additives.slice(0, 3).map((additive: EAdditive) => (
                              <p key={additive.id} className="text-xs text-muted-foreground">
                                {additive.e_number} - {additive.name}
                              </p>
                            ))}
                            {data.additives.length > 3 && (
                              <p className="text-xs text-muted-foreground">
                                +{data.additives.length - 3} fler...
                              </p>
                            )}
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

      default: // bar
        return (
          <ChartContainer config={riskChartConfig} className="h-80">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="level" 
                className="fill-muted-foreground"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="fill-muted-foreground"
                label={{ value: 'Antal E-ämnen', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium flex items-center gap-2">
                          {getRiskIcon(label)}
                          {label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.count} E-ämnen ({data.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </BarChart>
          </ChartContainer>
        );
    }
  };

  const getChartTitle = () => {
    switch (variant) {
      case 'pie': return 'Riskfördelning (Cirkeldiagram)';
      case 'radial': return 'Riskfördelning (Radiellt)';
      case 'distribution': return 'Detaljerad Riskfördelning';
      default: return 'Riskfördelning';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          {getChartTitle()}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Totalt: {additives.length} E-ämnen</span>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Baserat på vetenskaplig riskbedömning</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {renderChart()}
          
          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(riskDetails).map(([level, levelAdditives]) => (
                <Card key={level} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getRiskIcon(level)}
                      <h4 className="font-semibold text-sm">{level}</h4>
                    </div>
                    <Badge variant="outline">
                      {levelAdditives.length}
                    </Badge>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {levelAdditives.slice(0, 5).map(additive => (
                      <div key={additive.id} className="text-xs space-y-1">
                        <div className="font-medium">{additive.e_number}</div>
                        <div className="text-muted-foreground truncate">
                          {additive.name}
                        </div>
                        {additive.risk_score && (
                          <Badge variant="outline" className="text-xs">
                            Risk: {additive.risk_score}/10
                          </Badge>
                        )}
                      </div>
                    ))}
                    {levelAdditives.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        +{levelAdditives.length - 5} fler...
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};