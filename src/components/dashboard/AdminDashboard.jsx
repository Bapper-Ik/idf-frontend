import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import Footer from "../../layout/Footer";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [feedback, setFeedback] = useState([]);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch(
          "http://localhost:8000/taalim/categories/all_categories"
        );

        if (categoryResponse.status === 404) {
          setCategories([]);
        }
        const categories = await categoryResponse.json();
        setCategories(categories);

        // Fetch videos
        const videoResponse = await fetch(
          "http://localhost:8000/taalim/all_ta_alims"
        );
        if (videoResponse.status == "404") {
          setVideos([]);
        } else {
          const videos = await videoResponse.json();
          setVideos(videos);
        }

        // Fetch images
        const imageResponse = await fetch(
          "http://localhost:8000/gallery/all_images"
        );
        if (imageResponse.status == "404") {
          setImages([]);
        } else {
          const images = await imageResponse.json();
          setImages(images);
        }

        // Fetch committees
        const committeeResponse = await fetch(
          "http://localhost:8000/committee/all_committee"
        );
        if (committeeResponse.status == "404") {
          setCommittees([]);
        } else {
          const committees = await committeeResponse.json();
          setCommittees(committees);
        }

        // Fetch events
        const eventResponse = await fetch(
          "http://localhost:8000/events/all_events"
        );
        if (eventResponse.status == "404") {
          setEvents([]);
        } else {
          const events = await eventResponse.json();
          setEvents(events);
        }

        // Fetch news
        const newsResponse = await fetch("http://localhost:8000/news/all_news");
        if (newsResponse.status == "404") {
          setNews("");
        } else {
          const news = await newsResponse.json();
          setNews(news);
        }

        // Fetch feedback
        const feedbackResponse = await fetch(
          "http://localhost:8000/feedback/all_feedback"
        );

        if (feedbackResponse.status == "404") {
          setFeedback("");
        } else {
          const feedback = await feedbackResponse.json();
          setFeedback(feedback);
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />

        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4 inline-block">
            Admin Dashboard
          </h1>
          <span className="absolute right-10">
            <button
              className="bg-red-500 p-4 text-gray-100 rounded-lg font-bold"
              onClick={handleLogout}
            >
              Log out
            </button>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Categories</h2>
              <p className="text-gray-600">{categories.length}</p>
              <Link
                to="/admin/dashboard/categories"
                className="text-blue-600 hover:underline"
              >
                Manage Categories
              </Link>
            </div>

            {/* Videos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Ta'alim Videos</h2>
              <p className="text-gray-600">{videos.length}</p>
              <Link
                to="/admin/dashboard/videos"
                className="text-blue-600 hover:underline"
              >
                Manage Videos
              </Link>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Images</h2>
              <p className="text-gray-600">{images.length}</p>
              <Link
                to="/admin/dashboard/images"
                className="text-blue-600 hover:underline"
              >
                Manage Images
              </Link>
            </div>

            {/* Committees */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Committees</h2>
              <p className="text-gray-600">{committees.length}</p>
              <Link
                to="/admin/dashboard/committees"
                className="text-blue-600 hover:underline"
              >
                Manage Committees
              </Link>
            </div>

            {/* Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Events</h2>
              <p className="text-gray-600">{events.length}</p>
              <Link
                to="/admin/dashboard/events"
                className="text-blue-600 hover:underline"
              >
                Manage Events
              </Link>
            </div>

            {/* News */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">News</h2>
              <p className="text-gray-600">{news.length}</p>
              <Link
                to="/admin/dashboard/news"
                className="text-blue-600 hover:underline"
              >
                Manage News
              </Link>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold">Feedback</h2>
              <p className="text-gray-600">{feedback.length}</p>
              <Link
                to="/admin/dashboard/feedback"
                className="text-blue-600 hover:underline"
              >
                Manage Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
