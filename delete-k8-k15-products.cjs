const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

(async () => {
  console.log('🗑️  Deleting all K8 and K15 series products...\n');

  // Delete all products that contain K8 or K15 in their name
  const { data, error } = await supabase
    .from('products')
    .delete()
    .or('name.ilike.%K 8%,name.ilike.%K 15%,name.ilike.%K8%,name.ilike.%K15%')
    .select();

  if (error) {
    console.error('❌ Error deleting products:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully deleted ${data?.length || 0} products!`);
  if (data && data.length > 0) {
    data.forEach(p => console.log(`   - ${p.name}`));
  }
})();
