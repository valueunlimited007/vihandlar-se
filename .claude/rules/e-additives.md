---
paths:
  - app/e-amnen/**
  - app/api/scan/**
  - lib/data/e-additives.ts
  - data/e-additives.json
---

# E-ämnen & Scanner Regler

## Datastruktur
E-ämnen ligger i `data/e-additives.json` med följande fält:
- `e_number`: "E100", "E621" etc
- `name`: Svenskt namn
- `slug`: URL-vänlig (e100-kurkumin)
- `risk_score`: 1-10 (7+ = hög risk)
- `category`: Färgämne, Konserveringsmedel, etc
- `health_effects`: { documented, suspected, benefits, risk_groups }
- `common_products`: [{ category, products, average_amount }]
- `children_note`: Varning för barn

## Risk-nivåer
```typescript
1-3: Låg risk (grön)
4-6: Medel risk (gul)  
7-10: Hög risk (röd)
```

## Scanner API
`/api/scan/route.ts` - Edge Function:
1. Ta emot base64-bild
2. Skicka till Google Cloud Vision OCR
3. Extrahera E-nummer med regex: `/E\s*\d{3,4}[a-z]*/gi`
4. Slå upp mot `data/e-additives.json`
5. Returnera riskbedömning

## E-nummer regex
```typescript
const patterns = [
  /E\d{3,4}[a-z]?/gi,   // E100, E471a
  /E-\d{3,4}[a-z]?/gi,  // E-100
  /E\s\d{3,4}[a-z]?/gi, // E 100
];
```

## Sidor (alla Server Components utom scanner)
- `/e-amnen` - Hub med sök och kategorier
- `/e-amnen/[slug]` - Detaljsida (generateStaticParams)
- `/e-amnen/scanner` - 'use client' (kamera, upload)
- `/e-amnen/kategori/[category]` - Kategorilista
- `/e-amnen/nummer/[letter]` - Per första siffra (1=E100-199)

## Schema.org
Använd Article + FAQPage för detaljsidor.
