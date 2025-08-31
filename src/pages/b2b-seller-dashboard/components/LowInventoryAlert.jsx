import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LowInventoryAlert = ({ lowStockItems, onRestockItem, onViewInventory }) => {
  if (!lowStockItems || lowStockItems?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Inventory Status</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">All products are well stocked!</p>
        <Button variant="outline" size="sm" iconName="Package" onClick={onViewInventory}>
          View Inventory
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Low Inventory Alert</h3>
      </div>
      <div className="space-y-3 mb-4">
        {lowStockItems?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item?.name}</p>
              <p className="text-xs text-muted-foreground">{item?.category}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-warning">{item?.currentStock} left</p>
                <p className="text-xs text-muted-foreground">Min: {item?.minStock}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                onClick={() => onRestockItem(item?.id)}
              >
                Restock
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" iconName="Package" onClick={onViewInventory} fullWidth>
        View All Inventory
      </Button>
    </div>
  );
};

export default LowInventoryAlert;