require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function quickTest() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );
  
  console.log('Testing orders table...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error:', error.message);
      
      if (error.message.includes('does not exist')) {
        console.log('\n🔧 Run this SQL in Supabase to create the table:');
        console.log('See fix-id-type.sql file');
      }
    } else {
      console.log('✅ Orders table accessible!');
      console.log(`Found ${data.length} records`);
      
      if (data.length > 0) {
        console.log('Sample record columns:', Object.keys(data[0]));
      }
      
      // Test insert with text ID
      const testId = 'order-' + Date.now();
      console.log('\nTesting insert with text ID:', testId);
      
      const { data: insertData, error: insertError } = await supabase
        .from('orders')
        .insert([{
          id: testId,
          status: 'Reviewing',
          product_name: 'Test Product'
        }])
        .select();
      
      if (insertError) {
        console.log('❌ Insert failed:', insertError.message);
        
        if (insertError.message.includes('bigint')) {
          console.log('\n🔧 Table still has bigint ID. Run fix-id-type.sql to fix this.');
        }
      } else {
        console.log('✅ Insert successful!');
        
        // Clean up
        await supabase.from('orders').delete().eq('id', testId);
        console.log('🧹 Test record cleaned up');
      }
    }
  } catch (err) {
    console.log('❌ Connection error:', err.message);
  }
  
  process.exit(0);
}

quickTest();
