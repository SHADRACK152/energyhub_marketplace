import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const InventoryToolbar = ({ 
  onAddProduct, 
  onBulkUpload, 
  onExport, 
  viewMode, 
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedCount,
  onBulkAction
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const bulkActionOptions = [
    { value: 'activate', label: 'Activate Selected' },
    { value: 'deactivate', label: 'Deactivate Selected' },
    { value: 'update-price', label: 'Update Prices' },
    { value: 'update-stock', label: 'Update Stock' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowBulkActions(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Section - Search and Bulk Actions */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search products, SKUs, descriptions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <Select
                placeholder="Bulk Actions"
                options={bulkActionOptions}
                value=""
                onChange={(value) => handleBulkAction(value)}
                className="min-w-[140px]"
              />
            </div>
          )}
        </div>

        {/* Right Section - Action Buttons and View Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            onClick={onBulkUpload}
            className="hidden sm:flex"
          >
            Bulk Upload
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
            className="hidden sm:flex"
          >
            Export
          </Button>

          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddProduct}
          >
            Add Product
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => onViewModeChange('table')}
              className="rounded-r-none border-r"
            />
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => onViewModeChange('grid')}
              className="rounded-l-none"
            />
          </div>
        </div>
      </div>
      {/* Mobile Action Buttons */}
      <div className="flex sm:hidden gap-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          iconName="Upload"
          onClick={onBulkUpload}
          fullWidth
        >
          Bulk Upload
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          onClick={onExport}
          fullWidth
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default InventoryToolbar;