import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EAdditiveCard } from '@/components/EAdditiveCard';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface SharedScanData {
  found_e_numbers: string[];
  risk_summary: {
    low_risk: number;
    medium_risk: number;
    high_risk: number;
  };
  overall_assessment: string;
  e_additives_data: any[];
}

export const SharedScan = () => {
  const { shareToken } = useParams();
  const navigate = useNavigate();
  const [scanData, setScanData] = useState<SharedScanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedScan = async () => {
      if (!shareToken) {
        setError('Ogiltig länk');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('shared_scans')
          .select('scan_data, expires_at')
          .eq('share_token', shareToken)
          .single();

        if (error) {
          setError('Skanningsresultat kunde inte hittas');
          setLoading(false);
          return;
        }

        // Check if scan has expired
        if (new Date(data.expires_at) < new Date()) {
          setError('Denna länk har gått ut');
          setLoading(false);
          return;
        }

        setScanData(data.scan_data as unknown as SharedScanData);
      } catch (err) {
        setError('Ett fel uppstod');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedScan();
  }, [shareToken]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <p>Laddar skanningsresultat...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !scanData) {
    return (
      <Layout>
        <SEO 
          title="Skanningsresultat inte hittat - E-ämnen Guide"
          description="Det begärda skanningsresultatet kunde inte hittas eller har gått ut."
        />
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Kunde inte ladda skanningsresultat</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => navigate('/e-amnen')}>
                Gå till E-ämnen
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

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

  const totalEAdditives = scanData.risk_summary.low_risk + scanData.risk_summary.medium_risk + scanData.risk_summary.high_risk;
  const highRiskCount = scanData.risk_summary.high_risk;
  const mediumRiskCount = scanData.risk_summary.medium_risk;

  const getOverallRiskLevel = (): 'low' | 'medium' | 'high' => {
    if (highRiskCount > 0) return 'high';
    if (mediumRiskCount > 0) return 'medium';
    return 'low';
  };

  return (
    <Layout>
      <SEO 
        title="Delat E-ämnen Skanningsresultat - E-ämnen Guide"
        description={`Skanningsresultat visar ${totalEAdditives} E-ämnen med ${scanData.overall_assessment}`}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/e-amnen')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Utforska E-ämnen
              </Button>
              <Button
                onClick={() => navigate('/e-amnen/scanner')}
                variant="default"
                className="gap-2"
              >
                Skanna dina ingredienser
              </Button>
            </div>

            {/* Results Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getRiskIcon(getOverallRiskLevel())}
                  Delat Skanningsresultat
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
                      <div className="text-2xl font-bold text-green-600">{scanData.risk_summary.low_risk}</div>
                      <div className="text-sm text-muted-foreground">Låg risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{scanData.risk_summary.medium_risk}</div>
                      <div className="text-sm text-muted-foreground">Medel risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{scanData.risk_summary.high_risk}</div>
                      <div className="text-sm text-muted-foreground">Hög risk</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Bedömning:</h4>
                    <p className="text-sm text-muted-foreground">{scanData.overall_assessment}</p>
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

            {/* E-additive Cards */}
            {scanData.e_additives_data.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Inga E-ämnen hittades i databasen</h3>
                  <p className="text-muted-foreground mb-4">
                    E-ämnena {scanData.found_e_numbers.join(', ')} finns inte i vår databas än.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* High Risk */}
                {scanData.risk_summary.high_risk > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      Hög risk E-ämnen ({scanData.risk_summary.high_risk})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {scanData.e_additives_data
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
                {scanData.risk_summary.medium_risk > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Medel risk E-ämnen ({scanData.risk_summary.medium_risk})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {scanData.e_additives_data
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
                {scanData.risk_summary.low_risk > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Låg risk E-ämnen ({scanData.risk_summary.low_risk})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {scanData.e_additives_data
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
    </Layout>
  );
};