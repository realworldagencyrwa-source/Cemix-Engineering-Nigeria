-- ============================================
-- Part 1: Add Missing Columns
-- ============================================

-- Add video_url to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE products ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to brands
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brands' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE brands ADD COLUMN video_url text;
  END IF;
END $$;

-- Add video_url to product_series
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_series' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE product_series ADD COLUMN video_url text;
  END IF;
END $$;

-- Ensure series_id can be NULL (brand-only products)
DO $$
BEGIN
  ALTER TABLE products ALTER COLUMN series_id DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;


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
-- Part 3: Fix Brands Table RLS
-- ============================================

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can insert brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can update brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can delete brands" ON brands;

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


-- ============================================
-- Part 4: Fix Product Series Table RLS
-- ============================================

ALTER TABLE product_series ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can insert series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can update series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can delete series" ON product_series;

CREATE POLICY "Public can view series"
  ON product_series FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert series"
  ON product_series FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update series"
  ON product_series FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete series"
  ON product_series FOR DELETE
  TO authenticated
  USING (true);
