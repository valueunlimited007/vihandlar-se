import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useScannerAnalytics } from '@/hooks/useScannerAnalytics';
import { extractENumbersFromText, getOfflineAnalysis } from '@/data/offlineEAdditives';
import { supabase } from '@/integrations/supabase/client';
import { ScanResult } from '@/components/EAdditiveScanner';

export const useImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { trackScanInitiated, trackScanCompleted, trackOfflineFallback } = useScannerAnalytics();

  const handleOfflineAnalysis = (text: string) => {
    const extractedENumbers = extractENumbersFromText(text);
    if (extractedENumbers.length > 0) {
      const offlineResults = getOfflineAnalysis(extractedENumbers);
      const results: ScanResult = {
        found_e_numbers: extractedENumbers,
        e_additives_data: offlineResults.foundAdditives,
        risk_summary: {
          high_risk: offlineResults.riskSummary.high,
          medium_risk: offlineResults.riskSummary.medium,
          low_risk: offlineResults.riskSummary.low,
          total: offlineResults.foundAdditives.length
        },
        overall_assessment: offlineResults.overallAssessment
      };
      trackOfflineFallback(extractedENumbers.length);
      toast({
        title: "Offline-analys genomförd",
        description: `Hittade ${extractedENumbers.length} E-ämnen i offline-databasen`,
        variant: "default"
      });
      return results;
    } else {
      toast({
        title: "Inga E-ämnen hittades",
        description: "Försök igen med en tydligare bild av ingredienslistan",
        variant: "destructive"
      });
      return null;
    }
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 1920x1920)
        let { width, height } = img;
        const maxSize = 1920;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Fallback to original
          }
        }, 'image/jpeg', 0.8); // 80% quality
      };
      
      img.onerror = () => resolve(file); // Fallback to original
      img.src = URL.createObjectURL(file);
    });
  };

  const analyzeImage = async (file: File, source: 'upload' | 'camera' = 'upload', retryCount = 0): Promise<ScanResult | null> => {
    console.log('🚀 Starting image analysis...', { 
      name: file.name, 
      size: file.size, 
      type: file.type,
      source,
      attempt: retryCount + 1
    });
    
    if (!file) {
      setError('Ingen fil vald');
      return null;
    }

    // Enhanced file validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setError(`Felaktig filtyp: ${file.type}. Stödda format: JPEG, PNG, WEBP`);
      return null;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('Bilden är för stor. Maximal storlek är 15MB');
      return null;
    }

    if (file.size === 0) {
      setError('Bildfilen verkar vara skadad eller tom');
      return null;
    }

    trackScanInitiated(source);
    setIsAnalyzing(true);
    setError(null);
    setProgress(5);

    try {
      // Compress large images
      let processedFile = file;
      if (file.size > 2 * 1024 * 1024) { // If larger than 2MB
        console.log('🔄 Compressing large image...');
        setProgress(15);
        processedFile = await compressImage(file);
        console.log('✅ Image compressed:', {
          originalSize: file.size,
          compressedSize: processedFile.size,
          reduction: Math.round((1 - processedFile.size / file.size) * 100) + '%'
        });
      }

      // Create FormData with enhanced error handling
      const formData = new FormData();
      formData.append('image', processedFile);
      console.log('📦 FormData created, calling edge function...');
      setProgress(25);

      // Add timeout to the request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 90000); // 90 second timeout
      });

      try {
        // Call the scan-e-numbers edge function with timeout
        const invokePromise = supabase.functions.invoke('scan-e-numbers', {
          body: formData
        });

        const { data, error: functionError } = await Promise.race([
          invokePromise,
          timeoutPromise
        ]) as any;

        console.log('📡 Edge function response:', { 
          hasData: !!data, 
          hasError: !!functionError,
          dataKeys: data ? Object.keys(data) : []
        });
        setProgress(60);

        // Handle function errors
        if (functionError) {
          console.error('❌ Function error:', functionError);
          
          // Check for specific error types
          if (functionError.message?.includes('FunctionsHttpError')) {
            throw new Error('Skanner-tjänsten är tillfälligt otillgänglig. Försök igen om en stund.');
          } else if (functionError.message?.includes('FunctionsFetchError')) {
            throw new Error('Kunde inte ansluta till skanner-tjänsten. Kontrollera din internetanslutning.');
          } else {
            throw new Error(functionError.message || 'Kunde inte anslyta till skanner-tjänsten');
          }
        }

        if (!data) {
          console.error('❌ No data returned from function');
          throw new Error('Ingen data returnerad från servern');
        }

        // Handle API errors in response
        if (data.error) {
          console.error('❌ API error in response:', data.error);
          throw new Error(data.error);
        }

        // Handle explicit success=false
        if (data.success === false) {
          throw new Error(data.error || 'Skanningen misslyckades');
        }

        console.log('✅ Scan successful:', {
          foundENumbers: data.found_e_numbers?.length || 0,
          totalAdditives: data.e_additives_data?.length || 0,
          highRisk: data.risk_summary?.high_risk || 0
        });
        
        setProgress(85);

        // Handle empty results (no E-numbers found)
        if (!data.found_e_numbers || data.found_e_numbers.length === 0) {
          console.log('✅ No E-numbers found in image');
          
          toast({
            title: "Inga E-ämnen hittades",
            description: "Bilden innehåller inga identifierbara E-ämnen",
            variant: "default"
          });
          
          return null;
        }

        trackScanCompleted(
          data.found_e_numbers?.length || 0, 
          data.risk_summary?.high_risk > 0 ? 'high' : 
          data.risk_summary?.medium_risk > 0 ? 'medium' : 'low'
        );
        setProgress(100);

        toast({
          title: "Skanning klar!",
          description: `Hittade ${data.found_e_numbers?.length || 0} E-ämnen`,
        });

        return data as ScanResult;

      } catch (fetchError: any) {
        if (fetchError.message === 'Request timeout') {
          throw new Error('Skanningen tog för lång tid. Försök med en mindre bild.');
        }
        
        throw fetchError;
      }

    } catch (error: any) {
      console.error('💥 Analysis error:', error);
      
      // Retry logic for certain errors
      const shouldRetry = retryCount < 2 && (
        error.message.includes('ansluta') || 
        error.message.includes('network') ||
        error.message.includes('timeout') ||
        error.message.includes('otillgänglig')
      );
      
      if (shouldRetry) {
        console.log(`🔄 Retrying analysis (attempt ${retryCount + 2}/3)...`);
        setProgress(0);
        return new Promise((resolve) => {
          setTimeout(async () => {
            const result = await analyzeImage(file, source, retryCount + 1);
            resolve(result);
          }, 2000 * (retryCount + 1)); // Exponential backoff
        });
      }
      
      // Only use offline fallback for actual network/API failures, not when Vision API works but finds no E-numbers
      if (!navigator.onLine || error.message.includes('ansluta') || error.message.includes('network')) {
        console.log('🔄 Network issues detected - offline mode not implemented yet');
        
        toast({
          title: "Internetanslutning krävs",
          description: "Anslut till internet för att kunna skanna ingredienslistor",
          variant: "destructive"
        });
      }
      
      // Enhanced error message handling
      let errorMessage = error.message || 'Ett oväntat fel uppstod under analysen';
      
      // Map technical errors to user-friendly messages
      if (errorMessage.includes('fetch') || errorMessage.includes('FunctionsFetchError')) {
        errorMessage = 'Kunde inte ansluta till analys-tjänsten. Kontrollera din internetanslutning och försök igen.';
      } else if (errorMessage.includes('timeout') || errorMessage.includes('AbortError')) {
        errorMessage = 'Analysen tog för lång tid. Försök med en mindre eller tydligare bild.';
      } else if (errorMessage.includes('otillgänglig') || errorMessage.includes('FunctionsHttpError')) {
        errorMessage = 'Analys-tjänsten är tillfälligt otillgänglig. Försök igen om en stund.';
      } else if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
        errorMessage = 'Tjänsten är tillfälligt otillgänglig. Kontakta support om problemet kvarstår.';
      }
      
      setError(errorMessage);
      return null;
      
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  return {
    analyzeImage,
    isAnalyzing,
    error,
    progress,
    setError
  };
};