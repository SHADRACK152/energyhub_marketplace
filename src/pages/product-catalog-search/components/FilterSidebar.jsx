import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    specifications: false,
    rating: false,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange('price', { ...filters?.price, [type]: value });
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters?.[filterType] || [];
    if (checked) {
      onFilterChange(filterType, [...currentValues, value]);
    } else {
      onFilterChange(filterType, currentValues?.filter(v => v !== value));
    }
  };

  const brands = [
    { id: 'tesla', name: 'Tesla Energy', count: 45 },
    { id: 'lg', name: 'LG Chem', count: 32 },
    { id: 'panasonic', name: 'Panasonic', count: 28 },
    { id: 'enphase', name: 'Enphase', count: 24 },
    { id: 'solaredge', name: 'SolarEdge', count: 19 }
  ];

  const specifications = [
    { id: 'monocrystalline', name: 'Monocrystalline', count: 67 },
    { id: 'polycrystalline', name: 'Polycrystalline', count: 43 },
    { id: 'lithium-ion', name: 'Lithium-ion', count: 89 },
    { id: 'string-inverter', name: 'String Inverter', count: 34 },
    { id: 'micro-inverter', name: 'Micro Inverter', count: 28 }
  ];

  const ratings = [
    { value: 4, label: '4+ Stars', count: 156 },
    { value: 3, label: '3+ Stars', count: 203 },
    { value: 2, label: '2+ Stars', count: 234 },
    { value: 1, label: '1+ Stars', count: 245 }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white/60 dark:bg-card/70 border-r border-border z-50 transform transition-transform duration-300 overflow-y-auto backdrop-blur-xl shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`} style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', borderRadius: '1.25rem'}}>
        <div className="p-4 border-b border-border lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon name="Sliders" size={22} className="text-primary" /> Filters
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

  <div className="p-4 space-y-8">
          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="flex items-center gap-2">
                <Icon name="Wallet" size={18} className="text-primary/80" />
                <h3 className="font-semibold text-foreground">Price Range</h3>
              </span>
              <Icon
                name={expandedSections?.price ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-muted-foreground group-hover:text-primary"
              />
            </button>
            {expandedSections?.price && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters?.price?.min || ''}
                    onChange={(e) => handlePriceChange('min', e?.target?.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters?.price?.max || ''}
                    onChange={(e) => handlePriceChange('max', e?.target?.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>KSh 0</span>
                  <div className="flex-1 h-2 bg-muted rounded-full relative">
                    <div className="absolute left-1/4 right-1/3 h-full bg-primary rounded-full"></div>
                  </div>
                  <span>KSh 10,000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Brand */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="flex items-center gap-2">
                <Icon name="BadgePercent" size={18} className="text-primary/80" />
                <h3 className="font-semibold text-foreground">Brand</h3>
              </span>
              <Icon
                name={expandedSections?.brand ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-muted-foreground group-hover:text-primary"
              />
            </button>
            {expandedSections?.brand && (
              <div className="mt-3 space-y-2">
                {brands?.map((brand) => (
                  <div key={brand?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={brand?.name}
                      checked={filters?.brand?.includes(brand?.id) || false}
                      onChange={(e) => handleCheckboxChange('brand', brand?.id, e?.target?.checked)}
                    />
                    <span className="text-xs text-muted-foreground">({brand?.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div>
            <button
              onClick={() => toggleSection('specifications')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="flex items-center gap-2">
                <Icon name="Settings" size={18} className="text-primary/80" />
                <h3 className="font-semibold text-foreground">Specifications</h3>
              </span>
              <Icon
                name={expandedSections?.specifications ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-muted-foreground group-hover:text-primary"
              />
            </button>
            {expandedSections?.specifications && (
              <div className="mt-3 space-y-2">
                {specifications?.map((spec) => (
                  <div key={spec?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={spec?.name}
                      checked={filters?.specifications?.includes(spec?.id) || false}
                      onChange={(e) => handleCheckboxChange('specifications', spec?.id, e?.target?.checked)}
                    />
                    <span className="text-xs text-muted-foreground">({spec?.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="flex items-center gap-2">
                <Icon name="Star" size={18} className="text-primary/80" />
                <h3 className="font-semibold text-foreground">Customer Rating</h3>
              </span>
              <Icon
                name={expandedSections?.rating ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-muted-foreground group-hover:text-primary"
              />
            </button>
            {expandedSections?.rating && (
              <div className="mt-3 space-y-2">
                {ratings?.map((rating) => (
                  <div key={rating?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={
                        <div className="flex items-center space-x-1">
                          {[...Array(rating?.value)]?.map((_, i) => (
                            <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                          ))}
                          <span className="text-sm">{rating?.label}</span>
                        </div>
                      }
                      checked={filters?.rating?.includes(rating?.value) || false}
                      onChange={(e) => handleCheckboxChange('rating', rating?.value, e?.target?.checked)}
                    />
                    <span className="text-xs text-muted-foreground">({rating?.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="flex items-center gap-2">
                <Icon name="Truck" size={18} className="text-primary/80" />
                <h3 className="font-semibold text-foreground">Availability</h3>
              </span>
              <Icon
                name={expandedSections?.availability ? "ChevronUp" : "ChevronDown"}
                size={18}
                className="text-muted-foreground group-hover:text-primary"
              />
            </button>
            {expandedSections?.availability && (
              <div className="mt-3 space-y-2">
                <Checkbox
                  label="In Stock"
                  checked={filters?.availability?.includes('in-stock') || false}
                  onChange={(e) => handleCheckboxChange('availability', 'in-stock', e?.target?.checked)}
                />
                <Checkbox
                  label="Free Shipping"
                  checked={filters?.availability?.includes('free-shipping') || false}
                  onChange={(e) => handleCheckboxChange('availability', 'free-shipping', e?.target?.checked)}
                />
                <Checkbox
                  label="Same Day Delivery"
                  checked={filters?.availability?.includes('same-day') || false}
                  onChange={(e) => handleCheckboxChange('availability', 'same-day', e?.target?.checked)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;