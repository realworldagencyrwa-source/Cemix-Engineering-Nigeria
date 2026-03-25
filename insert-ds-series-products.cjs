require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dsSeriesProducts = [
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 120 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 12.00 m³/min with motor power of 1.13 kW (1.54 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 120",
      "Flow Capacity m³/min": "12.00",
      "Flow Capacity m³/h": "720",
      "Flow Capacity cfm": "424",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.130",
      "Pressure Difference at Full Load psi": "1.885",
      "Power Consumption kW": "1.13",
      "Power Consumption PS": "1.54",
      "Installed Capacity kW": "2.38",
      "Installed Capacity PS": "3.42",
      "Compressed Air Connection": "G 2",
      "Cooling Air Volume m³/h": "2800",
      "Cooling Air Volume cfm": "1646",
      "Dimensions W×D×H mm": "706x1046x1064",
      "Weight kg": "145"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 140 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 14.00 m³/min with motor power of 1.14 kW (1.55 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 140",
      "Flow Capacity m³/min": "14.00",
      "Flow Capacity m³/h": "840",
      "Flow Capacity cfm": "494",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.180",
      "Pressure Difference at Full Load psi": "2.610",
      "Power Consumption kW": "1.14",
      "Power Consumption PS": "1.55",
      "Installed Capacity kW": "2.38",
      "Installed Capacity PS": "3.42",
      "Compressed Air Connection": "G 2",
      "Cooling Air Volume m³/h": "2800",
      "Cooling Air Volume cfm": "1646",
      "Dimensions W×D×H mm": "706x1046x1064",
      "Weight kg": "145"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 180 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 18.00 m³/min with motor power of 1.46 kW (1.99 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 180",
      "Flow Capacity m³/min": "18.00",
      "Flow Capacity m³/h": "1080",
      "Flow Capacity cfm": "636",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.230",
      "Pressure Difference at Full Load psi": "3.335",
      "Power Consumption kW": "1.46",
      "Power Consumption PS": "1.99",
      "Installed Capacity kW": "3.02",
      "Installed Capacity PS": "4.11",
      "Compressed Air Connection": "G 2",
      "Cooling Air Volume m³/h": "4000",
      "Cooling Air Volume cfm": "2352",
      "Dimensions W×D×H mm": "706x1046x1064",
      "Weight kg": "155"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 220 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 22.00 m³/min with motor power of 1.68 kW (2.28 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 220",
      "Flow Capacity m³/min": "22.00",
      "Flow Capacity m³/h": "1320",
      "Flow Capacity cfm": "777",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.090",
      "Pressure Difference at Full Load psi": "1.305",
      "Power Consumption kW": "1.68",
      "Power Consumption PS": "2.28",
      "Installed Capacity kW": "3.41",
      "Installed Capacity PS": "4.64",
      "Compressed Air Connection": "G 2 1/2",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "806x1160x1316",
      "Weight kg": "230"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 260 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 26.00 m³/min with motor power of 2.19 kW (2.98 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 260",
      "Flow Capacity m³/min": "26.00",
      "Flow Capacity m³/h": "1560",
      "Flow Capacity cfm": "918",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.130",
      "Pressure Difference at Full Load psi": "1.885",
      "Power Consumption kW": "2.19",
      "Power Consumption PS": "2.98",
      "Installed Capacity kW": "4.47",
      "Installed Capacity PS": "6.08",
      "Compressed Air Connection": "G 2 1/2",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "806x1160x1316",
      "Weight kg": "240"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 300 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 30.17 m³/min with motor power of 2.41 kW (3.28 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 300",
      "Flow Capacity m³/min": "30.17",
      "Flow Capacity m³/h": "1810",
      "Flow Capacity cfm": "1065",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.170",
      "Pressure Difference at Full Load psi": "2.465",
      "Power Consumption kW": "2.41",
      "Power Consumption PS": "3.28",
      "Installed Capacity kW": "5.27",
      "Installed Capacity PS": "7.17",
      "Compressed Air Connection": "G 2 1/2",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "806x1160x1316",
      "Weight kg": "245"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 360 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 35.00 m³/min with motor power of 3.06 kW (4.16 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 360",
      "Flow Capacity m³/min": "35.00",
      "Flow Capacity m³/h": "2100",
      "Flow Capacity cfm": "1236",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.240",
      "Pressure Difference at Full Load psi": "3.480",
      "Power Consumption kW": "3.06",
      "Power Consumption PS": "4.16",
      "Installed Capacity kW": "6.26",
      "Installed Capacity PS": "8.51",
      "Compressed Air Connection": "G 2 1/2",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "806x1160x1316",
      "Weight kg": "250"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 460 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 46.00 m³/min with motor power of 3.14 kW (4.27 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 460",
      "Flow Capacity m³/min": "46.00",
      "Flow Capacity m³/h": "2760",
      "Flow Capacity cfm": "1624",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.140",
      "Pressure Difference at Full Load psi": "2.030",
      "Power Consumption kW": "3.14",
      "Power Consumption PS": "4.27",
      "Installed Capacity kW": "6.26",
      "Installed Capacity PS": "8.51",
      "Compressed Air Connection": "DN 100",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "1007x1245x1723",
      "Weight kg": "470"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 520 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 52.00 m³/min with motor power of 3.54 kW (4.81 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 520",
      "Flow Capacity m³/min": "52.00",
      "Flow Capacity m³/h": "3120",
      "Flow Capacity cfm": "1836",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.180",
      "Pressure Difference at Full Load psi": "2.610",
      "Power Consumption kW": "3.54",
      "Power Consumption PS": "4.81",
      "Installed Capacity kW": "7.46",
      "Installed Capacity PS": "10.15",
      "Compressed Air Connection": "DN 100",
      "Cooling Air Volume m³/h": "7050",
      "Cooling Air Volume cfm": "4145",
      "Dimensions W×D×H mm": "1007x1245x1723",
      "Weight kg": "490"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 630 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 63.00 m³/min with motor power of 4.64 kW (6.31 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 630",
      "Flow Capacity m³/min": "63.00",
      "Flow Capacity m³/h": "3780",
      "Flow Capacity cfm": "2225",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.260",
      "Pressure Difference at Full Load psi": "3.770",
      "Power Consumption kW": "4.64",
      "Power Consumption PS": "6.31",
      "Installed Capacity kW": "9.92",
      "Installed Capacity PS": "13.49",
      "Compressed Air Connection": "DN 100",
      "Cooling Air Volume m³/h": "14100",
      "Cooling Air Volume cfm": "8291",
      "Dimensions W×D×H mm": "1007x1657x1810",
      "Weight kg": "580"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 750 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 75.00 m³/min with motor power of 5.73 kW (7.79 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 750",
      "Flow Capacity m³/min": "75.00",
      "Flow Capacity m³/h": "4500",
      "Flow Capacity cfm": "2648",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.160",
      "Pressure Difference at Full Load psi": "2.320",
      "Power Consumption kW": "5.73",
      "Power Consumption PS": "7.79",
      "Installed Capacity kW": "11.32",
      "Installed Capacity PS": "15.40",
      "Compressed Air Connection": "DN 150",
      "Cooling Air Volume m³/h": "14100",
      "Cooling Air Volume cfm": "8291",
      "Dimensions W×D×H mm": "1007x1657x1810",
      "Weight kg": "670"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 900 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 90.00 m³/min with motor power of 7.63 kW (10.38 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 900",
      "Flow Capacity m³/min": "90.00",
      "Flow Capacity m³/h": "5400",
      "Flow Capacity cfm": "3178",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.230",
      "Pressure Difference at Full Load psi": "3.335",
      "Power Consumption kW": "7.63",
      "Power Consumption PS": "10.38",
      "Installed Capacity kW": "16.26",
      "Installed Capacity PS": "22.11",
      "Compressed Air Connection": "DN 150",
      "Cooling Air Volume m³/h": "19000",
      "Cooling Air Volume cfm": "11172",
      "Dimensions W×D×H mm": "1007x1657x1810",
      "Weight kg": "690"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 1200 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 120.00 m³/min with motor power of 8.92 kW (12.13 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 1200",
      "Flow Capacity m³/min": "120.00",
      "Flow Capacity m³/h": "7200",
      "Flow Capacity cfm": "4237",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.230",
      "Pressure Difference at Full Load psi": "3.335",
      "Power Consumption kW": "8.92",
      "Power Consumption PS": "12.13",
      "Installed Capacity kW": "19.26",
      "Installed Capacity PS": "26.19",
      "Compressed Air Connection": "DN 150",
      "Cooling Air Volume m³/h": "19000",
      "Cooling Air Volume cfm": "11172",
      "Dimensions W×D×H mm": "1007x1657x1810",
      "Weight kg": "830"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 1500 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 150.00 m³/min with motor power of 12.35 kW (16.80 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 1500",
      "Flow Capacity m³/min": "150.00",
      "Flow Capacity m³/h": "9000",
      "Flow Capacity cfm": "5297",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.200",
      "Pressure Difference at Full Load psi": "2.900",
      "Power Consumption kW": "12.35",
      "Power Consumption PS": "16.80",
      "Installed Capacity kW": "25.64",
      "Installed Capacity PS": "34.87",
      "Compressed Air Connection": "DN 200",
      "Cooling Air Volume m³/h": "28500",
      "Cooling Air Volume cfm": "16758",
      "Dimensions W×D×H mm": "1007x2257x2208",
      "Weight kg": "1100"
    })
  },
  {
    brand: 'Boge',
    name: 'BOGE DS Series — DS 1800 — 14 bar',
    category: 'DS Series',
    description: 'BOGE DS series rotary screw compressors are designed for industrial reliability and efficient compressed air delivery, optimized for continuous operation and stable performance. This configuration provides an effective free air delivery of 180.00 m³/min with motor power of 15.96 kW (21.71 PS), operating at 14 bar maximum pressure.',
    image_url: '/assets/boge-s20.jpg',
    price: 'Contact for pricing',
    availability: 'In Stock',
    specifications: JSON.stringify({
      "Model": "DS 1800",
      "Flow Capacity m³/min": "180.00",
      "Flow Capacity m³/h": "10800",
      "Flow Capacity cfm": "6356",
      "Max Pressure bar": "14",
      "Pressure Difference at Full Load bar": "0.260",
      "Pressure Difference at Full Load psi": "3.770",
      "Power Consumption kW": "15.96",
      "Power Consumption PS": "21.71",
      "Installed Capacity kW": "31.04",
      "Installed Capacity PS": "42.21",
      "Compressed Air Connection": "DN 200",
      "Cooling Air Volume m³/h": "28500",
      "Cooling Air Volume cfm": "16758",
      "Dimensions W×D×H mm": "1007x2257x2208",
      "Weight kg": "1190"
    })
  }
];

async function insertDSSeriesProducts() {
  console.log('Starting DS Series products insertion...');
  console.log(`Total products to insert: ${dsSeriesProducts.length}`);

  try {
    const { data, error } = await supabase
      .from('products')
      .insert(dsSeriesProducts)
      .select();

    if (error) {
      console.error('Error inserting products:', error);
      process.exit(1);
    }

    console.log(`✓ Successfully inserted ${data.length} DS Series products`);
    console.log('\nProducts inserted:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

insertDSSeriesProducts();
