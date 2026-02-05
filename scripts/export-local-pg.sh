#!/bin/bash
# Export data from local PostgreSQL to JSON files in data/
# This is a one-time script used during migration setup.

set -euo pipefail

DB="vihandlar_export"
DATA_DIR="$(cd "$(dirname "$0")/.." && pwd)/data"

echo "=== PostgreSQL → JSON Export ==="
echo "Database: $DB"
echo "Output:   $DATA_DIR"
echo ""

# 1. E-additives (published only, ordered by e_number)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT json_agg(row_to_json(e) ORDER BY e.e_number)
  FROM (
    SELECT * FROM e_additives
    WHERE is_published = true
    ORDER BY e_number
  ) e;
" | python3 -m json.tool > "$DATA_DIR/e-additives.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/e-additives.json'))))")
echo "  ✓ E-additives: $COUNT rows → e-additives.json"

# 2. Foods (ordered by name)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT json_agg(row_to_json(f) ORDER BY f.name)
  FROM (SELECT * FROM foods ORDER BY name) f;
" | python3 -m json.tool > "$DATA_DIR/foods.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/foods.json'))))")
echo "  ✓ Foods: $COUNT rows → foods.json"

# 3. Food categories (ordered by name)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT json_agg(row_to_json(fc) ORDER BY fc.name)
  FROM (SELECT * FROM food_categories ORDER BY name) fc;
" | python3 -m json.tool > "$DATA_DIR/food-categories.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/food-categories.json'))))")
echo "  ✓ Food categories: $COUNT rows → food-categories.json"

# 4. Stores (active only)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT json_agg(row_to_json(s) ORDER BY s.name)
  FROM (SELECT * FROM stores WHERE is_active = true ORDER BY name) s;
" | python3 -m json.tool > "$DATA_DIR/stores.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/stores.json'))))")
echo "  ✓ Stores: $COUNT rows → stores.json"

# 5. Product categories (ordered by name)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT COALESCE(json_agg(row_to_json(pc) ORDER BY pc.name), '[]'::json)
  FROM (SELECT * FROM product_categories ORDER BY name) pc;
" | python3 -m json.tool > "$DATA_DIR/product-categories.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/product-categories.json'))))")
echo "  ✓ Product categories: $COUNT rows → product-categories.json"

# 6. Products (ordered by name)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT COALESCE(json_agg(row_to_json(p) ORDER BY p.name), '[]'::json)
  FROM (SELECT * FROM products ORDER BY name) p;
" | python3 -m json.tool > "$DATA_DIR/products.json"
COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/products.json'))))")
echo "  ✓ Products: $COUNT rows → products.json"

# 7. Public lists with items (merged)
sudo -u postgres psql -d "$DB" -t -A -c "
  SELECT json_agg(
    json_build_object(
      'id', pl.id,
      'slug', pl.slug,
      'title', pl.title,
      'description', pl.description,
      'lang', pl.lang,
      'is_public', pl.is_public,
      'created_at', pl.created_at,
      'updated_at', pl.updated_at,
      'items', COALESCE(
        (SELECT json_agg(
          json_build_object(
            'id', pi.id,
            'list_id', pi.list_id,
            'name', pi.name,
            'quantity', pi.quantity,
            'category', pi.category,
            'position', pi.position,
            'checked', pi.checked,
            'updated_at', pi.updated_at
          ) ORDER BY pi.position
        )
        FROM public_items pi WHERE pi.list_id = pl.id),
        '[]'::json
      )
    ) ORDER BY pl.title
  )
  FROM public_lists pl
  WHERE pl.is_public = true;
" | python3 -m json.tool > "$DATA_DIR/public-lists.json"
COUNT=$(python3 -c "import json; d=json.load(open('$DATA_DIR/public-lists.json')); items=sum(len(l.get('items',[])) for l in d); print(f'{len(d)} lists, {items} items')")
echo "  ✓ Public lists: $COUNT → public-lists.json"

echo ""
echo "=== Summary ==="
for f in "$DATA_DIR"/*.json; do
  name=$(basename "$f")
  size=$(du -h "$f" | cut -f1)
  echo "  $name: $size"
done
echo ""
echo "Done!"
