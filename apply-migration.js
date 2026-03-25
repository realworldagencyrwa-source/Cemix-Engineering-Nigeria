import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: 'BOGE S20 Screw Type Air Compressor',
        brand: 'Boge',
        category: 'Air Compressor',
        description: `Industrial rotary screw air compressor engineered for reliable and energy-efficient operation in demanding production environments.

The BOGE S20 screw air compressor is designed for flexible and reliable industrial operation. Built with German engineering standards, the S20 series combines high-quality workmanship with efficient compact design to ensure maximum operating safety and performance.

Its intelligent cabinet layout allows optimal airflow management and easy maintenance access. The integrated oil separation system and advanced intake control design ensure minimal pressure loss, low residual oil content, and long service life even in demanding environments.

The unit features a Class F, IP55 electric motor with genuine power reserves, ensuring stable performance under continuous operation.`,
        specifications: `Power: 15 kW
Maximum Pressure: 8 bar (115 psi)
Free Air Delivery: 2.57 m³/min (91 CFM)
Compressor Type: Rotary Screw
Motor Type: Class F, IP55
Weight: 350 kg
Dimensions (W x D x H): 1250 x 1000 x 1165 mm
Country of Engineering: Germany`,
        price: 'Contact for pricing',
        availability: 'In Stock',
        featured: true,
        image_url: '/assets/boge-s20.jpg'
      }])
      .select();

    if (error) {
      console.error('Error inserting product:', error);
      process.exit(1);
    }

    console.log('Product added successfully:', data);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

applyMigration();
