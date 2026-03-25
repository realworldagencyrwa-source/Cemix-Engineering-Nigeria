/*
  # Fix Brands, Product Series, and RLS Policies

  INSTRUCTIONS: Copy this entire SQL script and run it in your Supabase SQL Editor
  (https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new)

  This migration fixes:
  1. Renames 'series' table to 'product_series' for clarity
  2. Updates RLS policies to restrict write access to admin user only
  3. Backfills brand_id and series_id for existing products
  4. Ensures backward compatibility with legacy string columns

  ## Changes

  1. **Table Rename**
     - Renames `series` table to `product_series`

  2. **RLS Policy Updates**
     - Restricts INSERT/UPDATE/DELETE on brands to admin email: fadi.yazbeck111@gmail.com
     - Restricts INSERT/UPDATE/DELETE on product_series to admin email: fadi.yazbeck111@gmail.com
     - Allows public (anon) SELECT for both tables

  3. **Data Migration**
     - Backfills `brand_id` by matching `products.brand` to `brands.name` or `brands.display_title`
     - Backfills `series_id` by matching `products.series` to `product_series.name` or `short_code`
     - Keeps legacy columns (brand, series, category) intact for compatibility

  4. **Security**
     - Ensures only authenticated admin can modify brands and product_series
     - Public can view all data
*/

-- Step 1: Rename series table to product_series if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'series' AND table_schema = 'public'
  ) THEN
    -- Drop existing foreign key constraints
    ALTER TABLE IF EXISTS products DROP CONSTRAINT IF EXISTS products_series_id_fkey;

    -- Rename the table
    ALTER TABLE series RENAME TO product_series;

    -- Recreate the foreign key constraint with the new table name
    ALTER TABLE products
      ADD CONSTRAINT products_series_id_fkey
      FOREIGN KEY (series_id)
      REFERENCES product_series(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Step 2: Drop existing RLS policies and create new restrictive ones

-- Drop old brand policies
DROP POLICY IF EXISTS "Public can view brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can insert brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can update brands" ON brands;
DROP POLICY IF EXISTS "Authenticated users can delete brands" ON brands;

-- Drop old series/product_series policies (handle both table names for safety)
DROP POLICY IF EXISTS "Public can view series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can insert series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can update series" ON product_series;
DROP POLICY IF EXISTS "Authenticated users can delete series" ON product_series;

-- Create new restrictive brand policies
CREATE POLICY "Anyone can view brands"
  ON brands FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

CREATE POLICY "Admin can update brands"
  ON brands FOR UPDATE
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  )
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

CREATE POLICY "Admin can delete brands"
  ON brands FOR DELETE
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

-- Create new restrictive product_series policies
CREATE POLICY "Anyone can view product_series"
  ON product_series FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert product_series"
  ON product_series FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

CREATE POLICY "Admin can update product_series"
  ON product_series FOR UPDATE
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  )
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

CREATE POLICY "Admin can delete product_series"
  ON product_series FOR DELETE
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'fadi.yazbeck111@gmail.com'
  );

-- Step 3: Backfill brand_id for existing products
DO $$
DECLARE
  brand_rec RECORD;
BEGIN
  FOR brand_rec IN
    SELECT id, name, display_title FROM brands
  LOOP
    -- Match by name or display_title
    UPDATE products
    SET brand_id = brand_rec.id
    WHERE brand_id IS NULL
      AND (
        LOWER(brand) = LOWER(brand_rec.name)
        OR LOWER(brand) = LOWER(brand_rec.display_title)
      );
  END LOOP;
END $$;

-- Step 4: Backfill series_id for existing products
DO $$
DECLARE
  series_rec RECORD;
  brand_rec RECORD;
BEGIN
  FOR brand_rec IN
    SELECT id FROM brands
  LOOP
    FOR series_rec IN
      SELECT id, name, short_code FROM product_series WHERE brand_id = brand_rec.id
    LOOP
      -- Match by series column (legacy)
      UPDATE products
      SET series_id = series_rec.id
      WHERE brand_id = brand_rec.id
        AND series_id IS NULL
        AND series IS NOT NULL
        AND (
          LOWER(series) = LOWER(series_rec.name)
          OR LOWER(series) = LOWER(series_rec.short_code)
          OR LOWER(series) LIKE LOWER(series_rec.short_code) || '%'
        );
    END LOOP;
  END LOOP;
END $$;

-- Step 5: Update legacy string columns to match new IDs for consistency
DO $$
DECLARE
  product_rec RECORD;
  brand_name TEXT;
  series_name TEXT;
BEGIN
  FOR product_rec IN
    SELECT id, brand_id, series_id FROM products
    WHERE brand_id IS NOT NULL OR series_id IS NOT NULL
  LOOP
    -- Sync brand string to match brand_id
    IF product_rec.brand_id IS NOT NULL THEN
      SELECT display_title INTO brand_name
      FROM brands
      WHERE id = product_rec.brand_id;

      IF FOUND THEN
        UPDATE products
        SET brand = brand_name
        WHERE id = product_rec.id;
      END IF;
    END IF;

    -- Sync series string to match series_id
    IF product_rec.series_id IS NOT NULL THEN
      SELECT COALESCE(short_code, name) INTO series_name
      FROM product_series
      WHERE id = product_rec.series_id;

      IF FOUND THEN
        UPDATE products
        SET series = series_name
        WHERE id = product_rec.id;
      END IF;
    END IF;
  END LOOP;
END $$;

-- Verification queries (optional - uncomment to run)
-- SELECT 'Brands with products', COUNT(DISTINCT brand_id) FROM products WHERE brand_id IS NOT NULL;
-- SELECT 'Products with series', COUNT(*) FROM products WHERE series_id IS NOT NULL;
-- SELECT 'Products without series (General)', COUNT(*) FROM products WHERE series_id IS NULL;
