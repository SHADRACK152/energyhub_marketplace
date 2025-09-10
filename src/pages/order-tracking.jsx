import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import Image from '../components/AppImage';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');
  const [cancelLoading, setCancelLoading] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  // Handle cancel order request
  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    setCancelLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/cancel-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          reason: cancelReason.trim(),
          requestedAt: new Date().toISOString(),
          requestedBy: 'buyer' // In real app, get from user context
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOrder(prevOrder => ({
          ...prevOrder,
          status: 'Cancel Requested',
          cancelRequest: {
            reason: cancelReason.trim(),
            requestedAt: new Date().toISOString(),
            status: 'pending'
          }
        }));
        
        setShowCancelModal(false);
        setCancelReason('');
        alert('Cancellation request submitted successfully. The seller will review your request.');
      } else {
        throw new Error('Failed to submit cancellation request');
      }
    } catch (error) {
      console.error('Error submitting cancellation request:', error);
      alert('Failed to submit cancellation request. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!order) return <div className="flex justify-center items-center min-h-screen text-red-500">Order not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
            <p className="text-blue-100">Track your order in real-time</p>
          </div>
          
          {/* Order Information */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <Image 
                src={order.productImage} 
                alt={order.productName} 
                className="w-20 h-20 rounded-lg object-cover shadow-md" 
              />
              <div className="flex-1">
                <h2 className="font-bold text-xl text-foreground mb-1">{order.productName}</h2>
                <p className="text-sm text-muted-foreground mb-2">Order #{order.orderNumber}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    Ordered: {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Truck" size={14} />
                    Expected: {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* Real-time Progress Tracking */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Live Tracking Updates</h3>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                {[
                  { 
                    status: 'Order Confirmed', 
                    completed: true, 
                    time: '2025-09-08 10:30 AM',
                    location: 'EnergyHub Marketplace',
                    description: 'Your order has been confirmed and is being prepared for shipment.'
                  },
                  { 
                    status: 'Processing', 
                    completed: true, 
                    time: '2025-09-08 2:15 PM',
                    location: 'Fulfillment Center - NY',
                    description: 'Order is being picked and packed at our warehouse facility.'
                  },
                  { 
                    status: 'Shipped', 
                    completed: true, 
                    time: '2025-09-09 8:45 AM',
                    location: 'FedEx Facility - Newark, NJ',
                    description: 'Package has been shipped and is in transit to your address.'
                  },
                  { 
                    status: 'In Transit', 
                    completed: true, 
                    time: '2025-09-10 6:20 AM',
                    location: 'FedEx Facility - Queens, NY',
                    description: 'Your package is on the way to the final delivery facility.'
                  },
                  { 
                    status: 'Out for Delivery', 
                    completed: false, 
                    time: 'Expected: Today 11:00 AM',
                    location: 'Local Delivery Truck',
                    description: 'Package is loaded on delivery truck and will arrive today.'
                  },
                  { 
                    status: 'Delivered', 
                    completed: false, 
                    time: 'Expected: Today by 5:00 PM',
                    location: '123 Main Street, Apt 4B',
                    description: 'Package will be delivered to your specified address.'
                  }
                ].map((step, idx) => (
                  <div key={step.status} className="relative flex items-start">
                    <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step.completed 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : idx === 4 ? 'bg-yellow-100 border-yellow-400 text-yellow-600 animate-pulse'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <Icon name="Check" size={16} />
                      ) : idx === 4 ? (
                        <Icon name="Truck" size={16} />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-medium ${
                          step.completed ? 'text-primary' : 
                          idx === 4 ? 'text-yellow-600' : 'text-gray-400'
                        }`}>
                          {step.status}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          step.completed ? 'bg-green-100 text-green-700' :
                          idx === 4 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {step.time}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Icon name="MapPin" size={12} />
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carrier Information */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Package" size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-800">Carrier Information</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Carrier: <span className="font-medium">FedEx Express</span></p>
                <p className="text-sm text-gray-600 mb-1">
                  Tracking Number: 
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('1Z999AA1234567890');
                      alert('Tracking number copied to clipboard!');
                    }}
                    className="font-mono font-medium ml-1 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    1Z999AA1234567890
                  </button>
                </p>
                <p className="text-sm text-gray-600">Service: <span className="font-medium">Standard Delivery</span></p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={16} className="text-green-600" />
                  <span className="font-medium text-green-800">Delivery Estimate</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery: <span className="font-medium">{new Date(order.deliveryDate).toLocaleDateString()}</span></p>
                <p className="text-sm text-gray-600 mb-1">Time Window: <span className="font-medium">9:00 AM - 5:00 PM</span></p>
                <p className="text-sm text-green-600 font-medium">⏱️ 2 days remaining</p>
              </div>
            </div>
          </div>

          {/* Shipping Address & Delivery Instructions */}
          <div className="p-6 border-t border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  Shipping Address
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-foreground">John Doe</p>
                  <p className="text-sm text-gray-600">123 Main Street, Apt 4B</p>
                  <p className="text-sm text-gray-600">New York, NY 10001</p>
                  <p className="text-sm text-gray-600">United States</p>
                  <p className="text-sm text-gray-600 mt-2">📞 +1 (555) 123-4567</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  Delivery Instructions
                </h4>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">📦 Leave at front door if no answer</p>
                  <p className="text-sm text-gray-700">🔔 Ring doorbell upon delivery</p>
                  <p className="text-sm text-gray-700">⚠️ Signature required for this package</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support & Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <h4 className="font-semibold text-foreground mb-4">Need Help?</h4>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Phone" size={16} className="text-blue-600" />
                  <span className="font-medium">Call Support</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Speak with our customer service team</p>
                <a 
                  href="tel:1-800-ENERGY-HUB" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  1-800-ENERGY-HUB
                </a>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MessageCircle" size={16} className="text-green-600" />
                  <span className="font-medium">Live Chat</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Get instant help via chat</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    // Simulate opening live chat
                    alert('Live chat feature coming soon! For immediate assistance, please call 1-800-ENERGY-HUB or email support@energyhub.com');
                  }}
                >
                  Start Chat
                </Button>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Mail" size={16} className="text-purple-600" />
                  <span className="font-medium">Email Support</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Send us your questions</p>
                <a 
                  href={`mailto:support@energyhub.com?subject=Order Support - ${order.orderNumber}&body=Hi EnergyHub Support Team,%0A%0AI need assistance with my order:%0A%0AOrder Number: ${order.orderNumber}%0AProduct: ${order.productName}%0AStatus: ${order.status}%0A%0APlease describe your issue:%0A`}
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"
                >
                  support@energyhub.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" iconName="ArrowLeft" iconPosition="left" onClick={() => navigate('/orders')}>
                Back to Orders
              </Button>
              {(order.status === 'Processing' || order.status === 'Reviewing' || order.status === 'Pending') && (
                <Button 
                  variant="outline" 
                  iconName="X" 
                  iconPosition="left"
                  onClick={() => setShowCancelModal(true)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Request Cancellation
                </Button>
              )}
              {order.status === 'Cancel Requested' && (
                <Button 
                  variant="outline" 
                  iconName="Clock" 
                  iconPosition="left"
                  disabled
                  className="text-yellow-600 border-yellow-300"
                >
                  Cancellation Pending
                </Button>
              )}
              <Button 
                variant="outline" 
                iconName="Share" 
                iconPosition="left"
                onClick={() => {
                  const trackingUrl = window.location.href;
                  if (navigator.share) {
                    navigator.share({
                      title: `Order Tracking - ${order.orderNumber}`,
                      text: `Track my order: ${order.productName}`,
                      url: trackingUrl
                    });
                  } else {
                    navigator.clipboard.writeText(trackingUrl);
                    alert('Tracking link copied to clipboard!');
                  }
                }}
              >
                Share Tracking
              </Button>
              <Button 
                variant="outline" 
                iconName="Download" 
                iconPosition="left"
                onClick={() => {
                  // Create a simple receipt content
                  const receiptContent = `
EnergyHub Marketplace - Order Receipt
=====================================

Order Number: ${order.orderNumber}
Product: ${order.productName}
Order Date: ${new Date(order.orderDate).toLocaleDateString()}
Expected Delivery: ${new Date(order.deliveryDate).toLocaleDateString()}
Status: ${order.status}

Thank you for your purchase!
Support: support@energyhub.com
Phone: 1-800-ENERGY-HUB
                  `;
                  
                  const blob = new Blob([receiptContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `receipt-${order.orderNumber}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                Download Receipt
              </Button>
              <Button 
                variant="outline" 
                iconName="Bell" 
                iconPosition="left"
                onClick={() => {
                  const phoneNumber = prompt('Enter your phone number to receive SMS updates:');
                  if (phoneNumber) {
                    // Simulate SMS subscription
                    alert(`SMS updates activated for ${phoneNumber}. You'll receive notifications about your order ${order.orderNumber}.`);
                  }
                }}
              >
                Get SMS Updates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Request Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Request Order Cancellation</h3>
              <button 
                onClick={() => {
                  setShowCancelModal(false);
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
                  src={order.productImage} 
                  alt={order.productName} 
                  className="w-12 h-12 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{order.productName}</p>
                  <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Reason for cancellation request <span className="text-red-500">*</span>
              </label>
              <select 
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select a reason...</option>
                <option value="Changed my mind">Changed my mind</option>
                <option value="Found a better price elsewhere">Found a better price elsewhere</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Delivery taking too long">Delivery taking too long</option>
                <option value="Product no longer needed">Product no longer needed</option>
                <option value="Financial reasons">Financial reasons</option>
                <option value="Quality concerns">Quality concerns</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Cancellation Request Process</p>
                  <p className="text-blue-700 mt-1">
                    Your cancellation request will be sent to the seller for review. 
                    They will respond within 24 hours. If approved, any payments will be refunded within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className="flex-1"
                disabled={cancelLoading}
              >
                Keep Order
              </Button>
              <Button 
                variant="default"
                onClick={handleCancelOrder}
                disabled={!cancelReason.trim() || cancelLoading}
                loading={cancelLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {cancelLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
