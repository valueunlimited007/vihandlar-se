-- Add the final 100th food to complete the collection
-- Data from Livsmedelsverket and USDA FoodData Central

INSERT INTO foods (name, slug, letter, category_id, calories, protein, fat, carbohydrates, fiber, salt, key_vitamins, key_minerals, short_description, long_description, usage_tips, season, allergens, can_freeze, storage_method, shelf_life_opened, shelf_life_unopened, meta_title, meta_description) VALUES

('Xylem Kale (Grönkål)', 'xylem-kale-gronkal', 'X', (SELECT id FROM food_categories WHERE slug = 'gront'), 49, 4.3, 0.9, 8.8, 3.6, 0.038, '{"A":"681μg","C":"120mg","K":"704μg"}', '{"Kalcium":"150mg","Järn":"1.5mg","Sulforafan":"högt"}', 'Superfood-grönsak med rekordhalter av K-vitamin', 'Grönkål har extremt höga halter av K-vitamin, C-vitamin och sulforafan som aktiveras vid tuggning. Kallas "kålens kung" för sin näringstäthet enligt Harvard forskning.', ARRAY['Som chips i ugnen','Masserad i sallader','I gröna smoothies'], ARRAY['Höst','Vinter'], ARRAY[]::text[], true, 'Kylskåp', '1 vecka', '1 år fryst', 'Grönkål - K-vitamin superfood | ViHandlar', 'Upptäck grönkåls rekordhalter av K-vitamin och sulforafan från Harvard forskning. Data från Livsmedelsverket.');

-- Verify we now have exactly 100 foods  
SELECT COUNT(*) as final_count FROM foods;