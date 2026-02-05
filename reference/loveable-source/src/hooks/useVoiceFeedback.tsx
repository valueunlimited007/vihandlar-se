import { useState, useEffect, useCallback } from 'react';

export const useVoiceFeedback = () => {
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('=== VOICES LOADED ===');
        console.log('Total voices:', voices.length);
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        
        const swedishVoices = voices.filter(voice => voice.lang.startsWith('sv'));
        console.log('Swedish voices:', swedishVoices.map(v => `${v.name} (${v.lang})`));
        
        setVoicesLoaded(true);
      };

      // Load voices immediately if available
      if (speechSynthesis.getVoices().length > 0) {
        loadVoices();
      }

      // Listen for voice loading event
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);
  
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      try {
        console.log('=== MOBILE SPEECH DEBUG ===');
        console.log('Text:', text);
        console.log('Is mobile:', isMobile);
        console.log('Voices loaded:', voicesLoaded);
        console.log('Speech synthesis speaking:', speechSynthesis.speaking);
        console.log('Speech synthesis pending:', speechSynthesis.pending);
        
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Small delay to ensure cancel is processed
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'sv-SE';
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          
          utterance.onstart = () => {
            console.log('✅ Speech started successfully:', text);
          };
          
          utterance.onend = () => {
            console.log('✅ Speech ended successfully');
          };
          
          utterance.onerror = (event) => {
            console.error('❌ Speech synthesis error:', event.error);
            console.error('Error details:', event);
          };
          
          // Find and set Swedish voice
          const voices = speechSynthesis.getVoices();
          const swedishVoice = voices.find(voice => voice.lang.startsWith('sv'));
          if (swedishVoice) {
            utterance.voice = swedishVoice;
            console.log('Using Swedish voice:', swedishVoice.name);
          } else {
            console.log('No Swedish voice found, using default with sv-SE lang');
          }
          
          console.log('🔊 Starting speech...');
          speechSynthesis.speak(utterance);
          
        }, 50);
        
      } catch (error) {
        console.error('❌ Error in voice feedback:', error);
      }
    } else {
      console.warn('Speech synthesis not supported');
    }
  }, [isMobile, voicesLoaded]);

  const announceItemAdded = (itemName: string) => {
    speak(`${itemName} tillagd`);
  };

  const announceItemCompleted = (itemName: string) => {
    speak(`${itemName} avbockad`);
  };

  const announceItemRemoved = (itemName: string) => {
    speak(`${itemName} borttagen`);
  };

  return {
    speak,
    announceItemAdded,
    announceItemCompleted,
    announceItemRemoved,
    isSupported: 'speechSynthesis' in window,
  };
};