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

  // Add scroll-triggered animations
  const [isVisible, setIsVisible] = useState({
    title: false,
    tagline: false,
    description: false,
    buttons: false,
    stats: false,
    features: false,
    image: false
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animations
            setTimeout(() => setIsVisible(prev => ({ ...prev, title: true })), 100);
            setTimeout(() => setIsVisible(prev => ({ ...prev, tagline: true })), 300);
            setTimeout(() => setIsVisible(prev => ({ ...prev, description: true })), 500);
            setTimeout(() => setIsVisible(prev => ({ ...prev, buttons: true })), 700);
            setTimeout(() => setIsVisible(prev => ({ ...prev, stats: true })), 900);
            setTimeout(() => setIsVisible(prev => ({ ...prev, features: true })), 1100);
            setTimeout(() => setIsVisible(prev => ({ ...prev, image: true })), 1300);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
  <section ref={sectionRef} className="relative bg-gradient-to-br from-secondary/6 via-background to-primary/6 pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Enhanced Animated Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-3xl opacity-60 animate-pulse-slow animate-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-gray-100/60 to-white/60 rounded-full blur-2xl opacity-70 animate-float-slow -translate-x-1/2 -translate-y-1/2 animate-delay-500"></div>
        
        {/* Moving particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-float animate-delay-200"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-secondary/30 rounded-full animate-float-reverse animate-delay-700"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float animate-delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-lg transition-all duration-700 ${
              isVisible.title ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}>
              {t('hero.title')}
            </h1>

            <div className={`mt-4 min-h-[40px] transition-all duration-700 ${
              isVisible.tagline ? 'animate-fade-in-left opacity-100' : 'opacity-0'
            }`}>
              <span className="text-2xl sm:text-3xl font-semibold text-secondary drop-shadow animate-gradient-shift bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent" ref={taglineRef}>
                {displayedTagline}
                <span className="animate-blink text-primary">|</span>
              </span>
            </div>

            <p className={`mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto lg:mx-0 transition-all duration-700 ${
              isVisible.description ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}>
              {t('hero.description')}
            </p>

      {/* CTA Buttons */}
      <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${
              isVisible.buttons ? 'animate-scale-in opacity-100' : 'opacity-0'
            }`}>
              <Button
                variant="default"
                size="xl"
                iconName="Store"
                iconPosition="left"
                onClick={handleSellerSignup}
        className="px-10 py-5 text-xl font-bold shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 btn-gradient animate-gradient-shift"
              >
                {t('hero.signupSeller')}
              </Button>
              <Button
                variant="outline"
                size="xl"
                iconName="ShoppingBag"
                iconPosition="left"
                onClick={handleBuyerSignup}
        className="px-10 py-5 text-xl font-bold shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {t('hero.signupBuyer')}
              </Button>
            </div>

            {/* Quick Browse */}
            <div className={`mt-6 transition-all duration-700 ${
              isVisible.buttons ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}>
              <button
                onClick={handleBrowseProducts}
                className="text-primary hover:text-primary/80 font-medium transition-all duration-300 text-lg underline underline-offset-4 hover:underline-offset-8 hover:scale-105"
              >
                {t('hero.browseProducts')}
              </button>
            </div>

            {/* Featured In Bar - now more visible */}
            <div className={`mt-12 mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 bg-white/95 rounded-xl shadow-lg py-6 px-8 border border-gray-200 transition-all duration-700 ${
              isVisible.stats ? 'animate-slide-up opacity-100' : 'opacity-0'
            }`}>
              <span className="text-gray-600 text-base font-semibold mr-4 tracking-wide animate-fade-in">{t('hero.featuredIn')}</span>
              
              {/* Forbes */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-300 animate-fade-in-left animate-delay-100">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-800 font-bold text-sm tracking-wider">FORBES</span>
              </div>
              
              {/* TechCrunch */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:border-green-300 hover:scale-105 transition-all duration-300 animate-fade-in-left animate-delay-200">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-green-800 font-bold text-sm tracking-wider">TECHCRUNCH</span>
              </div>
              
              {/* Bloomberg */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-300 hover:scale-105 transition-all duration-300 animate-fade-in-left animate-delay-300">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-blue-800 font-bold text-sm tracking-wider">BLOOMBERG</span>
              </div>
              
              {/* Fast Company */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 hover:border-red-300 hover:scale-105 transition-all duration-300 animate-fade-in-left animate-delay-500">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-red-800 font-bold text-sm tracking-wider">FAST COMPANY</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-center lg:text-left mt-8 transition-all duration-700 ${
              isVisible.stats ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}>
              <div className="hover:scale-105 transition-all duration-300 animate-scale-in animate-delay-100">
                <div className="text-3xl font-extrabold drop-shadow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">2,500+</div>
                <div className="text-sm text-muted-foreground">Verified Sellers</div>
              </div>
              <div className="hover:scale-105 transition-all duration-300 animate-scale-in animate-delay-200">
                <div className="text-3xl font-extrabold drop-shadow bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div className="hover:scale-105 transition-all duration-300 animate-scale-in animate-delay-300">
                <div className="text-3xl font-extrabold drop-shadow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">KSh 2.5M+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
            </div>

            {/* Quick features - cards to catch scrollers */}
            <div className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 ${
              isVisible.features ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}>
              <div className="p-4 rounded-xl glass-panel border border-border shadow-card text-center hover:scale-105 hover:shadow-lg transition-all duration-300 card-3d animate-scale-in animate-delay-100">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Fast Quotes</div>
                <div className="text-sm text-muted-foreground mt-2">Get instant price estimates from verified sellers.</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-border shadow-card text-center hover:scale-105 hover:shadow-lg transition-all duration-300 card-3d animate-scale-in animate-delay-200">
                <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Secure Payments</div>
                <div className="text-sm text-muted-foreground mt-2">Escrow-style payments protect buyers and sellers.</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-border shadow-card text-center hover:scale-105 hover:shadow-lg transition-all duration-300 card-3d animate-scale-in animate-delay-300">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Expert Support</div>
                <div className="text-sm text-muted-foreground mt-2">Local installers and support teams available.</div>
              </div>
            </div>
          </div>

          {/* Hero Image with Enhanced Animations */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 ${
            isVisible.image ? 'animate-fade-in-right opacity-100' : 'opacity-0'
          }`}>
            <div className="relative rounded-3xl shadow-2xl border-0 glass-panel overflow-hidden hover:scale-105 transition-all duration-500 card-3d">
              <Image
                src="/assets/images/solar.jpg"
                alt="Solar panels and renewable energy infrastructure"
                className="w-full h-[400px] lg:h-[500px] object-cover scale-105 hover:scale-110 transition-all duration-700"
              />
              
              {/* Enhanced Floating icons */}
              <Icon name="Sun" size={48} className="absolute top-6 left-6 text-yellow-400/90 animate-float drop-shadow-lg hover:text-yellow-300 transition-colors duration-300" />
              <Icon name="Battery" size={40} className="absolute bottom-8 right-8 text-green-400/90 animate-float-reverse drop-shadow-lg hover:text-green-300 transition-colors duration-300" />
              <Icon name="Zap" size={36} className="absolute bottom-10 left-10 text-blue-400/90 animate-float drop-shadow-lg hover:text-blue-300 transition-colors duration-300" />
              
              {/* Additional animated elements */}
              <div className="absolute top-1/2 right-4 w-3 h-3 bg-primary/60 rounded-full animate-pulse animate-delay-300"></div>
              <div className="absolute top-20 right-20 w-2 h-2 bg-secondary/60 rounded-full animate-float animate-delay-700"></div>
              
              {/* Enhanced Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card/95 glass-panel rounded-xl p-4 shadow-lg animate-slide-up animate-delay-1000 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 bg-gradient-to-r from-success to-secondary rounded-full animate-float"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Live Marketplace</div>
                    <div className="text-xs text-muted-foreground">24/7 Active Trading</div>
                  </div>
                </div>
              </div>
              
              {/* Additional floating stat on the right */}
              <div className="absolute -top-4 -right-4 bg-card/95 glass-panel rounded-xl p-3 shadow-lg animate-fade-in-down animate-delay-1300 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} className="text-primary animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Growing Fast</div>
                    <div className="text-xs text-success">+15% Monthly</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl blur-xl scale-110 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;