import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderDetailsModal = ({ isOpen, onClose, orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');
      
      const data = await response.json();
      setOrder(data);
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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusTimeline = () => {
    if (!order) return [];
    
    const timeline = [
      { status: 'Pending Review', date: order.createdAt, completed: true },
      { status: 'Confirmed', date: order.confirmedAt, completed: !!order.confirmedAt },
      { status: 'Processing', date: order.processingAt, completed: !!order.processingAt },
      { status: 'Shipped', date: order.shippedAt, completed: !!order.shippedAt },
      { status: 'Delivered', date: order.deliveredAt, completed: !!order.deliveredAt }
    ];
    
    return timeline;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Order Details</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-error" />
              <p className="text-error mb-2">Failed to load order details</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchOrderDetails} variant="outline">
                Try Again
              </Button>
            </div>
          ) : order ? (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-foreground">Order #{order.orderNumber}</h4>
                  <p className="text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-foreground mb-3">Customer Information</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {order.buyerName || 'N/A'}</p>
                    <p><strong>Email:</strong> {order.buyerEmail || 'N/A'}</p>
                    <p><strong>Phone:</strong> {order.buyerPhone || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-foreground mb-3">Shipping Address</h5>
                  <div className="text-sm text-muted-foreground">
                    {order.shippingAddress ? (
                      <div>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    ) : (
                      <p>No shipping address provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Product Details</h5>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    {order.productImage && (
                      <img 
                        src={order.productImage} 
                        alt={order.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h6 className="font-medium text-foreground">{order.productName}</h6>
                      <p className="text-sm text-muted-foreground">SKU: {order.productSku || 'N/A'}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span>Quantity: {order.quantity || 1}</span>
                        <span>Price: ${order.price?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Order Timeline</h5>
                <div className="space-y-4">
                  {getStatusTimeline().map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.completed 
                          ? 'bg-primary border-primary' 
                          : 'bg-card border-muted-foreground'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          item.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {item.status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.completed ? formatDate(item.date) : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              {(order.trackingNumber || order.carrier) && (
                <div>
                  <h5 className="font-medium text-foreground mb-3">Shipping Information</h5>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    {order.carrier && (
                      <p><strong>Carrier:</strong> {order.carrier}</p>
                    )}
                    {order.trackingNumber && (
                      <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                    )}
                    {order.estimatedDelivery && (
                      <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
                    )}
                    {order.shippingCost && (
                      <p><strong>Shipping Cost:</strong> ${order.shippingCost.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Payment Summary</h5>
                <div className="bg-muted rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(order.price * (order.quantity || 1)).toFixed(2)}</span>
                    </div>
                    {order.shippingCost && (
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${order.shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-foreground border-t border-border pt-2">
                      <span>Total:</span>
                      <span>${order.total?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Method:</span>
                      <span>{order.paymentMethod || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {order.sellerNotes && (
                <div>
                  <h5 className="font-medium text-foreground mb-3">Seller Notes</h5>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">{order.sellerNotes}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
