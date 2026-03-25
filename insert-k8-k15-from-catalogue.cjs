const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const products = [
  {
    name: "BOGE K8 — 10 bar (150 psig)",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-performance reciprocating compressor with excellent efficiency and reliability. Ideal for industrial applications requiring consistent compressed air supply.",
    specifications: JSON.stringify({
      "Receiver volume": "—",
      "Max. pressure": "10 bar (150 psig)",
      "Effective free air delivery": "648 l/min (23.0 cfm)",
      "Nominal output drive motor": "5.5 kW (7.5 HP)",
      "Dimensions silenced": "1012 x 804 x 784 mm (W x D x H)",
      "Dimensions super-silenced": "1312 x 804 x 784 mm (W x D x H)",
      "Weight silenced": "225 kg",
      "Weight super-silenced": "232 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K8 — 40 bar (600 psig)",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-pressure reciprocating compressor designed for demanding applications requiring compressed air at elevated pressures.",
    specifications: JSON.stringify({
      "Receiver volume": "—",
      "Max. pressure": "40 bar (600 psig)",
      "Effective free air delivery": "390 l/min (14.0 cfm)",
      "Nominal output drive motor": "5.5 kW (7.5 HP)",
      "Dimensions silenced": "1012 x 804 x 784 mm (W x D x H)",
      "Dimensions super-silenced": "1312 x 804 x 784 mm (W x D x H)",
      "Weight silenced": "232 kg",
      "Weight super-silenced": "239 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15 — 10 bar (150 psig)",
    brand: "Boge",
    category: "Air Compressor",
    description: "Powerful reciprocating compressor with high air delivery capacity for large-scale industrial operations.",
    specifications: JSON.stringify({
      "Receiver volume": "—",
      "Max. pressure": "10 bar (150 psig)",
      "Effective free air delivery": "1296 l/min (46.0 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1497 x 806 x 891 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 891 mm (W x D x H)",
      "Weight silenced": "379 kg",
      "Weight super-silenced": "391 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15 — 15 bar (220 psig)",
    brand: "Boge",
    category: "Air Compressor",
    description: "Medium-pressure reciprocating compressor optimized for applications requiring higher pressure compressed air.",
    specifications: JSON.stringify({
      "Receiver volume": "—",
      "Max. pressure": "15 bar (220 psig)",
      "Effective free air delivery": "794 l/min (28.0 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1497 x 806 x 891 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 891 mm (W x D x H)",
      "Weight silenced": "380 kg",
      "Weight super-silenced": "392 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15 — 40 bar (600 psig)",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-pressure industrial reciprocating compressor for specialized applications requiring maximum pressure output.",
    specifications: JSON.stringify({
      "Receiver volume": "—",
      "Max. pressure": "40 bar (600 psig)",
      "Effective free air delivery": "780 l/min (27.5 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1497 x 806 x 891 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 891 mm (W x D x H)",
      "Weight silenced": "380 kg",
      "Weight super-silenced": "392 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K8- — 10 bar (150 psig) — 270L",
    brand: "Boge",
    category: "Air Compressor",
    description: "Reciprocating compressor with integrated 270L receiver tank for enhanced air storage capacity and reduced cycling.",
    specifications: JSON.stringify({
      "Receiver volume": "270 Litres",
      "Max. pressure": "10 bar (150 psig)",
      "Effective free air delivery": "648 l/min (23.0 cfm)",
      "Nominal output drive motor": "5.5 kW (7.5 HP)",
      "Dimensions silenced": "1770 x 804 x 1346 mm (W x D x H)",
      "Dimensions super-silenced": "1770 x 804 x 1346 mm (W x D x H)",
      "Weight silenced": "330 kg",
      "Weight super-silenced": "337 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K8- — 40 bar (600 psig) — 250L",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-pressure reciprocating compressor with 250L receiver tank for applications requiring both high pressure and air storage.",
    specifications: JSON.stringify({
      "Receiver volume": "250 Litres",
      "Max. pressure": "40 bar (600 psig)",
      "Effective free air delivery": "390 l/min (14.0 cfm)",
      "Nominal output drive motor": "5.5 kW (7.5 HP)",
      "Dimensions silenced": "1630 x 804 x 1346 mm (W x D x H)",
      "Dimensions super-silenced": "1630 x 804 x 1346 mm (W x D x H)",
      "Weight silenced": "470 kg",
      "Weight super-silenced": "477 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15- — 10 bar (150 psig) — 270L",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-capacity reciprocating compressor with 270L receiver for maximum air delivery and storage in industrial settings.",
    specifications: JSON.stringify({
      "Receiver volume": "270 Litres",
      "Max. pressure": "10 bar (150 psig)",
      "Effective free air delivery": "1296 l/min (46.0 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1770 x 806 x 1453 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 1453 mm (W x D x H)",
      "Weight silenced": "490 kg",
      "Weight super-silenced": "502 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15- — 15 bar (220 psig) — 250L",
    brand: "Boge",
    category: "Air Compressor",
    description: "Medium-pressure reciprocating compressor with 250L receiver tank for balanced pressure and air storage capacity.",
    specifications: JSON.stringify({
      "Receiver volume": "250 Litres",
      "Max. pressure": "15 bar (220 psig)",
      "Effective free air delivery": "794 l/min (28.0 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1510 x 806 x 1453 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 1453 mm (W x D x H)",
      "Weight silenced": "510 kg",
      "Weight super-silenced": "522 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  },
  {
    name: "BOGE K15- — 40 bar (600 psig) — 250L",
    brand: "Boge",
    category: "Air Compressor",
    description: "High-pressure reciprocating compressor with 250L receiver tank for demanding applications requiring maximum pressure and air storage.",
    specifications: JSON.stringify({
      "Receiver volume": "250 Litres",
      "Max. pressure": "40 bar (600 psig)",
      "Effective free air delivery": "780 l/min (27.5 cfm)",
      "Nominal output drive motor": "11.0 kW (15.0 HP)",
      "Dimensions silenced": "1560 x 806 x 1453 mm (W x D x H)",
      "Dimensions super-silenced": "2097 x 806 x 1453 mm (W x D x H)",
      "Weight silenced": "590 kg",
      "Weight super-silenced": "602 kg"
    }),
    image_url: "/assets/Screenshot_2026-02-19_214335 copy.png",
    price: "Contact for pricing",
    availability: "In Stock",
    featured: false
  }
];

async function insertProducts() {
  console.log(`Inserting ${products.length} K8-K15 series products...`);

  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error('Error inserting products:', error);
    return;
  }

  console.log(`✓ Successfully inserted ${data.length} products`);
  data.forEach(p => console.log(`  - ${p.name}`));

  const { data: allProducts, error: queryError } = await supabase
    .from('products')
    .select('id, name')
    .or('name.ilike.%K8%,name.ilike.%K15%');

  if (queryError) {
    console.error('Error querying products:', queryError);
  } else {
    console.log(`\nTotal K8-K15 products in database: ${allProducts.length}`);
  }
}

insertProducts();
