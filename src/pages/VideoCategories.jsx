import React, { useEffect, useState } from "react";

const extractYouTubeId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return the ID or null if not found
};

const VideoCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://0.0.0.0:8000/taalim/categories/all_categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!selectedCategory) return;
      try {
        const response = await fetch(
          `http://0.0.0.0:8000/taalim/${selectedCategory.id}/all_taalims`
        );
        const data = await response.json();

        if (isNaN(data.length)) {
          setError("No videos available in this category!");
        } else {
          setVideos(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos!");
      }
    };
    fetchVideos();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVideos([]); // Reset videos when changing categories
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Video Categories</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-lg text-white transition duration-300 ${
              selectedCategory?.id === category.id
                ? "bg-green-900"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-red-500 text-2xl font-mono">{error}</p>
      ) : (
        <div className="grid grid-cols-1 mb-10 mx-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => {
              const youtubeId = extractYouTubeId(video.url);
              return (
                <div
                  key={video.id}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  {youtubeId ? (
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="bg-gray-300 flex items-center justify-center h-48">
                      <p className="text-gray-600">Video not available</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg capitalize">
                      {video.name}
                    </h3>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-lg">
              select category to explore videos
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCategories;
