import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://idf-site.onrender.com/news/all_news"
        );
        if (response.status === 404) {
          throw new Error("No news is available!");
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 overflow-auto">
      {error && (
        <div className="bg-gray-200 shadow-md font-bold text-red-500  p-4 text-center rounded-lg w-max mx-auto mb-10">
          {error.message}
        </div>
      )}
      <h2 className="text-4xl font-bold text-center mb-8">News Letters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white p-12 mb-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative"
          >
            <blockquote className="text-2xl text-green-900 capitalize italic  font-semibold pb-2">
              {item.headline}
            </blockquote>
            <p className="text-gray-600">{item.details}</p>
            <span className="absolute bottom-0 right-2 pb-2 font-bold font-mono opacity-25 text-green-900">
              Signed: Management
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
