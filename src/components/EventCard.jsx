// src/components/EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
	const mainImage = event.displayImage || (event.images && event.images[0]?.url) || '/images/event-placeholder.jpg';

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<Link to={`/events/${event._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
			<div className="h-48 overflow-hidden">
				<img 
					src={mainImage} 
					alt={event.name} 
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">{event.name}</h3>
				<div className="flex items-center text-gray-600 mb-2">
					<FaCalendarAlt className="mr-2 text-pink-500 flex-shrink-0" />
					<span className="truncate">{formatDate(event.date)}</span>
				</div>
				<div className="flex items-center text-gray-600">
					<FaMapMarkerAlt className="mr-2 text-pink-500 flex-shrink-0" />
					<span className="truncate">{event.location}</span>
				</div>
			</div>
		</Link>
	);
};

export default EventCard;