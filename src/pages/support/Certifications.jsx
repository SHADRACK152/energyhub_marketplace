import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Certifications = () => {
  const navigate = useNavigate();

  const certificationPrograms = [
    {
      title: 'EnergyHub Certified Seller',
      level: 'Beginner',
      duration: '2-3 hours',
      modules: 5,
      description: 'Learn the fundamentals of selling on EnergyHub Marketplace.',
      benefits: [
        'Verified badge on your seller profile',
        'Priority customer support',
        'Access to exclusive seller resources',
        'Higher search ranking for products'
      ],
      requirements: [
        'Complete all 5 learning modules',
        'Pass final assessment (80% or higher)',
        'Have an active seller account'
      ],
      status: 'available'
    },
    {
      title: 'Solar Solutions Expert',
      level: 'Intermediate',
      duration: '4-6 hours',
      modules: 8,
      description: 'Specialize in solar panel systems and become a trusted solar advisor.',
      benefits: [
        'Solar Expert badge',
        'Featured in solar product categories',
        'Access to technical resources',
        'Certification valid for 2 years'
      ],
      requirements: [
        'EnergyHub Certified Seller prerequisite',
        'Complete solar technology training',
        'Pass comprehensive solar exam',
        'Maintain 4.5+ star rating'
      ],
      status: 'available'
    },
    {
      title: 'Energy Storage Specialist',
      level: 'Advanced',
      duration: '6-8 hours',
      modules: 10,
      description: 'Master battery systems and energy storage solutions.',
      benefits: [
        'Battery Expert badge',
        'Priority listing in battery category',
        'Technical consultation opportunities',
        'Industry recognition certificate'
      ],
      requirements: [
        'Solar Solutions Expert prerequisite',
        'Complete advanced battery training',
        'Pass technical assessment',
        'Submit case study project'
      ],
      status: 'coming-soon'
    },
    {
      title: 'Renewable Energy Consultant',
      level: 'Expert',
      duration: '10-15 hours',
      modules: 12,
      description: 'Become a certified consultant for complete renewable energy solutions.',
      benefits: [
        'Consultant badge and profile',
        'Consultation service offerings',
        'Revenue sharing opportunities',
        'Annual certification renewal'
      ],
      requirements: [
        'All previous certifications',
        'Industry experience verification',
        'Complete consulting training',
        'Portfolio review and approval'
      ],
      status: 'coming-soon'
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      case 'Expert': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
          <h1 className="text-3xl font-bold">Seller Certifications</h1>
          <p className="text-primary-foreground/80 mt-2">
            Enhance your credibility and grow your business with professional certifications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Overview */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Get Certified?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6">
              <Icon name="Award" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Build Trust</h3>
              <p className="text-muted-foreground text-sm">
                Showcase your expertise with verified badges and certifications
              </p>
            </div>
            <div className="p-6">
              <Icon name="TrendingUp" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Increase Sales</h3>
              <p className="text-muted-foreground text-sm">
                Certified sellers see 40% higher conversion rates on average
              </p>
            </div>
            <div className="p-6">
              <Icon name="Users" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Stand Out</h3>
              <p className="text-muted-foreground text-sm">
                Get featured placement and priority support as a certified seller
              </p>
            </div>
          </div>
        </div>

        {/* Certification Programs */}
        <div className="space-y-8">
          {certificationPrograms.map((cert, index) => (
            <div key={index} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-semibold">{cert.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(cert.level)}`}>
                        {cert.level}
                      </span>
                      {cert.status === 'coming-soon' && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium text-yellow-600 bg-yellow-100">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{cert.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Icon name="Clock" size={16} className="mr-2 text-primary" />
                          Duration & Modules
                        </h4>
                        <p className="text-sm text-muted-foreground">{cert.duration}</p>
                        <p className="text-sm text-muted-foreground">{cert.modules} learning modules</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Icon name="Gift" size={16} className="mr-2 text-primary" />
                          Benefits
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {cert.benefits.slice(0, 2).map((benefit, idx) => (
                            <li key={idx}>• {benefit}</li>
                          ))}
                          {cert.benefits.length > 2 && (
                            <li className="text-primary">+ {cert.benefits.length - 2} more benefits</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Icon name="CheckSquare" size={16} className="mr-2 text-primary" />
                          Requirements
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {cert.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx}>• {req}</li>
                          ))}
                          {cert.requirements.length > 2 && (
                            <li className="text-primary">+ {cert.requirements.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-8 flex flex-col gap-2 min-w-[200px]">
                    {cert.status === 'available' ? (
                      <>
                        <Button className="w-full">
                          <Icon name="BookOpen" size={16} className="mr-2" />
                          Start Certification
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Icon name="Info" size={16} className="mr-2" />
                          Learn More
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Clock" size={16} className="mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Certified?</h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Join thousands of certified sellers who have increased their sales and built successful businesses on EnergyHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Icon name="Award" size={16} className="mr-2" />
              Start with Basic Certification
            </Button>
            <Button size="lg" variant="ghost" className="text-primary-foreground border-primary-foreground">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
