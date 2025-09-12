import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileTabBar = ({ user, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  // Only show for B2C buyers on mobile
  if (!user || (user?.role !== 'buyer' && user?.role !== 'b2c')) {
    return null;
  }

  const isActive = (path) => location?.pathname === path;

  const tabs = [
    {
      id: 'browse',
      label: 'Browse',
      path: '/product-catalog-search',
      icon: 'Search',
    },
    {
      id: 'cart',
      label: 'Cart',
      path: '/cart',
      icon: 'ShoppingCart',
      badge: 2,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/b2c-buyer-dashboard',
      icon: 'Home',
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/orders',
      icon: 'Package',
    },
    {
      id: 'account',
      label: 'Account',
      path: '/account',
      icon: 'User',
    },
    // Ena chat quick-open for mobile
    {
      id: 'ena',
      label: 'Ena',
      path: '#',
      icon: 'MessageCircle',
      action: () => window.openEnaChat && window.openEnaChat()
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
      <div className="flex items-center justify-around px-2 py-2">
    {tabs?.map((tab) => {
          const active = isActive(tab?.path);
          
          return (
            <button
              key={tab?.id}
      onClick={() => (tab?.action ? tab.action() : handleNavigation(tab?.path))}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-md transition-smooth ${
                active
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={tab?.icon} 
                  size={20} 
                  className={active ? 'text-primary' : 'text-current'} 
                />
                {tab?.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {tab?.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate ${
                active ? 'text-primary' : 'text-current'
              }`}>
                {tab?.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;