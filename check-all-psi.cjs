const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cflpphrddekccakfkkjz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw'
);

async function checkAll() {
  // Get one specific product
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('name', 'BOGE C 12-2 N – 100 PSI')
    .maybeSingle();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Product found:', data ? data.name : 'None');
  console.log('Product ID:', data?.id);

  // Try to update it
  if (data) {
    const { data: updateData, error: updateError } = await supabase
      .from('products')
      .update({ name: 'BOGE C 12-2 N – 7 bar' })
      .eq('id', data.id)
      .select();

    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Update successful:', updateData);
    }
  }
}

checkAll();
