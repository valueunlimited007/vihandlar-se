-- Fix RLS policies to allow anonymous users to create and access lists

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Anyone can create lists" ON public.lists;
DROP POLICY IF EXISTS "Users can view own lists" ON public.lists;
DROP POLICY IF EXISTS "Users can view shared lists with valid token" ON public.lists;
DROP POLICY IF EXISTS "Users can update own lists only" ON public.lists;
DROP POLICY IF EXISTS "Users can delete own lists" ON public.lists;

-- Create new policies that handle both authenticated and anonymous users
CREATE POLICY "Anyone can create lists" 
ON public.lists 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view lists they own or shared lists" 
ON public.lists 
FOR SELECT 
USING (
  -- Allow if user owns the list (when authenticated)
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  -- Allow if accessing via share_token (for anonymous users)
  (share_token IS NOT NULL)
);

CREATE POLICY "Users can update lists they own" 
ON public.lists 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can delete lists they own" 
ON public.lists 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());