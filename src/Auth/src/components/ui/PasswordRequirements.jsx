import React from 'react';
import { CheckCircle } from 'lucide-react';

function PasswordRequirement({ met, text }) {
  return (
    <div className={`flex items-center gap-2 text-xs transition-colors ${met ? 'text-teal-600' : 'text-gray-400'}`}>
      <CheckCircle size={14} className={met ? 'opacity-100' : 'opacity-30'} />
      <span>{text}</span>
    </div>
  );
}

export default PasswordRequirement;