-- Create database indices for optimized E-additive queries
-- These indices will significantly improve query performance for common operations

-- Index for category-based queries (very common in filtering)
CREATE INDEX IF NOT EXISTS idx_e_additives_category_published 
ON e_additives(category, is_published) 
WHERE is_published = true;

-- Index for slug-based lookups (used in detail pages)
CREATE INDEX IF NOT EXISTS idx_e_additives_slug_published 
ON e_additives(slug) 
WHERE is_published = true;

-- Index for E-number searches and sorting
CREATE INDEX IF NOT EXISTS idx_e_additives_e_number_published 
ON e_additives(e_number, is_published) 
WHERE is_published = true;

-- Index for risk score filtering and sorting
CREATE INDEX IF NOT EXISTS idx_e_additives_risk_score_published 
ON e_additives(risk_score, is_published) 
WHERE is_published = true;

-- Index for origin-based filtering
CREATE INDEX IF NOT EXISTS idx_e_additives_origin_published 
ON e_additives(origin, is_published) 
WHERE is_published = true;

-- Composite index for common search combinations
CREATE INDEX IF NOT EXISTS idx_e_additives_search_composite 
ON e_additives(is_published, category, risk_score, e_number) 
WHERE is_published = true;

-- Index for ADI value queries
CREATE INDEX IF NOT EXISTS idx_e_additives_adi_published 
ON e_additives(adi_value, is_published) 
WHERE is_published = true AND adi_value IS NOT NULL;

-- Full-text search index for name and description
CREATE INDEX IF NOT EXISTS idx_e_additives_text_search 
ON e_additives USING GIN(to_tsvector('english', name || ' ' || COALESCE(common_name, '') || ' ' || COALESCE(short_description, ''))) 
WHERE is_published = true;

-- Performance improvement: Add statistics for better query planning
ANALYZE e_additives;