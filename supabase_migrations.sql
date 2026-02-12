-- Add new columns to projects table
ALTER TABLE public.projects 
ADD COLUMN company_name text,
ADD COLUMN price text;

-- Update comment/documentation if needed
COMMENT ON COLUMN public.projects.tech_stack IS 'Used for Frameworks field';
