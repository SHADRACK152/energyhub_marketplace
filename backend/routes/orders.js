const express = require('express');
const router = express.Router();

// Use Supabase for persistent order storage

// Place a new order
router.post('/', async (req, res) => {
  const supabase = req.supabase;
  const orderData = {
    ...req.body,
    status: 'Reviewing',
    statusSteps: JSON.stringify([
      { label: 'Reviewing', completed: true },
      { label: 'Processing', completed: false },
      { label: 'Shipping', completed: false },
      { label: 'Delivered', completed: false },
    ]),
    createdAt: new Date().toISOString(),
  };
  const { data, error } = await supabase.from('orders').insert([orderData]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Get all orders (optionally filter by user)
router.get('/', async (req, res) => {
  const supabase = req.supabase;
  let query = supabase.from('orders').select('*').order('createdAt', { ascending: false });
  // Optionally filter by userId: req.query.userId
  if (req.query.userId) {
    query = query.eq('userId', req.query.userId);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  // Parse statusSteps from string to array
  const orders = data.map(order => ({ ...order, statusSteps: JSON.parse(order.statusSteps || '[]') }));
  res.json(orders);
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  const supabase = req.supabase;
  const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ error: 'Order not found' });
  data.statusSteps = JSON.parse(data.statusSteps || '[]');
  res.json(data);
});

// Update order status (simulate progress)
router.patch('/:id/status', async (req, res) => {
  const supabase = req.supabase;
  const { status } = req.body;
  // Fetch current order
  const { data: order, error: fetchError } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
  if (fetchError || !order) return res.status(404).json({ error: 'Order not found' });
  let statusSteps = JSON.parse(order.statusSteps || '[]');
  if (status) {
    order.status = status;
    statusSteps = statusSteps.map(step => ({ ...step, completed: (step.label === status || step.completed) }));
  }
  const { data: updated, error: updateError } = await supabase.from('orders').update({ status, statusSteps: JSON.stringify(statusSteps) }).eq('id', req.params.id).select();
  if (updateError) return res.status(500).json({ error: updateError.message });
  const updatedOrder = updated[0];
  updatedOrder.statusSteps = statusSteps;
  res.json(updatedOrder);
});

module.exports = router;
