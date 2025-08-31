import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistPreview = ({ wishlistItems, onAddToCart, onRemoveFromWishlist, onViewWishlist }) => {
  if (wishlistItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Your Wishlist</h2>
        </div>
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button variant="outline" onClick={onViewWishlist}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Heart" size={20} className="mr-2 text-destructive" />
          Your Wishlist ({wishlistItems?.length})
        </h2>
        <Button variant="ghost" size="sm" onClick={onViewWishlist} iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems?.slice(0, 3)?.map((item) => (
          <div key={item?.id} className="bg-background border border-border rounded-lg p-4">
            <div className="relative mb-3">
              <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {item?.priceDropAlert && (
                <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium flex items-center">
                  <Icon name="TrendingDown" size={12} className="mr-1" />
                  Price Drop!
                </div>
              )}
              <button
                onClick={() => onRemoveFromWishlist(item?.id)}
                className="absolute top-2 right-2 bg-background/80 hover:bg-background p-1.5 rounded-full transition-smooth"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm line-clamp-2">
                {item?.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-foreground">
                    ${item?.currentPrice?.toLocaleString()}
                  </span>
                  {item?.originalPrice && item?.originalPrice !== item?.currentPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${item?.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {item?.inStock ? (
                    <span className="text-xs text-success font-medium flex items-center">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-destructive font-medium flex items-center">
                      <Icon name="XCircle" size={12} className="mr-1" />
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant={item?.inStock ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={!item?.inStock}
                onClick={() => onAddToCart(item?.id)}
                iconName="ShoppingCart"
                iconPosition="left"
                iconSize={14}
              >
                {item?.inStock ? "Add to Cart" : "Notify When Available"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPreview;