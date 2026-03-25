require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking if brands table exists...');
  const { data: brands, error: brandsError } = await supabase
    .from('brands')
    .select('count');

  if (brandsError) {
    console.log('❌ Brands table does not exist:', brandsError.message);
  } else {
    console.log('✓ Brands table exists');
  }

  console.log('\nChecking if series table exists...');
  const { data: series, error: seriesError } = await supabase
    .from('series')
    .select('count');

  if (seriesError) {
    console.log('❌ Series table does not exist:', seriesError.message);
  } else {
    console.log('✓ Series table exists');
  }

  console.log('\nChecking products table columns...');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (productsError) {
    console.log('❌ Error:', productsError.message);
  } else if (products && products.length > 0) {
    console.log('✓ Products table columns:', Object.keys(products[0]));
  } else {
    console.log('✓ Products table exists but is empty');
  }
}

checkTables();
