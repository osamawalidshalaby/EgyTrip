import React, { useState } from 'react';
import BookingCard from './BookingCard';
import BookingsTabs from './BookingsTabs';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 1,
      date: 'Oct 26, 2024',
      location: 'Paris, France',
      title: 'Eiffel Tower Summit & Seine River Cruise',
      description: 'Join us for a breathtaking view from the top of the Eiffel Tower, followed by a relaxing cruise along the Seine.',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      date: 'Nov 15, 2024',
      location: 'Rome, Italy',
      title: 'Ancient Rome & Colosseum Walking Tour',
      description: 'Step back in time as you explore the Roman Forum and the iconic Colosseum with an expert guide.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=300&fit=crop'
    }
  ];

  return (
    <>
      <h1 className="fw-bold mb-4">My Bookings</h1>

      <BookingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === 'upcoming' && bookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {activeTab === 'past' && (
          <div className="text-center text-muted py-5">
            <p>No past bookings</p>
          </div>
        )}
        {activeTab === 'cancelled' && (
          <div className="text-center text-muted py-5">
            <p>No cancelled bookings</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;