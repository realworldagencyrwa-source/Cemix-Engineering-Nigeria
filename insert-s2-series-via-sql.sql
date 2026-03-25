-- Step 1: Temporarily modify RLS policy to allow anonymous inserts
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;

CREATE POLICY "Temporary insert policy for S-2 series"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Step 2: Insert all S-2 series products
INSERT INTO products (name, brand, category, description, specifications, price, availability, featured, image_url)
VALUES
('BOGE S 10 – 115 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 115 PSI (8 bar) with an effective free air delivery of 42 CFM (1.18 m³/min) and a motor power of 10 HP (7.5 kW).',
'Max Pressure: 115 PSI (8 bar)
Effective Free Air Delivery: 42 CFM (1.18 m³/min)
Motor Power: 10 HP (7.5 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 10 – 150 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 150 PSI (10 bar) with an effective free air delivery of 39 CFM (1.06 m³/min) and a motor power of 10 HP (7.5 kW).',
'Max Pressure: 150 PSI (10 bar)
Effective Free Air Delivery: 39 CFM (1.06 m³/min)
Motor Power: 10 HP (7.5 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 10 – 190 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 190 PSI (13 bar) with an effective free air delivery of 32 CFM (0.91 m³/min) and a motor power of 10 HP (7.5 kW).',
'Max Pressure: 190 PSI (13 bar)
Effective Free Air Delivery: 32 CFM (0.91 m³/min)
Motor Power: 10 HP (7.5 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 15 – 115 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 115 PSI (8 bar) with an effective free air delivery of 58 CFM (1.65 m³/min) and a motor power of 15 HP (11.0 kW).',
'Max Pressure: 115 PSI (8 bar)
Effective Free Air Delivery: 58 CFM (1.65 m³/min)
Motor Power: 15 HP (11.0 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 15 – 150 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 150 PSI (10 bar) with an effective free air delivery of 51 CFM (1.45 m³/min) and a motor power of 15 HP (11.0 kW).',
'Max Pressure: 150 PSI (10 bar)
Effective Free Air Delivery: 51 CFM (1.45 m³/min)
Motor Power: 15 HP (11.0 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 15 – 190 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 190 PSI (13 bar) with an effective free air delivery of 44 CFM (1.25 m³/min) and a motor power of 15 HP (11.0 kW).',
'Max Pressure: 190 PSI (13 bar)
Effective Free Air Delivery: 44 CFM (1.25 m³/min)
Motor Power: 15 HP (11.0 kW)
Dimensions Super-Silenced (W × D × H): 940 × 700 × 970 mm (37 × 27.6 × 38.2 in)
Dimensions Ultra-Silenced (W × D × H): 940 × 700 × 1200 mm (37 × 27.6 × 47.2 in)
Weight Super-Silenced: 220 kg (485 lbs)
Weight Ultra-Silenced: 235 kg (518 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 20-2 – 115 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 115 PSI (8 bar) with an effective free air delivery of 91 CFM (2.57 m³/min) and a motor power of 20 HP (15.0 kW).',
'Max Pressure: 115 PSI (8 bar)
Effective Free Air Delivery: 91 CFM (2.57 m³/min)
Motor Power: 20 HP (15.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 350 kg (772 lbs)
Weight Ultra-Silenced: 375 kg (827 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 20-2 – 150 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 150 PSI (10 bar) with an effective free air delivery of 80 CFM (2.24 m³/min) and a motor power of 20 HP (15.0 kW).',
'Max Pressure: 150 PSI (10 bar)
Effective Free Air Delivery: 80 CFM (2.24 m³/min)
Motor Power: 20 HP (15.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 350 kg (772 lbs)
Weight Ultra-Silenced: 375 kg (827 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 20-2 – 190 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 190 PSI (13 bar) with an effective free air delivery of 67 CFM (1.90 m³/min) and a motor power of 20 HP (15.0 kW).',
'Max Pressure: 190 PSI (13 bar)
Effective Free Air Delivery: 67 CFM (1.90 m³/min)
Motor Power: 20 HP (15.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 350 kg (772 lbs)
Weight Ultra-Silenced: 375 kg (827 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 24-2 – 115 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 115 PSI (8 bar) with an effective free air delivery of 108 CFM (3.05 m³/min) and a motor power of 25 HP (18.5 kW).',
'Max Pressure: 115 PSI (8 bar)
Effective Free Air Delivery: 108 CFM (3.05 m³/min)
Motor Power: 25 HP (18.5 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 24-2 – 150 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 150 PSI (10 bar) with an effective free air delivery of 94 CFM (2.66 m³/min) and a motor power of 25 HP (18.5 kW).',
'Max Pressure: 150 PSI (10 bar)
Effective Free Air Delivery: 94 CFM (2.66 m³/min)
Motor Power: 25 HP (18.5 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 24-2 – 190 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 190 PSI (13 bar) with an effective free air delivery of 80 CFM (2.26 m³/min) and a motor power of 25 HP (18.5 kW).',
'Max Pressure: 190 PSI (13 bar)
Effective Free Air Delivery: 80 CFM (2.26 m³/min)
Motor Power: 25 HP (18.5 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 29-2 – 115 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 115 PSI (8 bar) with an effective free air delivery of 122 CFM (3.45 m³/min) and a motor power of 30 HP (22.0 kW).',
'Max Pressure: 115 PSI (8 bar)
Effective Free Air Delivery: 122 CFM (3.45 m³/min)
Motor Power: 30 HP (22.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 29-2 – 150 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 150 PSI (10 bar) with an effective free air delivery of 110 CFM (3.11 m³/min) and a motor power of 30 HP (22.0 kW).',
'Max Pressure: 150 PSI (10 bar)
Effective Free Air Delivery: 110 CFM (3.11 m³/min)
Motor Power: 30 HP (22.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg'),

('BOGE S 29-2 – 190 PSI', 'Boge', 'Air Compressor',
'Compact, efficient and quiet rotary screw compressor engineered for industrial applications. The BOGE S-2 series delivers reliable compressed air performance with valve-less oil circuit and horizontal oil reservoir for maximum efficiency.

This configuration operates at 190 PSI (13 bar) with an effective free air delivery of 91 CFM (2.57 m³/min) and a motor power of 30 HP (22.0 kW).',
'Max Pressure: 190 PSI (13 bar)
Effective Free Air Delivery: 91 CFM (2.57 m³/min)
Motor Power: 30 HP (22.0 kW)
Dimensions Super-Silenced (W × D × H): 1200 × 850 × 1150 mm (47.2 × 33.5 × 45.3 in)
Dimensions Ultra-Silenced (W × D × H): 1200 × 850 × 1500 mm (47.2 × 33.5 × 59.1 in)
Weight Super-Silenced: 365 kg (805 lbs)
Weight Ultra-Silenced: 390 kg (860 lbs)
Sound Pressure Level: from 68 dB(A)',
'Contact for pricing', 'In Stock', true, '/assets/boge-s20.jpg');

-- Step 3: Restore secure RLS policy
DROP POLICY IF EXISTS "Temporary insert policy for S-2 series" ON products;

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Verify insertions
SELECT name, brand, category FROM products WHERE name LIKE 'BOGE S %' ORDER BY name;
