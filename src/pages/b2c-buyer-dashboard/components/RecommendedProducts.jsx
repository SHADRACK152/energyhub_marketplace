import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ products, onAddToCart, onViewProduct, onAddToWishlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= products?.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? products?.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={products?.length <= 3}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={products?.length <= 3}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="card-3d p-3 hover:translate-y-[-4px] transition-transform">
            <div className="relative mb-3 rounded-md overflow-hidden h-44">
              <Image src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
              {product?.isNew && (
                <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                  New
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground line-clamp-2">{product?.name}</h3>
              <p className="text-sm text-muted-foreground">{product?.brand}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-foreground">${product?.price?.toLocaleString()}</span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">${product?.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                {product?.inStock && <span className="text-xs text-success font-medium">In Stock</span>}
              </div>

              <div className="flex space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewProduct(product?.id)}
                  className="flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAddToCart(product?.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;