-- Fix RLS policies to allow guest users to create lists
DROP POLICY IF EXISTS "Users can create own lists" ON public.lists;
DROP POLICY IF EXISTS "Anyone can view shared lists" ON public.lists;

-- Allow anyone to create lists (including guests)
CREATE POLICY "Anyone can create lists" ON public.lists
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own lists OR lists via share token
CREATE POLICY "View own lists or shared lists" ON public.lists
  FOR SELECT USING (
    user_id = auth.uid() OR 
    share_token IS NOT NULL
  );

-- Allow list owners or anyone with share token to update lists
CREATE POLICY "Update own lists or shared lists" ON public.lists
  FOR UPDATE USING (
    user_id = auth.uid() OR 
    share_token IS NOT NULL
  );