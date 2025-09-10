import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SellerResources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Seller Resources</h1>
          <p className="text-primary-foreground/80 mt-2">
            Everything you need to succeed as a seller on EnergyHub Marketplace
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <Icon name="BookOpen" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Seller Guide</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Complete guide to getting started and maximizing your sales.
            </p>
            <Button variant="outline" size="sm">Download Guide</Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="TrendingUp" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Marketing Tools</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Promote your products effectively with our marketing resources.
            </p>
            <Button variant="outline" size="sm">Access Tools</Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="Users" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Community Forum</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Connect with other sellers and share best practices.
            </p>
            <Button variant="outline" size="sm">Join Forum</Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="BarChart" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Track your performance with detailed analytics.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/b2b-seller-dashboard')}
            >
              View Dashboard
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="FileText" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Product Listing</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Learn how to create compelling product listings.
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Icon name="Headphones" size={32} className="mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Seller Support</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get help from our dedicated seller support team.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/contact-us')}
            >
              Get Support
            </Button>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Selling?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of successful sellers on EnergyHub Marketplace
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/authentication-login-register?type=seller')}
          >
            Become a Seller
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerResources;
