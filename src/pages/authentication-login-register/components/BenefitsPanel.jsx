
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
  <div className="relative bg-gradient-to-br from-primary/5 to-secondary/10 p-4 rounded-xl h-full shadow-lg border border-primary/10 overflow-hidden animate-fade-in">
      {/* Decorative background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl opacity-30 pointer-events-none" />

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1 tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 bg-white/80 rounded-lg p-2 shadow border border-border hover:scale-[1.01] transition-transform duration-200">
            <div className="flex-shrink-0 w-9 h-9 bg-primary/20 rounded-md flex items-center justify-center shadow-sm">
              <Icon name={benefit?.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-base text-foreground mb-0.5 flex items-center">
                {benefit?.title}
                {index === 0 && (
                  <span className="ml-2 px-1 py-0.5 text-[10px] rounded bg-success/10 text-success font-bold animate-pulse">Popular</span>
                )}
              </h4>
              <p className="text-xs text-muted-foreground leading-snug">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Highlighted stats and trust section */}
      <div className="mt-5 p-3 bg-gradient-to-r from-success/10 to-primary/5 rounded-xl border border-success/20 shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={18} className="text-success" />
          </div>
          <div>
            <h4 className="font-semibold text-base text-success">Trusted Platform</h4>
            <p className="text-xs text-muted-foreground">SSL secured & industry certified</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm font-semibold">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-primary" />
            <span className="text-primary">50,000+ Users</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-warning">4.8/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-5">
        <h5 className="text-center text-base font-bold text-foreground mb-2">What our users say</h5>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="bg-white/90 rounded-lg p-2 border border-border shadow flex items-start space-x-2">
            <Icon name="Quote" size={14} className="text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground italic">“EnergyHub made it so easy to compare prices and find the best deal. Delivery was fast and the support team is amazing!”</p>
              <span className="block mt-1 text-[10px] font-semibold text-primary">— Sarah K., Buyer</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-lg p-2 border border-border shadow flex items-start space-x-2">
            <Icon name="Quote" size={14} className="text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground italic">“As a seller, I love the analytics and inventory tools. My sales have grown and the platform is super reliable.”</p>
              <span className="block mt-1 text-[10px] font-semibold text-primary">— Daniel M., Seller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPanel;