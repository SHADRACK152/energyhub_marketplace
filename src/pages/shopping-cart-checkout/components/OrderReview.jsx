import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderReview = ({
  cartItems,
  shippingInfo,
  paymentInfo,
  totals,
  onEdit
}) => {
  const formatCurrency = (amount) => {
    return `$${amount?.toFixed(2)}`;
  };

  const getDeliveryOption = () => {
    const options = {
      'standard': { name: 'Standard Delivery', time: '5-7 business days' },
      'express': { name: 'Express Delivery', time: '2-3 business days' },
      'overnight': { name: 'Overnight Delivery', time: 'Next business day' }
    };
    return options?.[shippingInfo?.deliveryOption] || options?.['standard'];
  };

  const getPaymentMethodInfo = () => {
    const methods = {
      'credit-card': {
        name: 'Credit Card',
        details: paymentInfo?.cardDetails?.number ? 
          `**** **** **** ${paymentInfo?.cardDetails?.number?.slice(-4)}` : 
          'Card ending in ****'
      },
      'paypal': { name: 'PayPal', details: 'PayPal account' },
      'apple-pay': { name: 'Apple Pay', details: 'Apple Pay wallet' },
      'google-pay': { name: 'Google Pay', details: 'Google Pay wallet' },
      'mpesa': { 
        name: 'M-Pesa', 
        details: paymentInfo?.mobileNumber ? 
          `Mobile: ${paymentInfo.mobileNumber}` : 
          'Mobile money payment'
      },
      'airtel-money': { 
        name: 'Airtel Money', 
        details: paymentInfo?.mobileNumber ? 
          `Mobile: ${paymentInfo.mobileNumber}` : 
          'Mobile money payment'
      }
    };
    return methods?.[paymentInfo?.method] || { name: 'Unknown Payment Method', details: 'Payment method not recognized' };
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Review Your Order</h2>
        <p className="text-muted-foreground mb-8">
          Please review all details before placing your order. You can edit any section by clicking the "Edit" button.
        </p>

        {/* Order Items */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Order Items</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('cart')}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item?.id} className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                      {item?.quantity}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground line-clamp-2">
                      {item?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sold by {item?.seller}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        Quantity: {item?.quantity}
                      </span>
                      <div className="text-right">
                        <span className="font-medium text-foreground">
                          {formatCurrency(item?.price * item?.quantity)}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item?.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Shipping Information</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('shipping')}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Delivery Address</span>
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">
                    {shippingInfo?.selectedAddress?.fullName}
                  </p>
                  <p>{shippingInfo?.selectedAddress?.address}</p>
                  <p>
                    {shippingInfo?.selectedAddress?.city}, {shippingInfo?.selectedAddress?.state} {shippingInfo?.selectedAddress?.zipCode}
                  </p>
                  <p>{shippingInfo?.selectedAddress?.phone}</p>
                </div>
              </div>

              {/* Delivery Option */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Truck" size={16} />
                  <span>Delivery Method</span>
                </h4>
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    {getDeliveryOption()?.name}
                  </p>
                  <p className="text-muted-foreground">
                    {getDeliveryOption()?.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Payment Information</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('payment')}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Method */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="CreditCard" size={16} />
                  <span>Payment Method</span>
                </h4>
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    {getPaymentMethodInfo()?.name}
                  </p>
                  <p className="text-muted-foreground">
                    {getPaymentMethodInfo()?.details}
                  </p>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>Billing Address</span>
                </h4>
                <div className="text-sm text-muted-foreground">
                  {paymentInfo?.billingAddress ? (
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {paymentInfo?.billingAddress?.fullName}
                      </p>
                      <p>{paymentInfo?.billingAddress?.address}</p>
                      <p>
                        {paymentInfo?.billingAddress?.city}, {paymentInfo?.billingAddress?.state} {paymentInfo?.billingAddress?.zipCode}
                      </p>
                    </div>
                  ) : (
                    <p>Same as shipping address</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Total Summary */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Order Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'})
              </span>
              <span className="text-foreground">{formatCurrency(totals?.subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping & Handling</span>
              <span className="text-foreground">
                {totals?.shipping === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  formatCurrency(totals?.shipping)
                )}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">{formatCurrency(totals?.tax)}</span>
            </div>
            
            {totals?.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-success">-{formatCurrency(totals?.discount)}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Order Total</span>
                <span className="text-foreground">{formatCurrency(totals?.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-2">Order Terms</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• By placing this order, you agree to our Terms of Service and Privacy Policy</li>
                <li>• All prices are in USD and include applicable taxes</li>
                <li>• Order confirmation will be sent to your email address</li>
                <li>• Changes to your order may not be possible after placement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <div className="text-sm">
              <span className="text-success font-medium">Secure Checkout</span>
              <span className="text-success/80 ml-2">
                Your payment and personal information are protected with industry-standard encryption.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;