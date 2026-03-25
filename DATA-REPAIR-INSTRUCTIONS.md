# Data Repair Instructions

## Summary

The brand and series relationships are broken. This document provides the exact steps to fix them.

## Current Problems

1. **products.brand** contains `"BOGE Industrial Compressors"` (display title) instead of `"Boge"` (brand key)
2. **products.series_id** is `NULL` for all 225 products
3. **K8-K15 series** has wrong short_code (`"K"` instead of `"K8-K15"`)
4. **General series** is missing (needed for fallback)

## Schema Structure

### Tables
- **brands**: `id`, `name` (key like "Boge"), `display_title` (like "BOGE Industrial Compressors")
- **product_series**: `id`, `brand_id`, `name`, `short_code` (for matching)
- **products**: `id`, `brand` (should be brand name), `brand_id`, `series_id`, `category`

### Current State
- Brands table: 1 brand (Boge)
- Series table: 9 series (C-2, S-2, S-3, S-4, S eco, DS, SRH, SRHV, K with wrong short_code)
- Products: 225 products, all with series_id=NULL

## Fix Steps

### Step 1: Run the Migration SQL

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file: `REPAIR-MIGRATION.sql`
3. Copy the entire contents
4. Paste into SQL Editor
5. Click **Run**

This migration will:
- Fix all 225 products.brand values from "BOGE Industrial Compressors" to "Boge"
- Create "General" series for unclassified products
- Fix K8-K15 series short_code
- Link all products to correct series based on name patterns
- Assign remaining products to "General" series

### Step 2: Verify the Fix

Run these verification queries in SQL Editor:

```sql
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
```

### Expected Results

After migration:

**a) products.brand:**
```
brand
-----
Boge
```

**b) Series count:**
```
count
-----
10
```

**c) Products per series:**
```
short_code  | product_count
------------|-------------
C-2         | ~29
S-2         | ~18
S-3         | ~9
S-4         | ~53
S eco       | ~14
SRHV        | ~8
SRH         | ~12
K8-K15      | ~1
DS          | ~15
General     | remaining
```

**d) Unassigned products:**
```
unassigned
----------
0
```

## Code Changes Made

### src/components/Products.tsx
- Updated `fetchProducts()` to join with `brands` and `product_series` tables
- Normalized product data to ensure `product.brand` uses brand name (not display_title)
- Series info now comes from database relationships, with fallback to name extraction

### Admin Functions
- BrandsManager already refreshes correctly after brand/series creation
- No changes needed to admin UI

## What This DOES NOT Change

- UI layout, styling, animations (as instructed)
- Card designs or public site rendering
- Category field (remains "Air Compressor")
- Any product data or images

## Files Created

1. **REPAIR-MIGRATION.sql** - The complete SQL migration (run this in Supabase)
2. **repair-data.cjs** - Analysis script (for reference only)
3. **DATA-REPAIR-INSTRUCTIONS.md** - This file

## Troubleshooting

If products still show "No series/General" after migration:

1. Check that migration completed without errors
2. Verify series_id values are set:
   ```sql
   SELECT id, name, series_id FROM products LIMIT 10;
   ```
3. Clear browser cache and reload
4. Check browser console for any JavaScript errors

## RLS Permissions

The migration SQL runs with your authenticated admin session, so RLS policies will allow the updates. The anon key cannot perform these updates (by design for security).
