// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebook, FaInstagram, FaTwitter, FaLock } from 'react-icons/fa';

const Footer = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const adminUsername = import.meta.env.VITE_REACT_APP_ADMIN_USERNAME;
    if (username == adminUsername && password == import.meta.env.VITE_REACT_APP_ADMIN_PASSWORD) {
      window.location.href = '/admin';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bab Studio</h3>
            <p className="text-gray-300">Creating unforgettable moments for your special day.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition">Events</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><FaTwitter size={24} /></a>
            </div>
            
            {/* Admin Login Button */}
            <button 
              onClick={() => setShowLogin(!showLogin)}
              className="flex items-center text-sm text-gray-300 hover:text-white transition"
            >
              <FaLock className="mr-1" size={14} /> Admin Login
            </button>
            
            {/* Login Form */}
            {showLogin && (
              <form onSubmit={handleLogin} className="mt-2 p-3 bg-gray-700 rounded">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mb-2 rounded text-gray-800"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-2 rounded text-gray-800"
                  required
                />
                <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
                  Login
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p className="flex items-center justify-center">
            Made with <FaHeart className="mx-1 text-pink-500" /> © {new Date().getFullYear()} Bab Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;