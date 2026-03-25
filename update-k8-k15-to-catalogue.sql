-- Update K8-K15 product to be a catalogue type
UPDATE products
SET
  description = 'View complete technical specifications including all models, pressure ratings, air delivery rates, dimensions, and weights.',
  specifications = NULL,
  image_url = '/assets/files_7623097-2026-02-19T19-44-06-301Z-Screenshot_2026-02-19_214335.png',
  is_catalogue = true
WHERE name = 'BOGE K8-K15 Series' AND brand = 'Boge';
