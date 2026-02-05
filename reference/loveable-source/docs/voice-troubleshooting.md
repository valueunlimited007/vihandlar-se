# Röstfunktion - Troubleshooting Guide

## Vanliga Problem och Lösningar

### 🎤 Mikrofonrelaterade Problem

#### Problem: "Mikrofonåtkomst nekad"
**Symtom:** Röstknappen fungerar inte, felmeddelande om nekad åtkomst

**Lösningar:**
1. **Chrome/Edge:**
   - Klicka på låsikonen i adressfältet
   - Välj "Tillåt mikrofon"
   - Ladda om sidan

2. **Firefox:**
   - Klicka på mikrofon-ikonen i adressfältet
   - Välj "Tillåt" och "Kom ihåg beslut"

3. **Safari:**
   - Safari → Inställningar → Webbplatser → Mikrofon
   - Hitta din webbplats och sätt till "Tillåt"

4. **Systemtillstånd:**
   ```bash
   # macOS - Kontrollera systemtillstånd
   System Preferences → Security & Privacy → Privacy → Microphone
   
   # Windows - Kontrollera mikrofontillstånd
   Settings → Privacy → Microphone → Allow apps to access microphone
   ```

#### Problem: "Ingen mikrofon hittades"
**Symtom:** Felmeddelande om att ingen mikrofon finns tillgänglig

**Lösningar:**
1. Kontrollera att mikrofon är ansluten
2. Testa mikrofon i andra applikationer
3. Starta om webbläsaren
4. Kontrollera Windows/macOS ljudinställningar

---

### 🔄 Inspelningsproblem

#### Problem: "För kort inspelning"
**Symtom:** Meddelande att inspelningen är för kort efter inspelning

**Orsaker och lösningar:**
1. **Tystnad under inspelning:**
   - Prata närmare mikrofonen
   - Öka mikrofonvolym i systemet
   - Kontrollera att mikrofon inte är mutad

2. **Snabb klickning:**
   - Vänta minst 1 sekund innan du slutar prata
   - Låt auto-stop (4 sekunder) hantera timing

3. **Teknisk debugging:**
   ```typescript
   // Kontrollera audio blob storlek
   console.log('Audio blob size:', audioBlob.size);
   // Bör vara >8000 bytes för valid inspelning
   ```

#### Problem: "Auto-stop fungerar inte"
**Symtom:** Inspelning fortsätter längre än 4 sekunder

**Debugging:**
```typescript
// Kontrollera MediaRecorder state
console.log('MediaRecorder state:', mediaRecorderRef.current?.state);

// Kontrollera timeout
setTimeout(() => {
  console.log('Auto-stop triggered at 4 seconds');
  if (mediaRecorderRef.current?.state === 'recording') {
    mediaRecorderRef.current.stop();
  }
}, 4000);
```

---

### 🤖 Whisper-relaterade Problem

#### Problem: "Kunde inte känna igen varan"
**Symtom:** Whisper returnerar irrelevant text eller hallucinationer

**Vanliga hallucinationer och deras orsaker:**

| Hallucination | Trolig orsak | Lösning |
|---------------|--------------|---------|
| "Tack för att titta" | Tystnad/background noise | Prata tydligare |
| "Subscribe and like" | Kort inspelning | Säg hela varunamnet |
| "Hjälp med video" | Svagteknika ljud | Kom närmare mikrofonen |
| "Redigera video" | Ekon/reverb | Inspelning i tystare miljö |

**Lösningsstrategier:**
1. **Tala tydligt och långsamt**
2. **Säg fullständiga varunamn** (inte bara "mjö..." utan "mjölk")
3. **Undvik bakgrundsljud**
4. **Håll telefon/mikrofon nära munnen**

#### Problem: "Transkribering misslyckades"
**Symtom:** Error från Whisper API

**Debugging steps:**
1. **Kontrollera Edge Function logs:**
   ```
   Supabase Dashboard → Functions → voice-to-text → Logs
   ```

2. **Vanliga API-fel:**
   ```typescript
   // 401 Unauthorized
   if (response.status === 401) {
     console.error('Whisper API key invalid or missing');
   }
   
   // 429 Rate Limited
   if (response.status === 429) {
     console.error('Too many requests to Whisper');
   }
   
   // 400 Bad Request
   if (response.status === 400) {
     console.error('Invalid audio format or data');
   }
   ```

3. **Audio format problem:**
   ```typescript
   // Kontrollera supporterat format
   console.log('WebM support:', MediaRecorder.isTypeSupported('audio/webm'));
   console.log('MP4 support:', MediaRecorder.isTypeSupported('audio/mp4'));
   ```

---

### 📱 Mobilspecifika Problem

#### Problem: iOS Safari Audio Issues
**Symtom:** Röstinmatning fungerar inte på iPhones

**Lösningar:**
1. **Uppdatera iOS** till senaste version
2. **Aktivera mikrofon för Safari:**
   ```
   Settings → Safari → Camera & Microphone Access → Allow
   ```
3. **Testa i andra browsers** (Chrome, Firefox)

**iOS Debugging:**
```typescript
// Kontrollera iOS-specifika begränsningar
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
if (isIOS) {
  console.log('iOS detected - checking WebM support');
  if (!MediaRecorder.isTypeSupported('audio/webm')) {
    console.log('Falling back to MP4');
  }
}
```

#### Problem: Android Chrome Permissions
**Symtom:** Inkonsistent mikrofontillgång på Android

**Lösningar:**
1. **Rensa Chrome data** för webbplatsen
2. **Kontrollera Android-behörigheter:**
   ```
   Settings → Apps → Chrome → Permissions → Microphone → Allow
   ```
3. **Testa i inkognito-läge**

---

### 🌐 Nätverks- och API-problem

#### Problem: Långsam response från Whisper
**Symtom:** "Bearbetar röstinput..." visas länge

**Debugging:**
```typescript
// Mät API response tid
const startTime = Date.now();
const response = await supabase.functions.invoke('voice-to-text', {
  body: { audio: base64Audio }
});
console.log(`Whisper response time: ${Date.now() - startTime}ms`);
```

**Optimeringar:**
1. **Kortare inspelningar** (närmare 2-3 sekunder)
2. **Bättre audio kvalitet** (mindre noise → snabbare processing)
3. **Kontrollera internetanslutning**

#### Problem: Edge Function inte tillgänglig
**Symtom:** Network error eller 404 på voice-to-text

**Debugging:**
```typescript
// Testa Edge Function direkt
const testResponse = await fetch(
  'https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/voice-to-text',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${anonKey}`
    },
    body: JSON.stringify({ audio: 'test' })
  }
);
console.log('Edge Function status:', testResponse.status);
```

---

### 🔧 Utvecklarverktyg och Debugging

#### Console Debugging
```typescript
// Aktivera detaljerad logging
localStorage.setItem('voice-debug', 'true');

// I useWhisperVoiceInput hook
const debug = localStorage.getItem('voice-debug') === 'true';
if (debug) {
  console.log('🎤 Recording started');
  console.log('📊 Audio chunks:', audioChunksRef.current.length);
  console.log('📡 Sending to Whisper...');
  console.log('✅ Whisper result:', data.text);
}
```

#### Network Tab Analysis
1. Öppna DevTools (F12)
2. Gå till Network tab
3. Starta röstinmatning
4. Kontrollera:
   - `voice-to-text` request status
   - Response time
   - Payload size
   - Error messages

#### Component State Debugging
```typescript
// Lägg till i AddItemForm för debugging
useEffect(() => {
  console.log('Voice states:', {
    isRecording,
    isProcessing,
    error,
    isSupported
  });
}, [isRecording, isProcessing, error, isSupported]);
```

---

### 📋 Checklista för Problemlösning

När röstfunktionen inte fungerar, gå igenom denna checklista:

#### ✅ Grundläggande Kontroller
- [ ] Mikrofon ansluten och fungerar i andra appar
- [ ] Webbläsare har mikrofontillstånd
- [ ] Internetanslutning aktiv
- [ ] JavaScript aktiverat

#### ✅ Browser-specifikt
- [ ] Testa i inkognito/privat läge
- [ ] Rensa cache och cookies
- [ ] Uppdatera webbläsare till senaste version
- [ ] Testa i annan webbläsare

#### ✅ Audio-tekniskt
- [ ] Mikrofonvolym tillräckligt hög
- [ ] Minimal bakgrundsljud
- [ ] Tala tydligt och långsamt
- [ ] Hela varunamn (inte förkortningar)

#### ✅ API och Backend
- [ ] Supabase projekt aktivt
- [ ] Whisper API-nyckel giltig
- [ ] Edge Function deployed
- [ ] Inga rate limits nådda

#### ✅ Utvecklartools
- [ ] Console errors kollade
- [ ] Network requests analyserade  
- [ ] Edge Function logs kontrollade

---

### 🆘 Escalation Paths

Om problemet kvarstår efter ovanstående:

1. **Dokumentera felet:**
   ```
   - Browser och version
   - Operativsystem
   - Specifikt felmeddelande
   - Console logs
   - Network request details
   ```

2. **Fallback-lösningar:**
   - Använd textinmatning istället
   - Prova andra enheter/browsers
   - Testa på annan nätverksanslutning

3. **Rapportera bug med:**
   - Reproducerbara steg
   - Skärmdumpar av errors
   - Browser DevTools export
   - Edge Function logs från Supabase

---

### 🔍 Advanced Debugging Script

För utvecklare som behöver djup debugging:

```typescript
// Lägg till i browser console för omfattande debugging
function debugVoiceSystem() {
  console.log('=== VOICE SYSTEM DEBUG ===');
  
  // Browser capabilities
  console.log('MediaRecorder supported:', 'MediaRecorder' in window);
  console.log('WebM support:', MediaRecorder.isTypeSupported?.('audio/webm'));
  console.log('MP4 support:', MediaRecorder.isTypeSupported?.('audio/mp4'));
  
  // Microphone access
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      console.log('✅ Microphone access granted');
      console.log('Audio tracks:', stream.getAudioTracks().length);
      stream.getTracks().forEach(track => track.stop());
    })
    .catch(err => {
      console.log('❌ Microphone access denied:', err.message);
    });
  
  // Supabase connection
  fetch('https://giznqbjxcxllmgamxgaa.supabase.co/functions/v1/voice-to-text', {
    method: 'OPTIONS'
  })
  .then(response => {
    console.log('✅ Edge Function accessible:', response.status);
  })
  .catch(err => {
    console.log('❌ Edge Function error:', err.message);
  });
  
  console.log('=========================');
}

// Kör debugging
debugVoiceSystem();
```