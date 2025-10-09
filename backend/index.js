// ...existing code...

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { dbHelpers } = require('./database');

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

// Import route files
const ordersRouter = require('./routes/orders');
const qnaRouter = require('./routes/qna');

// Use route files
app.use('/api/orders', ordersRouter);
app.use('/api/qna', qnaRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ...existing code...

// ...existing code...

// ==================== PROMO CODES API ====================

// Get all promo codes (for admin) or seller's promo codes
app.get('/api/promo-codes', async (req, res) => {
  try {
    const { sellerId } = req.query;
    
    let query = 'SELECT * FROM promo_codes';
    let params = [];
    
    if (sellerId) {
      query += ' WHERE sellerId = $1';
      params.push(sellerId);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const promoCodes = await dbHelpers.query(query, params);
    console.log(`✅ Retrieved ${promoCodes.length} promo codes from PostgreSQL`);
    res.json(promoCodes);
    
  } catch (error) {
    console.error('❌ Error fetching promo codes from PostgreSQL:', error);
    res.status(500).json({ error: 'Failed to fetch promo codes' });
  }
});

// Get single promo code by code
app.get('/api/promo-codes/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const promoCode = await dbHelpers.get(
      'SELECT * FROM promo_codes WHERE UPPER(code) = UPPER($1)', 
      [code]
    );
    
    if (!promoCode) {
      return res.status(404).json({ error: 'Promo code not found' });
    }
    
    console.log(`✅ Retrieved promo code ${code} from PostgreSQL`);
    res.json(promoCode);
    
  } catch (error) {
    console.error('❌ Error fetching promo code from PostgreSQL:', error);
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
    
    // Insert into PostgreSQL database
    try {
      const result = await dbHelpers.run(`
        INSERT INTO promo_codes (
          code, type, value, description, sellerId, sellerName,
          minimumOrder, maxUses, currentUses, startDate, endDate, isActive
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id
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
      const createdPromoCode = await dbHelpers.get('SELECT * FROM promo_codes WHERE id = $1', [result.rows[0].id]);
      
      console.log('✅ Promo code created successfully in PostgreSQL:', createdPromoCode);
      res.status(201).json({
        ...createdPromoCode,
        startDate: new Date(createdPromoCode.startDate),
        endDate: new Date(createdPromoCode.endDate)
      });
    } catch (postgresError) {
      console.log('PostgreSQL promo code creation failed, using fallback:', postgresError.message);
      
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
    
    // ...existing code...
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
    
    // ...existing code...
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
    let promoCode = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase());
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

// Register user (PostgreSQL)
app.post('/api/users/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Check if user exists
    const existingUser = await dbHelpers.get('SELECT email FROM users WHERE email = $1', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user in PostgreSQL
    const result = await dbHelpers.run(`
      INSERT INTO users (email, name, role, profileData) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id
    `, [email, name, role, JSON.stringify({ passwordHash })]);
    
    // Generate JWT
    const token = jwt.sign({ email, name, role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
    res.status(201).json({ token, user: { email, name, role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

// Login user (PostgreSQL)
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
    
    const user = await dbHelpers.get('SELECT email, name, role, profileData FROM users WHERE email = $1', [email]);
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    
    const profileData = JSON.parse(user.profiledata || '{}');
    const valid = await bcrypt.compare(password, profileData.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
    
    const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
    res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login.' });
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
  try {
    const { id } = req.params;
    const user = await dbHelpers.get('SELECT id, email, name, role, createdAt FROM users WHERE id = $1', [id]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});
