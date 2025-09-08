require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

async function checkDatabase() {
  try {
    console.log('🔍 Connecting to Supabase database...');
    console.log('URL:', process.env.SUPABASE_URL);
    
    // First, let's check if we can connect to Supabase
    const { data: healthCheck, error: healthError } = await supabase
      .from('_supabase_health_check')
      .select('*')
      .limit(1);
    
    if (healthError && !healthError.message.includes('does not exist')) {
      console.error('❌ Connection failed:', healthError);
      return;
    }
    
    console.log('✅ Connected to Supabase successfully!');
    
    // Check if orders table exists
    console.log('\n📋 Checking orders table...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (ordersError) {
      console.log('⚠️  Orders table issue:', ordersError.message);
      
      if (ordersError.message.includes('does not exist')) {
        console.log('📝 Orders table does not exist. Let me show you how to create it.');
        console.log('\n🔧 Run this SQL in your Supabase SQL editor:');
        console.log(`
-- Create orders table with proper structure
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT,
  product_name TEXT,
  product_image TEXT,
  price NUMERIC,
  quantity INTEGER,
  total_amount NUMERIC,
  payment_method TEXT,
  order_date TIMESTAMPTZ DEFAULT NOW(),
  delivery_date TIMESTAMPTZ,
  status TEXT DEFAULT 'Reviewing',
  status_steps JSONB,
  user_id TEXT,
  buyer_id TEXT,
  buyer_name TEXT,
  buyer_email TEXT,
  payment_status TEXT DEFAULT 'Paid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();
        `);
        return;
      }
    }
    
    console.log('✅ Orders table exists!');
    
    // Get table structure using PostgreSQL system tables
    console.log('\n🔍 Checking table structure...');
    const { data: columns, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'orders' });
    
    if (columnsError) {
      console.log('⚠️  Could not get column info directly. Trying alternative method...');
      
      // Try to get a sample record to see actual structure
      const { data: sampleData, error: sampleError } = await supabase
        .from('orders')
        .select('*')
        .limit(1);
      
      if (sampleError) {
        console.log('❌ Error getting sample data:', sampleError.message);
      } else {
        console.log('📊 Sample data structure:');
        if (sampleData && sampleData.length > 0) {
          console.log('Available columns:', Object.keys(sampleData[0]));
        } else {
          console.log('No data in orders table yet.');
          
          // Try a simple insert to test column structure
          console.log('\n🧪 Testing basic insert...');
          const testOrder = {
            id: 'test-' + Date.now(),
            order_number: 'TEST-001',
            product_name: 'Test Product',
            price: 100,
            status: 'Reviewing'
          };
          
          const { data: insertData, error: insertError } = await supabase
            .from('orders')
            .insert([testOrder])
            .select();
          
          if (insertError) {
            console.log('❌ Insert failed:', insertError.message);
            console.log('This tells us about the column structure issues.');
            
            // Parse the error to understand missing columns
            if (insertError.message.includes('column') && insertError.message.includes('does not exist')) {
              const missingColumn = insertError.message.match(/column "([^"]+)" does not exist/);
              if (missingColumn) {
                console.log(`🔧 Missing column: ${missingColumn[1]}`);
                
                // Suggest fixes
                console.log('\n💡 Suggested fixes:');
                console.log('1. Add the missing column to your Supabase table');
                console.log('2. Or update the backend code to use existing column names');
                console.log('\nTo add missing columns, run this SQL in Supabase:');
                
                const commonColumns = [
                  'order_number TEXT',
                  'product_name TEXT', 
                  'product_image TEXT',
                  'price NUMERIC',
                  'quantity INTEGER',
                  'total_amount NUMERIC',
                  'payment_method TEXT',
                  'order_date TIMESTAMPTZ DEFAULT NOW()',
                  'delivery_date TIMESTAMPTZ',
                  'status TEXT DEFAULT \'Reviewing\'',
                  'status_steps JSONB',
                  'user_id TEXT',
                  'buyer_id TEXT',
                  'buyer_name TEXT',
                  'buyer_email TEXT',
                  'payment_status TEXT DEFAULT \'Paid\''
                ];
                
                commonColumns.forEach(col => {
                  console.log(`ALTER TABLE orders ADD COLUMN IF NOT EXISTS ${col};`);
                });
              }
            }
          } else {
            console.log('✅ Test insert successful!');
            console.log('Inserted data:', insertData);
            
            // Clean up test data
            await supabase.from('orders').delete().eq('id', testOrder.id);
            console.log('🧹 Cleaned up test data');
          }
        }
      }
    } else {
      console.log('📊 Table columns:', columns);
    }
    
    // Check actual data count
    const { count, error: countError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`📈 Total orders in database: ${count}`);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Also create a function to check table columns using raw SQL
async function checkTableColumns() {
  console.log('\n🔍 Checking table columns with raw SQL...');
  
  const { data, error } = await supabase
    .rpc('exec_sql', { 
      sql: `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'orders' 
        ORDER BY ordinal_position;
      `
    });
  
  if (error) {
    console.log('Raw SQL check failed:', error.message);
  } else {
    console.log('Table structure:', data);
  }
}

console.log('🚀 Starting database check...');
checkDatabase();
