import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useTranslation } from '../../../utils/i18n.jsx';

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState('sellers');

  const sellerTestimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO, SolarTech Solutions",
      company: "Leading Solar Panel Manufacturer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `EnergyHub has transformed our B2B sales process. We've connected with over 200 new buyers in just 6 months and increased our revenue by 150%. The platform's inventory management tools are exceptional.`,
      metrics: {
        revenue: "+150%",
        buyers: "200+",
        timeframe: "6 months"
      },
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Sales Director, PowerStore Inc",
      company: "Battery Storage Specialist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `The marketplace visibility is incredible. Our battery products now reach customers we never could have accessed before. The automated order processing saves us 20 hours per week.`,
      metrics: {
        visibility: "+300%",
        timeSaved: "20 hrs/week",
        reach: "Global"
      },
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer Park",
      role: "Founder, GreenInvert",
      company: "Inverter Technology Company",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Starting as a small inverter manufacturer, EnergyHub helped us scale to serve enterprise clients. The platform's credibility and verification process gave buyers confidence in our products.`,
      metrics: {
        growth: "+400%",
        clients: "Enterprise",
        credibility: "Verified"
      },
      rating: 5
    }
  ];

  const buyerTestimonials = [
    {
      id: 1,
      name: "David Thompson",
      role: "Homeowner & Solar Enthusiast",
      company: "Residential Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Found the perfect solar panel system for my home at 30% below retail prices. The seller verification gave me confidence, and installation was seamless. My energy bills dropped by 80%.`,
      metrics: {
        savings: "30% below retail",
        billReduction: "80%",
        satisfaction: "Excellent"
      },
      rating: 5
    },
    {
      id: 2,
      name: "Lisa Wang",
      role: "Facilities Manager",
      company: "GreenTech Manufacturing",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Sourcing energy storage systems for our factory was complex until we found EnergyHub. The comparison tools and bulk pricing options saved us KSh 50K on our renewable energy project.`,
      metrics: {
        savings: "KSh 50K saved",
        efficiency: "Bulk pricing",
        project: "Complete"
      },
      rating: 5
    },
    {
      id: 3,
      name: "Robert Kim",
      role: "Energy Consultant",
      company: "Sustainable Solutions LLC",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `As a consultant, I recommend EnergyHub to all my clients. The product variety, competitive pricing, and reliable suppliers make it the go-to marketplace for energy products.`,
      metrics: {
        clients: "100% recommend",
        variety: "Extensive",
        reliability: "Proven"
      },
      rating: 5
    }
  ];

  const currentTestimonials = activeTab === 'sellers' ? sellerTestimonials : buyerTestimonials;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-secondary/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('testimonials.title') || 'Success Stories from Our Community'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('testimonials.subtitle') || "Discover how EnergyHub is empowering businesses and individuals to achieve their energy goals"}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setActiveTab('sellers')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'sellers' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('testimonials.sellers') || 'Seller Stories'}
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'buyers' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('testimonials.buyers') || 'Buyer Stories'}
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {currentTestimonials?.map((testimonial, idx) => (
            <div
              key={testimonial?.id}
              className={`bg-white/90 border border-border rounded-2xl p-8 shadow-card hover:shadow-modal transition-all duration-300 glass-panel ${idx===0? 'ring-1 ring-secondary/40 scale-102': ''}`}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-foreground text-lg sm:text-xl font-medium leading-relaxed mb-6">
                “{testimonial?.content}”
              </blockquote>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-accent-gradient-soft rounded-lg">
                {Object.entries(testimonial?.metrics)?.map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm font-semibold text-foreground">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial?.role} — <span className="font-medium text-foreground">{testimonial?.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
          <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('testimonials.ctaTitle') || 'Ready to Join Our Success Stories?'}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('testimonials.ctaSubtitle') || "Whether you're looking to sell energy products or find the perfect solution for your needs, EnergyHub is here to help you succeed."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => window.location.href = '/authentication-login-register'}
                className="px-8"
              >
                {t('testimonials.startSelling') || 'Start Selling Today'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/product-catalog-search'}
                className="px-8"
              >
                {t('footer.browseProducts')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;