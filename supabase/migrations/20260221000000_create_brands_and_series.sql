/*
  # Create Brands and Series Hierarchy Tables

  1. New Tables
    - brands (id, name, display_title, subtitle, description, image_url, sort_order, timestamps)
    - series (id, brand_id, name, short_code, description, image_url, sort_order, timestamps)

  2. Table Modifications
    - Add brand_id and series_id to products table

  3. Security
    - Enable RLS on brands and series tables
    - Public read access, authenticated admin write access

  4. Data Migration
    - Insert BOGE brand with existing series
    - Link existing products to brand and series
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_title text NOT NULL,
  subtitle text,
  description text,
  image_url text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create series table
CREATE TABLE IF NOT EXISTS series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  short_code text,
  description text,
  image_url text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(brand_id, name)
);

-- Add brand_id and series_id to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'brand_id'
  ) THEN
    ALTER TABLE products ADD COLUMN brand_id uuid REFERENCES brands(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'series_id'
  ) THEN
    ALTER TABLE products ADD COLUMN series_id uuid REFERENCES series(id) ON DELETE SET NULL;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'series'
  ) THEN
    ALTER TABLE products ADD COLUMN series text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'model'
  ) THEN
    ALTER TABLE products ADD COLUMN model text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'technical_specs'
  ) THEN
    ALTER TABLE products ADD COLUMN technical_specs text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'in_stock'
  ) THEN
    ALTER TABLE products ADD COLUMN in_stock boolean DEFAULT true;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;

-- Brands policies
CREATE POLICY "Public can view brands"
  ON brands FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update brands"
  ON brands FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete brands"
  ON brands FOR DELETE
  TO authenticated
  USING (true);

-- Series policies
CREATE POLICY "Public can view series"
  ON series FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert series"
  ON series FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update series"
  ON series FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete series"
  ON series FOR DELETE
  TO authenticated
  USING (true);

-- Insert BOGE brand
INSERT INTO brands (name, display_title, subtitle, description, sort_order)
VALUES (
  'Boge',
  'BOGE Industrial Compressors',
  'Premium German Engineering',
  'BOGE has been a leading manufacturer of industrial air compressors and compressed air systems for over 100 years. Known for reliability, efficiency, and innovative technology.',
  1
)
ON CONFLICT (name) DO NOTHING;

-- Insert BOGE series
DO $$
DECLARE
  boge_brand_id uuid;
BEGIN
  SELECT id INTO boge_brand_id FROM brands WHERE name = 'Boge';

  IF boge_brand_id IS NOT NULL THEN
    INSERT INTO series (brand_id, name, short_code, description, sort_order)
    VALUES 
      (boge_brand_id, 'C-2 Series', 'C-2', 'Compact and efficient screw compressors', 1),
      (boge_brand_id, 'S-2 Series', 'S-2', 'Versatile screw compressors with proven reliability', 2),
      (boge_brand_id, 'S-3 Series', 'S-3', 'High-performance screw compressors', 3),
      (boge_brand_id, 'S-4 Series', 'S-4', 'Premium screw compressors with maximum efficiency', 4),
      (boge_brand_id, 'S eco Series', 'S eco', 'Energy-efficient compressors with heat recovery', 5),
      (boge_brand_id, 'SRHV Series', 'SRHV', 'High vacuum screw compressors', 6),
      (boge_brand_id, 'SRH Series', 'SRH', 'Reliable screw compressors for industrial use', 7),
      (boge_brand_id, 'K8-K15 Series', 'K', 'Compact piston compressors', 8),
      (boge_brand_id, 'DS Series', 'DS', 'Desiccant dryers for optimal air quality', 9)
    ON CONFLICT (brand_id, name) DO NOTHING;
  END IF;
END $$;

-- Update existing products to link to brand and series
DO $$
DECLARE
  boge_brand_id uuid;
  series_rec RECORD;
BEGIN
  SELECT id INTO boge_brand_id FROM brands WHERE name = 'Boge';

  IF boge_brand_id IS NOT NULL THEN
    UPDATE products
    SET brand_id = boge_brand_id
    WHERE LOWER(brand) = 'boge' AND brand_id IS NULL;

    FOR series_rec IN
      SELECT id, short_code, name FROM series WHERE brand_id = boge_brand_id
    LOOP
      UPDATE products
      SET series_id = series_rec.id
      WHERE brand_id = boge_brand_id
        AND series_id IS NULL
        AND series IS NOT NULL
        AND (
          LOWER(series) = LOWER(series_rec.short_code)
          OR LOWER(series) = LOWER(series_rec.name)
          OR LOWER(series) LIKE LOWER(series_rec.short_code) || '%'
        );
    END LOOP;
  END IF;
END $$;
