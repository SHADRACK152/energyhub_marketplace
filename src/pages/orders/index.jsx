import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform backend order format to component format
  const transformOrder = (backendOrder) => {
    const getStatusColor = (status) => {
      switch(status.toLowerCase()) {
        case 'delivered': return 'success';
        case 'shipped': 
        case 'shipping': return 'primary';
        case 'processing': 
        case 'reviewing': return 'warning';
        case 'cancelled': return 'destructive';
        default: return 'warning';
      }
    };

    return {
      id: backendOrder.orderNumber || backendOrder.id,
      product: backendOrder.productName,
      status: backendOrder.status,
      statusColor: getStatusColor(backendOrder.status),
      date: backendOrder.orderDate || backendOrder.createdAt,
      expected: backendOrder.deliveryDate,
      total: backendOrder.price || backendOrder.totalAmount || 0
    };
  };

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/orders?userId=demo-user');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        // Transform backend orders to component format
        const transformedOrders = data.map(transformOrder);
        setOrders(transformedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
        // No fallback orders - show empty state if API fails
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-border shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Icon name="Zap" className="text-primary" size={28} />
          <span className="text-2xl font-extrabold text-primary tracking-tight">EnergyHub</span>
        </div>
        <nav className="flex gap-6 items-center">
          <a href="/b2c-buyer-dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">Dashboard</a>
          <a href="/product-catalog-search" className="text-sm font-medium text-muted-foreground hover:text-primary">Browse</a>
          <a href="/orders" className="text-sm font-bold text-primary border-b-2 border-primary">Orders</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm text-foreground">Shadrack Emadau</span>
          <Icon name="User" className="text-primary" size={24} />
          <Button variant="outline" size="sm" iconName="LogOut" iconPosition="left">Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Orders</h1>
          <div className="flex gap-2">
            <input type="text" placeholder="Search orders..." className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none">
              <option value="">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 mb-6">
          {['All', 'Processing', 'Shipped', 'Delivered'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors 
                ${tab === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-primary" size={40} />
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Icon name="AlertTriangle" className="mx-auto mb-4 text-warning" size={40} />
            <p className="text-muted-foreground mb-4">Failed to load orders: {error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="ShoppingCart" className="mx-auto mb-4 text-muted-foreground" size={40} />
            <p className="text-muted-foreground mb-4">No orders found</p>
            <Button onClick={() => window.location.href = '/product-catalog-search'} variant="default">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Ordered</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Expected</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-primary">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border 
                        ${order.statusColor === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                        ${order.statusColor === 'primary' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                        ${order.statusColor === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                      `}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.expected).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold">KSh {order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Button variant="ghost" size="sm" iconName="Eye">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
