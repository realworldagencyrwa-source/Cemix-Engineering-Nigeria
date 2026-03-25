const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const ids = [
  'd2414127-b37e-4d85-9ea5-b9c7f851c33a',
  'a4b51fb2-f435-4ce5-a293-3dadcde801b0',
  '4638befc-29c4-4b34-a63e-f63ec0706dfb',
  '3f553a22-f32f-48ba-8165-8d87b332cbd1',
  'bb1e99bc-fab5-4afe-9756-dd889dd899c4',
  'a13d3929-1a6f-4c0f-88dc-e62527739d63',
  '58b38575-0dd1-4a25-9dbf-15b914678377',
  '11c8cba9-ae84-4117-9ce0-db462a83edc3',
  'db6627ff-97f1-4a31-b8d4-b10514b4205a',
  '31637f7f-fbc6-4d5a-8502-eae6e558a709'
];

async function deleteProducts() {
  console.log('Attempting to delete', ids.length, 'K8-K15 products...');

  for (const id of ids) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting', id, ':', error.message);
    } else if (data && data.length > 0) {
      console.log('✓ Deleted:', data[0].name);
    } else {
      console.log('✗ No product found with id:', id);
    }
  }

  const { data: remaining, error: checkError } = await supabase
    .from('products')
    .select('id, name')
    .or('name.ilike.%K8%,name.ilike.%K15%');

  if (checkError) {
    console.error('Error checking remaining products:', checkError);
  } else {
    console.log('\nRemaining K8/K15 products:', remaining?.length || 0);
  }
}

deleteProducts();
