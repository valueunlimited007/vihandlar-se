import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ScannerSEO } from '@/components/ScannerSEO';
import { EAdditiveScanner as ScannerComponent } from '@/components/EAdditiveScanner';
import { ScannerUploadArea } from '@/components/ScannerUploadArea';
import { AIOptimizedScannerFactBox } from '@/components/AIOptimizedScannerFactBox';
import { ScanResult } from '@/components/EAdditiveScanner';
import { useScannerAnalytics } from '@/hooks/useScannerAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Camera, 
  Shield, 
  Zap, 
  WifiOff, 
  Info, 
  Star,
  Scan,
  Database
} from 'lucide-react';

const EAdditiveScannerPage = () => {
  const { trackScannerNavigation } = useScannerAnalytics();
  const [scanResults, setScanResults] = React.useState<ScanResult | null>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [showGuide, setShowGuide] = React.useState(false);

  useEffect(() => {
    trackScannerNavigation('direct');
  }, [trackScannerNavigation]);

  const handleScanComplete = (results: ScanResult | null) => {
    setScanResults(results);
  };

  const handleShowCamera = () => {
    setShowCamera(true);
  };

  const handleShowGuide = () => {
    setShowGuide(true);
  };

  const resetScanner = () => {
    setScanResults(null);
    setShowCamera(false);
    setShowGuide(false);
  };

  return (
    <ErrorBoundary>
      <Layout>
        <AIOptimizedScannerFactBox />
        <ScannerSEO pageType="scanner" />
        
        <div className="container mx-auto py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Hem</Link>
            <span>›</span>
            <Link to="/e-amnen" className="hover:text-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>E-ämnen</Link>
            <span>›</span>
            <span>Scanner</span>
          </div>

          {/* Hero Section - Hide when scan results are shown */}
          {!scanResults && !showCamera && !showGuide && (
            <div className="space-y-6 mb-8">
              <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Camera className="h-10 w-10 text-primary" />
                  E-ämnen Scanner
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Skanna ingredienslistor med kameran och få direkt analys av E-ämnen, 
                  risknivåer och säkerhetsinformation
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge variant="secondary">
                    <Scan className="h-4 w-4 mr-1" />
                    OCR-teknik
                  </Badge>
                  <Badge variant="secondary">
                    <Shield className="h-4 w-4 mr-1" />
                    Säkerhetsanalys
                  </Badge>
                  <Badge variant="secondary">
                    <Database className="h-4 w-4 mr-1" />
                    300+ E-ämnen
                  </Badge>
                  <Badge variant="outline">
                    <WifiOff className="h-4 w-4 mr-1" />
                    Offline-stöd
                  </Badge>
                </div>
              </header>
            </div>
          )}

          {/* Upload Area - Hide when scan results are shown */}
          {!scanResults && !showCamera && !showGuide && (
            <div className="mb-8">
              <ScannerUploadArea 
                onScanComplete={handleScanComplete}
                onShowCamera={handleShowCamera}
                onShowGuide={handleShowGuide}
              />
            </div>
          )}

          {/* Scanner Component - Moved up to show results immediately */}
          <ScannerComponent 
            scanResults={scanResults}
            showCamera={showCamera}
            showGuide={showGuide}
            onResetScanner={resetScanner}
            onShowCamera={handleShowCamera}
            onShowGuide={handleShowGuide}
            onScanComplete={handleScanComplete}
          />

          {/* Key Features - Show only when no scan results */}
          {!scanResults && !showCamera && !showGuide && (
            <>
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Camera className="h-5 w-5 text-primary" />
                        Kameraskanning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Rikta kameran mot ingredienslistor för automatisk E-ämnesanalys
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-5 w-5 text-primary" />
                        Snabb analys
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Få direkta resultat med risknivåer och säkerhetsinformation
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <WifiOff className="h-5 w-5 text-primary" />
                        Offline-stöd
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Funktionen fungerar även utan internetanslutning med offline-databas
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Instructions */}
              <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tips för bästa resultat:</strong> Se till att ingredienslistan är tydlig och välbelyst. 
                  Skannern fungerar bäst med rena, kontrastrika bilder av ingrediensförteckningar.
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* Quick Links */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Utforska E-ämnen
                  </CardTitle>
                  <CardDescription>
                    Bläddra i vår kompletta databas över livsmedelstillsatser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link 
                      to="/e-amnen/alla" 
                      className="block text-primary hover:underline font-medium"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Se alla E-ämnen A-Ö →
                    </Link>
                    <Link 
                      to="/e-amnen/guide" 
                      className="block text-primary hover:underline"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Läs E-ämnesguiden →
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Verktyg & Funktioner
                  </CardTitle>
                  <CardDescription>
                    Användbara verktyg för att förstå E-ämnen bättre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link 
                      to="/e-amnen/alla?risk=high" 
                      className="block text-primary hover:underline font-medium"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Se högrisk E-ämnen →
                    </Link>
                    <Link 
                      to="/e-amnen#kategorier" 
                      className="block text-primary hover:underline"
                      onClick={(e) => {
                        // If we're already on the hub page, prevent default and scroll with offset
                        if (window.location.pathname === '/e-amnen') {
                          e.preventDefault();
                          const element = document.getElementById('kategorier');
                          if (element) {
                            const offset = 120; // Account for header + extra space
                            const elementPosition = element.offsetTop - offset;
                            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      Bläddra efter kategorier →
                    </Link>
                    <Link 
                      to="/e-amnen/alla" 
                      className="block text-primary hover:underline"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Se alla E-ämnen A-Ö →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export default EAdditiveScannerPage;