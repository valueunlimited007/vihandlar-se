# Röstfunktion - Teknisk Implementation

## Systemarktitektur

### Dataflöde

<lov-mermaid>
sequenceDiagram
    participant U as User
    participant C as AddItemForm
    participant H as useWhisperVoiceInput
    participant M as MediaRecorder
    participant E as Edge Function
    participant W as Whisper API
    
    U->>C: Klickar mikrofonknapp
    C->>H: startRecording()
    H->>M: Begär mikrofonåtkomst
    M-->>H: Stream tillgänglig
    H->>M: Starta inspelning
    
    Note over M: Spelar in i 4 sekunder
    
    M->>H: Audio chunks
    H->>H: Kombinera chunks till blob
    H->>H: Konvertera till base64
    H->>E: Skicka audio data
    E->>W: POST /audio/transcriptions
    W-->>E: Transkriberad text
    E-->>H: { text: "mjölk" }
    H->>H: Filtrera och validera
    H->>C: onResult("mjölk")
    C->>C: Lägg till vara i lista
</lov-mermaid>

## Audio Processing Pipeline

### 1. Inspelningskonfiguration

```typescript
const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    sampleRate: 44100,        // CD-kvalitet
    channelCount: 1,          // Mono för mindre filstorlek
    echoCancellation: true,   // Förbättrar kvalitet
    noiseSuppression: true,   // Reducerar bakgrundsljud
    autoGainControl: true     // Normaliserar volym
  }
});
```

### 2. Format Prioritering

```typescript
let mimeType = 'audio/webm;codecs=opus';  // Bäst komprimering
if (!MediaRecorder.isTypeSupported(mimeType)) {
  mimeType = 'audio/webm';                // Fallback 1
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'audio/mp4';               // Safari fallback
  }
}
```

### 3. Memory-effektiv Base64 Konvertering

```typescript
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }
  
  // Kombinera chunks till en sammanhängande array
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  
  return result;
}
```

## Whisper API Integration

### Optimerad Prompt för Svenska Matvaror

```typescript
const formData = new FormData();
formData.append('file', blob, 'audio.webm');
formData.append('model', 'whisper-1');
formData.append('language', 'sv');
formData.append('prompt', 
  'Transkribera svenska matvarunamn som mjölk, bröd, äpplen, bananer, kött, fisk, grönsaker, potatis, lök, tomat'
);
```

### Error Handling Strategi

```typescript
if (!response.ok) {
  const errorText = await response.text();
  console.error('Whisper API error:', errorText);
  
  if (response.status === 429) {
    throw new Error('API-gräns nådd. Försök igen senare.');
  } else if (response.status === 401) {
    throw new Error('API-nyckel ogiltig.');
  } else {
    throw new Error('Transkribering misslyckades. Försök igen.');
  }
}
```

## Intelligent Filtrering

### Hallucination Detection

Whisper kan ibland "höra" text som inte finns i audio. Vi filtrerar bort vanliga hallucinationer:

```typescript
const irrelevantPatterns = [
  /tack.*för.*att.*titta/i,      // YouTube-relaterat
  /tack.*till.*elever/i,         // Utbildningsvideor
  /hjälp.*med.*video/i,          // Video-metadata
  /redigera.*video/i,            // Redigeringstexter
  /subscribe/i,                  // Engelska video-termer
  /prenumerera/i,                // Svenska video-termer
  /like.*comment/i,              // Social media
  /gillar.*kommentera/i          // Svenska social media
];

const isIrrelevant = irrelevantPatterns.some(pattern => 
  pattern.test(text)
);
```

### Längdvalidering

```typescript
// För kort inspelning (troligen tystnad)
if (audioBlob.size < 8000) {
  throw new Error('För kort inspelning. Försök igen.');
}

// För lång text (troligen hallucination)
if (text.length > 100) {
  throw new Error('Kunde inte känna igen varan. Försök igen.');
}
```

## State Management

### Hook States

```typescript
interface WhisperVoiceInputState {
  isRecording: boolean;      // Aktiv inspelning
  isProcessing: boolean;     // Skickar till Whisper
  error: string | null;      // Felmeddelande
  isSupported: boolean;      // Browser-stöd
}
```

### State Transitions

<lov-mermaid>
stateDiagram-v2
    [*] --> Idle
    Idle --> Recording: startRecording()
    Recording --> Processing: Auto-stop efter 4s
    Recording --> Idle: stopRecording()
    Processing --> Idle: Whisper response
    Processing --> Error: API fel
    Error --> Idle: Timeout eller ny recording
</lov-mermaid>

## Säkerhetsaspekter

### Input Sanitization

```typescript
// Grundläggande säkerhetskontroll
if (result && result.length <= 100 && !/[<>]/g.test(result)) {
  onResult(result);
} else {
  setError('Röstinmatning filtrerad av säkerhetsskäl');
}
```

### CORS Konfiguration

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

### Rate Limiting (Implicit)

- 4-sekunders inspelningsgräns
- Användaren kan inte starta ny inspelning medan processing pågår
- Automatisk cleanup av audio-resources

## Performance Optimeringar

### Memory Management

```typescript
// Rensa audio-resurser efter processing
mediaRecorder.onstop = async () => {
  try {
    // ... processing logic
  } finally {
    // Frigör mikrofonstream
    stream.getTracks().forEach(track => track.stop());
  }
};
```

### Efficient Data Transfer

- Chunked base64 processing för stora filer
- Komprimerat audio-format (WebM/Opus)
- Minimal payload till Edge Function

### User Experience

- Omedelbar visual feedback vid recording
- Loading states under processing
- Automatisk tillägg av item (ingen extra klickning)
- Röst-bekräftelse av tillagda varor