# Reference Files

Denna mapp innehåller filer från den ursprungliga **Loveable-implementationen**.

⚠️ **OBSERVERA:** Dessa filer ska INTE användas direkt. De är endast för referens vid migrering.

## Struktur

```
reference/
├── hooks/                        # React hooks att migrera
│   ├── useShoppingList.tsx       # Inköpslista med localStorage
│   ├── useImageAnalysis.tsx      # OCR och E-nummeranalys
│   ├── useScanningHistory.tsx    # Historik för skanningar
│   └── useVoiceInput.tsx         # Röstinmatning
├── offlineEAdditives.ts          # Offline E-ämnesdata
├── voice-*.md                    # Voice implementation docs
└── affiliate-project-guide.md    # Adtraction affiliate guide
```

## Hook-migrering

### useShoppingList.tsx
- ✅ Behåll logiken - fungerar med localStorage
- ⚠️ Ta bort Supabase-imports
- ⚠️ Lägg till 'use client' direktiv

### useImageAnalysis.tsx
- ⚠️ Ändra API-anrop till `/api/scan` Route Handler
- ⚠️ Använd Edge Runtime för Google Vision

### useScanningHistory.tsx
- ✅ Fungerar som är med localStorage
- ⚠️ Lägg till 'use client' direktiv

### useVoiceInput.tsx
- ⚠️ Ändra API-anrop till `/api/voice` Route Handler
- Se `voice-edge-function.md` för implementation

## offlineEAdditives.ts

Data har migrerats till `/data/e-additives.json`.
Funktionerna finns i `/lib/data/e-additives.ts`.

## Voice Implementation

Se voice-dokumenten för komplett implementation:
- `voice-overview.md` - Översikt
- `voice-edge-function.md` - Whisper API integration
- `voice-hooks.md` - React hooks
- `voice-technical.md` - Teknisk arkitektur
- `voice-development.md` - Utvecklingsguide
- `voice-troubleshooting.md` - Felsökning

## Affiliate Guide

`affiliate-project-guide.md` innehåller:
- Adtraction URL-format
- SEO-checklista
- GEO (AI-optimering)
- Pre-launch checklista

Använd detta som referens för `/api/redirect/[store]` implementation.
