  // Update product price handler
  const handleUpdatePrice = async (productId, newPrice) => {
    try {
      const res = await fetch(`/api/products/${productId}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice })
      });
      if (!res.ok) throw new Error('Failed to update price');
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, price: newPrice } : p));
    } catch (err) {
      alert(err.message || 'Error updating price');
    }
  };
  // Update product stock handler
  const handleUpdateStock = async (productId, newStock) => {
    try {
      const res = await fetch(`/api/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      if (!res.ok) throw new Error('Failed to update stock');
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    } catch (err) {
      alert(err.message || 'Error updating stock');
    }
  };
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
  // Delete product handler
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      // Optionally show loading state here
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      alert(err.message || 'Error deleting product');
    }
  };
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
    priceMax: '',
    featured: false
  });

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    setProductsLoading(true);
    setProductsError(null);
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setProductsLoading(false);
      })
      .catch(err => {
        setProductsError(err.message);
        setProductsLoading(false);
      });
  }, []);

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

  // Edit product handler
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  const handleEditProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditProductId(productId);
      setEditProductData({ ...product });
      setShowAddModal(true);
    }
  };

  // Save handler for both add and edit
  const handleSaveProduct = async (productData) => {
    if (editProductId) {
      // Edit existing product
      try {
        const res = await fetch(`/api/products/${editProductId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Failed to update product');
        setProducts(prev => prev.map(p => p.id === editProductId ? { ...productData, id: editProductId } : p));
      } catch (err) {
        alert(err.message || 'Error updating product');
      }
      setEditProductId(null);
      setEditProductData(null);
    } else {
      // Add new product with images using FormData
      try {
        const formData = new FormData();
        // Append all fields except images
        Object.entries(productData).forEach(([key, value]) => {
          if (key === 'images') return;
          // Stringify objects/arrays
          if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        // Append images as files
        if (productData.images && productData.images.length > 0) {
          productData.images.forEach(imgObj => {
            if (imgObj.file) formData.append('images', imgObj.file);
          });
        }
        const res = await fetch('/api/products', {
          method: 'POST',
          body: formData
        });
        if (!res.ok) throw new Error('Failed to add product');
        const newProduct = await res.json();
        setProducts(prev => [...prev, newProduct]);
      } catch (err) {
        alert(err.message || 'Error adding product');
      }
    }
    setShowAddModal(false);
  };

  // Toggle product status (active/inactive)
  const handleToggleStatus = (productId) => {
    setProducts(prev => prev?.map(p =>
      p?.id === productId
        ? { ...p, status: p?.status === 'active' ? 'inactive' : 'active', lastUpdated: new Date() }
        : p
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
                {productsLoading ? (
                  <div className="bg-card border border-border rounded-lg p-12 text-center text-muted-foreground">
                    Loading products...
                  </div>
                ) : productsError ? (
                  <div className="bg-card border border-border rounded-lg p-12 text-center text-error">
                    {productsError}
                  </div>
                ) : filteredProducts?.length === 0 ? (
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
        onClose={() => {
          setShowAddModal(false);
          setEditProductId(null);
          setEditProductData(null);
        }}
        onSave={handleSaveProduct}
        product={editProductData}
        isEdit={!!editProductId}
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