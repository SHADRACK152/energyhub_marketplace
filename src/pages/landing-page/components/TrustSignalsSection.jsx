import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const trustMetrics = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Bank-level encryption protects all transactions',
      value: '256-bit SSL'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Sellers',
      description: 'All suppliers undergo rigorous verification',
      value: '100% Verified'
    },
    {
      icon: 'Award',
      title: 'Industry Certified',
      description: 'Compliant with international energy standards',
      value: 'ISO 9001'
    },
    {
      icon: 'Users',
      title: 'Trusted Community',
      description: 'Join thousands of satisfied customers',
      value: '25K+ Users'
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001',
      description: 'Quality Management Systems',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'IEC 61215',
      description: 'Solar Panel Standards',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'UL Listed',
      description: 'Safety Certification',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Energy Star',
      description: 'Energy Efficiency',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your security and satisfaction are our top priorities. We maintain the highest standards 
            of quality, security, and compliance in the energy marketplace.
          </p>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustMetrics?.map((metric, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon name={metric?.icon} size={32} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                {metric?.value}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {metric?.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {metric?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Industry Certifications & Standards
            </h3>
            <p className="text-muted-foreground">
              We work only with certified products that meet international quality and safety standards
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Award" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {cert?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-success/10 border border-success/20 rounded-full px-6 py-3">
            <Icon name="Lock" size={20} className="text-success" />
            <span className="text-success font-semibold">
              Your data is protected with enterprise-grade security
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;