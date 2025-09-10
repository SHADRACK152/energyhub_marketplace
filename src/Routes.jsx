import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import { ProtectedRoute } from './components/ui/AuthenticationRouter';
import AuthenticationPage from './pages/authentication-login-register';
import LandingPage from './pages/landing-page';
import B2BInventoryManagement from './pages/b2b-inventory-management';
import ProductCatalogSearch from './pages/product-catalog-search';
import B2CBuyerDashboard from './pages/b2c-buyer-dashboard';
import B2BSellerDashboard from './pages/b2b-seller-dashboard';
import ProductDetailPage from './pages/product-detail-page';
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import OrdersRouter from './components/OrdersRouter';
import OrderConfirmation from './pages/order-confirmation';
import OrderTracking from './pages/order-tracking';
import AccountPage from './pages/AccountPage';
import ProfileSettings from './pages/profile-settings';
import B2BSellerOrders from './pages/b2b-seller-orders';
import B2CBuyerOrders from './pages/b2c-buyer-orders';

// Import legal pages with different names to avoid blocking
import LegalPrivacy from './pages/legal/LegalPrivacy';
import LegalTerms from './pages/legal/LegalTerms';
import LegalCookies from './pages/legal/LegalCookies';

// Import company pages
import AboutUs from './pages/company/AboutUs';
import Careers from './pages/company/Careers';
import Blog from './pages/company/Blog';

// Import support pages
import ContactUs from './pages/support/ContactUs';
import HelpCenter from './pages/support/HelpCenter';
import Documentation from './pages/support/Documentation';
import VideoTutorials from './pages/support/VideoTutorials';
import Webinars from './pages/support/Webinars';
import Certifications from './pages/support/Certifications';

// Import additional company pages
import Press from './pages/company/Press';
import InvestorRelations from './pages/company/InvestorRelations';

// Import seller pages
import SellerResources from './pages/seller/SellerResources';
import MarketingTools from './pages/seller/MarketingTools';
import CommunityForum from './pages/seller/CommunityForum';
import SellerAnalytics from './pages/seller/SellerAnalytics';
import ProductListingGuide from './pages/seller/ProductListingGuide';
import SellerSupport from './pages/seller/SellerSupport';
import BecomeSeller from './pages/seller/BecomeSeller';

// Import additional legal pages
import Compliance from './pages/legal/Compliance';

// Import buyer pages
import HowToBuy from './pages/buyers/HowToBuy';
import BulkOrders from './pages/buyers/BulkOrders';

// Import service pages
import InstallationServices from './pages/services/InstallationServices';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/b2b-inventory-management" element={<ProtectedRoute><B2BInventoryManagement /></ProtectedRoute>} />
        <Route path="/product-catalog-search" element={<ProductCatalogSearch />} />
        <Route path="/b2c-buyer-dashboard" element={<ProtectedRoute allowedRoles={['buyer', 'b2c']}><B2CBuyerDashboard /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        <Route path="/b2b-seller-dashboard" element={<ProtectedRoute allowedRoles={['seller', 'b2b']}><B2BSellerDashboard /></ProtectedRoute>} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/product-detail-page/:productId" element={<ProductDetailPage />} />
  <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
  <Route path="/cart" element={<ShoppingCartCheckout />} />
  <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
  <Route path="/orders" element={<ProtectedRoute><OrdersRouter /></ProtectedRoute>} />
  <Route path="/b2b-seller-orders" element={<ProtectedRoute allowedRoles={['seller', 'b2b']}><B2BSellerOrders /></ProtectedRoute>} />
  <Route path="/b2c-buyer-orders" element={<ProtectedRoute allowedRoles={['buyer', 'b2c']}><B2CBuyerOrders /></ProtectedRoute>} />
  <Route path="/order-tracking/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
  <Route path="/privacy-policy" element={<LegalPrivacy />} />
  <Route path="/terms-of-service" element={<LegalTerms />} />
  <Route path="/cookie-policy" element={<LegalCookies />} />
  <Route path="/about-us" element={<AboutUs />} />
  <Route path="/contact-us" element={<ContactUs />} />
  <Route path="/help-center" element={<HelpCenter />} />
  <Route path="/careers" element={<Careers />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/press" element={<Press />} />
  <Route path="/investor-relations" element={<InvestorRelations />} />
  <Route path="/documentation" element={<Documentation />} />
  <Route path="/compliance" element={<Compliance />} />
  <Route path="/seller-resources" element={<SellerResources />} />
  <Route path="/marketing-tools" element={<ProtectedRoute allowedRoles={['seller']}><MarketingTools /></ProtectedRoute>} />
  <Route path="/community-forum" element={<CommunityForum />} />
  <Route path="/seller-analytics" element={<ProtectedRoute allowedRoles={['seller']}><SellerAnalytics /></ProtectedRoute>} />
  <Route path="/product-listing-guide" element={<ProductListingGuide />} />
  <Route path="/seller-support" element={<SellerSupport />} />
  <Route path="/become-seller" element={<BecomeSeller />} />
  <Route path="/how-to-buy" element={<HowToBuy />} />
  <Route path="/bulk-orders" element={<ProtectedRoute allowedRoles={['buyer', 'b2c', 'seller', 'b2b']}><BulkOrders /></ProtectedRoute>} />
  <Route path="/installation-services" element={<InstallationServices />} />
  <Route path="/video-tutorials" element={<VideoTutorials />} />
  <Route path="/webinars" element={<Webinars />} />
  <Route path="/certifications" element={<Certifications />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;