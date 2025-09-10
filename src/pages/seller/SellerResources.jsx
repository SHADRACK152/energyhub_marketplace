import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useToast } from '../../components/ui/Toast';

const SellerResources = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const handleProtectedAction = (path, requiresSeller = false) => {
    if (!isAuthenticated) {
      showToast('Please log in to access seller resources', { type: 'info' });
      navigate('/authentication-login-register');
      return;
    }

    if (requiresSeller && user?.role !== 'seller') {
      showToast('This feature is only available for sellers', { type: 'warning' });
      navigate('/become-seller');
      return;
    }

    navigate(path);
  };

  const handleDownload = (resourceType) => {
    if (!isAuthenticated) {
      showToast('Please log in to download resources', { type: 'info' });
      navigate('/authentication-login-register');
      return;
    }

    // Simulate download
    showToast(`Downloading ${resourceType}...`, { type: 'success' });
    
    // In a real implementation, you would trigger the actual download here
    const link = document.createElement('a');
    link.href = `/downloads/${resourceType.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    link.download = `${resourceType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resources = [
    {
      title: 'Seller Guide',
      description: 'Complete guide to getting started and maximizing your sales.',
      icon: 'BookOpen',
      actionText: 'Download Guide',
      action: () => handleDownload('Seller Guide'),
      type: 'download'
    },
    {
      title: 'Marketing Tools',
      description: 'Promote your products effectively with our marketing resources.',
      icon: 'Megaphone',
      actionText: 'Access Tools',
      action: () => handleProtectedAction('/marketing-tools', true),
      type: 'link'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other sellers and share best practices.',
      icon: 'Users',
      actionText: 'Join Forum',
      action: () => handleProtectedAction('/community-forum'),
      type: 'link'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your performance with detailed analytics.',
      icon: 'BarChart3',
      actionText: 'View Dashboard',
      action: () => handleProtectedAction('/seller-analytics', true),
      type: 'protected'
    },
    {
      title: 'Product Listing',
      description: 'Learn how to create compelling product listings.',
      icon: 'Package',
      actionText: 'Learn More',
      action: () => handleProtectedAction('/product-listing-guide'),
      type: 'guide'
    },
    {
      title: 'Seller Support',
      description: 'Get help from our dedicated seller support team.',
      icon: 'MessageCircle',
      actionText: 'Get Support',
      action: () => handleProtectedAction('/seller-support'),
      type: 'support'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Seller Resources</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Everything you need to succeed as a seller on EnergyHub Marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name={resource.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {resource.description}
              </p>
              
              <Button
                onClick={resource.action}
                className="w-full"
                variant={resource.type === 'protected' ? 'default' : 'outline'}
              >
                {resource.actionText}
                <Icon 
                  name={resource.type === 'download' ? 'Download' : 'ArrowRight'} 
                  size={16} 
                  className="ml-2" 
                />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-muted py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful sellers on EnergyHub Marketplace
          </p>
          
          <Button
            size="lg"
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/authentication-login-register');
              } else if (user?.role === 'seller') {
                navigate('/b2b-seller-dashboard');
              } else {
                navigate('/become-seller');
              }
            }}
            className="px-8 py-4 text-lg"
          >
            {!isAuthenticated ? 'Sign Up to Become a Seller' : 
             user?.role === 'seller' ? 'Go to Dashboard' : 'Become a Seller'}
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Additional Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore more tools and resources to help you succeed as a seller
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="FileText" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete API and platform docs</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleProtectedAction('/documentation')}
            >
              View Docs
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Video" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-4">Step-by-step video guides</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleProtectedAction('/video-tutorials')}
            >
              Watch Now
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Calendar" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Webinars</h3>
            <p className="text-sm text-muted-foreground mb-4">Live training sessions</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('Webinars button clicked');
                handleProtectedAction('/webinars');
              }}
              className="cursor-pointer"
            >
              Register
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Icon name="Award" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Certifications</h3>
            <p className="text-sm text-muted-foreground mb-4">Become a certified seller</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('Certifications button clicked');
                handleProtectedAction('/certifications');
              }}
              className="cursor-pointer"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerResources;
