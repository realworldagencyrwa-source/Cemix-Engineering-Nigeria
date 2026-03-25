/*
  # Create site settings table and add About Us content

  1. New Tables
    - `site_settings`
      - `key` (text, primary key) - Unique key for each setting
      - `value` (text) - Value of the setting
      - `created_at` (timestamptz) - Timestamp when the setting was created
      - `updated_at` (timestamptz) - Timestamp when the setting was last updated

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy to allow public read access (for displaying site content)
    - Add policy to allow authenticated users to update settings

  3. Default Data
    - Insert About Us default content
    - All existing site content keys (hero, contact, socials) can be added via admin UI
*/

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to insert site settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default About Us content
INSERT INTO site_settings (key, value) VALUES
  ('aboutUs.title', 'About Us'),
  ('aboutUs.subtitle', 'Your Partner in Compressed Air Solutions'),
  ('aboutUs.body', 'Cemix Pro Nigeria Limited is a leading provider of industrial compressed air systems and solutions across Nigeria and West Africa. As authorized distributors of premium brands including BOGE, ABAC, and Bestrand, we deliver high-performance equipment backed by expert technical support and comprehensive after-sales service. Our commitment to quality, reliability, and customer satisfaction has made us the trusted choice for businesses seeking dependable compressed air solutions.'),
  ('aboutUs.imageUrl', ''),
  ('aboutUs.videoUrl', ''),
  ('aboutUs.ctaText', 'Contact Us'),
  ('aboutUs.ctaLink', '#contact')
ON CONFLICT (key) DO NOTHING;
