import React from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import HeroSection from './components/HeroSection';
import ProductCategoriesSection from './components/ProductCategoriesSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <RoleBasedHeader user={null} />

      {/* Main Content */}
      <main className="pt-2 pb-2">
        {/* Hero Section */}
        <div className="mb-12">
          <HeroSection />
        </div>

        {/* Product Categories */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl bg-white/90 shadow-xl border border-gray-100 p-8">
            <ProductCategoriesSection />
          </div>
        </div>

        {/* Section Divider */}
        <div className="max-w-4xl mx-auto h-1 rounded-full bg-gradient-to-r from-primary/10 via-gray-200 to-secondary/10 my-12" />

        {/* Trust Signals */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl bg-white/90 shadow-xl border border-gray-100 p-8">
            <TrustSignalsSection />
          </div>
        </div>

        {/* Section Divider */}
        <div className="max-w-4xl mx-auto h-1 rounded-full bg-gradient-to-r from-secondary/10 via-gray-200 to-primary/10 my-12" />

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl bg-white/90 shadow-xl border border-gray-100 p-8">
            <TestimonialsSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;