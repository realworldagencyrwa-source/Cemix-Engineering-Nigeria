# BOGE S-2 Series Products - Manual Database Setup

## Issue
The current database RLS (Row Level Security) policies prevent inserting products using the anonymous key. The products need to be added to the database manually.

## Solution
You have two options to add the S-2 series products to your database:

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/cflpphrddekccakfkkjz
2. Navigate to the SQL Editor
3. Copy and paste the SQL migration file: `supabase/migrations/20260218130000_add_boge_s2_series_products.sql`
4. Run the migration

### Option 2: Temporarily Modify RLS Policy
1. In Supabase SQL Editor, run:
```sql
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;

CREATE POLICY "Anyone can insert products"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

2. Then run the insert script:
```bash
node insert-s2-products.js
```

3. After insertion, restore the secure RLS policy:
```sql
DROP POLICY IF EXISTS "Anyone can insert products" ON products;

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

## Products to be Added
The S-2 series includes 15 product variants:

### S 10 Series (3 variants)
- BOGE S 10 – 115 PSI (8 bar) - 42 CFM, 10 HP
- BOGE S 10 – 150 PSI (10 bar) - 39 CFM, 10 HP
- BOGE S 10 – 190 PSI (13 bar) - 32 CFM, 10 HP

### S 15 Series (3 variants)
- BOGE S 15 – 115 PSI (8 bar) - 58 CFM, 15 HP
- BOGE S 15 – 150 PSI (10 bar) - 51 CFM, 15 HP
- BOGE S 15 – 190 PSI (13 bar) - 44 CFM, 15 HP

### S 20-2 Series (3 variants)
- BOGE S 20-2 – 115 PSI (8 bar) - 91 CFM, 20 HP
- BOGE S 20-2 – 150 PSI (10 bar) - 80 CFM, 20 HP
- BOGE S 20-2 – 190 PSI (13 bar) - 67 CFM, 20 HP

### S 24-2 Series (3 variants)
- BOGE S 24-2 – 115 PSI (8 bar) - 108 CFM, 25 HP
- BOGE S 24-2 – 150 PSI (10 bar) - 94 CFM, 25 HP
- BOGE S 24-2 – 190 PSI (13 bar) - 80 CFM, 25 HP

### S 29-2 Series (3 variants)
- BOGE S 29-2 – 115 PSI (8 bar) - 122 CFM, 30 HP
- BOGE S 29-2 – 150 PSI (10 bar) - 110 CFM, 30 HP
- BOGE S 29-2 – 190 PSI (13 bar) - 91 CFM, 30 HP

## Frontend Updates
The frontend has already been updated to:
- Recognize S-2 series products (S 10, S 15, S 20-2, S 24-2, S 29-2)
- Display S-2 Series card on the BOGE product series page
- Support the third level (individual models) for S-2 series
- Sort products by motor power and pressure (highest to lowest)

## Files Modified
1. `src/components/Products.tsx` - Updated to include S-2 series recognition
2. `insert-s2-products.js` - Script ready to insert all 15 S-2 series products

## Next Steps
1. Choose one of the options above to add the products to the database
2. The S-2 Series card will automatically appear under BOGE Product Series
3. Clicking on "S-2 Series" will show all 15 product variants
4. Products will be sorted by motor power (30 HP to 10 HP) and then by pressure
