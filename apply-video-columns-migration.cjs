require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  try {
    console.log('Reading migration file...');
    const migrationPath = path.join(__dirname, 'add_video_columns_migration.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Applying migration to add video_url columns...');

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('Migration failed:', error);
      console.log('\n⚠️  Manual application required:');
      console.log('1. Go to your Supabase Dashboard → SQL Editor');
      console.log('2. Copy the contents of add_video_columns_migration.sql');
      console.log('3. Paste and execute in the SQL Editor');
      process.exit(1);
    }

    console.log('✅ Migration applied successfully!');
    console.log('\nNext steps:');
    console.log('1. Create a "media" storage bucket in Supabase (Storage → New Bucket)');
    console.log('2. Set the bucket to Public');
    console.log('3. Start using the upload features in the admin panel!');

  } catch (err) {
    console.error('Error:', err.message);
    console.log('\n⚠️  Please apply the migration manually:');
    console.log('1. Go to your Supabase Dashboard → SQL Editor');
    console.log('2. Copy the contents of add_video_columns_migration.sql');
    console.log('3. Paste and execute in the SQL Editor');
  }
}

applyMigration();
