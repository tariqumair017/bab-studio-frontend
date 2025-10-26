import React, { useEffect, useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';

const ImageModal = ({ isOpen, onClose, images, currentIndex, onNavigate }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
            setIsZoomed(false);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
            setIsZoomed(false);
          }
          break;
        case ' ':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate, isZoomed]);

  // Reset zoom when modal opens/closes or image changes
  useEffect(() => {
    setIsZoomed(false);
  }, [isOpen, currentIndex]);

  // Handle image load to get actual dimensions
  const handleImageLoad = (e) => {
    const img = e.target;
    setImageSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
        aria-label="Close modal"
      >
        <FaTimes className="text-2xl" />
      </button>

      {/* Zoom toggle button */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-16 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
      >
        {isZoomed ? <FaCompress className="text-xl" /> : <FaExpand className="text-xl" />}
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          {/* Previous button */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
          )}

          {/* Next button */}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
              aria-label="Next image"
            >
              <FaChevronRight className="text-2xl" />
            </button>
          )}
        </>
      )}

      {/* Image container */}
      <div
        className={`relative flex items-center justify-center ${isZoomed ? 'w-full h-full cursor-zoom-out' : 'max-w-full max-h-full p-4 cursor-zoom-in'
          }`}
        onClick={() => {
          if (isZoomed) {
            setIsZoomed(false);
          }
        }}
      >
        <img
          src={currentImage.url}
          alt={`Gallery image ${currentIndex + 1}`}
          className={`
            transition-all duration-300
            ${isZoomed
              ? 'object-scale-down cursor-zoom-out max-w-none max-h-none'
              : 'object-contain max-w-full max-h-full cursor-zoom-in'
            }
          `}
          onLoad={handleImageLoad}
          onClick={(e) => {
            if (!isZoomed) {
              e.stopPropagation();
              setIsZoomed(true);
            }
          }}
          style={
            !isZoomed
              ? {
                width: 'auto',
                height: 'auto',
                maxWidth: '100vw',
                maxHeight: '100vh'
              }
              : {}
          }
        />
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageModal;
