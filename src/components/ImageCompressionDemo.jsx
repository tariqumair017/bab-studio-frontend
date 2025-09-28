import React, { useState } from 'react';
import { FaUpload, FaCompress, FaDownload } from 'react-icons/fa';
import { compressImage, getDisplayImageSettings, formatFileSize } from '../utils/imageCompression';

/**
 * Demo component to showcase image compression functionality
 * This can be used for testing the compression utility
 */
const ImageCompressionDemo = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setOriginalFile(file);
    setCompressedFile(null);

    try {
      setIsCompressing(true);
      setCompressionProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setCompressionProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 20;
        });
      }, 100);

      // Compress the image
      const compressed = await compressImage(file, getDisplayImageSettings());
      
      clearInterval(progressInterval);
      setCompressionProgress(100);
      setCompressedFile(compressed);

      setTimeout(() => {
        setIsCompressing(false);
        setCompressionProgress(0);
      }, 500);

    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress image');
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const downloadCompressed = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed_${compressedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setIsCompressing(false);
    setCompressionProgress(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Image Compression Demo</h2>
      
      <div className="space-y-6">
        {/* File Selection */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Select Image to Compress</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              id="demoFile"
            />
            <label htmlFor="demoFile" className="cursor-pointer block">
              <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
              <span className="text-gray-600">Click to select an image</span>
            </label>
          </div>
        </div>

        {/* Compression Progress */}
        {isCompressing && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm text-blue-600 mb-2">
              <span>Compressing image...</span>
              <span>{compressionProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${compressionProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Results */}
        {originalFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Original Image</h3>
              <img
                src={URL.createObjectURL(originalFile)}
                alt="Original"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <div className="text-sm text-gray-600">
                <p><strong>Size:</strong> {formatFileSize(originalFile.size)}</p>
                <p><strong>Type:</strong> {originalFile.type}</p>
                <p><strong>Name:</strong> {originalFile.name}</p>
              </div>
            </div>

            {/* Compressed Image */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Compressed Image</h3>
              {compressedFile ? (
                <>
                  <img
                    src={URL.createObjectURL(compressedFile)}
                    alt="Compressed"
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <div className="text-sm text-gray-600 mb-3">
                    <p><strong>Size:</strong> {formatFileSize(compressedFile.size)}</p>
                    <p><strong>Type:</strong> {compressedFile.type}</p>
                    <p><strong>Name:</strong> {compressedFile.name}</p>
                    <p className="text-green-600 font-semibold">
                      <strong>Reduction:</strong> {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
                    </p>
                  </div>
                  <button
                    onClick={downloadCompressed}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <FaDownload className="mr-2" />
                    Download Compressed
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-400">
                  {isCompressing ? (
                    <div className="text-center">
                      <FaCompress className="mx-auto text-3xl mb-2 animate-pulse" />
                      <span>Compressing...</span>
                    </div>
                  ) : (
                    <span>Compression result will appear here</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reset Button */}
        {(originalFile || compressedFile) && (
          <div className="text-center">
            <button
              onClick={reset}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressionDemo;
