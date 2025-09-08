import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const B2BSellerOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Fetch seller orders from API
    setLoading(true);
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => {
        // Transform data for seller view
        const sellerOrders = Array.isArray(data) ? data.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          buyer: {
            name: order.buyerName || 'Unknown Buyer',
            company: order.buyerEmail?.split('@')[1]?.split('.')[0] || 'Company',
            email: order.buyerEmail
          },
          product: {
            name: order.productName,
            image: order.productImage
          },
          amount: order.price || 0,
          status: order.status || 'Pending',
          orderDate: order.orderDate,
          deliveryDate: order.deliveryDate,
          buyerId: order.buyerId
        })) : [];
        setOrders(sellerOrders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        // Fallback to demo data
        const demoOrders = [
          {
            id: 1,
            orderNumber: 'ORD-001',
            buyer: {
              name: 'Tesla Solar Corp',
              company: 'Tesla Energy',
              email: 'orders@tesla.com'
            },
            product: {
              name: 'Solar Panel System 5kW',
              image: '/uploads/solar-panel.jpg'
            },
            amount: 12500,
            status: 'Processing',
            orderDate: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            buyerId: 'buyer-001'
          },
          {
            id: 2,
            orderNumber: 'ORD-002',
            buyer: {
              name: 'GreenTech Industries',
              company: 'GreenTech',
              email: 'procurement@greentech.com'
            },
            product: {
              name: 'Tesla Powerwall 2',
              image: '/uploads/powerwall.jpg'
            },
            amount: 8900,
            status: 'Shipped',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            buyerId: 'buyer-002'
          },
          {
            id: 3,
            orderNumber: 'ORD-003',
            buyer: {
              name: 'EcoEnergy Solutions',
              company: 'EcoEnergy',
              email: 'orders@ecoenergy.com'
            },
            product: {
              name: 'SolarEdge Inverter 7.6kW',
              image: '/uploads/inverter.jpg'
            },
            amount: 1850,
            status: 'Delivered',
            orderDate: new Date(Date.now() - 172800000).toISOString(),
            deliveryDate: new Date(Date.now() - 86400000).toISOString(),
            buyerId: 'buyer-003'
          }
        ];
        setOrders(demoOrders);
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
      case 'processing':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'shipped':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleFulfillOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Shipped' }
        : order
    ));
  };

  const handleContactBuyer = (buyer) => {
    if (buyer?.email) {
      window.location.href = `mailto:${buyer.email}?subject=Regarding Order&body=Hello ${buyer.name},%0D%0A%0D%0A`;
    }
  };

  const handleViewOrderDetails = (orderId) => {
    // Navigate to order details page
    navigate(`/order-tracking/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sales Orders</h1>
              <p className="text-muted-foreground mt-1">
                Manage your incoming orders and communicate with buyers
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
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
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
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Order</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Buyer</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Order Date</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-smooth">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-mono text-sm font-medium text-foreground">
                              {order.orderNumber}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {order.id}
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
                          <p className="text-sm text-foreground">
                            {order.product.name}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-foreground">
                            ${order.amount?.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-foreground">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Eye"
                              onClick={() => handleViewOrderDetails(order.id)}
                            >
                              View
                            </Button>
                            {order.status === 'Pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="Package"
                                onClick={() => handleFulfillOrder(order.id)}
                              >
                                Fulfill
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Mail"
                              onClick={() => handleContactBuyer(order.buyer)}
                            >
                              Contact
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
    </div>
  );
};

export default B2BSellerOrders;
