import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  try {
    console.log('Applying catalogue support migration to products table...\n');

    // Step 1: Add new columns to products table
    console.log('Step 1: Adding new columns (is_catalogue, series, motor_power)...');

    // Note: Supabase JS client doesn't support DDL operations directly
    // These columns need to be added via the Supabase dashboard SQL editor or using a service role key
    // For now, we'll proceed assuming the columns exist or will be added manually

    const addColumnsSQL = `
-- Add is_catalogue column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_catalogue'
  ) THEN
    ALTER TABLE products ADD COLUMN is_catalogue BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add series column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'series'
  ) THEN
    ALTER TABLE products ADD COLUMN series TEXT;
  END IF;
END $$;

-- Add motor_power column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'motor_power'
  ) THEN
    ALTER TABLE products ADD COLUMN motor_power NUMERIC;
  END IF;
END $$;
`;

    console.log('\nSQL to execute in Supabase SQL Editor:');
    console.log('========================================');
    console.log(addColumnsSQL);
    console.log('========================================\n');

    console.log('Note: Please run the above SQL in your Supabase SQL Editor first.');
    console.log('Press Ctrl+C to cancel or wait 5 seconds to continue with data update...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 2: Update the K8-K15 product
    console.log('Step 2: Updating K8-K15 product...');

    const { data: updateData, error: updateError } = await supabase
      .from('products')
      .update({
        description: 'View complete technical specifications including all models, pressure ratings, air delivery rates, dimensions, and weights.',
        specifications: null,
        image_url: '/assets/files_7623097-2026-02-19T19-44-06-301Z-Screenshot_2026-02-19_214335.png',
        is_catalogue: true,
        series: 'K8-K15 Series'
      })
      .eq('name', 'BOGE K8-K15 Series')
      .eq('brand', 'Boge')
      .select();

    if (updateError) {
      console.error('Error updating K8-K15 product:', updateError);

      // Check if the error is due to missing columns
      if (updateError.message.includes('column') && updateError.message.includes('does not exist')) {
        console.error('\nERROR: The required columns do not exist yet.');
        console.error('Please run the SQL statements shown above in your Supabase SQL Editor first.');
        process.exit(1);
      }

      // Check if product exists
      const { data: existingProduct, error: selectError } = await supabase
        .from('products')
        .select('*')
        .eq('name', 'BOGE K8-K15 Series')
        .eq('brand', 'Boge')
        .single();

      if (selectError || !existingProduct) {
        console.error('Product "BOGE K8-K15 Series" from brand "Boge" not found in database.');
        process.exit(1);
      }

      process.exit(1);
    }

    if (!updateData || updateData.length === 0) {
      console.warn('Warning: No product was updated. Product "BOGE K8-K15 Series" from brand "Boge" may not exist.');

      // Try to find similar products
      const { data: similarProducts } = await supabase
        .from('products')
        .select('name, brand')
        .or('name.ilike.%K8%,name.ilike.%K15%');

      if (similarProducts && similarProducts.length > 0) {
        console.log('\nSimilar products found:');
        similarProducts.forEach(p => console.log(`  - ${p.name} (${p.brand})`));
      }
    } else {
      console.log('Successfully updated K8-K15 product!');
      console.log('\nUpdated product:', updateData[0]);
    }

    console.log('\nMigration completed successfully!');
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

applyMigration();
