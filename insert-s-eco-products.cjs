const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const secoProducts = [
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

async function insertProducts() {
  console.log('Starting S-eco series product insertion...');
  console.log(`Total products to insert: ${secoProducts.length}`);

  const { data, error } = await supabase
    .from('products')
    .insert(secoProducts)
    .select();

  if (error) {
    console.error('Error inserting products:', error);
    process.exit(1);
  }

  console.log(`Successfully inserted ${data.length} S-eco series products`);
  console.log('Products:', data.map(p => p.name));
}

insertProducts();
