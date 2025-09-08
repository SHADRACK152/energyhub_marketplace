import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useToast } from '../../components/ui/Toast';

const B2BSellerOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]); // For bulk actions
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [trackingData, setTrackingData] = useState({
    trackingNumber: '',
    carrier: '',
    estimatedDelivery: '',
    status: '',
    notes: ''
  });
  const [refundData, setRefundData] = useState({
    reason: '',
    amount: '',
    notes: '',
    refundMethod: 'original'
  });
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Fetch seller orders from API (all orders for seller view)
    setLoading(true);
    fetch('http://localhost:5000/api/orders') // Remove userId filter to get all orders for seller
      .then(res => res.json())
      .then(data => {
        console.log('Fetched orders for seller:', data);
        // Transform data for seller view with enhanced order management
        const sellerOrders = Array.isArray(data) ? data.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          buyer: {
            name: order.buyerName || 'Unknown Buyer',
            company: order.buyerEmail?.split('@')[1]?.split('.')[0] || 'Company',
            email: order.buyerEmail || 'customer@example.com',
            phone: order.buyerPhone || '+1 (555) 000-0000',
            address: order.buyerAddress || 'Address not provided'
          },
          product: {
            name: order.productName,
            image: order.productImage,
            sku: order.productSku || 'SKU-' + order.id,
            quantity: order.quantity || 1
          },
          amount: order.price || order.totalAmount || 0,
          status: order.status || 'Pending',
          priority: order.priority || 'normal',
          orderDate: order.orderDate || order.createdAt,
          deliveryDate: order.deliveryDate,
          paymentMethod: order.paymentMethod || 'Credit Card',
          paymentStatus: order.paymentStatus || 'Paid',
          tracking: {
            number: order.trackingNumber || '',
            carrier: order.carrier || '',
            status: order.trackingStatus || 'Not Shipped',
            lastUpdate: order.trackingUpdate || null
          },
          notes: order.notes || '',
          buyerId: order.buyerId,
          createdAt: order.createdAt || order.orderDate
        })) : [];
        setOrders(sellerOrders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        // Enhanced fallback demo data for comprehensive order management
        const demoOrders = [
          {
            id: 1,
            orderNumber: 'ORD-001',
            buyer: {
              name: 'Tesla Solar Corp',
              company: 'Tesla Energy',
              email: 'orders@tesla.com',
              phone: '+1 (555) 123-4567',
              address: '3500 Deer Creek Road, Palo Alto, CA 94304'
            },
            product: {
              name: 'Solar Panel System 5kW',
              image: '/uploads/solar-panel.jpg',
              sku: 'SPV-5KW-001',
              quantity: 2
            },
            amount: 12500,
            status: 'Pending',
            priority: 'high',
            orderDate: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            paymentMethod: 'Wire Transfer',
            paymentStatus: 'Paid',
            tracking: {
              number: '',
              carrier: '',
              status: 'Awaiting Shipment',
              lastUpdate: null
            },
            notes: 'Urgent order for new facility installation',
            buyerId: 'buyer-001',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            orderNumber: 'ORD-002',
            buyer: {
              name: 'GreenTech Industries',
              company: 'GreenTech',
              email: 'procurement@greentech.com',
              phone: '+1 (555) 987-6543',
              address: '1234 Innovation Drive, Austin, TX 78759'
            },
            product: {
              name: 'Tesla Powerwall 2',
              image: '/uploads/powerwall.jpg',
              sku: 'TPW-2-001',
              quantity: 1
            },
            amount: 8900,
            status: 'Processing',
            priority: 'normal',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            tracking: {
              number: 'TRK123456789',
              carrier: 'FedEx',
              status: 'In Transit',
              lastUpdate: new Date(Date.now() - 3600000).toISOString()
            },
            notes: '',
            buyerId: 'buyer-002',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            orderNumber: 'ORD-003',
            buyer: {
              name: 'EcoEnergy Solutions',
              company: 'EcoEnergy',
              email: 'orders@ecoenergy.com',
              phone: '+1 (555) 456-7890',
              address: '789 Green Valley Blvd, Denver, CO 80202'
            },
            product: {
              name: 'SolarEdge Inverter 7.6kW',
              image: '/uploads/inverter.jpg',
              sku: 'SEI-7.6KW-001',
              quantity: 3
            },
            amount: 5550,
            status: 'Delivered',
            priority: 'normal',
            orderDate: new Date(Date.now() - 172800000).toISOString(),
            deliveryDate: new Date(Date.now() - 86400000).toISOString(),
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            tracking: {
              number: 'TRK987654321',
              carrier: 'UPS',
              status: 'Delivered',
              lastUpdate: new Date(Date.now() - 86400000).toISOString()
            },
            notes: 'Installation scheduled for next week',
            buyerId: 'buyer-003',
            createdAt: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: 4,
            orderNumber: 'ORD-004',
            buyer: {
              name: 'Renewable Energy Corp',
              company: 'RenewableCorp',
              email: 'purchasing@renewcorp.com',
              phone: '+1 (555) 321-0987',
              address: '456 Sustainability Lane, Portland, OR 97201'
            },
            product: {
              name: 'Wind Turbine Generator 10kW',
              image: '/uploads/wind-turbine.jpg',
              sku: 'WTG-10KW-001',
              quantity: 1
            },
            amount: 15000,
            status: 'Dispute',
            priority: 'urgent',
            orderDate: new Date(Date.now() - 259200000).toISOString(),
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            paymentMethod: 'Check',
            paymentStatus: 'Pending',
            tracking: {
              number: '',
              carrier: '',
              status: 'On Hold',
              lastUpdate: null
            },
            notes: 'Buyer requested specification changes',
            buyerId: 'buyer-004',
            createdAt: new Date(Date.now() - 259200000).toISOString()
          }
        ];
        // No fallback orders - show empty state if API fails
        setOrders([]);
        setLoading(false);
      });
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'approved':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'processing':
        return 'bg-blue/10 text-blue border-blue/20';
      case 'shipped':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'dispute':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'cancelled':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'refunded':
        return 'bg-purple/10 text-purple border-purple/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Bulk Actions
  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleSelectAllOrders = (checked) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      const updatePromises = selectedOrders.map(orderId =>
        fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })
      );

      await Promise.all(updatePromises);
      
      setOrders(prev => prev.map(order => 
        selectedOrders.includes(order.id) 
          ? { ...order, status: newStatus }
          : order
      ));
      
      setSelectedOrders([]);
      showToast(`${selectedOrders.length} orders updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Bulk update error:', error);
      showToast('Failed to update orders', 'error');
    }
  };

  // Enhanced Action Handlers with Backend Updates
  const handleApproveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Processing',
          paymentStatus: 'Confirmed',
          notes: 'Order approved by seller'
        }),
      });

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'Processing', paymentStatus: 'Confirmed' }
            : order
        ));
        showToast('Order approved and processing started', 'success');
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error approving order:', error);
      showToast('Failed to approve order', 'error');
    }
  };

  const handleRejectOrder = async (orderId, reason) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Cancelled',
          notes: `Cancelled by seller: ${reason}`
        }),
      });

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'Cancelled', notes: `Cancelled: ${reason}` }
            : order
        ));
        showToast('Order cancelled', 'info');
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast('Failed to cancel order', 'error');
    }
  };

  const handleShipOrder = async (orderId, trackingInfo) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Shipped',
          trackingNumber: trackingInfo.trackingNumber,
          carrier: trackingInfo.carrier,
          notes: `Shipped via ${trackingInfo.carrier} - Tracking: ${trackingInfo.trackingNumber}`
        }),
      });

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: 'Shipped',
                tracking: {
                  ...trackingInfo,
                  lastUpdate: new Date().toISOString()
                }
              }
            : order
        ));
        showToast('Order marked as shipped with tracking', 'success');
      } else {
        throw new Error('Failed to update shipping status');
      }
    } catch (error) {
      console.error('Error updating shipping:', error);
      showToast('Failed to update shipping status', 'error');
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Delivered',
          deliveredAt: new Date().toISOString(),
          notes: 'Order delivered successfully'
        }),
      });

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'Delivered' }
            : order
        ));
        showToast('Order marked as delivered', 'success');
      } else {
        throw new Error('Failed to mark as delivered');
      }
    } catch (error) {
      console.error('Error marking as delivered:', error);
      showToast('Failed to mark as delivered', 'error');
    }
  };

  const handleBookOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Processing' }
        : order
    ));
    showToast('Order booked for processing', 'success');
  };

  const handleUpdateTracking = () => {
    if (!selectedOrder || !trackingData.trackingNumber) {
      showToast('Please enter tracking number', 'error');
      return;
    }
    
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { 
            ...order, 
            status: 'Shipped',
            tracking: {
              ...trackingData,
              lastUpdate: new Date().toISOString()
            }
          }
        : order
    ));
    
    setShowTrackingModal(false);
    setTrackingData({ trackingNumber: '', carrier: '', estimatedDelivery: '', status: '', notes: '' });
    showToast('Tracking information updated', 'success');
  };

  const handleProcessRefund = () => {
    if (!selectedOrder || !refundData.amount || !refundData.reason) {
      showToast('Please fill in all refund details', 'error');
      return;
    }
    
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { 
            ...order, 
            status: 'Refunded',
            notes: `${order.notes} | Refunded KSh ${refundData.amount}: ${refundData.reason}`
          }
        : order
    ));
    
    setShowRefundModal(false);
    setRefundData({ reason: '', amount: '', notes: '', refundMethod: 'original' });
    showToast('Refund processed successfully', 'success');
  };

  const handleSendMessage = () => {
    if (!selectedOrder || !messageData.subject || !messageData.message) {
      showToast('Please fill in all message fields', 'error');
      return;
    }
    
    // In real app, this would send an email or create a notification
    const emailSubject = encodeURIComponent(`[Order ${selectedOrder.orderNumber}] ${messageData.subject}`);
    const emailBody = encodeURIComponent(`Hello ${selectedOrder.buyer.name},

${messageData.message}

Order Details:
- Order Number: ${selectedOrder.orderNumber}
- Product: ${selectedOrder.product.name}
- Amount: KSh ${selectedOrder.amount}

Best regards,
${user?.name || 'EnergyHub Seller'}
${user?.email || 'seller@energyhub.com'}`);
    
    window.location.href = `mailto:${selectedOrder.buyer.email}?subject=${emailSubject}&body=${emailBody}`;
    
    setShowMessageModal(false);
    setMessageData({ subject: '', message: '', priority: 'normal' });
    showToast('Message sent to buyer', 'success');
  };

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleTrackingUpdate = (order) => {
    setSelectedOrder(order);
    setTrackingData({
      trackingNumber: order.tracking.number || '',
      carrier: order.tracking.carrier || '',
      estimatedDelivery: '',
      status: order.tracking.status || '',
      notes: ''
    });
    setShowTrackingModal(true);
  };

  const handleRefundRequest = (order) => {
    setSelectedOrder(order);
    setRefundData({
      reason: '',
      amount: order.amount.toString(),
      notes: '',
      refundMethod: 'original'
    });
    setShowRefundModal(true);
  };

  const handleContactBuyer = (order) => {
    setSelectedOrder(order);
    setMessageData({
      subject: `Update on your order ${order.orderNumber}`,
      message: '',
      priority: 'normal'
    });
    setShowMessageModal(true);
  };

  // Order Management Modals
  const OrderDetailsModal = () => (
    showOrderModal && selectedOrder && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Order Details</h3>
              <Button variant="ghost" size="sm" iconName="X" onClick={() => setShowOrderModal(false)} />
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Information */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Order Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="ml-2 font-mono">{selectedOrder.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedOrder.priority)}`}>
                      {selectedOrder.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="ml-2 font-semibold">${selectedOrder.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="ml-2">{selectedOrder.paymentMethod} - {selectedOrder.paymentStatus}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Order Date:</span>
                    <span className="ml-2">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Buyer Information */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Buyer Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2">{selectedOrder.buyer.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <span className="ml-2">{selectedOrder.buyer.company}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2">{selectedOrder.buyer.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="ml-2">{selectedOrder.buyer.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address:</span>
                    <span className="ml-2 text-sm">{selectedOrder.buyer.address}</span>
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Product Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <span className="ml-2">{selectedOrder.product.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="ml-2 font-mono">{selectedOrder.product.sku}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="ml-2">{selectedOrder.product.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Tracking Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Tracking Number:</span>
                    <span className="ml-2 font-mono">{selectedOrder.tracking.number || 'Not assigned'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Carrier:</span>
                    <span className="ml-2">{selectedOrder.tracking.carrier || 'Not assigned'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="ml-2">{selectedOrder.tracking.status}</span>
                  </div>
                  {selectedOrder.tracking.lastUpdate && (
                    <div>
                      <span className="text-muted-foreground">Last Update:</span>
                      <span className="ml-2">{new Date(selectedOrder.tracking.lastUpdate).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-2">Notes</h4>
                <p className="text-muted-foreground bg-muted/30 p-3 rounded-lg">{selectedOrder.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-2">
              {selectedOrder.status === 'Pending' && (
                <>
                  <Button variant="default" onClick={() => handleApproveOrder(selectedOrder.id)}>
                    Approve Order
                  </Button>
                  <Button variant="outline" onClick={() => handleRejectOrder(selectedOrder.id, 'Declined by seller')}>
                    Decline Order
                  </Button>
                </>
              )}
              {(selectedOrder.status === 'Approved' || selectedOrder.status === 'Processing') && (
                <Button variant="outline" onClick={() => handleTrackingUpdate(selectedOrder)}>
                  Update Tracking
                </Button>
              )}
              {selectedOrder.status !== 'Cancelled' && selectedOrder.status !== 'Refunded' && (
                <Button variant="outline" onClick={() => handleRefundRequest(selectedOrder)}>
                  Process Refund
                </Button>
              )}
              <Button variant="outline" onClick={() => handleContactBuyer(selectedOrder)}>
                Contact Buyer
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Tracking Update Modal
  const TrackingModal = () => (
    showTrackingModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Update Tracking</h3>
              <Button variant="ghost" size="sm" iconName="X" onClick={() => setShowTrackingModal(false)} />
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <Input
              label="Tracking Number"
              value={trackingData.trackingNumber}
              onChange={(e) => setTrackingData(prev => ({ ...prev, trackingNumber: e.target.value }))}
              placeholder="Enter tracking number"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <select
                value={trackingData.carrier}
                onChange={(e) => setTrackingData(prev => ({ ...prev, carrier: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select Carrier</option>
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="USPS">USPS</option>
                <option value="DHL">DHL</option>
                <option value="Other">Other</option>
              </select>
              
              <select
                value={trackingData.status}
                onChange={(e) => setTrackingData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select Status</option>
                <option value="Label Created">Label Created</option>
                <option value="Picked Up">Picked Up</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            
            <Input
              label="Estimated Delivery"
              type="date"
              value={trackingData.estimatedDelivery}
              onChange={(e) => setTrackingData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
            />
            
            <textarea
              placeholder="Additional notes..."
              value={trackingData.notes}
              onChange={(e) => setTrackingData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            
            <div className="flex space-x-2">
              <Button variant="default" onClick={handleUpdateTracking} fullWidth>
                Update Tracking
              </Button>
              <Button variant="outline" onClick={() => setShowTrackingModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Refund Modal
  const RefundModal = () => (
    showRefundModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Process Refund</h3>
              <Button variant="ghost" size="sm" iconName="X" onClick={() => setShowRefundModal(false)} />
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <select
              value={refundData.reason}
              onChange={(e) => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select refund reason</option>
              <option value="Customer request">Customer request</option>
              <option value="Product defect">Product defect</option>
              <option value="Shipping damage">Shipping damage</option>
              <option value="Wrong item shipped">Wrong item shipped</option>
              <option value="Order cancelled">Order cancelled</option>
              <option value="Other">Other</option>
            </select>
            
            <Input
              label="Refund Amount"
              type="number"
              value={refundData.amount}
              onChange={(e) => setRefundData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              step="0.01"
              required
            />
            
            <select
              value={refundData.refundMethod}
              onChange={(e) => setRefundData(prev => ({ ...prev, refundMethod: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="original">Original payment method</option>
              <option value="bank">Bank transfer</option>
              <option value="check">Check</option>
              <option value="store_credit">Store credit</option>
            </select>
            
            <textarea
              placeholder="Additional notes..."
              value={refundData.notes}
              onChange={(e) => setRefundData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            
            <div className="flex space-x-2">
              <Button variant="destructive" onClick={handleProcessRefund} fullWidth>
                Process Refund
              </Button>
              <Button variant="outline" onClick={() => setShowRefundModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Message Modal
  const MessageModal = () => (
    showMessageModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Contact Buyer</h3>
              <Button variant="ghost" size="sm" iconName="X" onClick={() => setShowMessageModal(false)} />
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <Input
              label="Subject"
              value={messageData.subject}
              onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Message subject"
              required
            />
            
            <select
              value={messageData.priority}
              onChange={(e) => setMessageData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="low">Low Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <textarea
              placeholder="Your message..."
              value={messageData.message}
              onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
            
            <div className="flex space-x-2">
              <Button variant="default" onClick={handleSendMessage} fullWidth>
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setShowMessageModal(false)} fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
              <p className="text-muted-foreground mt-1">
                Complete order lifecycle management - approve, track, fulfill, and communicate
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/b2b-seller-dashboard')}>
              Back to Dashboard
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Search Orders</label>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Order #, buyer, product..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Approved">Approved</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Dispute">Dispute</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {selectedOrders.length} orders selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('Processing')}
                  >
                    Mark as Processing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('Shipped')}
                  >
                    Mark as Shipped
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('Delivered')}
                  >
                    Mark as Delivered
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrders([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Orders ({filteredOrders.length})
              </h3>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading orders...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No orders found matching your criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={(e) => handleSelectAllOrders(e.target.checked)}
                          className="rounded border-border"
                        />
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Order</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Buyer</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Priority</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-smooth">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-mono text-sm font-medium text-foreground">
                              {order.orderNumber}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {order.buyer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.buyer.company}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm text-foreground">
                              {order.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {order.product.quantity}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-foreground">
                            ${order.amount?.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.paymentStatus}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Eye"
                              onClick={() => handleOrderDetails(order)}
                            >
                              Details
                            </Button>
                            
                            {/* Status-based actions */}
                            {order.status === 'Reviewing' && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  iconName="Check"
                                  onClick={() => handleApproveOrder(order.id)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  iconName="X"
                                  onClick={() => handleRejectOrder(order.id, 'Order declined by seller')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            
                            {order.status === 'Processing' && (
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="Package"
                                onClick={() => handleShipOrder(order.id, {
                                  trackingNumber: `TK${Date.now()}`,
                                  carrier: 'DHL Express'
                                })}
                              >
                                Ship
                              </Button>
                            )}
                            
                            {order.status === 'Shipped' && (
                              <Button
                                variant="success"
                                size="sm"
                                iconName="CheckCircle"
                                onClick={() => handleDeliverOrder(order.id)}
                              >
                                Mark Delivered
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Mail"
                              onClick={() => handleContactBuyer(order)}
                            >
                              Message
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <OrderDetailsModal />
      <TrackingModal />
      <RefundModal />
      <MessageModal />
    </div>
  );
};

export default B2BSellerOrders;
