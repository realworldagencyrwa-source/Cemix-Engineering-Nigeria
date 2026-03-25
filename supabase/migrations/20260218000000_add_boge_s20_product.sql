/*
  # Add BOGE S20 Screw Air Compressor

  1. Purpose
    - Add real BOGE S20 product to the products catalog
    - Product appears under Boge brand tab and All products

  2. Product Details
    - Brand: Boge
    - Model: BOGE S20 Screw Type Air Compressor
    - Category: Air Compressor
    - Status: In Stock, Featured
    - Engineering: German Engineered

  3. Technical Specifications
    - Power: 15 kW
    - Maximum Pressure: 8 bar (115 psi)
    - Free Air Delivery: 2.57 m³/min (91 CFM)
    - Compressor Type: Rotary Screw
    - Motor: Class F, IP55
    - Weight: 350 kg
    - Dimensions: 1250 x 1000 x 1165 mm

  4. Key Features
    - German engineering standards
    - Intelligent cabinet layout with optimal airflow
    - Advanced oil separation system (1-3 mg/m³ residual oil)
    - Valve-less oil circuit for maximum safety
    - Class F, IP55 electric motor with power reserves
    - Easy maintenance with single-side access
    - Horizontal oil reservoir for long service life
*/

INSERT INTO products (name, brand, category, description, specifications, price, availability, featured, image_url)
VALUES
(
  'BOGE S20 Screw Type Air Compressor',
  'Boge',
  'Air Compressor',
  'Industrial rotary screw air compressor engineered for reliable and energy-efficient operation in demanding production environments.

The BOGE S20 screw air compressor is designed for flexible and reliable industrial operation. Built with German engineering standards, the S20 series combines high-quality workmanship with efficient compact design to ensure maximum operating safety and performance.

Its intelligent cabinet layout allows optimal airflow management and easy maintenance access. The integrated oil separation system and advanced intake control design ensure minimal pressure loss, low residual oil content, and long service life even in demanding environments.

The unit features a Class F, IP55 electric motor with genuine power reserves, ensuring stable performance under continuous operation.',
  'Power: 15 kW
Maximum Pressure: 8 bar (115 psi)
Free Air Delivery: 2.57 m³/min (91 CFM)
Compressor Type: Rotary Screw
Motor Type: Class F, IP55
Weight: 350 kg
Dimensions (W x D x H): 1250 x 1000 x 1165 mm
Country of Engineering: Germany',
  'Contact for pricing',
  'In Stock',
  true,
  '/assets/boge-s20.jpg'
);
