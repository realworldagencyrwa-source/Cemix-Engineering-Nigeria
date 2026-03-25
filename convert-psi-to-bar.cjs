const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

const psiToBarMap = {
  '190 PSI': '13 bar',
  '150 PSI': '10 bar',
  '125 PSI': '9 bar',
  '115 PSI': '8 bar',
  '110 PSI': '7.6 bar',
  '100 PSI': '7 bar'
};

async function convertAllProducts() {
  console.log('Fetching all products with PSI in name...');

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name')
    .eq('brand', 'Boge')
    .ilike('name', '%PSI%');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    return;
  }

  console.log(`Found ${products.length} products to convert\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    let newName = product.name;

    // Replace PSI with bar
    Object.entries(psiToBarMap).forEach(([psi, bar]) => {
      newName = newName.replace(psi, bar);
    });

    if (newName !== product.name) {
      console.log(`Converting: ${product.name} → ${newName}`);

      const { error: updateError } = await supabase
        .from('products')
        .update({ name: newName })
        .eq('id', product.id);

      if (updateError) {
        console.error(`  ✗ Error:`, updateError.message);
        errorCount++;
      } else {
        console.log(`  ✓ Updated`);
        successCount++;
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Successfully converted: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

convertAllProducts();
