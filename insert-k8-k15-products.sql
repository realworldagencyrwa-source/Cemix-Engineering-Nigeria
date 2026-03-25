-- Insert K8-K15 Series Product Card
-- Run this in Supabase SQL Editor
-- This creates ONE card displaying the complete K8-K15 catalogue

INSERT INTO products (name, brand, category, description, specifications, image_url, price, availability, featured)
VALUES
  (
    'BOGE K8-K15 Series',
    'Boge',
    'Air Compressor',
    'The BOGE K8 and K15 series are robust reciprocating piston compressors designed for reliable industrial compressed air supply. Available in multiple pressure configurations (10, 15, 40 bar) with optional integrated receiver tanks (250-270L). Motor power ranges from 5.5 kW to 11.0 kW, delivering effective free air from 390 to 1296 l/min. Available in both silenced and super-silenced versions for quiet operation.',
    'See catalogue image for complete technical specifications including all models, pressure ratings, air delivery rates, dimensions, and weights.',
    '/assets/k8-k15-catalogue.png',
    'Contact for pricing',
    'In Stock',
    false
  );

-- Verify insertion
SELECT * FROM products WHERE name = 'BOGE K8-K15 Series';
