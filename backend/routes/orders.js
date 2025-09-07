const express = require('express');
const router = express.Router();

// Use Supabase for persistent order storage

// Place a new order
router.post('/', async (req, res) => {
  const supabase = req.supabase;
  
  // Enhanced order data with seller assignment
  const orderData = {
    ...req.body,
    status: 'Pending Review',
    statusSteps: JSON.stringify([
      { label: 'Pending Review', completed: true, timestamp: new Date().toISOString() },
      { label: 'Confirmed', completed: false, timestamp: null },
      { label: 'Processing', completed: false, timestamp: null },
      { label: 'Shipped', completed: false, timestamp: null },
      { label: 'Delivered', completed: false, timestamp: null },
    ]),
    createdAt: new Date().toISOString(),
    sellerId: null, // Will be assigned when seller confirms
    sellerNotes: '',
    estimatedDelivery: null,
    trackingNumber: null,
    needsSellerAction: true, // Flag for seller dashboard notifications
  };

  try {
    // Insert order into database
    const { data, error } = await supabase.from('orders').insert([orderData]).select();
    if (error) return res.status(500).json({ error: error.message });

    // Update product inventory (reduce stock)
    if (orderData.items && Array.isArray(orderData.items)) {
      for (const item of orderData.items) {
        if (item.productId) {
          // Fetch current product to update inventory
          const { data: product } = await supabase
            .from('products')
            .select('inventory')
            .eq('id', item.productId)
            .single();
          
          if (product && product.inventory) {
            const currentInventory = typeof product.inventory === 'string' 
              ? JSON.parse(product.inventory) 
              : product.inventory;
            
            const newStock = Math.max(0, (currentInventory.stock || 0) - item.quantity);
            
            await supabase
              .from('products')
              .update({ 
                inventory: JSON.stringify({
                  ...currentInventory,
                  stock: newStock,
                  lastUpdated: new Date().toISOString()
                })
              })
              .eq('id', item.productId);
          }
        }
      }
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (optionally filter by user/seller)
router.get('/', async (req, res) => {
  const supabase = req.supabase;
  let query = supabase.from('orders').select('*').order('createdAt', { ascending: false });
  
  // Filter by userId for buyers
  if (req.query.userId) {
    query = query.eq('userId', req.query.userId);
  }
  
  // Filter by sellerId for sellers
  if (req.query.sellerId) {
    query = query.eq('sellerId', req.query.sellerId);
  }
  
  // Filter orders that need seller action
  if (req.query.needsAction === 'true') {
    query = query.eq('needsSellerAction', true);
  }
  
  // Filter by status
  if (req.query.status) {
    query = query.eq('status', req.query.status);
  }
  
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  
  // If no data found, return sample orders for development
  if (!data || data.length === 0) {
    const sampleOrders = [
      {
        id: 'sample-1',
        orderNumber: 'ORD-2024-001',
        productName: 'Tesla Powerwall 2',
        productId: 'prod-1',
        buyerName: 'John Doe',
        buyerEmail: 'john@example.com',
        price: 12500,
        quantity: 1,
        total: 12500,
        status: 'Pending Review',
        createdAt: new Date().toISOString(),
        needsSellerAction: true,
        statusSteps: [
          { label: 'Pending Review', completed: true, timestamp: new Date().toISOString() },
          { label: 'Confirmed', completed: false, timestamp: null },
          { label: 'Processing', completed: false, timestamp: null },
          { label: 'Shipped', completed: false, timestamp: null },
          { label: 'Delivered', completed: false, timestamp: null },
        ]
      },
      {
        id: 'sample-2',
        orderNumber: 'ORD-2024-002',
        productName: 'SolarEdge SE7600H Inverter',
        productId: 'prod-2',
        buyerName: 'Jane Smith',
        buyerEmail: 'jane@example.com',
        price: 1800,
        quantity: 2,
        total: 3600,
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        needsSellerAction: false,
        statusSteps: [
          { label: 'Pending Review', completed: true, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
          { label: 'Confirmed', completed: true, timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString() },
          { label: 'Processing', completed: false, timestamp: null },
          { label: 'Shipped', completed: false, timestamp: null },
          { label: 'Delivered', completed: false, timestamp: null },
        ]
      },
      {
        id: 'sample-3',
        orderNumber: 'ORD-2024-003',
        productName: 'LG NeON R 365W Solar Panel',
        productId: 'prod-3',
        buyerName: 'Mike Johnson',
        buyerEmail: 'mike@example.com',
        price: 280,
        quantity: 10,
        total: 2800,
        status: 'Pending Review',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        needsSellerAction: true,
        statusSteps: [
          { label: 'Pending Review', completed: true, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
          { label: 'Confirmed', completed: false, timestamp: null },
          { label: 'Processing', completed: false, timestamp: null },
          { label: 'Shipped', completed: false, timestamp: null },
          { label: 'Delivered', completed: false, timestamp: null },
        ]
      }
    ];
    
    // Apply filters to sample data
    let filteredData = sampleOrders;
    
    if (req.query.needsAction === 'true') {
      filteredData = filteredData.filter(order => order.needsSellerAction);
    }
    
    if (req.query.status) {
      filteredData = filteredData.filter(order => order.status === req.query.status);
    }
    
    return res.json(filteredData);
  }
  
  // Parse statusSteps from string to array
  const orders = data.map(order => ({ 
    ...order, 
    statusSteps: JSON.parse(order.statusSteps || '[]'),
    items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
  }));
  
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

// Update order status (seller actions)
router.patch('/:id/status', async (req, res) => {
  const supabase = req.supabase;
  const { status, sellerId, sellerNotes, estimatedDelivery, trackingNumber } = req.body;
  
  // Fetch current order
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', req.params.id)
    .single();
  
  if (fetchError || !order) return res.status(404).json({ error: 'Order not found' });
  
  let statusSteps = JSON.parse(order.statusSteps || '[]');
  let needsSellerAction = order.needsSellerAction;
  
  // Update status steps
  if (status) {
    statusSteps = statusSteps.map(step => {
      if (step.label === status) {
        return { ...step, completed: true, timestamp: new Date().toISOString() };
      }
      return step;
    });
    
    // Update seller action flag based on status
    if (status === 'Confirmed' || status === 'Processing' || status === 'Shipped') {
      needsSellerAction = false;
    } else if (status === 'Pending Review') {
      needsSellerAction = true;
    }
  }
  
  // Build update object
  const updateData = {
    status,
    statusSteps: JSON.stringify(statusSteps),
    needsSellerAction,
    updatedAt: new Date().toISOString()
  };
  
  // Add optional fields if provided
  if (sellerId) updateData.sellerId = sellerId;
  if (sellerNotes) updateData.sellerNotes = sellerNotes;
  if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;
  if (trackingNumber) updateData.trackingNumber = trackingNumber;
  
  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', req.params.id)
    .select();
  
  if (updateError) return res.status(500).json({ error: updateError.message });
  
  const updatedOrder = updated[0];
  updatedOrder.statusSteps = statusSteps;
  
  res.json(updatedOrder);
});

// Seller confirms/rejects order
router.patch('/:id/confirm', async (req, res) => {
  const supabase = req.supabase;
  const { action, sellerId, sellerNotes, estimatedDelivery } = req.body; // action: 'confirm' or 'reject'
  
  const newStatus = action === 'confirm' ? 'Confirmed' : 'Rejected';
  
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: newStatus,
      sellerId: sellerId,
      sellerNotes: sellerNotes || '',
      estimatedDelivery: estimatedDelivery || null,
      needsSellerAction: false,
      updatedAt: new Date().toISOString()
    })
    .eq('id', req.params.id)
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  
  res.json(data[0]);
});

module.exports = router;
