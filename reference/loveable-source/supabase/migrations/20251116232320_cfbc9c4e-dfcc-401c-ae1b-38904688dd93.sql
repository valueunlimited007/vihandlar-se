-- Create table for saved filter combinations
CREATE TABLE public.saved_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  filters JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster lookups by user
CREATE INDEX idx_saved_filters_user_id ON public.saved_filters(user_id);

-- Enable RLS
ALTER TABLE public.saved_filters ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own saved filters
CREATE POLICY "Users can view their own saved filters"
ON public.saved_filters
FOR SELECT
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Users can create their own saved filters
CREATE POLICY "Users can create their own saved filters"
ON public.saved_filters
FOR INSERT
WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Users can update their own saved filters
CREATE POLICY "Users can update their own saved filters"
ON public.saved_filters
FOR UPDATE
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Users can delete their own saved filters
CREATE POLICY "Users can delete their own saved filters"
ON public.saved_filters
FOR DELETE
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_saved_filters_updated_at
BEFORE UPDATE ON public.saved_filters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment to explain the table
COMMENT ON TABLE public.saved_filters IS 'Stores user-saved filter combinations for shopping (categories, stores, search terms)';
COMMENT ON COLUMN public.saved_filters.filters IS 'JSON object containing filter configuration: { categories: string[], storeSlug?: string, search?: string }';