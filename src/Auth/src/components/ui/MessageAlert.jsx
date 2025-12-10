import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

function MessageAlert({ type, message }) {
  if (!message) return null;

  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${
      type === 'success'
        ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
        : 'bg-red-50 text-red-700 border-l-4 border-red-500'
    }`}>
      {type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
      {message}
    </div>
  );
}

export default MessageAlert;