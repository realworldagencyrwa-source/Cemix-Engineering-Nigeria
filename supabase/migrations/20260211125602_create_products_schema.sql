/*
  # Create Products Schema for Cemix Pro Nigeria Ltd

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `brand` (text) - Brand name (Boge, Abac, Pneumax)
      - `category` (text) - Product category (Air Compressor, Air Fittings)
      - `description` (text) - Product description
      - `specifications` (text) - Technical specifications
      - `image_url` (text) - Product image URL
      - `datasheet_url` (text) - PDF datasheet URL
      - `price` (text) - Price information (optional, can be "Contact for pricing")
      - `availability` (text) - Stock availability status
      - `featured` (boolean) - Featured product flag
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - Add policy for authenticated admin users to manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  specifications text,
  image_url text,
  datasheet_url text,
  price text DEFAULT 'Contact for pricing',
  availability text DEFAULT 'In Stock',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);