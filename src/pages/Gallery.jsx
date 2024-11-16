import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://0.0.0.0:8000/gallery/all_images");
        if (response.status === 404) {
          throw new Error("No image is available!");
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="py-8 bg-gray-100 overflow-auto">
      {error && (
        <div className="bg-gray-200 text-red-500 font-bold shadow-md p-4 text-center rounded-lg w-max mx-auto mb-10">
          {error.message}
        </div>
      )}
      <h2 className="text-4xl font-bold text-center mb-8">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-lg overflow-auto mx-2 transition-transform duration-900 hover:scale-110"
          >
            {image.id ? (
              <img
                src={`http://0.0.0.0:8000/images/${image.id}`}
                alt={image.title}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-600">Image not available</p>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg text-center text-green-700">
                {image.caption}
              </h3>
              <p className="text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
