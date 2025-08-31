import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName = "John" }) => {
  const currentHour = new Date()?.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {greeting}, {userName}!
          </h1>
          <p className="text-primary-foreground/80">
            Welcome back to your energy marketplace
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="bg-primary-foreground/20 p-3 rounded-full">
            <Icon name="Zap" size={24} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;