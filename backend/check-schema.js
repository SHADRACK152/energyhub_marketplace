require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

async function checkSchema() {
  console.log('🔍 Checking Supabase database schema...\n');
  
  try {
    // Check if products table exists and get its structure
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'products');

    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError.message);
      return;
    }

    if (!tables || tables.length === 0) {
      console.log('❌ Products table does not exist!');
      console.log('\n📝 You need to create the products table first.');
      return;
    }

    console.log('✅ Products table exists');

    // Get column information for products table
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_schema', 'public')
      .eq('table_name', 'products')
      .order('ordinal_position');

    if (columnsError) {
      console.error('❌ Error checking columns:', columnsError.message);
      return;
    }

    console.log('\n📋 Current products table columns:');
    console.log('─'.repeat(80));
    columns.forEach(col => {
      console.log(`${col.column_name.padEnd(20)} | ${col.data_type.padEnd(20)} | ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });

    // Check for missing columns that our backend needs
    const requiredColumns = [
      'id', 'name', 'category', 'description', 'price', 'stock', 
      'image', 'images', 'sku', 'specifications', 'pricing', 
      'inventory', 'status', 'featured', 'created_at', 'updated_at'
    ];

    const existingColumns = columns.map(col => col.column_name);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    console.log('\n🔍 Analysis:');
    console.log('─'.repeat(80));
    if (missingColumns.length === 0) {
      console.log('✅ All required columns exist!');
    } else {
      console.log('❌ Missing columns:', missingColumns.join(', '));
      console.log('\n📝 SQL commands needed:');
      console.log('─'.repeat(80));
      
      const sqlCommands = [];
      
      if (missingColumns.includes('image')) {
        sqlCommands.push('ALTER TABLE products ADD COLUMN image TEXT;');
      }
      if (missingColumns.includes('images')) {
        sqlCommands.push("ALTER TABLE products ADD COLUMN images JSONB DEFAULT '[]'::jsonb;");
      }
      if (missingColumns.includes('sku')) {
        sqlCommands.push('ALTER TABLE products ADD COLUMN sku TEXT;');
      }
      if (missingColumns.includes('specifications')) {
        sqlCommands.push("ALTER TABLE products ADD COLUMN specifications JSONB DEFAULT '{}'::jsonb;");
      }
      if (missingColumns.includes('pricing')) {
        sqlCommands.push("ALTER TABLE products ADD COLUMN pricing JSONB DEFAULT '{}'::jsonb;");
      }
      if (missingColumns.includes('inventory')) {
        sqlCommands.push("ALTER TABLE products ADD COLUMN inventory JSONB DEFAULT '{}'::jsonb;");
      }
      if (missingColumns.includes('status')) {
        sqlCommands.push("ALTER TABLE products ADD COLUMN status TEXT DEFAULT 'active';");
      }
      if (missingColumns.includes('featured')) {
        sqlCommands.push('ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT false;');
      }
      if (missingColumns.includes('updated_at')) {
        sqlCommands.push('ALTER TABLE products ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();');
      }

      sqlCommands.forEach(cmd => console.log(cmd));
      
      console.log('\n🚀 Copy and paste these commands into your Supabase SQL Editor:');
      console.log('─'.repeat(80));
      console.log(sqlCommands.join('\n'));
    }

    // Test a simple query to make sure connection works
    console.log('\n🧪 Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count(*)')
      .limit(1);

    if (testError) {
      console.log('❌ Connection test failed:', testError.message);
    } else {
      console.log('✅ Database connection working!');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkSchema().then(() => {
  console.log('\n✨ Schema check complete!');
  process.exit(0);
});
