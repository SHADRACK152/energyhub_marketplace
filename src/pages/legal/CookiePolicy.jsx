import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CookiePolicy = () => {
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
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="text-primary-foreground/80 mt-2">
            Last updated: September 11, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit a website. They are widely used to make websites work more efficiently and provide 
              information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              EnergyHub Marketplace uses cookies for several purposes:
            </p>
            
            <h3 className="text-xl font-medium mb-3">Essential Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are necessary for the website to function properly. They include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Authentication cookies to keep you logged in</li>
              <li>Security cookies to protect against fraud</li>
              <li>Shopping cart cookies to remember your selections</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These help us understand how visitors use our website:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Google Analytics to track website usage</li>
              <li>Performance monitoring cookies</li>
              <li>User behavior analysis</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Marketing Cookies</h3>
            <p className="text-muted-foreground mb-4">
              Used to deliver relevant advertisements:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Targeting and advertising cookies</li>
              <li>Social media integration cookies</li>
              <li>Remarketing pixels</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Block all cookies</li>
              <li>Allow only essential cookies</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for future visits</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Note: Blocking cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use services from third parties that may set their own cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Google Analytics</li>
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Social media platforms</li>
              <li>Customer support tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Cookie Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">EnergyHub Marketplace</p>
              <p className="text-muted-foreground">Email: cookies@energyhub.com</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-muted-foreground">Address: San Francisco, CA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
