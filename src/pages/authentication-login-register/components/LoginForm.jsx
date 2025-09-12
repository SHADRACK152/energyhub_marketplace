import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationRouter';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useTranslation } from '../../../utils/i18n.jsx';

const LoginForm = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  // Mock credentials for different user types
  const mockCredentials = {
    seller: { email: 'seller@energyhub.com', password: 'Seller123!' },
    buyer: { email: 'buyer@energyhub.com', password: 'Buyer123!' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Password strength feedback
    if (name === 'password') {
      if (!value) setPasswordStrength('');
      else if (value.length < 6) setPasswordStrength('Weak');
      else if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value)) setPasswordStrength('Strong');
      else setPasswordStrength('Medium');
    }
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error || 'Login failed. Please try again.' });
        return;
      }
      // Store token and user info
      login({ ...data.user, token: data.token });
      // Redirect based on role
      if (data.user.role === 'seller') {
        navigate('/b2b-seller-dashboard');
      } else {
        navigate('/b2c-buyer-dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading('');
      alert(`Social login with ${provider} (demo only)`);
    }, 1200);
  };

  const handleDemoLogin = (type) => {
    setFormData({
      email: mockCredentials[type].email,
      password: mockCredentials[type].password,
      rememberMe: false
    });
    setPasswordStrength('Strong');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotStatus('');
    if (!forgotEmail) {
      setForgotStatus('Please enter your email.');
      return;
    }
    // Simulate API call
    setForgotStatus('Sending reset link...');
    setTimeout(() => {
      setForgotStatus('If this email exists, a reset link has been sent.');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background py-12 px-2">
      <div className="w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 relative animate-fade-in backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary mb-2 tracking-tight drop-shadow">{t('hero.title')}</h2>
          <p className="text-muted-foreground">{t('nav.signin')} {t('footer.description')}</p>
        </div>
      {errors?.general && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">{errors?.general}</p>
          </div>
        </div>
      )}
  <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t('profile.email')}
          type="email"
          name="email"
          placeholder={t('footer.newsletter.placeholder')}
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <div className="relative">
            <Input
            label={t('profile.password') || 'Password'}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('payment.enterPin') || 'Enter your password'}
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-9 text-muted-foreground hover:text-primary transition-transform duration-200 ${showPassword ? 'rotate-12' : ''}`}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          {passwordStrength && (
            <div className={`mt-1 text-xs font-medium ${passwordStrength === 'Strong' ? 'text-success' : passwordStrength === 'Medium' ? 'text-warning' : 'text-error'}`}>Password strength: {passwordStrength}</div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label={t('profile.preferences')}
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            onClick={() => setShowForgotModal(true)}
          >
            {t('profile.changePassword')}
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? t('messages.loading') : t('nav.signin')}
        </Button>
  {/* Demo login buttons removed */}
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('Google')}
            iconName="Chrome"
            iconPosition="left"
            iconSize={18}
            loading={socialLoading === 'Google'}
            disabled={!!socialLoading}
          >
            {socialLoading === 'Google' ? 'Signing in...' : 'Google'}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('LinkedIn')}
            iconName="Linkedin"
            iconPosition="left"
            iconSize={18}
            loading={socialLoading === 'LinkedIn'}
            disabled={!!socialLoading}
          >
            {socialLoading === 'LinkedIn' ? 'Signing in...' : 'LinkedIn'}
          </Button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Sign up
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm relative animate-fade-in">
            <button className="absolute top-2 right-2 text-muted-foreground hover:text-primary" onClick={() => setShowForgotModal(false)}>
              <Icon name="X" size={20} />
            </button>
            <h3 className="text-lg font-bold mb-2 text-foreground">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-3">
              <Input
                label="Email Address"
                type="email"
                name="forgotEmail"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="default" fullWidth>Send Reset Link</Button>
            </form>
            {forgotStatus && <div className="mt-2 text-xs text-muted-foreground">{forgotStatus}</div>}
          </div>
        </div>
      )}
      {/* CLOSE main card container */}
      </div>
    </div>
  );
};

export default LoginForm;