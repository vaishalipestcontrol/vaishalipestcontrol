-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_color TEXT DEFAULT '#4edea3',
  is_published BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read published testimonials') THEN
        CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to testimonials') THEN
        CREATE POLICY "Admins have full access to testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- Seed data
INSERT INTO testimonials (author_name, author_role, content, rating, avatar_color)
VALUES 
('Elena Rodriguez', 'Residential Client', 'The precision they showed was remarkable. They didn''t just spray; they analyzed the environment like a lab. Truly professional.', 5, '#4edea3'),
('Jameson Blake', 'Art Gallery Owner', 'Finally, a pest control company that understands aesthetics and safety. No chemical smells, just results.', 5, '#bec6e0'),
('Dr. Sarah Chen', 'Property Manager', 'Their clinical approach to termite control saved our historic property without invasive drilling. Incredible service.', 5, '#7bd0ff')
ON CONFLICT DO NOTHING;
