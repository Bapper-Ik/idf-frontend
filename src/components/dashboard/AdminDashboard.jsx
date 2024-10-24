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

        if (categoryResponse.status == "404") {
          setCategories([]);
        } else {
          const categories = await categoryResponse.json();
          setCategories(categories);
        }

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
          setCategories([]);
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
        // console.log(events.length);

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
          "http://localhost:8000/news/all_news"
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

          <Outlet />

          {/* Modal for adding new items */}
          <div
            className="fixed inset-0 z-10 hidden"
            id="add-modal"
            aria-labelledby="add-modal-label"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="add-modal-label"
                    >
                      Add New Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill in the details for the new item.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
