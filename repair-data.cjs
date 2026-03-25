/**
 * ONE-TIME DATA REPAIR SCRIPT
 *
 * This script fixes the brand and series relationships in the database.
 *
 * Run with: node repair-data.cjs
 *
 * Must be run by authenticated admin user (fadi.yazbeck111@gmail.com)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  console.log('='.repeat(60));
  console.log('BRAND & SERIES RELATIONSHIP REPAIR');
  console.log('='.repeat(60));
  console.log('\nThis script will:');
  console.log('1. Fix products.brand to use "Boge" instead of "BOGE Industrial Compressors"');
  console.log('2. Link all products to their correct series');
  console.log('3. Create missing "General" series for unclassified products');
  console.log('\n' + '='.repeat(60) + '\n');

  const bogeId = '7f8935b6-793b-4ca6-a535-368a33de43a6';

  // STEP 1: Fix products.brand field
  console.log('STEP 1: Fixing products.brand field...');
  const { data: brandNeedsFix } = await supabase
    .from('products')
    .select('id')
    .eq('brand', 'BOGE Industrial Compressors')
    .limit(1);

  if (brandNeedsFix && brandNeedsFix.length > 0) {
    const { data: allBadBrand } = await supabase
      .from('products')
      .select('id')
      .eq('brand', 'BOGE Industrial Compressors');

    console.log(`  Found ${allBadBrand?.length || 0} products with wrong brand value`);
    console.log('  ⚠ MANUAL FIX REQUIRED:');
    console.log('  Run this in Supabase SQL Editor:\n');
    console.log('  UPDATE products SET brand = \'Boge\' WHERE brand = \'BOGE Industrial Compressors\';\n');
  } else {
    console.log('  ✓ products.brand already correct');
  }

  // STEP 2: Check for General series
  console.log('\nSTEP 2: Checking for General series...');
  const { data: generalSeries } = await supabase
    .from('product_series')
    .select('id')
    .eq('brand_id', bogeId)
    .eq('short_code', 'General')
    .maybeSingle();

  if (!generalSeries) {
    console.log('  ⚠ General series missing');
    console.log('  MANUAL FIX REQUIRED:');
    console.log('  Run this in Supabase SQL Editor:\n');
    console.log(`  INSERT INTO product_series (brand_id, name, short_code, description, sort_order)`);
    console.log(`  VALUES ('${bogeId}', 'General', 'General', 'General products and accessories', 999);\n`);
  } else {
    console.log('  ✓ General series exists');
  }

  // STEP 3: Fix K series short_code
  console.log('\nSTEP 3: Checking K8-K15 series short_code...');
  const { data: kSeries } = await supabase
    .from('product_series')
    .select('id, short_code')
    .eq('brand_id', bogeId)
    .ilike('name', '%K8%K15%')
    .maybeSingle();

  if (kSeries && kSeries.short_code === 'K') {
    console.log('  ⚠ K series has wrong short_code ("K" instead of "K8-K15")');
    console.log('  MANUAL FIX REQUIRED:');
    console.log('  Run this in Supabase SQL Editor:\n');
    console.log(`  UPDATE product_series SET short_code = 'K8-K15' WHERE id = '${kSeries.id}';\n`);
  } else if (kSeries) {
    console.log('  ✓ K8-K15 series short_code is correct');
  }

  // STEP 4: Get all series
  const { data: allSeries } = await supabase
    .from('product_series')
    .select('id, short_code, name')
    .eq('brand_id', bogeId);

  console.log('\nSTEP 4: Linking products to series...');
  console.log(`  Found ${allSeries?.length || 0} series:`);
  allSeries?.forEach(s => console.log(`    - ${s.short_code}: ${s.name}`));

  // Generate SQL statements for linking products
  console.log('\n  ⚠ MANUAL FIX REQUIRED:');
  console.log('  Copy and run this SQL in Supabase SQL Editor:\n');
  console.log('  -- Link products to series based on name patterns\n');

  const patterns = [
    { pattern: ['S-4', 'S 4'], short_code: 'S-4' },
    { pattern: ['S-3', 'S 3'], short_code: 'S-3' },
    { pattern: ['S-2', 'S 2'], short_code: 'S-2' },
    { pattern: ['C-2', 'C 2', 'C 18-2', 'C 15-2'], short_code: 'C-2' },
    { pattern: ['DS'], short_code: 'DS' },
    { pattern: ['S eco'], short_code: 'S eco' },
    { pattern: ['SRHV'], short_code: 'SRHV' },
    { pattern: ['SRH'], short_code: 'SRH', exclude: 'SRHV' },
    { pattern: ['K8', 'K15', 'K 8', 'K 15'], short_code: 'K8-K15' },
  ];

  for (const config of patterns) {
    const series = allSeries?.find(s => s.short_code === config.short_code);
    if (!series) continue;

    const conditions = config.pattern.map(p => `name ILIKE '%${p}%'`).join(' OR ');
    const excludeClause = config.exclude ? ` AND name NOT ILIKE '%${config.exclude}%'` : '';

    console.log(`  -- ${config.short_code} Series`);
    console.log(`  UPDATE products`);
    console.log(`  SET series_id = '${series.id}'`);
    console.log(`  WHERE series_id IS NULL`);
    console.log(`    AND (${conditions})${excludeClause};`);
    console.log('');
  }

  // Assign remaining to General
  const generalId = allSeries?.find(s => s.short_code === 'General')?.id;
  if (generalId) {
    console.log('  -- Assign remaining products to General');
    console.log(`  UPDATE products`);
    console.log(`  SET series_id = '${generalId}'`);
    console.log(`  WHERE series_id IS NULL;`);
    console.log('');
  }

  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION QUERIES');
  console.log('='.repeat(60));
  console.log('\nAfter running the SQL above, verify with these queries:\n');
  console.log('-- a) Check products.brand values (should all be "Boge")');
  console.log('SELECT DISTINCT brand FROM products;\n');
  console.log('-- b) Check series count');
  console.log('SELECT COUNT(*) FROM product_series WHERE brand_id = \'' + bogeId + '\';\n');
  console.log('-- c) Check products assigned to series');
  console.log('SELECT');
  console.log('  ps.short_code,');
  console.log('  COUNT(p.id) as product_count');
  console.log('FROM product_series ps');
  console.log('LEFT JOIN products p ON p.series_id = ps.id');
  console.log('WHERE ps.brand_id = \'' + bogeId + '\'');
  console.log('GROUP BY ps.id, ps.short_code');
  console.log('ORDER BY ps.sort_order;\n');
  console.log('-- d) Check for unassigned products');
  console.log('SELECT COUNT(*) as unassigned FROM products WHERE series_id IS NULL;');
  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
