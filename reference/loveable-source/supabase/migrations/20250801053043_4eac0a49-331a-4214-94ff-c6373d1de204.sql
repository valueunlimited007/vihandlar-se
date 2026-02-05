-- Fix the search path security warning
CREATE OR REPLACE FUNCTION public.validate_item_name(item_name text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = 'public'
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