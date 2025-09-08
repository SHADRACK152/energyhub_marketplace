require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Testing Supabase connection...');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Key exists:', !!process.env.SUPABASE_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

async function quickTest() {
  try {
    // Simple test query
    const { data, error } = await supabase.from('products').select('*').limit(1);
    
    if (error) {
      console.log('❌ Error:', error.message);
      console.log('Error details:', error);
    } else {
      console.log('✅ Connection successful!');
      console.log('Data received:', data ? 'Yes' : 'No');
      if (data && data.length > 0) {
        console.log('Sample product columns:', Object.keys(data[0]));
      }
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

quickTest();
