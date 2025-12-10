import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import FloatingInput from '../ui/FloatingInput';
import SubmitButton from '../ui/SubmitButton';
import OAuthButton from '../ui/OAuthButton';
import MessageAlert from '../ui/MessageAlert';
import authAPI from '../../services/authAPI';
import { validateEmail } from '../../utils/validation';

function LoginForm({ onSuccess, onForgotPassword }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async () => {
    setErrors({});
    setMessage({ type: '', text: '' });

    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await authAPI.login(formData.email, formData.password);
      if (result.success) {
        sessionStorage.setItem('authToken', result.token);
        sessionStorage.setItem('userEmail', formData.email);
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => onSuccess(formData.email), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Invalid email or password' });
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">Login to your account</p>
      </div>

      <FloatingInput
        id="loginEmail"
        type="email"
        label="Email Address"
        icon={<Mail size={18} />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />

      <FloatingInput
        id="loginPassword"
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

      <div className="text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-teal-600 text-sm font-semibold hover:text-teal-700 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <SubmitButton loading={loading} loadingText="Logging in..." onClick={handleSubmit}>
        Login
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

export default LoginForm;