import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShippingSection = ({ shippingInfo, onShippingInfoChange }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  // Mock saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      fullName: 'John Doe',
      address: '456 Oak Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  // Geolocation and address suggestion
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [nearbyAddresses, setNearbyAddresses] = useState([]);

  const handleFindLocation = () => {
    setGeoLoading(true);
    setGeoError('');
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        // Use Nominatim's search API to get up to 5 nearby addresses
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&extratags=1&namedetails=1&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        let suggested = [];
        if (Array.isArray(data) && data.length > 0) {
          suggested = data.map((item, idx) => {
            const addr = item.address || {};
            return {
              id: `geo-${idx+1}`,
              fullName: '',
              address: item.display_name,
              city: addr.city || addr.town || addr.village || addr.hamlet || '',
              state: addr.state || '',
              zipCode: addr.postcode || '',
              phone: '',
              isDefault: false
            };
          });
        } else {
          // Fallback: use reverse geocoding to get at least one address
          const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const revData = await revRes.json();
          const addr = revData.address || {};
          suggested = [
            {
              id: 'geo-1',
              fullName: '',
              address: revData.display_name,
              city: addr.city || addr.town || addr.village || addr.hamlet || '',
              state: addr.state || '',
              zipCode: addr.postcode || '',
              phone: '',
              isDefault: false
            }
          ];
        }
        setNearbyAddresses(suggested);
        setGeoLoading(false);
      } catch (err) {
        setGeoError('Could not fetch address from location.');
        setGeoLoading(false);
      }
    }, (err) => {
      setGeoError('Location permission denied or unavailable.');
      setGeoLoading(false);
    });
  };

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 0,
      icon: 'Truck'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 business days',
      price: 15,
      icon: 'Zap'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'Next business day',
      price: 35,
      icon: 'Clock'
    }
  ];

  const handleAddressSelect = (address) => {
    onShippingInfoChange({
      ...shippingInfo,
      selectedAddress: address
    });
  };

  const handleDeliveryOptionSelect = (optionId) => {
    onShippingInfoChange({
      ...shippingInfo,
      deliveryOption: optionId
    });
  };

  const handleAddNewAddress = () => {
    // Validate and add new address
    if (newAddress?.fullName && newAddress?.address && newAddress?.city && newAddress?.state && newAddress?.zipCode) {
      const address = {
        id: Date.now(),
        ...newAddress,
        isDefault: false
      };
      setSavedAddresses([...savedAddresses, address]);
      handleAddressSelect(address);
      setShowAddAddress(false);
      setNewAddress({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Shipping Information</h2>

        {/* Saved Addresses */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Delivery Address</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddAddress(!showAddAddress)}
              iconName="Plus"
              iconPosition="left"
            >
              Add New Address
            </Button>
          </div>

          {/* Address Cards */}
          <div className="grid gap-4">
            {savedAddresses?.map((address) => (
              <div
                key={address?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  shippingInfo?.selectedAddress?.id === address?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-foreground">{address?.fullName}</span>
                      {address?.isDefault && (
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{address?.address}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {address?.city}, {address?.state} {address?.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{address?.phone}</p>
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    shippingInfo?.selectedAddress?.id === address?.id
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {shippingInfo?.selectedAddress?.id === address?.id && (
                      <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Address Form */}
        {showAddAddress && (
          <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
            <h4 className="font-medium text-foreground mb-4">Add New Address</h4>
            <div className="mb-4">
              <Button variant="secondary" onClick={handleFindLocation} disabled={geoLoading}>
                {geoLoading ? 'Locating...' : 'Use My Current Location'}
              </Button>
              {geoError && (
                <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>{geoError === 'Could not fetch address from location.'
                    ? 'Could not fetch address from location. Please check your internet connection or try again later.'
                    : geoError}
                  </span>
                  <Button variant="outline" size="xs" onClick={handleFindLocation}>
                    Retry
                  </Button>
                </div>
              )}
              {nearbyAddresses.length > 0 && (
                <div className="mt-4">
                  <div className="font-medium mb-2">Suggested Address:</div>
                  {nearbyAddresses.map((addr) => (
                    <div key={addr.id} className="border rounded p-3 mb-2 bg-white cursor-pointer hover:border-primary" onClick={() => setNewAddress(addr)}>
                      <div className="font-semibold">{addr.address}</div>
                      <div className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zipCode}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={newAddress?.fullName}
                onChange={(e) => setNewAddress({...newAddress, fullName: e?.target?.value})}
                placeholder="Enter full name"
                required
              />
              <Input
                label="Phone Number"
                value={newAddress?.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e?.target?.value})}
                placeholder="Enter phone number"
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  value={newAddress?.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e?.target?.value})}
                  placeholder="Street address, P.O. box, company name, c/o"
                  required
                />
              </div>
              <Input
                label="City"
                value={newAddress?.city}
                onChange={(e) => setNewAddress({...newAddress, city: e?.target?.value})}
                placeholder="Enter city"
                required
              />
              <Input
                label="State"
                value={newAddress?.state}
                onChange={(e) => setNewAddress({...newAddress, state: e?.target?.value})}
                placeholder="Enter state"
                required
              />
              <Input
                label="ZIP Code"
                value={newAddress?.zipCode}
                onChange={(e) => setNewAddress({...newAddress, zipCode: e?.target?.value})}
                placeholder="Enter ZIP code"
                required
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="default" onClick={handleAddNewAddress}>
                Save Address
              </Button>
              <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Delivery Options */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Delivery Options</h3>
          <div className="space-y-3">
            {deliveryOptions?.map((option) => (
              <div
                key={option?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  shippingInfo?.deliveryOption === option?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleDeliveryOptionSelect(option?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      shippingInfo?.deliveryOption === option?.id
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {shippingInfo?.deliveryOption === option?.id && (
                        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground"></div>
                        </div>
                      )}
                    </div>
                    
                    <Icon name={option?.icon} size={20} className="text-muted-foreground" />
                    
                    <div>
                      <p className="font-medium text-foreground">{option?.name}</p>
                      <p className="text-sm text-muted-foreground">{option?.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-medium text-foreground">
                      {option?.price === 0 ? 'Free' : `$${option?.price}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Estimate */}
        {shippingInfo?.selectedAddress && shippingInfo?.deliveryOption && (
          <div className="mt-6 bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-success mb-1">Delivery Estimate</h4>
                <p className="text-sm text-success/80">
                  Your order will be delivered to {shippingInfo?.selectedAddress?.city}, {shippingInfo?.selectedAddress?.state} in{' '}
                  {deliveryOptions?.find(o => o?.id === shippingInfo?.deliveryOption)?.description?.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingSection;