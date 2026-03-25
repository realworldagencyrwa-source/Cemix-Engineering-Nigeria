/*
  # Add BOGE SRHV Series Products

  1. New Products
    - Adding 8 BOGE SRHV series high-pressure booster compressor products
    - Models: SRHV 540-5, SRHV 470-10, SRHV 450-5, SRHV 420-10, SRHV 280-10, SRHV 250-5, SRHV 200-5, SRHV 170-10
    - All rated for 600 psig maximum pressure
    - Sorted by model number descending (540, 470, 450, 420, 280, 250, 200, 170)

  2. Product Details
    - Brand: Boge
    - Category: Air Compressor
    - Each row from technical data table = one product
    - Consistent naming: "BOGE SRHV — [Model] — 600 psig"
    - Complete technical specifications from PDF data sheet
*/

-- Insert SRHV 540-5 (15.0 kW / 20.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 540-5 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 2573 l/min (91 cfm) with 15.0 kW (20.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 535 l/min / 19 cfm
Theoretical suction capacity displacement at 70 psig: 3210 l/min / 113 cfm
Theoretical suction capacity displacement at 145 psig: —
Effective free air delivery: 2573 l/min / 91 cfm
Rotational speed: 1450 1/min
Cylinder: 3
Motor power: 15.0 kW / 20.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 595 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 470-10 (18.5 kW / 25.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 470-10 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 4559 l/min (164 cfm) with 18.5 kW (25.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 469 l/min / 17 cfm
Theoretical suction capacity displacement at 70 psig: —
Theoretical suction capacity displacement at 145 psig: 5159 l/min / — cfm
Effective free air delivery: 4559 l/min / 164 cfm
Rotational speed: 1270 1/min
Cylinder: 3
Motor power: 18.5 kW / 25.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 551 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 450-5 (11.0 kW / 15.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 450-5 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 2117 l/min (75 cfm) with 11.0 kW (15.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 443 l/min / 16 cfm
Theoretical suction capacity displacement at 70 psig: 2658 l/min / 94 cfm
Theoretical suction capacity displacement at 145 psig: —
Effective free air delivery: 2117 l/min / 75 cfm
Rotational speed: 1200 1/min
Cylinder: 3
Motor power: 11.0 kW / 15.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 573 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 420-10 (15.0 kW / 20.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 420-10 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 3976 l/min (140 cfm) with 15.0 kW (20.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 417 l/min / 15 cfm
Theoretical suction capacity displacement at 70 psig: —
Theoretical suction capacity displacement at 145 psig: 4587 l/min / — cfm
Effective free air delivery: 3976 l/min / 140 cfm
Rotational speed: 1130 1/min
Cylinder: 3
Motor power: 15.0 kW / 20.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 595 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 280-10 (11.0 kW / 15.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 280-10 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 2680 l/min (94 cfm) with 11.0 kW (15.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 278 l/min / 10 cfm
Theoretical suction capacity displacement at 70 psig: —
Theoretical suction capacity displacement at 145 psig: 3058 l/min / — cfm
Effective free air delivery: 2680 l/min / 94 cfm
Rotational speed: 1130 1/min
Cylinder: 2
Motor power: 11.0 kW / 15.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 551 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 250-5 (7.5 kW / 10.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 250-5 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 1150 l/min (41 cfm) with 7.5 kW (10.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 248 l/min / 9 cfm
Theoretical suction capacity displacement at 70 psig: 1488 l/min / 53 cfm
Theoretical suction capacity displacement at 145 psig: —
Effective free air delivery: 1150 l/min / 41 cfm
Rotational speed: 1010 1/min
Cylinder: 2
Motor power: 7.5 kW / 10.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 474 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 200-5 (5.5 kW / 7.5 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 200-5 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 937 l/min (33 cfm) with 5.5 kW (7.5 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 205 l/min / 7 cfm
Theoretical suction capacity displacement at 70 psig: 1230 l/min / 44 cfm
Theoretical suction capacity displacement at 145 psig: —
Effective free air delivery: 937 l/min / 33 cfm
Rotational speed: 830 1/min
Cylinder: 2
Motor power: 5.5 kW / 7.5 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 529 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);

-- Insert SRHV 170-10 (7.5 kW / 10.0 hp)
INSERT INTO products (name, brand, category, description, image_url, specifications, price, featured, availability)
VALUES (
  'BOGE SRHV — SRHV 170-10 — 600 psig',
  'Boge',
  'Air Compressor',
  'The BOGE SRHV series is a flexible high-pressure booster designed for exceptional efficiency and reliable compressed air performance in demanding industrial applications. This model delivers an effective free air delivery of 1575 l/min (56 cfm) with 7.5 kW (10.0 hp) motor power.',
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  'Maximum Pressure: 600 psig
Theoretical suction capacity (atmospheric inlet): 170 l/min / 6 cfm
Theoretical suction capacity displacement at 70 psig: —
Theoretical suction capacity displacement at 145 psig: 1870 l/min / — cfm
Effective free air delivery: 1575 l/min / 56 cfm
Rotational speed: 695 1/min
Cylinder: 2
Motor power: 7.5 kW / 10.0 hp
Dimensions (W × D × H): 52 × 35 × 30 in
Weight: 540 lbs',
  'Contact for pricing',
  false,
  'In Stock'
);
