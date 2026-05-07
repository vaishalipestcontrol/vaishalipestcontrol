-- Create pages table for CMS-managed page content
CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read pages') THEN
        CREATE POLICY "Public can read pages" ON pages FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage pages') THEN
        CREATE POLICY "Admins can manage pages" ON pages FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- Initial About Page Data
INSERT INTO pages (slug, title, content)
VALUES (
  'about', 
  'About Vaishali Pest Control',
  '{
    "hero_title": "Scientific Standards. Pristine Sanctuaries.",
    "hero_description": "We are more than a pest control service. We are hygiene scientists dedicated to the clinical preservation of your living environment.",
    "mission_title": "Our Clinical Mission",
    "mission_description": "To provide hospital-grade environmental safety through botanical science and rigorous protocol. We believe everyone deserves a sanctuary that is not just clean, but scientifically pure.",
    "vision_title": "Modern Vision",
    "vision_description": "Redefining the hygiene industry through transparency, safety-first chemical engineering, and rapid-response technology.",
    "stats": [
      {"label": "Years Experience", "value": "15+"},
      {"label": "Satisfied Clients", "value": "5k+"},
      {"label": "Certified Pros", "value": "24"}
    ]
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
