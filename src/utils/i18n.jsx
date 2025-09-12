// Simple internationalization system for EnergyHub
import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation definitions
const translations = {
  en: {
    // Landing Page Hero Section
    'hero.title': 'The World\'s Leading Energy Marketplace',
    'hero.tagline1': 'Empowering Clean Energy Futures.',
    'hero.tagline2': 'Connecting Buyers & Sellers Globally.',
    'hero.tagline3': 'Your Marketplace for Solar, Storage & More.',
    'hero.description': 'Connect with trusted energy product suppliers and discover cutting-edge solar panels, batteries, and inverters. Join thousands of businesses and homeowners building a sustainable future.',
    'hero.signupSeller': 'Sign Up as Seller',
    'hero.signupBuyer': 'Sign Up as Buyer',
    'hero.browseProducts': 'Browse products without signing up →',
    'hero.featuredIn': 'Featured In',

    // Footer Section
    'footer.newsletter.title': 'Stay Updated',
    'footer.newsletter.subtitle': 'Subscribe to our newsletter for the latest energy products and industry insights.',
    'footer.newsletter.placeholder': 'Enter your email address',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.newsletter.subscribing': 'Subscribing...',
    'footer.newsletter.success': 'Successfully subscribed to newsletter!',
    'footer.newsletter.error': 'Failed to subscribe. Please try again.',
    'footer.newsletter.invalidEmail': 'Please enter a valid email address',
    'footer.newsletter.enterEmail': 'Please enter your email address',

    // Footer Links
    'footer.marketplace': 'Marketplace',
    'footer.browseProducts': 'Browse Products',
    'footer.solarPanels': 'Solar Panels',
    'footer.batteries': 'Batteries',
    'footer.inverters': 'Inverters',
    
    'footer.sellers': 'For Sellers',
    'footer.becomeSeller': 'Become a Seller',
    'footer.sellerDashboard': 'Seller Dashboard',
    'footer.inventoryManagement': 'Inventory Management',
    'footer.sellerResources': 'Seller Resources',
    
    'footer.buyers': 'For Buyers',
    'footer.buyerDashboard': 'Buyer Dashboard',
    'footer.howToBuy': 'How to Buy',
    'footer.bulkOrders': 'Bulk Orders',
    'footer.installationServices': 'Installation Services',
    
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.contactUs': 'Contact Us',
    'footer.liveChat': 'Live Chat',
    'footer.documentation': 'Documentation',
    
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.blog': 'Blog',
    
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.compliance': 'Compliance',

    // Footer Contact & Social
    'footer.contact.email': 'contact@energyhub.com',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.address': 'San Francisco, CA',
    'footer.description': 'The world\'s leading marketplace for energy products. Connecting verified sellers with global buyers for solar panels, batteries, inverters, and more.',
    'footer.copyright': '© 2025 EnergyHub Marketplace. All rights reserved.',
    
    // Trust Badges
    'footer.trust.sslSecured': 'SSL Secured',
    'footer.trust.isoCertified': 'ISO Certified',
    'footer.trust.support247': '24/7 Support',
    'footer.trust.verifiedSellers': 'Verified Sellers',

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
  // Additional profile UI strings
  'profile.photo': 'Profile Photo',
  'profile.photoDescription': 'Update your profile photo to personalize your account',
  'profile.uploadPhoto': 'Upload Photo',
  'profile.removePhoto': 'Remove',
  'profile.changePassword': 'Change Password',
  'profile.changePasswordDesc': 'Ensure your account stays secure with a strong password',
  'profile.passwordRequirementsTitle': 'Password Requirements:',
  'profile.passwordRequirement1': 'At least 8 characters long',
  'profile.passwordRequirement2': 'Include uppercase and lowercase letters',
  'profile.passwordRequirement3': 'Include at least one number',
    
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

  // Testimonials / Landing CTAs
  'testimonials.title': 'Success Stories from Our Community',
  'testimonials.subtitle': 'Discover how EnergyHub is empowering businesses and individuals to achieve their energy goals',
  'testimonials.sellers': 'Seller Stories',
  'testimonials.buyers': 'Buyer Stories',
  'testimonials.ctaTitle': 'Ready to Join Our Success Stories?',
  'testimonials.ctaSubtitle': "Whether you're looking to sell energy products or find the perfect solution for your needs, EnergyHub is here to help you succeed.",
  'testimonials.startSelling': 'Start Selling Today',
  // Coming Soon
  'comingSoon.title': 'Coming Soon',
  'comingSoon.description': "We're working hard to bring you this feature. Stay tuned for updates!",
  'comingSoon.goHome': 'Go to Homepage',
  'comingSoon.contactUs': 'Contact Us',
  'comingSoon.inTheMeantime': 'In the meantime...',
  // Misc
  'misc.featureComingSoon': 'Feature coming soon!',
  // Ena chatbot
  'ena.title': 'Ena — Help Assistant',
  'ena.welcome': 'Hi, I\'m Ena. How can I help buyers and sellers today?',
  'ena.cannedResponse': 'Here are some quick links and tips. You can ask about products, orders, or selling.',
  'ena.howToBuy': 'How do I buy?',
  'ena.howToSell': 'How do I sell?',
  'ena.contactSupport': 'Contact support',
  'ena.open': 'Open Ena chat',
  'ena.placeholder': 'Type a question or choose a suggestion',
  'ena.send': 'Send',
  // Coming Soon
  'comingSoon.title': 'Coming Soon',
  'comingSoon.description': "We're working hard to bring you this feature. Stay tuned for updates!",
    
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
  'actions.back': 'Back',
    
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

  es: {
    // Landing Page Hero Section (Spanish)
    'hero.title': 'El Marketplace Líder Mundial de Energía',
    'hero.tagline1': 'Impulsando Futuros de Energía Limpia.',
    'hero.tagline2': 'Conectando Compradores y Vendedores Globalmente.',
    'hero.tagline3': 'Tu Marketplace para Solar, Almacenamiento y Más.',
    'hero.description': 'Conecta con proveedores de productos energéticos de confianza y descubre paneles solares, baterías e inversores de última tecnología. Únete a miles de empresas y propietarios construyendo un futuro sostenible.',
    'hero.signupSeller': 'Registrarse como Vendedor',
    'hero.signupBuyer': 'Registrarse como Comprador',
    'hero.browseProducts': 'Navegar productos sin registrarse →',
    'hero.featuredIn': 'Destacado En',

    // Footer Section (Spanish)
    'footer.newsletter.title': 'Mantente Actualizado',
    'footer.newsletter.subtitle': 'Suscríbete a nuestro boletín para los últimos productos energéticos y conocimientos de la industria.',
    'footer.newsletter.placeholder': 'Ingresa tu dirección de correo electrónico',
    'footer.newsletter.subscribe': 'Suscribirse',
    'footer.newsletter.subscribing': 'Suscribiendo...',
    'footer.newsletter.success': '¡Suscripción exitosa al boletín!',
    'footer.newsletter.error': 'Error al suscribirse. Inténtalo de nuevo.',
    'footer.newsletter.invalidEmail': 'Por favor ingresa un correo electrónico válido',
    'footer.newsletter.enterEmail': 'Por favor ingresa tu dirección de correo electrónico',

    // Footer Links (Spanish)
    'footer.marketplace': 'Marketplace',
    'footer.browseProducts': 'Navegar Productos',
    'footer.solarPanels': 'Paneles Solares',
    'footer.batteries': 'Baterías',
    'footer.inverters': 'Inversores',
    
    'footer.sellers': 'Para Vendedores',
    'footer.becomeSeller': 'Convertirse en Vendedor',
    'footer.sellerDashboard': 'Panel del Vendedor',
    'footer.inventoryManagement': 'Gestión de Inventario',
    'footer.sellerResources': 'Recursos para Vendedores',
    
    'footer.buyers': 'Para Compradores',
    'footer.buyerDashboard': 'Panel del Comprador',
    'footer.howToBuy': 'Cómo Comprar',
    'footer.bulkOrders': 'Pedidos al Por Mayor',
    'footer.installationServices': 'Servicios de Instalación',
    
    'footer.support': 'Soporte',
    'footer.helpCenter': 'Centro de Ayuda',
    'footer.contactUs': 'Contáctanos',
    'footer.liveChat': 'Chat en Vivo',
    'footer.documentation': 'Documentación',
    
    'footer.company': 'Empresa',
    'footer.aboutUs': 'Acerca de Nosotros',
    'footer.careers': 'Carreras',
    'footer.press': 'Prensa',
    'footer.blog': 'Blog',
    
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Política de Privacidad',
    'footer.termsOfService': 'Términos de Servicio',
    'footer.cookiePolicy': 'Política de Cookies',
    'footer.compliance': 'Cumplimiento',

    // Footer Contact & Social (Spanish)
    'footer.contact.email': 'contacto@energyhub.com',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.address': 'San Francisco, CA',
    'footer.description': 'El marketplace líder mundial para productos energéticos. Conectando vendedores verificados con compradores globales para paneles solares, baterías, inversores y más.',
    'footer.copyright': '© 2025 EnergyHub Marketplace. Todos los derechos reservados.',
    
    // Trust Badges (Spanish)
    'footer.trust.sslSecured': 'SSL Seguro',
    'footer.trust.isoCertified': 'Certificado ISO',
    'footer.trust.support247': 'Soporte 24/7',
    'footer.trust.verifiedSellers': 'Vendedores Verificados',
  'comingSoon.title': 'Próximamente',
  'comingSoon.description': 'Estamos trabajando para traerle esta función. ¡Esté atento a las actualizaciones!',
  'misc.featureComingSoon': '¡Función próximamente!',
  },

  fr: {
    // Landing Page Hero Section (French)
    'hero.title': 'La Marketplace Énergétique Leader Mondial',
    'hero.tagline1': 'Autonomiser les Futurs d\'Énergie Propre.',
    'hero.tagline2': 'Connecter Acheteurs et Vendeurs Mondialement.',
    'hero.tagline3': 'Votre Marketplace pour le Solaire, le Stockage et Plus.',
    'hero.description': 'Connectez-vous avec des fournisseurs de produits énergétiques de confiance et découvrez des panneaux solaires, batteries et onduleurs de pointe. Rejoignez des milliers d\'entreprises et propriétaires construisant un avenir durable.',
    'hero.signupSeller': 'S\'inscrire comme Vendeur',
    'hero.signupBuyer': 'S\'inscrire comme Acheteur',
    'hero.browseProducts': 'Parcourir les produits sans s\'inscrire →',
    'hero.featuredIn': 'En Vedette Dans',

    // Footer Section (French)
    'footer.newsletter.title': 'Restez Informé',
    'footer.newsletter.subtitle': 'Abonnez-vous à notre newsletter pour les derniers produits énergétiques et insights de l\'industrie.',
    'footer.newsletter.placeholder': 'Entrez votre adresse email',
    'footer.newsletter.subscribe': 'S\'abonner',
    'footer.newsletter.subscribing': 'Abonnement...',
    'footer.newsletter.success': 'Abonnement à la newsletter réussi!',
    'footer.newsletter.error': 'Échec de l\'abonnement. Veuillez réessayer.',
    'footer.newsletter.invalidEmail': 'Veuillez entrer un email valide',
    'footer.newsletter.enterEmail': 'Veuillez entrer votre adresse email',

    // Footer Links (French)
    'footer.marketplace': 'Marketplace',
    'footer.browseProducts': 'Parcourir les Produits',
    'footer.solarPanels': 'Panneaux Solaires',
    'footer.batteries': 'Batteries',
    'footer.inverters': 'Onduleurs',
    
    'footer.sellers': 'Pour les Vendeurs',
    'footer.becomeSeller': 'Devenir Vendeur',
    'footer.sellerDashboard': 'Tableau de Bord Vendeur',
    'footer.inventoryManagement': 'Gestion d\'Inventaire',
    'footer.sellerResources': 'Ressources Vendeur',
    
    'footer.buyers': 'Pour les Acheteurs',
    'footer.buyerDashboard': 'Tableau de Bord Acheteur',
    'footer.howToBuy': 'Comment Acheter',
    'footer.bulkOrders': 'Commandes en Gros',
    'footer.installationServices': 'Services d\'Installation',
    
    'footer.support': 'Support',
    'footer.helpCenter': 'Centre d\'Aide',
    'footer.contactUs': 'Nous Contacter',
    'footer.liveChat': 'Chat en Direct',
    'footer.documentation': 'Documentation',
    
    'footer.company': 'Entreprise',
    'footer.aboutUs': 'À Propos',
    'footer.careers': 'Carrières',
    'footer.press': 'Presse',
    'footer.blog': 'Blog',
    
    'footer.legal': 'Légal',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.termsOfService': 'Conditions d\'Utilisation',
    'footer.cookiePolicy': 'Politique des Cookies',
    'footer.compliance': 'Conformité',

    // Footer Contact & Social (French)
    'footer.contact.email': 'contact@energyhub.com',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.address': 'San Francisco, CA',
    'footer.description': 'La marketplace leader mondiale pour les produits énergétiques. Connectant vendeurs vérifiés avec acheteurs globaux pour panneaux solaires, batteries, onduleurs et plus.',
    'footer.copyright': '© 2025 EnergyHub Marketplace. Tous droits réservés.',
    
    // Trust Badges (French)
    'footer.trust.sslSecured': 'SSL Sécurisé',
    'footer.trust.isoCertified': 'Certifié ISO',
    'footer.trust.support247': 'Support 24/7',
    'footer.trust.verifiedSellers': 'Vendeurs Vérifiés',
    'comingSoon.title': 'Bientôt Disponible',
    'comingSoon.description': "Nous travaillons dur pour vous apporter cette fonctionnalité. Restez à l'écoute des mises à jour!",
    'misc.featureComingSoon': 'Fonction bientôt disponible!',
    // Ena chatbot (French fallback)
    'ena.title': 'Ena — Assistant',
    'ena.welcome': 'Bonjour, je suis Ena. Comment puis-je aider acheteurs et vendeurs aujourd\'hui ?',
    'ena.cannedResponse': 'Voici quelques liens rapides et conseils. Vous pouvez demander sur les produits, commandes ou ventes.',
    'ena.howToBuy': 'Comment acheter?',
    'ena.howToSell': 'Comment vendre?',
    'ena.contactSupport': 'Contacter le support',
    'ena.open': 'Ouvrir Ena chat',
    'ena.placeholder': 'Tapez une question ou choisissez une suggestion',
    'ena.send': 'Envoyer',
  },
  
  sw: {
    // Landing Page Hero Section (Swahili)
    'hero.title': 'Soko Kuu la Nishati Duniani',
    'hero.tagline1': 'Kuwezesha Maisha ya Nishati Safi.',
    'hero.tagline2': 'Kuunganisha Wanunuzi na Wauuzaji Ulimwenguni.',
    'hero.tagline3': 'Soko Lako la Jua, Uhifadhi na Zaidi.',
    'hero.description': 'Unganisha na wazalishaji wa bidhaa za nishati wanaoaminika na ugundua paneli za jua, betri, na inverter za hali ya juu. Jiunge na maelfu ya biashara na wamiliki wa nyumba wanajenga mustakabali endelevu.',
    'hero.signupSeller': 'Jisajili kama Muuzaji',
    'hero.signupBuyer': 'Jisajili kama Mnunuzi',
    'hero.browseProducts': 'Tazama bidhaa bila kujisajili →',
    'hero.featuredIn': 'Imeonyeshwa Katika',

    // Footer Section (Swahili)
    'footer.newsletter.title': 'Baki Umejua',
    'footer.newsletter.subtitle': 'Jiandikishe kupokea jarida letu la bidhaa za nishati na maarifa ya sekta.',
    'footer.newsletter.placeholder': 'Ingiza anwani yako ya barua pepe',
    'footer.newsletter.subscribe': 'Jiandikishe',
    'footer.newsletter.subscribing': 'Inaandikisha...',
    'footer.newsletter.success': 'Umeandikishwa kwa jarida kwa mafanikio!',
    'footer.newsletter.error': 'Kushindwa kuandikisha. Jaribu tena.',
    'footer.newsletter.invalidEmail': 'Tafadhali ingiza barua pepe sahihi',
    'footer.newsletter.enterEmail': 'Tafadhali ingiza anwani yako ya barua pepe',

    // Footer Links (Swahili)
    'footer.marketplace': 'Soko',
    'footer.browseProducts': 'Tazama Bidhaa',
    'footer.solarPanels': 'Paneli za Jua',
    'footer.batteries': 'Betri',
    'footer.inverters': 'Inverter',
    
    'footer.sellers': 'Kwa Wauuzaji',
    'footer.becomeSeller': 'Kuwa Muuzaji',
    'footer.sellerDashboard': 'Dashibodi ya Muuzaji',
    'footer.inventoryManagement': 'Udhibiti wa Hesabu',
    'footer.sellerResources': 'Rasilimali za Wauuzaji',
    
    'footer.buyers': 'Kwa Wanunuzi',
    'footer.buyerDashboard': 'Dashibodi ya Mnunuzi',
    'footer.howToBuy': 'Jinsi ya Kununua',
    'footer.bulkOrders': 'Maagizo ya Wingi',
    'footer.installationServices': 'Huduma za Usakinishaji',
    
    'footer.support': 'Msaada',
    'footer.helpCenter': 'Kituo cha Msaada',
    'footer.contactUs': 'Wasiliana Nasi',
    'footer.liveChat': 'Mazungumzo ya Moja kwa Moja',
    'footer.documentation': 'Nyaraka',
    
    'footer.company': 'Kampuni',
    'footer.aboutUs': 'Kutuhusu',
    'footer.careers': 'Kazi',
    'footer.press': 'Waandishi wa Habari',
    'footer.blog': 'Blogu',
    
    'footer.legal': 'Kisheria',
    'footer.privacyPolicy': 'Sera ya Faragha',
    'footer.termsOfService': 'Masharti ya Huduma',
    'footer.cookiePolicy': 'Sera ya Kuki',
    'footer.compliance': 'Utii',

    // Footer Contact & Social (Swahili)
    'footer.contact.email': 'mawasiliano@energyhub.com',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.address': 'San Francisco, CA',
    'footer.description': 'Soko kuu la bidhaa za nishati duniani. Kuunganisha wauuzaji waliohalalishwa na wanunuzi wa kimataifa kwa paneli za jua, betri, inverter na zaidi.',
    'footer.copyright': '© 2025 EnergyHub Marketplace. Haki zote zimehifadhiwa.',
    
    // Trust Badges (Swahili)
    'footer.trust.sslSecured': 'SSL Imehifadhiwa',
    'footer.trust.isoCertified': 'ISO Imethibitishwa',
    'footer.trust.support247': 'Msaada 24/7',
    'footer.trust.verifiedSellers': 'Wauuzaji Waliohalalishwa',

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
  // Additional profile UI strings (Swahili)
  'profile.photo': 'Picha ya Wasifu',
  'profile.photoDescription': 'Sasisha picha yako ya wasifu ili kubinafsisha akaunti yako',
  'profile.uploadPhoto': 'Pakia Picha',
  'profile.removePhoto': 'Ondoa',
  'profile.changePassword': 'Badilisha Nywila',
  'profile.changePasswordDesc': 'Hakikisha akaunti yako inabaki salama kwa kutumia nywila yenye nguvu',
  'profile.passwordRequirementsTitle': 'Mahitaji ya Nywila:',
  'profile.passwordRequirement1': 'Angalau herufi 8',
  'profile.passwordRequirement2': 'Jumuisha herufi kubwa na ndogo',
  'profile.passwordRequirement3': 'Jumuisha angalau nambari 1',
    
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

  // Testimonials / Landing CTAs (Swahili)
  'testimonials.title': 'Hadithi za Mafanikio kutoka Jamii Yetu',
  // Ena chatbot (Swahili)
  'ena.title': 'Ena — Msaidizi',
  'ena.welcome': 'Habari, mimi ni Ena. Naweza kusaidia vipi wanunuzi na wauzaji leo?',
  'ena.cannedResponse': 'Hapa kuna viungo vya haraka na vidokezo. Unaweza kuuliza kuhusu bidhaa, maagizo, au uuzaji.',
  'ena.howToBuy': 'Ninunueje?',
  'ena.howToSell': 'Ninauzaje?',
  'ena.contactSupport': 'Wasiliana na msaada',
  'ena.open': 'Fungua chat ya Ena',
  'ena.placeholder': 'Andika swali au chagua pendekezo',
  'ena.send': 'Tuma',
  'testimonials.subtitle': 'Gundua jinsi EnergyHub inavyowasaidia biashara na watu kufikia malengo yao ya nishati',
  'testimonials.sellers': 'Hadithi za Wauuzaji',
  'testimonials.buyers': 'Hadithi za Wanunuzi',
  'testimonials.ctaTitle': 'Tayari Kujiunga na Hadithi Zetu za Mafanikio?',
  'testimonials.ctaSubtitle': 'Ikiwa unatafuta kuuza bidhaa za nishati au kupata suluhisho kamili kwa mahitaji yako, EnergyHub iko hapa kukusaidia kufanikiwa.',
  'testimonials.startSelling': 'Anza Kuuza Leo',
  // Coming Soon (Swahili)
  'comingSoon.title': 'Inakuja Karibu',
  'comingSoon.description': 'Tunaweka bidii kuleta kipengele hiki kwako. Endelea kufuatilia sasisho!',
  'comingSoon.goHome': 'Nenda Kwenye Nyumbani',
  'comingSoon.contactUs': 'Wasiliana Nasi',
  'comingSoon.inTheMeantime': 'Wakati huo...' ,
    
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
  'actions.back': 'Rudi',
    
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
