-- Run this in your Supabase SQL Editor to add the features column to your packages

ALTER TABLE public.na_allah_packages ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb;
