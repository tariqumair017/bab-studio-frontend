import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaImages } from 'react-icons/fa';
import eventsMiddleware from '../middlewares/eventsMiddleware';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				setLoading(true);
				const response = await eventsMiddleware.GetSingleEvent(id);
				if (response && response.event) {
					setEvent(response.event);
				} else {
					setEvent(null);
					setError('Event not found');
				}
			} catch (err) {
				setError(err?.message || 'Failed to load event');
			} finally {
				setLoading(false);
			}
		};
		fetchEvent();
	}, [id]);

	if (loading) {
		return (
			<div className="py-16">
				<div className="container mx-auto px-4 text-center">
					<p className="text-gray-600 text-xl">Loading event...</p>
				</div>
			</div>
		);
	}

	if (error || !event) {
		return (
			<div className="py-16">
				<div className="container mx-auto px-4 text-center">
					<p className="text-red-600 text-xl">{error || 'Event not found'}</p>
					<Link to="/events" className="inline-block mt-4 text-pink-600 hover:text-pink-700">Back to Events</Link>
				</div>
			</div>
		);
	}

	const allImages = [
		...(event.displayImage ? [event.displayImage] : []),
		...((event.images || []).map(img => img.url))
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	};

	return (
		<div className="py-8 md:py-12">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="mb-4">
					<Link to="/events" className="inline-flex items-center text-pink-600 hover:text-pink-700">
						<FaArrowLeft className="mr-2" /> Back to Events
					</Link>
				</div>

				<div className="bg-white rounded-lg shadow overflow-hidden">
					{/* Image Gallery */}
					<div className="w-full bg-black">
						<div className="relative w-full pt-[56.25%] md:pt-[40%]">
							{allImages.length > 0 ? (
								<img
									src={allImages[activeIndex]}
									alt={event.name}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : (
								<div className="absolute inset-0 flex items-center justify-center text-white">No image</div>
							)}
							{allImages.length > 0 && (
								<div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
									<FaImages className="inline mr-1" /> {activeIndex + 1} / {allImages.length}
								</div>
							)}
						</div>
					</div>

					{/* Details */}
					<div className="p-6 md:p-8">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{event.name}</h1>
						<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 mb-4">
							<div className="flex items-center mb-2 sm:mb-0">
								<FaCalendarAlt className="mr-2 text-pink-500" />
								<span>{formatDate(event.date)}</span>
							</div>
							<div className="flex items-center">
								<FaMapMarkerAlt className="mr-2 text-pink-500" />
								<span>{event.location}</span>
							</div>
						</div>
						<p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

						{/* Thumbnails */}
						{allImages.length > 1 && (
							<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
								{allImages.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setActiveIndex(idx)}
										className={`relative border-2 rounded overflow-hidden ${idx === activeIndex ? 'border-pink-500' : 'border-transparent'}`}
									>
										<img src={img} alt={`thumb-${idx}`} className="w-full h-16 object-cover" />
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
