-- Fix function search path security issue
ALTER FUNCTION public.validate_share_token_access(uuid, uuid) SET search_path = 'public';