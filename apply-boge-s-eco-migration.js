import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

// 26 BOGE S-eco series products
const products = [
  {
    name: 'BOGE S-eco — S 30 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 4.8 m³/min and motor power 30 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 4.8 m³/min
Motor Power: 30 kW
Dimensions: 1250x850x1335 mm
Weight: 590 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 30 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 4.1 m³/min and motor power 30 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 4.1 m³/min
Motor Power: 30 kW
Dimensions: 1250x850x1335 mm
Weight: 590 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 22 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 3.3 m³/min and motor power 22 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 3.3 m³/min
Motor Power: 22 kW
Dimensions: 1250x850x1335 mm
Weight: 440 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 22 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 3.1 m³/min and motor power 22 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 3.1 m³/min
Motor Power: 22 kW
Dimensions: 1250x850x1335 mm
Weight: 440 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 18 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 3 m³/min and motor power 18.5 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 3 m³/min
Motor Power: 18.5 kW
Dimensions: 1250x850x1335 mm
Weight: 400 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 18 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 2.6 m³/min and motor power 18.5 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 2.6 m³/min
Motor Power: 18.5 kW
Dimensions: 1250x850x1335 mm
Weight: 400 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 15 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 2.1 m³/min and motor power 15 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 2.1 m³/min
Motor Power: 15 kW
Dimensions: 1240x650x950 mm
Weight: 325 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 15 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 1.95 m³/min and motor power 15 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1.95 m³/min
Motor Power: 15 kW
Dimensions: 1240x650x950 mm
Weight: 325 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 11 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 1.65 m³/min and motor power 11 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 1.65 m³/min
Motor Power: 11 kW
Dimensions: 1240x650x950 mm
Weight: 280 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 11 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 1.45 m³/min and motor power 11 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1.45 m³/min
Motor Power: 11 kW
Dimensions: 1240x650x950 mm
Weight: 280 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 7 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 1.1 m³/min and motor power 7.5 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 1.1 m³/min
Motor Power: 7.5 kW
Dimensions: 1240x650x950 mm
Weight: 270 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 7 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 1 m³/min and motor power 7.5 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1 m³/min
Motor Power: 7.5 kW
Dimensions: 1240x650x950 mm
Weight: 270 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 5 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 0.8 m³/min and motor power 5.5 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 0.8 m³/min
Motor Power: 5.5 kW
Dimensions: 1240x650x950 mm
Weight: 267 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 5 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 0.7 m³/min and motor power 5.5 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 0.7 m³/min
Motor Power: 5.5 kW
Dimensions: 1240x650x950 mm
Weight: 267 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 4 eco — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 7.5 bar with effective air delivery of 0.6 m³/min and motor power 4 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 0.6 m³/min
Motor Power: 4 kW
Dimensions: 1240x650x950 mm
Weight: 246 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 4 eco — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Standard compressor configuration designed for flexible installation and easy operation. Operating at 10 bar with effective air delivery of 0.49 m³/min and motor power 4 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 0.49 m³/min
Motor Power: 4 kW
Dimensions: 1240x650x950 mm
Weight: 246 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 15 eco DR — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 7.5 bar with effective air delivery of 2.1 m³/min and motor power 15 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 2.1 m³/min
Motor Power: 15 kW
Dimensions: 1885x650x1425 mm
Weight: 467 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 15 eco DR — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 10 bar with effective air delivery of 1.95 m³/min and motor power 15 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1.95 m³/min
Motor Power: 15 kW
Dimensions: 1885x650x1425 mm
Weight: 467 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 11 eco DR — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 7.5 bar with effective air delivery of 1.65 m³/min and motor power 11 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 1.65 m³/min
Motor Power: 11 kW
Dimensions: 1885x650x1425 mm
Weight: 452 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 11 eco DR — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 10 bar with effective air delivery of 1.45 m³/min and motor power 11 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1.45 m³/min
Motor Power: 11 kW
Dimensions: 1885x650x1425 mm
Weight: 452 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 7 eco DR — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 7.5 bar with effective air delivery of 1.1 m³/min and motor power 7.5 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 1.1 m³/min
Motor Power: 7.5 kW
Dimensions: 1885x650x1425 mm
Weight: 410 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 7 eco DR — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 10 bar with effective air delivery of 1 m³/min and motor power 7.5 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 1 m³/min
Motor Power: 7.5 kW
Dimensions: 1885x650x1425 mm
Weight: 410 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 5 eco DR — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 7.5 bar with effective air delivery of 0.8 m³/min and motor power 5.5 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 0.8 m³/min
Motor Power: 5.5 kW
Dimensions: 1885x650x1425 mm
Weight: 397 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 5 eco DR — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 10 bar with effective air delivery of 0.7 m³/min and motor power 5.5 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 0.7 m³/min
Motor Power: 5.5 kW
Dimensions: 1885x650x1425 mm
Weight: 397 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 4 eco DR — 7.5 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 7.5 bar with effective air delivery of 0.6 m³/min and motor power 4 kW.',
    specifications: `Pressure: 7.5 bar
Effective Free Air Delivery: 0.6 m³/min
Motor Power: 4 kW
Dimensions: 1885x650x1425 mm
Weight: 376 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  },
  {
    name: 'BOGE S-eco — S 4 eco DR — 10 bar',
    brand: 'Boge',
    category: 'Air Compressor',
    description: 'Compact and reliable rotary screw compressor system designed for efficient industrial compressed air supply. Includes integrated refrigerated dryer and horizontal receiver tank for a complete compressed air station. Operating at 10 bar with effective air delivery of 0.49 m³/min and motor power 4 kW.',
    specifications: `Pressure: 10 bar
Effective Free Air Delivery: 0.49 m³/min
Motor Power: 4 kW
Dimensions: 1885x650x1425 mm
Weight: 376 kg`,
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: false
  }
];

async function applyMigration() {
  try {
    console.log('Adding 26 BOGE S-eco series products to the database...');

    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) {
      console.error('Error inserting products:', error);
      process.exit(1);
    }

    console.log(`Successfully added ${data.length} products to the S-eco series!`);
    console.log('\nProducts added:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
    });
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

applyMigration();
