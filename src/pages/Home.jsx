// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaArrowLeft, FaArrowCircleRight } from 'react-icons/fa';
import EventCard from '../components/EventCard';

const Home = ({ events }) => {
  const featuredEvents = events.slice(0, 2);
  
  // Carousel images - replace these with your actual image paths
  const carouselImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="relative h-screen">
        {/* Carousel Images */}
        <div className="relative w-full h-full overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Wedding ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
        >
          <FaArrowLeft className="text-gray-800" />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next image"
        >
          <FaArrowRight className="text-gray-800" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Celebrate Your Special Day</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Creating unforgettable wedding experiences with attention to every detail.
            </p>
            <Link 
              to="/events" 
              className="bg-pink-500 text-white px-8 py-4 rounded-full inline-flex items-center text-lg hover:bg-pink-600 transition-all transform hover:scale-105"
            >
              View Our Events <FaArrowCircleRight className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/events" 
              className="text-pink-500 hover:text-pink-600 font-medium inline-flex items-center text-lg"
            >
              View All Events <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-pink-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Planning</h3>
              <p className="text-gray-600">Complete wedding planning services from concept to execution.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-pink-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Venue Selection</h3>
              <p className="text-gray-600">Find the perfect location for your ceremony and reception.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-pink-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Day Coordination</h3>
              <p className="text-gray-600">Ensure your wedding day runs smoothly with our coordination services.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;