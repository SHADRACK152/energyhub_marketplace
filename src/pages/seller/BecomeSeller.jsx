import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phoneNumber: '',
    address: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please log in first to become a seller', { type: 'warning' });
      navigate('/authentication-login-register');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast('Seller application submitted successfully! We will review it within 24 hours.', { type: 'success' });
      setIsSubmitting(false);
      navigate('/b2b-seller-dashboard');
    }, 2000);
  };

  const benefits = [
    {
      icon: 'DollarSign',
      title: 'Earn More Revenue',
      description: 'Access to millions of potential customers worldwide'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics & Insights',
      description: 'Detailed performance metrics to optimize your sales'
    },
    {
      icon: 'Truck',
      title: 'Logistics Support',
      description: 'Integrated shipping and fulfillment solutions'
    },
    {
      icon: 'Shield',
      title: 'Secure Payments',
      description: 'Fast, secure payments with fraud protection'
    },
    {
      icon: 'Users',
      title: 'Community Support',
      description: 'Join our active community of successful sellers'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Dedicated seller support team available around the clock'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create your seller account and verify your identity'
    },
    {
      step: 2,
      title: 'Complete Profile',
      description: 'Add business information and upload required documents'
    },
    {
      step: 3,
      title: 'List Products',
      description: 'Upload your first products with photos and descriptions'
    },
    {
      step: 4,
      title: 'Start Selling',
      description: 'Go live and start receiving orders from customers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Become a Seller</h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Join thousands of successful sellers on EnergyHub Marketplace and grow your business 
              in the booming renewable energy market.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Start Application
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-primary-foreground border-primary-foreground"
                onClick={() => navigate('/seller-resources')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Sell on EnergyHub?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access powerful tools and resources to grow your renewable energy business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={benefit.icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Get started selling in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Seller Application</h2>
          <p className="text-muted-foreground">
            Fill out this form to start your journey as an EnergyHub seller
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name *</label>
              <Input
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Type *</label>
              <select 
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              >
                <option value="">Select business type</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="installer">Installer</option>
                <option value="consultant">Consultant</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Address *</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your business address"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your business and the products you plan to sell..."
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" required className="rounded" />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the <button type="button" onClick={() => navigate('/terms-of-service')} className="text-primary hover:underline">Terms of Service</button> and <button type="button" onClick={() => navigate('/privacy-policy')} className="text-primary hover:underline">Privacy Policy</button>
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Icon name="Send" size={16} className="mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </form>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join our seller community and access all the resources you need to succeed
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/seller-resources')}
            >
              <Icon name="BookOpen" size={16} className="mr-2" />
              Seller Resources
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-primary-foreground border-primary-foreground"
              onClick={() => navigate('/seller-support')}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
