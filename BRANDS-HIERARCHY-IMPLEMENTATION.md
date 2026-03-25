# Brands & Series Hierarchy Implementation

## Overview

This document describes the complete implementation of the three-level catalog hierarchy: **Brands → Series → Products**.

## What Was Implemented

### 1. Database Schema

#### New Tables Created:
- **`brands`** table with fields:
  - `id` (uuid, primary key)
  - `name` (unique text identifier)
  - `display_title` (display name for UI)
  - `subtitle` (optional)
  - `description` (brand description)
  - `image_url` (brand logo/image)
  - `sort_order` (display ordering)
  - Timestamps: `created_at`, `updated_at`

- **`series`** table with fields:
  - `id` (uuid, primary key)
  - `brand_id` (foreign key to brands)
  - `name` (series name)
  - `short_code` (short identifier like "C-2", "S-3")
  - `description` (series description)
  - `image_url` (series image)
  - `sort_order` (display ordering within brand)
  - Timestamps: `created_at`, `updated_at`
  - Unique constraint on `(brand_id, name)`

#### Products Table Updates:
- Added `brand_id` (foreign key to brands)
- Added `series_id` (foreign key to series, nullable)
- Kept existing `brand` and `series` text columns for backward compatibility

#### Security (RLS):
- Public read access (anon users can SELECT)
- Authenticated admin users can INSERT/UPDATE/DELETE
- All tables have proper Row Level Security policies

### 2. Data Seeding

The migration automatically seeds:
- **BOGE brand** with display title, subtitle, and description
- **9 BOGE series**:
  1. C-2 Series (Compact screw compressors)
  2. S-2 Series (Versatile screw compressors)
  3. S-3 Series (High-performance compressors)
  4. S-4 Series (Premium compressors)
  5. S eco Series (Energy-efficient compressors)
  6. SRHV Series (High vacuum compressors)
  7. SRH Series (Industrial screw compressors)
  8. K8-K15 Series (Compact piston compressors)
  9. DS Series (Desiccant dryers)

The migration also automatically links existing products to the BOGE brand and appropriate series.

### 3. Frontend Components

#### A. BrandsManager Component (`src/components/BrandsManager.tsx`)
New admin component for managing the brand hierarchy:

**Features:**
- Display all brands with series count and product count
- Add/Edit/Delete brands
- Expandable rows to show series within each brand
- Add/Edit/Delete series within a brand
- Modal forms for brand and series management
- Full CRUD operations

**Form Fields:**
- Brand: name, display_title, subtitle, description, image_url, sort_order
- Series: name, short_code, description, image_url, sort_order

#### B. Updated ProductsManager (`src/components/ProductsManager.tsx`)
Enhanced product management with:

**Changes:**
- Brand field changed from text input to **dropdown** (from brands table)
- Series field changed from text input to **dropdown** (filtered by selected brand)
- Automatically populates `brand_id`, `series_id`, `brand`, and `series` fields
- Series dropdown is disabled until a brand is selected
- Includes "No series / General" option for products without a series

#### C. Updated AdminPanel (`src/components/AdminPanel.tsx`)
Added:
- New **"Brands"** tab in admin navigation
- Tab shows BrandsManager component
- Maintains existing Content, Products, and Security tabs

#### D. Database Helper Functions (`src/lib/database.ts`)
Added comprehensive functions:

**Brands:**
- `getBrands()` - Get all brands ordered by sort_order
- `getBrand(id)` - Get single brand
- `createBrand(brand)` - Create new brand
- `updateBrand(id, updates)` - Update brand
- `deleteBrand(id)` - Delete brand

**Series:**
- `getSeries(brandId?)` - Get all series or filtered by brand
- `getSeriesById(id)` - Get single series
- `createSeries(series)` - Create new series
- `updateSeries(id, updates)` - Update series
- `deleteSeries(id)` - Delete series

**Products:**
- `getProductsByBrand(brandId)` - Get products by brand
- `getProductsBySeries(seriesId)` - Get products by series

### 4. Public Site Compatibility

The public-facing Products component continues to work with the existing text-based `brand` and `series` fields, ensuring:
- No changes to existing navigation flow
- Brand chips still work
- Series selection still works
- Product filtering still works
- All existing animations and styling preserved

## How to Complete Setup

### Step 1: Apply Database Migration

You must apply the migration to create the brands and series tables in your Supabase database.

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to your Supabase project: https://cflpphrddekccakfkkjz.supabase.co
2. Navigate to **SQL Editor**
3. Click **"New Query"**
4. Copy the entire contents of:
   ```
   supabase/migrations/20260221000000_create_brands_and_series.sql
   ```
5. Paste into the SQL editor
6. Click **"Run"** to execute

**Option B: Using Supabase CLI**

If you have Supabase CLI installed:
```bash
supabase db push
```

### Step 2: Verify Migration

Run the verification script:
```bash
node check-tables.cjs
```

You should see:
- ✓ Brands table exists
- ✓ Series table exists
- ✓ Products table has brand_id and series_id columns

### Step 3: Verify Data

The migration should have automatically:
- Created 1 BOGE brand
- Created 9 BOGE series
- Linked existing BOGE products to brand and series

To verify, you can check in the Supabase dashboard or run:
```bash
node apply-brands-migration-direct.cjs
```

## Admin Panel Usage

### Managing Brands

1. Log in to admin panel: `/admin`
2. Click **"Brands"** tab
3. Click **"Add Brand"** to create a new brand
4. Fill in:
   - Brand Name (e.g., "Atlas Copco")
   - Display Title (e.g., "Atlas Copco Industrial Solutions")
   - Subtitle (optional)
   - Description
   - Image URL (optional)
   - Sort Order (0 = first)
5. Click **"Save Brand"**

### Managing Series

1. In the Brands tab, click the **chevron** next to a brand name to expand
2. Click **"Add Series"** button in the expanded section
3. Fill in:
   - Series Name (e.g., "GA Series")
   - Short Code (e.g., "GA")
   - Description
   - Image URL (optional)
   - Sort Order
4. Click **"Save Series"**

### Creating Products with Hierarchy

1. Go to **"Products"** tab
2. Click **"Add Product"**
3. Select **Brand** from dropdown (required)
4. Select **Series** from dropdown (optional - filtered by brand)
5. Fill in other product details
6. Click **"Save Product"**

The product will be automatically linked to the selected brand and series via `brand_id` and `series_id`.

## Benefits of This Implementation

### For Administrators:
- ✅ Centralized brand management
- ✅ Hierarchical series organization
- ✅ Dropdown selection prevents typos
- ✅ Easy to add new brands and series
- ✅ View product counts at each level
- ✅ Cascade delete protection

### For Users:
- ✅ Consistent brand/series navigation
- ✅ Proper hierarchy: Brand → Series → Products
- ✅ Better organized product catalog
- ✅ Faster product discovery

### Technical:
- ✅ Proper relational database design
- ✅ Foreign key constraints
- ✅ Row Level Security (RLS)
- ✅ Backward compatible with existing data
- ✅ Maintains text fields for legacy support
- ✅ Type-safe TypeScript interfaces

## Files Modified/Created

### New Files:
- `src/components/BrandsManager.tsx` - Brand/series management UI
- `supabase/migrations/20260221000000_create_brands_and_series.sql` - Database migration
- `setup-brands-hierarchy.md` - Setup instructions
- `check-tables.cjs` - Verification script
- `apply-brands-migration-direct.cjs` - Data seeding script
- `BRANDS-HIERARCHY-IMPLEMENTATION.md` - This file

### Modified Files:
- `src/lib/database.ts` - Added Brand/Series interfaces and CRUD functions
- `src/components/AdminPanel.tsx` - Added Brands tab
- `src/components/ProductsManager.tsx` - Changed to use brand/series dropdowns

### Unchanged (As Required):
- `src/components/Products.tsx` - Public site component (no changes to UI/layout/animations)
- `src/components/Hero.tsx` - Hero section unchanged
- `src/components/Services.tsx` - Services section unchanged
- All styling and animations preserved

## Future Enhancements

Possible future improvements:
- Image upload for brands and series
- Bulk import/export of brands and series
- Analytics: most viewed brands/series
- Multi-language support for brand/series descriptions
- Brand-specific themes/colors
- Series-specific technical specifications templates

## Troubleshooting

### Migration Errors

If you encounter errors during migration:

1. **Table already exists**: Safe to ignore if tables were created in a previous attempt
2. **Permission denied**: Ensure you're logged in as admin in Supabase dashboard
3. **Foreign key violations**: Check that BOGE brand was created before series

### Data Not Showing

If brands/series don't appear:

1. Check browser console for errors
2. Verify migration ran successfully
3. Check RLS policies are enabled
4. Ensure you're logged in to admin panel

### Products Not Linked

If existing products aren't linked to brands/series:

1. Run the data seeding script: `node apply-brands-migration-direct.cjs`
2. Manually update products in admin panel
3. Check that product `brand` text field matches brand name in database

## Contact

For questions or issues with this implementation, please refer to:
- Supabase documentation: https://supabase.com/docs
- Migration file: `supabase/migrations/20260221000000_create_brands_and_series.sql`
- Setup guide: `setup-brands-hierarchy.md`
