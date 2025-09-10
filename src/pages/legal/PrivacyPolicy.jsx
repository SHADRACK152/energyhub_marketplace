import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-primary-foreground/80 mt-2">
            Last updated: September 11, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              At EnergyHub Marketplace, we collect information to provide better services to all our users. 
              We collect information in the following ways:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Information you give us (account registration, profile information)</li>
              <li>Information we get from your use of our services (browsing history, transactions)</li>
              <li>Information from third parties (verification services, payment processors)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect from all of our services to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts</li>
              <li>Respond to customer service requests</li>
              <li>Communicate about products, services, and promotional offers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not share personal information with companies, organizations, and individuals outside of 
              EnergyHub unless one of the following circumstances applies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>With your consent</li>
              <li>For legal reasons</li>
              <li>With service providers</li>
              <li>In case of merger or acquisition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We work hard to protect EnergyHub and our users from unauthorized access to or 
              unauthorized alteration, disclosure, or destruction of information we hold. We use 
              SSL encryption, secure servers, and regular security audits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">EnergyHub Marketplace</p>
              <p className="text-muted-foreground">Email: privacy@energyhub.com</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-muted-foreground">Address: San Francisco, CA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
