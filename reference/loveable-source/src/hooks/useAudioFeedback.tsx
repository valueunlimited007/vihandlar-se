class AudioFeedback {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    // Initialize AudioContext on first user interaction
    if (typeof window !== 'undefined') {
      this.loadSettings();
      console.log('AudioFeedback initialized, enabled:', this.enabled);
      
      // Add click listener to initialize audio context on first interaction
      document.addEventListener('click', this.handleFirstInteraction.bind(this), { once: true });
      document.addEventListener('touchstart', this.handleFirstInteraction.bind(this), { once: true });
      
      // iOS specific: Listen for visibility changes to handle context suspension
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }
  }

  private loadSettings() {
    try {
      const stored = localStorage.getItem('vihandlar-sound-enabled');
      this.enabled = stored !== 'false';
      console.log('Audio settings loaded from localStorage:', this.enabled);
    } catch (error) {
      console.warn('Failed to load audio settings from localStorage:', error);
      this.enabled = true; // Default to enabled if localStorage fails
    }
  }

  private handleVisibilityChange() {
    if (document.hidden && this.audioContext) {
      console.log('Page hidden, audio context may be suspended');
    } else if (!document.hidden && this.audioContext && this.audioContext.state === 'suspended') {
      console.log('Page visible, resuming audio context...');
      this.audioContext.resume().catch(error => 
        console.error('Failed to resume audio context:', error)
      );
    }
  }

  private async handleFirstInteraction() {
    console.log('First user interaction detected, initializing audio context...');
    try {
      await this.initAudioContext();
      this.initialized = true;
      console.log('Audio context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  private async initAudioContext() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (this.audioContext.state === 'suspended') {
        console.log('Resuming audio context...');
        await this.audioContext.resume();
      }
      console.log('Audio context state:', this.audioContext.state);
    } catch (error) {
      console.error('Error initializing audio context:', error);
      throw error;
    }
  }

  private createTone(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) {
      console.log('Audio feedback disabled or context not available');
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
      
      console.log(`Playing tone: ${frequency}Hz for ${duration}s`);
    } catch (error) {
      console.error('Error creating tone:', error);
    }
  }

  async playItemAdded() {
    console.log('PlayItemAdded called');
    await this.ensureAudioContext();
    this.createTone(800, 0.2, 0.08); // High gentle tone
  }

  async playItemCompleted() {
    console.log('PlayItemCompleted called');
    await this.ensureAudioContext();
    this.createTone(600, 0.15, 0.08); // Medium tone
  }

  async playItemRemoved() {
    console.log('PlayItemRemoved called');
    await this.ensureAudioContext();
    this.createTone(400, 0.1, 0.06); // Lower tone
  }


  private async ensureAudioContext() {
    if (!this.audioContext || !this.initialized) {
      await this.initAudioContext();
      this.initialized = true;
    }
  }

  setEnabled(enabled: boolean) {
    console.log('Setting audio enabled to:', enabled);
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('vihandlar-sound-enabled', enabled.toString());
        console.log('Audio setting saved to localStorage successfully');
        
        // Force a reload of settings to ensure consistency
        setTimeout(() => this.loadSettings(), 100);
      } catch (error) {
        console.error('Failed to save audio setting to localStorage:', error);
      }
    }
  }

  isEnabled() {
    return this.enabled;
  }
}

export const audioFeedback = new AudioFeedback();

export const useAudioFeedback = () => {
  return {
    playItemAdded: () => audioFeedback.playItemAdded(),
    playItemCompleted: () => audioFeedback.playItemCompleted(), 
    playItemRemoved: () => audioFeedback.playItemRemoved(),
    
    setEnabled: (enabled: boolean) => audioFeedback.setEnabled(enabled),
    isEnabled: () => audioFeedback.isEnabled(),
    testAudio: () => {
      console.log('Testing audio system...');
      audioFeedback.playItemAdded();
    }
  };
};