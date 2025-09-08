import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import LowInventoryAlert from './components/LowInventoryAlert';
import SalesChart from './components/SalesChart';
import TopProductsChart from './components/TopProductsChart';
import MobileOrderCard from './components/MobileOrderCard';

const B2BSellerDashboard = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Get authenticated user from context
  const { user } = useAuth();

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Revenue",
      value: "284,750",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      currency: true
    },
    {
      title: "Active Listings",
      value: "156",
      change: "+8",
      changeType: "positive",
      icon: "Package"
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "+5",
      changeType: "positive",
      icon: "Clock"
    },
    {
      title: "Inventory Value",
      value: "1,250,000",
      change: "-2.1%",
      changeType: "negative",
      icon: "Warehouse",
      currency: true
    }
  ];

  // Orders state
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    setOrdersLoading(true);
    setOrdersError(null);
    fetch('http://localhost:5000/api/orders')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => {
        // Transform orders data to match the seller dashboard requirements
        const transformedOrders = Array.isArray(data) ? data.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          buyer: {
            name: order.buyerName || 'Unknown Buyer',
            company: order.buyerEmail?.split('@')[1]?.split('.')[0] || 'Company',
            email: order.buyerEmail
          },
          products: [
            {
              name: order.productName,
              image: order.productImage
            }
          ],
          value: order.price || 0,
          status: order.status || 'Pending',
          orderDate: order.orderDate,
          deliveryDate: order.deliveryDate,
          buyerId: order.buyerId
        })) : [];
        
        setRecentOrders(transformedOrders);
        setOrdersLoading(false);
      })
      .catch(err => {
        setOrdersError(err.message);
        setOrdersLoading(false);
        
        // Fallback to mock data if API fails
        const mockOrders = [
          {
            id: 1,
            orderNumber: 'ORD-001',
            buyer: {
              name: 'Tesla Solar Corp',
              company: 'Tesla Energy',
              email: 'orders@tesla.com'
            },
            products: [
              {
                name: 'Solar Panel System 5kW',
                image: '/uploads/solar-panel.jpg'
              }
            ],
            value: 12500,
            status: 'Processing',
            orderDate: new Date().toISOString(),
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
            products: [
              {
                name: 'Tesla Powerwall 2',
                image: '/uploads/powerwall.jpg'
              }
            ],
            value: 8900,
            status: 'Shipping',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
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
            products: [
              {
                name: 'SolarEdge Inverter 7.6kW',
                image: '/uploads/inverter.jpg'
              }
            ],
            value: 1850,
            status: 'Delivered',
            orderDate: new Date(Date.now() - 172800000).toISOString(),
            buyerId: 'buyer-003'
          }
        ];
        setRecentOrders(mockOrders);
      });
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

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Action handlers
  const handleViewOrder = (orderId) => {
    console.log('Viewing order:', orderId);
    // Navigate to order details page
    navigate(`/orders/${orderId}`);
  };

  const handleFulfillOrder = (orderId) => {
    console.log('Fulfilling order:', orderId);
    // Update order status to shipping
    setRecentOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Shipping' }
        : order
    ));
    // In real app, this would call API to update order status
  };

  const handleContactBuyer = (buyerId) => {
    console.log('Contacting buyer:', buyerId);
    // Find buyer info
    const order = recentOrders.find(o => o.buyerId === buyerId);
    if (order?.buyer?.email) {
      // Open email client or internal messaging system
      window.location.href = `mailto:${order.buyer.email}?subject=Regarding Order&body=Hello ${order.buyer.name},%0D%0A%0D%0A`;
    }
  };

  const handleAddProduct = () => {
    console.log('Adding new product');
    navigate('/b2b-inventory-management');
  };

  const handleBulkUpload = () => {
    console.log('Bulk upload products');
    // In real app, this would open bulk upload modal
    alert('Bulk upload feature - Coming soon! For now, please add products individually through the inventory page.');
  };

  const handleUpdatePricing = () => {
    console.log('Update pricing');
    navigate('/b2b-inventory-management');
  };

  const handleRestockItem = (itemId) => {
    console.log('Restocking item:', itemId);
    // In real app, this would open restock modal
    alert('Restock feature - Coming soon! Please manage inventory through the inventory page.');
  };

  const handleViewInventory = () => {
    navigate('/b2b-inventory-management');
  };

  const handleViewAllOrders = () => {
    navigate('/orders');
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
              <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.name || 'Seller'} ({user?.email}). Manage your business and connect with buyers.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
              <Button variant="outline" onClick={handleViewInventory}>
                Manage Inventory
              </Button>
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Recent Orders - Desktop Table */}
            <div className="lg:col-span-8 hidden md:block">
              {ordersLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
              ) : ordersError ? (
                <div className="bg-card rounded-lg border border-border shadow-card p-8">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Using demo data (API unavailable)</p>
                    <RecentOrdersTable
                      orders={recentOrders}
                      onViewOrder={handleViewOrder}
                      onFulfillOrder={handleFulfillOrder}
                      onContactBuyer={handleContactBuyer}
                      onViewAllOrders={handleViewAllOrders}
                    />
                  </div>
                </div>
              ) : (
                <RecentOrdersTable
                  orders={recentOrders}
                  onViewOrder={handleViewOrder}
                  onFulfillOrder={handleFulfillOrder}
                  onContactBuyer={handleContactBuyer}
                  onViewAllOrders={handleViewAllOrders}
                />
              )}
            </div>

            {/* Recent Orders - Mobile Cards */}
            <div className="lg:col-span-8 md:hidden">
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                  <Button variant="outline" size="sm" onClick={handleViewAllOrders}>
                    View All Orders
                  </Button>
                </div>
                {ordersLoading ? (
                  <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
                ) : ordersError ? (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Using demo data (API unavailable)</p>
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
                  </div>
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
    </div>
  );
};

export default B2BSellerDashboard;