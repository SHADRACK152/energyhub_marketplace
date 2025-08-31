import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedHeader = ({ user = null, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  // Public Header for unauthenticated users
  const PublicHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/landing-page')}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">EnergyHub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/product-catalog-search')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/product-catalog-search')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Browse Products
            </button>
            <Button
              variant="outline"
              onClick={() => handleNavigation('/authentication-login-register')}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              onClick={() => handleNavigation('/authentication-login-register')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/product-catalog-search')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                Browse Products
              </button>
              <button
                onClick={() => handleNavigation('/authentication-login-register')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                Sign In
              </button>
              <div className="px-3 py-2">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleNavigation('/authentication-login-register')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // B2B Seller Header
  const SellerHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/b2b-seller-dashboard')}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">EnergyHub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/b2b-seller-dashboard')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/b2b-seller-dashboard')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/b2b-inventory-management')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/b2b-inventory-management')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Inventory
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Orders
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Analytics
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <span className="text-sm font-medium">{user?.name || 'Seller'}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/b2b-seller-dashboard')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/b2b-seller-dashboard')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('/b2b-inventory-management')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/b2b-inventory-management')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Inventory
              </button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
                Orders
              </button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
                Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // B2C Buyer Header
  const BuyerHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/b2c-buyer-dashboard')}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">EnergyHub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/b2c-buyer-dashboard')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/b2c-buyer-dashboard')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/product-catalog-search')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/product-catalog-search')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Browse
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Orders
            </button>

            {/* Cart and User */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <span className="text-sm font-medium">{user?.name || 'Buyer'}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/b2c-buyer-dashboard')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/b2c-buyer-dashboard')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('/product-catalog-search')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/product-catalog-search')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Browse
              </button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
                Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // Determine which header to render based on user role
  if (!user) {
    return <PublicHeader />;
  }

  if (user?.role === 'seller' || user?.role === 'b2b') {
    return <SellerHeader />;
  }

  if (user?.role === 'buyer' || user?.role === 'b2c') {
    return <BuyerHeader />;
  }

  // Default to public header
  return <PublicHeader />;
};

export default RoleBasedHeader;