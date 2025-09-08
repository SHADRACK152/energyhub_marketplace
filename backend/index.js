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

// In-memory storage for created products (fallback when Supabase fails)
let createdProducts = [];

// File-based persistence for created products
const fs = require('fs');
const productsFile = path.join(__dirname, 'created-products.json');

// Load previously created products on startup
try {
  if (fs.existsSync(productsFile)) {
    const savedProducts = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    createdProducts = savedProducts;
    console.log(`Loaded ${createdProducts.length} previously created products from file`);
  } else {
    // If no saved file exists, try to load recovery products
    try {
      const recoveredProducts = require('./recover-products');
      createdProducts = recoveredProducts;
      console.log(`Loaded ${createdProducts.length} recovered products from previous session`);
      // Save them to file for future use
      saveProductsToFile();
    } catch (err) {
      console.log('No recovery products found');
    }
  }
} catch (err) {
  console.log('Could not load saved products:', err.message);
}

// Function to save products to file
function saveProductsToFile() {
  try {
    fs.writeFileSync(productsFile, JSON.stringify(createdProducts, null, 2));
    console.log(`Saved ${createdProducts.length} products to file`);
  } catch (err) {
    console.error('Could not save products to file:', err.message);
  }
}


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
  try {
    const { data, error } = await supabase.from('products').select('*');
    
    // Mock products for fallback
    const mockProducts = [
      {
        id: 1,
        name: 'Solar Panel 400W',
        description: 'High-efficiency solar panel',
        price: 299.99,
        stock: 150,
        status: 'active',
        category: 'solar-panels',
        sku: 'SP-400-2024',
        featured: true,
        image: 'http://localhost:5000/public/assets/images/solar.jpg',
        images: ['http://localhost:5000/public/assets/images/solar.jpg'],
        seller: 'SolarTech Pro',
        inStock: true,
        stockCount: 150
      }
    ];
    
    if (error) {
      console.log('Supabase error, returning mock data + created products:', error.message);
      // Combine mock products with created products when Supabase fails
      const allProducts = [...mockProducts, ...createdProducts];
      return res.json(allProducts);
    } else {
      // ALWAYS combine Supabase data with created products
      const allProducts = [...mockProducts, ...(data || []), ...createdProducts];
      console.log(`Returning ${allProducts.length} total products (${data?.length || 0} from DB, ${createdProducts.length} from memory)`);
      return res.json(allProducts);
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
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
      imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
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
      image: imageUrls[0] || null, // Add single image field for frontend compatibility
      price: parsedPricing?.basePrice ? parseFloat(parsedPricing.basePrice) : null, // Extract price for database
      stock: parsedInventory?.stock ? parseInt(parsedInventory.stock) : 0, // Extract stock for database
      status: status || 'active',
      featured: featured === 'true' || featured === true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Insert object:', insertObj);

    const { data, error } = await supabase.from('products').insert([insertObj]).select();
    
    if (error) {
      console.error('Supabase error:', error);
      console.error('Supabase product creation failed, returning mock response:', error.message);
      
      // Create mock product for immediate use
      const mockProduct = {
        id: Date.now(),
        ...insertObj,
        seller: 'EnergyHub Seller',
        inStock: true,
        stockCount: insertObj.stock || 0
      };
      
      // Store in memory for retrieval by GET endpoint
      createdProducts.push(mockProduct);
      saveProductsToFile(); // Persist to file
      
      console.log('Mock product created and stored:', mockProduct);
      return res.status(201).json(mockProduct);
    }

    console.log('Product created successfully:', data[0]);
    
    // ALSO store successful Supabase products in memory as backup
    const successfulProduct = {
      ...data[0],
      seller: 'EnergyHub Seller',
      inStock: true,
      stockCount: data[0].stock || 0
    };
    createdProducts.push(successfulProduct);
    saveProductsToFile(); // Persist to file
    console.log(`Product stored in both Supabase and memory. Total in memory: ${createdProducts.length}`);
    
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
