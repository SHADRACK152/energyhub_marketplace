import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={12} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={12} className="text-warning fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />);
    }

    return stars;
  };

  const handleProductClick = (productId) => {
    // Navigate to product detail page
    window.location.href = `/product-detail-page/${productId}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Related Products</h3>
        <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-modal transition-all duration-300 cursor-pointer group"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Handle wishlist toggle
                  }}
                  className="p-2 bg-background/80 hover:bg-background rounded-full backdrop-blur-sm transition-colors"
                >
                  <Icon name="Heart" size={16} className="text-muted-foreground hover:text-error" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h4>
                
                <div className="flex items-center space-x-1 mt-1">
                  {renderStars(product?.rating)}
                  <span className="text-xs text-muted-foreground">({product?.rating})</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">
                  ${product?.price}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Handle add to cart
                  }}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Complementary Products Section */}
      <div className="border-t border-border pt-6 mt-8">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Frequently Bought Together
        </h4>
        
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-lg bg-background border border-border flex items-center justify-center mb-2">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <span className="text-sm font-medium">This Product</span>
              <p className="text-xs text-muted-foreground">KSh 299</p>
            </div>
            
            <Icon name="Plus" size={16} className="text-muted-foreground" />
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-lg bg-background border border-border flex items-center justify-center mb-2">
                <Icon name="Battery" size={24} className="text-secondary" />
              </div>
              <span className="text-sm font-medium">Power Storage</span>
              <p className="text-xs text-muted-foreground">KSh 1,299</p>
            </div>
            
            <Icon name="Plus" size={16} className="text-muted-foreground" />
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-lg bg-background border border-border flex items-center justify-center mb-2">
                <Icon name="Settings" size={24} className="text-accent" />
              </div>
              <span className="text-sm font-medium">Installation Kit</span>
              <p className="text-xs text-muted-foreground">KSh 89</p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div>
              <span className="text-2xl font-bold text-foreground">KSh 1,687</span>
              <span className="text-lg text-muted-foreground line-through ml-2">KSh 1,799</span>
              <span className="text-sm bg-success text-success-foreground px-2 py-1 rounded-md ml-2">
                Save KSh 112
              </span>
            </div>
            
            <Button variant="default" size="lg" iconName="ShoppingCart" iconPosition="left">
              Add Bundle to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;