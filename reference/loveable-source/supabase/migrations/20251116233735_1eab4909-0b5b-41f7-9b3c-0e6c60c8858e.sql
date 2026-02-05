-- Add unique constraint to slug column in product_categories
ALTER TABLE product_categories 
ADD CONSTRAINT product_categories_slug_unique UNIQUE (slug);

-- Add check constraint to ensure slug is not empty
ALTER TABLE product_categories
ADD CONSTRAINT product_categories_slug_not_empty CHECK (length(trim(slug)) > 0);

-- Add index for better query performance on slug lookups
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);