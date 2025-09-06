import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import Button from '../../components/ui/Button';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';

// Import components
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfoSection from './components/ProductInfoSection';
import PurchaseControls from './components/PurchaseControls';
import ProductSpecifications from './components/ProductSpecifications';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import SellerInfo from './components/SellerInfo';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [user] = useState({ role: 'buyer', name: 'John Doe' });
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState({});

  // Mock product data
  const product = {
    id: 1,
    name: "Tesla Solar Panel 400W Monocrystalline High Efficiency Premium Series",
    seller: {
      name: "Tesla Energy",
      rating: 4.8,
      responseTime: "Within 2 hours",
      verified: true,
      profileImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50"
    },
    price: 299,
    originalPrice: 349,
    discount: 14,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 45,
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800"
    ],
    category: 'solar-panels',
    warranty: "25 years",
    shipping: {
      estimatedDays: "3-5",
      cost: 0,
      freeShipping: true
    },
    keyFeatures: [
      "400W High Efficiency Output",
      "Monocrystalline Silicon Technology",
      "Anti-Reflective Glass Surface",
      "Corrosion Resistant Aluminum Frame",
      "IP68 Waterproof Rating"
    ],
    specifications: {
      general: {
        "Power Output": "400W",
        "Cell Type": "Monocrystalline",
        "Efficiency": "22.1%",
        "Dimensions": "2108 × 1048 × 40 mm",
        "Weight": "22.5 kg"
      },
      electrical: {
        "Maximum Power": "400W ± 3%",
        "Open Circuit Voltage": "49.5V",
        "Short Circuit Current": "10.2A",
        "Operating Temperature": "-40°C to +85°C"
      },
      warranty: {
        "Product Warranty": "12 years",
        "Performance Warranty": "25 years",
        "Certification": "IEC 61215, IEC 61730, CE"
      }
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Solar Panels', path: '/product-catalog-search?category=solar-panels' },
    { label: 'Tesla', path: '/product-catalog-search?brand=tesla' },
    { label: product?.name, path: '', current: true }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "LG Chem RESU 10H Lithium Battery",
      price: 4299,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
      id: 3,
      name: "Enphase IQ8+ Micro Inverter",
      price: 189,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400"
    },
    {
      id: 4,
      name: "Panasonic HIT+ 330W Solar Panel",
      price: 279,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400"
    }
  ];

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Adding to cart:', { productId: product?.id, quantity });
    // Show success message
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    navigate('/shopping-cart-checkout', { state: { directPurchase: { product, quantity } } });
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleShare = () => {
    if (navigator?.share) {
      navigator?.share({
        title: product?.name,
        url: window?.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator?.clipboard?.writeText(window?.location?.href);
    }
  };

  const handleContactSeller = () => {
    // Handle contact seller logic
    console.log('Contacting seller:', product?.seller?.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={navigate} />
      
      <main className="pt-20 pb-20 lg:pb-8">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <NavigationBreadcrumbs items={breadcrumbItems} onNavigate={navigate} />
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Product Images */}
            <div className="lg:col-span-7">
              <ProductImageGallery images={product?.images} productName={product?.name} />
            </div>

            {/* Product Info & Purchase */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <ProductInfoSection 
                  product={product}
                  isInWishlist={isInWishlist}
                  onAddToWishlist={handleAddToWishlist}
                  onShare={handleShare}
                />
                
                <PurchaseControls
                  product={product}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />

                <SellerInfo 
                  seller={product?.seller}
                  onContactSeller={handleContactSeller}
                />
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <ProductSpecifications 
              specifications={product?.specifications}
              keyFeatures={product?.keyFeatures}
              warranty={product?.warranty}
              shipping={product?.shipping}
            />
          </div>

          {/* Customer Reviews */}
          <div className="mt-12">
            <CustomerReviews 
              rating={product?.rating}
              reviewCount={product?.reviewCount}
              productId={product?.id}
            />
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>

        {/* Mobile Sticky Purchase Bar */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border shadow-modal z-40">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-foreground">${product?.price}</span>
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-sm text-success font-medium">
                {product?.stockCount} left
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCart}
                className="flex-1"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add to Cart
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MobileTabBar user={user} onNavigate={navigate} />
    </div>
  );
};

export default ProductDetailPage;