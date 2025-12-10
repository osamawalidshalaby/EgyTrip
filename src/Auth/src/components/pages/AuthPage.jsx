import React, { useState } from 'react';
import TabSlider from '../ui/TabSlider';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

function AuthPage({ onAuthSuccess, onForgotPassword }) {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <TabSlider 
          activeTab={activeTab} 
          tabs={['login', 'signup']} 
          onTabChange={setActiveTab} 
        />

        {activeTab === 'login' ? (
          <LoginForm onSuccess={onAuthSuccess} onForgotPassword={onForgotPassword} />
        ) : (
          <SignupForm onSuccess={onAuthSuccess} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;