import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersTable = ({ orders, onViewOrder, onFulfillOrder, onContactBuyer }) => {
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
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Order ID</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Buyer</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Products</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Value</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders?.map((order) => (
              <tr key={order?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="py-4 px-6">
                  <span className="font-mono text-sm text-foreground">#{order?.id}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order?.buyer?.name}</p>
                      <p className="text-xs text-muted-foreground">{order?.buyer?.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm text-foreground">{order?.products?.length} items</p>
                    <p className="text-xs text-muted-foreground">{order?.products?.[0]?.name}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-semibold text-foreground">${order?.value?.toLocaleString()}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewOrder(order?.id)}
                    >
                      View
                    </Button>
                    {order?.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Package"
                        onClick={() => onFulfillOrder(order?.id)}
                      >
                        Fulfill
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageCircle"
                      onClick={() => onContactBuyer(order?.buyerId)}
                    >
                      Contact
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;