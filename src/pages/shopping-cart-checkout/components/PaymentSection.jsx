
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ paymentInfo, onPaymentInfoChange, shippingInfo, total }) => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  // Demo state for mobile money (must be inside the component)
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobilePayStatus, setMobilePayStatus] = useState(null); // null | 'pending' | 'success' | 'error'
  const [smsSent, setSmsSent] = useState(false);
  // Modal state for PIN entry
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  // Simulate mobile money payment
  const handleMobileMoneyPay = () => {
    setSmsSent(true);
    setMobilePayStatus('pending');
    setTimeout(() => {
      // Accept Kenyan numbers: +2547XXXXXXXX or 07XXXXXXXX (10 or 12 digits)
      const valid =
        mobileNumber &&
        (
          /^\+2547\d{8}$/.test(mobileNumber) ||
          /^07\d{8}$/.test(mobileNumber)
        );
      if (valid) {
        setShowPinModal(true);
      } else {
        setMobilePayStatus('error');
      }
    }, 2000);
  };
  const handleConfirmPin = () => {
    setMobilePayStatus('pending');
    setShowPinModal(false);
    setTimeout(() => {
      if (pin && pin.length >= 4) {
        setMobilePayStatus('success');
      } else {
        setMobilePayStatus('error');
      }
      setPin('');
    }, 1200);
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
    <>
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
            <h4 className="font-semibold mb-2">Enter your mobile money PIN</h4>
            <div className="mb-2 text-sm text-muted-foreground">EnergyHub Online Store</div>
            <div className="mb-4 text-lg font-bold text-primary">Amount: KES {total?.toLocaleString()}</div>
            <Input
              label="PIN"
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="Enter PIN"
              maxLength={6}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <Button variant="default" onClick={handleConfirmPin} disabled={pin.length < 4}>Confirm</Button>
              <Button variant="outline" onClick={() => { setShowPinModal(false); setMobilePayStatus(null); setPin(''); }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Payment Information</h2>
        </div>
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
        {/* Mpesa & Airtel Money Demo Payment */}
        {(paymentInfo?.method === 'mpesa' || paymentInfo?.method === 'airtel-money') && (
          <div className="mb-8">
            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <img
                src={paymentInfo?.method === 'mpesa'
                  ? 'https://img.icons8.com/?size=100&id=kUwZnzomzbTj&format=png&color=000000'
                  : 'https://img.icons8.com/?size=100&id=H6oPm9v5Ilx6&format=png&color=000000'}
                alt={paymentInfo?.method === 'mpesa' ? 'Mpesa' : 'Airtel Money'}
                style={{ width: 48, height: 48, objectFit: 'contain', margin: '0 auto 1rem' }}
              />
              <h4 className="font-medium text-foreground mb-2">
                Pay with {paymentInfo?.method === 'mpesa' ? 'M-Pesa' : 'Airtel Money'}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your mobile number to receive a payment prompt on your phone.
              </p>
              <Input
                label="Mobile Number"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                placeholder="e.g. +254712345678"
                required
                className="mb-2"
                maxLength={15}
              />
              <Button
                variant="default"
                onClick={handleMobileMoneyPay}
                disabled={mobilePayStatus === 'pending' || !mobileNumber}
                className="w-full mt-2"
              >
                {mobilePayStatus === 'pending' ? 'Processing...' : `Pay with ${paymentInfo?.method === 'mpesa' ? 'M-Pesa' : 'Airtel Money'}`}
              </Button>
              {smsSent && mobilePayStatus === 'pending' && (
                <div className="text-blue-600 mt-4">SMS sent to {mobileNumber}. Please check your phone to complete the payment.</div>
              )}
              {mobilePayStatus === 'success' && (
                <div className="text-green-600 mt-4">Payment successful! Thank you.</div>
              )}
              {mobilePayStatus === 'error' && (
                <div className="text-red-500 mt-4">Payment failed. Please check your number and try again.</div>
              )}
            </div>
          </div>
        )}
        {/* ...existing code for payment details, billing address, and security info... */}
      </div>
    </>
  );
};

export default PaymentSection;