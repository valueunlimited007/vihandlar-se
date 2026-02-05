import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useScanningHistory, SavedScan } from '@/hooks/useScanningHistory';
import { useToast } from '@/hooks/use-toast';
import { Camera, Calendar, Trash2, AlertTriangle, Shield, Info } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

export const ScanningHistory = () => {
  const { savedScans, removeScan, clearHistory } = useScanningHistory();
  const { toast } = useToast();
  const [selectedScan, setSelectedScan] = useState<SavedScan | null>(null);

  const handleRemoveScan = (scanId: string) => {
    removeScan(scanId);
    toast({
      title: "Skanning borttagen",
      description: "Skanningen har tagits bort från historiken."
    });
  };

  const handleClearAll = () => {
    clearHistory();
    toast({
      title: "Historik rensad",
      description: "All skanningshistorik har raderats."
    });
  };

  const getRiskColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-muted';
    }
  };

  const getRiskIcon = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
    }
  };

  const getOverallRisk = (riskSummary: SavedScan['riskSummary']) => {
    if (riskSummary.high > 0) return 'high';
    if (riskSummary.medium > 0) return 'medium';
    return 'low';
  };

  if (savedScans.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle>Ingen skanningshistorik</CardTitle>
              <CardDescription>
                Du har inte sparat några skanningar ännu. Scanna en ingredienslista för att komma igång.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild>
                <a href="/e-amnen/scanner">Starta skanning</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Skanningshistorik</h1>
            <p className="text-muted-foreground mt-2">
              {savedScans.length} sparade skanningar
            </p>
          </div>
          
          {savedScans.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Rensa alla
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Radera all historik?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Detta kommer att ta bort alla sparade skanningar permanent. Denna åtgärd kan inte ångras.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Avbryt</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll} className="bg-red-600 hover:bg-red-700">
                    Radera alla
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <div className="grid gap-4">
          {savedScans.map((scan) => {
            const overallRisk = getOverallRisk(scan.riskSummary);
            return (
              <Card key={scan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className={getRiskColor(overallRisk)}>
                          {getRiskIcon(overallRisk)}
                          <span className="ml-1 capitalize">{overallRisk === 'high' ? 'Hög risk' : overallRisk === 'medium' ? 'Måttlig risk' : 'Låg risk'}</span>
                        </Badge>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(scan.timestamp, 'dd MMM yyyy, HH:mm', { locale: sv })}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2">Hittade E-nummer:</p>
                        <div className="flex flex-wrap gap-1">
                          {scan.foundENumbers.map((eNumber) => (
                            <Badge key={eNumber} variant="secondary" className="text-xs">
                              {eNumber}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{scan.riskSummary.low}</div>
                          <div className="text-muted-foreground">Låg risk</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-yellow-600">{scan.riskSummary.medium}</div>
                          <div className="text-muted-foreground">Måttlig risk</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-red-600">{scan.riskSummary.high}</div>
                          <div className="text-muted-foreground">Hög risk</div>
                        </div>
                      </div>

                      {scan.overallAssessment && (
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          "{scan.overallAssessment}"
                        </p>
                      )}
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Radera skanning?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Detta kommer att ta bort denna skanning från historiken permanent.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Avbryt</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRemoveScan(scan.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Radera
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScanningHistory;