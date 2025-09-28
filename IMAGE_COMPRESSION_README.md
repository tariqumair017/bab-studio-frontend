# Image Compression Feature

This feature automatically compresses images before uploading to improve performance and reduce upload times.

## Features

- **Automatic Compression**: Images are automatically compressed on the frontend before upload
- **Quality Preservation**: Maintains good visual quality while significantly reducing file size
- **Progress Indicators**: Shows compression and upload progress to users
- **File Size Display**: Shows file sizes before and after compression
- **Error Handling**: Provides specific error messages for different failure scenarios

## How It Works

### Display Images
- Maximum dimensions: 1920x1080 pixels
- Quality: 90% (higher quality for main display)
- Format: JPEG

### Gallery Images
- Maximum dimensions: 1600x1200 pixels (increased for better quality)
- Quality: 90% (higher quality to prevent pixelation)
- Format: JPEG

### Compression Process
1. User selects images
2. Images are automatically compressed using HTML5 Canvas API
3. Progress indicator shows compression status
4. Compressed images are uploaded to the server
5. Original large files are discarded

## Benefits

- **Faster Uploads**: Reduced file sizes mean faster upload times
- **Better User Experience**: Progress indicators keep users informed
- **Server Efficiency**: Less bandwidth usage and storage requirements
- **Quality Control**: Consistent image sizes and quality across the platform
- **No Image Cropping**: Images display completely without being cut off
- **Improved Gallery View**: All images shown in organized card layout

## File Size Reduction

Typically achieves:
- **50-80% size reduction** for most images
- **Maintains visual quality** suitable for web display
- **Preserves aspect ratios** and prevents distortion

## Technical Implementation

### Files Modified
- `src/pages/Admin.jsx` - Main admin interface with compression integration
- `src/utils/imageCompression.js` - Core compression utility functions
- `src/components/ImageCompressionDemo.jsx` - Demo component for testing
- `src/pages/EventDetails.jsx` - Updated to show images in card layout with modal
- `src/components/EventCard.jsx` - Fixed image cropping issues
- `src/pages/Home.jsx` - Fixed image cropping in carousel and team section
- `src/components/ImageModal.jsx` - New modal component for full-size image viewing

### Key Functions
- `compressImage()` - Compress single image
- `compressImages()` - Compress multiple images
- `getDisplayImageSettings()` - Settings for display images
- `getGalleryImageSettings()` - Settings for gallery images
- `formatFileSize()` - Format bytes for display

## Usage Example

```javascript
import { compressImage, getDisplayImageSettings } from '../utils/imageCompression';

const handleFileSelect = async (file) => {
  try {
    const compressedFile = await compressImage(file, getDisplayImageSettings());
    // Use compressedFile for upload
  } catch (error) {
    console.error('Compression failed:', error);
  }
};
```

## Testing

Use the `ImageCompressionDemo` component to test compression functionality:

```jsx
import ImageCompressionDemo from './components/ImageCompressionDemo';

// In your component
<ImageCompressionDemo />
```

## Configuration

Compression settings can be adjusted in `src/utils/imageCompression.js`:

```javascript
const DEFAULT_SETTINGS = {
  maxWidth: 1920,        // Maximum width for display images
  maxHeight: 1080,       // Maximum height for display images
  galleryMaxWidth: 1200, // Maximum width for gallery images
  galleryMaxHeight: 800, // Maximum height for gallery images
  quality: 0.85,         // JPEG quality (0.1 to 1.0)
  outputType: 'image/jpeg' // Output format
};
```

## Browser Compatibility

- Modern browsers with Canvas API support
- Requires JavaScript enabled
- Works with all major image formats (JPEG, PNG, WebP, etc.)
