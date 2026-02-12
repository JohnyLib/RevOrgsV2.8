-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  description text NULL,
  status text NOT NULL DEFAULT 'active',
  language text NULL,
  framework text NULL,
  tech_stack text[] NULL,
  repo_url text NULL,
  demo_url text NULL,
  image_url text NULL,
  company_name text NULL, -- New field
  price text NULL, -- New field
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NULL, -- Made nullable as sometimes just email/message
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid conflicts on re-run)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.projects;

DROP POLICY IF EXISTS "Enable insert for all users" ON public.contacts;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON public.contacts;

-- Projects Policies
-- Anyone can view projects
CREATE POLICY "Enable read access for all users" ON public.projects
  FOR SELECT USING (true);

-- Only authenticated users (admin) can modify projects
CREATE POLICY "Enable insert for authenticated users only" ON public.projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Contacts Policies
-- Anyone can insert (contact form)
CREATE POLICY "Enable insert for all users" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view contacts (admin dashboard)
CREATE POLICY "Enable read access for authenticated users only" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');
