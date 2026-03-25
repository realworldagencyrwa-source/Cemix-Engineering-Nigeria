import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fixS2Products() {
  console.log('Fetching S-2 series products...');

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', '%S %-2%');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} S-2 series products:\n`);
  products.forEach(p => console.log(`ID: ${p.id}, Name: ${p.name}`));

  // Fix products with PSI in the name
  const productsWithPSI = products.filter(p => p.name.includes('PSI'));

  console.log(`\n${productsWithPSI.length} products need fixing:\n`);

  for (const product of productsWithPSI) {
    const newName = product.name.replace('PSI', 'bar');
    console.log(`Updating: "${product.name}" -> "${newName}"`);

    const { error: updateError } = await supabase
      .from('products')
      .update({ name: newName })
      .eq('id', product.id);

    if (updateError) {
      console.error(`Error updating ${product.id}:`, updateError);
    } else {
      console.log(`✓ Updated successfully`);
    }
  }

  console.log('\nDone!');
}

fixS2Products();
