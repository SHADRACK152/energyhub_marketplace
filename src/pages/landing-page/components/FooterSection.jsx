import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const footerLinks = {
    marketplace: [
      { label: 'Browse Products', path: '/product-catalog-search' },
      { label: 'Solar Panels', path: '/product-catalog-search' },
      { label: 'Batteries', path: '/product-catalog-search' },
      { label: 'Inverters', path: '/product-catalog-search' }
    ],
    sellers: [
      { label: 'Become a Seller', path: '/authentication-login-register' },
      { label: 'Seller Dashboard', path: '/b2b-seller-dashboard' },
      { label: 'Inventory Management', path: '/b2b-inventory-management' },
      { label: 'Seller Resources', path: '#' }
    ],
    buyers: [
      { label: 'Buyer Dashboard', path: '/b2c-buyer-dashboard' },
      { label: 'How to Buy', path: '#' },
      { label: 'Bulk Orders', path: '#' },
      { label: 'Installation Services', path: '#' }
    ],
    support: [
      { label: 'Help Center', path: '#' },
      { label: 'Contact Us', path: '#' },
      { label: 'Live Chat', path: '#' },
      { label: 'Documentation', path: '#' }
    ],
    company: [
      { label: 'About Us', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Press', path: '#' },
      { label: 'Blog', path: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Cookie Policy', path: '#' },
      { label: 'Compliance', path: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' }
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
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">support@energyhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
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
                      onClick={() => handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm"
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
                      onClick={() => handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm"
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
                      onClick={() => handleNavigation(link?.path)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm"
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground text-primary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
              />
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
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
                  onClick={() => handleNavigation(link?.path)}
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