const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbHelpers } = require('../database');

// File-based persistence for orders
const ordersFilePath = path.join(__dirname, '..', 'saved-orders.json');

// Load orders from file on startup
let memoryOrders = [];
try {
  if (fs.existsSync(ordersFilePath)) {
    const savedOrders = fs.readFileSync(ordersFilePath, 'utf8');
    memoryOrders = JSON.parse(savedOrders);
    console.log(`Loaded ${memoryOrders.length} previously created orders from file`);
  }
} catch (error) {
  console.log('Could not load saved orders:', error.message);
  memoryOrders = [];
}

// Function to save orders to file
const saveOrdersToFile = () => {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(memoryOrders, null, 2));
    console.log(`Saved ${memoryOrders.length} orders to file`);
  } catch (error) {
    console.error('Error saving orders to file:', error.message);
  }
};

// Use Supabase for persistent order storage

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
    
    // Create new order object for SQLite
    const orderData = {
      orderNumber,
      productName,
      productImage: productImage || '/uploads/solar.jpg',
      price: parseFloat(price),
      subtotal: parseFloat(price) * quantity,
      shipping: 0,
      tax: 0,
      discount: 0,
      promoCode: null,
      shippingInfo: JSON.stringify({}),
      paymentInfo: JSON.stringify({ method: paymentMethod }),
      items: JSON.stringify([{ name: productName, price, quantity }]),
      userId,
      userEmail: 'customer@example.com',
      orderStatus: 'Reviewing'
    };

    try {
      // Save to SQLite database
      const result = await dbHelpers.run(`
        INSERT INTO orders (
          orderNumber, productName, productImage, price, subtotal, shipping, tax, discount,
          promoCode, shippingInfo, paymentInfo, items, userId, userEmail, orderStatus
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        orderData.orderNumber,
        orderData.productName,
        orderData.productImage,
        orderData.price,
        orderData.subtotal,
        orderData.shipping,
        orderData.tax,
        orderData.discount,
        orderData.promoCode,
        orderData.shippingInfo,
        orderData.paymentInfo,
        orderData.items,
        orderData.userId,
        orderData.userEmail,
        orderData.orderStatus
      ]);
      
      console.log('✅ Order saved to SQLite database:', result.id);
      
      // Get the saved order from database
      const savedOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = ?', [result.id]);
      
      // Transform for frontend format
      const responseOrder = {
        id: savedOrder.id,
        orderNumber: savedOrder.orderNumber,
        productName: savedOrder.productName,
        productImage: savedOrder.productImage,
        price: savedOrder.price,
        quantity: quantity,
        totalAmount: savedOrder.subtotal,
        paymentMethod: paymentMethod,
        orderDate: savedOrder.createdAt,
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: savedOrder.orderStatus,
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: false },
          { label: 'Shipping', completed: false },
          { label: 'Delivered', completed: false },
        ],
        userId: savedOrder.userId,
        buyerId: 'buyer-new-' + Date.now(),
        buyerName: 'New Customer',
        buyerEmail: savedOrder.userEmail,
        paymentStatus: 'Paid',
        createdAt: savedOrder.createdAt
      };
      
      res.status(201).json({
        success: true,
        order: responseOrder,
        message: 'Order created and saved to SQLite database successfully'
      });
    } catch (supabaseError) {
      console.log('Supabase order creation failed, using memory storage:', supabaseError.message);
      
      // Fallback: Add to memory storage if Supabase fails
      const memoryOrder = {
        ...orderData,
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: false },
          { label: 'Shipping', completed: false },
          { label: 'Delivered', completed: false },
        ]
      };
      
      memoryOrders.push(memoryOrder);
      saveOrdersToFile(); // Persist to file
      console.log('Order saved to memory:', memoryOrder);
      
      res.status(201).json({
        success: true,
        order: memoryOrder,
        message: 'Order created successfully (saved to memory - database schema mismatch)'
      });
    }

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
    const { userId } = req.query;
    console.log(`API Request: GET /api/orders with userId=${userId}`);
    
    let query = 'SELECT * FROM orders';
    let params = [];
    
    if (userId) {
      query += ' WHERE userId = ?';
      params.push(userId);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const orders = await dbHelpers.query(query, params);
    
    // Transform orders to match frontend expectations
    const transformedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      productName: order.productName,
      productImage: order.productImage,
      price: order.price,
      quantity: 1,
      totalAmount: order.subtotal,
      paymentMethod: order.paymentInfo ? JSON.parse(order.paymentInfo).method : 'Unknown',
      orderDate: order.createdAt,
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: order.orderStatus,
      statusSteps: [
        { label: 'Reviewing', completed: true },
        { label: 'Processing', completed: false },
        { label: 'Shipping', completed: false },
        { label: 'Delivered', completed: false },
      ],
      userId: order.userId,
      buyerId: 'buyer-' + order.id,
      buyerName: 'Customer',
      buyerEmail: order.userEmail,
      paymentStatus: 'Paid',
      createdAt: order.createdAt
    }));
    
    console.log(`✅ Retrieved ${orders.length} orders from SQLite`);
    res.json(transformedOrders);
    
  } catch (error) {
    console.error('❌ Error fetching orders from SQLite:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
        

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    
    // Try to get from SQLite first
    const order = await dbHelpers.get('SELECT * FROM orders WHERE id = ? OR orderNumber = ?', [orderId, orderId]);
    
    if (order) {
      // Transform for frontend
      const transformedOrder = {
        id: order.id,
        orderNumber: order.orderNumber,
        productName: order.productName,
        productImage: order.productImage,
        price: order.price,
        quantity: 1,
        totalAmount: order.subtotal,
        paymentMethod: order.paymentInfo ? JSON.parse(order.paymentInfo).method : 'Unknown',
        orderDate: order.createdAt,
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: order.orderStatus,
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: order.orderStatus !== 'Reviewing' },
          { label: 'Shipping', completed: ['Shipped', 'Delivered'].includes(order.orderStatus) },
          { label: 'Delivered', completed: order.orderStatus === 'Delivered' },
        ],
        userId: order.userId,
        buyerId: 'buyer-' + order.id,
        buyerName: 'Customer',
        buyerEmail: order.userEmail,
        paymentStatus: 'Paid',
        createdAt: order.createdAt
      };
      
      console.log(`✅ Retrieved order ${orderId} from SQLite`);
      res.json(transformedOrder);
    } else {
      console.log('Order not found in SQLite, returning mock order:');
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

// Update order status and details
router.patch('/:id', async (req, res) => {
  try {
    const { 
      status, 
      paymentStatus, 
      trackingNumber, 
      carrier, 
      notes, 
      deliveredAt 
    } = req.body;
    
    const orderId = req.params.id;
    console.log(`📝 Updating order ${orderId} with:`, req.body);
    
    try {
      // First try to update in SQLite database
      const existingOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = ? OR orderNumber = ?', [orderId, orderId]);
      
      if (existingOrder) {
        // Build update query dynamically
        const updateFields = [];
        const updateParams = [];
        
        if (status) {
          updateFields.push('orderStatus = ?');
          updateParams.push(status);
        }
        
        // Always update the timestamp
        updateFields.push('updatedAt = CURRENT_TIMESTAMP');
        
        if (updateFields.length > 0) {
          // Add the WHERE clause parameter at the end
          updateParams.push(existingOrder.id);
          const updateQuery = `UPDATE orders SET ${updateFields.join(', ')} WHERE id = ?`;
          console.log(`🔄 Executing update: ${updateQuery}`, updateParams);
          await dbHelpers.run(updateQuery, updateParams);
        }
        
        // Get updated order
        const updatedOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = ?', [existingOrder.id]);
        
        // Transform for frontend format with status steps
        const statusSteps = [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: ['Processing', 'Shipped', 'Delivered'].includes(updatedOrder.orderStatus) },
          { label: 'Shipping', completed: ['Shipped', 'Delivered'].includes(updatedOrder.orderStatus) },
          { label: 'Delivered', completed: updatedOrder.orderStatus === 'Delivered' },
        ];
        
        const responseOrder = {
          id: updatedOrder.id,
          orderNumber: updatedOrder.orderNumber,
          productName: updatedOrder.productName,
          productImage: updatedOrder.productImage,
          price: updatedOrder.price,
          quantity: 1,
          totalAmount: updatedOrder.subtotal,
          paymentMethod: updatedOrder.paymentInfo ? JSON.parse(updatedOrder.paymentInfo).method : 'Unknown',
          orderDate: updatedOrder.createdAt,
          deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: updatedOrder.orderStatus,
          statusSteps: statusSteps,
          userId: updatedOrder.userId,
          buyerId: 'buyer-' + updatedOrder.id,
          buyerName: 'Customer',
          buyerEmail: updatedOrder.userEmail,
          paymentStatus: paymentStatus || 'Paid',
          trackingNumber: trackingNumber || null,
          carrier: carrier || null,
          notes: notes || null,
          deliveredAt: deliveredAt || null,
          createdAt: updatedOrder.createdAt,
          updatedAt: updatedOrder.updatedAt
        };
        
        console.log('✅ Order updated in SQLite:', responseOrder);
        return res.json(responseOrder);
      }
      
      // Fallback: Check memory orders
      const memoryOrderIndex = memoryOrders.findIndex(order => order.id == orderId || order.orderNumber === orderId);
      
      if (memoryOrderIndex !== -1) {
        // Update memory order
        const updatedFields = {};
        if (status) updatedFields.status = status;
        if (paymentStatus) updatedFields.paymentStatus = paymentStatus;
        if (trackingNumber) updatedFields.trackingNumber = trackingNumber;
        if (carrier) updatedFields.carrier = carrier;
        if (notes) updatedFields.notes = notes;
        if (deliveredAt) updatedFields.deliveredAt = deliveredAt;
        
        // Update status steps based on status
        if (status) {
          updatedFields.statusSteps = [
            { label: 'Reviewing', completed: true },
            { label: 'Processing', completed: ['Processing', 'Shipped', 'Delivered'].includes(status) },
            { label: 'Shipping', completed: ['Shipped', 'Delivered'].includes(status) },
            { label: 'Delivered', completed: status === 'Delivered' },
          ];
        }
        
        memoryOrders[memoryOrderIndex] = {
          ...memoryOrders[memoryOrderIndex],
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
        
        saveOrdersToFile(); // Persist changes
        console.log('✅ Updated memory order:', memoryOrders[memoryOrderIndex]);
        return res.json(memoryOrders[memoryOrderIndex]);
      }
      
      // Order not found
      return res.status(404).json({ error: 'Order not found' });
      
    } catch (dbError) {
      console.log('❌ SQLite order update failed:', dbError.message);
      res.status(500).json({ error: 'Failed to update order' });
    }
  } catch (err) {
    console.error('Order update error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/:id/cancel-request - Buyer requests order cancellation
router.post('/:id/cancel-request', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { reason, requestedAt, requestedBy } = req.body;
    
    console.log('Cancel request received for order:', orderId, 'Reason:', reason);
    
    // Find the order in memory
    const orderIndex = memoryOrders.findIndex(order => order.id == orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = memoryOrders[orderIndex];
    
    // Check if order can be cancelled
    const cancellableStatuses = ['Reviewing', 'Pending', 'Processing'];
    if (!cancellableStatuses.includes(order.status)) {
      return res.status(400).json({ 
        error: 'Order cannot be cancelled at this stage',
        currentStatus: order.status 
      });
    }

    // Add cancellation request to order
    memoryOrders[orderIndex] = {
      ...order,
      status: 'Cancel Requested',
      cancelRequest: {
        reason,
        requestedAt,
        requestedBy,
        status: 'pending'
      }
    };

    // Save to file
    saveOrdersToFile();
    
    console.log('Cancellation request added to order:', orderId);
    
    res.json({ 
      message: 'Cancellation request submitted successfully',
      order: memoryOrders[orderIndex]
    });
  } catch (err) {
    console.error('Cancel request error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/:id/cancel-approve - Seller approves cancellation request
router.post('/:id/cancel-approve', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { approvedBy, refundAmount, notes } = req.body;
    
    console.log('Cancel approval received for order:', orderId);
    
    // Find the order in memory
    const orderIndex = memoryOrders.findIndex(order => order.id == orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = memoryOrders[orderIndex];
    
    // Check if there's a pending cancel request
    if (!order.cancelRequest || order.cancelRequest.status !== 'pending') {
      return res.status(400).json({ error: 'No pending cancellation request found' });
    }

    // Approve cancellation
    memoryOrders[orderIndex] = {
      ...order,
      status: 'Cancelled',
      cancelRequest: {
        ...order.cancelRequest,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        approvedBy,
        refundAmount: refundAmount || order.totalAmount,
        notes
      }
    };

    // Save to file
    saveOrdersToFile();
    
    console.log('Cancellation approved for order:', orderId);
    
    res.json({ 
      message: 'Cancellation approved successfully',
      order: memoryOrders[orderIndex]
    });
  } catch (err) {
    console.error('Cancel approval error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/:id/cancel-reject - Seller rejects cancellation request
router.post('/:id/cancel-reject', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { rejectedBy, reason } = req.body;
    
    console.log('Cancel rejection received for order:', orderId);
    
    // Find the order in memory
    const orderIndex = memoryOrders.findIndex(order => order.id == orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = memoryOrders[orderIndex];
    
    // Check if there's a pending cancel request
    if (!order.cancelRequest || order.cancelRequest.status !== 'pending') {
      return res.status(400).json({ error: 'No pending cancellation request found' });
    }

    // Reject cancellation - restore original status
    const originalStatus = order.cancelRequest.originalStatus || 'Processing';
    
    memoryOrders[orderIndex] = {
      ...order,
      status: originalStatus,
      cancelRequest: {
        ...order.cancelRequest,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectedBy,
        rejectionReason: reason
      }
    };

    // Save to file
    saveOrdersToFile();
    
    console.log('Cancellation rejected for order:', orderId);
    
    res.json({ 
      message: 'Cancellation request rejected',
      order: memoryOrders[orderIndex]
    });
  } catch (err) {
    console.error('Cancel rejection error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Legacy endpoint for backward compatibility
router.patch('/:id/status', async (req, res) => {
  // Redirect to the main PATCH endpoint
  req.body = { status: req.body.status };
  return router.patch('/:id')(req, res);
});

module.exports = router;
