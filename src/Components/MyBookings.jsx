import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard';
import BookingsTabs from './BookingsTabs';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Fetch all bookings
      const response = await fetch('http://localhost:3000/bookings');
      const allBookings = await response.json();
      
      // Filter bookings for the current user only
      const userBookings = allBookings.filter(booking => booking.userId === user.id);
      
      // Sort bookings by date (newest first)
      const sortedBookings = userBookings.sort((a, b) => new Date(b.date || b.bookingDate) - new Date(a.date || a.bookingDate));
      
      setBookings(sortedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on active tab
  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'upcoming':
        return bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed');
      case 'past':
        return bookings.filter(b => b.status === 'past' || b.status === 'completed');
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredBookings();

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'cancelled' })
        });

        if (response.ok) {
          alert('Booking cancelled successfully!');
          fetchBookings(); // Refresh bookings
        }
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">My Bookings</h1>
        <button className="btn btn-primary" onClick={fetchBookings}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-4 fw-bold">
                    {bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length}
                  </div>
                  <div>Upcoming</div>
                </div>
                <i className="bi bi-calendar-check fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-4 fw-bold">
                    {bookings.filter(b => b.status === 'past' || b.status === 'completed').length}
                  </div>
                  <div>Completed</div>
                </div>
                <i className="bi bi-check-circle fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-secondary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-4 fw-bold">
                    {bookings.filter(b => b.status === 'cancelled').length}
                  </div>
                  <div>Cancelled</div>
                </div>
                <i className="bi bi-x-circle fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={() => handleCancelBooking(booking.id)}
            />
          ))
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
              <h4>No {activeTab} bookings found</h4>
              <p className="text-muted">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming bookings. Start exploring tours!"
                  : `You don't have any ${activeTab} bookings.`}
              </p>
              {activeTab === 'upcoming' && (
                <a href="/destinations" className="btn btn-primary mt-2">
                  <i className="bi bi-compass me-2"></i>
                  Browse Tours
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Total Spent */}
      {bookings.length > 0 && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">Total Spent</h5>
                <p className="text-muted mb-0">Across all your bookings</p>
              </div>
              <div className="text-end">
                <h3 className="text-primary fw-bold">
                  ${bookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0)}
                </h3>
                <small className="text-muted">{bookings.length} bookings</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;