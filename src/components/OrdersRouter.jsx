import React from 'react';
import { useAuth } from '../components/ui/AuthenticationRouter';
import { Navigate } from 'react-router-dom';
import B2CBuyerOrders from '../pages/b2c-buyer-orders';
import B2BSellerOrders from '../pages/b2b-seller-orders';

const OrdersRouter = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/authentication-login-register" replace />;
  }

  // Route based on user role
  if (user?.role === 'seller' || user?.role === 'b2b') {
    return <B2BSellerOrders />;
  } else if (user?.role === 'buyer' || user?.role === 'b2c') {
    return <B2CBuyerOrders />;
  } else {
    // Default to buyer orders for users without a specific role
    return <B2CBuyerOrders />;
  }
};

export default OrdersRouter;
