import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { useToast } from '../../../components/ui/Toast';
import { useAuth } from '../../../components/ui/AuthenticationRouter';
import { useTranslation } from '../../../utils/i18n.jsx';

const FooterSection = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNavigation = (path) => {
    if (path === '#') {
      showToast(t('misc.featureComingSoon') || 'Feature coming soon!');
      return;
    }

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

    const requiresAuth = protectedRoutes.includes(path);
    if (requiresAuth && !isAuthenticated) {
      showToast(t('messages.tryAgain') || t('misc.loginRequired') || 'Please login to continue');
      navigate('/authentication-login-register', { state: { from: path } });
      return;
    }

    if (isAuthenticated && (path === '/b2b-seller-dashboard' || path === '/b2c-buyer-dashboard')) {
      const userRole = user?.role;
      if (userRole === 'seller' || userRole === 'b2b') {
        navigate('/b2b-seller-dashboard');
      } else if (userRole === 'buyer' || userRole === 'b2c') {
        navigate('/b2c-buyer-dashboard');
      } else {
        navigate(path);
      }
      return;
    }

    navigate(path);
  };

  const handleEmailSubscription = (e) => {
    e.preventDefault();
    if (!email) return showToast(t('footer.newsletter.enterEmail'));
    if (!email.includes('@') || !email.includes('.')) return showToast(t('footer.newsletter.invalidEmail'));

    setIsSubscribing(true);
    setTimeout(() => {
      showToast(t('footer.newsletter.success'));
      setEmail('');
      setIsSubscribing(false);
    }, 800);
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
    if (!url || url === '#') {
      showToast(`${platform} ${t('misc.featureComingSoon') || 'coming soon'}`);
      return;
    }
    window.open(url, '_blank');
  };

  const footerLinks = {
    marketplace: [
      { label: 'footer.browseProducts', path: '/product-catalog-search' },
      { label: 'footer.solarPanels', path: '/product-catalog-search?category=solar-panels' },
      { label: 'footer.batteries', path: '/product-catalog-search?category=batteries' },
      { label: 'footer.inverters', path: '/product-catalog-search?category=inverters' }
    ],
    sellers: [
      { label: 'footer.becomeSeller', path: '/become-seller' },
      { label: 'footer.sellerDashboard', path: '/b2b-seller-dashboard' },
      { label: 'footer.inventoryManagement', path: '/b2b-inventory-management' },
      { label: 'footer.sellerResources', path: '/seller-resources' }
    ],
    buyers: [
      { label: 'footer.buyerDashboard', path: '/b2c-buyer-dashboard' },
      { label: 'footer.howToBuy', path: '/how-to-buy' },
      { label: 'footer.bulkOrders', path: '/bulk-orders' },
      { label: 'footer.installationServices', path: '/installation-services' }
    ],
    support: [
      { label: 'footer.helpCenter', path: '/help-center' },
      { label: 'footer.contactUs', path: '/contact-us' },
      { label: 'footer.liveChat', path: '#', action: () => showToast(t('misc.featureComingSoon')) },
      { label: 'footer.documentation', path: '/documentation' }
    ],
    company: [
      { label: 'footer.aboutUs', path: '/about-us' },
      { label: 'footer.careers', path: '/careers' },
      { label: 'footer.press', path: '/press' },
      { label: 'footer.blog', path: '/blog' }
    ],
    legal: [
      { label: 'footer.privacyPolicy', path: '/privacy-policy' },
      { label: 'footer.termsOfService', path: '/terms-of-service' },
      { label: 'footer.cookiePolicy', path: '/cookie-policy' },
      { label: 'footer.compliance', path: '/compliance' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/energyhub' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/energyhub' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/energyhub' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/energyhub' }
  ];

  const trustBadges = [
    { key: 'footer.trust.sslSecured', icon: 'Shield' },
    { key: 'footer.trust.isoCertified', icon: 'Award' },
    { key: 'footer.trust.support247', icon: 'Clock' },
    { key: 'footer.trust.verifiedSellers', icon: 'CheckCircle' }
  ];

  return (
    <footer className="bg-gradient-to-t from-primary/8 via-transparent to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-foreground rounded-md flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <span className="text-2xl font-bold">{t('brand.name')}</span>
            </div>

            <p className="text-primary-foreground/80 mb-6 leading-relaxed">{t('footer.description')}</p>

            <div className="space-y-3 mb-6">
              <button
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('email', t('footer.contact.email'))}
              >
                <Icon name="Mail" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">{t('footer.contact.email')}</span>
              </button>

              <button
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('phone', t('footer.contact.phone'))}
              >
                <Icon name="Phone" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">{t('footer.contact.phone')}</span>
              </button>

              <button
                className="flex items-center space-x-3 hover:text-primary-foreground transition-colors text-left w-full"
                onClick={() => handleContactClick('address', t('footer.contact.address'))}
              >
                <Icon name="MapPin" size={16} className="text-primary-foreground/60" />
                <span className="text-sm">{t('footer.contact.address')}</span>
              </button>
            </div>

    <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.name, social.url)}
      className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                  title={`${t('footer.followUs')} ${social.name}`}
                >
                  <Icon name={social.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('footer.marketplace')}</h3>
              <ul className="space-y-3">
                {footerLinks.marketplace.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => (link.action ? link.action() : handleNavigation(link.path))}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {t(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.sellers')}</h3>
              <ul className="space-y-3">
                {footerLinks.sellers.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => (link.action ? link.action() : handleNavigation(link.path))}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {t(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.buyers')}</h3>
              <ul className="space-y-3">
                {footerLinks.buyers.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => (link.action ? link.action() : handleNavigation(link.path))}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm text-left"
                    >
                      {t(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Icon name={badge.icon} size={16} className="text-primary-foreground/80" />
                </div>
                <span className="text-sm text-primary-foreground/80">{t(badge.key)}</span>
              </div>
            ))}
          </div>
        </div>

    <div className="bg-white/70 rounded-2xl p-8 mb-8 glass-panel">
          <form onSubmit={handleEmailSubscription} className="flex items-center space-x-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletter.placeholder')}
              className="flex-1 bg-transparent border border-primary-foreground/20 rounded-md px-4 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={isSubscribing}
      className="btn-gradient rounded-md px-4 py-2 text-sm"
            >
              {isSubscribing ? t('footer.newsletter.subscribing') : t('footer.newsletter.subscribe')}
            </button>
          </form>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/60">
          © {currentYear} {t('brand.name')} — {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;