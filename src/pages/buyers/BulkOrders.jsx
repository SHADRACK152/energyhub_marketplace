import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BulkOrders = () => {
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
          <h1 className="text-3xl font-bold">Bulk Orders</h1>
          <p className="text-primary-foreground/80 mt-2">
            Special pricing and services for large quantity purchases
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Benefits of Bulk Ordering</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Icon name="Check" size={20} className="text-green-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Volume Discounts</h4>
                  <p className="text-muted-foreground text-sm">Save up to 25% on large quantity orders</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Check" size={20} className="text-green-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Priority Support</h4>
                  <p className="text-muted-foreground text-sm">Dedicated account manager for your orders</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Check" size={20} className="text-green-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Custom Solutions</h4>
                  <p className="text-muted-foreground text-sm">Tailored packages for your specific needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Check" size={20} className="text-green-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Flexible Payment</h4>
                  <p className="text-muted-foreground text-sm">Extended payment terms available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Request a Bulk Quote</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Solar Panels</option>
                  <option>Batteries</option>
                  <option>Inverters</option>
                  <option>Complete Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estimated Quantity</label>
                <input 
                  type="number" 
                  placeholder="Enter quantity"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Timeline</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Within 30 days</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input 
                  type="text" 
                  placeholder="Your company name"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <Button type="submit" className="w-full">
                Request Quote
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-muted rounded-lg">
            <Icon name="Package" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold">Minimum Order</h4>
            <p className="text-muted-foreground text-sm">$10,000 or 50+ units</p>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold">Processing Time</h4>
            <p className="text-muted-foreground text-sm">2-5 business days</p>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <Icon name="Truck" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold">Free Shipping</h4>
            <p className="text-muted-foreground text-sm">On orders over $25,000</p>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Help with Your Bulk Order?</h2>
          <p className="mb-6 opacity-90">
            Our bulk sales team is ready to assist you with custom quotes and solutions
          </p>
          <div className="space-x-4">
            <Button 
              variant="secondary"
              onClick={() => navigate('/contact-us')}
            >
              Contact Sales Team
            </Button>
            <Button 
              variant="outline" 
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Call: +1 (555) 123-4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;
