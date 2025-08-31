import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSummary = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (activeFilters?.length === 0) return null;

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters?.map((filter) => (
              <div
                key={`${filter?.type}-${filter?.value}`}
                className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                <span>{filter?.label}</span>
                <button
                  onClick={() => onRemoveFilter(filter?.type, filter?.value)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSummary;