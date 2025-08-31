import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfoSection = ({ product, isInWishlist, onAddToWishlist, onShare }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />);
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
          {product?.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.rating} ({product?.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl lg:text-4xl font-bold text-foreground">
            ${product?.price}
          </span>
          {product?.originalPrice && (
            <div className="flex items-center space-x-2">
              <span className="text-xl text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
              <span className="bg-error text-error-foreground px-2 py-1 rounded-md text-sm font-medium">
                -{product?.discount}%
              </span>
            </div>
          )}
        </div>
        
        {product?.shipping?.freeShipping && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Truck" size={16} />
            <span className="text-sm font-medium">Free shipping</span>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {product?.inStock ? (
            <>
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success font-medium">In Stock</span>
              <span className="text-muted-foreground">
                ({product?.stockCount} available)
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-error font-medium">Out of Stock</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddToWishlist}
            className={isInWishlist ? 'text-error' : ''}
          >
            <Icon name="Heart" size={20} className={isInWishlist ? 'fill-current' : ''} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Icon name="Share2" size={20} />
          </Button>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Delivery</span>
          </div>
          <span className="text-sm text-foreground">
            {product?.shipping?.estimatedDays} business days
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Warranty</span>
          </div>
          <span className="text-sm text-foreground">{product?.warranty}</span>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product?.keyFeatures?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfoSection;