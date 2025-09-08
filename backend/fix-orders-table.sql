-- Run this SQL in your Supabase SQL editor to check and fix the orders table

-- First, check if the orders table exists and what columns it has
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- If the table doesn't exist, create it with all required columns
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT,
  product_name TEXT,
  product_image TEXT,
  price NUMERIC,
  quantity INTEGER DEFAULT 1,
  total_amount NUMERIC,
  payment_method TEXT,
  order_date TIMESTAMPTZ DEFAULT NOW(),
  delivery_date TIMESTAMPTZ,
  status TEXT DEFAULT 'Reviewing',
  status_steps JSONB DEFAULT '[]',
  user_id TEXT,
  buyer_id TEXT,
  buyer_name TEXT,
  buyer_email TEXT,
  payment_status TEXT DEFAULT 'Paid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If the table exists but is missing the order_date column, add it:
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_date TIMESTAMPTZ DEFAULT NOW();

-- Add other missing columns if needed:
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_image TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_date TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Reviewing';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status_steps JSONB DEFAULT '[]';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_email TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Paid';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

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

DROP TRIGGER IF EXISTS update_orders_updated_at_trigger ON orders;
CREATE TRIGGER update_orders_updated_at_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- Test the table with a sample insert
INSERT INTO orders (
  id, 
  order_number, 
  product_name, 
  price, 
  quantity,
  total_amount,
  payment_method,
  status,
  user_id
) VALUES (
  'test-' || extract(epoch from now()),
  'ORD-' || extract(epoch from now()),
  'Test Solar Panel',
  1500.00,
  1,
  1500.00,
  'M-Pesa',
  'Reviewing',
  'user-test'
) ON CONFLICT (id) DO NOTHING;

-- Check the result
SELECT * FROM orders WHERE id LIKE 'test-%' LIMIT 1;
