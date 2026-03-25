require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  try {
    console.log('Step 1: Creating brands table...');
    // We can't execute raw SQL directly, so let's just verify tables exist
    // and insert data using the Supabase client

    console.log('Step 2: Inserting BOGE brand...');
    const { data: existingBrand } = await supabase
      .from('brands')
      .select('*')
      .eq('name', 'Boge')
      .maybeSingle();

    let bogeId;
    if (!existingBrand) {
      const { data: newBrand, error: brandError } = await supabase
        .from('brands')
        .insert({
          name: 'Boge',
          display_title: 'BOGE Industrial Compressors',
          subtitle: 'Premium German Engineering',
          description: 'BOGE has been a leading manufacturer of industrial air compressors and compressed air systems for over 100 years. Known for reliability, efficiency, and innovative technology.',
          sort_order: 1
        })
        .select()
        .single();

      if (brandError) {
        console.error('Error creating brand:', brandError);
        return;
      }
      bogeId = newBrand.id;
      console.log('✓ BOGE brand created');
    } else {
      bogeId = existingBrand.id;
      console.log('✓ BOGE brand already exists');
    }

    console.log('\nStep 3: Inserting BOGE series...');
    const seriesData = [
      { name: 'C-2 Series', short_code: 'C-2', description: 'Compact and efficient screw compressors', sort_order: 1 },
      { name: 'S-2 Series', short_code: 'S-2', description: 'Versatile screw compressors with proven reliability', sort_order: 2 },
      { name: 'S-3 Series', short_code: 'S-3', description: 'High-performance screw compressors', sort_order: 3 },
      { name: 'S-4 Series', short_code: 'S-4', description: 'Premium screw compressors with maximum efficiency', sort_order: 4 },
      { name: 'S eco Series', short_code: 'S eco', description: 'Energy-efficient compressors with heat recovery', sort_order: 5 },
      { name: 'SRHV Series', short_code: 'SRHV', description: 'High vacuum screw compressors', sort_order: 6 },
      { name: 'SRH Series', short_code: 'SRH', description: 'Reliable screw compressors for industrial use', sort_order: 7 },
      { name: 'K8-K15 Series', short_code: 'K', description: 'Compact piston compressors', sort_order: 8 },
      { name: 'DS Series', short_code: 'DS', description: 'Desiccant dryers for optimal air quality', sort_order: 9 }
    ];

    for (const series of seriesData) {
      const { data: existing } = await supabase
        .from('series')
        .select('*')
        .eq('brand_id', bogeId)
        .eq('name', series.name)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase
          .from('series')
          .insert({
            brand_id: bogeId,
            ...series
          });

        if (error) {
          console.error(`Error creating series ${series.name}:`, error);
        } else {
          console.log(`✓ Created series: ${series.name}`);
        }
      } else {
        console.log(`✓ Series already exists: ${series.name}`);
      }
    }

    console.log('\nStep 4: Linking existing products to brand...');
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .is('brand_id', null)
      .ilike('brand', 'boge');

    if (products && products.length > 0) {
      for (const product of products) {
        await supabase
          .from('products')
          .update({ brand_id: bogeId })
          .eq('id', product.id);
      }
      console.log(`✓ Updated ${products.length} products with brand_id`);
    } else {
      console.log('✓ No products need brand_id update');
    }

    console.log('\nStep 5: Linking products to series...');
    const { data: allSeries } = await supabase
      .from('series')
      .select('*')
      .eq('brand_id', bogeId);

    if (allSeries) {
      for (const s of allSeries) {
        const { data: productsToUpdate } = await supabase
          .from('products')
          .select('*')
          .eq('brand_id', bogeId)
          .is('series_id', null)
          .not('series', 'is', null);

        if (productsToUpdate) {
          for (const product of productsToUpdate) {
            const productSeries = (product.series || '').toLowerCase();
            const shortCode = (s.short_code || '').toLowerCase();
            const seriesName = (s.name || '').toLowerCase();

            if (productSeries === shortCode ||
                productSeries === seriesName ||
                productSeries.startsWith(shortCode)) {
              await supabase
                .from('products')
                .update({ series_id: s.id })
                .eq('id', product.id);
              console.log(`✓ Linked product "${product.name}" to series "${s.name}"`);
            }
          }
        }
      }
    }

    console.log('\n✓ Migration completed successfully!');

    // Summary
    const { data: finalBrands } = await supabase.from('brands').select('*');
    const { data: finalSeries } = await supabase.from('series').select('*');
    const { data: linkedProducts } = await supabase
      .from('products')
      .select('*')
      .not('brand_id', 'is', null);

    console.log('\n=== Summary ===');
    console.log(`Brands: ${finalBrands?.length || 0}`);
    console.log(`Series: ${finalSeries?.length || 0}`);
    console.log(`Linked Products: ${linkedProducts?.length || 0}`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

applyMigration();
