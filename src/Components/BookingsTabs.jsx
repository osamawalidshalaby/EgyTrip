import React from 'react';

const BookingsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <ul className="nav nav-tabs border-0 mb-4 flex-nowrap overflow-auto">
      {tabs.map(tab => (
        <li className="nav-item flex-shrink-0" key={tab.id}>
          <button
            className={`nav-link px-3 px-md-4 py-2 py-md-3 border-0 ${
              activeTab === tab.id ? 'text-info fw-semibold border-bottom border-info border-3' : 'text-muted'
            }`}
            onClick={() => onTabChange(tab.id)}
            style={{ backgroundColor: 'transparent', whiteSpace: 'nowrap' }}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BookingsTabs;