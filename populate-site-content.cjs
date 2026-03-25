const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const actualWebsiteContent = [
  // Hero Section
  { section: 'hero', key: 'title', value: 'Your Trusted Partner for Compressed Air Solutions', content_type: 'text' },
  { section: 'hero', key: 'subtitle', value: 'Authorized distributor of BOGE, ABAC, and Bestrand. Powering Nigeria and West Africa with high-performance compressed air systems.', content_type: 'text' },
  { section: 'hero', key: 'button_primary', value: 'Browse Products', content_type: 'text' },
  { section: 'hero', key: 'button_secondary', value: 'Contact Us', content_type: 'text' },
  { section: 'hero', key: 'brands_title', value: 'Our Brands', content_type: 'text' },
  { section: 'hero', key: 'feature_1_title', value: 'Authorized Distributor', content_type: 'text' },
  { section: 'hero', key: 'feature_1_desc', value: 'Official partner for BOGE, ABAC, and Bestrand in Nigeria and West Africa', content_type: 'text' },
  { section: 'hero', key: 'feature_2_title', value: 'Quality Products', content_type: 'text' },
  { section: 'hero', key: 'feature_2_desc', value: 'Premium air compressors and fittings from leading European manufacturers', content_type: 'text' },
  { section: 'hero', key: 'feature_3_title', value: 'Expert Service', content_type: 'text' },
  { section: 'hero', key: 'feature_3_desc', value: 'Professional installation, maintenance, and repair services', content_type: 'text' },

  // Services Section
  { section: 'services', key: 'title', value: 'Our Services', content_type: 'text' },
  { section: 'services', key: 'subtitle', value: 'Complete compressed air solutions from sales to after-sales support', content_type: 'text' },
  { section: 'services', key: 'service_1_title', value: 'Sales & Trading', content_type: 'text' },
  { section: 'services', key: 'service_1_desc', value: 'Wide range of air compressors and pneumatic equipment from leading brands including Boge, Abac, and Pneumax.', content_type: 'text' },
  { section: 'services', key: 'service_2_title', value: 'Installation', content_type: 'text' },
  { section: 'services', key: 'service_2_desc', value: 'Professional installation services ensuring optimal performance and efficiency of your compressed air systems.', content_type: 'text' },
  { section: 'services', key: 'service_3_title', value: 'Maintenance & Repair', content_type: 'text' },
  { section: 'services', key: 'service_3_desc', value: 'Comprehensive maintenance programs and expert repair services to keep your equipment running at peak performance.', content_type: 'text' },
  { section: 'services', key: 'service_4_title', value: 'Parts Supply', content_type: 'text' },
  { section: 'services', key: 'service_4_desc', value: 'Genuine spare parts and accessories readily available for all brands we distribute across West Africa.', content_type: 'text' },
  { section: 'services', key: 'cta_title', value: 'Need Expert Advice?', content_type: 'text' },
  { section: 'services', key: 'cta_subtitle', value: 'Our team of certified technicians is ready to help you choose the right compressed air solution for your needs.', content_type: 'text' },
  { section: 'services', key: 'cta_button', value: 'Get in Touch', content_type: 'text' },

  // Contact Section
  { section: 'contact', key: 'title', value: 'Contact Us', content_type: 'text' },
  { section: 'contact', key: 'subtitle', value: 'Get in touch with us for inquiries, quotes, or service requests', content_type: 'text' },
  { section: 'contact', key: 'form_title', value: 'Send a Message', content_type: 'text' },
  { section: 'contact', key: 'address_label', value: 'Address', content_type: 'text' },
  { section: 'contact', key: 'address_link_text', value: 'View on Google Maps', content_type: 'text' },
  { section: 'contact', key: 'address_link_url', value: 'https://maps.app.goo.gl/Pnr5vzysMZ1Avkte6?g_st=aw', content_type: 'text' },
  { section: 'contact', key: 'phone_label', value: 'Phone', content_type: 'text' },
  { section: 'contact', key: 'phone_1', value: '+234 708 039 8040', content_type: 'text' },
  { section: 'contact', key: 'phone_2', value: '+234 707 524 2697', content_type: 'text' },
  { section: 'contact', key: 'hours_weekday', value: 'Mon-Fri: 8:00 AM - 5:00 PM', content_type: 'text' },
  { section: 'contact', key: 'hours_weekend', value: 'Sat: 8:00 AM - 2:00 PM', content_type: 'text' },
  { section: 'contact', key: 'email_label', value: 'Email', content_type: 'text' },
  { section: 'contact', key: 'email', value: 'sales@cemix-nigeria.com', content_type: 'text' },
  { section: 'contact', key: 'social_title', value: 'Follow Us', content_type: 'text' },
  { section: 'contact', key: 'facebook_url', value: 'https://www.facebook.com/share/1AG4xJMGrP/?mibextid=wwXIfr', content_type: 'text' },
  { section: 'contact', key: 'instagram_url', value: 'https://www.instagram.com/cemixnigeria?igsh=ODlzcWY0eXV4dnJv', content_type: 'text' },
  { section: 'contact', key: 'whatsapp_1_url', value: 'https://wa.me/2347080398040', content_type: 'text' },
  { section: 'contact', key: 'whatsapp_2_url', value: 'https://wa.me/2347075242697', content_type: 'text' },
  { section: 'contact', key: 'tiktok_url', value: 'https://www.tiktok.com/@cemixnigeria?_r=1&_t=ZS-93tj0ovoijx', content_type: 'text' },
];

async function populateContent() {
  console.log('Deleting existing content...');
  const { error: deleteError } = await supabase
    .from('site_content')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error deleting old content:', deleteError);
  } else {
    console.log('Old content deleted successfully');
  }

  console.log('Inserting new content...');
  const { data, error } = await supabase
    .from('site_content')
    .insert(actualWebsiteContent);

  if (error) {
    console.error('Error inserting content:', error);
  } else {
    console.log(`Successfully populated ${actualWebsiteContent.length} content items`);
  }
}

populateContent();
