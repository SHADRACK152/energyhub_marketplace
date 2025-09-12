import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { useTranslation } from '../../../utils/i18n.jsx';

const HeroSection = () => {
  const navigate = useNavigate();


  const handleSellerSignup = () => {
    navigate('/authentication-login-register', { state: { userType: 'seller' } });
  };

  const handleBuyerSignup = () => {
    navigate('/authentication-login-register', { state: { userType: 'buyer' } });
  };

  const handleBrowseProducts = () => {
    navigate('/product-catalog-search');
  };

  // Animated tagline (typewriter effect)
  const { t } = useTranslation();
  const taglines = [
    t('hero.tagline1'),
    t('hero.tagline2'),
    t('hero.tagline3')
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedTagline, setDisplayedTagline] = useState('');
  const taglineRef = useRef(null);

  useEffect(() => {
    let timeout;
    let current = 0;
    function typeTagline() {
      setDisplayedTagline(taglines[taglineIndex].slice(0, current));
      if (current < taglines[taglineIndex].length) {
        current++;
        timeout = setTimeout(typeTagline, 40);
      } else {
        setTimeout(() => {
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }, 1800);
      }
    }
    typeTagline();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [taglineIndex]);

  return (
  <section className="relative bg-gradient-to-br from-secondary/6 via-background to-primary/6 pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Animated Gradient Overlays */}
      {/* Subtle white/gray background pattern for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-200 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-50 rounded-full blur-2xl opacity-70 animate-float-slow -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <div className="mt-4 min-h-[32px]">
              <span className="text-xl sm:text-2xl font-semibold text-accent drop-shadow animate-fade-in" ref={taglineRef}>
                {displayedTagline}
                <span className="animate-blink">|</span>
              </span>
            </div>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="xl"
                iconName="Store"
                iconPosition="left"
                onClick={handleSellerSignup}
        className="px-10 py-5 text-xl font-bold shadow-lg hover:scale-105 transition-transform btn-gradient"
              >
                {t('hero.signupSeller')}
              </Button>
              <Button
                variant="outline"
                size="xl"
                iconName="ShoppingBag"
                iconPosition="left"
                onClick={handleBuyerSignup}
        className="px-10 py-5 text-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                {t('hero.signupBuyer')}
              </Button>
            </div>

            {/* Quick Browse */}
            <div className="mt-6">
              <button
                onClick={handleBrowseProducts}
                className="text-primary hover:text-primary/80 font-medium transition-smooth text-lg underline underline-offset-4"
              >
                {t('hero.browseProducts')}
              </button>
            </div>

            {/* Featured In Bar - now more visible */}
            <div className="mt-12 mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-8 bg-white/90 rounded-xl shadow-lg py-4 px-6 border border-gray-100">
              <span className="text-gray-500 text-base font-semibold mr-4 tracking-wide">{t('hero.featuredIn')}</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Forbes_logo.svg" alt="Forbes" className="h-8 grayscale hover:grayscale-0 transition duration-200" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/TechCrunch_logo.svg" alt="TechCrunch" className="h-8 grayscale hover:grayscale-0 transition duration-200" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Bloomberg_logo.svg" alt="Bloomberg" className="h-8 grayscale hover:grayscale-0 transition duration-200" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Fast_Company_logo.svg" alt="Fast Company" className="h-8 grayscale hover:grayscale-0 transition duration-200" />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-3xl font-extrabold text-primary drop-shadow">2,500+</div>
                <div className="text-sm text-muted-foreground">Verified Sellers</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-primary drop-shadow">50K+</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-primary drop-shadow">KSh 2.5M+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
            </div>
          </div>

          {/* Hero Image with Glassmorphism and Floating Icons */}
          <div className="relative flex items-center justify-center">
            <div className="relative rounded-3xl shadow-2xl border-0 glass-panel overflow-hidden">
              <Image
                src="/assets/images/solar.jpg"
                alt="Solar panels and renewable energy infrastructure"
                className="w-full h-[400px] lg:h-[500px] object-cover scale-105"
              />
              {/* Overlay removed for full image clarity */}
              {/* Floating icons */}
              <Icon name="Sun" size={48} className="absolute top-6 left-6 text-yellow-400/90 animate-float drop-shadow-lg" />
              <Icon name="Battery" size={40} className="absolute bottom-8 right-8 text-green-400/90 animate-float-reverse drop-shadow-lg" />
              <Icon name="Zap" size={36} className="absolute bottom-10 left-10 text-blue-400/90 animate-float drop-shadow-lg" />
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card/80 glass-panel rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-success rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Live Marketplace</div>
                    <div className="text-xs text-muted-foreground">24/7 Active Trading</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;