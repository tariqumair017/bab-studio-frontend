// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sarah & John's Wedding",
      date: "June 15, 2023",
      location: "Grand Hotel, New York",
      image: "/images/event1.jpg",
      description: "A beautiful outdoor ceremony followed by reception"
    },
    {
      id: 2,
      title: "Emily & Michael's Celebration",
      date: "July 22, 2023",
      location: "Beach Resort, Miami",
      image: "/images/event2.jpg",
      description: "Beach wedding with sunset views and cocktail party"
    }
  ]);

  const addEvent = (newEvent) => {
    const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id }]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => event.id === id ? { ...updatedEvent, id } : event));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home events={events} />} />
            <Route path="/events" element={<Events events={events} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  events={events} 
                  addEvent={addEvent} 
                  updateEvent={updateEvent} 
                  deleteEvent={deleteEvent} 
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;