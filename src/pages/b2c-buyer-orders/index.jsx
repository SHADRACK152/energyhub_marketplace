import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const B2CBuyerOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('Card');

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Fetch buyer orders from backend API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/orders?userId=demo-user');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        
        // Transform backend orders to match the component format
        const transformedOrders = data.map(order => ({
          id: order.orderNumber || order.id,
          orderNumber: order.orderNumber || order.id,
          productName: order.productName,
          productImage: order.productImage || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400',
          price: order.price || order.totalAmount || 0,
          orderDate: order.orderDate || order.createdAt,
          deliveryDate: order.deliveryDate,
          status: order.status,
          seller: order.seller || {
            name: 'EnergyHub Seller',
            company: 'EnergyHub Corp',
            email: 'seller@energyhub.com'
          },
          trackingNumber: order.trackingNumber || `TK${order.orderNumber?.slice(-6)}`,
          statusSteps: order.statusSteps || [
            { label: 'Reviewing', completed: true },
            { label: 'Processing', completed: order.status !== 'Reviewing' },
            { label: 'Shipping', completed: ['Shipping', 'Delivered'].includes(order.status) },
            { label: 'Delivered', completed: order.status === 'Delivered' },
          ]
        }));
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Don't show mock orders on error - show empty state
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'reviewing':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'processing':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'shipping':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/order-tracking/${orderId}`);
  };

  const handleReorder = (order) => {
    // Add to cart and navigate to checkout
    console.log('Reordering:', order.productName);
    // In real app, this would add the product to cart
    navigate('/shopping-cart-checkout');
  };

  const handleContactSeller = (seller) => {
    if (seller?.email) {
      window.location.href = `mailto:${seller.email}?subject=Inquiry about Order&body=Hello ${seller.name},%0D%0A%0D%0A`;
    }
  };

  const renderOrderCard = (order) => (
    <div key={order.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-smooth">
      <div className="flex items-start space-x-4">
        <img
          src={order.productImage}
          alt={order.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{order.productName}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Order #{order.orderNumber}</p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-muted-foreground">Ordered: </span>
              <span className="text-foreground">{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Delivery: </span>
              <span className="text-foreground">{new Date(order.deliveryDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">${order.price.toFixed(2)}</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Package"
                onClick={() => handleTrackOrder(order.id)}
              >
                Track
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                onClick={() => handleReorder(order)}
              >
                Reorder
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Mail"
                onClick={() => handleContactSeller(order.seller)}
              >
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
              <p className="text-muted-foreground mt-1">
                Track your purchases and manage your order history
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/b2c-buyer-dashboard')}>
              Back to Dashboard
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Search orders...</label>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Order #, product, seller..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">View</label>
                <div className="flex rounded-lg border border-border">
                  <button
                    onClick={() => setViewMode('Card')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                      viewMode === 'Card' 
                        ? 'bg-primary text-white' 
                        : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setViewMode('Table')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                      viewMode === 'Table' 
                        ? 'bg-primary text-white' 
                        : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Reviewing', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Orders Display */}
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading your orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No orders found. Start shopping to see your orders here!
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => renderOrderCard(order))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default B2CBuyerOrders;
