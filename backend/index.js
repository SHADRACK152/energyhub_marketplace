require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { db, dbHelpers } = require('./database');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration for Vercel deployment
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4028',
    'https://energyhub-marketplace.vercel.app',
    'https://energyhub-marketplace-git-main-shadracks-projects-a418ee81.vercel.app',
    /https:\/\/energyhub-marketplace-.*\.vercel\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

// In-memory storage for created products (fallback when Supabase fails)
let createdProducts = [];

// In-memory storage for promo codes (fallback when Supabase fails)
let promoCodes = [
  {
    id: 1,
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% off your entire order',
    sellerId: 'seller-001',
    sellerName: 'SolarTech Pro',
    minimumOrder: 0,
    maxUses: 1000,
    currentUses: 45,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: 2,
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    description: 'Free shipping on all orders',
    sellerId: 'seller-001',
    sellerName: 'SolarTech Pro',
    minimumOrder: 50,
    maxUses: 500,
    currentUses: 123,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: 3,
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    description: '$50 off orders over $200',
    sellerId: 'seller-002',
    sellerName: 'EcoEnergy Solutions',
    minimumOrder: 200,
    maxUses: 200,
    currentUses: 78,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2025-02-01')
  },
  {
    id: 4,
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: '20% off for new customers',
    sellerId: 'seller-001',
    sellerName: 'SolarTech Pro',
    minimumOrder: 100,
    maxUses: 1000,
    currentUses: 234,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2025-01-01')
  },
  {
    id: 5,
    code: 'BULK15',
    type: 'percentage',
    value: 15,
    description: '15% off bulk orders (5+ items)',
    sellerId: 'seller-003',
    sellerName: 'GreenPower Supplies',
    minimumOrder: 0,
    maxUses: 100,
    currentUses: 23,
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2025-03-01')
  }
];

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


// SQLite database is now available through dbHelpers in routes

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

// Get all products from SQLite
app.get('/api/products', async (req, res) => {
  try {
    // Get all products from SQLite database
    const products = await dbHelpers.query('SELECT * FROM products ORDER BY createdAt DESC');
    
    // Mock products for demo purposes
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
  image: 'https://energyhub-marketplace-backend.vercel.app/public/assets/images/solar.jpg',
  images: ['https://energyhub-marketplace-backend.vercel.app/public/assets/images/solar.jpg'],
        seller: 'SolarTech Pro',
        inStock: true,
        stockCount: 150
      }
    ];
    
    // Process SQLite products to match expected format
    const processedProducts = products.map(product => ({
      ...product,
      specifications: product.specifications ? JSON.parse(product.specifications) : null,
      tags: product.tags ? JSON.parse(product.tags) : [],
      images: product.image ? [product.image] : [],
      inStock: product.stockCount > 0
    }));
    
    // Combine mock products with database products
    const allProducts = [...mockProducts, ...processedProducts];
    
    console.log(`✅ Returning ${allProducts.length} total products (${products.length} from SQLite, ${mockProducts.length} mock)`);
    res.json(allProducts);
    
  } catch (err) {
    console.error('❌ Error fetching products from SQLite:', err);
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

    // Insert into SQLite database
    const result = await dbHelpers.run(`
      INSERT INTO products (
        name, description, price, originalPrice, image, category,
        sellerId, sellerName, stockCount, specifications, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      insertObj.name,
      insertObj.description,
      insertObj.price,
      parsedPricing?.originalPrice || null,
      insertObj.image,
      insertObj.category,
      'demo-seller-' + Date.now(),
      insertObj.brand || 'Demo Seller',
      insertObj.stock || 0,
      JSON.stringify(parsedSpecifications || {}),
      JSON.stringify([insertObj.category, insertObj.brand].filter(Boolean))
    ]);

    // Get the created product from database
    const createdProduct = await dbHelpers.get('SELECT * FROM products WHERE id = ?', [result.id]);
    
    // Format response to match frontend expectations
    const responseProduct = {
      ...createdProduct,
      specifications: createdProduct.specifications ? JSON.parse(createdProduct.specifications) : {},
      tags: createdProduct.tags ? JSON.parse(createdProduct.tags) : [],
      images: createdProduct.image ? [createdProduct.image] : [],
      inStock: createdProduct.stockCount > 0,
      seller: createdProduct.sellerName
    };

    console.log('✅ Product created successfully in SQLite:', responseProduct);
    res.status(201).json(responseProduct);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==================== PROMO CODES API ====================

// Get all promo codes (for admin) or seller's promo codes
app.get('/api/promo-codes', async (req, res) => {
  try {
    const { sellerId } = req.query;
    
    let query = 'SELECT * FROM promo_codes';
    let params = [];
    
    if (sellerId) {
      query += ' WHERE sellerId = ?';
      params.push(sellerId);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const promoCodes = await dbHelpers.query(query, params);
    console.log(`✅ Retrieved ${promoCodes.length} promo codes from SQLite`);
    res.json(promoCodes);
    
  } catch (error) {
    console.error('❌ Error fetching promo codes from SQLite:', error);
    res.status(500).json({ error: 'Failed to fetch promo codes' });
  }
});

// Get single promo code by code
app.get('/api/promo-codes/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const promoCode = await dbHelpers.get(
      'SELECT * FROM promo_codes WHERE UPPER(code) = UPPER(?)', 
      [code]
    );
    
    if (!promoCode) {
      return res.status(404).json({ error: 'Promo code not found' });
    }
    
    console.log(`✅ Retrieved promo code ${code} from SQLite`);
    res.json(promoCode);
    
  } catch (error) {
    console.error('❌ Error fetching promo code from SQLite:', error);
    res.status(500).json({ error: 'Failed to fetch promo code' });
  }
});

// Create new promo code
app.post('/api/promo-codes', async (req, res) => {
  try {
    const {
      code,
      type,
      value,
      description,
      sellerId,
      sellerName,
      minimumOrder = 0,
      maxUses = 1000,
      startDate,
      endDate
    } = req.body;
    
    if (!code || !type || !value || !sellerId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if code already exists
    const existingCode = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase());
    if (existingCode) {
      return res.status(400).json({ error: 'Promo code already exists' });
    }
    
    const newPromoCode = {
      id: promoCodes.length + 1,
      code: code.toUpperCase(),
      type,
      value: parseFloat(value),
      description: description || `${value}${type === 'percentage' ? '%' : '$'} off`,
      sellerId,
      sellerName: sellerName || 'Unknown Seller',
      minimumOrder: parseFloat(minimumOrder),
      maxUses: parseInt(maxUses),
      currentUses: 0,
      startDate: new Date(startDate || new Date()),
      endDate: new Date(endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      isActive: true,
      createdAt: new Date()
    };
    
    // Insert into SQLite database
    try {
      const result = await dbHelpers.run(`
        INSERT INTO promo_codes (
          code, type, value, description, sellerId, sellerName,
          minimumOrder, maxUses, currentUses, startDate, endDate, isActive
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        newPromoCode.code,
        newPromoCode.type,
        newPromoCode.value,
        newPromoCode.description,
        newPromoCode.sellerId,
        newPromoCode.sellerName,
        newPromoCode.minimumOrder,
        newPromoCode.maxUses,
        newPromoCode.currentUses,
        newPromoCode.startDate.toISOString(),
        newPromoCode.endDate.toISOString(),
        newPromoCode.isActive
      ]);
      
      // Get the created promo code from database
      const createdPromoCode = await dbHelpers.get('SELECT * FROM promo_codes WHERE id = ?', [result.id]);
      
      console.log('✅ Promo code created successfully in SQLite:', createdPromoCode);
      res.status(201).json({
        ...createdPromoCode,
        startDate: new Date(createdPromoCode.startDate),
        endDate: new Date(createdPromoCode.endDate)
      });
    } catch (sqliteError) {
      console.log('SQLite promo code creation failed, using fallback:', sqliteError.message);
      
      // Fallback to in-memory storage
      promoCodes.push(newPromoCode);
      res.status(201).json(newPromoCode);
    }
  } catch (error) {
    console.error('Error creating promo code:', error);
    res.status(500).json({ error: 'Failed to create promo code' });
  }
});

// Update promo code
app.put('/api/promo-codes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (!error && data) {
        return res.json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase promo code update failed, using fallback');
    }
    
    // Fallback to in-memory storage
    const promoIndex = promoCodes.findIndex(p => p.id === parseInt(id));
    if (promoIndex === -1) {
      return res.status(404).json({ error: 'Promo code not found' });
    }
    
    promoCodes[promoIndex] = { ...promoCodes[promoIndex], ...updates };
    res.json(promoCodes[promoIndex]);
  } catch (error) {
    console.error('Error updating promo code:', error);
    res.status(500).json({ error: 'Failed to update promo code' });
  }
});

// Delete promo code
app.delete('/api/promo-codes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try Supabase first
    try {
      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', id);
      
      if (!error) {
        return res.json({ message: 'Promo code deleted successfully' });
      }
    } catch (supabaseError) {
      console.log('Supabase promo code deletion failed, using fallback');
    }
    
    // Fallback to in-memory storage
    const promoIndex = promoCodes.findIndex(p => p.id === parseInt(id));
    if (promoIndex === -1) {
      return res.status(404).json({ error: 'Promo code not found' });
    }
    
    promoCodes.splice(promoIndex, 1);
    res.json({ message: 'Promo code deleted successfully' });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    res.status(500).json({ error: 'Failed to delete promo code' });
  }
});

// Validate and apply promo code
app.post('/api/promo-codes/validate', async (req, res) => {
  try {
    const { code, orderValue, itemCount = 1 } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }
    
    // Find promo code
    let promoCode = null;
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();
      
      if (!error && data) {
        promoCode = data;
      }
    } catch (supabaseError) {
      console.log('Supabase promo code validation failed, using fallback');
      promoCode = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase());
    }
    
    if (!promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }
    
    // Check if promo code is active
    if (!promoCode.isActive && !promoCode.is_active) {
      return res.status(400).json({ error: 'Promo code is no longer active' });
    }
    
    // Check date validity
    const now = new Date();
    const startDate = new Date(promoCode.startDate || promoCode.start_date);
    const endDate = new Date(promoCode.endDate || promoCode.end_date);
    
    if (now < startDate) {
      return res.status(400).json({ error: 'Promo code is not yet valid' });
    }
    
    if (now > endDate) {
      return res.status(400).json({ error: 'Promo code has expired' });
    }
    
    // Check usage limit
    const currentUses = promoCode.currentUses || promoCode.current_uses || 0;
    const maxUses = promoCode.maxUses || promoCode.max_uses || 1000;
    
    if (currentUses >= maxUses) {
      return res.status(400).json({ error: 'Promo code usage limit reached' });
    }
    
    // Check minimum order requirement
    const minimumOrder = promoCode.minimumOrder || promoCode.minimum_order || 0;
    if (orderValue < minimumOrder) {
      return res.status(400).json({ 
        error: `Minimum order value of $${minimumOrder} required for this promo code` 
      });
    }
    
    // Calculate discount
    let discount = 0;
    const promoType = promoCode.type;
    const promoValue = promoCode.value;
    
    switch (promoType) {
      case 'percentage':
        discount = (orderValue * promoValue) / 100;
        break;
      case 'fixed':
        discount = Math.min(promoValue, orderValue); // Don't exceed order value
        break;
      case 'free_shipping':
        discount = 0; // Handled separately in frontend
        break;
      default:
        return res.status(400).json({ error: 'Invalid promo code type' });
    }
    
    // Special handling for bulk discounts
    if (promoCode.code === 'BULK15' && itemCount < 5) {
      return res.status(400).json({ error: 'This promo code requires 5 or more items' });
    }
    
    res.json({
      valid: true,
      discount,
      type: promoType,
      description: promoCode.description,
      freeShipping: promoType === 'free_shipping'
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
});

// ==================== END PROMO CODES API ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});


// --- USERS ENDPOINTS ---
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
app.post('/api/users/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    
    // Check if user already exists
    const existingUser = await dbHelpers.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insert new user into SQLite
    const result = await dbHelpers.run(`
      INSERT INTO users (email, name, role, profileData) 
      VALUES (?, ?, ?, ?)
    `, [email, name || '', role || 'buyer', JSON.stringify({ password_hash })]);
    
    // Get the created user
    const user = await dbHelpers.get('SELECT * FROM users WHERE id = ?', [result.id]);
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    console.log('✅ User registered successfully:', user.email);
    res.status(201).json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user (returns JWT)
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    
    // Get user from SQLite
    const user = await dbHelpers.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Get password hash from profileData
    const profileData = user.profileData ? JSON.parse(user.profileData) : {};
    const storedPasswordHash = profileData.password_hash;
    
    if (!storedPasswordHash) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, storedPasswordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    console.log('✅ User logged in successfully:', user.email);
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
    console.error('❌ Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
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
