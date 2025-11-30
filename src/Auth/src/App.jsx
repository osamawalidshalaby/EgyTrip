import React, { useState, useEffect } from 'react';
import AuthPage from './components/pages/AuthPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import './styles/global.css';

export default function App() {
  const [currentView, setCurrentView] = useState('auth');

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('userEmail');
    
    if (token && email) {
      window.location.href = '/dashboard'; 
    }
  }, []);

  const handleAuthSuccess = (email) => {
    // Store authentication data
    sessionStorage.setItem('authToken', 'mock_token_' + Date.now());
    sessionStorage.setItem('userEmail', email);
    
    window.location.href = '/dashboard'; 
  };

  if (currentView === 'forgot') {
    return <ForgotPasswordPage onBack={() => setCurrentView('auth')} />;
  }

  return (
    <AuthPage 
      onAuthSuccess={handleAuthSuccess} 
      onForgotPassword={() => setCurrentView('forgot')} 
    />
  );
}