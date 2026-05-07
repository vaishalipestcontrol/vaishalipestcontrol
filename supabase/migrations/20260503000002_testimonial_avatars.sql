-- Add avatar_url to testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS avatar_url TEXT;
