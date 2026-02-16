-- Create quote_requests table
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    quote_details JSONB NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed'))
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting for anyone (public)
CREATE POLICY "Allow public insert to quote_requests"
ON public.quote_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow reading only for authenticated admins (or service role)
-- For now, just disabling read for public
CREATE POLICY "Allow read access for authenticated users only"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (true);
