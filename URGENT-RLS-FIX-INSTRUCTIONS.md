# URGENT: RLS Fix Instructions

## Problem
File uploads fail with "new row violates row-level security policy" because:
1. Storage bucket RLS policies are missing
2. Products table RLS policies may be incomplete

## Quick Fix - Apply This SQL

**Go to your Supabase Dashboard → SQL Editor and run this SQL:**

```sql
-- ============================================
-- Part 1: Add Missing Columns
-- ============================================

-- Add video_url to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url text;

-- Add video_url to brands
ALTER TABLE brands ADD COLUMN IF NOT EXISTS video_url text;

-- Add video_url to series
ALTER TABLE series ADD COLUMN IF NOT EXISTS video_url text;

-- Ensure series_id can be NULL (brand-only products)
ALTER TABLE products ALTER COLUMN series_id DROP NOT NULL;


-- ============================================
-- Part 2: Fix Products Table RLS
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

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


-- ============================================
-- Part 3: Fix Storage RLS (CRITICAL FOR UPLOADS)
-- ============================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Public can read media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media files" ON storage.objects;

-- Create new policies
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


-- ============================================
-- Part 4: Ensure Media Bucket Exists and is Public
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;
```

## After Running SQL

1. ✅ File uploads should work (no more RLS errors)
2. ✅ Products can be updated
3. ✅ Video uploads will work for brands/series/products
4. ✅ Series is now optional for products

## How to Apply

1. Go to https://supabase.com/dashboard/project/cflpphrddekccakfkkjz
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the ENTIRE SQL above
5. Click "Run" or press Ctrl+Enter
6. Check for any errors in the output
7. Refresh your admin panel and try uploading again

## Testing After Fix

- [ ] Upload brand image via file picker → should succeed
- [ ] Upload series video via file picker → should succeed
- [ ] Upload product image via file picker → should succeed
- [ ] Edit product name/price → should succeed
- [ ] Create product without series → should succeed
