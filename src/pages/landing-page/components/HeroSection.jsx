import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

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

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              The Future of{' '}
              <span className="text-primary">Energy Trading</span>{' '}
              is Here
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Connect with trusted energy product suppliers and discover cutting-edge solar panels, batteries, and inverters. Join thousands of businesses and homeowners building a sustainable future.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={handleSellerSignup}
                className="px-8 py-4 text-lg font-semibold"
              >
                Sell Energy Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleBuyerSignup}
                className="px-8 py-4 text-lg font-semibold"
              >
                Shop Energy Products
              </Button>
            </div>

            {/* Quick Browse */}
            <div className="mt-6">
              <button
                onClick={handleBrowseProducts}
                className="text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Browse products without signing up →
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">Verified Sellers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Solar panels and renewable energy infrastructure"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
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
    </section>
  );
};

export default HeroSection;