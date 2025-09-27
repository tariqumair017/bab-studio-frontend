// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaArrowLeft, FaArrowCircleRight } from 'react-icons/fa';
import EventCard from '../components/EventCard';
import eventsMiddleware from '../middlewares/eventsMiddleware';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Carousel images - replace these with your actual image paths
  const carouselImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  // Team members data - you can add as many as you want
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Wedding Planner",
      image: "/images/TeamMember1.jpg",
      description: "With over 10 years of experience in wedding planning, Sarah specializes in creating magical moments that last a lifetime."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Event Coordinator",
      image: "/images/TeamMember1.jpg",
      description: "Michael's attention to detail ensures every aspect of your wedding day is perfectly executed and stress-free."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Specialist",
      image: "/images/TeamMember1.jpg",
      description: "Emily brings creative vision to life, designing stunning decor that reflects your unique love story."
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Venue Manager",
      image: "/images/TeamMember1.jpg",
      description: "David handles all venue logistics and vendor coordination to ensure seamless execution of your event."
    },
  ];

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsMiddleware.GetAllEvents();
        
        if (response && response.events) {
          setEvents(response.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Auto-advance team carousel every 5 seconds
  useEffect(() => {
    if (teamMembers.length > 4) {
      const interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => 
          prevIndex >= Math.ceil(teamMembers.length / 4) - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [teamMembers.length]);

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

  const goToNextTeam = () => {
    setCurrentTeamIndex((prevIndex) => 
      prevIndex >= Math.ceil(teamMembers.length / 4) - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevTeam = () => {
    setCurrentTeamIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(teamMembers.length / 4) - 1 : prevIndex - 1
    );
  };

  // Get featured events (first 2 events or all if less than 2)
  const featuredEvents = events.slice(0, 2);

  // Get current team members to display (4 at a time)
  const getCurrentTeamMembers = () => {
    const startIndex = currentTeamIndex * 4;
    return teamMembers.slice(startIndex, startIndex + 4);
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
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-xl">{error}</p>
            </div>
          ) : featuredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No events available at the moment. Please check back later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
              {events.length > 2 && (
                <div className="text-center mt-8">
                  <Link 
                    to="/events" 
                    className="text-pink-500 hover:text-pink-600 font-medium inline-flex items-center text-lg"
                  >
                    View All Events <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our dedicated team of wedding professionals is committed to making your special day 
              absolutely perfect. Get to know the experts who will bring your vision to life.
            </p>
          </div>
          
          {/* Team Carousel */}
          <div className="relative">
            {/* Navigation Arrows for Team Carousel */}
            {teamMembers.length > 4 && (
              <>
                <button
                  onClick={goToPrevTeam}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 transition-all z-10"
                  aria-label="Previous team members"
                >
                  <FaArrowLeft className="text-gray-800" />
                </button>
                <button
                  onClick={goToNextTeam}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 transition-all z-10"
                  aria-label="Next team members"
                >
                  <FaArrowRight className="text-gray-800" />
                </button>
              </>
            )}
            
            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {getCurrentTeamMembers().map(member => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-pink-500 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Carousel Indicators */}
            {teamMembers.length > 4 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentTeamIndex ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to team page ${index + 1}`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Event Planning</h3>
              <p className="text-gray-600">Complete wedding planning services from concept to execution with meticulous attention to detail.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMapMarkerAlt className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Venue Selection</h3>
              <p className="text-gray-600">Find the perfect location for your ceremony and reception from our curated list of venues.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Day Coordination</h3>
              <p className="text-gray-600">Ensure your wedding day runs smoothly with our professional on-site coordination services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-pink-500 mb-2">{events.length}+</div>
              <div className="text-gray-700 font-medium">Events Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-500 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-500 mb-2">5★</div>
              <div className="text-gray-700 font-medium">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Wedding?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let our experienced team help you create memories that will last a lifetime. 
            Contact us today to start planning your perfect day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </Link>
            <Link 
              to="/events" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-500 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;