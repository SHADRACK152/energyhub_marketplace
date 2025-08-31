import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileOrderCard = ({ order, onViewOrder, onFulfillOrder, onContactBuyer }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'processing':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'shipped':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">#{order?.id}</span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
          {order?.status}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <Icon name="User" size={20} className="text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{order?.buyer?.name}</p>
          <p className="text-xs text-muted-foreground">{order?.buyer?.company}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground">{order?.products?.length} items</p>
          <p className="text-xs text-muted-foreground">{order?.products?.[0]?.name}</p>
        </div>
        <span className="text-lg font-semibold text-foreground">${order?.value?.toLocaleString()}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          onClick={() => onViewOrder(order?.id)}
          fullWidth
        >
          View
        </Button>
        {order?.status === 'pending' && (
          <Button
            variant="default"
            size="sm"
            iconName="Package"
            onClick={() => onFulfillOrder(order?.id)}
            fullWidth
          >
            Fulfill
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          iconName="MessageCircle"
          onClick={() => onContactBuyer(order?.buyer?.id)}
        >
          <Icon name="MessageCircle" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MobileOrderCard;