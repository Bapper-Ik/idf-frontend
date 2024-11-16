import React, { useEffect, useState } from "react";
import axios from "axios";

const extractYouTubeId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NGROK_URL}/taalim/categories/all_categories`
        );
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!selectedCategory) return;

      try {
        const response = await axios.get(
          `${process.env.NGROK_URL}/taalim/${selectedCategory.id}/all_taalims`
        );
        setVideos(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchVideos();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVideos([]);
  };

  return (
    <div className="p-4 bg-gray-100">
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

      {selectedCategory && (
        <div className="grid grid-cols-1 mb-10 mx-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => {
              const youtubeId = extractYouTubeId(video.url);
              return (
                <div
                  key={video.id}
                  className="rounded-lg overflow-hidden shadow-lg transition-transform duration-400 hover:scale-110"
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
              No videos available in "{selectedCategory.name}" category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCategories;
