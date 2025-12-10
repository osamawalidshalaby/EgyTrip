import React from 'react';

const BookingCard = ({ booking, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'upcoming':
      case 'confirmed':
        return 'primary';
      case 'past':
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'upcoming':
        return 'Upcoming';
      case 'confirmed':
        return 'Confirmed';
      case 'past':
        return 'Completed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = booking.status === 'upcoming' || booking.status === 'confirmed';

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="row">
          {/* Booking Image */}
          <div className="col-md-4 mb-3 mb-md-0">
            <img
              src={booking.image || 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&h=300&fit=crop'}
              className="img-fluid rounded"
              alt={booking.tourTitle || booking.title}
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Booking Details */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="fw-bold mb-2">{booking.tourTitle || booking.title}</h4>
                <div className="d-flex align-items-center mb-3">
                  <span className={`badge bg-${getStatusColor(booking.status)} me-2`}>
                    {getStatusText(booking.status)}
                  </span>
                  <span className="text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {formatDate(booking.date || booking.bookingDate)}
                  </span>
                </div>
              </div>
              <div className="text-end">
                <h4 className="text-primary fw-bold">${booking.totalPrice || booking.price || 0}</h4>
                <small className="text-muted">Total</small>
              </div>
            </div>

            {/* Booking Information */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="mb-2">
                  <i className="bi bi-geo-alt me-2 text-muted"></i>
                  <strong>Location:</strong> {booking.location || 'Not specified'}
                </p>
                {booking.guideName && (
                  <p className="mb-2">
                    <i className="bi bi-person me-2 text-muted"></i>
                    <strong>Guide:</strong> {booking.guideName}
                  </p>
                )}
                {booking.numberOfPeople && (
                  <p className="mb-2">
                    <i className="bi bi-people me-2 text-muted"></i>
                    <strong>People:</strong> {booking.numberOfPeople}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                {booking.type && (
                  <p className="mb-2">
                    <i className="bi bi-tag me-2 text-muted"></i>
                    <strong>Type:</strong> {booking.type}
                  </p>
                )}
                {booking.duration && (
                  <p className="mb-2">
                    <i className="bi bi-clock me-2 text-muted"></i>
                    <strong>Duration:</strong> {booking.duration} {booking.duration > 1 ? 'days' : 'day'}
                  </p>
                )}
                <p className="mb-2">
                  <i className="bi bi-calendar-plus me-2 text-muted"></i>
                  <strong>Booked on:</strong> {formatDate(booking.bookingDate)}
                </p>
              </div>
            </div>

            {/* Description */}
            {booking.description && (
              <div className="mb-4">
                <p className="text-muted mb-0">{booking.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              {isUpcoming && (
                <button 
                  className="btn btn-outline-danger"
                  onClick={onCancel}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel Booking
                </button>
              )}
              <button className="btn btn-outline-primary">
                <i className="bi bi-eye me-2"></i>
                View Details
              </button>
              {booking.guideName && (
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-chat me-2"></i>
                  Contact Guide
                </button>
              )}
              <button className="btn btn-outline-success">
                <i className="bi bi-download me-2"></i>
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;