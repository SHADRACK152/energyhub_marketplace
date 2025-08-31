import React, { useState, useEffect } from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import InventoryToolbar from './components/InventoryToolbar';
import FilterSidebar from './components/FilterSidebar';
import ProductTable from './components/ProductTable';
import ProductGrid from './components/ProductGrid';
import AddProductModal from './components/AddProductModal';
import BulkUploadModal from './components/BulkUploadModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const B2BInventoryManagement = () => {
  const [user] = useState({ 
    id: 1, 
    name: 'John Smith', 
    role: 'seller',
    email: 'john.smith@energyhub.com'
  });

  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    priceMin: '',
    priceMax: '',
    featured: false
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Monocrystalline Solar Panel 400W",
      brand: "SolarTech Pro",
      sku: "ST-400-MONO-2024",
      category: "Solar Panels",
      description: "High-efficiency monocrystalline solar panel with 22.1% efficiency rating and 25-year warranty.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop",
      stock: 150,
      price: 299.99,
      status: "active",
      specifications: {
        power: "400W",
        voltage: "24V",
        efficiency: "22.1%",
        warranty: "25 years",
        dimensions: "2108×1048×40mm",
        weight: "22.5kg"
      },
      featured: true,
      lastUpdated: new Date(2024, 7, 28)
    },
    {
      id: 2,
      name: "Lithium Iron Phosphate Battery 100Ah",
      brand: "PowerStore",
      sku: "PS-100-LFP-2024",
      category: "Batteries",
      description: "Deep cycle LiFePO4 battery with built-in BMS and 10-year warranty.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      stock: 8,
      price: 899.99,
      status: "active",
      specifications: {
        capacity: "100Ah",
        voltage: "12.8V",
        cycles: "6000+",
        warranty: "10 years",
        dimensions: "330×173×220mm",
        weight: "13.5kg"
      },
      featured: false,
      lastUpdated: new Date(2024, 7, 25)
    },
    {
      id: 3,
      name: "Pure Sine Wave Inverter 3000W",
      brand: "InverTech",
      sku: "IT-3000-PSW-2024",
      category: "Inverters",
      description: "High-efficiency pure sine wave inverter with remote monitoring capabilities.",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
      stock: 0,
      price: 549.99,
      status: "active",
      specifications: {
        power: "3000W",
        efficiency: "95%",
        waveform: "Pure Sine Wave",
        warranty: "5 years",
        dimensions: "450×200×100mm",
        weight: "8.2kg"
      },
      featured: true,
      lastUpdated: new Date(2024, 7, 30)
    },
    {
      id: 4,
      name: "Roof Mounting System Kit",
      brand: "MountMax",
      sku: "MM-ROOF-KIT-2024",
      category: "Mounting Systems",
      description: "Complete roof mounting system for residential solar installations.",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=400&fit=crop",
      stock: 75,
      price: 189.99,
      status: "inactive",
      specifications: {
        panels: "Up to 20 panels",
        material: "Aluminum",
        tilt: "0-60 degrees",
        warranty: "15 years",
        weight: "45kg per kit"
      },
      featured: false,
      lastUpdated: new Date(2024, 7, 20)
    },
    {
      id: 5,
      name: "MPPT Charge Controller 60A",
      brand: "ChargeMax",
      sku: "CM-MPPT-60A-2024",
      category: "Charge Controllers",
      description: "Maximum Power Point Tracking charge controller with LCD display.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      stock: 45,
      price: 159.99,
      status: "active",
      specifications: {
        current: "60A",
        voltage: "12V/24V",
        efficiency: "98%",
        warranty: "3 years",
        dimensions: "175×145×38mm",
        weight: "1.2kg"
      },
      featured: false,
      lastUpdated: new Date(2024, 7, 22)
    },
    {
      id: 6,
      name: "Solar Cable 4mm² Red/Black",
      brand: "CableTech",
      sku: "CT-SOLAR-4MM-2024",
      category: "Cables & Wiring",
      description: "UV-resistant solar cable suitable for outdoor installations.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      stock: 500,
      price: 2.99,
      status: "active",
      specifications: {
        gauge: "4mm²",
        voltage: "1000V DC",
        temperature: "-40°C to +90°C",
        warranty: "25 years",
        length: "Per meter"
      },
      featured: false,
      lastUpdated: new Date(2024, 7, 15)
    }
  ]);

  // Filter products based on search and filters
  const filteredProducts = products?.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesCategory = !filters?.category || product?.category?.toLowerCase()?.replace(/\s+/g, '-') === filters?.category;
    const matchesStatus = !filters?.status || product?.status === filters?.status;
    
    const matchesStockLevel = !filters?.stockLevel || 
      (filters?.stockLevel === 'in-stock' && product?.stock > 10) ||
      (filters?.stockLevel === 'low-stock' && product?.stock > 0 && product?.stock <= 10) ||
      (filters?.stockLevel === 'out-of-stock' && product?.stock === 0);

    const matchesPriceMin = !filters?.priceMin || product?.price >= parseFloat(filters?.priceMin);
    const matchesPriceMax = !filters?.priceMax || product?.price <= parseFloat(filters?.priceMax);
    const matchesFeatured = !filters?.featured || product?.featured;

    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel && 
           matchesPriceMin && matchesPriceMax && matchesFeatured;
  });

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev?.includes(productId) 
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === filteredProducts?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on products:`, selectedProducts);
    // Implement bulk actions here
    setSelectedProducts([]);
  };

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: products?.length + 1,
      lastUpdated: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleBulkUpload = (file, validationResults) => {
    console.log('Bulk uploading:', file, validationResults);
    // Implement bulk upload logic here
  };

  const handleExport = () => {
    console.log('Exporting products...');
    // Implement export functionality
  };

  const handleEditProduct = (productId) => {
    console.log('Editing product:', productId);
    // Implement edit functionality
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev?.filter(p => p?.id !== productId));
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts(prev => prev?.map(p => 
      p?.id === productId ? { ...p, stock: newStock, lastUpdated: new Date() } : p
    ));
  };

  const handleUpdatePrice = (productId, newPrice) => {
    setProducts(prev => prev?.map(p => 
      p?.id === productId ? { ...p, price: newPrice, lastUpdated: new Date() } : p
    ));
  };

  const handleToggleStatus = (productId) => {
    setProducts(prev => prev?.map(p => 
      p?.id === productId ? { 
        ...p, 
        status: p?.status === 'active' ? 'inactive' : 'active',
        lastUpdated: new Date()
      } : p
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={() => {}} />
      <div className="pt-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={() => {}} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your product catalog, pricing, and stock levels
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Filter"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  Filters
                </Button>
                <div className="text-sm text-muted-foreground">
                  {filteredProducts?.length} of {products?.length} products
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={setFilters}
                resultCount={filteredProducts?.length}
              />
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filteredProducts?.length}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <InventoryToolbar
                onAddProduct={() => setShowAddModal(true)}
                onBulkUpload={() => setShowBulkModal(true)}
                onExport={handleExport}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCount={selectedProducts?.length}
                onBulkAction={handleBulkAction}
              />

              {/* Products Display */}
              {filteredProducts?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || Object.values(filters)?.some(f => f) 
                      ? 'Try adjusting your search or filters' : 'Get started by adding your first product'
                    }
                  </p>
                  <Button
                    variant="default"
                    iconName="Plus"
                    onClick={() => setShowAddModal(true)}
                  >
                    Add Product
                  </Button>
                </div>
              ) : (
                <>
                  {viewMode === 'table' ? (
                    <ProductTable
                      products={filteredProducts}
                      selectedProducts={selectedProducts}
                      onSelectProduct={handleSelectProduct}
                      onSelectAll={handleSelectAll}
                      onEditProduct={handleEditProduct}
                      onDeleteProduct={handleDeleteProduct}
                      onUpdateStock={handleUpdateStock}
                      onUpdatePrice={handleUpdatePrice}
                      onToggleStatus={handleToggleStatus}
                    />
                  ) : (
                    <ProductGrid
                      products={filteredProducts}
                      selectedProducts={selectedProducts}
                      onSelectProduct={handleSelectProduct}
                      onEditProduct={handleEditProduct}
                      onDeleteProduct={handleDeleteProduct}
                      onToggleStatus={handleToggleStatus}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />
      <BulkUploadModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onUpload={handleBulkUpload}
      />
    </div>
  );
};

export default B2BInventoryManagement;