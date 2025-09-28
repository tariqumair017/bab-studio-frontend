/**
 * Image compression utility for optimizing images before upload
 * Maintains good quality while significantly reducing file size
 */

// Default compression settings
const DEFAULT_SETTINGS = {
  maxWidth: 1920,        // Maximum width for display images
  maxHeight: 1080,       // Maximum height for display images
  galleryMaxWidth: 1600, // Increased width for gallery images for better quality
  galleryMaxHeight: 1200, // Increased height for gallery images for better quality
  quality: 0.85,         // JPEG quality (0.1 to 1.0)
  outputType: 'image/jpeg' // Output format
};

/**
 * Compress an image file
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxWidth - Maximum width
 * @param {number} options.maxHeight - Maximum height
 * @param {number} options.quality - JPEG quality (0.1 to 1.0)
 * @param {string} options.outputType - Output MIME type
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const settings = { ...DEFAULT_SETTINGS, ...options };
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    // If file is already small enough, return as is
    if (file.size < 500000) { // Less than 500KB
      resolve(file);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = calculateDimensions(
          img.width, 
          img.height, 
          settings.maxWidth, 
          settings.maxHeight
        );

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new file with compressed data
              const compressedFile = new File([blob], file.name, {
                type: settings.outputType,
                lastModified: Date.now()
              });
              
              console.log(`Image compressed: ${file.size} bytes → ${compressedFile.size} bytes (${Math.round((1 - compressedFile.size / file.size) * 100)}% reduction)`);
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          settings.outputType,
          settings.quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Calculate new dimensions while maintaining aspect ratio
 * @param {number} originalWidth 
 * @param {number} originalHeight 
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 * @returns {Object} - New width and height
 */
const calculateDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  let width = originalWidth;
  let height = originalHeight;

  // Scale down if width exceeds max
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  // Scale down if height exceeds max
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return { width: Math.round(width), height: Math.round(height) };
};

/**
 * Compress multiple images
 * @param {File[]} files - Array of image files
 * @param {Object} options - Compression options
 * @returns {Promise<File[]>} - Array of compressed files
 */
export const compressImages = async (files, options = {}) => {
  try {
    const compressedFiles = await Promise.all(
      files.map(file => compressImage(file, options))
    );
    return compressedFiles;
  } catch (error) {
    throw new Error(`Failed to compress images: ${error.message}`);
  }
};

/**
 * Get optimized settings for display image (higher quality)
 */
export const getDisplayImageSettings = () => ({
  ...DEFAULT_SETTINGS,
  quality: 0.9, // Higher quality for display image
});

/**
 * Get optimized settings for gallery images (balanced quality/size)
 */
export const getGalleryImageSettings = () => ({
  ...DEFAULT_SETTINGS,
  maxWidth: DEFAULT_SETTINGS.galleryMaxWidth,
  maxHeight: DEFAULT_SETTINGS.galleryMaxHeight,
  quality: 0.9, // Higher quality for gallery images to prevent pixelation
});

/**
 * Format file size for display
 * @param {number} bytes 
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
