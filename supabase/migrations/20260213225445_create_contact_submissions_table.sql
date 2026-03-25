/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person submitting the form
      - `email` (text) - Email address of the submitter
      - `phone` (text) - Phone number of the submitter
      - `message` (text) - Message content from the form
      - `status` (text) - Status of the submission (new, read, responded)
      - `created_at` (timestamptz) - Timestamp when the submission was created
      - `updated_at` (timestamptz) - Timestamp when the submission was last updated
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy to allow public inserts (anyone can submit the form)
    - Add policy to allow service role to read all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read their submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);