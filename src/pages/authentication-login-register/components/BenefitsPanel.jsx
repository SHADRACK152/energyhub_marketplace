import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsPanel = ({ userType }) => {
  const sellerBenefits = [
    {
      icon: 'Users',
      title: 'Reach Thousands of Buyers',
      description: 'Connect with B2C customers and commercial buyers actively searching for energy products'
    },
    {
      icon: 'Package',
      title: 'Manage Inventory Easily',
      description: 'Streamlined inventory management system with real-time stock tracking and automated alerts'
    },
    {
      icon: 'TrendingUp',
      title: 'Boost Your Sales',
      description: 'Advanced analytics and pricing tools to optimize your product listings and maximize revenue'
    },
    {
      icon: 'Shield',
      title: 'Secure Transactions',
      description: 'Protected payments with escrow services and comprehensive fraud protection for all transactions'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Dedicated seller support team available around the clock to help grow your business'
    }
  ];

  const buyerBenefits = [
    {
      icon: 'Search',
      title: 'Compare Prices Easily',
      description: 'Advanced search and filtering tools to find the best deals on solar panels, batteries, and inverters'
    },
    {
      icon: 'ShieldCheck',
      title: 'Verified Sellers Only',
      description: 'All sellers are thoroughly vetted and verified to ensure quality products and reliable service'
    },
    {
      icon: 'Truck',
      title: 'Fast & Secure Delivery',
      description: 'Reliable shipping partners ensure your energy products arrive safely and on time'
    },
    {
      icon: 'Award',
      title: 'Quality Guarantee',
      description: 'Comprehensive warranty protection and quality assurance on all energy products'
    },
    {
      icon: 'DollarSign',
      title: 'Best Price Promise',
      description: 'Competitive pricing with price matching guarantee to ensure you get the best deals available'
    }
  ];

  const benefits = userType === 'seller' ? sellerBenefits : buyerBenefits;
  const title = userType === 'seller' ? 'Why Sell on EnergyHub?' : 'Why Buy on EnergyHub?';
  const subtitle = userType === 'seller' ?'Join thousands of successful energy product sellers' :'Join thousands of satisfied energy product buyers';

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl h-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="space-y-6">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={benefit?.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{benefit?.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-card rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Trusted Platform</h4>
            <p className="text-sm text-muted-foreground">SSL secured & industry certified</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">50,000+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-muted-foreground">4.8/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPanel;