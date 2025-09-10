import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductListingGuide = () => {
  const navigate = useNavigate();

  const guideSteps = [
    {
      step: 1,
      title: 'Product Research',
      description: 'Research your market and competitors to understand pricing and positioning',
      tips: [
        'Analyze competitor products and pricing',
        'Identify unique selling points',
        'Research customer pain points',
        'Check market demand and trends'
      ]
    },
    {
      step: 2,
      title: 'High-Quality Photos',
      description: 'Take professional photos that showcase your product effectively',
      tips: [
        'Use natural lighting when possible',
        'Show multiple angles and details',
        'Include lifestyle/usage shots',
        'Ensure high resolution (at least 1080px)'
      ]
    },
    {
      step: 3,
      title: 'Compelling Titles',
      description: 'Write clear, searchable titles that attract buyers',
      tips: [
        'Include key specifications and features',
        'Use relevant keywords naturally',
        'Keep titles under 60 characters',
        'Mention brand, model, and key benefits'
      ]
    },
    {
      step: 4,
      title: 'Detailed Descriptions',
      description: 'Provide comprehensive product information that answers buyer questions',
      tips: [
        'List all technical specifications',
        'Explain key features and benefits',
        'Include dimensions and compatibility',
        'Address common customer concerns'
      ]
    },
    {
      step: 5,
      title: 'Competitive Pricing',
      description: 'Set prices that are competitive while maintaining healthy margins',
      tips: [
        'Research competitor pricing',
        'Consider your costs and margins',
        'Factor in shipping and fees',
        'Test different price points'
      ]
    },
    {
      step: 6,
      title: 'Optimization & Updates',
      description: 'Continuously improve your listings based on performance data',
      tips: [
        'Monitor conversion rates',
        'Update based on customer feedback',
        'Refresh photos periodically',
        'Adjust keywords and descriptions'
      ]
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
          <h1 className="text-3xl font-bold">Product Listing Guide</h1>
          <p className="text-primary-foreground/80 mt-2">
            Learn how to create compelling product listings that convert
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Tips Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-center mb-4">
            <Icon name="Lightbulb" size={24} className="text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">Quick Success Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-blue-600" />
              <span>Use high-quality, well-lit photos</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-blue-600" />
              <span>Include detailed specifications</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-blue-600" />
              <span>Write clear, benefit-focused titles</span>
            </div>
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-2 text-blue-600" />
              <span>Price competitively for your market</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-8">
          {guideSteps.map((step, index) => (
            <div key={index} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-lg">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-primary-foreground/90 mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold mb-4 text-foreground">Best Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start">
                      <Icon name="CheckCircle" size={16} className="text-green-600 mr-3 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate('/b2b-inventory-management')}>
              <Icon name="Plus" size={16} className="mr-2" />
              Create New Listing
            </Button>
            <Button variant="outline" onClick={() => navigate('/seller-resources')}>
              <Icon name="BookOpen" size={16} className="mr-2" />
              More Resources
            </Button>
            <Button variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Download Checklist
            </Button>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need help? Our seller support team is available 24/7 to assist you with your product listings.
          </p>
          
          <Button variant="ghost" onClick={() => navigate('/seller-support')}>
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductListingGuide;
