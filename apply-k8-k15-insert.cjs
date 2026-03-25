const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function applySQLFile() {
  const sqlContent = fs.readFileSync('insert-k8-k15-products.sql', 'utf8');

  console.log('📦 Applying K8 and K15 products insert via SQL...\n');

  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sqlContent });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('✅ SQL applied successfully!');
  console.log('Data:', data);
}

applySQLFile().catch(console.error);
