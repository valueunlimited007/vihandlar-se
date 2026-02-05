# Röstfunktion - Hook Dokumentation

## useWhisperVoiceInput

Den primära hooken för Whisper-baserad röstinmatning.

### API Referens

```typescript
interface UseWhisperVoiceInputReturn {
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
  startRecording: (onResult: (text: string) => void) => void;
  stopRecording: () => void;
  isSupported: boolean;
}

const {
  isRecording,
  isProcessing,
  error,
  startRecording,
  stopRecording,
  isSupported
} = useWhisperVoiceInput();
```

### States

#### `isRecording: boolean`
Indikerar om mikrofonen aktivt spelar in audio.
- `true`: Inspelning pågår (max 4 sekunder)
- `false`: Ingen aktiv inspelning

#### `isProcessing: boolean`
Indikerar om audio bearbetas av Whisper API.
- `true`: Audio skickas till Whisper eller väntar på svar
- `false`: Ingen aktiv bearbetning

#### `error: string | null`
Innehåller felmeddelande om något gick fel.
- `null`: Inget fel
- `string`: Användarläsbart felmeddelande på svenska

#### `isSupported: boolean`
Indikerar om röstinmatning stöds i aktuell browser.
- `true`: MediaRecorder API tillgängligt
- `false`: Browser stöder inte funktionen

### Methods

#### `startRecording(onResult: (text: string) => void): void`

Startar röstinspelning och transkribering.

**Parameters:**
- `onResult`: Callback som anropas med transkriberad text

**Beteende:**
- Begär mikrofonåtkomst från användaren
- Startar 4-sekunders inspelning
- Skickar audio till Whisper API automatiskt
- Filtrerar irrelevant text
- Anropar `onResult` med valid text

**Exempel:**
```typescript
startRecording((text) => {
  console.log('Röstinput mottagen:', text);
  addItemToList(text);
});
```

#### `stopRecording(): void`

Stoppar pågående inspelning manuellt (används normalt inte då auto-stop är aktiverat).

### Användningsexempel

```typescript
import { useWhisperVoiceInput } from '@/hooks/useWhisperVoiceInput';

const VoiceInputComponent = () => {
  const { 
    isRecording, 
    isProcessing, 
    error, 
    startRecording, 
    isSupported 
  } = useWhisperVoiceInput();

  const handleVoiceInput = () => {
    if (isRecording || isProcessing) {
      return; // Förhindra flera aktiva sessioner
    }
    
    startRecording((text) => {
      console.log('Mottagen text:', text);
      // Hantera transkriberad text
    });
  };

  if (!isSupported) {
    return <p>Röstinmatning stöds inte i din webbläsare</p>;
  }

  return (
    <div>
      <button 
        onClick={handleVoiceInput}
        disabled={isRecording || isProcessing}
      >
        {isRecording ? 'Spelar in...' : 
         isProcessing ? 'Bearbetar...' : 
         'Starta röstinmatning'}
      </button>
      
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};
```

### Interna Implementation Details

#### MediaRecorder Konfiguration

```typescript
const mediaRecorder = new MediaRecorder(stream, { 
  mimeType: 'audio/webm;codecs=opus' // Med fallbacks
});

mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    audioChunksRef.current.push(event.data);
  }
};
```

#### Auto-stop Timer

```typescript
// Auto-stop efter 4 sekunder
setTimeout(() => {
  if (mediaRecorderRef.current?.state === 'recording') {
    mediaRecorderRef.current.stop();
  }
}, 4000);
```

#### Filtrering Logic

```typescript
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

const isIrrelevant = irrelevantPatterns.some(pattern => 
  pattern.test(text)
);

if (isIrrelevant || text.length > 100) {
  throw new Error('Kunde inte känna igen varan. Försök igen.');
}
```

---

## useVoiceInput (Legacy)

Fallback hook som använder browser-inbyggd Web Speech API.

### API Referens

```typescript
interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  error: string | null;
  startListening: (onResult: (text: string) => void) => void;
  stopListening: () => void;
  isSupported: boolean;
}
```

### Skillnader från useWhisperVoiceInput

| Aspekt | useWhisperVoiceInput | useVoiceInput |
|--------|---------------------|---------------|
| **API** | Whisper | Web Speech API |
| **Kvalitet** | Hög | Varierande |
| **Språkstöd** | Utmärkt svenska | Bra svenska |
| **Kostnad** | Whisper API-kostnad | Gratis |
| **Offline** | Nej | Delvis (Chrome) |
| **Browser-stöd** | Alla moderna | Chrome/Edge bäst |

### Användning

```typescript
const { isListening, startListening, isSupported } = useVoiceInput();

if (!isSupported) {
  // Fallback till textinmatning eller visa meddelande
  return <TextInput />;
}

const handleVoice = () => {
  startListening((text) => {
    // Hantera transkriberad text
    addItem(text);
  });
};
```

### När Använda Vilken Hook

**Använd useWhisperVoiceInput när:**
- Hög kvalitet på taligenkänning krävs
- Svenska är primärspråk
- Du har tillgång till Whisper API
- Användaren förväntar sig professionell kvalitet

**Använd useVoiceInput som fallback när:**
- Whisper inte är tillgängligt
- Kostnad är en begränsning
- Offline-funktionalitet önskas
- Som backup för browser-kompatibilitet

### State Management Jämförelse

<lov-mermaid>
graph LR
    A[User Click] --> B{Which Hook?}
    B -->|Primary| C[useWhisperVoiceInput]
    B -->|Fallback| D[useVoiceInput]
    
    C --> E[Record Audio]
    E --> F[Send to Whisper]
    F --> G[Filter Result]
    G --> H[Add Item]
    
    D --> I[Web Speech API]
    I --> J[Real-time Result]
    J --> K[Basic Validation]
    K --> H
    
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style H fill:#e8f5e8
</lov-mermaid>

---

## Best Practices

### 1. Error Handling

```typescript
const handleVoiceError = (error: string) => {
  // Logga för debugging
  console.error('Voice input error:', error);
  
  // Visa användarvänligt meddelande
  if (error.includes('nekad')) {
    showToast('Aktivera mikrofonåtkomst för röstinmatning');
  } else if (error.includes('hittades')) {
    showToast('Ingen mikrofon hittades');
  } else {
    showToast('Röstinmatning misslyckades. Försök igen.');
  }
};
```

### 2. Accessibility

```typescript
// ARIA-attribut för skärmläsare
<button
  onClick={handleVoiceInput}
  aria-label={isRecording ? 
    'Spelar in röstinput' : 
    'Starta röstinmatning för att lägga till vara'
  }
  aria-pressed={isRecording}
>
  <Mic />
</button>
```

### 3. Progressive Enhancement

```typescript
const VoiceEnabledForm = () => {
  const whisper = useWhisperVoiceInput();
  const webSpeech = useVoiceInput();
  
  const voiceCapability = whisper.isSupported ? 'whisper' : 
                         webSpeech.isSupported ? 'webspeech' : 
                         'none';
  
  return (
    <form>
      <input type="text" placeholder="Skriv vara..." />
      
      {voiceCapability !== 'none' && (
        <VoiceButton capability={voiceCapability} />
      )}
    </form>
  );
};
```