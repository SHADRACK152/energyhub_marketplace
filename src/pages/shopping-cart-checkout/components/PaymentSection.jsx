import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ paymentInfo, onPaymentInfoChange, shippingInfo }) => {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      description: 'Visa, Mastercard, American Express',
  icon: 'https://img.icons8.com/?size=100&id=dCmOgAybZTzH&format=png&color=000000'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'https://img.icons8.com/?size=100&id=13611&format=png&color=000000'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      description: 'Pay with Touch ID or Face ID',
      icon: 'https://img.icons8.com/?size=100&id=77189&format=png&color=000000'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      description: 'Pay with Google Pay',
      icon: 'https://img.icons8.com/?size=100&id=p7OO5M8N611u&format=png&color=000000'
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay with M-Pesa mobile money',
  icon: 'https://img.icons8.com/?size=100&id=kUwZnzomzbTj&format=png&color=000000'
    },
    {
      id: 'airtel-money',
      name: 'Airtel Money',
      description: 'Pay with Airtel Money mobile money',
  icon: 'https://img.icons8.com/?size=100&id=H6oPm9v5Ilx6&format=png&color=000000'
    }
  ];

  const handlePaymentMethodChange = (methodId) => {
    onPaymentInfoChange({
      ...paymentInfo,
      method: methodId
    });
  };

  const handleCardDetailsChange = (field, value) => {
    onPaymentInfoChange({
      ...paymentInfo,
      cardDetails: {
        ...paymentInfo?.cardDetails,
        [field]: value
      }
    });
  };

  const handleBillingAddressChange = (field, value) => {
    onPaymentInfoChange({
      ...paymentInfo,
      billingAddress: {
        ...paymentInfo?.billingAddress,
        [field]: value
      }
    });
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];

    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }

    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Payment Information</h2>

        {/* Payment Method Selection */}
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-foreground">Payment Method</h3>
          <div className="grid gap-3">
            {paymentMethods?.map((method) => (
              <div
                key={method?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentInfo?.method === method?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handlePaymentMethodChange(method?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      paymentInfo?.method === method?.id
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {paymentInfo?.method === method?.id && (
                        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground"></div>
                        </div>
                      )}
                    </div>
                    
                    {['mpesa', 'airtel-money', 'google-pay', 'apple-pay', 'paypal', 'credit-card'].includes(method?.id) ? (
                      <img src={method.icon} alt={method.name + ' logo'} style={{ width: 40, height: 40, objectFit: 'contain', background: '#fff', borderRadius: 6 }} />
                    ) : (
                      <Icon name={method?.icon} size={20} className="text-muted-foreground" />
                    )}
                    
                    <div>
                      <p className="font-medium text-foreground">{method?.name}</p>
                      <p className="text-sm text-muted-foreground">{method?.description}</p>
                    </div>
                  </div>
                  
                  {/* Security badges for some methods */}
                  {method?.id === 'credit-card' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-xs text-success font-medium">Secure</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Card Details */}
        {paymentInfo?.method === 'credit-card' && (
          <div className="space-y-6 mb-8">
            <h3 className="font-medium text-foreground">Card Information</h3>
            
            <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Card Number"
                  value={paymentInfo?.cardDetails?.number || ''}
                  onChange={(e) => handleCardDetailsChange('number', formatCardNumber(e?.target?.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    value={paymentInfo?.cardDetails?.expiry || ''}
                    onChange={(e) => handleCardDetailsChange('expiry', formatExpiryDate(e?.target?.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                  <Input
                    label="CVV"
                    value={paymentInfo?.cardDetails?.cvv || ''}
                    onChange={(e) => handleCardDetailsChange('cvv', e?.target?.value?.replace(/[^0-9]/g, ''))}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
                
                <Input
                  label="Name on Card"
                  value={paymentInfo?.cardDetails?.name || ''}
                  onChange={(e) => handleCardDetailsChange('name', e?.target?.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Security Notice */}
              <div className="flex items-start space-x-2 mt-4 p-3 bg-success/10 border border-success/20 rounded-md">
                <Icon name="Lock" size={16} className="text-success mt-0.5" />
                <div>
                  <p className="text-sm text-success font-medium">Your payment is secure</p>
                  <p className="text-xs text-success/80">
                    We use 256-bit SSL encryption to protect your card information
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PayPal Integration */}
        {paymentInfo?.method === 'paypal' && (
          <div className="mb-8">
            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <Icon name="Wallet" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-2">Continue with PayPal</h4>
              <p className="text-sm text-muted-foreground mb-4">
                You'll be redirected to PayPal to complete your payment securely
              </p>
              <Button variant="outline" iconName="ExternalLink" iconPosition="right">
                Continue to PayPal
              </Button>
            </div>
          </div>
        )}

        {/* Digital Wallet Integration */}
        {(paymentInfo?.method === 'apple-pay' || paymentInfo?.method === 'google-pay') && (
          <div className="mb-8">
            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <Icon name="Smartphone" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-2">
                Continue with {paymentInfo?.method === 'apple-pay' ? 'Apple Pay' : 'Google Pay'}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Use your {paymentInfo?.method === 'apple-pay' ? 'Touch ID, Face ID, or passcode' : 'fingerprint or PIN'} to pay
              </p>
              <Button variant="outline" iconName="Fingerprint" iconPosition="left">
                {paymentInfo?.method === 'apple-pay' ? 'Pay with Apple Pay' : 'Pay with Google Pay'}
              </Button>
            </div>
          </div>
        )}

        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Billing Address</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={sameAsShipping}
              onCheckedChange={setSameAsShipping}
              id="same-as-shipping"
            />
            <label htmlFor="same-as-shipping" className="text-sm text-foreground cursor-pointer">
              Same as shipping address
            </label>
          </div>

          {!sameAsShipping && (
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={paymentInfo?.billingAddress?.fullName || ''}
                  onChange={(e) => handleBillingAddressChange('fullName', e?.target?.value)}
                  placeholder="Enter full name"
                  required
                />
                <Input
                  label="Phone Number"
                  value={paymentInfo?.billingAddress?.phone || ''}
                  onChange={(e) => handleBillingAddressChange('phone', e?.target?.value)}
                  placeholder="Enter phone number"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    value={paymentInfo?.billingAddress?.address || ''}
                    onChange={(e) => handleBillingAddressChange('address', e?.target?.value)}
                    placeholder="Street address"
                    required
                  />
                </div>
                <Input
                  label="City"
                  value={paymentInfo?.billingAddress?.city || ''}
                  onChange={(e) => handleBillingAddressChange('city', e?.target?.value)}
                  placeholder="Enter city"
                  required
                />
                <Input
                  label="State"
                  value={paymentInfo?.billingAddress?.state || ''}
                  onChange={(e) => handleBillingAddressChange('state', e?.target?.value)}
                  placeholder="Enter state"
                  required
                />
                <Input
                  label="ZIP Code"
                  value={paymentInfo?.billingAddress?.zipCode || ''}
                  onChange={(e) => handleBillingAddressChange('zipCode', e?.target?.value)}
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Security Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Your Payment is Protected</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Industry-standard SSL encryption</li>
                <li>• PCI DSS compliant payment processing</li>
                <li>• 24/7 fraud monitoring</li>
                <li>• Secure data storage with encryption at rest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;