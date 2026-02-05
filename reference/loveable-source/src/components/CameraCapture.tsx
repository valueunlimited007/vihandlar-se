import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onCancel
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }
      
      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      console.log('Camera access granted:', mediaStream);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err: any) {
      console.error('Detailed camera error:', {
        error: err,
        name: err?.name,
        message: err?.message,
        userAgent: navigator.userAgent,
        protocol: window.location.protocol,
        isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost'
      });
      
      let errorMessage = 'Kunde inte komma åt kameran.';
      
      if (err?.name === 'NotAllowedError') {
        errorMessage = 'Kameraåtkomst nekad. Ge behörighet i webbläsarinställningar.';
      } else if (err?.name === 'NotFoundError') {
        errorMessage = 'Ingen kamera hittades på enheten.';
      } else if (err?.name === 'NotSupportedError') {
        errorMessage = 'Kamera stöds inte i denna webbläsare.';
      } else if (err?.name === 'NotReadableError') {
        errorMessage = 'Kameran används av en annan app. Stäng andra appar och försök igen.';
      } else if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        errorMessage = 'Kamera kräver HTTPS-anslutning för säkerhet.';
      }
      
      setError(errorMessage);
      toast({
        title: "Kamera fel",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and create image URL
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
      }
    }, 'image/jpeg', 0.8);
  };

  const confirmCapture = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg', 0.8);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="p-6 max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Kamera inte tillgänglig</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={onCancel}>
            Tillbaka
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-dvh bg-black relative overflow-hidden">
      {/* Camera view or captured image */}
      <div className="relative w-full h-full">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ display: isLoading ? 'none' : 'block' }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Startar kamera...</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Overlay guide */}
        {!capturedImage && !isLoading && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
              <div className="absolute top-4 left-4 right-4 text-center">
                <p className="text-white text-sm bg-black/50 rounded px-2 py-1">
                  Centrera ingredienslistan i ramen
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 bg-gradient-to-t from-black via-black/80 to-transparent" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          {capturedImage ? (
            <>
              <Button
                size="lg"
                variant="outline"
                onClick={retakePhoto}
                className="bg-black/50 border-white/50 text-white hover:bg-white/20"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Ta om
              </Button>
              <Button
                size="lg"
                onClick={confirmCapture}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="mr-2 h-5 w-5" />
                Använd foto
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                variant="outline"
                onClick={onCancel}
                className="bg-black/50 border-white/50 text-white hover:bg-white/20"
              >
                <X className="mr-2 h-5 w-5" />
                Avbryt
              </Button>
              <Button
                size="lg"
                onClick={capturePhoto}
                disabled={isLoading}
                className="bg-white text-black hover:bg-white/90"
              >
                <Camera className="mr-2 h-5 w-5" />
                Ta foto
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};