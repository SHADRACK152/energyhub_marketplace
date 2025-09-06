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

  // Mock recent orders data
  const recentOrders = [
    {
      id: "ORD-2024-001",
      buyer: {
        id: 1,
        name: "Michael Chen",
        company: "Solar Innovations LLC"
      },
      products: [
        { name: "400W Solar Panel", quantity: 50 }
      ],
      value: 25000,
      status: "pending",
      date: "2024-08-31"
    },
    {
      id: "ORD-2024-002",
      buyer: {
        id: 2,
        name: "Lisa Rodriguez",
        company: "Green Energy Corp"
      },
      products: [
        { name: "Tesla Powerwall 2", quantity: 10 }
      ],
      value: 75000,
      status: "processing",
      date: "2024-08-30"
    },
    {
      id: "ORD-2024-003",
      buyer: {
        id: 3,
        name: "David Kim",
        company: "Renewable Solutions"
      },
      products: [
        { name: "SolarEdge Inverter", quantity: 25 }
      ],
      value: 18750,
      status: "shipped",
      date: "2024-08-29"
    },
    {
      id: "ORD-2024-004",
      buyer: {
        id: 4,
        name: "Emma Thompson",
        company: "EcoTech Systems"
      },
      products: [
        { name: "LG Chem Battery", quantity: 15 }
      ],
      value: 45000,
      status: "delivered",
      date: "2024-08-28"
    },
    {
      id: "ORD-2024-005",
      buyer: {
        id: 5,
        name: "James Wilson",
        company: "Sustainable Power Inc"
      },
      products: [
        { name: "Enphase Microinverter", quantity: 100 }
      ],
      value: 32000,
      status: "pending",
      date: "2024-08-31"
    }
  ];

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
  };

  const handleFulfillOrder = (orderId) => {
    console.log('Fulfilling order:', orderId);
    // Open fulfill order modal
  };

  const handleContactBuyer = (buyerId) => {
    console.log('Contacting buyer:', buyerId);
    // Open contact modal
  };

  const handleAddProduct = () => {
    console.log('Adding new product');
    // Navigate to add product page
  };

  const handleBulkUpload = () => {
    console.log('Bulk upload products');
    // Open bulk upload modal
  };

  const handleUpdatePricing = () => {
    console.log('Update pricing');
    // Navigate to pricing management
  };

  const handleRestockItem = (itemId) => {
    console.log('Restocking item:', itemId);
    // Open restock modal
  };

  const handleViewInventory = () => {
    navigate('/b2b-inventory-management');
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Recent Orders - Desktop Table */}
            <div className="lg:col-span-8 hidden md:block">
              <RecentOrdersTable
                orders={recentOrders}
                onViewOrder={handleViewOrder}
                onFulfillOrder={handleFulfillOrder}
                onContactBuyer={handleContactBuyer}
              />
            </div>

            {/* Recent Orders - Mobile Cards */}
            <div className="lg:col-span-8 md:hidden">
              <div className="bg-card rounded-lg border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                </div>
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