const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const k8K15Products = [
  // K8 Series (Standard)
  {
    name: 'BOGE K8 — K 8 — 10 bar (150 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K8 series is a compact and efficient piston compressor designed for reliable compressed air supply in small to medium industrial applications. This model delivers free air delivery of 648 l/min (23 cfm) at 10 bar with 5.5 kW (7.5 HP) motor power.',
    specifications: `Maximum Pressure: 10 bar (150 psig)
Effective free air delivery: 648 l/min (23.0 cfm)
Nominal output drive motor: 5.5 kW (7.5 HP)
Receiver volume: Varies (see dimensions table)
Dimensions silenced: 1012 × 804 × 784 mm (39.8 × 31.7 × 30.9 in)
Dimensions super-silenced: 1312 × 804 × 784 mm (51.7 × 31.7 × 30.9 in)
Weight silenced: 225 kg (496 lbs)
Weight super-silenced: 232 kg (511 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K8 — K 8 — 40 bar (600 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K8 series is a compact and efficient piston compressor designed for reliable compressed air supply in small to medium industrial applications. This model delivers free air delivery of 390 l/min (14 cfm) at 40 bar with 5.5 kW (7.5 HP) motor power.',
    specifications: `Maximum Pressure: 40 bar (600 psig)
Effective free air delivery: 390 l/min (14.0 cfm)
Nominal output drive motor: 5.5 kW (7.5 HP)
Receiver volume: Varies (see dimensions table)
Dimensions silenced: 1012 × 804 × 784 mm (39.8 × 31.7 × 30.9 in)
Dimensions super-silenced: 1312 × 804 × 784 mm (51.7 × 31.7 × 30.9 in)
Weight silenced: 232 kg (511 lbs)
Weight super-silenced: 239 kg (527 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  // K15 Series (Standard)
  {
    name: 'BOGE K15 — K 15 — 7 bar (100 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15 series is a robust and efficient piston compressor designed for demanding industrial applications requiring higher air delivery. This model delivers free air delivery of 1296 l/min (46 cfm) at 7 bar with 11.0 kW (15 HP) motor power.',
    specifications: `Maximum Pressure: 7 bar (100 psig)
Effective free air delivery: 1296 l/min (46.0 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: Varies (see dimensions table)
Dimensions silenced: 1497 × 806 × 891 mm (58.9 × 31.7 × 35.1 in)
Dimensions super-silenced: 2097 × 806 × 891 mm (82.6 × 31.7 × 35.1 in)
Weight silenced: 379 kg (835 lbs)
Weight super-silenced: 391 kg (862 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K15 — K 15 — 15 bar (220 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15 series is a robust and efficient piston compressor designed for demanding industrial applications requiring higher air delivery. This model delivers free air delivery of 794 l/min (28 cfm) at 15 bar with 11.0 kW (15 HP) motor power.',
    specifications: `Maximum Pressure: 15 bar (220 psig)
Effective free air delivery: 794 l/min (28.0 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: Varies (see dimensions table)
Dimensions silenced: 1497 × 806 × 891 mm (58.9 × 31.7 × 35.1 in)
Dimensions super-silenced: 2097 × 806 × 891 mm (82.6 × 31.7 × 35.1 in)
Weight silenced: 380 kg (838 lbs)
Weight super-silenced: 392 kg (864 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K15 — K 15 — 40 bar (600 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15 series is a robust and efficient piston compressor designed for demanding industrial applications requiring higher air delivery. This model delivers free air delivery of 780 l/min (27.5 cfm) at 40 bar with 11.0 kW (15 HP) motor power.',
    specifications: `Maximum Pressure: 40 bar (600 psig)
Effective free air delivery: 780 l/min (27.5 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: Varies (see dimensions table)
Dimensions silenced: 1497 × 806 × 891 mm (58.9 × 31.7 × 35.1 in)
Dimensions super-silenced: 2097 × 806 × 891 mm (82.6 × 31.7 × 35.1 in)
Weight silenced: 380 kg (838 lbs)
Weight super-silenced: 392 kg (864 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  // K8- Series (with receiver)
  {
    name: 'BOGE K8 — K 8- — 10 bar (150 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K8- series is a compact and efficient piston compressor with integrated receiver tank designed for reliable compressed air supply. This model delivers free air delivery of 648 l/min (23 cfm) at 10 bar with 5.5 kW (7.5 HP) motor power and includes a 270L receiver volume.',
    specifications: `Maximum Pressure: 10 bar (150 psig)
Effective free air delivery: 648 l/min (23.0 cfm)
Nominal output drive motor: 5.5 kW (7.5 HP)
Receiver volume: 270 litres
Dimensions silenced: 1770 × 804 × 1346 mm (69.7 × 31.7 × 53.0 in)
Dimensions super-silenced: 1770 × 804 × 1346 mm (69.7 × 31.7 × 53.0 in)
Weight silenced: 330 kg (728 lbs)
Weight super-silenced: 337 kg (743 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K8 — K 8- — 40 bar (600 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K8- series is a compact and efficient piston compressor with integrated receiver tank designed for reliable compressed air supply. This model delivers free air delivery of 390 l/min (14 cfm) at 40 bar with 5.5 kW (7.5 HP) motor power and includes a 290L receiver volume.',
    specifications: `Maximum Pressure: 40 bar (600 psig)
Effective free air delivery: 390 l/min (14.0 cfm)
Nominal output drive motor: 5.5 kW (7.5 HP)
Receiver volume: 290 litres
Dimensions silenced: 1630 × 804 × 1346 mm (64.2 × 31.7 × 53.0 in)
Dimensions super-silenced: 1630 × 804 × 1346 mm (64.2 × 31.7 × 53.0 in)
Weight silenced: 470 kg (1036 lbs)
Weight super-silenced: 477 kg (1052 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  // K15- Series (with receiver)
  {
    name: 'BOGE K15 — K 15- — 10 bar (150 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15- series is a robust and efficient piston compressor with integrated receiver tank designed for demanding industrial applications. This model delivers free air delivery of 1296 l/min (46 cfm) at 10 bar with 11.0 kW (15 HP) motor power and includes a 270L receiver volume.',
    specifications: `Maximum Pressure: 10 bar (150 psig)
Effective free air delivery: 1296 l/min (46.0 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: 270 litres
Dimensions silenced: 1770 × 806 × 1453 mm (69.7 × 31.7 × 57.2 in)
Dimensions super-silenced: 2097 × 806 × 1453 mm (82.6 × 31.7 × 57.2 in)
Weight silenced: 490 kg (1080 lbs)
Weight super-silenced: 502 kg (1107 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K15 — K 15- — 15 bar (220 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15- series is a robust and efficient piston compressor with integrated receiver tank designed for demanding industrial applications. This model delivers free air delivery of 794 l/min (28 cfm) at 15 bar with 11.0 kW (15 HP) motor power and includes a 250L receiver volume.',
    specifications: `Maximum Pressure: 15 bar (220 psig)
Effective free air delivery: 794 l/min (28.0 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: 250 litres
Dimensions silenced: 1510 × 806 × 1453 mm (59.4 × 31.7 × 57.2 in)
Dimensions super-silenced: 2097 × 806 × 1453 mm (82.6 × 31.7 × 57.2 in)
Weight silenced: 510 kg (1124 lbs)
Weight super-silenced: 522 kg (1151 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  },
  {
    name: 'BOGE K15 — K 15- — 40 bar (600 psig)',
    brand: 'Boge',
    category: 'Air Compressors',
    description: 'The BOGE K15- series is a robust and efficient piston compressor with integrated receiver tank designed for demanding industrial applications. This model delivers free air delivery of 780 l/min (27.5 cfm) at 40 bar with 11.0 kW (15 HP) motor power and includes a 260L receiver volume.',
    specifications: `Maximum Pressure: 40 bar (600 psig)
Effective free air delivery: 780 l/min (27.5 cfm)
Nominal output drive motor: 11.0 kW (15.0 HP)
Receiver volume: 260 litres
Dimensions silenced: 1560 × 806 × 1453 mm (61.4 × 31.7 × 57.2 in)
Dimensions super-silenced: 2097 × 806 × 1453 mm (82.6 × 31.7 × 57.2 in)
Weight silenced: 590 kg (1301 lbs)
Weight super-silenced: 602 kg (1327 lbs)`,
    image_url: '',
    price: 'Contact for Quote',
    availability: 'Available',
    featured: false
  }
];

(async () => {
  console.log('📦 Inserting K8 and K15 series products...\n');

  const { data, error } = await supabase
    .from('products')
    .insert(k8K15Products)
    .select();

  if (error) {
    console.error('❌ Error inserting products:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully inserted ${data.length} products!`);
  data.forEach(p => console.log(`   - ${p.name}`));
})();
