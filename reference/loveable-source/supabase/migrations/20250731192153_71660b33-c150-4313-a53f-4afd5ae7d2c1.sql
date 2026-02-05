-- Create shopping lists table
CREATE TABLE public.lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Min lista',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token UUID UNIQUE DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shopping list items table
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID REFERENCES public.lists(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  quantity TEXT DEFAULT '1',
  unit TEXT DEFAULT 'st',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lists
-- Users can view their own lists
CREATE POLICY "Users can view own lists" ON public.lists
  FOR SELECT USING (user_id = auth.uid());

-- Users can create their own lists
CREATE POLICY "Users can create own lists" ON public.lists
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own lists
CREATE POLICY "Users can update own lists" ON public.lists
  FOR UPDATE USING (user_id = auth.uid());

-- Users can delete their own lists
CREATE POLICY "Users can delete own lists" ON public.lists
  FOR DELETE USING (user_id = auth.uid());

-- Anyone can view lists via share token (for sharing without login)
CREATE POLICY "Anyone can view shared lists" ON public.lists
  FOR SELECT USING (share_token IS NOT NULL);

-- RLS Policies for items
-- Users can manage items in their own lists
CREATE POLICY "Users can manage items in own lists" ON public.items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.lists 
      WHERE lists.id = items.list_id 
      AND lists.user_id = auth.uid()
    )
  );

-- Anyone can manage items in shared lists (via share token)
CREATE POLICY "Anyone can manage items in shared lists" ON public.items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.lists 
      WHERE lists.id = items.list_id 
      AND lists.share_token IS NOT NULL
    )
  );

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.lists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.items;

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lists_updated_at
  BEFORE UPDATE ON public.lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();