import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationRouter';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userTypeOptions = [
    { value: 'seller', label: 'B2B Seller', description: 'I want to sell energy products' },
    { value: 'buyer', label: 'B2C Buyer', description: 'I want to buy energy products' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, userType: value }));
    if (errors?.userType) {
      setErrors(prev => ({ ...prev, userType: '' }));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-destructive' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-warning' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.userType) {
      newErrors.userType = 'Please select your account type';
    }
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData?.userType === 'seller' && !formData?.companyName?.trim()) {
      newErrors.companyName = 'Company name is required for sellers';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (getPasswordStrength(formData?.password) < 3) {
      newErrors.password = 'Password must be at least Fair strength';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          role: formData.userType
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error || 'Registration failed. Please try again.' });
        return;
      }
      // Auto-login after registration (use the same structure as login)
      if (data && data.user) {
        login({ ...data.user, token: data.token });
        // Redirect based on role
        if (data.user.role === 'seller') {
          navigate('/b2b-seller-dashboard');
        } else {
          navigate('/b2c-buyer-dashboard');
        }
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData?.password);
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join EnergyHub marketplace today</p>
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
        <Select
          label="Account Type"
          placeholder="Select your account type"
          options={userTypeOptions}
          value={formData?.userType}
          onChange={handleSelectChange}
          error={errors?.userType}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="John"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Smith"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="john@example.com"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
        />

        {formData?.userType === 'seller' && (
          <Input
            label="Company Name"
            type="text"
            name="companyName"
            placeholder="Your Company Name"
            value={formData?.companyName}
            onChange={handleInputChange}
            error={errors?.companyName}
            required
          />
        )}

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength <= 1 ? 'bg-destructive w-1/5' :
                      passwordStrength === 2 ? 'bg-warning w-2/5' :
                      passwordStrength === 3 ? 'bg-warning w-3/5' :
                      passwordStrength === 4 ? 'bg-success w-4/5': 'bg-success w-full'
                    }`}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${passwordStrengthInfo?.color}`}>
                  {passwordStrengthInfo?.text}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="acceptTerms"
          checked={formData?.acceptTerms}
          onChange={handleInputChange}
          error={errors?.acceptTerms}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;