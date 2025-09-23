// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-500">Bab Studio</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-500 transition">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-pink-500 transition">Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-500 transition">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-500 transition">Contact Us</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4">
            <Link to="/" className="block text-gray-700 hover:text-pink-500 transition" onClick={toggleMenu}>Home</Link>
            <Link to="/events" className="block text-gray-700 hover:text-pink-500 transition" onClick={toggleMenu}>Events</Link>
            <Link to="/about" className="block text-gray-700 hover:text-pink-500 transition" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-pink-500 transition" onClick={toggleMenu}>Contact Us</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;