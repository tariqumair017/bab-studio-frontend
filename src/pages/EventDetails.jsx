import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaImages, FaExpand } from 'react-icons/fa';
import eventsMiddleware from '../middlewares/eventsMiddleware';
import ImageModal from '../components/ImageModal';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalImageIndex, setModalImageIndex] = useState(0);

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
		...(event.displayImage ? [{ url: event.displayImage, isDisplay: true }] : []),
		...((event.images || []).map(img => ({ 
			url: typeof img === 'string' ? img : img.url, 
			isDisplay: false 
		})))
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	};

	const openModal = (index) => {
		setModalImageIndex(index);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const navigateModal = (index) => {
		setModalImageIndex(index);
	};

	return (
		<div className="py-8 md:py-12">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="mb-6">
					<Link to="/events" className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium">
						<FaArrowLeft className="mr-2" /> Back to Events
					</Link>
				</div>

				{/* Event Header */}
				<div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{event.name}</h1>
					<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 mb-4">
						<div className="flex items-center mb-2 sm:mb-0">
							<FaCalendarAlt className="mr-2 text-pink-500" />
							<span className="text-lg">{formatDate(event.date)}</span>
						</div>
						<div className="flex items-center">
							<FaMapMarkerAlt className="mr-2 text-pink-500" />
							<span className="text-lg">{event.location}</span>
						</div>
					</div>
					<p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
				</div>

				{/* Image Gallery - Card Layout */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center mb-6">
						<FaImages className="mr-3 text-pink-500 text-xl" />
						<h2 className="text-2xl font-bold text-gray-800">
							Event Gallery ({allImages.length} {allImages.length === 1 ? 'image' : 'images'})
						</h2>
					</div>

					{allImages.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{allImages.map((imageObj, index) => (
								<div 
									key={index} 
									className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
									onClick={() => openModal(index)}
								>
									{/* Display Image Badge */}
									{imageObj.isDisplay && (
										<div className="absolute top-3 left-3 z-10 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
											Main Image
										</div>
									)}
									
									{/* Main Image */}
									<div className="aspect-square overflow-hidden bg-gray-100 relative">
										<img
											src={imageObj.url}
											alt={`${event.name} - Image ${index + 1}`}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											onError={(e) => {
												console.error('Image failed to load:', imageObj.url);
												e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
												e.target.className = 'w-full h-full object-contain';
											}}
										/>
									</div>
									
									{/* Overlay with expand icon */}
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
										<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
											<FaExpand className="text-white text-2xl" />
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<FaImages className="mx-auto text-6xl text-gray-300 mb-4" />
							<p className="text-gray-500 text-lg">No images available for this event</p>
						</div>
					)}
				</div>
			</div>

			{/* Image Modal */}
			<ImageModal
				isOpen={modalOpen}
				onClose={closeModal}
				images={allImages}
				currentIndex={modalImageIndex}
				onNavigate={navigateModal}
			/>
		</div>
	);
};

export default EventDetails;