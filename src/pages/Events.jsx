// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import eventsMiddleware from '../middlewares/eventsMiddleware'; // Fixed import name

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsMiddleware.GetAllEvents();
        console.log("API Response:", response);
        
        // Set events from API response
        if (response && response.events) {
          setEvents(response.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.log("Error is:", error);
        setError(error.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-xl">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 text-xl">Error loading events: {error}</p>
        </div>
      </div>
    );
  }

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
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;