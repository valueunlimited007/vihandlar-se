-- Add category_path column to product_categories table
-- This will store the exact category string from products.category for precise matching
ALTER TABLE product_categories 
ADD COLUMN IF NOT EXISTS category_path TEXT;

-- Create index for faster lookups when matching products
CREATE INDEX IF NOT EXISTS idx_product_categories_category_path 
ON product_categories(category_path);

-- Add comment to explain the column's purpose
COMMENT ON COLUMN product_categories.category_path IS 'Stores the exact category string from products.category field for precise product matching (e.g., "bakning-mjol-och-gryn - mjol - Mjöl")';