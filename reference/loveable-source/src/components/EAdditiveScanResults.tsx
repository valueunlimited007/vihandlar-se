import React from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EAdditiveCard } from './EAdditiveCard';
import { ShareScanButton } from './ShareScanButton';
import { useNavigate } from 'react-router-dom';
import { useScanningHistory } from '@/hooks/useScanningHistory';
import { useToast } from '@/hooks/use-toast';
import type { ScanResult } from './EAdditiveScanner';

interface EAdditiveScanResultsProps {
  results: ScanResult;
  onNewScan: () => void;
}

export const EAdditiveScanResults: React.FC<EAdditiveScanResultsProps> = ({
  results,
  onNewScan
}) => {
  const navigate = useNavigate();
  const { saveScan, isScanSaved } = useScanningHistory();
  const { toast } = useToast();
  
  // Auto-scroll to results when component mounts
  React.useEffect(() => {
    // Small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'high':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const totalEAdditives = results.risk_summary.low_risk + results.risk_summary.medium_risk + results.risk_summary.high_risk;
  const highRiskCount = results.risk_summary.high_risk;
  const mediumRiskCount = results.risk_summary.medium_risk;

  const getOverallRiskLevel = (): 'low' | 'medium' | 'high' => {
    if (highRiskCount > 0) return 'high';
    if (mediumRiskCount > 0) return 'medium';
    return 'low';
  };

  // Automatically save scan to history (in background)
  React.useEffect(() => {
    if (!isScanSaved(results.found_e_numbers)) {
      saveScan({
        foundENumbers: results.found_e_numbers,
        riskSummary: {
          low: results.risk_summary.low_risk,
          medium: results.risk_summary.medium_risk,
          high: results.risk_summary.high_risk
        },
        overallAssessment: results.overall_assessment
      });
    }
  }, [results, saveScan, isScanSaved]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/e-amnen')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Tillbaka till E-ämnen
            </Button>
            <Button
              onClick={onNewScan}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Ny skanning
            </Button>
          </div>

          {/* Share Button - Prominent position */}
          <div className="mb-4">
            <div className="flex justify-center">
              <ShareScanButton scanResults={results} />
            </div>
          </div>

          {/* Results Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getRiskIcon(getOverallRiskLevel())}
                Skanningsresultat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{totalEAdditives}</div>
                    <div className="text-sm text-muted-foreground">E-ämnen hittade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{results.risk_summary.low_risk}</div>
                    <div className="text-sm text-muted-foreground">Låg risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{results.risk_summary.medium_risk}</div>
                    <div className="text-sm text-muted-foreground">Medel risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{results.risk_summary.high_risk}</div>
                    <div className="text-sm text-muted-foreground">Hög risk</div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Bedömning:</h4>
                  <p className="text-sm text-muted-foreground">{results.overall_assessment}</p>
                </div>

                {/* Risk level indicator */}
                <div className="flex justify-center">
                  <Badge 
                    className={`${getRiskColor(getOverallRiskLevel())} border px-4 py-2`}
                  >
                    {getOverallRiskLevel() === 'low' && 'Låg risk'}
                    {getOverallRiskLevel() === 'medium' && 'Medel risk'}
                    {getOverallRiskLevel() === 'high' && 'Hög risk'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* No results message */}
          {results.e_additives_data.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Inga E-ämnen hittades i databasen</h3>
                <p className="text-muted-foreground mb-4">
                  E-ämnena {results.found_e_numbers.join(', ')} finns inte i vår databas än.
                </p>
                <Button onClick={onNewScan}>
                  Försök med en annan bild
                </Button>
              </CardContent>
            </Card>
            ) : (
              <>
                {/* E-additive Cards - High Risk First */}
                {results.risk_summary.high_risk > 0 && (
                  <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Hög risk E-ämnen ({results.risk_summary.high_risk})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {results.e_additives_data
                      .filter(additive => additive.risk_score >= 7)
                      .map((additive) => (
                        <EAdditiveCard
                          key={additive.id}
                          additive={additive}
                          variant="detailed"
                          showFavorite={false}
                        />
                      ))}
                  </div>
                </div>
              )}

                {/* Medium Risk */}
                {results.risk_summary.medium_risk > 0 && (
                  <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Medel risk E-ämnen ({results.risk_summary.medium_risk})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {results.e_additives_data
                      .filter(additive => additive.risk_score >= 4 && additive.risk_score < 7)
                      .map((additive) => (
                        <EAdditiveCard
                          key={additive.id}
                          additive={additive}
                          variant="detailed"
                          showFavorite={false}
                        />
                      ))}
                  </div>
                </div>
              )}

                {/* Low Risk */}
                {results.risk_summary.low_risk > 0 && (
                  <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Låg risk E-ämnen ({results.risk_summary.low_risk})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {results.e_additives_data
                      .filter(additive => additive.risk_score < 4)
                      .map((additive) => (
                        <EAdditiveCard
                          key={additive.id}
                          additive={additive}
                          variant="compact"
                          showFavorite={false}
                        />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};