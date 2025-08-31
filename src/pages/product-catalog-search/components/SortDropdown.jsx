import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSort = sortOptions?.find(option => option?.value === sortBy);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {resultsCount?.toLocaleString()} results found
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-muted transition-smooth"
        >
          <span className="text-sm font-medium">Sort by: {currentSort?.label}</span>
          <Icon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="text-muted-foreground"
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-modal z-50">
            <div className="py-1">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-smooth ${
                    sortBy === option?.value
                      ? 'text-primary bg-primary/10' :'text-foreground'
                  }`}
                >
                  {option?.label}
                  {sortBy === option?.value && (
                    <Icon name="Check" size={16} className="float-right mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;