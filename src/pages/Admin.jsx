// src/pages/Admin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const Admin = ({ events, addEvent, updateEvent, deleteEvent }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ id: null, title: '', date: '', location: '', image: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      updateEvent(currentEvent.id, currentEvent);
    } else {
      addEvent(currentEvent);
    }
    
    setCurrentEvent({ id: null, title: '', date: '', location: '', image: '', description: '' });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-pink-500 hover:text-pink-600 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Website
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
            <button 
              onClick={() => {
                setCurrentEvent({ id: null, title: '', date: '', location: '', image: '', description: '' });
                setIsEditing(false);
                setShowForm(true);
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded flex items-center hover:bg-pink-600 transition"
            >
              <FaPlus className="mr-2" /> Add New Event
            </button>
          </div>
          
          {showForm && (
            <div className="mb-8 p-4 border border-gray-200 rounded">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentEvent.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="e.g. June 15, 2023"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={currentEvent.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={currentEvent.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="e.g. /images/event1.jpg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={currentEvent.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                  >
                    {isEditing ? 'Update Event' : 'Add Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Current Events</h2>
            
            {events.length === 0 ? (
              <p className="text-gray-600">No events found. Add your first event!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Location</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{event.title}</td>
                        <td className="py-3 px-4">{event.date}</td>
                        <td className="py-3 px-4">{event.location}</td>
                        <td className="py-3 px-4 flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;