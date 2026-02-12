-- Create projects table
create table public.projects (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  description text null,
  image_url text null,
  tech_stack text[] null,
  repo_url text null,
  demo_url text null,
  constraint projects_pkey primary key (id)
);

-- Create contacts table
create table public.contacts (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new'::text,
  constraint contacts_pkey primary key (id)
);

-- Enable RLS
alter table public.projects enable row level security;
alter table public.contacts enable row level security;

-- Create policies for projects
create policy "Enable read access for all users" on public.projects
  for select using (true);

-- Create policies for contacts
create policy "Enable insert for all users" on public.contacts
  for insert with check (true);
