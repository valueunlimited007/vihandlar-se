-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can view own lists" ON public.lists;
DROP POLICY IF EXISTS "Users can view shared lists with valid token" ON public.lists;
DROP POLICY IF EXISTS "View own lists or shared lists" ON public.lists;
DROP POLICY IF EXISTS "Shared list item access" ON public.items;
DROP POLICY IF EXISTS "Users can access items in shared lists with valid token" ON public.items;

-- Create secure policies for lists table
CREATE POLICY "Users can view own lists" ON public.lists
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can view shared lists with valid token" ON public.lists
FOR SELECT 
USING (
  share_token IS NOT NULL 
  AND validate_share_token_access(id, share_token)
);

-- Create secure policies for items table
CREATE POLICY "Users can access items in shared lists with valid token" ON public.items
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM lists 
    WHERE lists.id = items.list_id 
    AND lists.share_token IS NOT NULL
    AND validate_share_token_access(lists.id, lists.share_token)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM lists 
    WHERE lists.id = items.list_id 
    AND lists.share_token IS NOT NULL
    AND validate_share_token_access(lists.id, lists.share_token)
  )
);

-- Add input validation function for item names
CREATE OR REPLACE FUNCTION public.validate_item_name(item_name text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- Check length
  IF length(trim(item_name)) < 1 OR length(trim(item_name)) > 100 THEN
    RETURN false;
  END IF;
  
  -- Check for malicious patterns
  IF item_name ~* '<script|javascript:|data:|vbscript:|on\w+=' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;