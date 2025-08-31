import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummaryStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'In Transit',
      value: stats?.inTransit || 0,
      icon: 'Truck',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Delivered',
      value: stats?.delivered || 0,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Spent',
      value: `$${(stats?.totalSpent || 0)?.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`${item?.bgColor} p-2 rounded-lg`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {item?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {item?.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryStats;