import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationRouter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { useTranslation } from '../../utils/i18n.jsx';
import { apiCall, API_CONFIG } from '../../config/api';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Debug: Log user and profile picture state
  console.log('Current user:', user);
  console.log('Current profilePicture state:', profilePicture);

  // Add billing-related state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    }
  ]);

  const [billingHistory, setBillingHistory] = useState([
    { id: 'INV-2024-001', date: 'Sep 1, 2024', amount: 'KSh 45,000.00', status: 'Paid', description: 'Solar Panel Kit - Premium Package' },
    { id: 'INV-2024-002', date: 'Aug 15, 2024', amount: 'KSh 32,500.00', status: 'Paid', description: 'Battery Storage System' },
    { id: 'INV-2024-003', date: 'Aug 1, 2024', amount: 'KSh 67,800.00', status: 'Paid', description: 'Complete Solar Installation' }
  ]);

  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Shadrack Mark Emadau',
    email: user?.email || 'markemadu@gmail.com',
    phone: user?.phone || '0704027298',
    company: user?.company || '',
    location: user?.location || '',
    businessType: user?.businessType || 'Manufacturer',
    businessDescription: user?.businessDescription || 'Describe your business and specializations...',
    bio: user?.bio || 'Passionate about renewable energy solutions and sustainable business practices.',
    website: user?.website || '',
    businessAddress: user?.businessAddress || '',
    taxId: user?.taxId || '',
    businessLicense: user?.businessLicense || '',
    verificationStatus: user?.verificationStatus || 'pending',
    businessCategory: user?.businessCategory || 'renewable-energy',
    businessHours: user?.businessHours || '9:00 AM - 6:00 PM',
    paymentTerms: user?.paymentTerms || '30 days',
    minimumOrder: user?.minimumOrder || '0',
    socialMedia: {
      linkedin: user?.socialMedia?.linkedin || '',
      twitter: user?.socialMedia?.twitter || '',
      facebook: user?.socialMedia?.facebook || ''
    }
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
    { id: 'business', label: 'Business Info', icon: 'Building2' },
    { id: 'verification', label: 'Verification', icon: 'Shield' },
    { id: 'security', label: t('profile.security'), icon: 'Lock' },
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

  // Profile picture functions
  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', { type: 'error' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', { type: 'error' });
      return;
    }

    setIsUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('userId', user?.id || '');

      console.log('Uploading profile picture for user:', user?.id);

      const data = await apiCall(API_CONFIG.ENDPOINTS.UPLOAD_PROFILE_PICTURE, {
        method: 'POST',
        body: formData
      });

      console.log('Profile picture upload response:', data);
      setProfilePicture(data.profilePicture);
      
      // Update user context
      if (updateUser) {
        updateUser({ ...user, profilePicture: data.profilePicture });
      }

      showToast('Profile picture updated successfully', { type: 'success' });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      showToast('Failed to upload profile picture. Please try again.', { type: 'error' });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handlePhotoRemove = async () => {
    if (!profilePicture) return;

    setIsUploadingPhoto(true);

    try {
      await apiCall(API_CONFIG.ENDPOINTS.REMOVE_PROFILE_PICTURE, {
        method: 'DELETE',
        body: JSON.stringify({ userId: user?.id })
      });

      setProfilePicture(null);
      
      // Update user context
      if (updateUser) {
        updateUser({ ...user, profilePicture: null });
      }

      showToast('Profile picture removed successfully', { type: 'success' });
    } catch (error) {
      console.error('Error removing profile picture:', error);
      showToast('Failed to remove profile picture. Please try again.', { type: 'error' });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Payment method functions
  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate card number (basic validation)
      if (newPaymentMethod.cardNumber.replace(/\s/g, '').length < 16) {
        showToast('Please enter a valid card number', { type: 'error' });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCard = {
        id: Date.now().toString(),
        type: newPaymentMethod.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
        last4: newPaymentMethod.cardNumber.slice(-4),
        expiryMonth: newPaymentMethod.expiryMonth,
        expiryYear: newPaymentMethod.expiryYear,
        isDefault: paymentMethods.length === 0
      };

      setPaymentMethods([...paymentMethods, newCard]);
      setNewPaymentMethod({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
        billingAddress: ''
      });
      setShowAddPaymentModal(false);
      showToast('Payment method added successfully', { type: 'success' });
    } catch (error) {
      showToast('Failed to add payment method', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePaymentMethod = async (cardId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(paymentMethods.filter(card => card.id !== cardId));
      showToast('Payment method removed successfully', { type: 'success' });
    } catch (error) {
      showToast('Failed to remove payment method', { type: 'error' });
    }
  };

  const handleSetDefaultPaymentMethod = async (cardId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(paymentMethods.map(card => ({
        ...card,
        isDefault: card.id === cardId
      })));
      showToast('Default payment method updated', { type: 'success' });
    } catch (error) {
      showToast('Failed to update default payment method', { type: 'error' });
    }
  };

  const downloadInvoice = (invoiceId) => {
    // Simulate invoice download
    showToast(`Downloading invoice ${invoiceId}...`, { type: 'info' });
    // In a real app, this would trigger a file download
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load profile picture:', profilePicture);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Profile picture loaded successfully:', profilePicture);
                      }}
                    />
                  ) : (
                    <Icon name="User" size={32} color="white" />
                  )}
                </div>
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploadingPhoto}
                />
                <button 
                  onClick={() => document.getElementById('profilePictureInput')?.click()}
                  disabled={isUploadingPhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-primary/90 transition-smooth disabled:opacity-50"
                >
                  {isUploadingPhoto ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Icon name="Camera" size={16} color="white" />
                  )}
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">Profile Photo</h3>
                <p className="text-sm text-muted-foreground mb-3">Update your profile photo to personalize your account</p>
                <div className="flex space-x-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('profilePictureInput')?.click()}
                    disabled={isUploadingPhoto}
                  >
                    {isUploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                  {profilePicture && (
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={handlePhotoRemove}
                      disabled={isUploadingPhoto}
                    >
                      Remove
                    </Button>
                  )}
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
