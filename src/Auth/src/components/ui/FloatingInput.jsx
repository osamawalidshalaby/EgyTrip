import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function FloatingInput({ 
  id, 
  type, 
  label, 
  icon, 
  value, 
  onChange, 
  error, 
  showPasswordToggle, 
  showPassword, 
  onTogglePassword 
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3.5 border-2 rounded-xl bg-gray-50 transition-all outline-none ${
            error 
              ? 'border-red-500 bg-red-50' 
              : isFocused 
                ? 'border-teal-500 bg-white' 
                : 'border-gray-200'
          } ${showPasswordToggle ? 'pr-12' : ''}`}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all pointer-events-none flex items-center gap-2 ${
            value || isFocused
              ? '-top-2.5 text-xs bg-white px-1 scale-90'
              : 'top-3.5 text-sm text-gray-500'
          } ${error ? 'text-red-500' : isFocused ? 'text-teal-600' : 'text-gray-500'}`}
        >
          {icon}
          <span>{label}</span>
        </label>
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>
      )}
    </div>
  );
}

export default FloatingInput;