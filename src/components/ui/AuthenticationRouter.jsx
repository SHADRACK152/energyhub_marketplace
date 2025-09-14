import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Authentication Context
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem('energyhub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('energyhub_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('energyhub_user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('energyhub_token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('energyhub_user');
    localStorage.removeItem('energyhub_token');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('energyhub_user', JSON.stringify(updatedUserData));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/authentication-login-register" state={{ from: location }} replace />;
  }

  // If user is authenticated but doesn't have required role
  if (isAuthenticated && allowedRoles?.length > 0) {
    const userRole = user?.role;
    if (!allowedRoles?.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      if (userRole === 'seller' || userRole === 'b2b') {
        return <Navigate to="/b2b-seller-dashboard" replace />;
      } else if (userRole === 'buyer' || userRole === 'b2c') {
        return <Navigate to="/b2c-buyer-dashboard" replace />;
      } else {
        return <Navigate to="/landing-page" replace />;
      }
    }
  }

  return children;
};

// Public Route Component (redirects authenticated users)
export const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'seller' || user?.role === 'b2b') {
      return <Navigate to="/b2b-seller-dashboard" replace />;
    } else if (user?.role === 'buyer' || user?.role === 'b2c') {
      return <Navigate to="/b2c-buyer-dashboard" replace />;
    }
  }

  return children;
};

// Role-based redirect component
export const RoleBasedRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/landing-page" replace />;
  }

  // Redirect based on user role
  if (user?.role === 'seller' || user?.role === 'b2b') {
    return <Navigate to="/b2b-seller-dashboard" replace />;
  } else if (user?.role === 'buyer' || user?.role === 'b2c') {
    return <Navigate to="/b2c-buyer-dashboard" replace />;
  }

  // Default redirect for unknown roles
  return <Navigate to="/landing-page" replace />;
};