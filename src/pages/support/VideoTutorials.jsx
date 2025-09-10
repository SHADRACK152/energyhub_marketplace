import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const VideoTutorials = () => {
  const navigate = useNavigate();

  const videoCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of selling on EnergyHub',
      videos: [
        { title: 'Account Setup', duration: '5:30', thumbnail: '/api/placeholder/300/200' },
        { title: 'First Product Upload', duration: '8:45', thumbnail: '/api/placeholder/300/200' },
        { title: 'Dashboard Overview', duration: '6:15', thumbnail: '/api/placeholder/300/200' }
      ]
    },
    {
      title: 'Product Management',
      description: 'Master your product listings and inventory',
      videos: [
        { title: 'Product Photography Tips', duration: '12:30', thumbnail: '/api/placeholder/300/200' },
        { title: 'Writing Effective Descriptions', duration: '9:20', thumbnail: '/api/placeholder/300/200' },
        { title: 'Pricing Strategies', duration: '11:45', thumbnail: '/api/placeholder/300/200' }
      ]
    },
    {
      title: 'Sales & Marketing',
      description: 'Boost your sales with proven strategies',
      videos: [
        { title: 'SEO Optimization', duration: '15:30', thumbnail: '/api/placeholder/300/200' },
        { title: 'Social Media Promotion', duration: '13:20', thumbnail: '/api/placeholder/300/200' },
        { title: 'Customer Communication', duration: '10:15', thumbnail: '/api/placeholder/300/200' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Video Tutorials</h1>
          <p className="text-primary-foreground/80 mt-2">
            Step-by-step video guides to help you succeed as a seller
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {videoCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => (
                <div key={videoIndex} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-primary" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                      <Button size="sm">
                        <Icon name="Play" size={16} className="mr-2" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTutorials;
