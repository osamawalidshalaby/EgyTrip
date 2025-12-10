import React from 'react';

function TabSlider({ activeTab, tabs, onTabChange }) {
  return (
    <div className="relative flex gap-0 mb-10 bg-gray-100 p-1 rounded-xl">
      <div
        className={`absolute h-full w-1/2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg transition-all duration-500 ease-out ${
          activeTab === tabs[1] ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative z-10 flex-1 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === tab ? 'text-white' : 'text-gray-600'
          }`}
        >
          {tab === 'login' ? 'Login' : 'Sign Up'}
        </button>
      ))}
    </div>
  );
}

export default TabSlider;