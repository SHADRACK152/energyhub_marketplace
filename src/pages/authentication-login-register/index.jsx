import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BenefitsPanel from './components/BenefitsPanel';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [selectedUserType, setSelectedUserType] = useState('buyer');

  const handleBackToHome = () => {
    navigate('/landing-page');
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Update user type when register form changes
  const handleUserTypeChange = (userType) => {
    setSelectedUserType(userType);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EnergyHub</span>
            </div>

            {/* Back to Home */}
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
            
            {/* Left Column - Authentication Forms */}
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              {/* Tab Navigation */}
              <div className="flex bg-muted rounded-lg p-1 mb-8">
                <button
                  onClick={() => handleTabSwitch('login')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === 'login' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleTabSwitch('register')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === 'register' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                {activeTab === 'login' ? (
                  <LoginForm onSwitchToRegister={() => handleTabSwitch('register')} />
                ) : (
                  <RegisterForm 
                    onSwitchToLogin={() => handleTabSwitch('login')}
                    onUserTypeChange={handleUserTypeChange}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Benefits Panel (Desktop) */}
            <div className="hidden lg:block">
              <BenefitsPanel userType={activeTab === 'register' ? selectedUserType : 'buyer'} />
            </div>

            {/* Mobile Benefits Section */}
            <div className="lg:hidden mt-8">
              <BenefitsPanel userType={activeTab === 'register' ? selectedUserType : 'buyer'} />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>&copy; {new Date()?.getFullYear()} EnergyHub. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationPage;