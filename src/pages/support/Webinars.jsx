import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Webinars = () => {
  const navigate = useNavigate();

  const upcomingWebinars = [
    {
      title: 'Maximizing Solar Panel Sales in Q4',
      date: '2025-09-15',
      time: '2:00 PM PST',
      duration: '60 min',
      presenter: 'Sarah Chen, Senior Sales Expert',
      description: 'Learn proven strategies to increase solar panel sales during the peak season.',
      attendees: 156,
      status: 'upcoming'
    },
    {
      title: 'Advanced Product Photography Workshop',
      date: '2025-09-20',
      time: '11:00 AM PST',
      duration: '90 min',
      presenter: 'Mike Rodriguez, Photography Specialist',
      description: 'Hands-on workshop for taking professional product photos that sell.',
      attendees: 89,
      status: 'upcoming'
    },
    {
      title: 'Customer Service Excellence for Energy Products',
      date: '2025-09-25',
      time: '1:00 PM PST',
      duration: '45 min',
      presenter: 'Lisa Wang, Customer Success Manager',
      description: 'Best practices for handling customer inquiries and building long-term relationships.',
      attendees: 134,
      status: 'upcoming'
    }
  ];

  const pastWebinars = [
    {
      title: 'Getting Started: Your First Month on EnergyHub',
      date: '2025-09-05',
      presenter: 'John Smith, Platform Expert',
      description: 'Complete guide for new sellers covering all the basics.',
      recording: true
    },
    {
      title: 'SEO Optimization for Product Listings',
      date: '2025-08-28',
      presenter: 'Emma Davis, Marketing Specialist',
      description: 'Improve your product visibility with advanced SEO techniques.',
      recording: true
    },
    {
      title: 'Understanding Energy Market Trends',
      date: '2025-08-20',
      presenter: 'Dr. Robert Green, Industry Analyst',
      description: 'Market insights and trends affecting renewable energy sales.',
      recording: true
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
          <h1 className="text-3xl font-bold">Webinars</h1>
          <p className="text-primary-foreground/80 mt-2">
            Live training sessions with industry experts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Webinars */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Upcoming Webinars</h2>
          <div className="space-y-6">
            {upcomingWebinars.map((webinar, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                    <p className="text-muted-foreground mb-4">{webinar.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <Icon name="Calendar" size={16} className="mr-2 text-primary" />
                        {webinar.date}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Clock" size={16} className="mr-2 text-primary" />
                        {webinar.time}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Timer" size={16} className="mr-2 text-primary" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Users" size={16} className="mr-2 text-primary" />
                        {webinar.attendees} registered
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Presenter:</span> {webinar.presenter}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2">
                    <Button>
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Register Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Webinars */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Past Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastWebinars.map((webinar, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-2 text-primary" />
                    {webinar.date}
                  </div>
                  <div className="flex items-center">
                    <Icon name="User" size={14} className="mr-2 text-primary" />
                    {webinar.presenter}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Icon name="Play" size={16} className="mr-2" />
                  Watch Recording
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Never Miss a Webinar</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our webinar notifications and get early access to new training sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-input rounded-md"
            />
            <Button>
              <Icon name="Mail" size={16} className="mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinars;
