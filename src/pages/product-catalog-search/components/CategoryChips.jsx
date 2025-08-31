import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-smooth ${
              activeCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
            <span className="text-sm font-medium">All Products</span>
          </button>
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span className="text-sm font-medium">{category?.name}</span>
              <span className="text-xs bg-background/20 px-2 py-0.5 rounded-full">
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChips;