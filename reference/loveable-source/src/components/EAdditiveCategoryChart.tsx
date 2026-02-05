import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Treemap,
  ResponsiveContainer
} from 'recharts';
import { Layers, TrendingUp, AlertTriangle, Shield, Eye } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';

interface EAdditiveCategoryChartProps {
  additives: EAdditive[];
  variant?: 'pie' | 'bar' | 'treemap' | 'risk-distribution';
  className?: string;
}

export const EAdditiveCategoryChart = ({ 
  additives, 
  variant = 'pie',
  className 
}: EAdditiveCategoryChartProps) => {

  const isMobile = useIsMobile();

  // Process category data
  const processCategoryData = () => {
    const categoryData: Record<string, {
      count: number;
      additives: EAdditive[];
      avgRisk: number;
      highRisk: number;
      hasADI: number;
    }> = {};

    additives.forEach(additive => {
      const category = additive.category || 'Okänd';
      
      if (!categoryData[category]) {
        categoryData[category] = {
          count: 0,
          additives: [],
          avgRisk: 0,
          highRisk: 0,
          hasADI: 0
        };
      }

      categoryData[category].count++;
      categoryData[category].additives.push(additive);
      
      if (additive.risk_score && additive.risk_score >= 7) {
        categoryData[category].highRisk++;
      }
      
      if (additive.adi_value && additive.adi_value > 0) {
        categoryData[category].hasADI++;
      }
    });

    // Calculate average risk scores
    Object.keys(categoryData).forEach(category => {
      const riskScores = categoryData[category].additives
        .map(a => a.risk_score || 0)
        .filter(r => r > 0);
      
      categoryData[category].avgRisk = riskScores.length > 0 
        ? riskScores.reduce((sum, score) => sum + score, 0) / riskScores.length 
        : 0;
    });

    return categoryData;
  };

  const categoryData = processCategoryData();

  // Chart configurations
  const categoryChartConfig = {
    count: {
      label: 'Antal E-ämnen',
      color: 'hsl(var(--primary))',
    },
  };

  // Color schemes
  const categoryColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--destructive))',
    'hsl(220, 70%, 50%)',
    'hsl(280, 70%, 50%)',
    'hsl(40, 70%, 50%)',
    'hsl(160, 70%, 50%)',
    'hsl(320, 70%, 50%)',
    'hsl(200, 70%, 50%)'
  ];

  // Prepare data for different variants
  const pieData = Object.entries(categoryData).map(([category, data], index) => ({
    name: category,
    value: data.count,
    percentage: ((data.count / additives.length) * 100).toFixed(1),
    fill: categoryColors[index % categoryColors.length],
    avgRisk: data.avgRisk,
    highRisk: data.highRisk,
    hasADI: data.hasADI
  }));

  const barData = Object.entries(categoryData)
    .sort(([,a], [,b]) => b.count - a.count)
    .map(([category, data], index) => ({
      category: isMobile && category.length > 8 ? category.substring(0, 8) + '..' : 
               category.length > 15 ? category.substring(0, 15) + '...' : category,
      fullCategory: category,
      count: data.count,
      avgRisk: data.avgRisk,
      highRisk: data.highRisk,
      hasADI: data.hasADI,
      fill: categoryColors[index % categoryColors.length]
    }));

  const treemapData = Object.entries(categoryData).map(([category, data], index) => ({
    name: category,
    size: data.count,
    avgRisk: data.avgRisk,
    highRisk: data.highRisk,
    fill: data.avgRisk >= 6 ? 'hsl(var(--destructive))' : 
          data.avgRisk >= 4 ? 'hsl(var(--warning))' : 'hsl(var(--success))'
  }));

  const riskDistributionData = Object.entries(categoryData).map(([category, data]) => ({
    category: category.length > 12 ? category.substring(0, 12) + '...' : category,
    fullCategory: category,
    lowRisk: data.additives.filter(a => (a.risk_score || 0) <= 3).length,
    mediumRisk: data.additives.filter(a => {
      const risk = a.risk_score || 0;
      return risk > 3 && risk < 7;
    }).length,
    highRisk: data.additives.filter(a => (a.risk_score || 0) >= 7).length,
    total: data.count
  })).sort((a, b) => b.total - a.total);

  const CustomTreemapContent = (props: any) => {
    const { x, y, width, height, name, size, avgRisk } = props;
    
    if (width < 40 || height < 30) return null;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={props.fill}
          stroke="#fff"
          strokeWidth={2}
          rx={4}
        />
        {width > 60 && height > 40 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="bold"
            >
              {name.length > 12 ? name.substring(0, 12) + '...' : name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 6}
              textAnchor="middle"
              fill="#fff"
              fontSize="10"
            >
              {size} E-ämnen
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 20}
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
            >
              Risk: {avgRisk.toFixed(1)}
            </text>
          </>
        )}
      </g>
    );
  };

  const renderChart = () => {
    switch (variant) {
      case 'pie':
        return (
          <ChartContainer config={categoryChartConfig} className={cn(
            "w-full mx-auto",
            isMobile ? "h-80" : "h-48 sm:h-64 md:h-80 lg:h-96"
          )}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={isMobile ? "70%" : "50%"}
                innerRadius={isMobile ? "25%" : "20%"}
                fill="#8884d8"
                dataKey="value"
                className="focus:outline-none"
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
                      <div className="bg-background border border-border rounded-lg p-2 sm:p-3 shadow-lg max-w-[180px] sm:max-w-xs z-50">
                        <p className="font-semibold text-xs sm:text-sm break-words">{data.name}</p>
                        <div className="space-y-0.5 sm:space-y-1 mt-1 sm:mt-2 text-xs text-muted-foreground">
                          <p>{data.value} E-ämnen ({data.percentage}%)</p>
                          <p>Risk: {data.avgRisk.toFixed(1)}/10</p>
                          <p>Högrisk: {data.highRisk}</p>
                          <p>ADI: {data.hasADI}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ChartContainer>
        );

      case 'bar':
        return (
          <ChartContainer config={categoryChartConfig} className={cn(
            isMobile ? "h-72" : "h-64 sm:h-80 md:h-96"
          )}>
            <BarChart 
              data={barData.slice(0, isMobile ? 6 : 12)} 
              margin={{ 
                top: 20, 
                right: 20, 
                left: 20, 
                bottom: isMobile ? 60 : 80 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="category"
                className="fill-muted-foreground"
                fontSize={isMobile ? 9 : 12}
                angle={isMobile ? -45 : -45}
                textAnchor="end"
                height={isMobile ? 50 : 60}
                interval={0}
              />
              <YAxis 
                className="fill-muted-foreground"
                fontSize={isMobile ? 9 : 12}
                label={isMobile ? undefined : { value: 'Antal E-ämnen', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="count"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg max-w-xs">
                        <p className="font-medium text-xs">{data.fullCategory}</p>
                        <div className="space-y-0.5 mt-1 text-xs text-muted-foreground">
                          <p>{data.count} E-ämnen</p>
                          <p>Risk: {data.avgRisk.toFixed(1)}/10</p>
                          <p>Högrisk: {data.highRisk}</p>
                          <p>Med ADI: {data.hasADI}</p>
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

      case 'treemap':
        return (
          <ChartContainer config={categoryChartConfig} className="h-64 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4/3}
                stroke="#fff"
                content={<CustomTreemapContent />}
              />
            </ResponsiveContainer>
          </ChartContainer>
        );

      case 'risk-distribution':
        return (
          <ChartContainer config={categoryChartConfig} className="h-64 sm:h-80 md:h-96">
            <BarChart 
              data={riskDistributionData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="category"
                className="fill-muted-foreground text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                className="fill-muted-foreground"
                label={{ value: 'Antal E-ämnen', angle: -90, position: 'insideLeft' }}
              />
              <Bar 
                dataKey="lowRisk" 
                stackId="risk" 
                fill="hsl(var(--success))"
                name="Låg risk (1-3)"
              />
              <Bar 
                dataKey="mediumRisk" 
                stackId="risk" 
                fill="hsl(var(--warning))"
                name="Måttlig risk (4-6)"
              />
              <Bar 
                dataKey="highRisk" 
                stackId="risk" 
                fill="hsl(var(--destructive))"
                name="Hög risk (7-10)"
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.fullCategory}</p>
                        <div className="space-y-2 mt-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-success rounded"></div>
                            <span>Låg risk: {data.lowRisk}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-warning rounded"></div>
                            <span>Måttlig risk: {data.mediumRisk}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-destructive rounded"></div>
                            <span>Hög risk: {data.highRisk}</span>
                          </div>
                          <div className="pt-1 border-t border-border">
                            <span className="font-medium">Totalt: {data.total}</span>
                          </div>
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

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (variant) {
      case 'pie': return 'Kategorifördelning (Cirkeldiagram)';
      case 'bar': return 'E-ämnen per Kategori';
      case 'treemap': return 'Kategori-översikt (Treemap)';
      case 'risk-distribution': return 'Riskfördelning per Kategori';
      default: return 'Kategorianalys';
    }
  };

  const getChartDescription = () => {
    switch (variant) {
      case 'pie': return 'Procentuell fördelning av E-ämnen mellan olika kategorier';
      case 'bar': return 'Antal E-ämnen sorterat efter kategori med riskstatistik';
      case 'treemap': return 'Visuell representation av kategoristorlekar och genomsnittlig risk';
      case 'risk-distribution': return 'Hur risknivåer fördelar sig inom varje kategori';
      default: return 'Kategorianalys av E-ämnen';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader className={cn("pb-2", isMobile && "pb-1")}>
        <CardTitle className={cn("flex items-center gap-2", isMobile ? "text-base" : "text-lg")}>
          <Layers className="w-5 h-5 text-primary" />
          {getChartTitle()}
        </CardTitle>
        <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
          {getChartDescription()}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline">
            {Object.keys(categoryData).length} kategorier
          </Badge>
          <Badge variant="outline">
            {additives.length} E-ämnen totalt
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={cn(isMobile && "px-3 pb-6")}>
        {Object.keys(categoryData).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga kategorier hittades</p>
          </div>
        ) : (
          <div className="space-y-4">
            {renderChart()}
            
            {/* Mobile-optimized legend for pie chart */}
            {variant === 'pie' && isMobile && (
              <div className="space-y-3 mt-8 mb-16">
                <p className="font-medium text-sm text-center">Kategorier (topp 6):</p>
                <div className="space-y-2 max-h-32 overflow-hidden">
                  {pieData.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 py-1.5">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-sm truncate">
                          {item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground flex-shrink-0 font-medium">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Responsive summary stats */}
            <div className={cn(
              "grid gap-2 text-center bg-muted/30 rounded-lg",
              isMobile ? "grid-cols-2 gap-2 p-3 text-sm mb-20" : "grid-cols-4 p-3 text-sm mt-4"
            )}>
              <div className="space-y-1">
                <div className={cn("font-semibold", isMobile ? "text-sm" : "text-sm")}>{Object.keys(categoryData).length}</div>
                <div className="text-muted-foreground text-xs">Kategorier</div>
              </div>
              <div className="space-y-1">
                <div className={cn("font-semibold", isMobile ? "text-sm" : "text-sm")}>{additives.length}</div>
                <div className="text-muted-foreground text-xs">E-ämnen</div>
              </div>
              <div className="space-y-1">
                <div className={cn("font-semibold text-destructive", isMobile ? "text-sm" : "text-sm")}>
                  {additives.filter(a => (a.risk_score || 0) >= 7).length}
                </div>
                <div className="text-muted-foreground text-xs">Högrisk</div>
              </div>
              <div className="space-y-1">
                <div className={cn("font-semibold text-blue-600 dark:text-blue-400", isMobile ? "text-sm" : "text-sm")}>
                  {additives.filter(a => a.adi_value && a.adi_value > 0).length}
                </div>
                <div className="text-muted-foreground text-xs">Med ADI</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};