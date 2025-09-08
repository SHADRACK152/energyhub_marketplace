import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/i18n.jsx';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.orderData;
  const [currentTime] = useState(new Date());
  
  // Generate transaction details
  const transactionId = order?.paymentInfo?.transactionId || `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const authCode = order?.paymentInfo?.authCode || `AUTH${Math.floor(Math.random() * 1000000)}`;
  
  // Get proper payment method display name
  const getPaymentMethodName = (method) => {
    switch(method) {
      case 'credit-card':
        return t('payment.creditCard');
      case 'debit-card':
        return t('payment.debitCard');
      case 'mobile-money':
      case 'safaricom':
      case 'm-pesa':
      case 'mpesa':
        return 'M-Pesa';
      case 'airtel-money':
        return 'Airtel Money';
      case 'paypal':
        return t('payment.paypal');
      case 'apple-pay':
        return t('payment.applePay');
      case 'google-pay':
        return t('payment.googlePay');
      case 'bank-transfer':
        return t('payment.bankTransfer');
      case 'cash-on-delivery':
        return t('payment.cashOnDelivery');
      default:
        return t('payment.mobileMoney');
    }
  };
  
  const paymentMethod = getPaymentMethodName(order?.paymentInfo?.method);
  const lastFourDigits = order?.paymentInfo?.cardDetails?.number?.slice(-4) || order?.paymentInfo?.phoneNumber?.slice(-4) || Math.floor(Math.random() * 9000) + 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('order.paymentSuccessful')}</h1>
          <p className="text-lg text-gray-600 mb-4">{t('order.thankYou')}</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-medium">
              {t('order.confirmationEmail')}
            </p>
          </div>
        </div>

        {order && (
          <>
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2 text-blue-600" />
                {t('order.paymentSummary')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.amountPaid')}</span>
                    <span className="text-2xl font-bold text-green-600">${order.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.paymentMethod')}</span>
                    <span className="font-medium">{paymentMethod} ••••{lastFourDigits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.transactionId')}</span>
                    <span className="font-mono text-sm">{transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.authorizationCode')}</span>
                    <span className="font-mono text-sm">{authCode}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.paymentDate')}</span>
                    <span className="font-medium">{currentTime.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.paymentTime')}</span>
                    <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.status')}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      {t('order.completed')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('order.processingFee')}</span>
                    <span className="font-medium">KSh 0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Icon name="Package" size={20} className="mr-2 text-blue-600" />
                Order Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-bold text-lg">{order.orderNumber}</span>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Items Purchased:</h3>
                  {order.items ? (
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = '/assets/images/no_image.png';
                                }}
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{order.productName}</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${(order.subtotal || order.price * 0.85).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${(order.tax || order.price * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">${(order.shipping || order.price * 0.07).toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span>Discount:</span>
                      <span className="font-medium">-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total Paid:</span>
                    <span className="text-green-600">${order.price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Icon name="Truck" size={20} className="mr-2 text-blue-600" />
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery:</h3>
                  <p className="text-lg font-medium text-blue-600">
                    {new Date(order.deliveryDate || Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.shippingInfo?.deliveryOption === 'express' ? '1-2 business days' : '5-7 business days'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipping Method:</h3>
                  <p className="font-medium">
                    {order.shippingInfo?.deliveryOption === 'express' ? 'Express Delivery' : 'Standard Delivery'}
                  </p>
                  <p className="text-sm text-gray-600">Tracking information will be provided once shipped</p>
                  {order.shippingInfo?.selectedAddress && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-medium">Delivery Address:</p>
                      <p>{order.shippingInfo.selectedAddress.street}</p>
                      <p>{order.shippingInfo.selectedAddress.city}, {order.shippingInfo.selectedAddress.state} {order.shippingInfo.selectedAddress.zip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security & Support Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2 text-blue-600" />
                Security & Support
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Icon name="Lock" size={24} className="mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Your payment was processed securely with 256-bit SSL encryption</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon name="RefreshCw" size={24} className="mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">30-Day Returns</h3>
                  <p className="text-sm text-gray-600">Easy returns and exchanges within 30 days of delivery</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Icon name="Headphones" size={24} className="mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Get help anytime with our customer support team</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="List"
              iconPosition="left"
              onClick={() => navigate('/orders')}
              className="flex-1"
            >
              View My Orders
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={() => navigate('/product-catalog-search')}
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={() => {
                // Create a simple receipt
                const receiptContent = `
ENERGYHUB MARKETPLACE
Order Confirmation Receipt

Order Number: ${order?.orderNumber || 'N/A'}
Date: ${currentTime.toLocaleDateString()}
Time: ${currentTime.toLocaleTimeString()}

Product: ${order?.productName || 'N/A'}
Amount Paid: KSh ${order?.price?.toFixed(2) || '0.00'}
Payment Method: Credit Card
Transaction ID: ${transactionId}

Thank you for your purchase!
                `.trim();
                
                const blob = new Blob([receiptContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `receipt-${order?.orderNumber || 'order'}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 sm:flex-none"
            >
              Download Receipt
            </Button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-gray-600">
          <p className="text-sm">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@energyhub.com" className="text-blue-600 hover:underline">
              support@energyhub.com
            </a>{' '}
            or call <span className="font-medium">1-800-ENERGY-1</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
