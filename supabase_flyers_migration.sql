-- Run this in your Supabase SQL Editor to create the Flyers table

CREATE TABLE IF NOT EXISTS public.na_allah_flyers (
    id bigint PRIMARY KEY,
    title text NOT NULL,
    image text NOT NULL,
    status text NOT NULL DEFAULT 'Active'
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE public.na_allah_flyers ENABLE ROW LEVEL SECURITY;

-- Create basic access policies
CREATE POLICY "Enable read access for all users" ON public.na_allah_flyers
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated admins" ON public.na_allah_flyers
    FOR ALL USING (true) WITH CHECK (true);
