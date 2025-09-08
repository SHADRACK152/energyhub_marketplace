require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testDatabase() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );
  
  console.log('Testing Supabase connection and orders table...');
  
  // Test simple insert to see what columns are actually available
  const testOrder = {
    id: 'test-' + Date.now()
  };
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([testOrder])
      .select();
    
    if (error) {
      console.log('❌ Insert error:', error.message);
      
      if (error.message.includes('does not exist')) {
        console.log('\n📝 The orders table needs to be created.');
        console.log('Please run the SQL commands from fix-orders-table.sql in your Supabase SQL editor.');
      }
    } else {
      console.log('✅ Insert successful! Table exists and accepting data.');
      console.log('Available columns:', Object.keys(data[0]));
      
      // Clean up test data
      await supabase.from('orders').delete().eq('id', testOrder.id);
      console.log('🧹 Cleaned up test data');
    }
  } catch (err) {
    console.log('❌ Connection error:', err.message);
  }
  
  process.exit(0);
}

testDatabase();
