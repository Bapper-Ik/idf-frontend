import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/news/all_news");
      const data = await response.json();
      setNews(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
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
            <span className="absolute bottom-0 right-2 pb-2 font-bold text-green-900">
              Signed: Management
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
