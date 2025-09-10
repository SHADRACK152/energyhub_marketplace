import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Compliance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Compliance & Regulations</h1>
          <p className="text-primary-foreground/80 mt-2">
            Our commitment to regulatory compliance and industry standards
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Regulatory Compliance</h2>
            <p className="text-muted-foreground">
              EnergyHub Marketplace is committed to maintaining the highest standards of compliance 
              with all applicable laws, regulations, and industry standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Industry Standards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Energy Regulations</h3>
                <p className="text-muted-foreground text-sm">
                  Compliance with federal and state energy regulations, including renewable energy standards.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Safety Standards</h3>
                <p className="text-muted-foreground text-sm">
                  All products meet UL, IEC, and other relevant safety certifications.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Data Protection</h3>
                <p className="text-muted-foreground text-sm">
                  GDPR, CCPA, and other data privacy regulation compliance.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Financial Compliance</h3>
                <p className="text-muted-foreground text-sm">
                  PCI DSS compliance for secure payment processing.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Compliance Team</h2>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">Compliance Department</p>
              <p className="text-muted-foreground">Email: compliance@energyhub.com</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
