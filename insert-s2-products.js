import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: 'BOGE S 10 – 115 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 115 PSI (8 bar) with an effective free air delivery of 42 CFM (1.18 m³/min) and a motor power of 10 HP (7.5 kW).',
    specifications: 'Max Pressure: 115 PSI (8 bar)\nEffective Free Air Delivery: 42 CFM (1.18 m³/min)\nMotor Power: 10 HP (7.5 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 10 – 150 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 150 PSI (10 bar) with an effective free air delivery of 39 CFM (1.06 m³/min) and a motor power of 10 HP (7.5 kW).',
    specifications: 'Max Pressure: 150 PSI (10 bar)\nEffective Free Air Delivery: 39 CFM (1.06 m³/min)\nMotor Power: 10 HP (7.5 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 10 – 190 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 190 PSI (13 bar) with an effective free air delivery of 32 CFM (0.91 m³/min) and a motor power of 10 HP (7.5 kW).',
    specifications: 'Max Pressure: 190 PSI (13 bar)\nEffective Free Air Delivery: 32 CFM (0.91 m³/min)\nMotor Power: 10 HP (7.5 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 15 – 115 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 115 PSI (8 bar) with an effective free air delivery of 58 CFM (1.65 m³/min) and a motor power of 15 HP (11.0 kW).',
    specifications: 'Max Pressure: 115 PSI (8 bar)\nEffective Free Air Delivery: 58 CFM (1.65 m³/min)\nMotor Power: 15 HP (11.0 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 15 – 150 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 150 PSI (10 bar) with an effective free air delivery of 51 CFM (1.45 m³/min) and a motor power of 15 HP (11.0 kW).',
    specifications: 'Max Pressure: 150 PSI (10 bar)\nEffective Free Air Delivery: 51 CFM (1.45 m³/min)\nMotor Power: 15 HP (11.0 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 15 – 190 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 190 PSI (13 bar) with an effective free air delivery of 44 CFM (1.25 m³/min) and a motor power of 15 HP (11.0 kW).',
    specifications: 'Max Pressure: 190 PSI (13 bar)\nEffective Free Air Delivery: 44 CFM (1.25 m³/min)\nMotor Power: 15 HP (11.0 kW)\nDimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)\nDimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)\nWeight Super-Silenced: 220 kg (485 lbs)\nWeight Ultra-Silenced: 235 kg (518 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 20-2 – 115 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 115 PSI (8 bar) with an effective free air delivery of 91 CFM (2.57 m³/min) and a motor power of 20 HP (15.0 kW).',
    specifications: 'Max Pressure: 115 PSI (8 bar)\nEffective Free Air Delivery: 91 CFM (2.57 m³/min)\nMotor Power: 20 HP (15.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 350 kg (772 lbs)\nWeight Ultra-Silenced: 375 kg (827 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 20-2 – 150 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 150 PSI (10 bar) with an effective free air delivery of 80 CFM (2.24 m³/min) and a motor power of 20 HP (15.0 kW).',
    specifications: 'Max Pressure: 150 PSI (10 bar)\nEffective Free Air Delivery: 80 CFM (2.24 m³/min)\nMotor Power: 20 HP (15.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 350 kg (772 lbs)\nWeight Ultra-Silenced: 375 kg (827 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 20-2 – 190 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 190 PSI (13 bar) with an effective free air delivery of 67 CFM (1.90 m³/min) and a motor power of 20 HP (15.0 kW).',
    specifications: 'Max Pressure: 190 PSI (13 bar)\nEffective Free Air Delivery: 67 CFM (1.90 m³/min)\nMotor Power: 20 HP (15.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 350 kg (772 lbs)\nWeight Ultra-Silenced: 375 kg (827 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 24-2 – 115 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 115 PSI (8 bar) with an effective free air delivery of 108 CFM (3.05 m³/min) and a motor power of 25 HP (18.5 kW).',
    specifications: 'Max Pressure: 115 PSI (8 bar)\nEffective Free Air Delivery: 108 CFM (3.05 m³/min)\nMotor Power: 25 HP (18.5 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 24-2 – 150 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 150 PSI (10 bar) with an effective free air delivery of 94 CFM (2.66 m³/min) and a motor power of 25 HP (18.5 kW).',
    specifications: 'Max Pressure: 150 PSI (10 bar)\nEffective Free Air Delivery: 94 CFM (2.66 m³/min)\nMotor Power: 25 HP (18.5 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 24-2 – 190 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 190 PSI (13 bar) with an effective free air delivery of 80 CFM (2.26 m³/min) and a motor power of 25 HP (18.5 kW).',
    specifications: 'Max Pressure: 190 PSI (13 bar)\nEffective Free Air Delivery: 80 CFM (2.26 m³/min)\nMotor Power: 25 HP (18.5 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 29-2 – 115 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 115 PSI (8 bar) with an effective free air delivery of 122 CFM (3.45 m³/min) and a motor power of 30 HP (22.0 kW).',
    specifications: 'Max Pressure: 115 PSI (8 bar)\nEffective Free Air Delivery: 122 CFM (3.45 m³/min)\nMotor Power: 30 HP (22.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 29-2 – 150 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 150 PSI (10 bar) with an effective free air delivery of 110 CFM (3.11 m³/min) and a motor power of 30 HP (22.0 kW).',
    specifications: 'Max Pressure: 150 PSI (10 bar)\nEffective Free Air Delivery: 110 CFM (3.11 m³/min)\nMotor Power: 30 HP (22.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  },
  {
    name: 'BOGE S 29-2 – 190 PSI',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.\n\nThis configuration operates at 190 PSI (13 bar) with an effective free air delivery of 91 CFM (2.57 m³/min) and a motor power of 30 HP (22.0 kW).',
    specifications: 'Max Pressure: 190 PSI (13 bar)\nEffective Free Air Delivery: 91 CFM (2.57 m³/min)\nMotor Power: 30 HP (22.0 kW)\nDimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)\nDimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)\nWeight Super-Silenced: 365 kg (805 lbs)\nWeight Ultra-Silenced: 390 kg (860 lbs)\nSound Pressure Level: from 68 dB(A)',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    image_url: '/assets/boge-s20.jpg'
  }
];

async function insertProducts() {
  console.log('Starting S-2 series products insertion...\n');
  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) {
      console.error(`✗ Error inserting ${product.name}:`, error.message);
      errorCount++;
    } else {
      console.log(`✓ Inserted: ${product.name}`);
      successCount++;
    }
  }

  console.log(`\nSummary: ${successCount} products inserted successfully, ${errorCount} errors`);
  process.exit(errorCount > 0 ? 1 : 0);
}

insertProducts();
