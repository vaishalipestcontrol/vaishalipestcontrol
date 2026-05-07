-- Add phone column to contacts table safely
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '';
