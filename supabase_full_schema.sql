-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Portfolio System
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.technologies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  icon text, -- URL or icon name
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  full_description text,
  cover_image text,
  gallery jsonb DEFAULT '[]'::jsonb, -- Array of objects: { url, alt, order }
  client_name text,
  project_url text,
  year int,
  results text,
  metrics jsonb DEFAULT '{}'::jsonb, -- Key-value pairs
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.project_technologies (
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  technology_id uuid REFERENCES public.technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

CREATE TABLE public.project_categories (
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

-- 2. Blog System
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text, -- Markdown or Rich Text
  cover_image text,
  reading_time int, -- Function to calculate automatically? Or manual
  author_name text,
  seo_title text,
  seo_description text,
  seo_keywords text[],
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.post_categories (
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE, -- Sharing categories with portfolio? Or separate 'blog_categories'? 
  -- Assuming shared for now, or use a type field in categories if needed used for separate
  PRIMARY KEY (post_id, category_id)
);

-- 3. Services System
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  full_description text,
  price_from text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 4. Lead Generation System
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  service_slug text,
  source text, -- 'blog', 'portfolio', 'homepage'
  status text DEFAULT 'new', -- 'new', 'contacted', 'closed'
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Technologies" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Public Read Posts" ON public.posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- Authenticated Write Access (Admins)
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Technologies" ON public.technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated'); -- Admins can read leads
CREATE POLICY "Admin Update Leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Public Insert Access (Leads)
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Storage Buckets (Requires storage extension enabled, usually default)
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true) ON CONFLICT DO NOTHING;
insert into storage.buckets (id, name, public) values ('blog', 'blog', true) ON CONFLICT DO NOTHING;
insert into storage.buckets (id, name, public) values ('services', 'services', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public Access Portfolio Images" ON storage.objects FOR SELECT USING ( bucket_id = 'portfolio' );
CREATE POLICY "Public Access Blog Images" ON storage.objects FOR SELECT USING ( bucket_id = 'blog' );
CREATE POLICY "Public Access Service Images" ON storage.objects FOR SELECT USING ( bucket_id = 'services' );
CREATE POLICY "Authenticated Upload Portfolio" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'portfolio' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Upload Blog" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'blog' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Upload Services" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'services' AND auth.role() = 'authenticated' );
