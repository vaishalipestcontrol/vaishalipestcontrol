-- Update About page content in the pages table to match the warm, friendly, and accessible tone of the new brand identity
INSERT INTO public.pages (slug, title, content)
VALUES (
  'about', 
  'About Vaishali Pest Control',
  '{
    "hero_title": "About Vaishali Pest Control",
    "hero_description": "We have been helping families and businesses get rid of pests for over 15 years. Our work is simple — we come, we treat, pests are gone.",
    "mission_title": "What We Stand For",
    "mission_description": "We believe every home should be safe and clean. That is why we use safe chemicals, train our team well, and make sure the job is done right every time.",
    "vision_title": "Our Promise to You",
    "vision_description": "We will always be honest about what you need and what it will cost. We do not do unnecessary treatments just to charge more.",
    "stats": [
      { "value": "15+", "label": "Years in Service" },
      { "value": "5000+", "label": "Homes Protected" },
      { "value": "100%", "label": "Safe Chemicals" },
      { "value": "24hr", "label": "Response Time" }
    ]
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  updated_at = now();
