// src/pages/About.js
import React from 'react';
import { FaUsers, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Bab Studio has been creating magical moments for couples on their special day. 
              Our team of experienced wedding planners and coordinators are dedicated to making your wedding dreams come true.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that every love story is unique, and we strive to create personalized experiences that reflect 
              your personality and style. From intimate gatherings to grand celebrations, we handle every detail with care.
            </p>
            <p className="text-gray-600">
              With over 500 weddings planned and countless happy couples, we take pride in our reputation for excellence 
              and attention to detail in the wedding industry.
            </p>
          </div>
          <div>
            <img 
              src="/images/hero1.jpg" 
              alt="Our team" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
        
        <div className="bg-gray-100 py-12 px-4 rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
              <p className="text-gray-600">Our team has over 10 years of experience in wedding planning and coordination.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-gray-600">Recognized as one of the top wedding planning companies for three consecutive years.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-pink-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">We tailor our services to your unique vision and preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;