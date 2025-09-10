import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      category: 'Getting Started',
      questions: [
        { q: 'How do I create an account?', a: 'Click on "Sign Up" and choose between Buyer or Seller account types.' },
        { q: 'Is it free to join?', a: 'Yes, creating an account is completely free for both buyers and sellers.' },
        { q: 'How do I verify my account?', a: 'After registration, check your email for verification instructions.' }
      ]
    },
    {
      category: 'Buying',
      questions: [
        { q: 'How do I place an order?', a: 'Browse products, add to cart, and proceed to checkout with your payment details.' },
        { q: 'What payment methods do you accept?', a: 'We accept credit cards, PayPal, and bank transfers.' },
        { q: 'How long does shipping take?', a: 'Shipping times vary by seller and location, typically 3-14 business days.' }
      ]
    },
    {
      category: 'Selling',
      questions: [
        { q: 'How do I list products?', a: 'Go to your Seller Dashboard and click "Add Product" to create new listings.' },
        { q: 'What are the selling fees?', a: 'We charge a 5% transaction fee on successful sales.' },
        { q: 'When do I get paid?', a: 'Payments are processed within 2-3 business days after order confirmation.' }
      ]
    }
  ];

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
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="text-primary-foreground/80 mt-2">
            Find answers to frequently asked questions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg text-center hover:shadow-md transition-shadow">
            <Icon name="MessageCircle" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-muted-foreground text-sm mb-4">Get instant help from our support team</p>
            <Button size="sm">Start Chat</Button>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-md transition-shadow">
            <Icon name="Mail" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-muted-foreground text-sm mb-4">Send us detailed questions via email</p>
            <Button size="sm" onClick={() => navigate('/contact-us')}>Contact Us</Button>
          </div>
          <div className="p-6 border rounded-lg text-center hover:shadow-md transition-shadow">
            <Icon name="Phone" size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-muted-foreground text-sm mb-4">Call us during business hours</p>
            <Button size="sm">+1 (555) 123-4567</Button>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqItems.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => (
                  <details key={itemIndex} className="border rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-muted/50 font-medium">
                      {item.q}
                    </summary>
                    <div className="p-4 pt-0 text-muted-foreground">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">For Buyers</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• How to Buy Guide</li>
                <li>• Product Categories</li>
                <li>• Payment Security</li>
                <li>• Return Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Sellers</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Seller Guidelines</li>
                <li>• Product Listing Tips</li>
                <li>• Marketing Tools</li>
                <li>• Analytics Dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/contact-us')}>
              Contact Support
            </Button>
            <Button variant="outline">
              Community Forum
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
