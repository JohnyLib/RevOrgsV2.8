import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

/*
 * TODO: Supabase Backend Integration
 * 
 * This client is ready to use once you set the real values in .env.local.
 * 
 * Suggested tables to create in your Supabase project:
 *
 * 1. `projects` — portfolio projects
 *    - id (uuid, PK)
 *    - filename (text)
 *    - name (text)
 *    - description (text)
 *    - language (text)
 *    - framework (text)
 *    - status (text)
 *    - performance (int)
 *    - size (text)
 *    - url (text)
 *    - image_url (text)
 *    - created_at (timestamptz)
 *
 * 2. `contacts` — contact form submissions
 *    - id (uuid, PK)
 *    - email (text)
 *    - message (text)
 *    - created_at (timestamptz)
 *
 * 3. `manifesto_entries` — timeline / git-log history entries
 *    - id (uuid, PK)
 *    - commit_hash (text)
 *    - branch (text)
 *    - date (text)
 *    - title (text)
 *    - description (text)
 *    - tags (text[])
 *    - color (text)
 *    - sort_order (int)
 * */
