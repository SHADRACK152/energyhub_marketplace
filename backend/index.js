require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(express.json());
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

// Example: Get all products
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Example: Create a new product
app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  const { data, error } = await supabase.from('products').insert([{ name, price, description }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
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
