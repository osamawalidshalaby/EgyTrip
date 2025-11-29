import React from 'react';

const Sidebar = ({ activeItem, onItemClick, isOpen, onClose }) => {
  const menuItems = [
    { id: 'bookings', icon: '🎫', label: 'My Bookings' },
    { id: 'saved', icon: '❤️', label: 'Saved Tours' },
    { id: 'reviews', icon: '⭐', label: 'My Reviews' },
    { id: 'settings', icon: '⚙️', label: 'Account Settings' }
  ];

  return (
    <>
     
      {isOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ top: 0, left: 0, zIndex: 1040 }}
          onClick={onClose}
        />
      )}
      
     
      <div 
        className={`
          bg-light 
          ${isOpen ? 'position-fixed d-block' : 'd-none'} 
          d-md-block
        `}
        style={{ 
          width: '280px',
          height: '100vh',
          borderRight: '1px solid #e0e0e0',
          zIndex: 1050,
          left: 0,
          transition: 'transform 0.3s ease',
        }}
      >
        
        {isOpen && (
          <button 
            className="btn btn-close position-absolute d-md-none"
            style={{ top: '15px', right: '15px' }}
            onClick={onClose}
          />
        )}

        <div className="d-flex align-items-center mb-4 p-3">
          <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" 
               style={{ width: '50px', height: '50px', marginRight: '12px' }}>
            <span className="text-white fs-5">👤</span>
          </div>
          <div>
            <h6 className="mb-0 fw-bold">osama walid</h6>
            <small className="text-muted">osama walid@gmail.com</small>
          </div>
        </div>

        <nav className="mt-4 px-3">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`d-flex align-items-center p-3 rounded mb-2 ${
                item.id === activeItem ? 'bg-white shadow-sm' : ''
              }`}
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => onItemClick(item.id)}
            >
              <span className="me-3" style={{ fontSize: '20px' }}>{item.icon}</span>
              <span className={item.id === activeItem ? 'fw-semibold' : ''}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="position-absolute bottom-0 w-100 p-3">
          <div 
            className="d-flex align-items-center p-3"
            style={{ cursor: 'pointer' }}
            onClick={() => console.log('Logout clicked')}
          >
            <span className="me-3">🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;