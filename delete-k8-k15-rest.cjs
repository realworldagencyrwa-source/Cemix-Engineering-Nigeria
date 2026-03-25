const https = require('https');
require('dotenv').config();

const options = {
  hostname: 'cflpphrddekccakfkkjz.supabase.co',
  port: 443,
  path: '/rest/v1/rpc/exec',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.VITE_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
    'Prefer': 'return=representation'
  }
};

const sql = `DELETE FROM products WHERE name ILIKE '%K8%' OR name ILIKE '%K15%'`;

const postData = JSON.stringify({ query: sql });

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(postData);
req.end();
