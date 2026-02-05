# Voice-to-Text Edge Function

## Översikt

Edge Function som hanterar audio-to-text transkribering via Whisper API. Funktionen tar emot base64-enkodad audio och returnerar transkriberad text optimerad för svenska matvarunamn.

## Arkitektur

<lov-mermaid>
graph TD
    A[Frontend Audio] --> B[Base64 Encoding]
    B --> C[Edge Function]
    C --> D[Chunk Processing]
    D --> E[FormData Creation]
    E --> F[Whisper API]
    F --> G[Response Processing]
    G --> H[Return Transcription]
    
    style C fill:#f3e5f5
    style F fill:#e1f5fe
</lov-mermaid>

## API Specifikation

### Endpoint
```
POST /functions/v1/voice-to-text
```

### Request Headers
```http
Content-Type: application/json
Authorization: Bearer [supabase-anon-key]
```

### Request Body
```json
{
  "audio": "base64-encoded-audio-data"
}
```

### Response

**Success (200):**
```json
{
  "text": "mjölk och bröd"
}
```

**Error (400/500):**
```json
{
  "error": "Beskrivning av felet"
}
```

## Implementation

### Memory-effektiv Audio Processing

```typescript
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  // Bearbeta base64 i chunks för att undvika memory-problem
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

  // Kombinera alla chunks till en kontinuerlig array
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

### Whisper API Integration

```typescript
// Optimerad prompt för svenska matvaror
const formData = new FormData();
formData.append('file', blob, 'audio.webm');
formData.append('model', 'whisper-1');
formData.append('language', 'sv');
formData.append('prompt', 
  'Transkribera svenska matvarunamn som mjölk, bröd, äpplen, bananer, kött, fisk, grönsaker, potatis, lök, tomat'
);

const response = await fetch('https://api.whisper.ai/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${Deno.env.get('WHISPER_API_KEY')}`,
  },
  body: formData,
});
```

### CORS Hantering

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hantera preflight requests
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders });
}
```

## Konfiguration

### Environment Variables

Edge Function förväntar sig följande miljövariabler:

```bash
WHISPER_API_KEY=sk-your-whisper-key-here
```

### Deployment Configuration

I `supabase/config.toml`:

```toml
[functions.voice-to-text]
verify_jwt = true  # Kräver autentisering
```

## Error Handling

### Vanliga Fel och Hantering

```typescript
try {
  const response = await fetch(openaiUrl, { ... });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Whisper API error:', errorText);
    
    // Specifik felhantering baserat på statuskod
    switch (response.status) {
      case 400:
        throw new Error('Ogiltigt audioformat');
      case 401:
        throw new Error('Whisper API-nyckel ogiltig');
      case 429:
        throw new Error('API-gräns nådd. Försök senare');
      case 500:
        throw new Error('Whisper-server fel');
      default:
        throw new Error('Transkribering misslyckades');
    }
  }
} catch (error) {
  console.error('Processing error:', error);
  return new Response(
    JSON.stringify({ error: error.message }),
    {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
```

### Logging för Debugging

```typescript
console.log('Processing audio data for Whisper...');
console.log(`Audio size: ${binaryAudio.length} bytes`);
console.log('Sending audio to Whisper API...');

const result = await response.json();
console.log('Whisper transcription result:', result.text);
```

## Performance Optimeringar

### 1. Audio Komprimering

```typescript
// Frontend optimeringar som påverkar Edge Function performance
const mediaRecorder = new MediaRecorder(stream, {
  mimeType: 'audio/webm;codecs=opus'  // Effektiv komprimering
});
```

### 2. Chunked Processing

- Hanterar stora audiofiler utan memory-problem
- 32KB chunks som standard (konfigurerbart)
- Minimal memory footprint även för långa inspelningar

### 3. Caching Strategi

```typescript
// Framtida optimering: Cache vanliga matvarunamn
const commonItems = ['mjölk', 'bröd', 'äpplen', 'bananer'];
if (commonItems.includes(result.text.toLowerCase())) {
  // Fast-path för vanliga varor
}
```

## Kostnadskontroll

### API-kostnad Optimering

**Whisper-1 Prissättning:**
- $0.006 per minut audio
- 4-sekunders inspelning = ~$0.0004 per anrop

**Kostnadskontroll:**
- Maximal inspelningstid: 4 sekunder
- Minimal audiostorlek validering
- Lokal filtrering före API-anrop

### Usage Monitoring

```typescript
// Logga för kostnadsanalys
console.log(`Audio duration estimate: ${audioBlob.size / 16000} seconds`);
console.log(`Estimated cost: $${(audioBlob.size / 16000 / 60 * 0.006).toFixed(6)}`);
```

## Säkerhet

### Input Validering

```typescript
if (!audio || typeof audio !== 'string') {
  throw new Error('Ingen giltig audio-data mottagen');
}

// Validera base64 format
try {
  atob(audio.slice(0, 100)); // Test första delen
} catch (e) {
  throw new Error('Ogiltigt base64 audio-format');
}
```

### Rate Limiting

Edge Function har inbyggt rate limiting:
- Per användare: Naturligt begränsat av frontend (4s inspelning + processing tid)
- Per projekt: Supabase standard rate limits
- Whisper: API key-baserade limits

### Data Säkerhet

```typescript
// Audio-data skickas aldrig till databas
// Endast transkriberad text returneras
// Ingen persistent lagring av känslig audio-data

// Clean up efter processing
formData = null;
binaryAudio = null;
```

## Monitoring och Debugging

### Edge Function Logs

Tillgängliga via Supabase Dashboard:
- Request/response tider
- Error rates och typer
- API-anrop statistik

### Useful Log Statements

```typescript
console.log('=== Voice-to-Text Request ===');
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Audio size: ${audio.length} chars (base64)`);
console.log(`Processing time: ${Date.now() - startTime}ms`);
console.log(`Result: "${result.text}"`);
console.log('================================');
```

## Testing

### Lokal Development

```bash
# Starta Supabase lokalt
supabase start

# Testa Edge Function
curl -X POST http://localhost:54321/functions/v1/voice-to-text \
  -H "Content-Type: application/json" \
  -d '{"audio":"[base64-audio-data]"}'
```

### Integration Tests

```typescript
// Test med olika audio-format
const testCases = [
  { format: 'webm', expectedResult: 'mjölk' },
  { format: 'mp4', expectedResult: 'bröd' },
  { format: 'wav', expectedResult: 'äpplen' }
];

for (const testCase of testCases) {
  const result = await testVoiceToText(testCase.audio);
  assert(result.text === testCase.expectedResult);
}
```

## Framtida Förbättringar

### 1. Smart Caching
- Cache vanliga matvarunamn
- Lokalt cache av voice-to-text mappningar
- Reduced API calls för repetitiva anrop

### 2. Batch Processing
- Kombinera flera korta inspelningar
- Bulk-transkribering för efficiency

### 3. Custom Model Fine-tuning
- Träna Whisper-modell på svenska matvarudata
- Förbättrad precision för nischade termer

### 4. Real-time Streaming
- WebSocket-baserad streaming transkribering
- Live feedback under inspelning