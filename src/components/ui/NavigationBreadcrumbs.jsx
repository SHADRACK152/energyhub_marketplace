import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  // Define breadcrumb mappings for seller routes
  const breadcrumbMappings = {
    '/b2b-seller-dashboard': [
      { label: 'Dashboard', path: '/b2b-seller-dashboard' }
    ],
    '/b2b-inventory-management': [
      { label: 'Dashboard', path: '/b2b-seller-dashboard' },
      { label: 'Inventory Management', path: '/b2b-inventory-management' }
    ]
  };

  // Get current breadcrumbs
  const currentBreadcrumbs = breadcrumbMappings?.[location?.pathname] || [];

  // Don't render breadcrumbs for non-seller routes or single-level routes
  if (currentBreadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {currentBreadcrumbs?.map((breadcrumb, index) => {
          const isLast = index === currentBreadcrumbs?.length - 1;
          
          return (
            <li key={breadcrumb?.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {breadcrumb?.label}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(breadcrumb?.path)}
                  className="hover:text-foreground transition-smooth"
                >
                  {breadcrumb?.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;