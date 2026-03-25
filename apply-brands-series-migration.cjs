require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

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
    const migration = fs.readFileSync('/tmp/brands_series_migration.sql', 'utf8');

    console.log('Applying migration...');

    // Split migration into manageable chunks
    const statements = migration
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('/*') && !s.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i] + ';';
      if (stmt.trim().length > 1) {
        try {
          console.log(`\nExecuting statement ${i + 1}/${statements.length}...`);
          const { error } = await supabase.rpc('exec_sql', { sql: stmt });

          if (error) {
            console.error(`Error in statement ${i + 1}:`, error.message);
            // Continue with other statements
          } else {
            console.log(`✓ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.error(`Exception in statement ${i + 1}:`, err.message);
        }
      }
    }

    console.log('\n✓ Migration completed');

    // Verify the migration
    console.log('\nVerifying migration...');
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('*');

    if (brandsError) {
      console.error('Error fetching brands:', brandsError);
    } else {
      console.log(`✓ Found ${brands?.length || 0} brands`);
    }

    const { data: series, error: seriesError } = await supabase
      .from('series')
      .select('*');

    if (seriesError) {
      console.error('Error fetching series:', seriesError);
    } else {
      console.log(`✓ Found ${series?.length || 0} series`);
    }

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

applyMigration();
