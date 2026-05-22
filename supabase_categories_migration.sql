-- Drop existing policies to prevent the "already exists" error
DROP POLICY IF EXISTS "Enable read access for all users" ON public.na_allah_categories;
DROP POLICY IF EXISTS "Enable all access for authenticated admins" ON public.na_allah_categories;

-- Ensure table and RLS are set up
CREATE TABLE IF NOT EXISTS public.na_allah_categories ( id text PRIMARY KEY );
ALTER TABLE public.na_allah_categories ENABLE ROW LEVEL SECURITY;

-- Recreate policies with full permissions
CREATE POLICY "Enable read access for all users" ON public.na_allah_categories FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated admins" ON public.na_allah_categories FOR ALL USING (true) WITH CHECK (true);
