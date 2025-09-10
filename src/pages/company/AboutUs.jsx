import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AboutUs = () => {
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
          <h1 className="text-3xl font-bold">About EnergyHub Marketplace</h1>
          <p className="text-primary-foreground/80 mt-2">
            Connecting the world through sustainable energy solutions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              EnergyHub Marketplace is dedicated to accelerating the global transition to clean, 
              sustainable energy by creating the world's most trusted and comprehensive platform 
              for renewable energy products and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">For Buyers</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access to verified renewable energy products</li>
                  <li>Competitive pricing from multiple suppliers</li>
                  <li>Expert consultation and support</li>
                  <li>Seamless ordering and delivery</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">For Sellers</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Global marketplace reach</li>
                  <li>Marketing and promotion tools</li>
                  <li>Secure payment processing</li>
                  <li>Business growth analytics</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">🌱 Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to promoting clean energy solutions that benefit our planet.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">🤝 Trust</h3>
                <p className="text-muted-foreground">
                  We verify all our sellers and ensure product quality and authenticity.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">💡 Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform to better serve the renewable energy community.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">🌍 Global Impact</h3>
                <p className="text-muted-foreground">
                  We're building a worldwide network of clean energy advocates and businesses.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose EnergyHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-semibold mb-2">Secure & Trusted</h3>
                <p className="text-muted-foreground text-sm">
                  SSL encryption and verified sellers ensure safe transactions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-muted-foreground text-sm">
                  Quick order processing and reliable delivery networks
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Quality Focused</h3>
                <p className="text-muted-foreground text-sm">
                  Only certified products from reputable manufacturers
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="mt-4 p-6 bg-muted rounded-lg">
              <p className="font-semibold">EnergyHub Marketplace</p>
              <p className="text-muted-foreground">Email: info@energyhub.com</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-muted-foreground">Address: San Francisco, CA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
