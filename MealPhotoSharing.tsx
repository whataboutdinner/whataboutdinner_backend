import React from 'react';

interface MealPhoto {
  id: string;
  imageUrl: string;
  caption?: string;
  uploadedAt: string;
}

interface MealPhotoUploadProps {
  onUpload: (file: File) => void;
}

export const MealPhotoUpload: React.FC<MealPhotoUploadProps> = ({ onUpload }) => {
  // Placeholder for file input and upload logic
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* Add more UI for preview or other options if needed */}
    </div>
  );
};

interface MealPhotoGalleryProps {
  photos: MealPhoto[];
}

export const MealPhotoGallery: React.FC<MealPhotoGalleryProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return <p>No photos to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map(photo => (
        <div key={photo.id} className="bg-white p-4 rounded-lg shadow">
          <img src={photo.imageUrl} alt={photo.caption || 'Meal photo'} className="w-full h-48 object-cover rounded-md mb-2" />
          {photo.caption && <p className="text-sm text-gray-700">{photo.caption}</p>}
          <p className="text-xs text-gray-500">Uploaded: {new Date(photo.uploadedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

// Default export can be one of the components or null if not needed as default
// For example, if MealPhotoSharing is meant to be a container for both upload and gallery:
const MealPhotoSharing = () => {
  // This component would need state and handlers to manage photos if it were a complete feature
  // For now, it just renders the two sub-components as an example
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Share Your Meal Photos</h3>
      <MealPhotoUpload onUpload={(file) => console.log('Uploading', file.name)} />
      <h3 className="text-xl font-semibold mt-6 mb-2">Gallery</h3>
      {/* Example usage of MealPhotoGallery, would typically be populated with dynamic data */}
      <MealPhotoGallery photos={[]} /> 
    </div>
  );
};

export default MealPhotoSharing;

