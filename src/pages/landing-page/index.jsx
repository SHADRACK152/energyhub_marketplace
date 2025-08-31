import React from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import HeroSection from './components/HeroSection';
import ProductCategoriesSection from './components/ProductCategoriesSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleBasedHeader user={null} onNavigate={() => {}} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Product Categories */}
        <ProductCategoriesSection />

        {/* Trust Signals */}
        <TrustSignalsSection />

        {/* Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;