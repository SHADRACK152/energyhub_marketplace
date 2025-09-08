// Simple internationalization system for EnergyHub
import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation definitions
const translations = {
  en: {
    // Navigation & Header
    'nav.dashboard': 'Dashboard',
    'nav.browse': 'Browse',
    'nav.orders': 'Orders',
    'nav.inventory': 'Inventory',
    'nav.analytics': 'Analytics',
    'nav.profile': 'Profile Settings',
    'nav.logout': 'Logout',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.getStarted': 'Get Started',
    
    // Profile & Account
    'profile.title': 'Account Settings',
    'profile.subtitle': 'Manage your account preferences and security settings',
    'profile.personalInfo': 'Profile Information',
    'profile.security': 'Security',
    'profile.preferences': 'Preferences',
    'profile.billing': 'Billing & Payment',
    'profile.fullName': 'Full Name',
    'profile.email': 'Email Address',
    'profile.phone': 'Phone Number',
    'profile.company': 'Company',
    'profile.location': 'Location',
    'profile.bio': 'Bio',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.saving': 'Saving...',
    'profile.updating': 'Updating...',
    
    // Orders & Shopping
    'orders.title': 'Orders',
    'orders.recent': 'Recent Orders',
    'orders.status': 'Status',
    'orders.price': 'Price',
    'orders.date': 'Date',
    'orders.delivery': 'Delivery',
    'orders.track': 'Track Order',
    'orders.details': 'Order Details',
    'orders.shipped': 'Shipped',
    'orders.processing': 'Processing',
    'orders.delivered': 'Delivered',
    'orders.pending': 'Pending',
    
    // Shopping Cart
    'cart.title': 'Shopping Cart',
    'cart.checkout': 'Checkout',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.empty': 'Your cart is empty',
    'cart.addToCart': 'Add to Cart',
    
    // Product Catalog
    'products.browse': 'Browse Products',
    'products.search': 'Search products...',
    'products.filter': 'Filters',
    'products.sort': 'Sort by',
    'products.price': 'Price',
    'products.rating': 'Rating',
    'products.availability': 'Availability',
    'products.inStock': 'In Stock',
    'products.outOfStock': 'Out of Stock',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.activeOrders': 'Active Orders',
    'dashboard.revenue': 'Revenue',
    'dashboard.customers': 'Customers',
    'dashboard.quickActions': 'Quick Actions',
    
    // Messages & Notifications
    'messages.success': 'Success!',
    'messages.error': 'Error!',
    'messages.loading': 'Loading...',
    'messages.noData': 'No data available',
    'messages.tryAgain': 'Please try again',
    'messages.profileUpdated': 'Profile updated successfully!',
    'messages.passwordUpdated': 'Password updated successfully!',
    'messages.preferencesUpdated': 'Preferences updated successfully!',
    
    // Common Actions
    'actions.edit': 'Edit',
    'actions.delete': 'Delete',
    'actions.remove': 'Remove',
    'actions.add': 'Add',
    'actions.create': 'Create',
    'actions.update': 'Update',
    'actions.view': 'View',
    'actions.download': 'Download',
    'actions.upload': 'Upload',
    'actions.search': 'Search',
    'actions.filter': 'Filter',
    'actions.sort': 'Sort',
    'actions.refresh': 'Refresh',
    
    // Time & Dates
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.lastWeek': 'Last Week',
    'time.lastMonth': 'Last Month',
    'time.thisYear': 'This Year',
    
    // Checkout Process
    'checkout.title': 'Checkout',
    'checkout.continueShopping': 'Continue Shopping',
    'checkout.cartReview': 'Cart Review',
    'checkout.shipping': 'Shipping',
    'checkout.payment': 'Payment',
    'checkout.review': 'Review',
    'checkout.previous': 'Previous',
    'checkout.continue': 'Continue',
    'checkout.continueTo': 'Continue to {step}',
    'checkout.placeOrder': 'Place Order',
    'checkout.placeOrderAmount': 'Place Order - {amount}',
    'checkout.step': 'Step {current} of {total}',
    
    // Shopping Cart Details
    'cart.shoppingCart': 'Shopping Cart',
    'cart.items': 'items',
    'cart.item': 'item',
    'cart.yourCartIsEmpty': 'Your cart is empty',
    'cart.looksLikeEmpty': 'Looks like you haven\'t added any items to your cart yet.',
    'cart.soldBy': 'Sold by',
    'cart.inStock': 'In Stock',
    'cart.outOfStock': 'Out of Stock',
    'cart.onlyLeft': 'Only {count} left',
    'cart.qty': 'Qty',
    'cart.each': 'each',
    'cart.remove': 'Remove',
    
    // Order Summary
    'order.summary': 'Order Summary',
    'order.subtotal': 'Subtotal',
    'order.shipping': 'Shipping',
    'order.tax': 'Tax',
    'order.discount': 'Discount',
    'order.free': 'Free',
    'order.total': 'Total',
    'order.includesTax': 'Includes {amount} in taxes',
    
    // Promo Codes
    'promo.code': 'Promotional Code',
    'promo.enter': 'Enter promo code',
    'promo.apply': 'Apply',
    'promo.validating': 'Validating...',
    
    // Shipping & Delivery
    'shipping.free': 'Free shipping on orders over KSh 500',
    'shipping.addMore': 'Add {amount} more for free shipping',
    'shipping.volumeDiscount': 'Volume Discounts Available',
    'shipping.volumeDescription': 'You may be eligible for bulk pricing on some items. Contact our sales team for custom quotes on large orders.',
    'shipping.information': 'Shipping Information',
    'shipping.deliveryAddress': 'Delivery Address',
    'shipping.addNewAddress': 'Add New Address',
    'shipping.default': 'Default',
    'shipping.deliveryOptions': 'Delivery Options',
    'shipping.standard': 'Standard Delivery',
    'shipping.express': 'Express Delivery',
    'shipping.overnight': 'Overnight Delivery',
    'shipping.standardDesc': '5-7 business days',
    'shipping.expressDesc': '2-3 business days',
    'shipping.overnightDesc': 'Next business day',
    'shipping.useCurrentLocation': 'Use My Current Location',
    'shipping.locating': 'Locating...',
    'shipping.geoError': 'Geolocation is not supported by your browser.',
    'shipping.locationDenied': 'Location permission denied or unavailable.',
    'shipping.addressError': 'Could not fetch address from location. Please check your internet connection or try again later.',
    'shipping.retry': 'Retry',
    'shipping.suggestedAddress': 'Suggested Address:',
    'shipping.fullName': 'Full Name',
    'shipping.streetAddress': 'Street Address',
    'shipping.city': 'City',
    'shipping.state': 'State',
    'shipping.zipCode': 'ZIP Code',
    'shipping.phoneNumber': 'Phone Number',
    'shipping.saveAddress': 'Save Address',
    'shipping.cancel': 'Cancel',
    'shipping.deliveryEstimate': 'Delivery Estimate',
    'shipping.estimateDescription': 'Your order will be delivered to {city}, {state} in {timeframe}.',
    
    // Payment
    'payment.information': 'Payment Information',
    'payment.creditCard': 'Credit Card',
    'payment.debitCard': 'Debit Card',
    'payment.mobileMoney': 'Mobile Money',
    'payment.paypal': 'PayPal',
    'payment.applePay': 'Apple Pay',
    'payment.googlePay': 'Google Pay',
    'payment.bankTransfer': 'Bank Transfer',
    'payment.cashOnDelivery': 'Cash on Delivery',
    'payment.cardNumber': 'Card Number',
    'payment.expiryDate': 'Expiry Date',
    'payment.cvv': 'CVV',
    'payment.cardholderName': 'Cardholder Name',
    'payment.billingAddress': 'Billing Address',
    'payment.sameAsShipping': 'Same as shipping address',
    'payment.mobileNumber': 'Mobile Number',
    'payment.pin': 'PIN',
    'payment.enterPin': 'Enter your PIN',
    'payment.confirm': 'Confirm',
    'payment.processing': 'Processing payment...',
    'payment.success': 'Payment successful!',
    'payment.failed': 'Payment failed. Please try again.',
    'payment.retry': 'Retry',
    'payment.secure': 'Secure payment with verification',
    'payment.encrypted': 'Your information is secure and encrypted',
    'payment.terms': 'By continuing, you agree to our {terms} and {privacy}.',
    'payment.termsLink': 'Terms of Service',
    'payment.privacyLink': 'Privacy Policy',
    
    // Order Confirmation
    'order.paymentSuccessful': 'Payment Successful!',
    'order.thankYou': 'Thank you for your purchase. Your order has been confirmed.',
    'order.confirmationEmail': 'A confirmation email has been sent to your email address with order details and tracking information.',
    'order.paymentSummary': 'Payment Summary',
    'order.amountPaid': 'Amount Paid:',
    'order.paymentMethod': 'Payment Method:',
    'order.transactionId': 'Transaction ID:',
    'order.authorizationCode': 'Authorization Code:',
    'order.paymentDate': 'Payment Date:',
    'order.paymentTime': 'Payment Time:',
    'order.status': 'Status:',
    'order.completed': 'Completed',
    'order.processingFee': 'Processing Fee:',
    'order.orderDetails': 'Order Details',
    'order.orderNumber': 'Order Number:',
    'order.viewOrders': 'View My Orders',
    'order.trackOrder': 'Track Order',
    'order.printReceipt': 'Print Receipt',
    
    // Security & Trust
    'security.secure': 'Secure',
    'security.sslProtected': 'SSL Protected',
    'security.verified': 'Verified',
    'security.moneyBack': '30-day money-back guarantee',
    'security.priceProtection': 'Price Protection Active',
    'security.pricesLocked': 'Prices are locked for the next 15 minutes',
  },
  
  sw: {
    // Navigation & Header (Swahili)
    'nav.dashboard': 'Dashibodi',
    'nav.browse': 'Tafuta',
    'nav.orders': 'Maagizo',
    'nav.inventory': 'Hesabu',
    'nav.analytics': 'Uchambuzi',
    'nav.profile': 'Mipangilio ya Wasifu',
    'nav.logout': 'Ondoka',
    'nav.signin': 'Ingia',
    'nav.signup': 'Jisajili',
    'nav.getStarted': 'Anza',
    
    // Profile & Account
    'profile.title': 'Mipangilio ya Akaunti',
    'profile.subtitle': 'Dhibiti mapendeleo ya akaunti yako na mipangilio ya usalama',
    'profile.personalInfo': 'Maelezo ya Wasifu',
    'profile.security': 'Usalama',
    'profile.preferences': 'Mapendeleo',
    'profile.billing': 'Malipo na Bili',
    'profile.fullName': 'Jina Kamili',
    'profile.email': 'Anwani ya Barua Pepe',
    'profile.phone': 'Nambari ya Simu',
    'profile.company': 'Kampuni',
    'profile.location': 'Mahali',
    'profile.bio': 'Maelezo',
    'profile.save': 'Hifadhi Mabadiliko',
    'profile.cancel': 'Ghairi',
    'profile.saving': 'Inahifadhi...',
    'profile.updating': 'Inasasisha...',
    
    // Orders & Shopping
    'orders.title': 'Maagizo',
    'orders.recent': 'Maagizo ya Karibuni',
    'orders.status': 'Hali',
    'orders.price': 'Bei',
    'orders.date': 'Tarehe',
    'orders.delivery': 'Uwasilishaji',
    'orders.track': 'Fuatilia Agizo',
    'orders.details': 'Maelezo ya Agizo',
    'orders.shipped': 'Limetumwa',
    'orders.processing': 'Inachakatwa',
    'orders.delivered': 'Limewasilishwa',
    'orders.pending': 'Inasubiri',
    
    // Shopping Cart
    'cart.title': 'Kikapu cha Ununuzi',
    'cart.checkout': 'Malipo',
    'cart.subtotal': 'Jumla Ndogo',
    'cart.shipping': 'Usafirishaji',
    'cart.tax': 'Kodi',
    'cart.total': 'Jumla',
    'cart.empty': 'Kikapu chako ni tupu',
    'cart.addToCart': 'Ongeza kwenye Kikapu',
    
    // Product Catalog
    'products.browse': 'Tafuta Bidhaa',
    'products.search': 'Tafuta bidhaa...',
    'products.filter': 'Chuja',
    'products.sort': 'Panga kwa',
    'products.price': 'Bei',
    'products.rating': 'Ukadiriaji',
    'products.availability': 'Upatikanaji',
    'products.inStock': 'Inapatikana',
    'products.outOfStock': 'Haipatikani',
    
    // Dashboard
    'dashboard.welcome': 'Karibu tena',
    'dashboard.totalSales': 'Mauzo Yote',
    'dashboard.activeOrders': 'Maagizo Yanayoendelea',
    'dashboard.revenue': 'Mapato',
    'dashboard.customers': 'Wateja',
    'dashboard.quickActions': 'Vitendo vya Haraka',
    
    // Messages & Notifications
    'messages.success': 'Imefanikiwa!',
    'messages.error': 'Kosa!',
    'messages.loading': 'Inapakia...',
    'messages.noData': 'Hakuna data',
    'messages.tryAgain': 'Tafadhali jaribu tena',
    'messages.profileUpdated': 'Wasifu umesasishwa kwa mafanikio!',
    'messages.passwordUpdated': 'Nywila imesasishwa kwa mafanikio!',
    'messages.preferencesUpdated': 'Mapendeleo yamesasishwa kwa mafanikio!',
    
    // Common Actions
    'actions.edit': 'Hariri',
    'actions.delete': 'Futa',
    'actions.remove': 'Ondoa',
    'actions.add': 'Ongeza',
    'actions.create': 'Unda',
    'actions.update': 'Sasisha',
    'actions.view': 'Tazama',
    'actions.download': 'Pakua',
    'actions.upload': 'Pakia',
    'actions.search': 'Tafuta',
    'actions.filter': 'Chuja',
    'actions.sort': 'Panga',
    'actions.refresh': 'Onyesha upya',
    
    // Time & Dates
    'time.today': 'Leo',
    'time.yesterday': 'Jana',
    'time.lastWeek': 'Wiki Iliyopita',
    'time.lastMonth': 'Mwezi Uliopita',
    'time.thisYear': 'Mwaka Huu',
    
    // Checkout Process
    'checkout.title': 'Malipo',
    'checkout.continueShopping': 'Endelea Ununuzi',
    'checkout.cartReview': 'Ukaguzi wa Kikapu',
    'checkout.shipping': 'Usafirishaji',
    'checkout.payment': 'Malipo',
    'checkout.review': 'Ukaguzi',
    'checkout.previous': 'Iliyopita',
    'checkout.continue': 'Endelea',
    'checkout.continueTo': 'Endelea hadi {step}',
    'checkout.placeOrder': 'Weka Agizo',
    'checkout.placeOrderAmount': 'Weka Agizo - {amount}',
    'checkout.step': 'Hatua {current} ya {total}',
    
    // Shopping Cart Details
    'cart.shoppingCart': 'Kikapu cha Ununuzi',
    'cart.items': 'vitu',
    'cart.item': 'kitu',
    'cart.yourCartIsEmpty': 'Kikapu chako ni tupu',
    'cart.looksLikeEmpty': 'Inaonekana haujaweka vitu vyovyote kwenye kikapu chako bado.',
    'cart.soldBy': 'Kinauziwa na',
    'cart.inStock': 'Kipo',
    'cart.outOfStock': 'Hakipo',
    'cart.onlyLeft': 'Zimebaki {count} tu',
    'cart.qty': 'Idadi',
    'cart.each': 'kila kimoja',
    'cart.remove': 'Ondoa',
    
    // Order Summary
    'order.summary': 'Muhtasari wa Agizo',
    'order.subtotal': 'Jumla Ndogo',
    'order.shipping': 'Usafirishaji',
    'order.tax': 'Kodi',
    'order.discount': 'Punguzo',
    'order.free': 'Bure',
    'order.total': 'Jumla',
    'order.includesTax': 'Inajumuisha {amount} ya kodi',
    
    // Promo Codes
    'promo.code': 'Msimbo wa Matangazo',
    'promo.enter': 'Ingiza msimbo wa matangazo',
    'promo.apply': 'Tumia',
    'promo.validating': 'Inathibitisha...',
    
    // Shipping & Delivery
    'shipping.free': 'Usafirishaji bure kwa maagizo zaidi ya KSh 500',
    'shipping.addMore': 'Ongeza {amount} zaidi kwa usafirishaji bure',
    'shipping.volumeDiscount': 'Punguzo la Wingi Linapatikana',
    'shipping.volumeDescription': 'Unaweza kustahili bei ya jumla kwa baadhi ya vitu. Wasiliana na timu yetu ya mauzo kwa nukuu za kawaida kwa maagizo makubwa.',
    'shipping.information': 'Habari za Usafirishaji',
    'shipping.deliveryAddress': 'Anwani ya Uwasilishaji',
    'shipping.addNewAddress': 'Ongeza Anwani Mpya',
    'shipping.default': 'Chaguo-msingi',
    'shipping.deliveryOptions': 'Chaguzi za Uwasilishaji',
    'shipping.standard': 'Usafirishaji wa Kawaida',
    'shipping.express': 'Usafirishaji wa Haraka',
    'shipping.overnight': 'Usafirishaji wa Usiku',
    'shipping.standardDesc': 'Siku 5-7 za kazi',
    'shipping.expressDesc': 'Siku 2-3 za kazi',
    'shipping.overnightDesc': 'Siku inayofuata ya kazi',
    'shipping.useCurrentLocation': 'Tumia Mahali Pangu pa Sasa',
    'shipping.locating': 'Kutafuta...',
    'shipping.geoError': 'Geolocation haitegemezwi na kivinjari chako.',
    'shipping.locationDenied': 'Ruhusa ya mahali imekataliwa au haipatikani.',
    'shipping.addressError': 'Haikuweza kupata anwani kutoka mahali. Tafadhali angalia muunganisho wako wa mtandao au jaribu tena baadaye.',
    'shipping.retry': 'Jaribu Tena',
    'shipping.suggestedAddress': 'Anwani Inayopendekezwa:',
    'shipping.fullName': 'Jina Kamili',
    'shipping.streetAddress': 'Anwani ya Mtaa',
    'shipping.city': 'Jiji',
    'shipping.state': 'Jimbo',
    'shipping.zipCode': 'Msimbo wa Posta',
    'shipping.phoneNumber': 'Nambari ya Simu',
    'shipping.saveAddress': 'Hifadhi Anwani',
    'shipping.cancel': 'Ghairi',
    'shipping.deliveryEstimate': 'Makadirio ya Uwasilishaji',
    'shipping.estimateDescription': 'Agizo lako litawasilishwa hadi {city}, {state} katika {timeframe}.',
    
    // Payment
    'payment.information': 'Habari za Malipo',
    'payment.creditCard': 'Kadi ya Mikopo',
    'payment.debitCard': 'Kadi ya Akiba',
    'payment.mobileMoney': 'Pesa za Simu',
    'payment.paypal': 'PayPal',
    'payment.applePay': 'Apple Pay',
    'payment.googlePay': 'Google Pay',
    'payment.bankTransfer': 'Uhamisho wa Benki',
    'payment.cashOnDelivery': 'Pesa Wakati wa Uwasilishaji',
    'payment.cardNumber': 'Nambari ya Kadi',
    'payment.expiryDate': 'Tarehe ya Kuisha',
    'payment.cvv': 'CVV',
    'payment.cardholderName': 'Jina la Mmiliki wa Kadi',
    'payment.billingAddress': 'Anwani ya Bili',
    'payment.sameAsShipping': 'Sawa na anwani ya usafirishaji',
    'payment.mobileNumber': 'Nambari ya Simu',
    'payment.pin': 'PIN',
    'payment.enterPin': 'Ingiza PIN yako',
    'payment.confirm': 'Thibitisha',
    'payment.processing': 'Kuchakata malipo...',
    'payment.success': 'Malipo yamefanikiwa!',
    'payment.failed': 'Malipo yameshindwa. Tafadhali jaribu tena.',
    'payment.retry': 'Jaribu Tena',
    'payment.secure': 'Malipo ya usalama na uthibitisho',
    'payment.encrypted': 'Habari zako ni salama na zimesimbwa',
    'payment.terms': 'Kwa kuendelea, unakubali {terms} na {privacy} zetu.',
    'payment.termsLink': 'Masharti ya Huduma',
    'payment.privacyLink': 'Sera ya Faragha',
    
    // Order Confirmation
    'order.paymentSuccessful': 'Malipo Yamefanikiwa!',
    'order.thankYou': 'Asante kwa ununuzi wako. Agizo lako limethibitishwa.',
    'order.confirmationEmail': 'Barua pepe ya uthibitisho imetumwa kwenye anwani yako ya barua pepe pamoja na maelezo ya agizo na habari za ufuatiliaji.',
    'order.paymentSummary': 'Muhtasari wa Malipo',
    'order.amountPaid': 'Kiasi Kilicholipwa:',
    'order.paymentMethod': 'Njia ya Malipo:',
    'order.transactionId': 'Kitambulisho cha Muamala:',
    'order.authorizationCode': 'Msimbo wa Ruhusa:',
    'order.paymentDate': 'Tarehe ya Malipo:',
    'order.paymentTime': 'Muda wa Malipo:',
    'order.status': 'Hali:',
    'order.completed': 'Imekamilika',
    'order.processingFee': 'Ada ya Usindikaji:',
    'order.orderDetails': 'Maelezo ya Agizo',
    'order.orderNumber': 'Nambari ya Agizo:',
    'order.viewOrders': 'Angalia Maagizo Yangu',
    'order.trackOrder': 'Fuatilia Agizo',
    'order.printReceipt': 'Chapisha Stakabadhi',
    
    // Security & Trust
    'security.secure': 'Salama',
    'security.sslProtected': 'Imelindwa na SSL',
    'security.verified': 'Imethibitishwa',
    'security.moneyBack': 'Ahadi ya kurudisha pesa kwa siku 30',
    'security.priceProtection': 'Ulinzi wa Bei Unatumika',
    'security.pricesLocked': 'Bei zimefungwa kwa dakika 15 zijazo',
  }
};

// Translation context
const TranslationContext = createContext();

// Translation provider component
export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('energyhub_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);
  
  // Save language preference to localStorage
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('energyhub_language', language);
  };
  
  // Translation function with parameter substitution
  const t = (key, params = {}, defaultValue = key) => {
    let translation = translations[currentLanguage]?.[key] || translations.en[key] || defaultValue;
    
    // Replace parameters in the translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };
  
  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
    ]
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export default TranslationProvider;
