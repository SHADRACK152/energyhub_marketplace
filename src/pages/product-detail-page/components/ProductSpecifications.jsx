import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductSpecifications = ({ specifications, keyFeatures, warranty, shipping }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'shipping', label: 'Shipping & Warranty', icon: 'Truck' },
    { id: 'compatibility', label: 'Compatibility', icon: 'Link' }
  ];

  const renderSpecifications = () => (
    <div className="space-y-6">
      {Object.entries(specifications || {})?.map(([category, specs]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground capitalize">
            {category?.replace(/([A-Z])/g, ' $1')?.trim()}
          </h4>
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {Object.entries(specs)?.map(([key, value], index) => (
              <div
                key={key}
                className={`px-4 py-3 flex items-center justify-between ${
                  index % 2 === 0 ? 'bg-background/50' : ''
                }`}
              >
                <span className="text-sm font-medium text-muted-foreground">{key}</span>
                <span className="text-sm text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderShippingWarranty = () => (
    <div className="space-y-6">
      {/* Shipping Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Shipping Information
        </h4>
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Delivery Time</span>
            </div>
            <span className="text-sm text-foreground">
              {shipping?.estimatedDays} business days
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Shipping Cost</span>
            </div>
            <span className="text-sm text-success font-medium">
              {shipping?.freeShipping ? 'Free Shipping' : `$${shipping?.cost}`}
            </span>
          </div>
        </div>
      </div>

      {/* Warranty Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Warranty & Support
        </h4>
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h5 className="font-medium text-foreground mb-1">Product Warranty</h5>
              <p className="text-sm text-muted-foreground">
                {warranty} manufacturer warranty included with full technical support
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Headphones" size={20} className="text-primary mt-0.5" />
            <div>
              <h5 className="font-medium text-foreground mb-1">24/7 Support</h5>
              <p className="text-sm text-muted-foreground">
                Round-the-clock technical assistance and customer support
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="RefreshCw" size={20} className="text-warning mt-0.5" />
            <div>
              <h5 className="font-medium text-foreground mb-1">30-Day Returns</h5>
              <p className="text-sm text-muted-foreground">
                Easy returns within 30 days of purchase, no questions asked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompatibility = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">
          System Compatibility
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Compatible Inverters</h5>
            <ul className="space-y-2">
              {['SolarEdge HD-Wave Series', 'Enphase IQ8+ Micro Inverters', 'Fronius Primo Series', 'SMA Sunny Boy']?.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Installation Requirements</h5>
            <ul className="space-y-2">
              {['Roof angle: 15-45 degrees', 'Load capacity: 25 lbs/sq ft', 'Electrical conduit access', 'Professional installation recommended']?.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Info" size={14} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'specifications' && renderSpecifications()}
        {activeTab === 'shipping' && renderShippingWarranty()}
        {activeTab === 'compatibility' && renderCompatibility()}
      </div>
    </div>
  );
};

export default ProductSpecifications;