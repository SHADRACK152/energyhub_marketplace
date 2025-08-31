import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContinueShoppingSection = ({ recentlyViewed, abandonedCart, onAddToCart, onViewProduct }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Continue Shopping</h2>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      {/* Abandoned Cart Items */}
      {abandonedCart?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Items in your cart
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {abandonedCart?.map((item) => (
              <div key={item?.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-background rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {item?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${item?.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="mt-3"
                  onClick={() => onAddToCart(item?.id)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recently Viewed */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
          <Icon name="Eye" size={16} className="mr-2" />
          Recently viewed
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentlyViewed?.map((product) => (
            <div
              key={product?.id}
              className="bg-background border border-border rounded-lg p-3 hover:shadow-card transition-smooth cursor-pointer"
              onClick={() => onViewProduct(product?.id)}
            >
              <div className="w-full h-24 bg-muted rounded-lg overflow-hidden mb-3">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground text-sm truncate mb-1">
                {product?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                ${product?.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueShoppingSection;