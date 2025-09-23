// src/pages/Events.js
import React from 'react';
import EventCard from '../components/EventCard';

const Events = ({ events }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Wedding Events</h1>
        
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No events available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;