const express = require('express');
const router = express.Router();
// ...existing code...
const { dbHelpers } = require('../database');

// POST /api/orders - Create a new order (PostgreSQL)
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

    const orderId = Date.now();
    const orderNumber = `ORD-${orderId}`;
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

    // Save to PostgreSQL
    const result = await dbHelpers.run(`
      INSERT INTO orders (
        orderNumber, productName, productImage, price, subtotal, 
        shipping, tax, discount, promoCode, shippingInfo, paymentInfo, 
        items, userId, userEmail, orderStatus
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id
    `, [
      orderData.orderNumber, orderData.productName, orderData.productImage,
      orderData.price, orderData.subtotal, orderData.shipping, orderData.tax,
      orderData.discount, orderData.promoCode, orderData.shippingInfo,
      orderData.paymentInfo, orderData.items, orderData.userId,
      orderData.userEmail, orderData.orderStatus
    ]);

    const savedOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = $1', [result.rows[0].id]);

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
      message: 'Order created and saved to PostgreSQL database successfully'
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Failed to create order',
      details: error.message
    });
  }
});

// GET /api/orders - List all orders (PostgreSQL)
router.get('/', async (req, res) => {
  try {
    const { userId, userEmail, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT * FROM orders';
    let params = [];
    
    if (userId) {
      query += ' WHERE userId = $1';
      params.push(userId);
    } else if (userEmail) {
      query += ' WHERE userEmail = $1';
      params.push(userEmail);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const orders = await dbHelpers.query(query, params);
    console.log(`✅ Retrieved ${orders.length} orders from PostgreSQL`);
    res.json(orders);
    
  } catch (error) {
    console.error('❌ Error fetching orders from PostgreSQL:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    
    // Try to get from PostgreSQL first
    const order = await dbHelpers.get('SELECT * FROM orders WHERE id = $1 OR orderNumber = $2', [orderId, orderId]);
    
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
        userEmail: order.userEmail
      };
      
      console.log(`✅ Retrieved order ${orderId} from PostgreSQL`);
      return res.json(transformedOrder);
    } else {
      console.log('Order not found in PostgreSQL, returning mock order:');
      
      // If not found, return a mock order for demo purposes
      const mockOrder = {
        id: orderId,
        orderNumber: `ORD-${orderId}`,
        productName: 'Sample Solar Panel',
        productImage: '/uploads/solar.jpg',
        price: 299.99,
        quantity: 1,
        totalAmount: 299.99,
        paymentMethod: 'Credit Card',
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Processing',
        statusSteps: [
          { label: 'Reviewing', completed: true },
          { label: 'Processing', completed: true },
          { label: 'Shipping', completed: false },
          { label: 'Delivered', completed: false },
        ],
        userId: 'demo-user',
        userEmail: 'customer@example.com'
      };
      
      res.json(mockOrder);
    }
    
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    try {
      // First try to update in PostgreSQL database
      const existingOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = $1 OR orderNumber = $2', [orderId, orderId]);
      
      if (existingOrder) {
        const updateFields = [];
        const updateParams = [];
        let paramIndex = 1;
        
        if (status) {
          updateFields.push(`orderStatus = $${paramIndex++}`);
          updateParams.push(status);
        }
        
        // Always update the timestamp
        updateFields.push('updatedAt = CURRENT_TIMESTAMP');
        
        if (updateFields.length > 0) {
          // Add the WHERE clause parameter at the end
          updateParams.push(existingOrder.id);
          const updateQuery = `UPDATE orders SET ${updateFields.join(', ')} WHERE id = $${paramIndex}`;
          console.log(`🔄 Executing update: ${updateQuery}`, updateParams);
          await dbHelpers.run(updateQuery, updateParams);
        }
        
        // Get updated order
        const updatedOrder = await dbHelpers.get('SELECT * FROM orders WHERE id = $1', [existingOrder.id]);
        
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
          statusSteps: [
            { label: 'Reviewing', completed: true },
            { label: 'Processing', completed: updatedOrder.orderStatus !== 'Reviewing' },
            { label: 'Shipping', completed: ['Shipped', 'Delivered'].includes(updatedOrder.orderStatus) },
            { label: 'Delivered', completed: updatedOrder.orderStatus === 'Delivered' },
          ],
          userId: updatedOrder.userId,
          userEmail: updatedOrder.userEmail
        };
        
        console.log('✅ Order updated in PostgreSQL:', responseOrder);
        return res.json({
          success: true,
          order: responseOrder,
          message: 'Order status updated successfully'
        });
        
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
      
    } catch (dbError) {
      console.log('❌ PostgreSQL order update failed:', dbError.message);
      return res.status(500).json({ 
        error: 'Database update failed',
        details: dbError.message
      });
    }
    
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ 
      error: 'Failed to update order',
      details: error.message
    });
  }
});

module.exports = router;