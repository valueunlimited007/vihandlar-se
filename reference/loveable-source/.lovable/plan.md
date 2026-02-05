
# Komplettera dokumentation med saknade element

## Sammanfattning
Lägga till saknade JSON-datafiler och justera CLAUDE.md-länkar för att matcha den ursprungliga specifikationen.

## Steg 1: Exportera Supabase-schema till JSON
Skapa `docs/migration/data/schema.json` med databasstrukturen.

**Innehåll:**
- Alla tabeller med kolumner, typer och nullable-info
- Exporteras via SQL-query eller Supabase CLI

## Steg 2: Exportera E-ämnen data
Skapa `docs/migration/data/e-additives.json` med alla 354 publicerade e-ämnen.

**Fält att inkludera:**
- id, e_number, name, slug, category
- risk_score, adi_value, adi_source
- short_description, long_description
- common_products, health_effects
- children_note, origin, natural_alternatives
- avoidance_tips, longevity_impact
- scientific_studies, livsmedelsverket_data
- meta_title, meta_description
- is_published, created_at, updated_at

## Steg 3: Exportera Livsmedel data
Skapa `docs/migration/data/foods.json` med alla 2500+ livsmedel.

**Fält att inkludera:**
- id, name, slug, letter, category_id
- subcategory, short_description, long_description
- calories, protein, fat, carbohydrates, fiber, salt
- key_vitamins, key_minerals
- storage_method, shelf_life_opened, shelf_life_unopened
- can_freeze, freezing_tips
- allergens, season, usage_tips
- substitutes, related_foods, common_in_lists
- faq, meta_title, meta_description
- alternative_names, created_at, updated_at

## Steg 4: Exportera Publika listor med items
Skapa `docs/migration/data/public-lists.json` med publika listor och deras items.

**Struktur:**
```json
[
  {
    "list": {
      "id": "...",
      "slug": "...",
      "title": "...",
      "description": "...",
      "is_public": true,
      "lang": "sv-SE"
    },
    "items": [
      {
        "id": "...",
        "name": "...",
        "quantity": "...",
        "category": "...",
        "position": 0,
        "checked": false
      }
    ]
  }
]
```

## Steg 5: Uppdatera CLAUDE.md med korrekta länkar
Ändra docs-länkar för att peka mot rätt filer i `docs/migration/`.

---

## Teknisk detalj: Data-export via Supabase

### E-ämnen (354 poster)
```sql
SELECT json_agg(row_to_json(e))
FROM e_additives e
WHERE is_published = true
ORDER BY e_number;
```

### Livsmedel (2500+ poster)
```sql
SELECT json_agg(row_to_json(f))
FROM foods f
ORDER BY name;
```

### Publika listor med items
```sql
SELECT json_agg(
  json_build_object(
    'list', pl,
    'items', (
      SELECT COALESCE(json_agg(pi ORDER BY pi.position), '[]')
      FROM public_items pi 
      WHERE pi.list_id = pl.id
    )
  )
)
FROM public_lists pl
WHERE pl.is_public = true;
```

### Schema-export
```sql
SELECT json_agg(
  json_build_object(
    'table', table_name,
    'columns', (
      SELECT json_agg(json_build_object(
        'name', column_name,
        'type', data_type,
        'nullable', is_nullable = 'YES'
      ))
      FROM information_schema.columns c
      WHERE c.table_name = t.table_name
        AND c.table_schema = 'public'
    )
  )
)
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';
```

---

## Filöversikt efter komplettering

```
docs/migration/data/
├── schema.json          # Supabase-schema (ny)
├── routes.json          # Alla routes (finns)
├── e-additives.json     # 354 e-ämnen (ny)
├── foods.json           # 2500+ livsmedel (ny)
├── food-categories.json # Kategorier (finns)
├── stores.json          # Butiker (finns)
├── public-lists.json    # Publika listor (ny)
└── EXPORT-GUIDE.md      # Export-guide (finns)
```

---

## OBS: Stora datafiler

E-ämnen och livsmedel-data är stora (flera MB). Alternativen är:
1. **Exportera direkt**: Skapa filerna med all data
2. **Skapa Edge Function**: `/api/export-data` för on-demand export
3. **Referens + CLI**: Dokumentera export-kommandon utan att inkludera data

Rekommendation: Skapa en Edge Function för export som kan köras vid behov, plus lägg in de första 5 posterna som exempel i dokumentationen.
