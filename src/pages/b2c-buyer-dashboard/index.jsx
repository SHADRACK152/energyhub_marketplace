import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import WelcomeHeader from './components/WelcomeHeader';
import OrderSummaryStats from './components/OrderSummaryStats';
import OrderStatusCard from './components/OrderStatusCard';
import ContinueShoppingSection from './components/ContinueShoppingSection';
import RecommendedProducts from './components/RecommendedProducts';
import WishlistPreview from './components/WishlistPreview';
import QuickActionsPanel from './components/QuickActionsPanel';
import PromotionalBanner from './components/PromotionalBanner';

const B2CBuyerDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data
  const user = {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    role: "buyer"
  };

  // Mock order summary stats
  const orderStats = {
    totalOrders: 24,
    inTransit: 3,
    delivered: 21,
    totalSpent: 15420
  };

  // Mock recent orders
  const recentOrders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      productName: "Tesla Powerwall 2 Home Battery",
      productImage: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400",
      status: "Shipped",
      orderDate: "Dec 28, 2024",
      deliveryDate: "Jan 2, 2025",
      productId: 1
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      productName: "SolarEdge SE7600H-US Inverter",
      productImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      status: "Processing",
      orderDate: "Dec 30, 2024",
      deliveryDate: "Jan 5, 2025",
      productId: 2
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      productName: "LG NeON R 365W Solar Panel",
      productImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400",
      status: "Delivered",
      orderDate: "Dec 20, 2024",
      deliveryDate: "Dec 25, 2024",
      productId: 3
    }
  ];

  // Mock abandoned cart items
  const abandonedCart = [
    {
      id: 1,
      name: "Enphase IQ8+ Microinverter",
      price: 299,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400"
    },
    {
      id: 2,
      name: "Goal Zero Yeti 1500X Power Station",
      price: 1999,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    }
  ];

  // Mock recently viewed products
  const recentlyViewed = [
    {
      id: 1,
      name: "Canadian Solar 400W Panel",
      price: 189,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400"
    },
    {
      id: 2,
      name: "Victron Energy SmartSolar MPPT",
      price: 245,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400"
    },
    {
      id: 3,
      name: "BYD Battery-Box Premium LVS",
      price: 3299,
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400"
    },
    {
      id: 4,
      name: "Fronius Primo 8.2-1 Inverter",
      price: 1899,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400"
    }
  ];

  // Mock recommended products
  const recommendedProducts = [
    {
      id: 1,
      name: "Tesla Solar Roof Tiles - Premium Glass",
      brand: "Tesla",
      price: 21850,
      originalPrice: 24500,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400",
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      isNew: true,
      isWishlisted: false
    },
    {
      id: 2,
      name: "Enphase Ensemble Energy Management System",
      brand: "Enphase",
      price: 4299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400",
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
      isNew: false,
      isWishlisted: true
    },
    {
      id: 3,
      name: "LG Chem RESU16H Prime Battery",
      brand: "LG Chem",
      price: 8999,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400",
      rating: 4.7,
      reviewCount: 203,
      inStock: true,
      isNew: false,
      isWishlisted: false
    },
    {
      id: 4,
      name: "SMA Sunny Boy 7.7-1 SP-US Inverter",
      brand: "SMA",
      price: 1649,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      rating: 4.5,
      reviewCount: 124,
      inStock: false,
      isNew: false,
      isWishlisted: false
    }
  ];

  // Mock wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: "Panasonic EverVolt 410W Solar Panel",
      currentPrice: 329,
      originalPrice: 389,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400",
      inStock: true,
      priceDropAlert: true
    },
    {
      id: 2,
      name: "Generac PWRcell M6 Battery Cabinet",
      currentPrice: 12999,
      originalPrice: 12999,
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400",
      inStock: true,
      priceDropAlert: false
    },
    {
      id: 3,
      name: "SolarEdge P850 Power Optimizer",
      currentPrice: 89,
      originalPrice: 89,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400",
      inStock: false,
      priceDropAlert: false
    }
  ];

  // Mock promotional banners
  const promotionalBanners = [
    {
      id: 1,
      title: "New Year Solar Sale",
      description: "Start 2025 with clean energy! Get up to 30% off on solar panels and installation packages.",
      ctaText: "Shop Solar Deals",
      category: "Limited Time",
      icon: "Sun",
      discount: 30,
      bgColor: "bg-gradient-to-r from-accent to-accent/80"
    },
    {
      id: 2,
      title: "Battery Storage Special",
      description: "Power your home with confidence. Premium battery systems now available with extended warranties.",
      ctaText: "Explore Batteries",
      category: "Featured Products",
      icon: "Battery",
      discount: 15,
      bgColor: "bg-gradient-to-r from-secondary to-secondary/80"
    }
  ];

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleTrackOrder = (orderId) => {
    console.log('Tracking order:', orderId);
    // Navigate to order tracking page
  };

  const handleBuyAgain = (productId) => {
    console.log('Buy again product:', productId);
    // Add product to cart
  };

  const handleAddToCart = (productId) => {
    console.log('Adding to cart:', productId);
    // Add product to cart
  };

  const handleViewProduct = (productId) => {
    console.log('Viewing product:', productId);
    navigate('/product-catalog-search');
  };

  const handleAddToWishlist = (productId) => {
    console.log('Adding to wishlist:', productId);
    // Add/remove from wishlist
  };

  const handleRemoveFromWishlist = (productId) => {
    console.log('Removing from wishlist:', productId);
    // Remove from wishlist
  };

  const handleBannerClick = (banner) => {
    console.log('Banner clicked:', banner);
    navigate('/product-catalog-search');
  };

  const handleBannerDismiss = (bannerIndex) => {
    console.log('Banner dismissed:', bannerIndex);
  };

  // Quick action handlers
  const handleTrackOrders = () => {
    console.log('Track orders clicked');
    // Navigate to orders page
  };

  const handleReorderFavorites = () => {
    console.log('Reorder favorites clicked');
    // Navigate to favorites page
  };

  const handleBrowseCategories = () => {
    navigate('/product-catalog-search');
  };

  const handleViewProfile = () => {
    console.log('View profile clicked');
    // Navigate to profile page
  };

  const handleViewWishlist = () => {
    console.log('View wishlist clicked');
    // Navigate to wishlist page
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Pull to refresh indicator */}
          {isRefreshing && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Welcome Header */}
          <WelcomeHeader userName={user?.name} />

          {/* Order Summary Stats */}
          <OrderSummaryStats stats={orderStats} />

          {/* Promotional Banners */}
          <PromotionalBanner
            banners={promotionalBanners}
            onBannerClick={handleBannerClick}
            onDismiss={handleBannerDismiss}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
                  <button
                    onClick={handleTrackOrders}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    View All Orders
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders?.map((order) => (
                    <OrderStatusCard
                      key={order?.id}
                      order={order}
                      onTrackOrder={handleTrackOrder}
                      onBuyAgain={handleBuyAgain}
                    />
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <ContinueShoppingSection
                recentlyViewed={recentlyViewed}
                abandonedCart={abandonedCart}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
              />

              {/* Recommended Products */}
              <RecommendedProducts
                products={recommendedProducts}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionsPanel
                onTrackOrders={handleTrackOrders}
                onReorderFavorites={handleReorderFavorites}
                onBrowseCategories={handleBrowseCategories}
                onViewProfile={handleViewProfile}
              />

              {/* Wishlist Preview */}
              <WishlistPreview
                wishlistItems={wishlistItems}
                onAddToCart={handleAddToCart}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onViewWishlist={handleViewWishlist}
              />
            </div>
          </div>
        </div>
      </main>
      <MobileTabBar user={user} onNavigate={handleNavigation} />
    </div>
  );
};

export default B2CBuyerDashboard;