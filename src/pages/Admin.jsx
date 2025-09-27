// src/pages/Admin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaArrowLeft, FaUpload } from 'react-icons/fa';
import eventsMiddleware from '../middlewares/eventsMiddleware';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });
  const [displayImage, setDisplayImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsMiddleware.GetAllEvents();
      if (response && response.events) {
        setEvents(response.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDisplayImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setDisplayImage(file);
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate all files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Please select only image files');
      return;
    }

    setGalleryImages(prev => [...prev, ...files]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayImage) {
      alert('Please select a display image');
      return;
    }

    try {
      setUploadProgress(0);
      setLoading(true);

      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('description', formData.description);

      // Append display image
      formDataToSend.append('displayImage', displayImage);

      // Append gallery images
      galleryImages.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      // Simulate upload progress (you can replace this with actual progress tracking)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await eventsMiddleware.CreateEvent(formDataToSend);
      clearInterval(progressInterval);
      setUploadProgress(100);
      resetForm();
      fetchEvents();

    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Failed to create event: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (eventId) => {
    console.log("eventId", eventId)
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await eventsMiddleware.DeleteEvent(eventId);
      fetchEvents();
      
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(`Failed to delete event: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      location: '',
      description: ''
    });
    setDisplayImage(null);
    setGalleryImages([]);
    setShowForm(false);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-pink-600 hover:text-pink-700 mb-6 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back to Website
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
              <p className="text-gray-600 mt-1">Manage your wedding events</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-pink-700 transition-all duration-200 font-medium"
            >
              <FaPlus className="mr-2" /> {showForm ? 'Cancel' : 'Add New Event'}
            </button>
          </div>

          {showForm && (
            <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Event</h2>

              {uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Event Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                      placeholder="e.g., Sarah & John's Wedding"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Date *</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                    placeholder="e.g., Grand Hotel, New York"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows="4"
                    required
                    placeholder="Describe the event..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Display Image *
                      {displayImage && (
                        <span className="text-green-600 text-sm ml-2">✓ Selected</span>
                      )}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleDisplayImageChange}
                        accept="image/*"
                        className="hidden"
                        id="displayImage"
                        required
                      />
                      <label htmlFor="displayImage" className="cursor-pointer block">
                        <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          {displayImage ? displayImage.name : 'Click to select display image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Gallery Images
                      {galleryImages.length > 0 && (
                        <span className="text-green-600 text-sm ml-2">({galleryImages.length} selected)</span>
                      )}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleGalleryImagesChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="galleryImages"
                      />
                      <label htmlFor="galleryImages" className="cursor-pointer block">
                        <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          Click to select multiple gallery images
                        </span>
                      </label>
                    </div>

                    {galleryImages.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {galleryImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? 'Creating...' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Events ({events.length})</h2>

            {loading && !showForm ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg">No events found. Create your first event!</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Event Name</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Location</th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">Images</th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map(event => (
                      <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{event.name}</td>
                        <td className="py-4 px-6 text-gray-700">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-gray-700">{event.location}</td>
                        <td className="py-4 px-6 text-center text-gray-700">
                          {event.images ? event.images.length + 1 : 1} images
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                            title="Delete Event"
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