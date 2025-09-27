// src/components/EventCard.js
import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaImages } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use displayImage as main image, fallback to first gallery image if needed
  const displayImage = event.displayImage || (event.images && event.images[0]?.url) || '/images/event-placeholder.jpg';
  
  // Combine display image with gallery images for carousel
  const allImages = event.displayImage 
    ? [event.displayImage, ...(event.images?.map(img => img.url) || [])]
    : event.images?.map(img => img.url) || [];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Image Gallery Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={allImages[currentImageIndex]} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
            >
              ‹
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
            >
              ›
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}
        
        {/* Gallery Icon */}
        {allImages.length > 0 && (
          <div className="absolute top-2 left-2 flex items-center bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            <FaImages className="mr-1" />
            <span>{allImages.length}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2 text-pink-500 flex-shrink-0" />
          <span className="truncate">{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-pink-500 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        
        {/* Image Thumbnails (optional) */}
        {allImages.length > 1 && (
          <div className="mt-3 flex space-x-1 overflow-x-auto">
            {allImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${event.name} ${index + 1}`}
                className={`w-10 h-10 object-cover rounded cursor-pointer border-2 ${
                  index === currentImageIndex ? 'border-pink-500' : 'border-transparent'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;