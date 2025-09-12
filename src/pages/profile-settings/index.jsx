import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { useTranslation } from '../../utils/i18n.jsx';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Shadrack Emadau',
    email: user?.email || 'shadrack@energyhub.com',
    phone: user?.phone || '+234 901 234 5678',
    company: user?.company || 'EnergyHub Solutions',
    location: user?.location || 'Nairobi, Kenya',
    bio: user?.bio || 'Passionate about renewable energy solutions and sustainable business practices.'
  });

  // Security form state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    priceAlerts: true,
    currency: 'KES',
    language: currentLanguage, // Use current language from translation context
    timezone: 'Africa/Nairobi'
  });

  const tabs = [
    { id: 'profile', label: t('profile.personalInfo'), icon: 'User' },
    { id: 'security', label: t('profile.security'), icon: 'Shield' },
    { id: 'preferences', label: t('profile.preferences'), icon: 'Settings' },
    { id: 'billing', label: t('profile.billing'), icon: 'CreditCard' }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      if (updateUser) {
        updateUser({ ...user, ...profileData });
      }
      
      showToast(t('messages.profileUpdated'), { type: 'success' });
    } catch (error) {
      showToast(t('messages.tryAgain'), { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast('New passwords do not match!', { type: 'error' });
      return;
    }
    
    if (securityData.newPassword.length < 8) {
      showToast('Password must be at least 8 characters long!', { type: 'error' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast(t('messages.passwordUpdated'), { type: 'success' });
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(t('messages.tryAgain'), { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast(t('messages.preferencesUpdated'), { type: 'success' });
    } catch (error) {
      showToast(t('messages.tryAgain'), { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Icon name="User" size={32} color="white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-primary/90 transition-smooth">
                  <Icon name="Camera" size={16} color="white" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">{t('profile.photo')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('profile.photoDescription')}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                      {t('profile.uploadPhoto')}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      {t('profile.removePhoto')}
                    </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('profile.fullName')}</label>
                  <Input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('profile.email')}</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <Input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <Input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  {t('profile.cancel')}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('profile.saving') : t('profile.save')}
                </Button>
              </div>
            </form>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('profile.changePassword')}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t('profile.changePasswordDesc')}</p>
            </div>

            <form onSubmit={handleSecuritySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                <Input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <Input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                <Input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">{t('profile.passwordRequirementsTitle')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span>{t('profile.passwordRequirement1')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span>{t('profile.passwordRequirement2')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span>{t('profile.passwordRequirement3')}</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' })}>
                  {t('profile.cancel')}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('profile.updating') : t('profile.changePassword')}
                </Button>
              </div>
            </form>

            <hr className="border-border" />

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-medium text-foreground">SMS Authentication</div>
                  <div className="text-sm text-muted-foreground">Receive codes via SMS</div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('profile.preferences')}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t('messages.tryAgain')}</p>
            </div>

            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in your browser' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional emails and offers' },
                  { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about order status changes' },
                  { key: 'priceAlerts', label: 'Price Alerts', description: 'Get notified when prices drop on watched items' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences[item.key]}
                        onChange={(e) => setPreferences({ ...preferences, [item.key]: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>

              <hr className="border-border" />

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Regional Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                      value={preferences.currency}
                      onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    >
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t('profile.preferences')}</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                      value={preferences.language}
                      onChange={(e) => {
                        const newLanguage = e.target.value;
                        setPreferences({ ...preferences, language: newLanguage });
                        changeLanguage(newLanguage); // Actually change the app language
                      }}
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.nativeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    >
                      <option value="Africa/Nairobi">East Africa Time (Nairobi)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="Europe/London">Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </form>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Payment Methods</h3>
              <p className="text-sm text-muted-foreground mb-6">Manage your payment methods and billing information</p>
            </div>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                </div>
              </div>

              <button className="w-full border-2 border-dashed border-border rounded-lg p-6 flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth">
                <Icon name="Plus" size={20} />
                <span>Add New Payment Method</span>
              </button>
            </div>

            <hr className="border-border" />

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Billing History</h4>
              <div className="space-y-3">
                {[
                  { id: 'INV-2024-001', date: 'Sep 1, 2024', amount: 'KSh 45,000.00', status: 'Paid' },
                  { id: 'INV-2024-002', date: 'Aug 15, 2024', amount: 'KSh 32,500.00', status: 'Paid' },
                  { id: 'INV-2024-003', date: 'Aug 1, 2024', amount: 'KSh 67,800.00', status: 'Paid' }
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{invoice.id}</div>
                        <div className="text-sm text-muted-foreground">{invoice.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{invoice.amount}</div>
                      <div className="text-sm text-green-600">{invoice.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('profile.title')}</h1>
              <p className="text-muted-foreground">{t('profile.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-smooth ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
