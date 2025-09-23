// src/components/ImageUpload.jsx
import { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    
    // Generate a unique filename for the image
    const timestamp = Date.now();
    const filename = `event_${timestamp}_${file.name}`;
    
    // Pass the file and the path to the parent component
    onImageSelect({
      file,
      path: `/images/events/${filename}`
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
        </div>
      )}
      
      <button
        type="button"
        onClick={triggerFileInput}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {currentImage ? 'Change Image' : 'Select Image'}
      </button>
    </div>
  );
};

export default ImageUpload;