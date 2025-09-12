import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Image from '../components/AppImage';
import Button from '../components/ui/Button';
import { useTranslation } from '../utils/i18n.jsx';


function OrdersPage() {
  const { t } = useTranslation();
  const location = useLocation();
  // State variables
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [view, setView] = useState('card');
  const [modalOrder, setModalOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const statusTabs = ['All', 'Reviewing', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const statusStyles = {
    Reviewing: 'bg-gray-100 text-gray-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  // Fetch orders from backend API
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        // Defensive: ensure data is always an array
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && typeof data === 'object') {
          setOrders([data]);
        } else {
          setOrders([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setOrders([]);
      });
  }, [location.pathname]);

  // Cancel order handler
  const handleCancelOrder = async () => {
    if (!cancelOrder || !cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${cancelOrder.id}`, {
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
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === cancelOrder.id 
              ? { ...order, status: 'Cancelled' }
              : order
          )
        );
        
        // Close modals
        setShowCancelModal(false);
        setModalOrder(null);
        setCancelOrder(null);
        setCancelReason('');
        
        alert('Order cancelled successfully');
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const handleDownloadInvoice = (orderId) => {
    console.log('Downloading invoice for order:', orderId);
    // Implement download logic here
    alert('Invoice download started');
  };

  // Ensure statusSteps is always an array
  const normalizeOrder = (order) => ({
    ...order,
    statusSteps: Array.isArray(order.statusSteps)
      ? order.statusSteps
      : (typeof order.statusSteps === 'string' ? JSON.parse(order.statusSteps || '[]') : []),
  });

  const filteredOrders = orders
    .map(normalizeOrder)
    .filter(order => {
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      const matchesSearch = (order.productName?.toLowerCase() || '').includes(search.toLowerCase()) || (order.orderNumber?.toLowerCase() || '').includes(search.toLowerCase());
      const matchesDateFrom = !dateFrom || new Date(order.orderDate) >= new Date(dateFrom);
      const matchesDateTo = !dateTo || new Date(order.orderDate) <= new Date(dateTo);
      return matchesTab && matchesSearch && matchesDateFrom && matchesDateTo;
    });

  // Also normalize modalOrder and trackingOrder
  const normalizedModalOrder = modalOrder ? normalizeOrder(modalOrder) : null;
  const normalizedTrackingOrder = trackingOrder ? normalizeOrder(trackingOrder) : null;

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
                  <Image src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">{order.productName}</div>
                    <div className="text-xs text-muted-foreground">Order #{order.orderNumber}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || 'bg-muted text-muted-foreground'}`}>{order.status}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
                  <div>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</div>
                </div>
                <div className="font-bold text-primary text-lg">${order.price}</div>
                <div className="flex justify-end">
                  <a href={`/order-tracking/${order.id}`} className="inline-block">
                    <Button variant="outline" size="sm" iconName="Truck" iconPosition="left">
                      Track
                    </Button>
                  </a>
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
              <Image src={normalizedModalOrder.productImage} alt={normalizedModalOrder.productName} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h2 className="font-bold text-lg text-foreground">{normalizedModalOrder.productName}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[normalizedModalOrder.status] || 'bg-muted text-muted-foreground'}`}>{normalizedModalOrder.status}</span>
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

