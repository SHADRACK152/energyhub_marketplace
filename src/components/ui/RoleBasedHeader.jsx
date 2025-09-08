import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthenticationRouter';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useTranslation } from '../../utils/i18n.jsx';

const RoleBasedHeader = ({ user = null, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
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
              type="button"
              onClick={() => handleNavigation('/product-catalog-search')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/product-catalog-search')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('products.browse')}
            </button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleNavigation('/authentication-login-register')}
            >
              {t('nav.signin')}
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => handleNavigation('/authentication-login-register')}
            >
              {t('nav.signup')}
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
  const { logout } = useAuth();
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
              {t('nav.dashboard')}
            </button>
            <button
              onClick={() => handleNavigation('/b2b-inventory-management')}
              className={`text-sm font-medium transition-smooth ${
                isActive('/b2b-inventory-management')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.inventory')}
            </button>
            <button
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => handleNavigation('/orders')}
            >
              {t('nav.orders')}
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              {t('nav.analytics')}
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
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/landing-page'); }}>
                  Logout
                </Button>
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
              <button
                className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
                onClick={() => handleNavigation('/orders')}
              >
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

// ProfileDropdown component
function ProfileDropdown({ user, onNavigate, onLogout }) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const { t } = useTranslation();
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  
  const dropdownItems = [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: 'Home',
      action: () => {
        onNavigate('/b2c-buyer-dashboard');
        setOpen(false);
      }
    },
    {
      id: 'browse',
      label: t('nav.browse'),
      icon: 'Search',
      action: () => {
        onNavigate('/product-catalog-search');
        setOpen(false);
      }
    },
    {
      id: 'orders',
      label: t('nav.orders'),
      icon: 'Package',
      badge: '2',
      action: () => {
        onNavigate('/orders');
        setOpen(false);
      }
    },
    {
      id: 'account',
      label: t('nav.profile'),
      icon: 'Settings',
      action: () => {
        onNavigate('/profile-settings');
        setOpen(false);
      }
    },
    {
      id: 'logout',
      label: t('nav.logout'),
      icon: 'LogOut',
      action: () => {
        onLogout();
        setOpen(false);
      },
      className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 hover:bg-muted rounded-lg px-2 py-1 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20"
        onClick={() => setOpen(!open)}
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.name || 'Shadrack Emadau'}
          </div>
          <div className="text-xs text-muted-foreground">
            {user?.email || 'shadrack@energyhub.com'}
          </div>
        </div>
        <Icon 
          name={open ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground transition-transform duration-200" 
        />
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-lg z-50 animate-fade-in-up">
          {/* Profile Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Icon name="User" size={20} color="white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">
                  {user?.name || 'Shadrack Emadau'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user?.email || 'shadrack@energyhub.com'}
                </div>
                <div className="text-xs text-primary font-medium">
                  Energy Buyer
                </div>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            {dropdownItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-smooth ${
                  item.className || 'text-foreground hover:text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item.icon} size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

  // B2C Buyer Header
  const BuyerHeader = () => (
  <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => { console.log('Dashboard nav clicked'); handleNavigation('/b2c-buyer-dashboard'); }}
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
              onClick={() => { console.log('Dashboard nav clicked'); handleNavigation('/b2c-buyer-dashboard'); }}
              className={`text-sm font-medium transition-smooth ${
                isActive('/b2c-buyer-dashboard')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.dashboard')}
            </button>
            <button
              onClick={() => { console.log('Browse nav clicked'); handleNavigation('/product-catalog-search'); }}
              className={`text-sm font-medium transition-smooth ${
                isActive('/product-catalog-search')
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.browse')}
            </button>
            <button
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => { console.log('Orders nav clicked'); handleNavigation('/orders'); }}
            >
              {t('nav.orders')}
            </button>

            {/* Cart, Notifications, and User */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative cart-fly-target"
                onClick={() => handleNavigation('/shopping-cart-checkout')}
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>
              <NotificationsBell />
              <ProfileDropdown 
                user={user} 
                onNavigate={handleNavigation} 
                onLogout={() => { console.log('Logout nav clicked'); logout(); navigate('/landing-page'); }}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative cart-fly-target"
              onClick={() => handleNavigation('/shopping-cart-checkout')}
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
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
            {/* Profile Section */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">
                    {user?.name || 'Shadrack Emadau'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Energy Buyer
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { handleNavigation('/b2c-buyer-dashboard'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/b2c-buyer-dashboard')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Home" size={18} />
                <span>EnergyHub Dashboard</span>
              </button>
              <button
                onClick={() => { handleNavigation('/product-catalog-search'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-base font-medium rounded-md transition-smooth ${
                  isActive('/product-catalog-search')
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Search" size={18} />
                <span>Browse</span>
              </button>
              <button
                onClick={() => { handleNavigation('/orders'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Package" size={18} />
                  <span>Orders</span>
                </div>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  2
                </span>
              </button>
              <button
                onClick={() => { handleNavigation('/profile-settings'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name="Settings" size={18} />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => { logout(); navigate('/landing-page'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-smooth"
              >
                <Icon name="LogOut" size={18} />
                <span>Logout</span>
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
  if (user.role === 'seller') {
    return <SellerHeader />;
  }
  // Default to buyer header
  return <BuyerHeader />;
};

// NotificationsBell component (must be outside RoleBasedHeader)
function NotificationsBell() {
  const [open, setOpen] = React.useState(false);
  // Example notifications
  const notifications = [
    { id: 1, message: 'Order #ORD-2024-001 has shipped.' },
    { id: 2, message: 'Order #ORD-2024-002 is now processing.' },
    { id: 3, message: 'Order #ORD-2024-003 delivered.' },
  ];
  return (
    <div className="relative">
      <button
        className="relative focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-label="Notifications"
      >
        <Icon name="Bell" size={22} className="text-primary" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notifications.length}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-border rounded-xl shadow-lg z-50 animate-fade-in-up">
          <div className="p-3 border-b border-border font-semibold text-primary">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-muted-foreground">No notifications</li>
            ) : (
              notifications.map(n => (
                <li key={n.id} className="px-4 py-3 border-b border-border last:border-b-0 text-sm text-foreground hover:bg-primary/5 cursor-pointer">
                  {n.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}


export default RoleBasedHeader;