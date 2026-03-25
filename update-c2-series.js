import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

const conversions = [
  { from: 'BOGE C 12-2 N – 100 PSI', to: 'BOGE C 12-2 N – 7 bar' },
  { from: 'BOGE C 12-2 N – 125 PSI', to: 'BOGE C 12-2 N – 9 bar' },
  { from: 'BOGE C 12-2 N – 150 PSI', to: 'BOGE C 12-2 N – 10 bar' },
  { from: 'BOGE C 12-2 N – 190 PSI', to: 'BOGE C 12-2 N – 13 bar' },
  { from: 'BOGE C 15-2 N – 100 PSI', to: 'BOGE C 15-2 N – 7 bar' },
  { from: 'BOGE C 15-2 N – 125 PSI', to: 'BOGE C 15-2 N – 9 bar' },
  { from: 'BOGE C 15-2 N – 150 PSI', to: 'BOGE C 15-2 N – 10 bar' },
  { from: 'BOGE C 15-2 N – 190 PSI', to: 'BOGE C 15-2 N – 13 bar' },
  { from: 'BOGE C 18-2 N – 100 PSI', to: 'BOGE C 18-2 N – 7 bar' },
  { from: 'BOGE C 18-2 N – 125 PSI', to: 'BOGE C 18-2 N – 9 bar' },
  { from: 'BOGE C 18-2 N – 150 PSI', to: 'BOGE C 18-2 N – 10 bar' },
  { from: 'BOGE C 18-2 N – 190 PSI', to: 'BOGE C 18-2 N – 13 bar' },
  { from: 'BOGE C 22-2 N – 100 PSI', to: 'BOGE C 22-2 N – 7 bar' },
  { from: 'BOGE C 22-2 N – 125 PSI', to: 'BOGE C 22-2 N – 9 bar' },
  { from: 'BOGE C 22-2 N – 150 PSI', to: 'BOGE C 22-2 N – 10 bar' },
  { from: 'BOGE C 22-2 N – 190 PSI', to: 'BOGE C 22-2 N – 13 bar' }
];

async function updateProducts() {
  console.log('Starting C-2 series PSI to bar conversion...\n');

  for (const conversion of conversions) {
    console.log(`Updating: ${conversion.from} → ${conversion.to}`);

    const { data, error } = await supabase
      .from('products')
      .update({ name: conversion.to })
      .eq('name', conversion.from)
      .select();

    if (error) {
      console.error(`  ✗ Error:`, error.message);
    } else if (data && data.length > 0) {
      console.log(`  ✓ Updated successfully`);
    } else {
      console.log(`  ⚠ Product not found (may already be updated)`);
    }
  }

  console.log('\nConversion complete!');
}

updateProducts();
