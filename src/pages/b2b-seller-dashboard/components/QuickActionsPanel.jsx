import React from 'react';

import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAddProduct, onBulkUpload, onUpdatePricing }) => {
  const quickActions = [
    {
      title: 'Add Product',
      description: 'Add a new product to your inventory',
      icon: 'Plus',
      action: onAddProduct,
      variant: 'default'
    },
    {
      title: 'Bulk Upload',
      description: 'Upload multiple products via CSV',
      icon: 'Upload',
      action: onBulkUpload,
      variant: 'outline'
    },
    {
      title: 'Update Pricing',
      description: 'Modify pricing for existing products',
      icon: 'DollarSign',
      action: onUpdatePricing,
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            fullWidth
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.action}
            className="justify-start h-auto p-4"
          >
            <div className="text-left">
              <div className="font-medium">{action?.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;