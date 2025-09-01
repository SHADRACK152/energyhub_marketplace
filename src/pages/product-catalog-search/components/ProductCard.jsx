import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { useRef } from 'react';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onAddToCompare, isInWishlist, isInComparison, onQuickView }) => {
  const imgRef = useRef();
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
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] w-72 h-[420px] flex flex-col relative"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-56 overflow-hidden transition-transform duration-500 group-hover:rotate-x-6 group-hover:rotate-y-3 group-hover:shadow-3xl"
        style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        }}
      >
        <Image
          ref={imgRef}
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-contain bg-white group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 flex flex-col space-y-1 z-10">
          <button
            onClick={() => onAddToWishlist(product?.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth shadow-md ${
              isInWishlist
                ? 'bg-error text-error-foreground'
                : 'bg-background/80 text-muted-foreground hover:text-error'
            }`}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
          <button
            onClick={() => onAddToCompare(product?.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth shadow-md ${
              isInComparison
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-background/80 text-muted-foreground hover:text-secondary'
            }`}
          >
            <Icon name="GitCompare" size={16} />
          </button>
        </div>
        {/* Product Badges */}
        {product?.badge && (
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            <span className={`px-2 py-1 text-xs font-bold rounded-full shadow-md uppercase tracking-wide ${
              product?.badge === 'New' ? 'bg-success text-success-foreground' :
              product?.badge === 'Sale' ? 'bg-error text-error-foreground' :
              product?.badge === 'Popular' ? 'bg-primary/90 text-white' :
              'bg-accent text-accent-foreground'
            }`}>
              {product?.badge}
            </span>
            {/* Example: Eco Friendly badge */}
            {product?.eco && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold shadow">Eco</span>
            )}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Stock Level Indicator */}
        {product.inStock && product.stockLevel !== undefined && (
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="bg-success h-2 rounded-full" style={{ width: `${Math.min(100, product.stockLevel)}%` }}></div>
          </div>
        )}
        {/* Discount Countdown (placeholder) */}
        {product.discountEndsAt && (
          <div className="mb-2 text-xs text-error font-semibold animate-pulse">Sale ends soon!</div>
        )}
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

        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            disabled={!product?.inStock}
            onClick={() => onAddToCart(product?.id, imgRef)}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={16}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onQuickView(product)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;