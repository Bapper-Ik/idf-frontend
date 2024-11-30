import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const slides = [
    {
      id: 1,
      title: "Ikara Da'awah Foundation",
      description:
        "Dedicated to spreading Islamic teachings and supporting the local community through various charitable activities, education, and outreach.",
      image: "/idf-logo.png",
      buttonText: "Learn More",
      buttonLink: "/about",
    },
    {
      id: 2,
      title: "Islamic Educational Videos",
      description:
        "Explore our collection of educational videos categorized for easy learning.",
      image: "/educ.jpg",
      buttonText: "View Videos",
      buttonLink: "/videos",
    },
    {
      id: 3,
      title: "Image Gallery",
      description:
        "Take a glimpse into our past events and activities through our gallery.",
      image: "/event.jpg",
      buttonText: "Explore Gallery",
      buttonLink: "/gallery",
    },
    {
      id: 4,
      title: "Islamic Educational Videos",
      description:
        "Explore our collection of educational videos categorized for easy learning.",
      image: "/durus.jpg",
      buttonText: "View Videos",
      buttonLink: "/videos",
    },

    {
      id: 5,
      title: "Islamic Educational Videos",
      description:
        "Explore our collection of educational videos categorized for easy learning.",
      image: "/durus-2.jpg",
      buttonText: "View Videos",
      buttonLink: "/videos",
    },
    {
      id: 6,
      title: "Islamic Educational Videos",
      description:
        "Explore our collection of educational videos categorized for easy learning.",
      image: "/idf-7.jpg",
      buttonText: "View Videos",
      buttonLink: "/videos",
    },
    {
      id: 7,
      image: "/media.jpg",
    },
    {
      id: 8,
      title: "Islamic Educational Videos",
      description:
        "Explore our collection of educational videos categorized for easy learning.",
      image: "/ulama.jpg",
      buttonText: "View Videos",
      buttonLink: "/videos",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState([]);

  // Fetch the recent news from the backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://idf-site.onrender.com/news/get_recent_news?limit=3"
        );
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Auto-slide functionality using useEffect
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Slide will change every 5 seconds

    return () => clearInterval(autoSlide); // Cleanup on component unmount
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="relative h-screen bg-gray-200">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${
              index === currentSlide ? "block" : "hidden"
            } w-4/5 mx-auto p-0 m-0 h-full bg-origin-content bg-contain bg-no-repeat bg-center`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="flex flex-col justify-center items-center h-full bg-green-900 bg-opacity-20 text-center px-5">
              <h1 className="hidden md:block text-4xl md:text-5xl text-white font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
                {slide.description}
              </p>
              <Link
                to={slide.buttonLink}
                className={`${
                  !slide.buttonText ? "hidden" : ""
                } bg-green-900 hover:bg-green-500 text-white px-6 py-3 rounded-full text-lg md:text-xl transition duration-300`}
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}

        {/* Slide Navigation Controls */}
        <button
          className="hidden md:block absolute left-5 top-1/2 transform -translate-y-1/2 bg-green-700 hover:bg-green-500 text-white p-3 rounded-full"
          onClick={prevSlide}
        >
          &#8592; {/* Left arrow */}
        </button>
        <button
          className="hidden md:block absolute right-5 top-1/2 transform -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full"
          onClick={nextSlide}
        >
          &#8594; {/* Right arrow */}
        </button>
      </section>

      {/* Mission and Vision Section */}

      <section>
        <div className="bg-green-900 my-20 shadow-lg flex">
          <div className="hidden sm:block sm:flex sm:flex-1 items-center justify-center my-auto h-auto">
            <img src="/idf-logo.png" alt="banner" width={400} height={400} />
          </div>
          <div className="bg-gray-100 w-full sm:w-1/2 flex-initial p-10  m-4 sm:m-10 text-center rounded-lg">
            <h4 className="underline font-mono font-bold text-2xl">
              Introduction
            </h4>
            <p className="leading-loose break-normal text-xl">
              Ikara Da'awah Foundation is a non-profit organization committed to
              sharing the beauty and wisdom of Islam. Our mission is to inspire,
              educate, and empower individuals to embrace the Islamic faith,
              cultivate moral excellence, and contribute positively to society
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Our Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <img
                src="/educ.jpg"
                alt="Videos"
                className="w-full h-48 sm:object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">
                Islamic Educational Videos
              </h3>
              <p className="mt-2 text-gray-600">
                Explore our collection of educational videos categorized for
                easy learning.
              </p>
              <Link
                to="/videos"
                className="text-green-900 hover:underline mt-4 block"
              >
                View Videos
              </Link>
            </div>

            {/* Image Gallery Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <img
                src="/durus.jpg"
                alt="Gallery"
                className="w-full h-48 sm:object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">Image Gallery</h3>
              <p className="mt-2 text-gray-600">
                Take a glimpse into our past events and activities through our
                gallery.
              </p>
              <Link
                to="/gallery"
                className="text-green-900 hover:underline mt-4 block"
              >
                Explore Gallery
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <img
                src="/event.jpg"
                alt="Events"
                className="w-full h-48 sm:object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">Upcoming Events</h3>
              <p className="mt-2 text-gray-600">
                Stay updated on the latest events and activities organized by
                the foundation.
              </p>
              <Link
                to="/events"
                className="text-green-900 hover:underline mt-4 block"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news && news.length >= 1 ? (
              news.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl font-bold font-mono capitalize text-gray-800 mb-2">
                    {item.headline}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.details}</p>
                  <Link to="/news" className="text-green-900">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-red-700">No news available!</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Become part of our journey to educate, uplift, and support the
            community. Your contribution and involvement can make a difference.
          </p>
          <Link
            to="/contact"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-lg md:text-xl transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
