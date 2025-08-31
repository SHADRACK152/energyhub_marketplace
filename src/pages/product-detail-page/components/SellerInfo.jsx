import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SellerInfo = ({ seller, onContactSeller }) => {
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
    <div className="border border-border rounded-lg p-4 mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Seller Information</h3>
        {seller?.verified && (
          <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-xs text-success font-medium">Verified Seller</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <Image
          src={seller?.profileImage}
          alt={seller?.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{seller?.name}</h4>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(seller?.rating)}
            <span className="text-sm text-muted-foreground">({seller?.rating})</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Response Time</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {seller?.responseTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Seller Rating</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            98.5% Positive
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Products Sold</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            2,847
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={onContactSeller}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Contact Seller
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Store"
          iconPosition="left"
        >
          View Store
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={12} className="text-primary" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RefreshCw" size={12} className="text-warning" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;