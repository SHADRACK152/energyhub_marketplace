import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../../utils/i18n.jsx';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { cn } from '../../../utils/cn';
import { API_BASE_URL } from '../../../config/api';

const PaymentSection = ({ paymentInfo, onPaymentInfoChange, shippingInfo, subtotal, shipping, tax, total, onPaymentSuccess }) => {
  const { t } = useTranslation();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  
  // Mobile money states
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);

  // Order creation function
  const createOrder = async (paymentMethod) => {
    try {
      const orderPayload = {
        productName: 'Solar Panel System', // You can make this dynamic
        productImage: '/uploads/solar.jpg',
        price: total,
        paymentMethod,
        userId: 'demo-user',
        quantity: 1,
      };

      console.log('Creating order with payload:', orderPayload);

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created successfully:', result);
        return result.order;
      } else {
        console.error('Failed to create order:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  // Card payment states
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // PayPal states
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');

  // Apple Pay states
  const [showApplePayModal, setShowApplePayModal] = useState(false);

  // Google Pay states
  const [showGooglePayModal, setShowGooglePayModal] = useState(false);

  const handleConfirmPin = async () => {
    setPaymentProcessing(true);
    setShowPinModal(false);
    setPaymentStatus({ type: 'pending', message: 'Processing payment...' });
    
    setTimeout(async () => {
      if (pin && pin.length >= 4) {
        setPaymentStatus({ type: 'success', message: 'Payment successful!' });
        
        // Create order
        const order = await createOrder(selectedPayment === 'mpesa' ? 'M-Pesa' : 'Airtel Money');
        
        // Show success state for 2 seconds, then proceed
        setTimeout(() => {
          if (onPaymentSuccess) {
            onPaymentSuccess(order);
          }
        }, 2000);
      } else {
        setPaymentStatus({ type: 'error', message: 'Payment failed. Please try again.' });
      }
      setPaymentProcessing(false);
      setPin('');
    }, 1500);
  };

  const handlePayPalLogin = async () => {
    setPaymentProcessing(true);
    setShowPayPalModal(false);
    setPaymentStatus({ type: 'pending', message: 'Processing PayPal payment...' });
    
    setTimeout(async () => {
      if (paypalEmail && paypalPassword) {
        setPaymentStatus({ type: 'success', message: 'PayPal payment successful!' });
        
        // Create order
        const order = await createOrder('PayPal');
        
        // Show success state for 2 seconds, then proceed
        setTimeout(() => {
          if (onPaymentSuccess) {
            onPaymentSuccess(order);
          }
        }, 2000);
      } else {
        setPaymentStatus({ type: 'error', message: 'PayPal login failed. Please try again.' });
      }
      setPaymentProcessing(false);
      setPaypalEmail('');
      setPaypalPassword('');
    }, 2000);
  };

  const handleApplePayConfirm = async () => {
    setPaymentProcessing(true);
    setShowApplePayModal(false);
    setPaymentStatus({ type: 'pending', message: 'Processing Apple Pay payment...' });
    
    setTimeout(async () => {
      setPaymentStatus({ type: 'success', message: 'Apple Pay payment successful!' });
      
      // Create order
      const order = await createOrder('Apple Pay');
      
      // Show success state for 2 seconds, then proceed
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess(order);
        }
      }, 2000);
      setPaymentProcessing(false);
    }, 1500);
  };

  const handleGooglePayConfirm = async () => {
    setPaymentProcessing(true);
    setShowGooglePayModal(false);
    setPaymentStatus({ type: 'pending', message: 'Processing Google Pay payment...' });
    
    setTimeout(async () => {
      setPaymentStatus({ type: 'success', message: 'Google Pay payment successful!' });
      
      // Create order
      const order = await createOrder('Google Pay');
      
      // Show success state for 2 seconds, then proceed
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess(order);
        }
      }, 2000);
      setPaymentProcessing(false);
    }, 1500);
  };

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

  // Card input handlers
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

  const handleCardNumberChange = (value) => {
    const formatted = formatCardNumber(value);
    setCardDetails({...cardDetails, number: formatted});
  };

  const handleCardExpiryChange = (value) => {
    const formatted = formatExpiryDate(value);
    setCardDetails({...cardDetails, expiry: formatted});
  };

  // Main payment handler
  const handlePayment = () => {
    if (!selectedPayment) return;
    
    setPaymentProcessing(true);
    setPaymentStatus({ type: 'pending', message: 'Processing payment...' });

    // Handle different payment methods
    switch (selectedPayment) {
      case 'credit-card':
        handleCreditCardPayment();
        break;
      case 'paypal':
        setShowPayPalModal(true);
        setPaymentProcessing(false);
        break;
      case 'apple-pay':
        setShowApplePayModal(true);
        setPaymentProcessing(false);
        break;
      case 'google-pay':
        setShowGooglePayModal(true);
        setPaymentProcessing(false);
        break;
      case 'mpesa':
      case 'airtel-money':
        setShowPinModal(true);
        setPaymentProcessing(false);
        break;
      default:
        setPaymentProcessing(false);
        setPaymentStatus({ type: 'error', message: 'Payment method not supported' });
    }
  };

  const handleCreditCardPayment = async () => {
    // Simulate credit card processing
    setTimeout(async () => {
      if (cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name) {
        setPaymentStatus({ type: 'success', message: 'Credit card payment successful!' });
        
        // Create order
        const order = await createOrder('Credit Card');
        
        // Show success state for 2 seconds, then proceed
        setTimeout(() => {
          if (onPaymentSuccess) {
            onPaymentSuccess(order);
          }
        }, 2000);
        setPaymentProcessing(false);
      } else {
        setPaymentStatus({ type: 'error', message: 'Please fill in all card details' });
        setPaymentProcessing(false);
      }
    }, 2000);
  };

  return (
    <>
      {/* PIN Modal for Mobile Money */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-xs mx-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2 text-foreground">Enter PIN</h4>
              <div className="mb-2 text-sm text-muted-foreground">EnergyHub Marketplace</div>
              <div className="mb-4 text-lg font-bold text-primary">
                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <Input
                label="PIN"
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="Enter PIN"
                maxLength={6}
                autoFocus
                className="mb-4"
              />
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  onClick={handleConfirmPin} 
                  disabled={pin.length < 4 || paymentProcessing}
                  loading={paymentProcessing}
                  className="flex-1"
                >
                  Confirm
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setShowPinModal(false); 
                    setPaymentStatus(null); 
                    setPin(''); 
                    setPaymentProcessing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PayPal Login Modal */}
      {showPayPalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="text-center mb-4">
              <img 
                src="https://img.icons8.com/?size=100&id=13611&format=png&color=000000" 
                alt="PayPal" 
                className="w-16 h-16 mx-auto mb-2"
              />
              <h4 className="font-semibold text-foreground">PayPal Login</h4>
              <p className="text-sm text-muted-foreground">Log in to your PayPal account</p>
            </div>
            <div className="space-y-4">
              <Input
                label="Email or mobile number"
                type="email"
                value={paypalEmail}
                onChange={e => setPaypalEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Password"
                type="password"
                value={paypalPassword}
                onChange={e => setPaypalPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="default" 
                  onClick={handlePayPalLogin}
                  disabled={!paypalEmail || !paypalPassword || paymentProcessing}
                  loading={paymentProcessing}
                  className="flex-1"
                >
                  Log In & Pay
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPayPalModal(false);
                    setPaypalEmail('');
                    setPaypalPassword('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay Modal */}
      {showApplePayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg shadow-xl p-8 w-full max-w-sm mx-4">
            <div className="text-center">
              <img 
                src="https://img.icons8.com/?size=100&id=77189&format=png&color=000000" 
                alt="Apple Pay" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h4 className="font-semibold mb-2 text-foreground">Apple Pay</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Pay with Touch ID or Face ID
              </p>
              <div className="mb-6 text-xl font-bold text-primary">
                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  onClick={handleApplePayConfirm}
                  disabled={paymentProcessing}
                  loading={paymentProcessing}
                  className="flex-1"
                >
                  <Icon name="Fingerprint" size={16} className="mr-2" />
                  Pay with Touch ID
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowApplePayModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Pay Modal */}
      {showGooglePayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card rounded-lg shadow-xl p-8 w-full max-w-sm mx-4">
            <div className="text-center">
              <img 
                src="https://img.icons8.com/?size=100&id=p7OO5M8N611u&format=png&color=000000" 
                alt="Google Pay" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h4 className="font-semibold mb-2 text-foreground">Google Pay</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Complete your payment with Google Pay
              </p>
              <div className="mb-6 text-xl font-bold text-primary">
                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  onClick={handleGooglePayConfirm}
                  disabled={paymentProcessing}
                  loading={paymentProcessing}
                  className="flex-1"
                >
                  Pay Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowGooglePayModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Payment Status Message */}
        {paymentStatus && (
          <div className={cn(
            "p-6 rounded-lg border flex items-center gap-4 transition-all duration-300",
            paymentStatus.type === 'success' 
              ? "bg-green-50 border-green-200 text-green-800 shadow-lg" 
              : paymentStatus.type === 'error'
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          )}>
            {paymentStatus.type === 'success' ? (
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                <Icon name="Check" size={24} className="text-white" />
              </div>
            ) : (
              <Icon 
                name={paymentStatus.type === 'error' ? 'XCircle' : 'Clock'} 
                size={24} 
                className={paymentStatus.type === 'error' ? 'text-red-500' : 'text-blue-500'}
              />
            )}
            <div className="flex-1">
              <span className={cn(
                "font-semibold text-lg",
                paymentStatus.type === 'success' && "text-green-700"
              )}>
                {paymentStatus.message}
              </span>
              {paymentStatus.type === 'success' && (
                <p className="text-sm text-green-600 mt-1">
                  Redirecting to next step...
                </p>
              )}
            </div>
            {paymentStatus.type === 'success' && (
              <div className="animate-pulse">
                <Icon name="ArrowRight" size={20} className="text-green-600" />
              </div>
            )}
          </div>
        )}

        {/* Show payment form only if payment is not successful */}
        {paymentStatus?.type !== 'success' && (
          <>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">{t('payment.information')}</h2>
            </div>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => {
                    if (!method.disabled) {
                      setSelectedPayment(method.id);
                      setPaymentStatus(null);
                      // Update payment info with selected method
                      onPaymentInfoChange({
                        ...paymentInfo,
                        method: method.id
                      });
                    }
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-105",
                    selectedPayment === method.id
                      ? "border-primary bg-primary/5"
                      : method.disabled
                      ? "border-muted bg-muted/20 cursor-not-allowed opacity-50"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="w-8 h-8"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      {method.disabled && (
                        <p className="text-xs text-destructive mt-1">Currently unavailable</p>
                      )}
                    </div>
                    {selectedPayment === method.id && (
                      <Icon name="CheckCircle" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Credit Card Form */}
            {selectedPayment === 'credit-card' && (
              <div className="space-y-4 p-6 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Credit Card Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Card Number"
                      type="text"
                      value={cardDetails.number}
                      onChange={e => handleCardNumberChange(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <Input
                    label="Expiry Date"
                    type="text"
                    value={cardDetails.expiry}
                    onChange={e => handleCardExpiryChange(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    value={cardDetails.cvv}
                    onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Cardholder Name"
                      type="text"
                      value={cardDetails.name}
                      onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Money Demo Payment */}
            {(selectedPayment === 'mpesa' || selectedPayment === 'airtel-money') && (
              <div className="space-y-4 p-6 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {selectedPayment === 'mpesa' ? 'M-Pesa' : 'Airtel Money'} Payment
                </h3>
                <div className="text-center">
                  <img
                    src={selectedPayment === 'mpesa'
                      ? 'https://img.icons8.com/?size=100&id=kUwZnzomzbTj&format=png&color=000000'
                      : 'https://img.icons8.com/?size=100&id=H6oPm9v5Ilx6&format=png&color=000000'}
                    alt={selectedPayment === 'mpesa' ? 'M-Pesa' : 'Airtel Money'}
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your mobile number to receive a payment prompt on your phone.
                  </p>
                  <Input
                    label="Mobile Number"
                    value={mobileNumber}
                    onChange={e => {
                      setMobileNumber(e.target.value);
                      // Update payment info with mobile number
                      onPaymentInfoChange({
                        ...paymentInfo,
                        method: selectedPayment,
                        mobileNumber: e.target.value
                      });
                    }}
                    placeholder="e.g. +254712345678"
                    required
                    maxLength={15}
                  />
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${subtotal?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">${shipping?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="text-foreground">${tax?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">${total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              variant="default"
              size="lg"
              onClick={handlePayment}
              disabled={!selectedPayment || paymentProcessing}
              loading={paymentProcessing}
              className="w-full"
            >
              {paymentProcessing ? 'Processing Payment...' : `Pay $${total?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentSection;