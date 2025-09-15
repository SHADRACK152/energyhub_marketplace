import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Image from '../components/AppImage';
import Button from '../components/ui/Button';
import { useTranslation } from '../utils/i18n.jsx';
import { useToast } from '../components/ui/Toast';

function OrdersPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // Enhanced state variables
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [view, setView] = useState('card');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  // Modal states
  const [modalOrder, setModalOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Enhanced status tracking
  const statusTabs = ['All', 'Reviewing', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const statusStyles = {
    Reviewing: 'bg-amber-100 text-amber-800 border border-amber-200',
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Processing: 'bg-blue-100 text-blue-800 border border-blue-200',
    Shipped: 'bg-purple-100 text-purple-800 border border-purple-200',
    Delivered: 'bg-green-100 text-green-800 border border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border border-red-200',
  };

  const statusIcons = {
    Reviewing: 'Eye',
    Pending: 'Clock',
    Processing: 'Package',
    Shipped: 'Truck',
    Delivered: 'CheckCircle',
    Cancelled: 'XCircle',
  };

  // Enhanced fetch orders with better error handling and loading states
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Defensive: ensure data is always an array with proper structure
        const ordersArray = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : []);
        
        // Ensure each order has required fields
        const normalizedOrders = ordersArray.map(order => ({
          id: order.id || `temp-${Date.now()}-${Math.random()}`,
          orderNumber: order.orderNumber || `ORD-${Date.now()}`,
          productName: order.productName || 'Unknown Product',
          productImage: order.productImage || '/assets/images/solar.jpg', // Use existing solar.jpg as fallback
          status: order.status || 'Pending',
          price: parseFloat(order.price) || 0,
          orderDate: order.orderDate || new Date().toISOString(),
          deliveryDate: order.deliveryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          sellerName: order.sellerName || 'Unknown Seller',
          quantity: order.quantity || 1,
          statusSteps: order.statusSteps || [
            { label: 'Order Placed', completed: true, date: order.orderDate },
            { label: 'Processing', completed: ['Processing', 'Shipped', 'Delivered'].includes(order.status), date: null },
            { label: 'Shipped', completed: ['Shipped', 'Delivered'].includes(order.status), date: null },
            { label: 'Delivered', completed: order.status === 'Delivered', date: null }
          ]
        }));
        
        setOrders(normalizedOrders);
        showToast('Orders loaded successfully', { type: 'success' });
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        showToast('Failed to load orders. Please try again.', { type: 'error' });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [location.pathname]);

  // Enhanced bulk operations
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleBulkCancel = async () => {
    if (selectedOrders.length === 0) return;
    
    try {
      const promises = selectedOrders.map(orderId => 
        fetch(`/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Cancelled' })
        })
      );
      
      await Promise.all(promises);
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          selectedOrders.includes(order.id) 
            ? { ...order, status: 'Cancelled' }
            : order
        )
      );
      
      setSelectedOrders([]);
      setShowBulkActions(false);
      showToast(`${selectedOrders.length} orders cancelled successfully`, { type: 'success' });
    } catch (error) {
      showToast('Failed to cancel orders', { type: 'error' });
    }
  };

  const handleExportOrders = () => {
    const dataToExport = filteredOrders.map(order => ({
      'Order Number': order.orderNumber,
      'Product': order.productName,
      'Status': order.status,
      'Price': `$${order.price}`,
      'Order Date': new Date(order.orderDate).toLocaleDateString(),
      'Delivery Date': new Date(order.deliveryDate).toLocaleDateString(),
      'Seller': order.sellerName
    }));

    if (exportFormat === 'csv') {
      const csv = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else {
      // PDF export would require a PDF library
      showToast('PDF export feature coming soon', { type: 'info' });
    }
  };

  // Enhanced cancel order with better UX
  const handleCancelOrder = async () => {
    if (!cancelOrder || !cancelReason.trim()) {
      showToast('Please provide a reason for cancellation', { type: 'error' });
      return;
    }

    try {
      const response = await fetch(`/api/orders/${cancelOrder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Cancelled',
          cancelReason: cancelReason.trim(),
          cancelledAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === cancelOrder.id 
              ? { ...order, status: 'Cancelled' }
              : order
          )
        );
        
        setShowCancelModal(false);
        setModalOrder(null);
        setCancelOrder(null);
        setCancelReason('');
        
        showToast('Order cancelled successfully', { type: 'success' });
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast('Failed to cancel order. Please try again.', { type: 'error' });
    }
  };

  const handleDownloadInvoice = (orderId) => {
    console.log('Downloading invoice for order:', orderId);
    showToast('Invoice download started', { type: 'info' });
    // Simulate download
    setTimeout(() => {
      showToast('Invoice downloaded successfully', { type: 'success' });
    }, 2000);
  };

  const handleReorder = async (order) => {
    try {
      // Simulate adding to cart
      showToast(`${order.productName} added to cart`, { type: 'success' });
      setTimeout(() => {
        navigate('/shopping-cart-checkout');
      }, 1000);
    } catch (error) {
      showToast('Failed to reorder item', { type: 'error' });
    }
  };

  // Enhanced filtering and sorting
  const getSortedAndFilteredOrders = () => {
    let filtered = orders.filter(order => {
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      const matchesSearch = 
        order.productName.toLowerCase().includes(search.toLowerCase()) || 
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.sellerName.toLowerCase().includes(search.toLowerCase());
      const matchesDateFrom = !dateFrom || new Date(order.orderDate) >= new Date(dateFrom);
      const matchesDateTo = !dateTo || new Date(order.orderDate) <= new Date(dateTo);
      return matchesTab && matchesSearch && matchesDateFrom && matchesDateTo;
    });

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredOrders = getSortedAndFilteredOrders();

  // Normalize modal order for proper display
  const normalizedModalOrder = modalOrder ? {
    ...modalOrder,
    statusSteps: Array.isArray(modalOrder.statusSteps) 
      ? modalOrder.statusSteps 
      : []
  } : null;

  const normalizedTrackingOrder = trackingOrder ? {
    ...trackingOrder,
    statusSteps: Array.isArray(trackingOrder.statusSteps) 
      ? trackingOrder.statusSteps 
      : []
  } : null;

  // Order statistics
  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => ['Reviewing', 'Pending', 'Processing'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    totalValue: orders.reduce((sum, o) => sum + o.price, 0)
  };

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Navigation */}
        <header className="w-full bg-white border-b border-border shadow-sm flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Icon name="Zap" className="text-primary" size={28} />
            <span className="text-2xl font-extrabold text-primary tracking-tight">EnergyHub</span>
          </div>
          <nav className="flex gap-6 items-center">
            <a href="/b2c-buyer-dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">Dashboard</a>
            <a href="/product-catalog-search" className="text-sm font-medium text-muted-foreground hover:text-primary">Browse</a>
            <a href="/orders" className="text-sm font-bold text-primary border-b-2 border-primary">Orders</a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm text-foreground">Shadrack Emadau</span>
            <Icon name="User" className="text-primary" size={24} />
            <Button variant="outline" size="sm" iconName="LogOut" iconPosition="left">{t('nav.logout')}</Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold text-foreground">{t('orders.title')}</h1>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={t('products.search')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="border border-border rounded-lg px-2 py-2 text-sm focus:outline-none"
                title="From"
              />
              <span className="text-muted-foreground text-xs">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="border border-border rounded-lg px-2 py-2 text-sm focus:outline-none"
                title="To"
              />
              <div className="flex gap-1 ml-2">
                <Button
                  variant={view === 'card' ? 'default' : 'outline'}
                  size="xs"
                  iconName="LayoutGrid"
                  iconPosition="left"
                  onClick={() => setView('card')}
                  aria-label="Card View"
                >
                  Card
                </Button>
                <Button
                  variant={view === 'table' ? 'default' : 'outline'}
                  size="xs"
                  iconName="Table"
                  iconPosition="left"
                  onClick={() => setView('table')}
                  aria-label="Table View"
                >
                  Table
                </Button>
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-4 mb-6">
            {statusTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors 
                  ${tab === activeTab ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className={view === 'card' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'hidden'}>
            {filteredOrders.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No orders found.</div>
            )}
            {filteredOrders.map((order, idx) => (
              <div key={order.id || idx} className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 hover:shadow-lg transition">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setModalOrder(order)}>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      src={order.productImage} 
                      alt={order.productName} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to solar.jpg if the original image fails
                        if (e.target.src !== '/assets/images/solar.jpg') {
                          e.target.src = '/assets/images/solar.jpg';
                        } else {
                          // If solar.jpg also fails, show a placeholder
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-lg">
                              <svg class="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">{order.productName}</div>
                    <div className="text-xs text-muted-foreground">Order #{order.orderNumber}</div>
                    <div className="text-xs text-muted-foreground mt-1">Seller: {order.sellerName}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || 'bg-muted text-muted-foreground'}`}>
                      <Icon name={statusIcons[order.status]} size={12} className="inline mr-1" />
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
                  <div>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary text-lg">KSh {order.price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Qty: {order.quantity}</div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Truck" 
                    iconPosition="left"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order-tracking/${order.id}`);
                    }}
                  >
                    Track
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Repeat" 
                    iconPosition="left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(order);
                    }}
                  >
                    Reorder
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="MessageCircle" 
                    iconPosition="left"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/contact-seller/${order.sellerId || 'unknown'}`);
                    }}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Table view (optional, not implemented here) */}
        </main>
      </div>
      {/* Order Details Modal */}
      {normalizedModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button className="absolute top-3 right-3 text-muted-foreground hover:text-primary" onClick={() => setModalOrder(null)}>
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image 
                  src={normalizedModalOrder.productImage} 
                  alt={normalizedModalOrder.productName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (e.target.src !== '/assets/images/solar.jpg') {
                      e.target.src = '/assets/images/solar.jpg';
                    } else {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-lg">
                          <svg class="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">{normalizedModalOrder.productName}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[normalizedModalOrder.status] || 'bg-muted text-muted-foreground'}`}>
                  <Icon name={statusIcons[normalizedModalOrder.status]} size={12} className="inline mr-1" />
                  {normalizedModalOrder.status}
                </span>
              </div>
            </div>
            <div className="mb-2 text-sm text-muted-foreground">
              <div>Order Number: <span className="font-semibold text-foreground">{normalizedModalOrder.orderNumber}</span></div>
              <div>Ordered: {new Date(normalizedModalOrder.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div>Expected Delivery: {new Date(normalizedModalOrder.deliveryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div>Price: <span className="font-bold text-primary">KSh {normalizedModalOrder.price.toLocaleString()}</span></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left" onClick={() => handleDownloadInvoice(normalizedModalOrder.id)}>Download Invoice</Button>
              {normalizedModalOrder.status !== 'Delivered' && normalizedModalOrder.status !== 'Cancelled' && (
                <Button variant="outline" size="sm" iconName="Truck" iconPosition="left" onClick={() => setTrackingOrder(normalizedModalOrder)}>Track</Button>
              )}
              {normalizedModalOrder.status === 'Delivered' && (
                <Button variant="outline" size="sm" iconName="Repeat" iconPosition="left">Buy Again</Button>
              )}
              {(normalizedModalOrder.status === 'Reviewing' || normalizedModalOrder.status === 'Pending' || normalizedModalOrder.status === 'Processing') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="X" 
                  iconPosition="left"
                  onClick={() => {
                    setCancelOrder(normalizedModalOrder);
                    setShowCancelModal(true);
                  }}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Cancel Order
                </Button>
              )}
              <Button variant="outline" size="sm" iconName="HelpCircle" iconPosition="left">Get Support</Button>
            </div>
          </div>
        </div>
      )}
      {/* Order Tracking Modal */}
      {normalizedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button className="absolute top-3 right-3 text-muted-foreground hover:text-primary" onClick={() => setTrackingOrder(null)}>
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <Image src={normalizedTrackingOrder.productImage} alt={normalizedTrackingOrder.productName} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h2 className="font-bold text-lg text-foreground">Tracking Order</h2>
                <span className="font-semibold text-primary">{normalizedTrackingOrder.productName}</span>
              </div>
            </div>
            <div className="mb-2 text-sm text-muted-foreground">
              <div>Order Number: <span className="font-semibold text-foreground">{normalizedTrackingOrder.orderNumber}</span></div>
              <div>Ordered: {new Date(normalizedTrackingOrder.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div>Expected Delivery: {new Date(normalizedTrackingOrder.deliveryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div>Status: <span className="font-bold text-primary">{normalizedTrackingOrder.status}</span></div>
            </div>
            <div className="mt-4">
              <div className="mb-2 font-semibold text-foreground">Order Progress</div>
              <div className="flex items-center gap-2 mb-2">
                {normalizedTrackingOrder.statusSteps?.map((step, idx) => (
                  <React.Fragment key={step.label}>
                    <div className={`flex items-center gap-1 ${step.completed ? 'text-primary' : 'text-muted-foreground'}`}> 
                      <span className={`w-2 h-2 rounded-full ${step.completed ? 'bg-primary' : 'bg-muted-foreground'}`}></span>
                      <span className="text-xs font-medium">{step.label}</span>
                    </div>
                    {idx < normalizedTrackingOrder.statusSteps.length - 1 && (
                      <span className={`flex-1 h-0.5 ${normalizedTrackingOrder.statusSteps[idx+1].completed ? 'bg-primary' : 'bg-muted-foreground'}`}></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && cancelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Cancel Order</h3>
              <button 
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelOrder(null);
                  setCancelReason('');
                }}
                className="text-muted-foreground hover:text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Image 
                  src={cancelOrder.productImage} 
                  alt={cancelOrder.productName} 
                  className="w-12 h-12 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{cancelOrder.productName}</p>
                  <p className="text-sm text-muted-foreground">Order #{cancelOrder.orderNumber}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Reason for cancellation <span className="text-red-500">*</span>
              </label>
              <select 
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select a reason...</option>
                <option value="Changed my mind">Changed my mind</option>
                <option value="Found a better price">Found a better price</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Delivery too slow">Delivery too slow</option>
                <option value="Product no longer needed">Product no longer needed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Cancellation Policy</p>
                  <p className="text-yellow-700 mt-1">
                    Orders can be cancelled free of charge before shipping. Once shipped, 
                    you may need to return the item according to our return policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelOrder(null);
                  setCancelReason('');
                }}
                className="flex-1"
              >
                Keep Order
              </Button>
              <Button 
                variant="default"
                onClick={handleCancelOrder}
                disabled={!cancelReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersPage;

