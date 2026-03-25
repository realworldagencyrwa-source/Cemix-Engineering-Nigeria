-- Temporarily disable RLS to update product names
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Update all PSI to bar
UPDATE products SET name = REPLACE(name, '190 PSI', '13 bar') WHERE name LIKE '%190 PSI%';
UPDATE products SET name = REPLACE(name, '150 PSI', '10 bar') WHERE name LIKE '%150 PSI%';
UPDATE products SET name = REPLACE(name, '125 PSI', '9 bar') WHERE name LIKE '%125 PSI%';
UPDATE products SET name = REPLACE(name, '115 PSI', '8 bar') WHERE name LIKE '%115 PSI%';
UPDATE products SET name = REPLACE(name, '110 PSI', '7.6 bar') WHERE name LIKE '%110 PSI%';
UPDATE products SET name = REPLACE(name, '100 PSI', '7 bar') WHERE name LIKE '%100 PSI%';

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
