import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';

import Button from '../../components/ui/Button';

// Import components
import ProgressIndicator from './components/ProgressIndicator';
import CartSection from './components/CartSection';
import ShippingSection from './components/ShippingSection';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import OrderReview from './components/OrderReview';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState({ role: 'buyer', name: 'John Doe' });
  
  // Checkout flow state
  const [currentStep, setCurrentStep] = useState('cart');
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    selectedAddress: null,
    deliveryOption: 'standard'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'credit-card',
    cardDetails: {},
    billingAddress: null
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cart from direct purchase or existing cart

  // If you want to support direct purchase, you can add logic here to override cartItems

  const steps = [
    { id: 'cart', label: 'Cart Review', icon: 'ShoppingCart' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'review', label: 'Review', icon: 'CheckCircle' }
  ];

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  // Calculate shipping based on selected delivery option
  let shipping = 0;
  if (shippingInfo?.deliveryOption === 'express') {
    shipping = 15;
  } else if (shippingInfo?.deliveryOption === 'overnight') {
    shipping = 35;
  } else {
    shipping = subtotal > 500 ? 0 : 25;
  }
  const tax = subtotal * 0.08;
  const discount = promoDiscount;
  const total = subtotal + shipping + tax - discount;

  // Step navigation
  const handleNextStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    if (currentIndex < steps?.length - 1) {
      setCurrentStep(steps?.[currentIndex + 1]?.id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps?.[currentIndex - 1]?.id);
    }
  };

  const handleStepClick = (stepId) => {
    // Only allow going to previous steps or current step
    const targetIndex = steps?.findIndex(step => step?.id === stepId);
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    
    if (targetIndex <= currentIndex) {
      setCurrentStep(stepId);
    }
  };


  // Cart actions
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  // Fix: Add missing handleRemoveItem function
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const [promoFeedback, setPromoFeedback] = useState('');
  const handleApplyPromoCode = () => {
    const code = promoCode?.trim().toLowerCase();
    if (!code) {
      setPromoDiscount(0);
      setPromoFeedback('Please enter a promo code.');
      return;
    }
    // Example codes
    if (code === 'save10') {
      setPromoDiscount(subtotal * 0.1);
      setPromoFeedback('Promo code applied: 10% off!');
    } else if (code === 'freeship') {
      setPromoDiscount(0);
      setShippingInfo(prev => ({ ...prev, deliveryOption: 'standard' }));
      setPromoFeedback('Promo code applied: Free shipping!');
    } else if (code === 'save50') {
      setPromoDiscount(50);
      setPromoFeedback('Promo code applied: $50 off!');
    } else {
      setPromoDiscount(0);
      setPromoFeedback('Invalid promo code.');
    }
  };

  // Final order placement
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Build order payload
      const orderPayload = {
        orderNumber: 'ORD-' + Date.now(),
        productName: cartItems.map(i => i.name).join(', '),
        productImage: cartItems[0]?.image || '',
        price: total,
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        items: cartItems,
        shippingInfo,
        paymentInfo,
        userId: 'demo-user', // Replace with real user ID if available
      };
      // Send to backend
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (!res.ok) throw new Error('Failed to place order');
      const savedOrder = await res.json();
      // Navigate to order confirmation page, user can go to orders from there
      navigate('/order-confirmation', {
        state: {
          orderData: savedOrder
        }
      });
      clearCart();
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Order placement failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <CartSection
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onApplyPromoCode={handleApplyPromoCode}
            promoDiscount={promoDiscount}
            promoFeedback={promoFeedback}
          />
        );
      case 'shipping':
        return (
          <ShippingSection
            shippingInfo={shippingInfo}
            onShippingInfoChange={setShippingInfo}
          />
        );
      case 'payment':
        return (
          <PaymentSection
            paymentInfo={paymentInfo}
            onPaymentInfoChange={setPaymentInfo}
            shippingInfo={shippingInfo}
          />
        );
      case 'review':
        return (
          <OrderReview
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            totals={{ subtotal, shipping, tax, discount, total }}
            onEdit={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'cart':
        return cartItems?.length > 0;
      case 'shipping':
        return shippingInfo?.selectedAddress && shippingInfo?.deliveryOption;
      case 'payment':
        return paymentInfo?.method && (
          paymentInfo?.method === 'paypal' || 
          paymentInfo?.cardDetails?.number
        );
      case 'review':
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader user={user} onNavigate={navigate} />
      
      <main className="pt-16 pb-20 lg:pb-8">
        {/* Header */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
              <Button
                variant="ghost"
                onClick={() => navigate('/product-catalog-search')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ProgressIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Step Content */}
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <OrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                  promoCode={promoCode}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 'cart'}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            {currentStep === 'review' ? (
              <Button
                variant="default"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!canProceedToNext() || isProcessing}
                loading={isProcessing}
                iconName="CreditCard"
                iconPosition="left"
              >
                Place Order - ${total?.toFixed(2)}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue to {steps?.find(s => s?.id === steps?.[steps?.findIndex(step => step?.id === currentStep) + 1]?.id)?.label}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Sticky Bottom */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border shadow-modal z-40">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} · Total:
              </span>
              <span className="text-lg font-bold text-foreground">
                ${total?.toFixed(2)}
              </span>
            </div>
            
            {currentStep === 'review' ? (
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={!canProceedToNext() || isProcessing}
                loading={isProcessing}
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </main>

      <MobileTabBar user={user} onNavigate={navigate} />
    </div>
  );
};

export default ShoppingCartCheckout;