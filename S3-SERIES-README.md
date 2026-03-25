# BOGE S-3 Series Products - Manual Database Setup

## Overview
This document provides instructions for adding all 65 BOGE S-3 Series product variants to the database.

## Issue
The current database RLS (Row Level Security) policies prevent inserting products using the anonymous key. The products need to be added to the database manually via Supabase Dashboard.

## Solution

### Using Supabase Dashboard (Recommended)
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/cflpphrddekccakfkkjz
2. Navigate to the SQL Editor
3. Copy and paste the SQL migration file: `supabase/migrations/20260219120000_add_boge_s3_series_products.sql`
4. Run the migration

Alternatively, you can copy the SQL from: `insert-s3-via-sql.sql`

## Products to be Added
The S-3 series includes 65 product variants across 13 different models:

### S 40-3 N Series (5 variants - 40 HP)
- 100 PSI - 192 CFM
- 115 PSI - 184 CFM
- 125 PSI - 184 CFM
- 150 PSI - 167 CFM
- 190 PSI - 140 CFM

### SLF 40-3 N Series (5 variants - 40 HP)
- 100 PSI - 48-196 CFM
- 115 PSI - 46-188 CFM
- 125 PSI - 46-188 CFM
- 150 PSI - 46-168 CFM
- 190 PSI - 44-148 CFM

### S 50-3 N Series (5 variants - 50 HP)
- 100 PSI - 240 CFM
- 115 PSI - 225 CFM
- 125 PSI - 225 CFM
- 150 PSI - 205 CFM
- 190 PSI - 175 CFM

### SLF 51-3 N Series (5 variants - 50 HP)
- 100 PSI - 87-264 CFM
- 115 PSI - 83-253 CFM
- 125 PSI - 83-253 CFM
- 150 PSI - 79-223 CFM
- 190 PSI - 75-182 CFM

### S 60-3 N Series (5 variants - 60 HP)
- 100 PSI - 269 CFM
- 115 PSI - 258 CFM
- 125 PSI - 258 CFM
- 150 PSI - 231 CFM
- 190 PSI - 196 CFM

### S 61-3 N Series (5 variants - 60 HP)
- 100 PSI - 287 CFM
- 115 PSI - 273 CFM
- 125 PSI - 273 CFM
- 150 PSI - 240 CFM
- 190 PSI - 208 CFM

### SLF 61-3 N Series (5 variants - 60 HP)
- 100 PSI - 114-292 CFM
- 115 PSI - 110-279 CFM
- 125 PSI - 110-279 CFM
- 150 PSI - 102-242 CFM
- 190 PSI - 76-203 CFM

### S 75-3 N Series (5 variants - 75 HP)
- 100 PSI - 359 CFM
- 115 PSI - 344 CFM
- 125 PSI - 344 CFM
- 150 PSI - 298 CFM
- 190 PSI - 256 CFM

### SLF 75-3 N Series (5 variants - 75 HP)
- 100 PSI - 81-354 CFM
- 115 PSI - 78-339 CFM
- 125 PSI - 78-339 CFM
- 150 PSI - 74-294 CFM
- 190 PSI - 77-255 CFM

### S 100-3 N Series (5 variants - 100 HP)
- 100 PSI - 475 CFM
- 115 PSI - 452 CFM
- 125 PSI - 452 CFM
- 150 PSI - 387 CFM
- 190 PSI - 336 CFM

### S 271-3 N Series (5 variants - 270 HP)
- 100 PSI - 1260 CFM
- 115 PSI - 1147 CFM
- 125 PSI - 1147 CFM
- 150 PSI - 1101 CFM
- 190 PSI - 932 CFM

### SLF 271-3 N Series (5 variants - 270 HP)
- 100 PSI - 300-1260 CFM
- 115 PSI - 300-1186 CFM
- 125 PSI - 300-1186 CFM
- 150 PSI - 290-1088 CFM
- 190 PSI - 292-932 CFM

### S 341-3 N Series (5 variants - 340 HP)
- 100 PSI - 1471 CFM
- 115 PSI - 1427 CFM
- 125 PSI - 1427 CFM
- 150 PSI - 1329 CFM
- 190 PSI - 1140 CFM

## Frontend Updates
The frontend has already been updated to:
- Recognize S-3 series products from product names
- Display S-3 Series card on the BOGE product series page
- Support the third level (individual models) for S-3 series
- Sort products by motor power (rated output in HP) and pressure (highest to lowest)
- Convert PSI to bar automatically (115 PSI → 8 bar, etc.)
- Display 5 product cards per row on desktop

## Files Modified
1. `src/components/Products.tsx` - Updated to include S-3 series recognition and PSI conversion
2. `insert-s3-via-sql.sql` - SQL file with all 65 S-3 series product INSERT statements
3. `supabase/migrations/20260219120000_add_boge_s3_series_products.sql` - Migration file (same content as above)

## Next Steps
1. Use the Supabase Dashboard SQL Editor to run the migration
2. The S-3 Series card will automatically appear under BOGE Product Series
3. Clicking on "S-3 Series" will show all 65 product variants
4. Products will be sorted by motor power (340 HP → 40 HP) and then by pressure (highest to lowest)
5. Product cards display pressure in bar instead of PSI (e.g., "8 bar" instead of "115 PSI")

## Important Notes
- All products have consistent descriptions emphasizing long-term industrial reliability
- Technical specifications from official BOGE S-3 series datasheet
- All products marked as "In Stock" with "Contact for pricing"
- Product naming follows format: "BOGE [Model] – [Pressure] PSI"
- Frontend automatically converts PSI display to bar for consistency
