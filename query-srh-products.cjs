require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function queryProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, description, specifications')
    .eq('brand', 'Boge')
    .ilike('name', '%SRH%')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Found', data.length, 'SRH products:');
  data.forEach(p => {
    console.log('\n---');
    console.log('ID:', p.id);
    console.log('Name:', p.name);
    console.log('Description:', p.description.substring(0, 100) + '...');
    console.log('Specs:', p.specifications.substring(0, 100) + '...');
  });
}

queryProducts();
