const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cflpphrddekccakfkkjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw';

const supabase = createClient(supabaseUrl, supabaseKey);

const missingProducts = [
  // C 12-2 L N models
  {
    name: 'BOGE C 12-2 L N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 L N rotary screw compressor with 15 hp motor, delivering 69 cfm at 100 PSI. Features integrated lubrication system for optimal performance.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 69 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1140 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 12-2 L N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 L N rotary screw compressor with 15 hp motor, delivering 67 cfm at 150 PSI. Features integrated lubrication system for optimal performance.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 67 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1140 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },

  // C 12-2 LF N models
  {
    name: 'BOGE C 12-2 LF N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 LF N rotary screw compressor with 15 hp motor, delivering 19-73 cfm at 100 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 19-73 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 12-2 LF N – 110 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 LF N rotary screw compressor with 15 hp motor, delivering 19-71 cfm at 110 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 19-71 cfm at 110 PSI
Maximum Pressure: 110 PSI (7.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 12-2 LF N – 125 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 LF N rotary screw compressor with 15 hp motor, delivering 19-67 cfm at 125 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 19-67 cfm at 125 PSI
Maximum Pressure: 125 PSI (8.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 12-2 LF N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 LF N rotary screw compressor with 15 hp motor, delivering 19-59 cfm at 150 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 19-59 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 12-2 LF N – 190 PSI',
    brand: 'Boge',
    description: 'BOGE C 12-2 LF N rotary screw compressor with 15 hp motor, delivering 19-46 cfm at 190 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 15 hp
Effective Free Air Delivery: 19-46 cfm at 190 PSI
Maximum Pressure: 190 PSI (13.1 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 63 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },

  // C 15-2 L N models
  {
    name: 'BOGE C 15-2 L N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 L N rotary screw compressor with 20 hp motor, delivering 79 cfm at 100 PSI. Features integrated lubrication system for optimal performance.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 79 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1140 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 15-2 L N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 L N rotary screw compressor with 20 hp motor, delivering 77 cfm at 150 PSI. Features integrated lubrication system for optimal performance.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 77 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1140 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },

  // C 15-2 LF N models
  {
    name: 'BOGE C 15-2 LF N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 LF N rotary screw compressor with 20 hp motor, delivering 19-95 cfm at 100 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 19-95 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 15-2 LF N – 110 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 LF N rotary screw compressor with 20 hp motor, delivering 19-92 cfm at 110 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 19-92 cfm at 110 PSI
Maximum Pressure: 110 PSI (7.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 15-2 LF N – 125 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 LF N rotary screw compressor with 20 hp motor, delivering 19-87 cfm at 125 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 19-87 cfm at 125 PSI
Maximum Pressure: 125 PSI (8.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 15-2 LF N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 LF N rotary screw compressor with 20 hp motor, delivering 18-78 cfm at 150 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 18-78 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 15-2 LF N – 190 PSI',
    brand: 'Boge',
    description: 'BOGE C 15-2 LF N rotary screw compressor with 20 hp motor, delivering 18-67 cfm at 190 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 20 hp
Effective Free Air Delivery: 18-67 cfm at 190 PSI
Maximum Pressure: 190 PSI (13.1 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 65 dB(A)
Weight: 1228 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },

  // C 18-2 LF N models
  {
    name: 'BOGE C 18-2 LF N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 18-2 LF N rotary screw compressor with 25 hp motor, delivering 19-115 cfm at 100 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 25 hp
Effective Free Air Delivery: 19-115 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 68 dB(A)
Weight: 1250 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 18-2 LF N – 110 PSI',
    brand: 'Boge',
    description: 'BOGE C 18-2 LF N rotary screw compressor with 25 hp motor, delivering 19-112 cfm at 110 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 25 hp
Effective Free Air Delivery: 19-112 cfm at 110 PSI
Maximum Pressure: 110 PSI (7.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 68 dB(A)
Weight: 1250 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 18-2 LF N – 125 PSI',
    brand: 'Boge',
    description: 'BOGE C 18-2 LF N rotary screw compressor with 25 hp motor, delivering 19-106 cfm at 125 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 25 hp
Effective Free Air Delivery: 19-106 cfm at 125 PSI
Maximum Pressure: 125 PSI (8.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 68 dB(A)
Weight: 1250 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 18-2 LF N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 18-2 LF N rotary screw compressor with 25 hp motor, delivering 18-93 cfm at 150 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 25 hp
Effective Free Air Delivery: 18-93 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 68 dB(A)
Weight: 1250 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 18-2 LF N – 190 PSI',
    brand: 'Boge',
    description: 'BOGE C 18-2 LF N rotary screw compressor with 25 hp motor, delivering 25-82 cfm at 190 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 25 hp
Effective Free Air Delivery: 25-82 cfm at 190 PSI
Maximum Pressure: 190 PSI (13.1 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 68 dB(A)
Weight: 1250 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },

  // C 22-2 LF N models
  {
    name: 'BOGE C 22-2 LF N – 100 PSI',
    brand: 'Boge',
    description: 'BOGE C 22-2 LF N rotary screw compressor with 30 hp motor, delivering 19-135 cfm at 100 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 30 hp
Effective Free Air Delivery: 19-135 cfm at 100 PSI
Maximum Pressure: 100 PSI (6.9 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 69 dB(A)
Weight: 1327 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 22-2 LF N – 110 PSI',
    brand: 'Boge',
    description: 'BOGE C 22-2 LF N rotary screw compressor with 30 hp motor, delivering 19-131 cfm at 110 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 30 hp
Effective Free Air Delivery: 19-131 cfm at 110 PSI
Maximum Pressure: 110 PSI (7.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 69 dB(A)
Weight: 1327 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 22-2 LF N – 125 PSI',
    brand: 'Boge',
    description: 'BOGE C 22-2 LF N rotary screw compressor with 30 hp motor, delivering 19-124 cfm at 125 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 30 hp
Effective Free Air Delivery: 19-124 cfm at 125 PSI
Maximum Pressure: 125 PSI (8.6 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 69 dB(A)
Weight: 1327 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 22-2 LF N – 150 PSI',
    brand: 'Boge',
    description: 'BOGE C 22-2 LF N rotary screw compressor with 30 hp motor, delivering 18-108 cfm at 150 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 30 hp
Effective Free Air Delivery: 18-108 cfm at 150 PSI
Maximum Pressure: 150 PSI (10.3 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 69 dB(A)
Weight: 1327 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE C 22-2 LF N – 190 PSI',
    brand: 'Boge',
    description: 'BOGE C 22-2 LF N rotary screw compressor with 30 hp motor, delivering 25-97 cfm at 190 PSI. Features integrated lubrication and frequency control.',
    specifications: `Motor Power: 30 hp
Effective Free Air Delivery: 25-97 cfm at 190 PSI
Maximum Pressure: 190 PSI (13.1 bar)
Dimensions: 63.4" x 36" x 54.3"
Compressed Air Outlet: NPT 1"
Sound Pressure Level: 69 dB(A)
Weight: 1327 lbs`,
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  }
];

async function insertProducts() {
  console.log(`Inserting ${missingProducts.length} missing C-2 Series products...`);

  const { data, error } = await supabase
    .from('products')
    .insert(missingProducts)
    .select();

  if (error) {
    console.error('Error inserting products:', error);
    return;
  }

  console.log(`✓ Successfully inserted ${data.length} products`);

  // Verify total count
  const { data: allC2, error: countError } = await supabase
    .from('products')
    .select('name')
    .eq('brand', 'Boge')
    .ilike('name', '%C _%-2 %');

  if (!countError) {
    console.log(`\nTotal C-2 Series products now: ${allC2.length}`);
  }
}

insertProducts();
