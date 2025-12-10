import React from 'react';

const BookingsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: 'bi-calendar-check', count: 0 },
    { id: 'past', label: 'Past', icon: 'bi-check-circle', count: 0 },
    { id: 'cancelled', label: 'Cancelled', icon: 'bi-x-circle', count: 0 }
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-fill">
          {tabs.map(tab => (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <i className={`bi ${tab.icon} me-2`}></i>
                {tab.label}
                {/* {tab.count > 0 && (
                  <span className="badge bg-primary ms-2">{tab.count}</span>
                )} */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingsTabs;