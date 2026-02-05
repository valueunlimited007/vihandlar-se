---
paths:
  - app/livsmedel/**
  - lib/data/foods.ts
  - data/foods.json
  - data/food-categories.json
---

# Livsmedel Regler

## Datastruktur
`data/foods.json`:
- `name`: Livsmedelsnamn
- `slug`: URL-vänlig
- `letter`: A-Ö (för alfabetisk navigering)
- `category_id`: FK till food_categories
- `calories`, `protein`, `fat`, `carbohydrates`: per 100g
- `storage_method`, `shelf_life_opened`, `shelf_life_unopened`
- `allergens`: string[]
- `faq`: [{ question, answer }]

## Svensk bokstavsordning
```typescript
const SWEDISH_ALPHABET = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  'Å','Ä','Ö'
];
```

## Sidor (alla Server Components)
- `/livsmedel` - Hub med A-Ö navigation
- `/livsmedel/[letter]` - Lista per bokstav
- `/livsmedel/[letter]/[slug]` - Detaljsida
- `/livsmedel/kategori/[slug]` - Per kategori

## generateStaticParams
```typescript
export async function generateStaticParams() {
  const foods = getAllFoods();
  return foods.map((food) => ({
    letter: food.letter.toLowerCase(),
    slug: food.slug,
  }));
}
```

## Schema.org
Använd Article + NutritionInformation för detaljsidor.
