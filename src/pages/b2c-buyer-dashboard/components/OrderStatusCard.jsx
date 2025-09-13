import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderStatusCard = ({ order, onTrackOrder, onBuyAgain }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'shipped':
        return 'bg-secondary text-secondary-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  return (
    <div className="card-3d bg-card border border-border rounded-lg p-3">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={order?.productImage}
            alt={order?.productName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {order?.productName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Order #{order?.orderNumber}
              </p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
              <Icon name={getStatusIcon(order?.status)} size={12} className="mr-1" />
              {order?.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Ordered: {order?.orderDate}</p>
              {order?.deliveryDate && (
                <p>Expected: {order?.deliveryDate}</p>
              )}
            </div>
            
            <div className="flex space-x-2">
              {order?.status?.toLowerCase() !== 'delivered' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order?.id)}
                  iconName="MapPin"
                  iconPosition="left"
                  iconSize={14}
                  className="px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  Track
                </Button>
              )}
              {order?.status?.toLowerCase() === 'delivered' && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onBuyAgain(order?.productId)}
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={14}
                  className="px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  Buy Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;