import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n.jsx';
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
  const { t } = useTranslation();
  const [user] = useState({ role: 'buyer', name: 'John Doe' });
  
  // Checkout flow state
  const [currentStep, setCurrentStep] = useState('cart');
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [appliedPromoData, setAppliedPromoData] = useState(null);
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
    { id: 'cart', label: t('checkout.cartReview'), icon: 'ShoppingCart' },
    { id: 'shipping', label: t('checkout.shipping'), icon: 'Truck' },
    { id: 'payment', label: t('checkout.payment'), icon: 'CreditCard' },
    { id: 'review', label: t('checkout.review'), icon: 'CheckCircle' }
  ];

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  // Calculate shipping based on selected delivery option and promo codes
  let shipping = 0;
  const hasFreeShipping = shippingInfo?.freeShipping || appliedPromoData?.freeShipping;
  
  if (hasFreeShipping) {
    shipping = 0;
  } else if (shippingInfo?.deliveryOption === 'express') {
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

  // Ensure TROVA promo code exists for testing
  React.useEffect(() => {
    const ensureTestPromoCode = () => {
      const testSellerId = 'seller1'; // Default seller ID
      const storageKey = `promoCodes_${testSellerId}`;
      const existingCodes = localStorage.getItem(storageKey);
      const codes = existingCodes ? JSON.parse(existingCodes) : [];
      
      // Check if TROVA code already exists
      const trovaExists = codes.find(code => code.code === 'TROVA');
      if (!trovaExists) {
        // Add TROVA test promo code
        const trovaCode = {
          id: 'test-trova-' + Date.now(),
          code: 'TROVA',
          type: 'percentage',
          value: 15, // 15% off
          description: '15% off for TROVA users',
          minimumOrder: 0,
          maxUses: 1000,
          usageCount: 0,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          sellerId: testSellerId,
          sellerName: 'EnergyHub Demo Seller',
          createdAt: new Date().toISOString()
        };
        codes.push(trovaCode);
        localStorage.setItem(storageKey, JSON.stringify(codes));
        console.log('✅ TROVA promo code created for testing');
      }
    };
    
    ensureTestPromoCode();
  }, []);

  // Validate promo code from localStorage (fallback when API fails)
  const validatePromoCodeLocally = (code) => {
    console.log('🔍 Searching for promo code:', code);
    try {
      // Check all seller's localStorage for promo codes
      let foundCode = null;
      let totalStorageKeys = 0;
      let promoCodeKeys = 0;
      
      // Loop through all localStorage keys to find promo codes from any seller
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        totalStorageKeys++;
        if (key && key.startsWith('promoCodes_')) {
          promoCodeKeys++;
          console.log(`📦 Found promo storage key: ${key}`);
          const storedCodes = localStorage.getItem(key);
          if (storedCodes) {
            const codes = JSON.parse(storedCodes);
            console.log(`📋 Codes in ${key}:`, codes);
            foundCode = codes.find(promoCode => 
              promoCode.code.toUpperCase() === code.toUpperCase() && 
              promoCode.isActive &&
              new Date(promoCode.endDate) > new Date()
            );
            if (foundCode) {
              console.log('✅ Found matching promo code:', foundCode);
              break;
            }
          }
        }
      }
      
      console.log(`📊 Storage scan: ${totalStorageKeys} total keys, ${promoCodeKeys} promo code keys`);
      if (!foundCode) {
        console.log('❌ No matching promo code found');
      }

      if (foundCode) {
        // Calculate discount
        let discount = 0;
        if (foundCode.type === 'percentage') {
          discount = (subtotal * foundCode.value) / 100;
        } else if (foundCode.type === 'fixed') {
          discount = foundCode.value;
        }

        // Check minimum order requirement
        if (foundCode.minimumOrder && subtotal < foundCode.minimumOrder) {
          setPromoDiscount(0);
          setAppliedPromoData(null);
          setPromoFeedback(`Minimum order of $${foundCode.minimumOrder} required for this promo code.`);
          return;
        }

        setPromoDiscount(discount);
        setAppliedPromoData({
          valid: true,
          discount: discount,
          description: foundCode.description || `${foundCode.value}${foundCode.type === 'percentage' ? '%' : '$'} off`,
          code: foundCode.code
        });
        setPromoFeedback(`✅ ${foundCode.description || 'Promo code applied'} - $${discount.toFixed(2)} discount applied!`);
      } else {
        setPromoDiscount(0);
        setAppliedPromoData(null);
        setPromoFeedback('Invalid promo code.');
      }
    } catch (error) {
      console.error('Error validating promo code locally:', error);
      setPromoDiscount(0);
      setAppliedPromoData(null);
      setPromoFeedback('Error validating promo code. Please try again.');
    }
  };

  // Debug function to show all available promo codes
  const showAllPromoCodes = () => {
    console.log('🔍 === ALL AVAILABLE PROMO CODES ===');
    let totalCodes = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('promoCodes_')) {
        const sellerId = key.replace('promoCodes_', '');
        const storedCodes = localStorage.getItem(key);
        if (storedCodes) {
          const codes = JSON.parse(storedCodes);
          console.log(`🏪 Seller ${sellerId}:`, codes);
          totalCodes += codes.length;
          
          codes.forEach(code => {
            const isActive = code.isActive && new Date(code.endDate) > new Date();
            console.log(`  📋 ${code.code}: ${code.type} ${code.value}${code.type === 'percentage' ? '%' : '$'} - ${isActive ? '✅ ACTIVE' : '❌ INACTIVE'}`);
          });
        }
      }
    }
    
    console.log(`📊 Total codes available: ${totalCodes}`);
    
    // Also show in alert for user
    if (totalCodes === 0) {
      alert('No promo codes found. Create some in the B2B seller dashboard first!');
    } else {
      alert(`Found ${totalCodes} promo codes! Check console for details.`);
    }
  };

  const handleApplyPromoCode = async () => {
    const code = promoCode?.trim();
    if (!code) {
      setPromoDiscount(0);
      setPromoFeedback('Please enter a promo code.');
      setAppliedPromoData(null);
      return;
    }

    setPromoLoading(true);
    setPromoFeedback('');

    try {
      const response = await fetch('http://localhost:5000/api/promo-codes/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          orderValue: subtotal,
          itemCount: cartItems.length
        }),
      });

      const result = await response.json();

      if (response.ok && result.valid) {
        setPromoDiscount(result.discount || 0);
        setAppliedPromoData(result);
        
        // Handle free shipping
        if (result.freeShipping) {
          setShippingInfo(prev => ({ ...prev, freeShipping: true }));
          setPromoFeedback(`${result.description} - Free shipping applied!`);
        } else {
          setPromoFeedback(`${result.description} - $${result.discount?.toFixed(2)} discount applied!`);
        }
      } else {
        // API failed or invalid, try localStorage fallback
        validatePromoCodeLocally(code);
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      // API failed, try localStorage fallback
      validatePromoCodeLocally(code);
    } finally {
      setPromoLoading(false);
    }
  };

  // Final order placement
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Build comprehensive order payload
      const orderPayload = {
        orderNumber: 'ORD-' + Date.now(),
        productName: cartItems.map(i => i.name).join(', '),
        productImage: cartItems[0]?.image || '',
        price: total,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        discount: promoDiscount,
        promoCode: appliedPromoData ? {
          code: promoCode,
          type: appliedPromoData.type,
          description: appliedPromoData.description,
          discount: appliedPromoData.discount,
          freeShipping: appliedPromoData.freeShipping
        } : null,
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        items: cartItems.map(item => ({
          ...item,
          total: item.price * item.quantity
        })),
        shippingInfo: {
          ...shippingInfo,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        paymentInfo: {
          ...paymentInfo,
          processedAt: new Date().toISOString(),
          transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
          authCode: `AUTH${Math.floor(Math.random() * 1000000)}`,
          status: 'completed'
        },
        orderSummary: {
          itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          totalWeight: cartItems.reduce((sum, item) => sum + (item.weight || 1) * item.quantity, 0),
          currency: 'USD'
        },
        userId: 'demo-user', // Replace with real user ID if available
        userEmail: 'customer@example.com', // Replace with real user email
        orderStatus: 'confirmed'
      };
      
      // Send to backend
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (!res.ok) throw new Error('Failed to place order');
      const savedOrder = await res.json();
      
      // Navigate to order confirmation page with enhanced data
      navigate('/order-confirmation', {
        state: {
          orderData: {
            ...savedOrder,
            ...orderPayload, // Include all the comprehensive data
            paymentSuccess: true,
            confirmationSent: true
          }
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
            promoLoading={promoLoading}
            appliedPromoData={appliedPromoData}
            showAllPromoCodes={showAllPromoCodes}
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
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onPaymentSuccess={() => handleNextStep()}
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
              <h1 className="text-2xl font-bold text-foreground">{t('checkout.title')}</h1>
              <Button
                variant="ghost"
                onClick={() => navigate('/product-catalog-search')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                {t('checkout.continueShopping')}
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
              {t('checkout.previous')}
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
                {t('checkout.placeOrderAmount', { amount: `$${total?.toFixed(2)}` })}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {t('checkout.continueTo', { 
                  step: steps?.find(s => s?.id === steps?.[steps?.findIndex(step => step?.id === currentStep) + 1]?.id)?.label 
                })}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Sticky Bottom */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border shadow-modal z-40">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {cartItems?.length} {cartItems?.length === 1 ? t('cart.item') : t('cart.items')} · {t('order.total')}:
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
                {t('checkout.placeOrder')}
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
              >
                {t('checkout.continue')}
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