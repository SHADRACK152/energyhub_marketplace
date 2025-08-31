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
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
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
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {products?.map((product) => (
            <div
              key={product?.id}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
            >
              <div className="bg-background border border-border rounded-lg p-4 h-full">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product?.isNew && (
                    <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </span>
                  )}
                  <button
                    onClick={() => onAddToWishlist(product?.id)}
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background p-2 rounded-full transition-smooth"
                  >
                    <Icon 
                      name={product?.isWishlisted ? "Heart" : "Heart"} 
                      size={16} 
                      className={product?.isWishlisted ? "text-destructive fill-current" : "text-muted-foreground"} 
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {product?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product?.brand}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.floor(product?.rating) 
                            ? "text-warning fill-current" :"text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product?.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        ${product?.price?.toLocaleString()}
                      </span>
                      {product?.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ${product?.originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product?.inStock && (
                      <span className="text-xs text-success font-medium">
                        In Stock
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProduct(product?.id)}
                      className="flex-1"
                    >
                      View Details
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;