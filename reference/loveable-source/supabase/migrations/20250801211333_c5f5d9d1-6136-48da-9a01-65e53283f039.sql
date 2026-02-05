-- Add checkout alert columns to lists table
ALTER TABLE public.lists 
ADD COLUMN checkout_alert_active boolean DEFAULT false,
ADD COLUMN checkout_alert_user_id uuid,
ADD COLUMN checkout_alert_activated_at timestamp with time zone;