import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Activity,
  BarChart3,
  Zap,
  Book,
  Clock,
  Grid,
  List,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScannerSidebarProps {
  className?: string;
}

export const ScannerSidebar: React.FC<ScannerSidebarProps> = ({ className }) => {
  // Mock data - in real app these would come from your database/analytics
  const stats = {
    totalScans: 1247,
    eNumbersFound: 89,
    avgPerScan: 3.2
  };

  const popularENumbers = [
    { code: 'E621', name: 'Natriumglutamat' },
    { code: 'E250', name: 'Natriumnitrit' },
    { code: 'E330', name: 'Citronsyra' },
    { code: 'E202', name: 'Kaliumsorbat' }
  ];

  const riskDistribution = [
    { level: 'Låg', count: 68, percentage: 68 },
    { level: 'Medium', count: 24, percentage: 24 },
    { level: 'Hög', count: 8, percentage: 8 }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* System Status & Today's Stats Combined */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System & Statistik
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* System Status */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">API</span>
                <Badge variant="default" className="bg-green-500 text-xs">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">OCR</span>
                <Badge variant="default" className="bg-green-500 text-xs">Redo</Badge>
              </div>
            </div>
          </div>
          
          {/* Today's Statistics */}
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Idag</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold">{stats.totalScans}</div>
                <div className="text-xs text-muted-foreground">Skanningar</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{stats.eNumbersFound}</div>
                <div className="text-xs text-muted-foreground">E-ämnen</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular E-Numbers & Risk Distribution */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Populära & Risknivåer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Popular E-Numbers */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Mest sökta</h4>
            <div className="space-y-1">
              {popularENumbers.slice(0, 4).map((item, index) => (
                <div key={item.code} className="flex items-center justify-between">
                  <Link 
                    to={`/e-amnen/${item.code}`}
                    className="text-sm hover:underline text-primary truncate flex-1 mr-2"
                  >
                    {item.code} - {item.name}
                  </Link>
                  <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Risknivåer</h4>
            <div className="grid grid-cols-2 gap-2">
              {riskDistribution.map((risk) => (
                <div key={risk.level} className="text-center">
                  <div className="text-sm font-semibold">{risk.count}</div>
                  <div className="text-xs text-muted-foreground">{risk.level}</div>
                  <Progress value={risk.percentage} className="h-1 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links & Pro-tips Combined */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Navigation & Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Snabblänkar</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/e-amnen/guide" 
                className="text-xs text-center p-2 rounded-md border hover:bg-muted/50 transition-colors"
              >
                <Book className="h-4 w-4 mx-auto mb-1" />
                Guide
              </Link>
              <Link 
                to="/e-amnen/history" 
                className="text-xs text-center p-2 rounded-md border hover:bg-muted/50 transition-colors"
              >
                <Clock className="h-4 w-4 mx-auto mb-1" />
                Historik
              </Link>
              <Link 
                to="/e-amnen/categories" 
                className="text-xs text-center p-2 rounded-md border hover:bg-muted/50 transition-colors"
              >
                <Grid className="h-4 w-4 mx-auto mb-1" />
                Kategorier
              </Link>
              <Link 
                to="/e-amnen/alphabet" 
                className="text-xs text-center p-2 rounded-md border hover:bg-muted/50 transition-colors"
              >
                <List className="h-4 w-4 mx-auto mb-1" />
                A-Ö
              </Link>
            </div>
          </div>

          {/* Pro-tip */}  
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Tips
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              För bästa resultat: Håll kameran stadigt, se till att ingredienslistan är tydligt synlig och välbelyst.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};