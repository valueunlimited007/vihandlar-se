---
paths:
  - data/**
  - lib/data/**
  - docs/DATABASE.md
---

# Database & Data Regler

## Arkitektur: JSON istället för Supabase
All statisk data exporteras från Supabase till JSON-filer.
Inga runtime-databaskopplingar för statiskt innehåll.

## Varför JSON?
1. **Snabbare builds** - ingen DB-roundtrip
2. **Billigare** - ingen Supabase-kostnad för reads
3. **Bättre SEO** - fullständig static generation
4. **Enklare deploy** - data ingår i repot

## Data-access pattern
```typescript
// lib/data/e-additives.ts
import data from '@/data/e-additives.json';

export function getAllEAdditives() {
  return data;
}

export function getEAdditiveBySlug(slug: string) {
  return data.find(e => e.slug === slug);
}
```

## Exportera från Supabase
Se `docs/DATABASE.md` för kompletta SQL-queries.

Quick export i SQL Editor:
```sql
SELECT json_agg(e ORDER BY e.e_number) 
FROM e_additives e 
WHERE is_published = true;
```

## Vad som behöver backend (Vercel)
| Funktion | Lösning |
|----------|---------|
| OCR Scanner | `/api/scan` → Google Vision |
| Röstinmatning | `/api/voice` → Whisper |
| Delade listor | Vercel KV (24h TTL) |
| Affiliate redirect | `/api/redirect/[store]` |

## Vad som är localStorage (client)
- Användarens inköpslistor
- Skanningshistorik
- Sparade filter/favoriter
