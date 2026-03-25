require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const migrationSQL = `
-- Add video_url to products table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE products ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to brands table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brands' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE brands ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to series table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'series' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE series ADD COLUMN video_url text;
  END IF;
END $$;

-- Ensure series_id in products can be NULL
DO $$
BEGIN
  ALTER TABLE products ALTER COLUMN series_id DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Fix products table RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Recreate products policies
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Storage policies
DO $$
BEGIN
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;

DROP POLICY IF EXISTS "Public can read media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media files" ON storage.objects;

CREATE POLICY "Public can read media files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');

-- Create media bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('media', 'media', true)
  ON CONFLICT (id) DO UPDATE SET public = true;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;
`;

async function applyMigration() {
  console.log('Applying RLS and features migration...');

  // Save migration to file
  const timestamp = '20260221120000';
  const filename = `supabase/migrations/${timestamp}_fix_rls_and_add_features.sql`;

  const fullMigration = `/*
  # Fix RLS Policies and Add Missing Features

  1. Storage RLS Policies
    - Add policies for 'media' bucket to allow authenticated users to upload/manage files
    - Public read access for all files

  2. Products Table Enhancements
    - Add video_url column to products table
    - Ensure series_id can be NULL (brand-only products)
    - Add/fix RLS policies for products table

  3. Add Video Support to Brands and Series
    - Add video_url column to brands table
    - Add video_url column to series table

  4. Security
    - Products: Public read, authenticated admin write
    - Storage: Public read, authenticated write
*/

${migrationSQL}`;

  fs.writeFileSync(filename, fullMigration);
  console.log('✓ Migration file saved to:', filename);

  console.log('\nNOTE: This migration needs to be applied through Supabase Dashboard or CLI');
  console.log('The SQL has been saved to the migrations folder.');
  console.log('\nPlease apply it manually via Supabase Dashboard > SQL Editor');
}

applyMigration().catch(console.error);
