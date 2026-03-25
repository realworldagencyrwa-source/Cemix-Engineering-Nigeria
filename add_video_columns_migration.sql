/*
  # Add Video URL Columns to Brands, Series, and Products

  1. Column Additions
    - brands.video_url (text, nullable) - URL for brand promotional/intro video
    - product_series.video_url (text, nullable) - URL for series overview video
    - products.video_url (text, nullable) - URL for product demonstration video

  2. Purpose
    - Enable video content uploads through Supabase Storage
    - Store public URLs for brand, series, and product videos
    - Support enhanced product catalog with multimedia content

  3. Notes
    - All columns are nullable (videos are optional)
    - No default values (NULL indicates no video)
    - Backward compatible with existing data
*/

-- Add video_url to brands table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brands' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE brands ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to product_series table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_series' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE product_series ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE products ADD COLUMN video_url text;
  END IF;
END $$;
