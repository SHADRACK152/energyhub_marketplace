require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function quickCheck() {
  console.log('Connecting to Supabase...');
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );
  
  try {
    // Simple query to check connection
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('Error:', error.message);
      console.log('Error code:', error.code);
      console.log('Error details:', error.details);
      
      if (error.message.includes('order_date')) {
        console.log('\n🔧 Found the order_date column issue!');
        console.log('The table exists but is missing the order_date column.');
        console.log('\nHere are your options:');
        console.log('\n1. Add the missing column to your existing table:');
        console.log('   ALTER TABLE orders ADD COLUMN order_date TIMESTAMPTZ DEFAULT NOW();');
        console.log('\n2. Or use the existing created_at column instead');
      }
      
      if (error.message.includes('does not exist')) {
        console.log('\n📝 The orders table does not exist yet.');
        console.log('You need to create it first.');
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.log('Connection error:', err.message);
  }
  
  process.exit(0);
}

quickCheck();
