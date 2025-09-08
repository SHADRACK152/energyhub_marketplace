import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };
  // State definitions
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

  // Edit product state
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    setProductsLoading(true);
    setProductsError(null);
    fetch('http://localhost:5000/api/products')
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

  // Update product price handler
  const handleUpdatePrice = async (productId, newPrice) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice })
      });
      if (!res.ok) throw new Error('Failed to update price');
      
      // Update both price and pricing.basePrice for compatibility
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { 
              ...p, 
              price: newPrice,
              pricing: { ...p.pricing, basePrice: newPrice }
            } 
          : p
      ));
    } catch (err) {
      alert(err.message || 'Error updating price');
    }
  };

  // Update product stock handler
  const handleUpdateStock = async (productId, newStock) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      if (!res.ok) throw new Error('Failed to update stock');
      
      // Update both stock and inventory.stock for compatibility
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { 
              ...p, 
              stock: newStock,
              inventory: { ...p.inventory, stock: newStock }
            } 
          : p
      ));
    } catch (err) {
      alert(err.message || 'Error updating stock');
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      alert(err.message || 'Error deleting product');
    }
  };

  // Filter products based on search and filters
  const filteredProducts = products?.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesCategory = !filters?.category || product?.category?.toLowerCase()?.replace(/\s+/g, '-') === filters?.category;
    const matchesStatus = !filters?.status || product?.status === filters?.status;
    
    // Handle stock level filtering - check both stock field and inventory.stock
    const stockValue = product?.stock ?? product?.inventory?.stock ?? 0;
    const matchesStockLevel = !filters?.stockLevel || 
      (filters?.stockLevel === 'in-stock' && stockValue > 10) ||
      (filters?.stockLevel === 'low-stock' && stockValue > 0 && stockValue <= 10) ||
      (filters?.stockLevel === 'out-of-stock' && stockValue === 0);

    // Handle price filtering - check both price and pricing.basePrice
    const priceValue = product?.price ?? product?.pricing?.basePrice ?? 0;
    const matchesPriceMin = !filters?.priceMin || priceValue >= parseFloat(filters?.priceMin);
    const matchesPriceMax = !filters?.priceMax || priceValue <= parseFloat(filters?.priceMax);
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

  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }

    try {
      switch (action) {
        case 'activate':
          await Promise.all(selectedProducts.map(productId => 
            fetch(`/api/products/${productId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'active' })
            })
          ));
          setProducts(prev => prev.map(p => 
            selectedProducts.includes(p.id) ? { ...p, status: 'active' } : p
          ));
          break;

        case 'deactivate':
          await Promise.all(selectedProducts.map(productId => 
            fetch(`/api/products/${productId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'inactive' })
            })
          ));
          setProducts(prev => prev.map(p => 
            selectedProducts.includes(p.id) ? { ...p, status: 'inactive' } : p
          ));
          break;

        case 'delete':
          if (!window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
            return;
          }
          await Promise.all(selectedProducts.map(productId => 
            fetch(`/api/products/${productId}`, { method: 'DELETE' })
          ));
          setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
          break;

        case 'update-price':
          const newPrice = prompt('Enter new price for selected products:');
          if (newPrice && !isNaN(newPrice)) {
            await Promise.all(selectedProducts.map(productId => 
              fetch(`/api/products/${productId}/price`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: parseFloat(newPrice) })
              })
            ));
            setProducts(prev => prev.map(p => 
              selectedProducts.includes(p.id) 
                ? { 
                    ...p, 
                    price: parseFloat(newPrice),
                    pricing: { ...p.pricing, basePrice: parseFloat(newPrice) }
                  } 
                : p
            ));
          }
          break;

        case 'update-stock':
          const newStock = prompt('Enter new stock level for selected products:');
          if (newStock && !isNaN(newStock)) {
            await Promise.all(selectedProducts.map(productId => 
              fetch(`/api/products/${productId}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: parseInt(newStock) })
              })
            ));
            setProducts(prev => prev.map(p => 
              selectedProducts.includes(p.id) 
                ? { 
                    ...p, 
                    stock: parseInt(newStock),
                    inventory: { ...p.inventory, stock: parseInt(newStock) }
                  } 
                : p
            ));
          }
          break;

        default:
          console.log(`Unknown bulk action: ${action}`);
      }
      
      alert(`Bulk ${action} completed successfully`);
    } catch (err) {
      console.error('Bulk action error:', err);
      alert(`Error performing bulk ${action}: ${err.message}`);
    }
    
    setSelectedProducts([]);
  };

  const handleAddProduct = async (productData) => {
    try {
      console.log('Creating product with data:', productData);
      
      // Create FormData for product creation with images
      const formData = new FormData();
      
      // Add basic product fields
      formData.append('name', productData.name);
      formData.append('brand', productData.brand || '');
      formData.append('sku', productData.sku || '');
      formData.append('category', productData.category);
      formData.append('description', productData.description || '');
      formData.append('status', productData.status || 'active');
      formData.append('featured', productData.featured || false);
      
      // Add JSON fields as strings
      formData.append('specifications', JSON.stringify(productData.specifications || {}));
      formData.append('pricing', JSON.stringify(productData.pricing || {}));
      formData.append('inventory', JSON.stringify(productData.inventory || {}));
      
      // Add image files
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      }

      // Send to backend API
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const createdProduct = await response.json();
      console.log('Product created successfully:', createdProduct);

      // Add the created product to local state
      setProducts(prev => [...prev, createdProduct]);
      
      // Show success message
      alert('Product created successfully!');
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product: ' + error.message);
    }
  };

  const handleBulkUpload = async (file, validationResults) => {
    try {
      if (!file) {
        alert('Please select a file to upload');
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // For now, we'll simulate the bulk upload process
      // In a real implementation, you'd send this to a backend endpoint
      const response = await fetch('http://localhost:5000/api/products/bulk-upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Bulk upload failed');
      }

      const result = await response.json();
      
      // Refresh products list
      const productsResponse = await fetch('http://localhost:5000/api/products');
      if (productsResponse.ok) {
        const updatedProducts = await productsResponse.json();
        setProducts(Array.isArray(updatedProducts) ? updatedProducts : []);
      }

      alert(`Bulk upload completed! ${result.successCount} products added successfully.`);
    } catch (err) {
      console.error('Bulk upload error:', err);
      alert('Error during bulk upload: ' + err.message);
    }
  };

  const handleExport = () => {
    try {
      // Prepare CSV data
      const headers = ['Name', 'Brand', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Description'];
      const csvData = [
        headers,
        ...filteredProducts.map(product => [
          product.name || '',
          product.brand || '',
          product.sku || '',
          product.category || '',
          product.price || product.pricing?.basePrice || '',
          product.stock || product.inventory?.stock || '',
          product.status || '',
          product.description || ''
        ])
      ];

      // Convert to CSV string
      const csvString = csvData.map(row => 
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      // Create and download file
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `products-export-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      alert('Products exported successfully');
    } catch (err) {
      console.error('Export error:', err);
      alert('Error exporting products');
    }
  };

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
        alert('Product updated successfully!');
      } catch (err) {
        console.error('Error updating product:', err);
        alert(err.message || 'Error updating product');
      }
      setEditProductId(null);
      setEditProductData(null);
    } else {
      // Add new product with images using FormData
      try {
        console.log('Starting product upload process...');
        console.log('Product data:', productData);
        
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
          console.log(`Uploading ${productData.images.length} images...`);
          productData.images.forEach((imgObj, index) => {
            if (imgObj.file) {
              formData.append('images', imgObj.file);
              console.log(`Image ${index + 1}: ${imgObj.file.name} (${(imgObj.file.size / 1024 / 1024).toFixed(2)}MB)`);
            }
          });
        } else {
          console.log('No images to upload');
        }
        
        console.log('Sending request to /api/products...');
        const res = await fetch('/api/products', {
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to add product');
        }
        
        const newProduct = await res.json();
        console.log('Product created successfully:', newProduct);
        
        setProducts(prev => [...prev, newProduct]);
        alert('Product added successfully!');
      } catch (err) {
        console.error('Error adding product:', err);
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
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <div className="pt-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
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