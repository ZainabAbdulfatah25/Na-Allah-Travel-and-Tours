-- Run this in your Supabase SQL Editor to create the Interests table

CREATE TABLE IF NOT EXISTS public.na_allah_interests (
    id bigint PRIMARY KEY,
    name text NOT NULL
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE public.na_allah_interests ENABLE ROW LEVEL SECURITY;

-- Create basic access policies
CREATE POLICY "Enable read access for all users" ON public.na_allah_interests
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated admins" ON public.na_allah_interests
    FOR ALL USING (true) WITH CHECK (true);
