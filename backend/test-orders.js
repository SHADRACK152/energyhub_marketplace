require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testOrders() {
  console.log('Testing Supabase orders table...');
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
  );
  
  try {
    // Test 1: Try to insert with the exact structure our code expects
    console.log('\n1. Testing with snake_case columns (database schema)...');
    const testOrder1 = {
      id: 'test-' + Date.now(),
      order_number: 'TEST-001',
      product_name: 'Test Product',
      price: 100,
      status: 'Reviewing',
      order_date: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    const { data: data1, error: error1 } = await supabase
      .from('orders')
      .insert([testOrder1])
      .select();
    
    if (error1) {
      console.log('❌ Snake_case insert failed:', error1.message);
      
      // Test 2: Try with camelCase columns  
      console.log('\n2. Testing with camelCase columns...');
      const testOrder2 = {
        id: 'test-' + Date.now(),
        orderNumber: 'TEST-002',
        productName: 'Test Product',
        price: 100,
        status: 'Reviewing',
        orderDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      const { data: data2, error: error2 } = await supabase
        .from('orders')
        .insert([testOrder2])
        .select();
      
      if (error2) {
        console.log('❌ CamelCase insert failed:', error2.message);
        
        // Test 3: Try with minimal required columns
        console.log('\n3. Testing with minimal columns...');
        const testOrder3 = {
          id: 'test-' + Date.now(),
          status: 'Reviewing'
        };
        
        const { data: data3, error: error3 } = await supabase
          .from('orders')
          .insert([testOrder3])
          .select();
        
        if (error3) {
          console.log('❌ Minimal insert failed:', error3.message);
          console.log('\n📝 This tells us about your table structure.');
          
          if (error3.message.includes('order_date')) {
            console.log('\n🔧 SOLUTION: Add the order_date column:');
            console.log('Run this SQL in your Supabase SQL editor:');
            console.log('ALTER TABLE orders ADD COLUMN order_date TIMESTAMPTZ DEFAULT NOW();');
          }
          
        } else {
          console.log('✅ Minimal insert worked!');
          console.log('Available columns:', Object.keys(data3[0]));
          
          // Cleanup
          await supabase.from('orders').delete().eq('id', testOrder3.id);
        }
      } else {
        console.log('✅ CamelCase insert worked!');
        console.log('Available columns:', Object.keys(data2[0]));
        
        // Cleanup
        await supabase.from('orders').delete().eq('id', testOrder2.id);
      }
    } else {
      console.log('✅ Snake_case insert worked!');
      console.log('Available columns:', Object.keys(data1[0]));
      
      // Cleanup
      await supabase.from('orders').delete().eq('id', testOrder1.id);
    }
    
    // Test 4: Check what happens with our backend's exact query
    console.log('\n4. Testing backend query pattern...');
    const { data: queryData, error: queryError } = await supabase
      .from('orders')
      .select('*, order_date, created_at')
      .order('order_date', { ascending: false });
    
    if (queryError) {
      console.log('❌ Query failed:', queryError.message);
      
      // Try alternative ordering
      console.log('\n5. Trying alternative query...');
      const { data: altData, error: altError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (altError) {
        console.log('❌ Alternative query failed:', altError.message);
      } else {
        console.log('✅ Alternative query worked!');
        console.log('Available columns:', altData.length > 0 ? Object.keys(altData[0]) : 'No data yet');
      }
    } else {
      console.log('✅ Backend query pattern works!');
      console.log('Available columns:', queryData.length > 0 ? Object.keys(queryData[0]) : 'No data yet');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
  
  process.exit(0);
}

testOrders();
