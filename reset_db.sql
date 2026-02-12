-- DANGER: This script will delete all data in the custom tables.
-- Run this only if you want to reset the database schema completely.

DROP TABLE IF EXISTS public.project_technologies CASCADE;
DROP TABLE IF EXISTS public.project_categories CASCADE;
DROP TABLE IF EXISTS public.post_categories CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.technologies CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
