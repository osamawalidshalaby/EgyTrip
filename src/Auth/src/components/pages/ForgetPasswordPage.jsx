import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import FloatingInput from '../ui/FloatingInput';
import SubmitButton from '../ui/SubmitButton';
import MessageAlert from '../ui/MessageAlert';
import authAPI from '../../services/authAPI';
import { validateEmail } from '../../utils/validation';

function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async () => {
    setError('');
    setMessage({ type: '', text: '' });

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setMessage({ type: 'success', text: 'Reset link sent! Check your email.' });
      setTimeout(() => onBack(), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send reset link. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-teal-600 font-semibold mb-6 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-500 text-sm">Enter your email to receive a reset link</p>
          </div>

          <FloatingInput
            id="resetEmail"
            type="email"
            label="Email Address"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <SubmitButton loading={loading} loadingText="Sending..." onClick={handleSubmit}>
            Send Reset Link
          </SubmitButton>

          <MessageAlert type={message.type} message={message.text} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;