-- Create food categories table
CREATE TABLE public.food_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create foods table
CREATE TABLE public.foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  letter TEXT NOT NULL,
  alternative_names TEXT[],
  category_id UUID REFERENCES public.food_categories(id),
  subcategory TEXT,
  
  -- Storage and shelf life
  storage_method TEXT,
  shelf_life_opened TEXT,
  shelf_life_unopened TEXT,
  can_freeze BOOLEAN DEFAULT false,
  freezing_tips TEXT,
  season TEXT[],
  allergens TEXT[],
  
  -- Nutrition per 100g
  calories INTEGER,
  protein DECIMAL(5,2),
  fat DECIMAL(5,2),
  carbohydrates DECIMAL(5,2),
  fiber DECIMAL(5,2),
  salt DECIMAL(5,2),
  key_vitamins JSONB,
  key_minerals JSONB,
  
  -- Content
  short_description TEXT,
  long_description TEXT,
  usage_tips TEXT[],
  substitutes JSONB, -- [{name: string, reason: string}]
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  faq JSONB, -- [{question: string, answer: string}]
  
  -- Connection to main service
  common_in_lists TEXT[],
  related_foods UUID[],
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (SEO content)
CREATE POLICY "Food categories are publicly readable" 
ON public.food_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Foods are publicly readable" 
ON public.foods 
FOR SELECT 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_foods_letter ON public.foods(letter);
CREATE INDEX idx_foods_slug ON public.foods(slug);
CREATE INDEX idx_foods_category ON public.foods(category_id);
CREATE INDEX idx_food_categories_slug ON public.food_categories(slug);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_food_categories_updated_at
BEFORE UPDATE ON public.food_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_foods_updated_at
BEFORE UPDATE ON public.foods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial food categories
INSERT INTO public.food_categories (name, slug, description) VALUES
('Mejeri', 'mejeri', 'Mjölkprodukter som mjölk, ost, yoghurt och smör'),
('Kött', 'kott', 'Kött från olika djur inklusive nöt, fläsk, kyckling och lamm'),
('Fisk & Skaldjur', 'fisk-skaldjur', 'Fisk, skaldjur och andra havsfrukter'),
('Grönsaker', 'gronsaker', 'Färska grönsaker, rötter och bladgrönsaker'),
('Frukt & Bär', 'frukt-bar', 'Färsk frukt, bär och torkad frukt'),
('Spannmål & Baljväxter', 'spannmal-baljvaxter', 'Gryn, pasta, ris, linser och bönor'),
('Kryddor & Örter', 'kryddor-orter', 'Kryddor, örter och smaksättare'),
('Bakning & Torrvaror', 'bakning-torrvaror', 'Mjöl, socker, bakpulver och andra bakningsingredienser'),
('Oljor & Vinäger', 'oljor-vinager', 'Matoljor, vinäger och andra dressingar'),
('Nötter & Frön', 'notter-fron', 'Nötter, frön och kärnor');

-- Insert sample foods (starting with most popular ones)
INSERT INTO public.foods (name, slug, letter, category_id, short_description, meta_title, meta_description) VALUES
('Mjölk', 'mjolk', 'M', (SELECT id FROM public.food_categories WHERE slug = 'mejeri'), 'Näringsrik mjölkprodukt som är rik på kalcium och protein.', 'Mjölk - Näringsvärde och Hållbarhet | Livsmedel A-Ö', 'Allt om mjölk: näringsvärde, hållbarhet, förvaring och användning. Komplett guide med tips för köp och lagring.'),
('Ägg', 'agg', 'Ä', (SELECT id FROM public.food_categories WHERE slug = 'mejeri'), 'Näringsrikt livsmedel med högkvalitativt protein och viktiga vitaminer.', 'Ägg - Näringsvärde och Tillagning | Livsmedel A-Ö', 'Komplett guide om ägg: näringsvärde, tillagning, förvaring och hållbarhet. Tips för bästa kvalitet och användning.'),
('Bröd', 'brod', 'B', (SELECT id FROM public.food_categories WHERE slug = 'spannmal-baljvaxter'), 'Baslivsmedel gjort av mjöl som ger energi och fiber.', 'Bröd - Näringsvärde och Förvaring | Livsmedel A-Ö', 'Allt om bröd: näringsvärde, olika typer, förvaring och hållbarhet. Guide för att välja rätt bröd.'),
('Smör', 'smor', 'S', (SELECT id FROM public.food_categories WHERE slug = 'mejeri'), 'Mjölkfett som används för matlagning och som pålägg.', 'Smör - Näringsvärde och Användning | Livsmedel A-Ö', 'Komplett guide om smör: näringsvärde, matlagning, förvaring och olika typer av smör.'),
('Kyckling', 'kyckling', 'K', (SELECT id FROM public.food_categories WHERE slug = 'kott'), 'Magert kött rikt på protein och B-vitaminer.', 'Kyckling - Näringsvärde och Tillagning | Livsmedel A-Ö', 'Allt om kyckling: näringsvärde, tillagning, säkerhet och olika delar. Tips för bästa smak och kvalitet.');