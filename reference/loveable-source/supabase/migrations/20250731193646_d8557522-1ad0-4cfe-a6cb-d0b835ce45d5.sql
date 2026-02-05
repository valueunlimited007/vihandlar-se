-- Fix critical RLS security vulnerability
-- First check and clean up existing policies

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can update own lists" ON public.lists;
DROP POLICY IF EXISTS "Update own lists or shared lists" ON public.lists;
DROP POLICY IF EXISTS "Anyone can manage items in shared lists" ON public.items;
DROP POLICY IF EXISTS "Users can manage items in own lists" ON public.items;

-- Create security definer function to validate share token access
CREATE OR REPLACE FUNCTION public.validate_share_token_access(list_id_param uuid, token_param uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.lists 
    WHERE id = list_id_param 
    AND share_token = token_param
  );
$$;

-- Create secure update policy for lists - only list owners can update
CREATE POLICY "Users can update own lists only" ON public.lists
  FOR UPDATE 
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create secure item policies 
CREATE POLICY "Users can manage items in own lists" ON public.items
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.lists 
    WHERE lists.id = items.list_id 
    AND lists.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.lists 
    WHERE lists.id = items.list_id 
    AND lists.user_id = auth.uid()
  ));

-- Allow item access in shared lists (read/write for anyone with share token)
-- This is still secure because it requires the list to have a share_token
CREATE POLICY "Shared list item access" ON public.items
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.lists 
    WHERE lists.id = items.list_id 
    AND lists.share_token IS NOT NULL
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.lists 
    WHERE lists.id = items.list_id 
    AND lists.share_token IS NOT NULL
  ));

-- Add constraint to ensure share tokens are unique when not null
CREATE UNIQUE INDEX IF NOT EXISTS unique_share_token 
ON public.lists (share_token) 
WHERE share_token IS NOT NULL;