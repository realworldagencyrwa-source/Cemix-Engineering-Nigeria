-- Run this SQL in the Supabase SQL Editor to remove K8-K15 products
-- This bypasses RLS policies since it runs as the database owner

DELETE FROM products
WHERE name ILIKE '%K8%' OR name ILIKE '%K15%';

-- Verify deletion
SELECT COUNT(*) as remaining_count
FROM products
WHERE name ILIKE '%K8%' OR name ILIKE '%K15%';
