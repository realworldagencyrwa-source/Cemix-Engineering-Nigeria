# Setup Brands and Series Hierarchy

This document explains how to set up the brands and series hierarchy in your database.

## Step 1: Apply the Migration

The migration file has been created at:
```
supabase/migrations/20260221000000_create_brands_and_series.sql
```

You need to apply this migration to your Supabase database. You have two options:

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://cflpphrddekccakfkkjz.supabase.co
2. Navigate to the "SQL Editor" section
3. Click "New Query"
4. Copy and paste the entire contents of `supabase/migrations/20260221000000_create_brands_and_series.sql`
5. Click "Run" to execute the migration

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Step 2: Verify the Migration

After applying the migration, you can verify it worked by running the check script:

```bash
node check-tables.cjs
```

You should see:
- ✓ Brands table exists
- ✓ Series table exists
- Products table should now have `brand_id` and `series_id` columns

## Step 3: Verify Data

The migration automatically:
1. Creates the BOGE brand
2. Creates 9 BOGE series (C-2, S-2, S-3, S-4, S eco, SRHV, SRH, K8-K15, DS)
3. Links existing products to the brand and series

Run this script to see the data:

```bash
node apply-brands-migration-direct.cjs
```

## What This Enables

After the migration:
- Public site will show brands, then series, then products
- Admin panel will have a new "Brands" tab to manage brands and series
- Product creation will use dropdowns instead of free text for brands and series
- Proper hierarchical navigation: Brand → Series → Products

## Troubleshooting

If you encounter any errors:
1. Check that you're logged in to Supabase dashboard as an admin
2. Ensure you have the correct project selected
3. Try executing the migration in smaller chunks if needed
4. Contact support if you need the service role key for automated deployment
