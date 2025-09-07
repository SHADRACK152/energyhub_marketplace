import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderManagementPanel = ({ onViewOrder, onConfirmOrder, onFulfillOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, shipped
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/orders';
      if (filter === 'pending') {
        url += '?needsAction=true';
      } else if (filter !== 'all') {
        url += `?status=${filter}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Shipped': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async (orderId, newStatus, additionalData = {}) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          ...additionalData
        })
      });
      
      if (response.ok) {
        fetchOrders(); // Refresh orders
        return true;
      }
      throw new Error('Failed to update order status');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
      return false;
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="text-error mb-4">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-2" />
          <p>Failed to load orders</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button onClick={fetchOrders} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Order Management</h3>
          <Button onClick={fetchOrders} variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 mt-4 bg-muted rounded-lg p-1">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: 'Pending Review' },
            { key: 'Confirmed', label: 'Confirmed' },
            { key: 'Shipped', label: 'Shipped' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                filter === tab.key 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No orders found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {filter === 'pending' ? 'All orders have been reviewed' : 'Orders will appear here when customers place them'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-foreground">Order #{order.orderNumber}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.needsSellerAction && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
                          Action Required
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Customer:</strong> {order.buyerName || 'N/A'}</p>
                      <p><strong>Products:</strong> {order.productName}</p>
                      <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
                      <p><strong>Ordered:</strong> {formatDate(order.createdAt)}</p>
                      {order.estimatedDelivery && (
                        <p><strong>Est. Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
                      )}
                      {order.trackingNumber && (
                        <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {order.status === 'Pending Review' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => onConfirmOrder(order.id)}
                        >
                          Confirm Order
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusUpdate(order.id, 'Rejected', {
                            sellerNotes: 'Order rejected - out of stock or unable to fulfill'
                          })}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'Confirmed' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleStatusUpdate(order.id, 'Processing', {
                          sellerNotes: 'Order is being processed'
                        })}
                      >
                        Start Processing
                      </Button>
                    )}
                    
                    {order.status === 'Processing' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => onFulfillOrder(order.id)}
                      >
                        Mark as Shipped
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onViewOrder(order.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPanel;
