const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fixMotorPowerFormat() {
  console.log('🔍 Fetching all products...\n');

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, specifications');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  const updates = [];

  for (const product of products) {
    const motorMatch = product.specifications.match(/Motor Power:[^\n]+/);
    if (!motorMatch) continue;

    const currentLine = motorMatch[0];

    // Check if format needs fixing (has slash or multiple kW)
    if (!currentLine.includes(' / ') && (currentLine.match(/kW/gi) || []).length <= 1) {
      continue; // Already correct format
    }

    // Parse the current format
    // Pattern: Motor Power: X.X kW / Y.Y HP
    const kwMatch = currentLine.match(/([\d.]+)\s*kW/i);
    const hpMatch = currentLine.match(/([\d.]+)\s*HP/i);

    if (!kwMatch) continue;

    const kw = kwMatch[1];
    const hp = hpMatch ? hpMatch[1] : null;

    // Build correct format: Motor Power: X.X kW (Y HP)
    let newLine;
    if (hp) {
      newLine = `Motor Power: ${kw} kW (${hp} HP)`;
    } else {
      newLine = `Motor Power: ${kw} kW`;
    }

    // Replace in specifications
    const newSpecs = product.specifications.replace(currentLine, newLine);

    updates.push({
      id: product.id,
      name: product.name,
      oldLine: currentLine,
      newLine: newLine,
      newSpecs: newSpecs
    });
  }

  console.log(`📊 Found ${updates.length} products to update\n`);

  if (updates.length === 0) {
    console.log('✅ All products already have correct format!');
    return;
  }

  // Show preview
  console.log('Preview of changes:\n');
  updates.slice(0, 5).forEach(u => {
    console.log(u.name);
    console.log('  Old:', u.oldLine);
    console.log('  New:', u.newLine);
    console.log('');
  });

  if (updates.length > 5) {
    console.log(`... and ${updates.length - 5} more\n`);
  }

  // Apply updates
  console.log('🔄 Applying updates...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    const { error } = await supabase
      .from('products')
      .update({ specifications: update.newSpecs })
      .eq('id', update.id);

    if (error) {
      console.error(`❌ Failed to update ${update.name}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log('\n✅ Update complete!');
  console.log(`   Successfully updated: ${successCount}`);
  if (errorCount > 0) {
    console.log(`   Failed: ${errorCount}`);
  }
}

fixMotorPowerFormat().catch(console.error);
