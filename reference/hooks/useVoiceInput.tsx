import { useState, useCallback } from 'react';

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Röstinmatning stöds inte i din webbläsare');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'sv-SE';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.trim();
      
      // Basic security validation for voice input
      if (result && result.length <= 100 && !/[<>]/g.test(result)) {
        setTranscript(result);
        onResult(result);
        setIsListening(false); // Auto stop after successful recognition
      } else {
        setError('Röstinmatning filtrerad av säkerhetsskäl');
        console.warn('Voice input filtered for security reasons');
      }
    };

    recognition.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        setError('Ingen röst hördes. Försök igen.');
      } else if (event.error === 'audio-capture') {
        setError('Mikrofon ej tillgänglig. Kontrollera inställningar.');
      } else if (event.error === 'not-allowed') {
        setError('Mikrofonåtkomst nekad. Aktivera i webbläsarinställningar.');
      } else {
        setError('Kunde inte känna igen rösten. Försök igen.');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    isSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  };
};

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}