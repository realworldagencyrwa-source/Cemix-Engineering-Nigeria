const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Format specifications as text (not JSON)
function formatSpecs(specs) {
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

const s4Products = [
  // S 160-4 models (160 kW) - sorted by pressure desc
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 LF — 13 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.0 - 21.2 m³/min with a rated output of 160 kW, operating at 13 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4 LF",
      "Max Pressure": "13 bar",
      "Effective Free Air Delivery": "5.0 - 21.2 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3750 kg",
      "Weight with super sound insulation": "3800 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 — 13 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 21.2 m³/min with a rated output of 160 kW, operating at 13 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4",
      "Max Pressure": "13 bar",
      "Effective Free Air Delivery": "21.2 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3700 kg",
      "Weight with super sound insulation": "3750 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 L — 13 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 19.3 m³/min with a rated output of 160 kW, operating at 13 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4 L",
      "Max Pressure": "13 bar",
      "Effective Free Air Delivery": "19.3 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3600 kg",
      "Weight with super sound insulation": "3650 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 LF — 10 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.3 - 25.1 m³/min with a rated output of 160 kW, operating at 10 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4 LF",
      "Max Pressure": "10 bar",
      "Effective Free Air Delivery": "5.3 - 25.1 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3750 kg",
      "Weight with super sound insulation": "3800 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 — 10 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 25.0 m³/min with a rated output of 160 kW, operating at 10 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4",
      "Max Pressure": "10 bar",
      "Effective Free Air Delivery": "25.0 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3700 kg",
      "Weight with super sound insulation": "3750 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 LF — 7.5 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.5 - 27.7 m³/min with a rated output of 160 kW, operating at 7.5 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4 LF",
      "Max Pressure": "7.5 bar",
      "Effective Free Air Delivery": "5.5 - 27.7 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3750 kg",
      "Weight with super sound insulation": "3800 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 160–4 — 7.5 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 28.1 m³/min with a rated output of 160 kW, operating at 7.5 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 160–4",
      "Max Pressure": "7.5 bar",
      "Effective Free Air Delivery": "28.1 m³/min",
      "Rated Output": "160 kW",
      "Fan Motor": "5.5 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3700 kg",
      "Weight with super sound insulation": "3750 kg"
    })
  },
  // S 132-4 models (132 kW)
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 LF — 13 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.0 - 17.9 m³/min with a rated output of 132 kW, operating at 13 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4 LF",
      "Max Pressure": "13 bar",
      "Effective Free Air Delivery": "5.0 - 17.9 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 — 13 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 17.2 m³/min with a rated output of 132 kW, operating at 13 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4",
      "Max Pressure": "13 bar",
      "Effective Free Air Delivery": "17.2 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 LF — 10 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.3 - 21.8 m³/min with a rated output of 132 kW, operating at 10 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4 LF",
      "Max Pressure": "10 bar",
      "Effective Free Air Delivery": "5.3 - 21.8 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 — 10 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 21.7 m³/min with a rated output of 132 kW, operating at 10 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4",
      "Max Pressure": "10 bar",
      "Effective Free Air Delivery": "21.7 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 L — 10 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 20.2 m³/min with a rated output of 132 kW, operating at 10 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4 L",
      "Max Pressure": "10 bar",
      "Effective Free Air Delivery": "20.2 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3550 kg",
      "Weight with super sound insulation": "3600 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 LF — 7.5 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 5.5 - 25.0 m³/min with a rated output of 132 kW, operating at 7.5 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4 LF",
      "Max Pressure": "7.5 bar",
      "Effective Free Air Delivery": "5.5 - 25.0 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2980 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE S-4 Series — S 132–4 — 7.5 bar',
    category: 'Air Compressor',
    description: 'BOGE S-4 series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance.\n\nThis configuration provides an effective free air delivery of 24.1 m³/min with a rated output of 132 kW, operating at 7.5 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    featured: true,
    specifications: formatSpecs({
      "Type": "S 132–4",
      "Max Pressure": "7.5 bar",
      "Effective Free Air Delivery": "24.1 m³/min",
      "Rated Output": "132 kW",
      "Fan Motor": "3.0 kW",
      "Dimensions (W × D × H)": "2930 x 1620 x 1990 mm",
      "Compressed Air Outlet": "DN 80",
      "Weight with sound insulation": "3650 kg",
      "Weight with super sound insulation": "3700 kg"
    })
  }
  // ... Continue with remaining models in next part
];

async function insertProducts() {
  console.log(`Starting insert of ${s4Products.length} S-4 Series products (Part 1 of 3)...`);

  for (const product of s4Products) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select();

    if (error) {
      console.error(`❌ Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`✓ Inserted: ${product.name}`);
    }
  }

  console.log('\n✅ Complete! First batch of S-4 Series products inserted.');
  console.log('Note: This is Part 1 (14 products). Parts 2 and 3 coming next...');
}

insertProducts();
