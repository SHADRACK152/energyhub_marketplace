import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import CategoryChips from './components/CategoryChips';
import FilterSummary from './components/FilterSummary';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import ComparisonPanel from './components/ComparisonPanel';
import LoadingSkeleton from './components/LoadingSkeleton';

const ProductCatalogSearch = () => {
  const navigate = useNavigate();
  const [user] = useState({ role: 'buyer', name: 'John Doe' }); // Mock user

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Filter state
  const [filters, setFilters] = useState({
    price: { min: '', max: '' },
    brand: [],
    specifications: [],
    rating: [],
    availability: []
  });

  // Mock data
  const categories = [
    { id: 'solar-panels', name: 'Solar Panels', icon: 'Sun', count: 156 },
    { id: 'batteries', name: 'Batteries', icon: 'Battery', count: 89 },
    { id: 'inverters', name: 'Inverters', icon: 'Zap', count: 67 },
    { id: 'accessories', name: 'Accessories', icon: 'Settings', count: 234 }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Tesla Solar Panel 400W Monocrystalline High Efficiency",
      seller: "Tesla Energy",
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      badge: "New",
      inStock: true,
      category: 'solar-panels'
    },
    {
      id: 2,
      name: "LG Chem RESU 10H Lithium Battery Storage System",
      seller: "LG Energy Solutions",
      price: 4299,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      badge: "Sale",
      inStock: true,
      category: 'batteries'
    },
    {
      id: 3,
      name: "Enphase IQ8+ Micro Inverter 290W",
      seller: "Enphase Energy",
      price: 189,
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
      inStock: true,
      category: 'inverters'
    },
    {
      id: 4,
      name: "Panasonic HIT+ 330W Solar Panel",
      seller: "Panasonic Solar",
      price: 279,
      rating: 4.5,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400",
      inStock: false,
      category: 'solar-panels'
    },
    {
      id: 5,
      name: "SolarEdge HD-Wave 5000 String Inverter",
      seller: "SolarEdge Technologies",
      price: 1299,
      rating: 4.4,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400",
      inStock: true,
      category: 'inverters'
    },
    {
      id: 6,
      name: "Tesla Powerwall 2 Home Battery",
      seller: "Tesla Energy",
      price: 6500,
      rating: 4.9,
      reviewCount: 267,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      badge: "Popular",
      inStock: true,
      category: 'batteries'
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Filter products based on active filters
  const filterProducts = useCallback(() => {
    let filtered = [...mockProducts];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(product => product?.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.seller?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Price filter
    if (filters?.price?.min || filters?.price?.max) {
      filtered = filtered?.filter(product => {
        const price = product?.price;
        const min = filters?.price?.min ? parseFloat(filters?.price?.min) : 0;
        const max = filters?.price?.max ? parseFloat(filters?.price?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.id - a?.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, filters, sortBy]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  // Get active filters for display
  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.price?.min || filters?.price?.max) {
      const min = filters?.price?.min || '0';
      const max = filters?.price?.max || '∞';
      active?.push({
        type: 'price',
        value: 'range',
        label: `$${min} - $${max}`
      });
    }

    filters?.brand?.forEach(brand => {
      active?.push({
        type: 'brand',
        value: brand,
        label: brand?.charAt(0)?.toUpperCase() + brand?.slice(1)
      });
    });

    return active;
  };

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'price') {
      setFilters(prev => ({
        ...prev,
        price: { min: '', max: '' }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev?.[filterType]?.filter(item => item !== value)
      }));
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      price: { min: '', max: '' },
      brand: [],
      specifications: [],
      rating: [],
      availability: []
    });
  };

  const handleAddToCart = (productId) => {
    setCartItems(prev => [...prev, productId]);
    // Show success message or toast
  };

  const handleAddToWishlist = (productId) => {
    setWishlistItems(prev => 
      prev?.includes(productId) 
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCompare = (productId) => {
    if (comparisonItems?.length >= 3) {
      // Show message about maximum comparison limit
      return;
    }
    
    setComparisonItems(prev => 
      prev?.includes(productId) 
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    if (!comparisonItems?.includes(productId)) {
      setIsComparisonOpen(true);
    }
  };

  const handleRemoveFromComparison = (productId) => {
    setComparisonItems(prev => prev?.filter(id => id !== productId));
    if (comparisonItems?.length <= 1) {
      setIsComparisonOpen(false);
    }
  };

  const comparisonProducts = mockProducts?.filter(product => 
    comparisonItems?.includes(product?.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={navigate} />
      <main className="pt-16 pb-20 lg:pb-8">
        {/* Search Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-2xl mx-auto">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Filter Summary */}
        <FilterSummary
          activeFilters={getActiveFilters()}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Products Section */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                </Button>

                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultsCount={filteredProducts?.length}
                />
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <LoadingSkeleton count={12} />
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCompare={handleAddToCompare}
                  wishlistItems={wishlistItems}
                  comparisonItems={comparisonItems}
                />
              )}

              {/* Load More Button */}
              {!isLoading && filteredProducts?.length > 0 && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsLoading(true)}
                  >
                    Load More Products
                  </Button>
                </div>
              )}

              {/* No Results */}
              {!isLoading && filteredProducts?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="outline" onClick={handleClearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      {/* Comparison Panel */}
      <ComparisonPanel
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparisonProducts={comparisonProducts}
        onRemoveFromComparison={handleRemoveFromComparison}
      />
      {/* Comparison Floating Button */}
      {comparisonItems?.length > 0 && (
        <button
          onClick={() => setIsComparisonOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-6 bg-secondary text-secondary-foreground p-3 rounded-full shadow-modal hover:shadow-lg transition-smooth z-40"
        >
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} />
            <span className="hidden sm:inline text-sm font-medium">
              Compare ({comparisonItems?.length})
            </span>
            <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {comparisonItems?.length}
            </div>
          </div>
        </button>
      )}
      <MobileTabBar user={user} onNavigate={navigate} />
    </div>
  );
};

export default ProductCatalogSearch;