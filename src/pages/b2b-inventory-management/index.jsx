import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import InventoryToolbar from './components/InventoryToolbar';
import FilterSidebar from './components/FilterSidebar';
import ProductTable from './components/ProductTable';
import ProductGrid from './components/ProductGrid';
import AddProductModal from './components/AddProductModal';
import BulkUploadModal from './components/BulkUploadModal';
import Button from '../../components/ui/Button';

const B2BInventoryManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Navigation handler
  const handleNavigation = (path) => {
    console.log('Navigation to:', path);
    navigate(path);
  };

  // State management
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    priceRange: { min: '', max: '' },
    supplier: '',
    tradeType: ''
  });
  const [products, setProducts] = useState([]);
  const [tradeOffers, setTradeOffers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize with enhanced sample products for energy marketplace
  useEffect(() => {
    // Initialize suppliers
    setSuppliers([
      { id: 1, name: 'Tesla Energy', type: 'Manufacturer', rating: 4.8, verified: true },
      { id: 2, name: 'SolarEdge Technologies', type: 'Manufacturer', rating: 4.7, verified: true },
      { id: 3, name: 'LG Energy Solution', type: 'Manufacturer', rating: 4.9, verified: true },
      { id: 4, name: 'Enphase Energy', type: 'Manufacturer', rating: 4.6, verified: true },
      { id: 5, name: 'GreenTech Distributors', type: 'Distributor', rating: 4.5, verified: true }
    ]);

    setProducts([
      {
        id: 1,
        name: 'Tesla Powerwall',
        sku: 'TSL-PW2',
        category: 'Energy Storage',
        price: 12500,
        wholesalePrice: 11000,
        bulkPrice: 10500, // Price for orders >10 units
        stock: 8,
        minStock: 5,
        supplierId: 1,
        supplier: 'Tesla Energy',
        tradeType: 'Both', // B2B, B2C, Both
        tradeType: 'Both', // B2B, B2C, Both
        status: 'active',
        image: '/api/placeholder/150/150',
        description: 'Home battery for backup protection and solar energy storage',
        specifications: {
          capacity: '13.5 kWh',
          power: '5 kW continuous',
          efficiency: '90%',
          warranty: '10 years'
        },
        certifications: ['UL 1973', 'UL 1642', 'FCC Part 15'],
        lastUpdated: new Date(),
        tradingTerms: {
          minOrderQty: 1,
          bulkOrderQty: 10,
          leadTime: '2-4 weeks',
          paymentTerms: 'Net 30'
        }
      },
      {
        id: 2,
        name: 'SolarEdge Inverter',
        sku: 'SE-7600H',
        category: 'Inverters',
        price: 1850,
        wholesalePrice: 1600,
        bulkPrice: 1500,
        stock: 15,
        minStock: 10,
        supplierId: 2,
        supplier: 'SolarEdge Technologies',
        tradeType: 'Both',
        status: 'active',
        image: '/api/placeholder/150/150',
        description: 'Single phase inverter with HD-Wave technology',
        specifications: {
          power: '7.6 kW',
          efficiency: '99.2%',
          warranty: '12 years',
          monitoring: 'Built-in'
        },
        certifications: ['UL 1741', 'IEEE 1547', 'FCC Part 15'],
        lastUpdated: new Date(),
        tradingTerms: {
          minOrderQty: 1,
          bulkOrderQty: 5,
          leadTime: '1-2 weeks',
          paymentTerms: 'Net 30'
        }
      },
      {
        id: 3,
        name: 'LG Solar Panel',
        sku: 'LG-400W',
        category: 'Solar Panels',
        price: 320,
        wholesalePrice: 280,
        bulkPrice: 250,
        stock: 25,
        minStock: 15,
        supplierId: 3,
        supplier: 'LG Energy Solution',
        tradeType: 'Both',
        status: 'active',
        image: '/api/placeholder/150/150',
        description: 'High-efficiency monocrystalline solar panel',
        specifications: {
          power: '400W',
          efficiency: '21.7%',
          warranty: '25 years',
          technology: 'Monocrystalline'
        },
        certifications: ['IEC 61215', 'IEC 61730', 'UL 1703'],
        lastUpdated: new Date(),
        tradingTerms: {
          minOrderQty: 10,
          bulkOrderQty: 50,
          leadTime: '3-5 weeks',
          paymentTerms: 'Net 45'
        }
      },
      {
        id: 4,
        name: 'Enphase IQ7+',
        sku: 'ENP-IQ7',
        category: 'Microinverters',
        price: 350,
        wholesalePrice: 310,
        bulkPrice: 290,
        stock: 45,
        minStock: 20,
        supplierId: 4,
        supplier: 'Enphase Energy',
        tradeType: 'B2B',
        status: 'active',
        image: '/api/placeholder/150/150',
        description: 'Microinverter for residential solar installations',
        specifications: {
          power: '290W',
          efficiency: '97.0%',
          warranty: '25 years',
          monitoring: 'Per-panel'
        },
        certifications: ['UL 1741', 'IEEE 1547', 'FCC Part 15'],
        lastUpdated: new Date(),
        tradingTerms: {
          minOrderQty: 20,
          bulkOrderQty: 100,
          leadTime: '2-3 weeks',
          paymentTerms: 'Net 30'
        }
      },
      {
        id: 5,
        name: 'Commercial Energy Storage System',
        sku: 'CES-500',
        category: 'Energy Storage',
        price: 75000,
        wholesalePrice: 65000,
        bulkPrice: 60000,
        stock: 3,
        minStock: 2,
        supplierId: 5,
        supplier: 'GreenTech Distributors',
        tradeType: 'B2B',
        status: 'active',
        image: '/api/placeholder/150/150',
        description: 'Large-scale commercial battery storage solution',
        specifications: {
          capacity: '500 kWh',
          power: '250 kW',
          efficiency: '95%',
          warranty: '15 years'
        },
        certifications: ['UL 9540', 'IEEE 1547', 'NFPA 855'],
        lastUpdated: new Date(),
        tradingTerms: {
          minOrderQty: 1,
          bulkOrderQty: 3,
          leadTime: '8-12 weeks',
          paymentTerms: 'Letter of Credit'
        }
      }
    ]);

    // Initialize trade offers
    setTradeOffers([
      {
        id: 1,
        productId: 1,
        buyerCompany: 'SolarMax Installers',
        quantity: 15,
        requestedPrice: 11800,
        status: 'pending',
        message: 'Bulk order for Q4 installations',
        createdAt: new Date()
      },
      {
        id: 2,
        productId: 3,
        buyerCompany: 'Green Energy Corp',
        quantity: 100,
        requestedPrice: 260,
        status: 'negotiating',
        message: 'Large commercial project - seeking best pricing',
        createdAt: new Date()
      }
    ]);
  }, []);

  // Product handlers
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      lastUpdated: new Date(),
      status: 'active'
    };
    setProducts(prev => [newProduct, ...prev]);
    setShowAddModal(false);
  };

  const handleUpdatePrice = (productId, newPrice) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, price: newPrice, lastUpdated: new Date() } : p
    ));
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: newStock, lastUpdated: new Date() } : p
    ));
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
        break;
      case 'activate':
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'active', lastUpdated: new Date() } : p
        ));
        setSelectedProducts([]);
        break;
      case 'deactivate':
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'inactive', lastUpdated: new Date() } : p
        ));
        setSelectedProducts([]);
        break;
      case 'export_b2c':
        // Export selected products to B2C marketplace
        console.log('Exporting to B2C marketplace:', selectedProducts);
        setSelectedProducts([]);
        break;
      case 'bulk_pricing':
        setShowPricingModal(true);
        break;
      default:
        break;
    }
  };

  // Enhanced marketplace functions
  const handleTradeOffer = (productId, offer) => {
    setTradeOffers(prev => [...prev, {
      id: Date.now(),
      productId,
      ...offer,
      status: 'pending',
      createdAt: new Date()
    }]);
  };

  const handleTradeResponse = (offerId, response, counterOffer = null) => {
    setTradeOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { 
            ...offer, 
            status: response,
            counterOffer,
            updatedAt: new Date() 
          }
        : offer
    ));
  };

  const handlePricingTier = (productId, pricingData) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            wholesalePrice: pricingData.wholesale,
            bulkPrice: pricingData.bulk,
            tradingTerms: { ...p.tradingTerms, ...pricingData.terms },
            lastUpdated: new Date() 
          }
        : p
    ));
  };

  const handleSupplierManagement = (supplierId, action, data = null) => {
    switch (action) {
      case 'verify':
        setSuppliers(prev => prev.map(s => 
          s.id === supplierId ? { ...s, verified: true } : s
        ));
        break;
      case 'update_rating':
        setSuppliers(prev => prev.map(s => 
          s.id === supplierId ? { ...s, rating: data.rating } : s
        ));
        break;
      case 'add_supplier':
        setSuppliers(prev => [...prev, { id: Date.now(), ...data }]);
        break;
      default:
        break;
    }
  };

  // Enhanced filter products for marketplace
  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.sku.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.supplier.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.category && product.category !== filters.category) return false;
    if (filters.status && product.status !== filters.status) return false;
    if (filters.supplier && product.supplier !== filters.supplier) return false;
    if (filters.tradeType && product.tradeType !== filters.tradeType && product.tradeType !== 'Both') return false;
    if (filters.stockLevel) {
      if (filters.stockLevel === 'low' && product.stock >= product.minStock) return false;
      if (filters.stockLevel === 'normal' && (product.stock < product.minStock || product.stock === 0)) return false;
      if (filters.stockLevel === 'out' && product.stock > 0) return false;
    }
    if (filters.priceRange.min && product.price < parseFloat(filters.priceRange.min)) return false;
    if (filters.priceRange.max && product.price > parseFloat(filters.priceRange.max)) return false;
    return true;
  });

  // Calculate marketplace metrics
  const marketplaceMetrics = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    b2bProducts: products.filter(p => p.tradeType === 'B2B' || p.tradeType === 'Both').length,
    b2cProducts: products.filter(p => p.tradeType === 'B2C' || p.tradeType === 'Both').length,
    pendingTrades: tradeOffers.filter(t => t.status === 'pending').length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStockItems: products.filter(p => p.stock <= p.minStock).length,
    verifiedSuppliers: suppliers.filter(s => s.verified).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedHeader user={user} onNavigate={handleNavigation} />
        <div className="pt-16">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={handleNavigation} />
      <div className="pt-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs onNavigate={handleNavigation} />
          
          {/* Enhanced Marketplace Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Energy Marketplace - B2B Trading</h1>
                <p className="text-muted-foreground mt-1">
                  Manage inventory, trade with suppliers, and expand to B2C retail
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTradeModal(true)}
                >
                  View Trade Offers ({marketplaceMetrics.pendingTrades})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowBulkModal(true)}
                >
                  Bulk Upload
                </Button>
                <Button
                  onClick={() => setShowAddModal(true)}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>

          {/* Marketplace Metrics Dashboard */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-primary">{marketplaceMetrics.totalProducts}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">{marketplaceMetrics.activeProducts}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">{marketplaceMetrics.b2bProducts}</div>
              <div className="text-sm text-muted-foreground">B2B Products</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">{marketplaceMetrics.b2cProducts}</div>
              <div className="text-sm text-muted-foreground">B2C Ready</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-orange-600">{marketplaceMetrics.pendingTrades}</div>
              <div className="text-sm text-muted-foreground">Pending Trades</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-emerald-600">${(marketplaceMetrics.totalValue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Inventory Value</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-red-600">{marketplaceMetrics.lowStockItems}</div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold text-indigo-600">{marketplaceMetrics.verifiedSuppliers}</div>
              <div className="text-sm text-muted-foreground">Verified Suppliers</div>
            </div>
          </div>

          {/* Toolbar */}
          <InventoryToolbar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            selectedCount={selectedProducts.length}
            onBulkAction={handleBulkAction}
          />

          {/* Content */}
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  productCount={filteredProducts.length}
                />
              </div>
            )}

            {/* Products Display */}
            <div className="flex-1 min-w-0">
              {viewMode === 'table' ? (
                <ProductTable
                  products={filteredProducts}
                  selectedProducts={selectedProducts}
                  onSelectionChange={setSelectedProducts}
                  onUpdatePrice={handleUpdatePrice}
                  onUpdateStock={handleUpdateStock}
                />
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  onUpdatePrice={handleUpdatePrice}
                  onUpdateStock={handleUpdateStock}
                />
              )}
            </div>
          </div>

          {/* Modals */}
          <AddProductModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAddProduct={handleAddProduct}
          />

          <BulkUploadModal
            isOpen={showBulkModal}
            onClose={() => setShowBulkModal(false)}
            onUpload={(products) => {
              setProducts(prev => [...products, ...prev]);
              setShowBulkModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default B2BInventoryManagement;