import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MarketingTools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: 'Product Photography Guidelines',
      description: 'Learn how to take professional photos that sell',
      icon: 'Camera',
      action: 'Download Guide'
    },
    {
      title: 'SEO Optimization Kit',
      description: 'Optimize your product listings for better visibility',
      icon: 'Search',
      action: 'Access Kit'
    },
    {
      title: 'Social Media Templates',
      description: 'Ready-to-use templates for promoting your products',
      icon: 'Share2',
      action: 'Download Templates'
    },
    {
      title: 'Email Marketing Templates',
      description: 'Professional email templates for customer outreach',
      icon: 'Mail',
      action: 'Get Templates'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Marketing Tools</h1>
          <p className="text-primary-foreground/80 mt-2">
            Promote your products effectively with our marketing resources
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <Icon name={tool.icon} size={24} className="text-primary mr-3" />
                <h3 className="text-xl font-semibold">{tool.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <Button variant="outline" className="w-full">
                {tool.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingTools;
