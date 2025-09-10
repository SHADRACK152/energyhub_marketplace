import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SellerSupport = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: 'MessageCircle',
      availability: 'Available 24/7',
      action: 'Start Chat',
      urgent: true
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: 'Mail',
      availability: 'Response within 2 hours',
      action: 'Send Email',
      urgent: false
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a support representative',
      icon: 'Phone',
      availability: 'Mon-Fri 9AM-6PM PST',
      action: 'Call Now',
      urgent: true
    },
    {
      title: 'Video Call',
      description: 'Schedule a screen-sharing session for complex issues',
      icon: 'Video',
      availability: 'By appointment',
      action: 'Schedule Call',
      urgent: false
    }
  ];

  const faqItems = [
    {
      question: 'How do I upload products to my store?',
      answer: 'Go to your seller dashboard and click "Add Product". Fill in the required information including photos, description, and pricing.'
    },
    {
      question: 'When do I get paid for my sales?',
      answer: 'Payments are processed weekly on Fridays for all completed orders from the previous week.'
    },
    {
      question: 'How do I handle returns and refunds?',
      answer: 'You can manage returns through your dashboard. Our policy allows returns within 30 days for most products.'
    },
    {
      question: 'What are the seller fees?',
      answer: 'We charge a 5% transaction fee on each sale, plus payment processing fees (typically 2.9% + $0.30 per transaction).'
    },
    {
      question: 'How can I improve my product visibility?',
      answer: 'Use high-quality photos, detailed descriptions, competitive pricing, and relevant keywords. Check our seller guide for more tips.'
    }
  ];

  const contactInfo = {
    phone: '+1 (555) 123-4567',
    email: 'seller-support@energyhub.com',
    hours: 'Monday - Friday: 9 AM - 6 PM PST\nSaturday: 10 AM - 4 PM PST\nSunday: Closed'
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
          <h1 className="text-3xl font-bold">Seller Support</h1>
          <p className="text-primary-foreground/80 mt-2">
            Get help from our dedicated seller support team
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How Can We Help You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className={`bg-card p-6 rounded-lg shadow-sm border ${
                option.urgent ? 'border-primary' : 'border-border'
              } hover:shadow-md transition-shadow`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    option.urgent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={option.icon} size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{option.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">{option.availability}</p>
                  <Button 
                    className="w-full" 
                    variant={option.urgent ? 'default' : 'outline'}
                  >
                    {option.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground">{contactInfo.phone}</p>
              </div>
              <div>
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground">{contactInfo.email}</p>
              </div>
              <div>
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Support Hours</h3>
                <p className="text-muted-foreground whitespace-pre-line text-sm">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Icon name="HelpCircle" size={20} className="text-primary mr-3" />
                  {item.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate('/seller-resources')}>
              <Icon name="BookOpen" size={16} className="mr-2" />
              Seller Resources
            </Button>
            <Button variant="outline" onClick={() => navigate('/documentation')}>
              <Icon name="FileText" size={16} className="mr-2" />
              Documentation
            </Button>
            <Button variant="outline" onClick={() => navigate('/community-forum')}>
              <Icon name="Users" size={16} className="mr-2" />
              Community Forum
            </Button>
            <Button variant="outline" onClick={() => navigate('/b2b-seller-dashboard')}>
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Seller Dashboard
            </Button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Icon name="AlertTriangle" size={32} className="text-red-600 mx-auto mb-4" />
          <h3 className="font-semibold text-red-900 mb-2">Emergency Support</h3>
          <p className="text-red-800 mb-4">
            For urgent issues affecting your ability to sell or fulfill orders, contact our emergency line.
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            <Icon name="Phone" size={16} className="mr-2" />
            Emergency: +1 (555) 911-HELP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerSupport;
