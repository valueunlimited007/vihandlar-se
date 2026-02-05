import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useWhisperVoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async (onResult: (text: string) => void) => {
    try {
      setError(null);
      setIsRecording(true);
      audioChunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create MediaRecorder with better format support
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsProcessing(true);

        try {
          // Combine audio chunks
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Check minimum duration (at least 0.5 seconds)
          if (audioBlob.size < 8000) {
            throw new Error('För kort inspelning. Försök igen.');
          }
          
          // Convert to base64
          const base64Audio = await blobToBase64(audioBlob);
          
          console.log('Sending audio to Whisper...');
          
          // Send to our edge function
          const { data, error } = await supabase.functions.invoke('voice-to-text', {
            body: { audio: base64Audio }
          });

          if (error) {
            throw new Error(error.message || 'Transkribering misslyckades');
          }

          if (data?.text) {
            console.log('Whisper result:', data.text);
            
            // Filter out irrelevant transcriptions
            const text = data.text.trim();
            const irrelevantPatterns = [
              /tack.*för.*att.*titta/i,
              /tack.*till.*elever/i,
              /hjälp.*med.*video/i,
              /redigera.*video/i,
              /subscribe/i,
              /prenumerera/i,
              /like.*comment/i,
              /gillar.*kommentera/i
            ];
            
            // Check if text seems irrelevant
            const isIrrelevant = irrelevantPatterns.some(pattern => pattern.test(text));
            
            if (isIrrelevant || text.length > 100) {
              throw new Error('Kunde inte känna igen varan. Försök igen.');
            }
            
            onResult(text);
          } else {
            throw new Error('Ingen text mottagen från Whisper');
          }

        } catch (err) {
          console.error('Whisper processing error:', err);
          setError(err instanceof Error ? err.message : 'Transkribering misslyckades');
        } finally {
          setIsProcessing(false);
          // Clean up stream
          stream.getTracks().forEach(track => track.stop());
        }
      };

      // Start recording and auto-stop after 4 seconds
      mediaRecorder.start();
      
      // Auto-stop recording after 4 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 4000);

    } catch (err) {
      console.error('Recording error:', err);
      setIsRecording(false);
      
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError('Mikrofonåtkomst nekad. Aktivera i webbläsarinställningar.');
      } else if (err instanceof Error && err.name === 'NotFoundError') {
        setError('Ingen mikrofon hittades.');
      } else {
        setError('Kunde inte starta inspelning.');
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  // Helper function to convert blob to base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return {
    isRecording,
    isProcessing,
    error,
    startRecording,
    stopRecording,
    isSupported: typeof navigator !== 'undefined' && 'mediaDevices' in navigator
  };
};