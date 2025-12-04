import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Components/Sidebar';
import MyBookings from '../Components/MyBookings';
import SavedTours from '../Components/SavedTours';
import MyReviews from '../Components/MyReviews';
import AccountSettings from '../Components/AccountSettings';

const UserDashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSidebarItem) {
      case 'bookings':
        return <MyBookings />;
      case 'saved':
        return <SavedTours />;
      case 'reviews':
        return <MyReviews />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <MyBookings />;
    }
  };

  return (
    <div className="d-flex">
      
      {!sidebarOpen && (
        <button 
          className="btn btn-info position-fixed d-md-none"
          style={{ top: '20px', left: '20px', zIndex: 1060 }}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      <Sidebar 
        activeItem={activeSidebarItem} 
        onItemClick={(item) => {
          setActiveSidebarItem(item);
          setSidebarOpen(false); 
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-grow-1 p-3 p-md-5" style={{ 
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh',
        marginLeft: '0',
        width: '100%'
      }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;