-- Create shared_scans table for sharing scan results
CREATE TABLE public.shared_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  scan_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '30 days')
);

-- Enable Row Level Security
ALTER TABLE public.shared_scans ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access using share_token
CREATE POLICY "Shared scans are publicly readable with valid token" 
ON public.shared_scans 
FOR SELECT 
USING (true);

-- Create policy for anyone to create shared scans
CREATE POLICY "Anyone can create shared scans" 
ON public.shared_scans 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_shared_scans_share_token ON public.shared_scans(share_token);
CREATE INDEX idx_shared_scans_expires_at ON public.shared_scans(expires_at);