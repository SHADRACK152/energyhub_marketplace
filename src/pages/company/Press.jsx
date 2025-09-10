import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Press = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Press & Media</h1>
          <p className="text-primary-foreground/80 mt-2">
            Latest news, press releases, and media resources from EnergyHub Marketplace
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Press & Media Center</h2>
          <p className="text-muted-foreground mb-8">
            Stay updated with the latest news and announcements from EnergyHub Marketplace.
          </p>
          <div className="bg-muted p-8 rounded-lg">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="text-muted-foreground mt-2">
              Our press center is being prepared. For media inquiries, please contact our press team.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/contact-us')}
            >
              Contact Press Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
