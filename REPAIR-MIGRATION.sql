/*
  ============================================================
  ONE-TIME DATA REPAIR MIGRATION
  ============================================================

  PURPOSE: Fix Brand → Series → Products relationships

  PROBLEMS FIXED:
  1. products.brand contains "BOGE Industrial Compressors" instead of "Boge"
  2. products.series_id is NULL for all 225 products
  3. Missing "General" series for unclassified products
  4. K series has wrong short_code ("K" instead of "K8-K15")

  IDEMPOTENT: Safe to run multiple times
  DATA SAFE: Does NOT delete any products or images

  HOW TO RUN:
  1. Go to Supabase Dashboard → SQL Editor
  2. Copy and paste this entire file
  3. Click "Run"

  ============================================================
*/

-- Step 1: Fix products.brand field
UPDATE products
SET brand = 'Boge'
WHERE brand = 'BOGE Industrial Compressors';

-- Step 2: Create General series if it doesn't exist
INSERT INTO product_series (brand_id, name, short_code, description, sort_order)
SELECT
  '7f8935b6-793b-4ca6-a535-368a33de43a6',
  'General',
  'General',
  'General products and accessories',
  999
WHERE NOT EXISTS (
  SELECT 1 FROM product_series
  WHERE brand_id = '7f8935b6-793b-4ca6-a535-368a33de43a6'
    AND short_code = 'General'
);

-- Step 3: Fix K8-K15 series short_code
UPDATE product_series
SET short_code = 'K8-K15'
WHERE brand_id = '7f8935b6-793b-4ca6-a535-368a33de43a6'
  AND name ILIKE '%K8%K15%'
  AND short_code != 'K8-K15';

-- Step 4: Link products to series based on name patterns

-- S-4 Series
UPDATE products
SET series_id = '186a1079-4db6-49fb-b56b-704b768ba66a'
WHERE series_id IS NULL
  AND (name ILIKE '%S-4%' OR name ILIKE '%S 4%');

-- S-3 Series
UPDATE products
SET series_id = '904daeb1-cb9e-4aea-a0af-9f00387a4532'
WHERE series_id IS NULL
  AND (name ILIKE '%S-3%' OR name ILIKE '%S 3%');

-- S-2 Series
UPDATE products
SET series_id = '6e0ba349-283b-4798-bffd-b63cd866fd90'
WHERE series_id IS NULL
  AND (name ILIKE '%S-2%' OR name ILIKE '%S 2%');

-- C-2 Series
UPDATE products
SET series_id = '923a5a89-9b00-4d47-83e8-38c4dfd34244'
WHERE series_id IS NULL
  AND (name ILIKE '%C-2%' OR name ILIKE '%C 2%' OR name ILIKE '%C 18-2%' OR name ILIKE '%C 15-2%');

-- DS Series
UPDATE products
SET series_id = 'c3d0c608-a77c-44e1-a823-694e80c168f2'
WHERE series_id IS NULL
  AND (name ILIKE '%DS%');

-- S eco Series
UPDATE products
SET series_id = 'b9a1e009-3fbc-409d-81f9-55b0b16d5d8f'
WHERE series_id IS NULL
  AND (name ILIKE '%S eco%');

-- SRHV Series (must be before SRH to avoid conflicts)
UPDATE products
SET series_id = 'e7cc4282-2e67-48d8-8952-abc2d9d08d72'
WHERE series_id IS NULL
  AND name ILIKE '%SRHV%';

-- SRH Series (exclude SRHV)
UPDATE products
SET series_id = '3ab11808-a3cc-4b37-8f8e-2e6d2b59d5a8'
WHERE series_id IS NULL
  AND name ILIKE '%SRH%'
  AND name NOT ILIKE '%SRHV%';

-- K8-K15 Series
UPDATE products
SET series_id = '23950b10-4baa-438e-ac23-29ee40f3bb3d'
WHERE series_id IS NULL
  AND (name ILIKE '%K8%' OR name ILIKE '%K15%' OR name ILIKE '%K 8%' OR name ILIKE '%K 15%');

-- Step 5: Assign remaining products to General
UPDATE products
SET series_id = (
  SELECT id FROM product_series
  WHERE brand_id = '7f8935b6-793b-4ca6-a535-368a33de43a6'
    AND short_code = 'General'
  LIMIT 1
)
WHERE series_id IS NULL;

/*
  ============================================================
  VERIFICATION QUERIES
  ============================================================

  Run these after the migration to verify success:

  -- a) Check products.brand values (should all be "Boge")
  SELECT DISTINCT brand FROM products;

  -- b) Check series count (should be 10 including General)
  SELECT COUNT(*) FROM product_series
  WHERE brand_id = '7f8935b6-793b-4ca6-a535-368a33de43a6';

  -- c) Check products per series
  SELECT
    ps.short_code,
    COUNT(p.id) as product_count
  FROM product_series ps
  LEFT JOIN products p ON p.series_id = ps.id
  WHERE ps.brand_id = '7f8935b6-793b-4ca6-a535-368a33de43a6'
  GROUP BY ps.id, ps.short_code
  ORDER BY ps.sort_order;

  -- d) Check for unassigned products (should be 0)
  SELECT COUNT(*) as unassigned FROM products WHERE series_id IS NULL;

  ============================================================
*/
