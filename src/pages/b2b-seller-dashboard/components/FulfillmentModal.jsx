import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FulfillmentModal = ({ isOpen, onClose, order, onFulfill }) => {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    carrier: '',
    estimatedDelivery: '',
    sellerNotes: '',
    shippingCost: ''
  });
  const [loading, setLoading] = useState(false);

  const carriers = [
    { value: 'DHL', label: 'DHL Express' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'UPS', label: 'UPS' },
    { value: 'USPS', label: 'USPS' },
    { value: 'Local', label: 'Local Delivery' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.trackingNumber || !formData.carrier) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await onFulfill(order.id, {
        ...formData,
        shippingCost: formData.shippingCost ? parseFloat(formData.shippingCost) : 0,
        shippedAt: new Date().toISOString()
      });
      
      if (result) {
        setFormData({
          trackingNumber: '',
          carrier: '',
          estimatedDelivery: '',
          sellerNotes: '',
          shippingCost: ''
        });
        onClose();
      }
    } catch (error) {
      console.error('Error fulfilling order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Ship Order</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Order #{order?.orderNumber} • {order?.productName}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tracking Number */}
          <div>
            <label htmlFor="trackingNumber" className="block text-sm font-medium text-foreground mb-1">
              Tracking Number *
            </label>
            <Input
              id="trackingNumber"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              placeholder="Enter tracking number"
              required
            />
          </div>

          {/* Carrier */}
          <div>
            <label htmlFor="carrier" className="block text-sm font-medium text-foreground mb-1">
              Shipping Carrier *
            </label>
            <Select
              name="carrier"
              value={formData.carrier}
              onChange={handleInputChange}
              options={carriers}
              placeholder="Select carrier"
              required
            />
          </div>

          {/* Estimated Delivery */}
          <div>
            <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-foreground mb-1">
              Estimated Delivery Date
            </label>
            <Input
              id="estimatedDelivery"
              name="estimatedDelivery"
              type="date"
              value={formData.estimatedDelivery}
              onChange={handleInputChange}
              min={today}
              max={maxDateStr}
            />
          </div>

          {/* Shipping Cost */}
          <div>
            <label htmlFor="shippingCost" className="block text-sm font-medium text-foreground mb-1">
              Shipping Cost (Optional)
            </label>
            <Input
              id="shippingCost"
              name="shippingCost"
              type="number"
              step="0.01"
              min="0"
              value={formData.shippingCost}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="sellerNotes" className="block text-sm font-medium text-foreground mb-1">
              Notes to Customer (Optional)
            </label>
            <textarea
              id="sellerNotes"
              name="sellerNotes"
              value={formData.sellerNotes}
              onChange={handleInputChange}
              placeholder="Add any special instructions or notes..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-foreground">Order Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{order?.buyerName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Product:</span>
                <span>{order?.productName}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{order?.quantity || 1}</span>
              </div>
              <div className="flex justify-between font-medium text-foreground">
                <span>Total:</span>
                <span>${order?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              loading={loading}
              iconName="Truck"
            >
              {loading ? 'Shipping...' : 'Ship Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FulfillmentModal;
