import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ onTrackOrders, onReorderFavorites, onBrowseCategories, onViewProfile }) => {
  const quickActions = [
    {
      id: 'track-orders',
      title: 'Track Orders',
      description: 'Check your order status',
      icon: 'MapPin',
      color: 'bg-secondary text-secondary-foreground',
      onClick: onTrackOrders
    },
    {
      id: 'reorder-favorites',
      title: 'Reorder Favorites',
      description: 'Buy your favorite items again',
      icon: 'RotateCcw',
      color: 'bg-accent text-accent-foreground',
      onClick: onReorderFavorites
    },
    {
      id: 'browse-categories',
      title: 'Browse Categories',
      description: 'Explore product categories',
      icon: 'Grid3X3',
      color: 'bg-primary text-primary-foreground',
      onClick: onBrowseCategories
    },
    {
      id: 'view-profile',
      title: 'Account Settings',
      description: 'Manage your profile',
      icon: 'Settings',
      color: 'bg-muted text-muted-foreground',
      onClick: onViewProfile
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.onClick}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-card transition-smooth text-left group"
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <h3 className="font-medium text-foreground mb-1 text-sm">
              {action?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;