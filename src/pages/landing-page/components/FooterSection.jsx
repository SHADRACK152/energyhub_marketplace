import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { useToast } from '../../../components/ui/Toast';
import { useAuth } from '../../../components/ui/AuthenticationRouter';

const FooterSection = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const currentYear = new Date()?.getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNavigation = (path) => {
    if (path === '#') {
      showToast('Feature coming soon!');
      return;
    }

    // Dashboard routes that require authentication
    const protectedRoutes = [
      '/b2b-seller-dashboard',
      '/b2c-buyer-dashboard', 
      '/b2b-inventory-management',
      '/account',
      '/profile-settings',
      '/orders',
      '/b2b-seller-orders',
      '/b2c-buyer-orders'
    ];

    // Check if the route requires authentication
    const requiresAuth = protectedRoutes.includes(path);

    if (requiresAuth && !isAuthenticated) {
      // Redirect to login/signup with return path
      showToast('Please login or sign up to access this feature');
      navigate('/authentication-login-register', { 
        state: { from: path, message: 'Please login to access your dashboard' } 
      });
      return;
    }

    // For authenticated users going to dashboard, redirect based on role
    if (isAuthenticated && (path === '/b2b-seller-dashboard' || path === '/b2c-buyer-dashboard')) {
      const userRole = user?.role;
      if (userRole === 'seller' || userRole === 'b2b') {
        navigate('/b2b-seller-dashboard');
      } else if (userRole === 'buyer' || userRole === 'b2c') {
        navigate('/b2c-buyer-dashboard');
      } else {
        // Default dashboard based on path
        navigate(path);
      }
      return;
    }

    navigate(path);
  };

  const handleEmailSubscription = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showToast('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    try {
      // In a real app, this would make an API call to subscribe the user
      // For now, we'll simulate the subscription
      setTimeout(() => {
        showToast('Successfully subscribed to newsletter!');
        setEmail('');
        setIsSubscribing(false);
      }, 1000);
    } catch (error) {
      showToast('Failed to subscribe. Please try again.');
      setIsSubscribing(false);
    }
  };

  const handleContactClick = (type, value) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'phone':
        window.location.href = `tel:${value}`;
        break;
      case 'address':
        window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, '_blank');
        break;
      default:
        break;
    }
  };

  const handleSocialClick = (platform, url) => {
    if (url === '#') {
      showToastMessage(`${platform} page coming soon!`, 'info');
    } else {
      window.open(url, '_blank');
    }
  };

  const footerLinks = {
    marketplace: [
      { label: 'Browse Products', path: '/product-catalog-search' },
      { label: 'Solar Panels', path: '/product-catalog-search?category=solar-panels' },
      { label: 'Batteries', path: '/product-catalog-search?category=batteries' },
      { label: 'Inverters', path: '/product-catalog-search?category=inverters' }
    ],
    sellers: [
      { label: 'Become a Seller', path: '/become-seller' },
      { label: 'Seller Dashboard', path: '/b2b-seller-dashboard' },
      { label: 'Inventory Management', path: '/b2b-inventory-management' },
      { label: 'Seller Resources', path: '/seller-resources' }
    ],
    buyers: [
      { label: 'Buyer Dashboard', path: '/b2c-buyer-dashboard' },
      { label: 'How to Buy', path: '/how-to-buy' },
      { label: 'Bulk Orders', path: '/bulk-orders' },
      { label: 'Installation Services', path: '/installation-services' }
    ],
    support: [
      { label: 'Help Center', path: '/help-center' },
      { label: 'Contact Us', path: '/contact-us' },
      { label: 'Live Chat', path: '#', action: () => showToastMessage('Live chat will open soon!', 'info') },
      { label: 'Documentation', path: '/documentation' }
    ],
    company: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
      { label: 'Cookie Policy', path: '/cookie-policy' },
      { label: 'Compliance', path: '/compliance' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/energyhub' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/energyhub' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/energyhub' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/energyhub' }
  ];

  const trustBadges = [
    { name: 'SSL Secured', icon: 'Shield' },
    { name: 'ISO Certified', icon: 'Award' },
    { name: '24/7 Support', icon: 'Clock' },
    { name: 'Verified Sellers', icon: 'CheckCircle' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Top */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-foreground rounded-md flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <span className="text-2xl font-bold">EnergyHub</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              The world's leading marketplace for energy products. Connecting verified sellers 
              with buyers to build a sustainable energy future.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <button 
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('email', 'support@energyhub.com')}
              >
                <Icon name="Mail" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">support@energyhub.com</span>
              </button>
              <button 
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('phone', '+1-555-123-4567')}
              >
                <Icon name="Phone" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </button>
              <button 
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('address', 'San Francisco, CA')}
              >
                <Icon name="MapPin" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">San Francisco, CA</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <button
                  key={social?.name}
                  onClick={() => handleSocialClick(social?.name, social?.url)}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={social?.name}
                  title={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marketplace */}
            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-3">
                {footerLinks?.marketplace?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => link?.action ? link.action() : handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Sellers */}
            <div>
              <h3 className="font-semibold mb-4">For Sellers</h3>
              <ul className="space-y-3">
                {footerLinks?.sellers?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => link?.action ? link.action() : handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Buyers */}
            <div>
              <h3 className="font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-3">
                {footerLinks?.buyers?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => link?.action ? link.action() : handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges?.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Icon name={badge?.icon} size={16} className="text-primary-foreground/80" />
                </div>
                <span className="text-sm text-primary-foreground/80">{badge?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/5 rounded-2xl p-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-primary-foreground/80 mb-6">
              Get the latest energy industry news, product updates, and exclusive offers.
            </p>
            <form onSubmit={handleEmailSubscription} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground text-primary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
              >
                {isSubscribing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-primary-foreground/80 text-sm">
              © {currentYear} EnergyHub Marketplace. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              {footerLinks?.legal?.map((link, index) => (
                <button
                  key={index}
                  onClick={() => link?.action ? link.action() : handleNavigation(link?.path)}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm"
                >
                  {link?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;