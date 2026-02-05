import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Loader2, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';
import { ScanResult } from './EAdditiveScanner';

interface ScannerUploadAreaProps {
  onScanComplete: (results: ScanResult | null) => void;
  onShowCamera: () => void;
  onShowGuide: () => void;
}

export const ScannerUploadArea: React.FC<ScannerUploadAreaProps> = ({
  onScanComplete,
  onShowCamera,
  onShowGuide
}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { analyzeImage, isAnalyzing, error, progress, setError } = useImageAnalysis();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const results = await analyzeImage(file, 'upload');
      if (results) {
        onScanComplete(results);
      }
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 lg:p-8">
        {isAnalyzing ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Analyserar bild...</h3>
            <p className="text-muted-foreground mb-4">
              Detta kan ta några sekunder
            </p>
            {progress > 0 && (
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {isOffline && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                <WifiOff className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-yellow-800 font-medium">Offline-läge</p>
                  <p className="text-yellow-700 text-sm">Begränsad funktionalitet tillgänglig</p>
                </div>
              </div>
            )}
            
            {/* Device-specific information */}
            <div className="text-center mb-6">
              {isMobile ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">📱 Mobil enhet upptäckt</h4>
                  <p className="text-blue-800 text-sm">Du kan använda kameran direkt eller ladda upp en sparad bild</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3 text-lg">💻 Desktop-användning</h4>
                  <p className="text-blue-800 mb-4 text-base">
                    Ladda upp en bild från din enhet eller ta en bild med mobilen och överför den hit. 
                    Du kan dra och släppa bilder direkt i upload-området.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <X className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">Fel vid skanning</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid gap-4 md:grid-cols-2">
              {isMobile && (
                <Button
                  onClick={onShowCamera}
                  size="lg"
                  className="h-16 text-lg"
                >
                  <Camera className="mr-3 h-6 w-6" />
                  Använd kamera
                </Button>
              )}
              
              <div 
                className={`relative ${isMobile ? '' : 'md:col-span-2'}`}
                onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  const imageFile = files.find(file => 
                    file.type.startsWith('image/') && 
                    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
                  );
                  if (imageFile) {
                    const results = await analyzeImage(imageFile, 'upload');
                    if (results) {
                      onScanComplete(results);
                    }
                  } else {
                    setError('Vänligen dra endast bildfiler (JPG, PNG, WEBP)');
                  }
                }}
              >
                <div className={`relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center hover:border-primary hover:bg-accent/50 transition-colors duration-200 cursor-pointer ${isMobile ? 'h-16' : 'h-32'} flex items-center justify-center bg-muted/20`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    style={{ pointerEvents: 'auto' }}
                  />
                   <div className="flex items-center justify-center gap-3">
                     <Upload className={`text-muted-foreground ${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`} />
                     <div>
                       <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-lg font-medium'}`}>
                         {isMobile ? 'Ladda upp bild' : 'Ladda upp bild eller dra och släpp här'}
                       </p>
                       {!isMobile && (
                         <p className="text-sm text-muted-foreground mt-1">
                           Stödda format: JPG, PNG, WEBP (Max 10MB)
                         </p>
                       )}
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Guide link */}
            <div className="text-center pt-4">
              <Button 
                variant="link" 
                onClick={onShowGuide}
                className="text-primary hover:underline"
              >
                Se guide för bästa resultat →
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};