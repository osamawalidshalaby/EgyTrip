import React, { useState, useEffect } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import FloatingInput from '../ui/FloatingInput';
import PasswordRequirement from '../ui/PasswordRequirement';
import SubmitButton from '../ui/SubmitButton';
import OAuthButton from '../ui/OAuthButton';
import MessageAlert from '../ui/MessageAlert';
import authAPI from '../../services/authAPI';
import { validateEmail, validateName, validatePassword, validatePasswordMatch } from '../../utils/validation';

function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordReqs, setPasswordReqs] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    if (formData.password) {
      setPasswordReqs(validatePassword(formData.password));
    }
  }, [formData.password]);

  const handleSubmit = async () => {
    setErrors({});
    setMessage({ type: '', text: '' });

    const newErrors = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePassword(formData.password).isValid) {
      newErrors.password = 'Password does not meet requirements';
    }
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await authAPI.signup(formData.name, formData.email, formData.password);
      if (result.success) {
        sessionStorage.setItem('authToken', result.token);
        sessionStorage.setItem('userEmail', formData.email);
        setMessage({ type: 'success', text: 'Account created! Redirecting...' });
        setTimeout(() => onSuccess(formData.email), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    const mockEmail = `demo.user+${provider}@example.com`;
    sessionStorage.setItem('authToken', 'mock_oauth_token_' + Date.now());
    sessionStorage.setItem('userEmail', mockEmail);
    setTimeout(() => onSuccess(mockEmail), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm">Join us today</p>
      </div>

      <FloatingInput
        id="signupName"
        type="text"
        label="Full Name"
        icon={<User size={18} />}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />

      <FloatingInput
        id="signupEmail"
        type="email"
        label="Email Address"
        icon={<Mail size={18} />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />

      <div>
        <FloatingInput
          id="signupPassword"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          icon={<Lock size={18} />}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
          <PasswordRequirement met={passwordReqs.length} text="At least 8 characters" />
          <PasswordRequirement met={passwordReqs.uppercase} text="One uppercase letter" />
          <PasswordRequirement met={passwordReqs.number} text="One number" />
          <PasswordRequirement met={passwordReqs.special} text="One special character (!@#$%^&*)" />
        </div>
      </div>

      <FloatingInput
        id="signupConfirm"
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirm Password"
        icon={<Lock size={18} />}
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        showPasswordToggle
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <SubmitButton loading={loading} loadingText="Creating account..." onClick={handleSubmit}>
        Sign Up
      </SubmitButton>

      <div className="relative text-center text-sm text-gray-500 font-medium my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <span className="relative bg-white px-4">OR</span>
      </div>

      <div className="flex gap-3">
        <OAuthButton provider="google" onClick={() => handleOAuth('google')} />
        <OAuthButton provider="github" onClick={() => handleOAuth('github')} />
      </div>

      <MessageAlert type={message.type} message={message.text} />
    </div>
  );
}

export default SignupForm;