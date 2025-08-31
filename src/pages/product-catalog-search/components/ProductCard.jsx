import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onAddToCompare, isInWishlist, isInComparison }) => {
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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-modal transition-smooth group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <button
            onClick={() => onAddToWishlist(product?.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth ${
              isInWishlist
                ? 'bg-error text-error-foreground'
                : 'bg-background/80 text-muted-foreground hover:text-error'
            }`}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
          <button
            onClick={() => onAddToCompare(product?.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth ${
              isInComparison
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-background/80 text-muted-foreground hover:text-secondary'
            }`}
          >
            <Icon name="GitCompare" size={16} />
          </button>
        </div>
        {product?.badge && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product?.badge === 'New' ? 'bg-success text-success-foreground' :
              product?.badge === 'Sale' ? 'bg-error text-error-foreground' :
              'bg-accent text-accent-foreground'
            }`}>
              {product?.badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{product?.name}</h3>
          <p className="text-sm text-muted-foreground">{product?.seller}</p>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          {renderStars(product?.rating)}
          <span className="text-xs text-muted-foreground ml-1">({product?.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">${product?.price}</span>
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
          </div>
          {product?.inStock ? (
            <span className="text-xs text-success font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-error font-medium">Out of Stock</span>
          )}
        </div>

        <Button
          variant="default"
          size="sm"
          fullWidth
          disabled={!product?.inStock}
          onClick={() => onAddToCart(product?.id)}
          iconName="ShoppingCart"
          iconPosition="left"
          iconSize={16}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;