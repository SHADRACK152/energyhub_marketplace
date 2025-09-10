import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InstallationServices = () => {
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
          <h1 className="text-3xl font-bold">Installation Services</h1>
          <p className="text-primary-foreground/80 mt-2">
            Professional installation services for all your energy products
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Why Choose Our Installation Services?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Icon name="Award" size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Certified Professionals</h4>
                  <p className="text-muted-foreground">Licensed and insured technicians with years of experience</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Shield" size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Warranty Protection</h4>
                  <p className="text-muted-foreground">Comprehensive warranty coverage on all installations</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Clock" size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Timely Completion</h4>
                  <p className="text-muted-foreground">On-time delivery and efficient installation process</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="Headphones" size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold">Ongoing Support</h4>
                  <p className="text-muted-foreground">24/7 customer support and maintenance services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Request Installation Quote</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Solar Panel Installation</option>
                  <option>Battery System Setup</option>
                  <option>Inverter Installation</option>
                  <option>Complete System Installation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Property Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">System Size (kW)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 5"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="City, State, ZIP"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <Button type="submit" className="w-full">
                Get Installation Quote
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-muted p-6 rounded-lg text-center">
            <Icon name="MapPin" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Site Assessment</h3>
            <p className="text-muted-foreground text-sm">
              Free on-site evaluation and custom installation plan
            </p>
          </div>

          <div className="bg-muted p-6 rounded-lg text-center">
            <Icon name="Settings" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Professional Setup</h3>
            <p className="text-muted-foreground text-sm">
              Complete installation with system testing and optimization
            </p>
          </div>

          <div className="bg-muted p-6 rounded-lg text-center">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground text-sm">
              Final inspection and performance validation
            </p>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="mb-4 opacity-90">
                Our installation experts are standing by to help you with your energy project.
              </p>
              <div className="space-y-2 text-sm opacity-90">
                <p>📞 Call: +1 (555) 123-4567</p>
                <p>📧 Email: installation@energyhub.com</p>
                <p>⏰ Available: Mon-Fri 8AM-6PM</p>
              </div>
            </div>
            <div className="text-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/contact-us')}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationServices;
