# Röstfunktion - Översikt

## Introduktion

Röstfunktionen i denna applikation möjliggör för användare att lägga till varor i sina inköpslistor genom tal istället för att skriva. Systemet använder Whisper för hög kvalitet på svensk taligenkänning.

## Arkitektur

<lov-mermaid>
graph TD
    A[Användare] --> B[AddItemForm Komponent]
    B --> C[useWhisperVoiceInput Hook]
    C --> D[MediaRecorder API]
    C --> E[Supabase Edge Function]
    E --> F[Whisper API]
    F --> G[Transkriberad Text]
    G --> H[Filtrering & Validering]
    H --> I[Lägg Till Vara]
    I --> J[Röst Feedback]
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style I fill:#e8f5e8
</lov-mermaid>

## Tekniska Komponenter

### Frontend
- **AddItemForm**: Huvudkomponent med mikrofonknapp
- **useWhisperVoiceInput**: Hook för Whisper-baserad röstinmatning
- **useVoiceInput**: Fallback hook för Web Speech API
- **useVoiceFeedback**: Text-till-tal för bekräftelser

### Backend
- **voice-to-text Edge Function**: Hanterar audio processing och Whisper API-anrop
- **Whisper Integration**: Avancerad taligenkänning optimerad för svenska

## Användarflöde

1. **Aktivering**: Användare klickar på mikrofonknappen
2. **Inspelning**: System spelar in audio i 4 sekunder
3. **Processing**: Audio skickas till Whisper för transkribering
4. **Filtrering**: Irrelevant text filtreras bort
5. **Tillägg**: Valid text läggs automatiskt till i listan
6. **Feedback**: Röstbekräftelse att varan lagts till

## Säkerhet & Validering

### Audio Säkerhet
- Maximal inspelningstid: 4 sekunder
- Minimal inspelningsstorlek: 8000 bytes
- Automatisk rensning av audio-data

### Text Validering
- Maxlängd: 100 tecken
- Filtrering av videorelaterat innehåll
- XSS-skydd genom validering

### Kostnadskontroll
- Kort inspelningstid begränsar API-kostnader
- Lokal validering innan API-anrop
- Effektiv audio-komprimering

## Browser-kompatibilitet

| Funktion | Chrome | Firefox | Safari | Edge |
|----------|--------|---------|--------|------|
| MediaRecorder | ✅ | ✅ | ✅ | ✅ |
| WebM Audio | ✅ | ✅ | ⚠️ | ✅ |
| MP4 Fallback | ✅ | ✅ | ✅ | ✅ |

## Performance Karakteristika

- **Genomsnittlig responstid**: 2-4 sekunder
- **Audio kvalitet**: 44.1kHz, mono
- **Komprimeringsformat**: WebM med Opus codec
- **Fallback format**: MP4 för Safari-kompatibilitet