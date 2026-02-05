-- Add checkout alert fields to lists table
ALTER TABLE public.lists 
ADD COLUMN checkout_alert_active boolean DEFAULT false,
ADD COLUMN checkout_alert_user_id uuid,
ADD COLUMN checkout_alert_activated_at timestamp with time zone;

-- Add indexes for better performance
CREATE INDEX idx_lists_checkout_alert_active ON public.lists(checkout_alert_active);
CREATE INDEX idx_lists_checkout_alert_activated_at ON public.lists(checkout_alert_activated_at);

-- Enable realtime for lists table
ALTER PUBLICATION supabase_realtime ADD TABLE public.lists;