require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });
app.use(cors());

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);


// Inject supabase client into req for routes that need it
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// QnA API
const qnaRouter = require('./routes/qna');
app.use('/api/qna', qnaRouter);

// Orders API
const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

// Example: Get all products
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create a new product with image upload
app.post('/api/products', upload.array('images', 10), async (req, res) => {
  try {
    console.log('Adding new product...');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Parse product fields from body (fields sent as JSON string)
    const {
      name, brand, sku, category, description, specifications,
      pricing, inventory, status, featured
    } = req.body;

    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    // Parse JSON fields if sent as string
    let parsedSpecifications, parsedPricing, parsedInventory;
    
    try {
      parsedSpecifications = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
      parsedPricing = typeof pricing === 'string' ? JSON.parse(pricing) : pricing;
      parsedInventory = typeof inventory === 'string' ? JSON.parse(inventory) : inventory;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(400).json({ error: 'Invalid JSON in request data' });
    }

    // Handle images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
      console.log('Image URLs:', imageUrls);
    }

    const insertObj = {
      name,
      brand: brand || null,
      sku: sku || null,
      category,
      description: description || null,
      specifications: parsedSpecifications || {},
      pricing: parsedPricing || {},
      inventory: parsedInventory || {},
      images: imageUrls,
      status: status || 'active',
      featured: featured === 'true' || featured === true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Insert object:', insertObj);

    const { data, error } = await supabase.from('products').insert([insertObj]).select();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Product created successfully:', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});


// --- USERS ENDPOINTS ---
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
app.post('/api/users/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase.from('users').insert([
    { email, password_hash, name, role: role || 'buyer' }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  const user = data[0];
  // Generate JWT (same as login)
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

// Login user (returns JWT)
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  // Generate JWT
  const token = jwt.sign(
    { id: data.id, email: data.email, name: data.name, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, user: { id: data.id, email: data.email, name: data.name, role: data.role } });
});

// JWT auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
// Get user info by id
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').select('id, email, name, role, created_at').eq('id', id).single();
  if (error || !data) return res.status(404).json({ error: 'User not found' });
  res.json(data);
});
