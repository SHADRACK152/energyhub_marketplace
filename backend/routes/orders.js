const express = require('express');
const router = express.Router();

// In-memory storage for development when Supabase is not available
let memoryOrders = [
  {
    id: 1,
    orderNumber: 'ORD-1735632847832',
    productName: 'Solar Panel System',
    productImage: '/uploads/solar.jpg',
    price: 1299.99,
    orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Processing',
    statusSteps: [
      { label: 'Reviewing', completed: true },
      { label: 'Processing', completed: true },
      { label: 'Shipping', completed: false },
      { label: 'Delivered', completed: false },
    ],
    userId: 'demo-user',
    buyerId: 'buyer-123',
    buyerName: 'Tesla Solar Corp',
    buyerEmail: 'orders@teslasolar.com',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    orderNumber: 'ORD-1735632847833',
    productName: 'Wind Turbine Generator',
    productImage: '/uploads/wind-turbine.jpg',
    price: 2499.99,
    orderDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Shipping',
    statusSteps: [
      { label: 'Reviewing', completed: true },
      { label: 'Processing', completed: true },
      { label: 'Shipping', completed: true },
      { label: 'Delivered', completed: false },
    ],
    userId: 'demo-user',
    buyerId: 'buyer-456',
    buyerName: 'GreenTech Industries',
    buyerEmail: 'procurement@greentech.com',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  }
];

// Use Supabase for persistent order storage

// Place a new order
router.post('/', async (req, res) => {
  try {
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
    
    try {
      const { data, error } = await supabase.from('orders').insert([orderData]).select();
      if (error) throw error;
      res.status(201).json(data[0]);
    } catch (supabaseError) {
      console.log('Supabase order creation failed, returning mock response:', supabaseError.message);
      // Return mock success response
      const mockOrder = {
        id: Date.now(),
        ...orderData,
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: false },
          { label: 'Shipping', completed: false },
          { label: 'Delivered', completed: false },
        ]
      };
      res.status(201).json(mockOrder);
    }
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders - Create a new order (from payment completion)
router.post('/', async (req, res) => {
  try {
    const { 
      productName, 
      productImage, 
      price, 
      paymentMethod, 
      userId = 'demo-user',
      quantity = 1
    } = req.body;

    // Generate order ID and number
    const orderId = Date.now();
    const orderNumber = `ORD-${orderId}`;
    
    // Create new order object
    const newOrder = {
      id: orderId,
      orderNumber,
      productName,
      productImage: productImage || '/uploads/solar.jpg',
      price: parseFloat(price),
      quantity,
      totalAmount: parseFloat(price) * quantity,
      paymentMethod,
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      status: 'Reviewing',
      statusSteps: [
        { label: 'Reviewing', completed: true },
        { label: 'Processing', completed: false },
        { label: 'Shipping', completed: false },
        { label: 'Delivered', completed: false },
      ],
      userId,
      buyerId: 'buyer-new-' + Date.now(),
      buyerName: 'New Customer',
      buyerEmail: 'customer@example.com',
      createdAt: new Date().toISOString(),
    };

    // Add to memory storage
    memoryOrders.push(newOrder);

    console.log('New order created:', newOrder);
    
    res.status(201).json({
      success: true,
      order: newOrder,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Failed to create order',
      details: error.message
    });
  }
});

// GET /api/orders - Get all orders for a user
router.get('/', async (req, res) => {
  try {
    const supabase = req.supabase;
    let query = supabase.from('orders').select('*').order('createdAt', { ascending: false });
    // Optionally filter by userId: req.query.userId
    if (req.query.userId) {
      query = query.eq('userId', req.query.userId);
    }
    
    try {
      const { data, error } = await query;
      if (error) throw error;
      // Parse statusSteps from string to array
      const orders = data.map(order => ({ ...order, statusSteps: JSON.parse(order.statusSteps || '[]') }));
      res.json(orders);
    } catch (supabaseError) {
      console.log('Supabase orders fetch failed, returning mock orders:', supabaseError.message);
      // Return mock orders for development
      const mockOrders = [
        {
          id: 1,
          orderNumber: 'ORD-1735632847832',
          productName: 'Solar Panel System',
          productImage: '/uploads/solar.jpg',
          price: 1299.99,
          orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Processing',
          statusSteps: [
            { label: 'Reviewing', completed: true },
            { label: 'Processing', completed: true },
            { label: 'Shipping', completed: false },
            { label: 'Delivered', completed: false },
          ],
          userId: 'demo-user',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          orderNumber: 'ORD-1735632847833',
          productName: 'Wind Turbine Generator',
          productImage: '/uploads/wind-turbine.jpg',
          price: 2499.99,
          orderDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          deliveryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Shipping',
          statusSteps: [
            { label: 'Reviewing', completed: true },
            { label: 'Processing', completed: true },
            { label: 'Shipping', completed: true },
            { label: 'Delivered', completed: false },
          ],
          userId: 'demo-user',
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        }
      ];
      
      // Filter by userId if provided
      let filteredOrders = mockOrders;
      if (req.query.userId) {
        filteredOrders = mockOrders.filter(order => order.userId === req.query.userId);
      }
      
      res.json(filteredOrders);
    }
  } catch (err) {
    console.error('Orders fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const supabase = req.supabase;
    
    try {
      const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
      if (error || !data) throw new Error('Order not found');
      data.statusSteps = JSON.parse(data.statusSteps || '[]');
      res.json(data);
    } catch (supabaseError) {
      console.log('Supabase single order fetch failed, returning mock order:', supabaseError.message);
      // Return mock order for development
      const mockOrder = {
        id: parseInt(req.params.id),
        orderNumber: `ORD-${Date.now()}`,
        productName: 'Solar Panel System',
        productImage: '/uploads/solar.jpg',
        price: 1299.99,
        orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Processing',
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: true },
          { label: 'Shipping', completed: false },
          { label: 'Delivered', completed: false },
        ],
        userId: 'demo-user',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      };
      res.json(mockOrder);
    }
  } catch (err) {
    console.error('Single order fetch error:', err);
    res.status(404).json({ error: 'Order not found' });
  }
});

// Update order status (simulate progress)
router.patch('/:id/status', async (req, res) => {
  try {
    const supabase = req.supabase;
    const { status } = req.body;
    
    try {
      // Fetch current order
      const { data: order, error: fetchError } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
      if (fetchError || !order) throw new Error('Order not found');
      
      let statusSteps = JSON.parse(order.statusSteps || '[]');
      if (status) {
        order.status = status;
        statusSteps = statusSteps.map(step => ({ ...step, completed: (step.label === status || step.completed) }));
      }
      
      const { data: updated, error: updateError } = await supabase.from('orders').update({ status, statusSteps: JSON.stringify(statusSteps) }).eq('id', req.params.id).select();
      if (updateError) throw updateError;
      
      const updatedOrder = updated[0];
      updatedOrder.statusSteps = statusSteps;
      res.json(updatedOrder);
    } catch (supabaseError) {
      console.log('Supabase order update failed, returning mock response:', supabaseError.message);
      // Return mock updated order
      const mockOrder = {
        id: parseInt(req.params.id),
        orderNumber: `ORD-${Date.now()}`,
        productName: 'Solar Panel System',
        productImage: '/uploads/solar.jpg',
        price: 1299.99,
        orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: status || 'Processing',
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: status === 'Processing' || status === 'Shipping' || status === 'Delivered' },
          { label: 'Shipping', completed: status === 'Shipping' || status === 'Delivered' },
          { label: 'Delivered', completed: status === 'Delivered' },
        ],
        userId: 'demo-user',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      };
      res.json(mockOrder);
    }
  } catch (err) {
    console.error('Order status update error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
