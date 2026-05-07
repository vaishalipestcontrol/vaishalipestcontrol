-- Insert dummy services for Vaishali Pest Control
INSERT INTO public.services (title, slug, short_description, description, icon, features, is_published)
VALUES 
(
  'Termite Control', 
  'termite-control', 
  'Advanced drill-fill-seal barrier treatment protecting your wooden furniture and structures for years.',
  'Termites can silently eat away your precious wooden structures and furniture. Our expert team uses state-of-the-art Drill-Fill-Seal technology to inject premium eco-friendly chemicals deep into key structural walls and floor gaps, creating an impenetrable chemical barrier that terminates the colony completely. Safe for kids and pets, and backed by our trusted multi-year warranty.',
  'bug_report',
  '["Drill-Fill-Seal advanced technology", "Impenetrable structural chemical barrier", "5-Year complete service warranty", "Safe, eco-friendly chemical products"]'::jsonb,
  true
),
(
  'Cockroach & General Pest Treatment', 
  'cockroach-pest-treatment', 
  'Odorless herbal gel baits and drain sprays ensuring 100% cockroach-free kitchens and washrooms.',
  'Cockroaches spread bacteria and contaminate food in your kitchen. We apply advanced, scentless herbal gel baits in corners, cabinets, and appliances without requiring you to empty your kitchen. This is coupled with target misting of washroom drains to eliminate nests completely, ensuring a safe, hygienic environment.',
  'pest_control',
  '["100% scentless herbal gel baits", "No kitchen emptying or prep required", "Washroom drain nesting disinfection", "Includes free 30-day follow-up"]'::jsonb,
  true
),
(
  'Bed Bug Eradication', 
  'bed-bug-eradication', 
  'Targeted advanced spray and misting treatments completely eliminating bed bugs from beds and couches.',
  'Bed bugs multiply fast and cause painful bites, ruining your sleep. Our highly trained operators execute a multi-layered spray and mist treatment focused on mattress seams, bed frames, curtains, and sofas. We use highly potent but completely indoor-safe chemicals that kill bugs and their eggs on contact, ensuring peaceful nights.',
  'bed',
  '["Two-stage deep spray treatment", "Kills adult bugs and eggs on contact", "Safe for direct mattress application", "Guaranteed relief from bed bugs"]'::jsonb,
  true
),
(
  'Rodent Control (Rats & Mice)', 
  'rodent-control', 
  'Safe, weather-proof bait stations and trapping systems to completely protect homes and factories.',
  'Rats and mice chew through wires, damage stock, and spread serious diseases. Our rodent control program includes a full perimeter inspection to spot entry routes, followed by strategically placing child-safe, lockable bait stations and mechanical traps. Perfect for residential complexes, food processing units, and storage warehouses.',
  'pest_control_rodent',
  '["Secure lockable bait stations", "Entry-point identification & sealing", "Eco-friendly non-toxic trap setups", "Safe for warehouses and stores"]'::jsonb,
  true
),
(
  'Mosquito & Fogging Treatment', 
  'mosquito-fogging-treatment', 
  'Eco-friendly outdoor cold fogging and larvicide treatments to keep your gardens and yards safe.',
  'Protect your family from Dengue, Malaria, and Chikungunya. We provide specialized flying insect treatments that include outdoor thermal fogging, yard cold misting, and standing-water larvicidal treatments to destroy mosquito breeding nests. Ideal for villas, gardens, schools, and corporate campuses.',
  'waves',
  '["Outdoor thermal fog misting", "Standing water breeding treatment", "Eco-safe larvicidal chemical use", "Ideal for schools & large gardens"]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  features = EXCLUDED.features,
  is_published = EXCLUDED.is_published;
