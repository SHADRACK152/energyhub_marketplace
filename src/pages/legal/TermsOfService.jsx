import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-primary-foreground/80 mt-2">
            Last updated: September 11, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using EnergyHub Marketplace, you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Marketplace Rules</h2>
            <h3 className="text-xl font-medium mb-3">For Buyers:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Provide accurate information during registration</li>
              <li>Use the platform only for legitimate purchases</li>
              <li>Pay for all confirmed orders</li>
              <li>Leave honest reviews and feedback</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3">For Sellers:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide accurate product descriptions and pricing</li>
              <li>Maintain adequate inventory</li>
              <li>Ship orders promptly</li>
              <li>Respond to customer inquiries in a timely manner</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Prohibited Activities</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Selling counterfeit or unsafe products</li>
              <li>Manipulating reviews or ratings</li>
              <li>Engaging in fraudulent activities</li>
              <li>Violating intellectual property rights</li>
              <li>Harassing other users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payment and Fees</h2>
            <p className="text-muted-foreground mb-4">
              EnergyHub charges the following fees:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Transaction fee: 3% of total order value</li>
              <li>Payment processing fee: 2.9% + $0.30 per transaction</li>
              <li>Premium seller subscription: $29.99/month (optional)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              EnergyHub Marketplace acts as an intermediary between buyers and sellers. We are not 
              responsible for the quality, safety, or legality of products listed, the truth or 
              accuracy of listings, or the ability of sellers to sell items.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend access to our service immediately, without prior notice 
              or liability, for any reason whatsoever, including without limitation if you breach 
              the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">EnergyHub Marketplace</p>
              <p className="text-muted-foreground">Email: legal@energyhub.com</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-muted-foreground">Address: San Francisco, CA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
