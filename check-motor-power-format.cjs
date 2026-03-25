require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkMotorPower() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, specifications')
    .eq('brand', 'Boge')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Checking motor power format in specifications:\n');
  data.forEach(p => {
    const motorMatch = p.specifications.match(/Motor Power:[^\n]+/);
    if (motorMatch) {
      console.log(`${p.name}`);
      console.log(`  ${motorMatch[0]}`);
      console.log('');
    }
  });
}

checkMotorPower();
