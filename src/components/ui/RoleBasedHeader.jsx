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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for Solar Panel System',
      time: '5 minutes ago',
      icon: 'Package',
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: '$3,486.68 payment received for Order #1757506143104',
      time: '1 hour ago',
      icon: 'DollarSign',
      unread: true
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low Inventory Alert',
      message: 'Tesla Powerwall 2 is running low (3 units remaining)',
      time: '2 hours ago',
      icon: 'AlertTriangle',
      unread: false
    }
  ]);
  
  // Modal states for profile dropdown features
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  // B2B Profile editing state with comprehensive fields
  const [editProfile, setEditProfile] = useState({
    name: user?.name || 'kill dem',
    email: user?.email || 'kim@gmail.com',
    phone: user?.phone || '+1 (555) 123-4567',
    company: user?.company || 'EnergyHub Solutions LLC',
    address: user?.address || '123 Energy Street, San Francisco, CA 94102',
    businessType: user?.businessType || 'manufacturer',
    bio: user?.bio || 'Leading provider of renewable energy solutions with focus on solar panels, battery storage, and smart grid technologies.',
    currency: user?.currency || 'USD',
    timezone: user?.timezone || 'UTC',
    language: user?.language || 'en'
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.profile-dropdown')) {
        setShowProfileSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                {t('products.browse')}
              </button>
              <button
                onClick={() => handleNavigation('/authentication-login-register')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                {t('nav.signin')}
              </button>
              <div className="px-3 py-2">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleNavigation('/authentication-login-register')}
                >
                  {t('nav.getStarted')}
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
              {/* Ena Chat quick open */}
              <div>
                <button
                  onClick={() => window.openEnaChat && window.openEnaChat()}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  title={t('ena.open')}
                >
                  <Icon name="MessageCircle" size={18} />
                </button>
              </div>
              {/* Notifications */}
              <div className="relative notifications-dropdown">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Bell" size={20} />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowNotifications(false)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon 
                              name={notification.icon} 
                              size={16} 
                              className={`mt-0.5 ${
                                notification.type === 'order' ? 'text-blue-600' :
                                notification.type === 'payment' ? 'text-green-600' :
                                'text-orange-600'
                              }`} 
                            />
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${notification.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setShowNotifications(false);
                          // Mark all as read
                          const updatedNotifications = notifications.map(n => ({...n, unread: false}));
                          setNotifications(updatedNotifications);
                          
                          // Navigate to notifications page or show all notifications
                          alert('All notifications marked as read!\nRedirecting to notifications page...');
                          // In real app: navigate('/notifications');
                        }}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setShowProfileSettings(!showProfileSettings)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'S'}
                  </div>
                  <span className="text-sm font-medium text-foreground">{user?.name || 'Seller'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {/* Profile Dropdown */}
                {showProfileSettings && (
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold">
                          {user?.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user?.name || 'Seller'}</p>
                          <p className="text-sm text-muted-foreground">{user?.email || 'seller@energyhub.com'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setEditProfile({...user, name: user?.name || 'kill dem', email: user?.email || 'kim@gmail.com'});
                          setShowProfileModal(true);
                          setShowProfileSettings(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Icon name="User" size={16} />
                        <span className="text-sm">Profile Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowAccountModal(true);
                          setShowProfileSettings(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Icon name="Settings" size={16} />
                        <span className="text-sm">Account Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowNotificationModal(true);
                          setShowProfileSettings(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Icon name="Bell" size={16} />
                        <span className="text-sm">Notification Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowHelpModal(true);
                          setShowProfileSettings(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Icon name="HelpCircle" size={16} />
                        <span className="text-sm">Help & Support</span>
                      </button>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to logout?')) {
                              logout();
                              navigate('/landing-page');
                            }
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 flex items-center gap-2 text-red-600"
                        >
                          <Icon name="LogOut" size={16} />
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
    return (
      <>
        <SellerHeader />
        
        {/* Enhanced B2B Profile Settings Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Profile Settings</h3>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {/* Profile Photo Section */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-2xl font-bold text-white">{editProfile?.name?.charAt(0) || 'K'}</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-primary/90 transition-all">
                    <Icon name="Camera" size={16} color="white" />
                  </button>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-1">Profile Photo</h4>
                  <p className="text-sm text-muted-foreground mb-3">Update your profile photo to personalize your seller account</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Upload Photo</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={editProfile.name || ''}
                      onChange={(e) => setEditProfile(prev => ({...prev, name: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input 
                      type="email"
                      value={editProfile.email || ''}
                      onChange={(e) => setEditProfile(prev => ({...prev, email: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={editProfile.phone || ''}
                      onChange={(e) => setEditProfile(prev => ({...prev, phone: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <input 
                      type="text"
                      value={editProfile.company || ''}
                      onChange={(e) => setEditProfile(prev => ({...prev, company: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Location</label>
                    <input 
                      type="text"
                      value={editProfile.address || ''}
                      onChange={(e) => setEditProfile(prev => ({...prev, address: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter your business location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                    <select 
                      value={editProfile.businessType || 'manufacturer'}
                      onChange={(e) => setEditProfile(prev => ({...prev, businessType: e.target.value}))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="retailer">Retailer</option>
                      <option value="installer">Installer</option>
                      <option value="consultant">Consultant</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Business Description</label>
                  <textarea
                    value={editProfile.bio || ''}
                    onChange={(e) => setEditProfile(prev => ({...prev, bio: e.target.value}))}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Describe your business and specializations..."
                  />
                </div>

                {/* Business Settings */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Business Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Primary Currency</label>
                      <select 
                        value={editProfile.currency || 'USD'}
                        onChange={(e) => setEditProfile(prev => ({...prev, currency: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="KES">KES (KSh)</option>
                        <option value="NGN">NGN (₦)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Time Zone</label>
                      <select 
                        value={editProfile.timezone || 'UTC'}
                        onChange={(e) => setEditProfile(prev => ({...prev, timezone: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="UTC">UTC</option>
                        <option value="Africa/Nairobi">Africa/Nairobi</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                      <select 
                        value={editProfile.language || 'en'}
                        onChange={(e) => setEditProfile(prev => ({...prev, language: e.target.value}))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="en">English</option>
                        <option value="sw">Swahili</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => {
                      // Update the user info in local storage and UI
                      const updatedUser = { ...user, ...editProfile };
                      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
                      
                      setShowProfileModal(false);
                      alert(`✅ B2B Profile updated successfully!\n\n📋 Business Info:\n• Name: ${editProfile.name}\n• Email: ${editProfile.email}\n• Company: ${editProfile.company}\n• Business Type: ${editProfile.businessType}\n• Currency: ${editProfile.currency}`);
                      
                      // Refresh to show updated info
                      window.location.reload();
                    }}
                    className="flex-1"
                  >
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Modal */}
        {showAccountModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
                <button 
                  onClick={() => setShowAccountModal(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Security Settings</h4>
                  <button 
                    onClick={() => {
                      const newPassword = prompt('Enter new password:');
                      if (newPassword) {
                        localStorage.setItem('userPassword', btoa(newPassword)); // Basic encoding
                        alert('Password updated successfully!');
                      }
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <Icon name="Key" size={16} />
                    <span className="text-sm">Change Password</span>
                  </button>
                  <button 
                    onClick={() => {
                      const current2FA = localStorage.getItem('twoFactorEnabled') === 'true';
                      localStorage.setItem('twoFactorEnabled', !current2FA);
                      alert(`Two-Factor Authentication ${!current2FA ? 'enabled' : 'disabled'} successfully!`);
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <Icon name="Shield" size={16} />
                    <span className="text-sm">Two-Factor Authentication</span>
                    <span className="text-xs text-green-600 ml-auto">
                      {localStorage.getItem('twoFactorEnabled') === 'true' ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Privacy Settings</h4>
                  <button 
                    onClick={() => {
                      const currentVisibility = localStorage.getItem('profileVisibility') || 'public';
                      const newVisibility = currentVisibility === 'public' ? 'private' : 'public';
                      localStorage.setItem('profileVisibility', newVisibility);
                      alert(`Profile visibility set to ${newVisibility}`);
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <Icon name="Eye" size={16} />
                    <span className="text-sm">Profile Visibility</span>
                    <span className="text-xs text-blue-600 ml-auto">
                      {localStorage.getItem('profileVisibility') || 'Public'}
                    </span>
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Do you want to download your data?')) {
                        const userData = {
                          profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
                          settings: {
                            twoFactor: localStorage.getItem('twoFactorEnabled'),
                            visibility: localStorage.getItem('profileVisibility'),
                            notifications: localStorage.getItem('notificationSettings')
                          }
                        };
                        
                        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'my-data.json';
                        a.click();
                        URL.revokeObjectURL(url);
                      }
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <Icon name="Database" size={16} />
                    <span className="text-sm">Data & Privacy</span>
                  </button>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAccountModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings Modal */}
        {showNotificationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
                <button 
                  onClick={() => setShowNotificationModal(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    <span className="text-sm font-medium">Email Notifications</span>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={localStorage.getItem('emailNotifications') !== 'false'}
                    onChange={(e) => localStorage.setItem('emailNotifications', e.target.checked)}
                    className="rounded" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={16} />
                    <span className="text-sm font-medium">SMS Notifications</span>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={localStorage.getItem('smsNotifications') !== 'false'}
                    onChange={(e) => localStorage.setItem('smsNotifications', e.target.checked)}
                    className="rounded" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="ShoppingCart" size={16} />
                    <span className="text-sm font-medium">Order Updates</span>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={localStorage.getItem('orderNotifications') !== 'false'}
                    onChange={(e) => localStorage.setItem('orderNotifications', e.target.checked)}
                    className="rounded" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} />
                    <span className="text-sm font-medium">Payment Alerts</span>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={localStorage.getItem('paymentNotifications') !== 'false'}
                    onChange={(e) => localStorage.setItem('paymentNotifications', e.target.checked)}
                    className="rounded" 
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNotificationModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => {
                      setShowNotificationModal(false);
                      alert('Notification preferences saved!');
                    }}
                    className="flex-1"
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Help & Support</h3>
                <button 
                  onClick={() => setShowHelpModal(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    window.open('tel:1-800-ENERGY-HUB', '_self');
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Icon name="Phone" size={16} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Call Support</div>
                    <div className="text-xs text-muted-foreground">1-800-ENERGY-HUB</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    alert(t('help.liveChatAlert') || 'Live Chat feature coming soon! For immediate assistance, please call 1-800-ENERGY-HUB');
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Icon name="MessageCircle" size={16} className="text-green-600" />
                  <div>
                    <div className="font-medium text-sm">{t('help.liveChat') || 'Live Chat'}</div>
                    <div className="text-xs text-muted-foreground">{t('help.liveChatDesc') || 'Chat with our support team'}</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    const subject = 'Support Request - EnergyHub Marketplace';
                    const body = `Hi EnergyHub Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nUser: ${user?.name || 'kill dem'}\nEmail: ${user?.email || 'kim@gmail.com'}\n\nThank you!`;
                    window.open(`mailto:support@energyhub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Icon name="Mail" size={16} className="text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Email Support</div>
                    <div className="text-xs text-muted-foreground">support@energyhub.com</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    window.open('https://docs.energyhub.com', '_blank');
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Icon name="Book" size={16} className="text-orange-600" />
                  <div>
                    <div className="font-medium text-sm">Documentation</div>
                    <div className="text-xs text-muted-foreground">Browse our help articles</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    const issue = prompt('Please describe the issue you want to report:');
                    if (issue) {
                      const reportData = {
                        user: user?.name || 'kill dem',
                        email: user?.email || 'kim@gmail.com',
                        issue: issue,
                        timestamp: new Date().toISOString(),
                        userAgent: navigator.userAgent
                      };
                      
                      // In real app, send to API
                      console.log('Issue Report:', reportData);
                      alert('Issue reported successfully! Our team will investigate and get back to you.');
                    }
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Icon name="MessageSquare" size={16} className="text-red-600" />
                  <div>
                    <div className="font-medium text-sm">Report Issue</div>
                    <div className="text-xs text-muted-foreground">Report a bug or problem</div>
                  </div>
                </button>

                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHelpModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
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