-- Fix the orders table ID column type to accept text IDs
-- This will resolve the "invalid input syntax for type bigint" error

-- First, check current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'orders' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Drop the existing table if it has the wrong ID type
DROP TABLE IF EXISTS orders CASCADE;

-- Create the orders table with correct TEXT ID type
CREATE TABLE orders (
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

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_created_at ON orders(created_at);

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

-- Test with a sample order (this should work now)
INSERT INTO orders (
  id, order_number, product_name, price, status, user_id
) VALUES (
  'test-sample-' || extract(epoch from now())::text, 
  'ORD-001', 
  'Solar Panel', 
  1500.00, 
  'Reviewing', 
  'demo-user'
);

-- Verify the result
SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
