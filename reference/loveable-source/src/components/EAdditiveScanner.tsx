import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Loader2, WifiOff, TrendingUp, Activity, Zap, Book, Clock, Grid, List, Lightbulb, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScannerAnalytics } from '@/hooks/useScannerAnalytics';
import { EAdditiveScanResults } from './EAdditiveScanResults';
import { CameraCapture } from './CameraCapture';
import { ScannerGuide } from './ScannerGuide';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';
import { Link } from 'react-router-dom';

export interface ScanResult {
  found_e_numbers: string[];
  e_additives_data: any[];
  risk_summary: {
    high_risk: number;
    medium_risk: number;
    low_risk: number;
    total: number;
  };
  overall_assessment: string;
}

interface EAdditiveScannerProps {
  scanResults?: ScanResult | null;
  showCamera?: boolean;
  showGuide?: boolean;
  onResetScanner?: () => void;
  onShowCamera?: () => void;
  onShowGuide?: () => void;
  onScanComplete?: (results: ScanResult | null) => void;
}

export const EAdditiveScanner: React.FC<EAdditiveScannerProps> = ({
  scanResults: externalScanResults,
  showCamera: externalShowCamera,
  showGuide: externalShowGuide,
  onResetScanner,
  onShowCamera,
  onShowGuide,
  onScanComplete
}) => {
  // Use external state if provided, otherwise use internal state
  const scanResults = externalScanResults;
  const showCamera = externalShowCamera || false;
  const showGuide = externalShowGuide || false;

  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { analyzeImage } = useImageAnalysis();

  const resetScanner = () => {
    if (onResetScanner) {
      onResetScanner();
    }
  };

  // Prioritize showing results over camera/guide
  if (scanResults) {
    return (
      <EAdditiveScanResults
        results={scanResults}
        onNewScan={resetScanner}
      />
    );
  }

  if (showCamera) {
    return (
      <CameraCapture
        onCapture={async (file) => {
          console.log('📸 Camera captured image:', file);
          try {
            // Analyze the captured image
            const results = await analyzeImage(file, 'camera');
            if (results && onScanComplete) {
              // Pass results to parent
              onScanComplete(results);
              toast({
                title: "Skanning klar!",
                description: `Hittade ${results.found_e_numbers?.length || 0} E-ämnen från kamera`,
                variant: "default"
              });
            } else if (!results) {
              toast({
                title: "Inga E-ämnen hittades",
                description: "Försök igen med en tydligare bild",
                variant: "destructive"
              });
            }
          } catch (error) {
            console.error('Camera analysis error:', error);
            toast({
              title: "Fel vid kameraanalys",
              description: "Försök igen eller använd upload-funktionen",
              variant: "destructive"
            });
          }
        }}
        onCancel={() => onResetScanner?.()}
      />
    );
  }

  if (showGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Guide: E-ämnen Scanner</h1>
              <Button variant="outline" onClick={resetScanner}>
                Tillbaka till scanner
              </Button>
            </div>
            <ScannerGuide />
          </div>
        </div>
      </div>
    );
  }

  if (scanResults) {
    return (
      <EAdditiveScanResults
        results={scanResults}
        onNewScan={resetScanner}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Information Cards Section - Below scanner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* System Status Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Scanner API</span>
                <Badge variant="default" className="bg-green-500 text-xs">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">OCR Engine</span>
                <Badge variant="default" className="bg-green-500 text-xs">Redo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Databas</span>
                <Badge variant="default" className="bg-green-500 text-xs">353 E-ämnen</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Navigation & Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <div className="grid grid-cols-3 gap-2">
                 <Link 
                   to="/e-amnen/alla" 
                   className="h-auto p-3 flex flex-col items-center gap-1 rounded-md border hover:bg-primary/5 hover:border-primary/40 transition-colors"
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 >
                   <Search className="h-4 w-4" />
                   <span className="text-xs">Sök</span>
                 </Link>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={onShowGuide}
                   className="h-auto p-3 flex flex-col items-center gap-1 hover:bg-primary/5 hover:border-primary/40 hover:text-primary"
                 >
                   <Book className="h-4 w-4" />
                   <span className="text-xs">Guide</span>
                 </Button>
                  <Link 
                    to="/e-amnen/alla" 
                    className="h-auto p-3 flex flex-col items-center gap-1 rounded-md border hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <List className="h-4 w-4" />
                    <span className="text-xs">A-Ö Lista</span>
                  </Link>
               </div>
             </div>
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

      {/* Expanded Popular E-Numbers & Risk Distribution - Full Width */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            E-ämnen Databas & Risknivåer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Farligaste E-ämnen */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-destructive mb-3">🔴 Farligaste E-ämnena</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
                  <Link 
                    to="/e-amnen/E431"
                    className="text-sm hover:underline text-red-700 truncate flex-1 mr-2 font-medium"
                  >
                    E431 - Polyoxyetylen (40) stearat
                  </Link>
                  <Badge variant="destructive" className="text-xs">Risk 9</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
                  <Link 
                    to="/e-amnen/E122"
                    className="text-sm hover:underline text-red-700 truncate flex-1 mr-2 font-medium"
                  >
                    E122 - Azorubin
                  </Link>
                  <Badge variant="destructive" className="text-xs">Risk 8</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
                  <Link 
                    to="/e-amnen/E102"
                    className="text-sm hover:underline text-red-700 truncate flex-1 mr-2 font-medium"
                  >
                    E102 - Tartrazin
                  </Link>
                  <Badge variant="destructive" className="text-xs">Risk 7</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
                  <Link 
                    to="/e-amnen/E171"
                    className="text-sm hover:underline text-red-700 truncate flex-1 mr-2 font-medium"
                  >
                    E171 - Titandioxid
                  </Link>
                  <Badge variant="destructive" className="text-xs">Risk 7</Badge>
                </div>
              </div>
            </div>

            {/* Säkraste E-ämnen */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-green-700 mb-3">🟢 Säkraste E-ämnena</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
                  <Link 
                    to="/e-amnen/E463"
                    className="text-sm hover:underline text-green-700 truncate flex-1 mr-2 font-medium"
                  >
                    E463 - Hydroxipropylcellulosa
                  </Link>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">Risk 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
                  <Link 
                    to="/e-amnen/E414"
                    className="text-sm hover:underline text-green-700 truncate flex-1 mr-2 font-medium"
                  >
                    E414 - Akaciegummi
                  </Link>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">Risk 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
                  <Link 
                    to="/e-amnen/E417"
                    className="text-sm hover:underline text-green-700 truncate flex-1 mr-2 font-medium"
                  >
                    E417 - Tamarigummi
                  </Link>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">Risk 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-red-100">
                  <Link 
                    to="/e-amnen/E401"
                    className="text-sm hover:underline text-green-700 truncate flex-1 mr-2 font-medium"
                  >
                    E401 - Natriumalginat
                  </Link>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">Risk 2</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Distribution Statistics */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-lg font-medium text-muted-foreground mb-4">📊 Risknivåfördelning (Total: 353 E-ämnen)</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-700">304</div>
                <div className="text-sm text-green-600 mb-2">Låg risk (86%)</div>
                <Progress value={86} className="h-2" />
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-700">44</div>
                <div className="text-sm text-yellow-600 mb-2">Medium risk (12%)</div>
                <Progress value={12} className="h-2" />
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-700">5</div>
                <div className="text-sm text-red-600 mb-2">Hög risk (2%)</div>
                <Progress value={2} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};