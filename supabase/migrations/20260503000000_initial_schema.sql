-- Create 'services' table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create 'contacts' table
CREATE TABLE public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    concern TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policies for 'services'
-- Anyone can read published services
CREATE POLICY "Public can view published services" 
    ON public.services FOR SELECT 
    USING (is_published = true);

-- Authenticated users (Admin) can read all services
CREATE POLICY "Admins can view all services" 
    ON public.services FOR SELECT 
    TO authenticated 
    USING (true);

-- Authenticated users (Admin) can insert, update, delete services
CREATE POLICY "Admins can insert services" 
    ON public.services FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Admins can update services" 
    ON public.services FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Admins can delete services" 
    ON public.services FOR DELETE 
    TO authenticated 
    USING (true);

-- Policies for 'contacts'
-- Anyone can insert a contact submission
CREATE POLICY "Public can insert contacts" 
    ON public.contacts FOR INSERT 
    WITH CHECK (true);

-- Only authenticated users (Admin) can view, update, delete contacts
CREATE POLICY "Admins can view contacts" 
    ON public.contacts FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Admins can update contacts" 
    ON public.contacts FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Admins can delete contacts" 
    ON public.contacts FOR DELETE 
    TO authenticated 
    USING (true);

-- Storage Setup
-- Insert 'service-images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Anyone can read images
CREATE POLICY "Public can view images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'service-images');

-- Only authenticated users (Admin) can upload/modify images
CREATE POLICY "Admins can upload images" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'service-images');

CREATE POLICY "Admins can update images" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id = 'service-images');

CREATE POLICY "Admins can delete images" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'service-images');
