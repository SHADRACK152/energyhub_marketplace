import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  resultCount 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'solar-panels', label: 'Solar Panels' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'inverters', label: 'Inverters' },
    { value: 'mounting', label: 'Mounting Systems' },
    { value: 'cables', label: 'Cables & Wiring' },
    { value: 'monitoring', label: 'Monitoring Systems' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ];

  const stockLevelOptions = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      status: '',
      stockLevel: '',
      priceMin: '',
      priceMax: '',
      featured: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-card border-r border-border z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {resultCount} results
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Select
                label="Category"
                placeholder="All Categories"
                options={categoryOptions}
                value={localFilters?.category}
                onChange={(value) => handleFilterChange('category', value)}
                clearable
              />
            </div>

            {/* Status Filter */}
            <div>
              <Select
                label="Status"
                placeholder="All Statuses"
                options={statusOptions}
                value={localFilters?.status}
                onChange={(value) => handleFilterChange('status', value)}
                clearable
              />
            </div>

            {/* Stock Level Filter */}
            <div>
              <Select
                label="Stock Level"
                placeholder="All Stock Levels"
                options={stockLevelOptions}
                value={localFilters?.stockLevel}
                onChange={(value) => handleFilterChange('stockLevel', value)}
                clearable
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min $"
                  value={localFilters?.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max $"
                  value={localFilters?.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
                />
              </div>
            </div>

            {/* Featured Products */}
            <div>
              <Checkbox
                label="Featured Products Only"
                checked={localFilters?.featured}
                onChange={(e) => handleFilterChange('featured', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="default"
              onClick={handleApplyFilters}
              fullWidth
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              fullWidth
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;