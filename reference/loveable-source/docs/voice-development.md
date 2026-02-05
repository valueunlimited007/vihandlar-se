# Röstfunktion - Utvecklarguide

## Utvecklingsmiljö Setup

### Förutsättningar

1. **Supabase CLI installerat**
2. **Whisper API-nyckel** konfigurerad
3. **Node.js 18+** för lokal utveckling
4. **HTTPS-miljö** för mikrofontillgång

### Lokal Development Setup

```bash
# Klona och setuppa projekt
git clone <repository>
cd <project>
npm install

# Starta Supabase lokalt
supabase start

# Konfigurera secrets för Edge Functions
supabase secrets set WHISPER_API_KEY=your-key-here

# Starta utvecklingsservern
npm run dev
```

---

## Arkitektur och Design Patterns

### Component Hierarki

<lov-mermaid>
graph TD
    A[AddItemForm] --> B[useWhisperVoiceInput]
    A --> C[useVoiceFeedback]
    B --> D[MediaRecorder API]
    B --> E[Supabase Edge Function]
    C --> F[SpeechSynthesis API]
    
    style A fill:#e3f2fd
    style B fill:#f3e5f5
    style E fill:#fff3e0
</lov-mermaid>

### State Management Pattern

```typescript
// Centraliserad state i custom hook
const useVoiceState = () => {
  const [voiceState, setVoiceState] = useState({
    mode: 'idle',        // 'idle' | 'recording' | 'processing'
    error: null,
    transcript: '',
    confidence: 0
  });

  const transitions = {
    startRecording: () => setVoiceState(prev => ({ 
      ...prev, 
      mode: 'recording', 
      error: null 
    })),
    
    startProcessing: () => setVoiceState(prev => ({ 
      ...prev, 
      mode: 'processing' 
    })),
    
    completeSuccess: (transcript) => setVoiceState(prev => ({ 
      ...prev, 
      mode: 'idle', 
      transcript,
      error: null 
    })),
    
    handleError: (error) => setVoiceState(prev => ({ 
      ...prev, 
      mode: 'idle', 
      error 
    }))
  };

  return { voiceState, transitions };
};
```

---

## Utöka Funktionaliteten

### 1. Lägg till Språkstöd

```typescript
// Expandera useWhisperVoiceInput för flerspråksstöd
interface VoiceConfig {
  language: 'sv' | 'en' | 'no' | 'da';
  prompt: string;
  maxDuration: number;
}

const languageConfigs: Record<string, VoiceConfig> = {
  'sv': {
    language: 'sv',
    prompt: 'Transkribera svenska matvarunamn som mjölk, bröd, äpplen',
    maxDuration: 4000
  },
  'en': {
    language: 'en',
    prompt: 'Transcribe English grocery items like milk, bread, apples',
    maxDuration: 3000
  }
};

const useMultiLanguageVoice = (language: string = 'sv') => {
  const config = languageConfigs[language];
  
  // Modifiera Whisper API call
  const processAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob);
    formData.append('language', config.language);
    formData.append('prompt', config.prompt);
    // ... rest of implementation
  };
};
```

### 2. Real-time Feedback

```typescript
// Lägg till real-time audio nivå indikator
const useAudioLevelMeter = () => {
  const [audioLevel, setAudioLevel] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const startMonitoring = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    
    microphone.connect(analyser);
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setAudioLevel(Math.round(average));
      
      if (analyserRef.current) {
        requestAnimationFrame(updateLevel);
      }
    };
    
    analyserRef.current = analyser;
    updateLevel();
  };

  return { audioLevel, startMonitoring };
};

// Använd i komponenten
const VoiceInputWithMeter = () => {
  const { audioLevel } = useAudioLevelMeter();
  
  return (
    <div className="voice-input-container">
      <button>🎤</button>
      <div className="audio-meter">
        <div 
          className="audio-level"
          style={{ width: `${audioLevel}%` }}
        />
      </div>
    </div>
  );
};
```

### 3. Intelligent Auto-Complete

```typescript
// Smart suggestions baserat på röstinput
const useSmartSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Analys av partiella röstresultat
  const analyzePartialInput = (transcript: string) => {
    const partial = transcript.toLowerCase();
    
    const groceryCategories = {
      dairy: ['mjölk', 'yoghurt', 'ost', 'smör', 'grädde'],
      fruit: ['äpplen', 'bananer', 'apelsiner', 'päron', 'vindruvor'],
      bread: ['bröd', 'knäckebröd', 'bagel', 'toast', 'bullar'],
      meat: ['kött', 'kyckling', 'fläsk', 'nötkött', 'korv']
    };
    
    // Fuzzy matching för bästa suggestions
    const matches = Object.values(groceryCategories)
      .flat()
      .filter(item => 
        item.includes(partial) || 
        levenshteinDistance(item, partial) < 3
      )
      .slice(0, 3);
    
    setSuggestions(matches);
  };

  return { suggestions, analyzePartialInput };
};

// Levenshtein distance för fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}
```

---

## Testing Strategier

### 1. Unit Tests för Hooks

```typescript
// __tests__/useWhisperVoiceInput.test.ts
import { renderHook, act } from '@testing-library/react';
import { useWhisperVoiceInput } from '../hooks/useWhisperVoiceInput';

// Mock MediaRecorder
global.MediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  state: 'inactive'
}));

describe('useWhisperVoiceInput', () => {
  beforeEach(() => {
    // Mock getUserMedia
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        getUserMedia: jest.fn().mockResolvedValue({
          getTracks: () => [{ stop: jest.fn() }]
        })
      }
    });
  });

  test('should initialize with correct default states', () => {
    const { result } = renderHook(() => useWhisperVoiceInput());
    
    expect(result.current.isRecording).toBe(false);
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isSupported).toBe(true);
  });

  test('should handle recording start', async () => {
    const { result } = renderHook(() => useWhisperVoiceInput());
    const mockOnResult = jest.fn();

    await act(async () => {
      await result.current.startRecording(mockOnResult);
    });

    expect(result.current.isRecording).toBe(true);
  });
});
```

### 2. Integration Tests

```typescript
// __tests__/VoiceIntegration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddItemForm } from '../components/AddItemForm';

// Mock Supabase
jest.mock('../integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: jest.fn().mockResolvedValue({
        data: { text: 'test item' },
        error: null
      })
    }
  }
}));

describe('Voice Integration', () => {
  test('should add item via voice input', async () => {
    const mockOnAddItem = jest.fn();
    
    render(<AddItemForm onAddItem={mockOnAddItem} />);
    
    const voiceButton = screen.getByLabelText(/röstinmatning/i);
    fireEvent.click(voiceButton);
    
    await waitFor(() => {
      expect(mockOnAddItem).toHaveBeenCalledWith('test item');
    });
  });
});
```

### 3. Edge Function Tests

```typescript
// __tests__/edge-functions/voice-to-text.test.ts
import { serve } from '../supabase/functions/voice-to-text/index.ts';

describe('Voice to Text Edge Function', () => {
  test('should handle valid audio input', async () => {
    const mockRequest = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({
        audio: 'valid-base64-audio-data'
      })
    });

    // Mock Whisper response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: 'mjölk' })
    });

    const response = await serve(mockRequest);
    const result = await response.json();

    expect(result.text).toBe('mjölk');
  });

  test('should handle CORS preflight', async () => {
    const mockRequest = new Request('http://localhost', {
      method: 'OPTIONS'
    });

    const response = await serve(mockRequest);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});
```

---

## Performance Optimering

### 1. Memory Management

```typescript
// Optimerad audio processing med cleanup
class AudioProcessor {
  private chunks: Blob[] = [];
  private recorder: MediaRecorder | null = null;

  async processAudio(stream: MediaStream): Promise<string> {
    try {
      this.recorder = new MediaRecorder(stream);
      
      this.recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.recorder.onstop = async () => {
        await this.sendToWhisper();
        this.cleanup();
      };

      this.recorder.start();
      
      // Auto-stop med cleanup
      setTimeout(() => {
        if (this.recorder?.state === 'recording') {
          this.recorder.stop();
        }
      }, 4000);

    } catch (error) {
      this.cleanup();
      throw error;
    }
  }

  private cleanup() {
    this.chunks = [];
    this.recorder = null;
    // Frigör stream resources
    stream?.getTracks().forEach(track => track.stop());
  }
}
```

### 2. Caching Strategier

```typescript
// Cache för vanliga varor
class VoiceCache {
  private cache = new Map<string, string>();
  private readonly MAX_CACHE_SIZE = 100;

  set(audioHash: string, transcript: string) {
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(audioHash, transcript);
  }

  get(audioHash: string): string | undefined {
    return this.cache.get(audioHash);
  }

  // Hash audio för cache key
  private async hashAudio(audioBlob: Blob): Promise<string> {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
```

### 3. Bundle Size Optimering

```typescript
// Lazy loading av röstfunktioner
const VoiceInput = lazy(() => import('./components/VoiceInput'));

const AddItemForm = () => {
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  return (
    <form>
      <input type="text" />
      
      {showVoiceInput ? (
        <Suspense fallback={<div>Laddar röstinput...</div>}>
          <VoiceInput />
        </Suspense>
      ) : (
        <button onClick={() => setShowVoiceInput(true)}>
          🎤 Aktivera röstinput
        </button>
      )}
    </form>
  );
};
```

---

## Best Practices

### 1. Error Boundaries

```typescript
// VoiceErrorBoundary för graceful fallbacks
class VoiceErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Voice component error:', error, errorInfo);
    
    // Rapportera till monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="voice-fallback">
          <p>Röstinput är inte tillgänglig just nu</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Försök igen
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Använd i app
<VoiceErrorBoundary>
  <AddItemForm />
</VoiceErrorBoundary>
```

### 2. Accessibility

```typescript
// Fullständig accessibility support
const AccessibleVoiceButton = () => {
  const { isRecording, startRecording } = useWhisperVoiceInput();
  const [announcement, setAnnouncement] = useState('');

  const handleVoiceInput = () => {
    setAnnouncement('Påbörjar röstinspelning');
    
    startRecording((text) => {
      setAnnouncement(`Lade till ${text} i listan`);
    });
  };

  return (
    <>
      <button
        onClick={handleVoiceInput}
        disabled={isRecording}
        aria-label={isRecording ? 
          'Spelar in röstkommando' : 
          'Starta röstinmatning för att lägga till vara'
        }
        aria-pressed={isRecording}
        aria-describedby="voice-status"
      >
        <Mic aria-hidden="true" />
        {isRecording ? 'Spelar in...' : 'Röstinput'}
      </button>
      
      {/* Screen reader announcements */}
      <div 
        id="voice-status"
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
};
```

### 3. Progressive Enhancement

```typescript
// Feature detection och graceful degradation
const useVoiceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    whisper: false,
    webSpeech: false,
    microphone: false
  });

  useEffect(() => {
    const detect = async () => {
      // Microphone access
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setCapabilities(prev => ({ ...prev, microphone: true }));
      } catch {
        setCapabilities(prev => ({ ...prev, microphone: false }));
      }

      // Web Speech API
      const hasWebSpeech = 'webkitSpeechRecognition' in window || 
                          'SpeechRecognition' in window;
      setCapabilities(prev => ({ ...prev, webSpeech: hasWebSpeech }));

      // Whisper (Edge Function tillgänglighet)
      try {
        const response = await fetch('/functions/v1/voice-to-text', {
          method: 'OPTIONS'
        });
        setCapabilities(prev => ({ ...prev, whisper: response.ok }));
      } catch {
        setCapabilities(prev => ({ ...prev, whisper: false }));
      }
    };

    detect();
  }, []);

  return capabilities;
};
```

---

## Deployment och CI/CD

### 1. Automated Testing Pipeline

```yaml
# .github/workflows/voice-tests.yml
name: Voice Function Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run voice hook tests
        run: npm test -- --testMatch="**/*voice*.test.*"
        
      - name: Test Edge Function
        run: |
          npx supabase start
          npm run test:edge-functions
```

### 2. Environment Configuration

```typescript
// config/voice.ts
export const voiceConfig = {
  development: {
    whisperTimeout: 10000,
    maxRecordingDuration: 8000,
    enableDetailedLogging: true
  },
  production: {
    whisperTimeout: 5000,
    maxRecordingDuration: 4000,
    enableDetailedLogging: false
  }
};

export const getVoiceConfig = () => {
  return voiceConfig[process.env.NODE_ENV as keyof typeof voiceConfig] || voiceConfig.development;
};
```

### 3. Monitoring och Analytics

```typescript
// utils/voiceAnalytics.ts
class VoiceAnalytics {
  static trackVoiceUsage(event: string, metadata?: object) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'voice_interaction', {
        event_category: 'voice',
        event_label: event,
        custom_map: metadata
      });
    }
  }

  static trackVoiceError(error: string, context?: string) {
    console.error('Voice error:', error, context);
    
    this.trackVoiceUsage('error', {
      error_message: error,
      context
    });
  }

  static trackVoiceSuccess(transcript: string, duration: number) {
    this.trackVoiceUsage('success', {
      transcript_length: transcript.length,
      processing_duration: duration
    });
  }
}

// Använd i hooks
const { startRecording } = useWhisperVoiceInput();

const handleVoice = () => {
  const startTime = Date.now();
  
  startRecording((text) => {
    const duration = Date.now() - startTime;
    VoiceAnalytics.trackVoiceSuccess(text, duration);
  });
};
```

## Sammanfattning

Denna utvecklarguide ger en komplett översikt över hur man arbetar med och utökar röstfunktionaliteten. Viktiga takeaways:

1. **Använd TypeScript** för typ-säkerhet
2. **Implementera comprehensive testing** för alla voice-komponenter  
3. **Optimera för performance** med lazy loading och caching
4. **Prioritera accessibility** och progressive enhancement
5. **Övervaka och analysera** röstfunktionsanvändning
6. **Hantera errors gracefully** med fallbacks

För ytterligare frågor eller förbättringsförslag, se troubleshooting-guiden eller skapa en issue i projektets repository.