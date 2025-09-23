// src/components/EventCard.js
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2 text-pink-500" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-pink-500" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;