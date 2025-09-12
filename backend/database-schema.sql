-- Create orders table for EnergyHub Marketplace
-- SQL schema included for reference; this project uses SQLite `energyhub.db` by default.

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(100),
  order_date TIMESTAMPTZ DEFAULT NOW(),
  delivery_date TIMESTAMPTZ,
  status VARCHAR(50) DEFAULT 'Reviewing',
  status_steps TEXT, -- JSON string
  user_id VARCHAR(100) DEFAULT 'demo-user',
  buyer_id VARCHAR(100),
  buyer_name VARCHAR(255) DEFAULT 'Customer',
  buyer_email VARCHAR(255) DEFAULT 'customer@example.com',
  buyer_phone VARCHAR(50),
  buyer_address TEXT,
  seller_id VARCHAR(100),
  seller_name VARCHAR(255),
  tracking_number VARCHAR(100),
  carrier VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'Paid',
  notes TEXT,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some example data (optional - remove if you don't want sample data)
-- INSERT INTO orders (
--   id, order_number, product_name, price, total_amount, 
--   status, status_steps, user_id, buyer_name, buyer_email
-- ) VALUES (
--   1757000000001, 
--   'ORD-1757000000001', 
--   'Solar Panel System 5kW', 
--   2500.00, 
--   2500.00,
--   'Reviewing',
--   '[{"label":"Reviewing","completed":true},{"label":"Processing","completed":false},{"label":"Shipping","completed":false},{"label":"Delivered","completed":false}]',
--   'demo-user',
--   'Test Customer',
--   'customer@example.com'
-- );
