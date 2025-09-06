import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../components/ui/AuthenticationRouter';
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
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Get authenticated user from context
  const { user } = useAuth();

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

  // Real products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    setProductsLoading(true);
    setProductsError(null);
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setProductsLoading(false);
      })
      .catch(err => {
        setProductsError(err.message);
        setProductsLoading(false);
      });
  }, []);

  // Use products for all product displays
  const recentlyViewed = products.slice(0, 4);
  const recommendedProducts = products.slice(0, 8);
  const abandonedCart = products.slice(8, 10);

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
  console.log('Navigating to:', path);
  navigate(path);
  };

  const handleTrackOrder = (orderId) => {
    console.log('Tracking order:', orderId);
    // Navigate to order tracking page
  };

  const handleBuyAgain = (productId) => {
    console.log('Buy again product:', productId);
    // Find product in recommended, recent, or mock data
    const allProducts = [...recommendedProducts, ...recentlyViewed, ...abandonedCart];
    let product = allProducts.find(p => p.id === productId);
    if (product) {
      // Defensive: ensure price and quantity are valid numbers
      product = {
        ...product,
        price: Number(product.price) || 0,
        quantity: 1,
        stockCount: typeof product.stockCount === 'number' ? product.stockCount : 100,
      };
      addToCart(product, 1);
      showToast(`${product.name} added to cart!`);
    } else {
      showToast('Product not found.');
    }
  };

  const handleAddToCart = (productId) => {
    return (quantity = 1) => {
      console.log('Adding to cart:', productId, 'qty:', quantity);
      // Find product in recommended, recent, or mock data
      const allProducts = [...recommendedProducts, ...recentlyViewed, ...abandonedCart];
      let product = allProducts.find(p => p.id === productId);
      if (product) {
        // Defensive: ensure price and quantity are valid numbers
        product = {
          ...product,
          price: Number(product.price) || 0,
          quantity: Number(quantity) || 1,
          stockCount: typeof product.stockCount === 'number' ? product.stockCount : 100,
        };
        addToCart(product, Number(quantity) || 1);
        showToast(`${product.name} added to cart!`);
      } else {
        showToast('Product not found.');
      }
    };
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
    navigate('/orders');
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
  <main className="pt-20 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          {/* Pull to refresh indicator */}
          {isRefreshing && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Welcome Header */}
          <div className="mb-4 animate-fade-in-up">
            <WelcomeHeader user={user} />
          </div>

          {/* Order Summary Stats */}
          <div className="mb-4 animate-fade-in-up delay-100">
            <OrderSummaryStats stats={orderStats} />
          </div>

          {/* Promotional Banners */}
          <div className="mb-8 animate-fade-in-up delay-200">
            <PromotionalBanner
              banners={promotionalBanners}
              onBannerClick={handleBannerClick}
              onDismiss={handleBannerDismiss}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Orders */}
              <div className="bg-white/90 border border-primary/10 rounded-2xl p-8 shadow-xl relative overflow-hidden animate-fade-in-up">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-30 pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
                    </span>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">Recent Orders</h2>
                  </div>
                  <button
                    onClick={handleTrackOrders}
                    className="text-sm text-primary hover:text-primary/80 font-semibold border border-primary rounded-lg px-4 py-1.5 bg-primary/5 transition-shadow shadow-sm hover:shadow-md"
                  >
                    View All Orders
                  </button>
                </div>
                <div className="space-y-6">
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
              <div className="animate-fade-in-up delay-200">
                {productsLoading ? (
                  <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">Loading products...</div>
                ) : productsError ? (
                  <div className="bg-card border border-border rounded-lg p-8 text-center text-error">{productsError}</div>
                ) : (
                  <ContinueShoppingSection
                    recentlyViewed={recentlyViewed}
                    abandonedCart={abandonedCart}
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                  />
                )}
              </div>

              {/* Recommended Products */}
              <div className="animate-fade-in-up delay-300">
                {!productsLoading && !productsError && (
                  <RecommendedProducts
                    products={recommendedProducts}
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                    onAddToWishlist={handleAddToWishlist}
                  />
                )}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="animate-fade-in-up delay-200">
                <QuickActionsPanel
                  onTrackOrders={handleTrackOrders}
                  onReorderFavorites={handleReorderFavorites}
                  onBrowseCategories={handleBrowseCategories}
                  onViewProfile={handleViewProfile}
                />
              </div>

              {/* Wishlist Preview */}
              <div className="animate-fade-in-up delay-300">
                <WishlistPreview
                  wishlistItems={wishlistItems}
                  onAddToCart={handleAddToCart}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                  onViewWishlist={handleViewWishlist}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
  <MobileTabBar user={user} onNavigate={handleNavigation} />
    </div>
  );
};

export default B2CBuyerDashboard;