-- Run this in your Supabase SQL Editor to add the missing columns
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS filename text,
ADD COLUMN IF NOT EXISTS performance numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS size text;
