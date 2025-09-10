import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CommunityForum = () => {
  const navigate = useNavigate();

  const forumCategories = [
    {
      title: 'Getting Started',
      description: 'New seller questions and introductions',
      posts: 142,
      icon: 'Lightbulb'
    },
    {
      title: 'Best Practices',
      description: 'Share tips and successful strategies',
      posts: 89,
      icon: 'Target'
    },
    {
      title: 'Product Photography',
      description: 'Tips for taking great product photos',
      posts: 67,
      icon: 'Camera'
    },
    {
      title: 'Marketing & Promotion',
      description: 'Discuss marketing strategies and campaigns',
      posts: 123,
      icon: 'Megaphone'
    },
    {
      title: 'Technical Support',
      description: 'Get help with platform features',
      posts: 45,
      icon: 'HelpCircle'
    },
    {
      title: 'Success Stories',
      description: 'Celebrate wins and share experiences',
      posts: 78,
      icon: 'Award'
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
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-primary-foreground/80 mt-2">
            Connect with other sellers and share best practices
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button className="mr-4">
            <Icon name="Plus" size={16} className="mr-2" />
            New Discussion
          </Button>
          <Button variant="outline">
            <Icon name="Search" size={16} className="mr-2" />
            Search Forum
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forumCategories.map((category, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name={category.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <Button variant="ghost" className="w-full">
                View Discussions
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
