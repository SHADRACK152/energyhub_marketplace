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

// ==================== PROMO CODES API ====================

// Get all promo codes (for admin) or seller's promo codes
app.get('/api/promo-codes', async (req, res) => {
  try {
    const { sellerId } = req.query;
    
    // Try Supabase first
    try {
      let query = supabase.from('promo_codes').select('*');
      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (!error && data) {
        return res.json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase promo codes fetch failed, using fallback');
    }
    
    // Fallback to in-memory storage
    let filteredCodes = promoCodes;
    if (sellerId) {
      filteredCodes = promoCodes.filter(code => code.sellerId === sellerId);
    }
    res.json(filteredCodes);
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    res.status(500).json({ error: 'Failed to fetch promo codes' });
  }
});

// Get single promo code by code
app.get('/api/promo-codes/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();
      
      if (!error && data) {
        return res.json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase promo code fetch failed, using fallback');
    }
    
    // Fallback to in-memory storage
    const promoCode = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase());
    if (!promoCode) {
      return res.status(404).json({ error: 'Promo code not found' });
    }
    res.json(promoCode);
  } catch (error) {
    console.error('Error fetching promo code:', error);
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
    
    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert([{
          code: newPromoCode.code,
          type: newPromoCode.type,
          value: newPromoCode.value,
          description: newPromoCode.description,
          seller_id: newPromoCode.sellerId,
          seller_name: newPromoCode.sellerName,
          minimum_order: newPromoCode.minimumOrder,
          max_uses: newPromoCode.maxUses,
          current_uses: newPromoCode.currentUses,
          start_date: newPromoCode.startDate,
          end_date: newPromoCode.endDate,
          is_active: newPromoCode.isActive
        }])
        .select()
        .single();
      
      if (!error && data) {
        return res.status(201).json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase promo code creation failed, using fallback');
    }
    
    // Fallback to in-memory storage
    promoCodes.push(newPromoCode);
    res.status(201).json(newPromoCode);
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
