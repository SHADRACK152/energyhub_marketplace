import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AuthenticationPage from './pages/authentication-login-register';
import LandingPage from './pages/landing-page';
import B2BInventoryManagement from './pages/b2b-inventory-management';
import ProductCatalogSearch from './pages/product-catalog-search';
import B2CBuyerDashboard from './pages/b2c-buyer-dashboard';

import B2BSellerDashboard from './pages/b2b-seller-dashboard';
import ProductDetailPage from './pages/product-detail-page';
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import OrdersPage from './pages/orders';

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
        <Route path="/b2b-inventory-management" element={<B2BInventoryManagement />} />
        <Route path="/product-catalog-search" element={<ProductCatalogSearch />} />
        <Route path="/b2c-buyer-dashboard" element={<B2CBuyerDashboard />} />
        <Route path="/b2b-seller-dashboard" element={<B2BSellerDashboard />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/product-detail-page/:productId" element={<ProductDetailPage />} />
  <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
  <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;