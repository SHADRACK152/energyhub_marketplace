import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import MetricsCard from './components/MetricsCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import LowInventoryAlert from './components/LowInventoryAlert';
import SalesChart from './components/SalesChart';
import TopProductsChart from './components/TopProductsChart';
import MobileOrderCard from './components/MobileOrderCard';
import OrderManagementPanel from './components/OrderManagementPanel';
import OrderDetailsModal from './components/OrderDetailsModal';
import FulfillmentModal from './components/FulfillmentModal';

const B2BSellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State management
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  
  // Modal states
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showFulfillmentModal, setShowFulfillmentModal] = useState(false);
  const [orderToFulfill, setOrderToFulfill] = useState(null);
  
  // Metrics data
  const [metrics, setMetrics] = useState({
    totalRevenue: 284750,
    activeListings: 156,
    pendingOrders: 0,
    inventoryValue: 1250000
  });

  // Mock metrics data based on real orders
  const metricsData = [
    {
      title: "Total Revenue",
      value: metrics.totalRevenue.toLocaleString(),
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      currency: true
    },
    {
      title: "Active Listings",
      value: metrics.activeListings.toString(),
      change: "+8",
      changeType: "positive",
      icon: "Package"
    },
    {
      title: "Pending Orders",
      value: metrics.pendingOrders.toString(),
      change: pendingOrders.length > 0 ? `+${pendingOrders.length}` : "0",
      changeType: pendingOrders.length > 0 ? "positive" : "neutral",
      icon: "Clock"
    },
    {
      title: "Inventory Value",
      value: metrics.inventoryValue.toLocaleString(),
      change: "-2.1%",
      changeType: "negative",
      icon: "Warehouse",
      currency: true
    }
  ];

  // Fetch orders that need seller action
  useEffect(() => {
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        // Fetch all orders for the seller
        const allOrdersRes = await fetch('/api/orders');
        const allOrders = await allOrdersRes.json();
        
        // Fetch orders needing action
        const pendingRes = await fetch('/api/orders?needsAction=true');
        const pending = await pendingRes.json();
        
        setRecentOrders(Array.isArray(allOrders) ? allOrders.slice(0, 10) : []);
        setPendingOrders(Array.isArray(pending) ? pending : []);
        
        // Update metrics
        setMetrics(prev => ({
          ...prev,
          pendingOrders: Array.isArray(pending) ? pending.length : 0
        }));
        
        setOrdersLoading(false);
      } catch (err) {
        setOrdersError(err.message);
        setOrdersLoading(false);
      }
    };

    fetchOrders();
    
    // Refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mock low inventory items
  const lowStockItems = [
    {
      id: 1,
      name: "Tesla Powerwall 2",
      category: "Battery Storage",
      currentStock: 3,
      minStock: 10
    },
    {
      id: 2,
      name: "SolarEdge SE7600H-US",
      category: "Inverters",
      currentStock: 5,
      minStock: 15
    },
    {
      id: 3,
      name: "LG NeON R 365W",
      category: "Solar Panels",
      currentStock: 8,
      minStock: 25
    }
  ];

  // Mock sales chart data
  const salesChartData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 },
    { month: 'Jul', sales: 73000 },
    { month: 'Aug', sales: 69000 }
  ];

  // Mock top products chart data
  const topProductsData = [
    { name: '400W Solar Panel', sales: 125000 },
    { name: 'Tesla Powerwall', sales: 98000 },
    { name: 'SolarEdge Inverter', sales: 87000 },
    { name: 'LG Chem Battery', sales: 76000 },
    { name: 'Enphase Micro', sales: 65000 }
  ];

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 1000);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Enhanced action handlers
  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetails(true);
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Confirmed',
          sellerNotes: 'Order confirmed and will be processed within 24 hours',
          confirmedAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
      });
      
      if (response.ok) {
        // Refresh orders
        const pendingRes = await fetch('/api/orders?needsAction=true');
        const pending = await pendingRes.json();
        setPendingOrders(Array.isArray(pending) ? pending : []);
        
        const allOrdersRes = await fetch('/api/orders');
        const allOrders = await allOrdersRes.json();
        setRecentOrders(Array.isArray(allOrders) ? allOrders.slice(0, 10) : []);
        
        alert('Order confirmed successfully!');
      } else {
        throw new Error('Failed to confirm order');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again.');
    }
  };

  const handleFulfillOrder = (orderId) => {
    const order = recentOrders.find(o => o.id === orderId) || pendingOrders.find(o => o.id === orderId);
    if (order) {
      setOrderToFulfill(order);
      setShowFulfillmentModal(true);
    }
  };

  const handleOrderFulfillment = async (orderId, fulfillmentData) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Shipped',
          ...fulfillmentData
        })
      });

      if (response.ok) {
        // Refresh orders
        const allOrdersRes = await fetch('/api/orders');
        const allOrders = await allOrdersRes.json();
        setRecentOrders(Array.isArray(allOrders) ? allOrders.slice(0, 10) : []);
        
        const pendingRes = await fetch('/api/orders?needsAction=true');
        const pending = await pendingRes.json();
        setPendingOrders(Array.isArray(pending) ? pending : []);
        
        alert('Order shipped successfully!');
        return true;
      } else {
        throw new Error('Failed to ship order');
      }
    } catch (error) {
      console.error('Error shipping order:', error);
      alert('Failed to ship order. Please try again.');
      return false;
    }
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAddProduct = () => {
    navigate('/b2b-inventory-management');
  };

  const handleBulkUpload = () => {
    navigate('/b2b-inventory-management');
  };

  const handleUpdatePricing = () => {
    navigate('/b2b-inventory-management');
  };

  const handleRestockItem = (itemId) => {
    console.log('Restocking item:', itemId);
    // Open restock modal
  };

  const handleViewInventory = () => {
    navigate('/b2b-inventory-management');
  };

  const handleContactBuyer = (buyerId) => {
    console.log('Contacting buyer:', buyerId);
    // Open contact modal or navigate to messaging
  };

  return (
    <div className="min-h-screen bg-background">
  <RoleBasedHeader user={user} onNavigate={handleNavigation} />
  <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.name} ({user?.email}). Here's your business overview.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              )}
              <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                currency={metric?.currency}
              />
            ))}
          </div>

          {/* Pending Orders Alert */}
          {pendingOrders.length > 0 && (
            <div className="mb-8 bg-warning/10 border border-warning/30 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-warning-foreground">{pendingOrders.length}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {pendingOrders.length} Order{pendingOrders.length > 1 ? 's' : ''} Need Your Attention
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Review and confirm new orders from customers
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/orders')}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  View All Orders
                </Button>
              </div>
              
              {/* Quick Order Actions */}
              <div className="mt-4 space-y-3">
                {pendingOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between bg-background/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-sm">Order #{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.productName} • ${order.price?.toFixed(2)} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingOrders.length > 3 && (
                  <div className="text-center">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
                      View {pendingOrders.length - 3} more pending orders
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Management Panel */}
          <div className="mb-8">
            <OrderManagementPanel
              onViewOrder={handleViewOrder}
              onConfirmOrder={handleConfirmOrder}
              onFulfillOrder={handleFulfillOrder}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Recent Orders - Desktop Table */}
            <div className="lg:col-span-8 hidden md:block">
              {ordersLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
              ) : ordersError ? (
                <div className="p-8 text-center text-error">{ordersError}</div>
              ) : (
                <RecentOrdersTable
                  orders={recentOrders}
                  onViewOrder={handleViewOrder}
                  onFulfillOrder={handleFulfillOrder}
                  onContactBuyer={handleContactBuyer}
                />
              )}
            </div>

            {/* Recent Orders - Mobile Cards */}
            <div className="lg:col-span-8 md:hidden">
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                </div>
                {ordersLoading ? (
                  <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
                ) : ordersError ? (
                  <div className="p-8 text-center text-error">{ordersError}</div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders?.slice(0, 3)?.map((order) => (
                      <MobileOrderCard
                        key={order?.id}
                        order={order}
                        onViewOrder={handleViewOrder}
                        onFulfillOrder={handleFulfillOrder}
                        onContactBuyer={handleContactBuyer}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <QuickActionsPanel
                onAddProduct={handleAddProduct}
                onBulkUpload={handleBulkUpload}
                onUpdatePricing={handleUpdatePricing}
              />
              
              <LowInventoryAlert
                lowStockItems={lowStockItems}
                onRestockItem={handleRestockItem}
                onViewInventory={handleViewInventory}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesChart data={salesChartData} />
            <TopProductsChart data={topProductsData} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        orderId={selectedOrderId}
      />

      <FulfillmentModal
        isOpen={showFulfillmentModal}
        onClose={() => setShowFulfillmentModal(false)}
        order={orderToFulfill}
        onFulfill={handleOrderFulfillment}
      />
    </div>
  );
};

export default B2BSellerDashboard;