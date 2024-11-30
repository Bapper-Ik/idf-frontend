// components/DashboardSidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-fit bg-gray-900 h-screen p-4 top-31 z-0 lg:w-64 xl:w-80">
      <h2 className={`${!isOpen ? "hidden" : ""} text-xl text-white mb-4`}>
        Dashboard
      </h2>
      <div className="lg:hidden">
        <button
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
        <ul>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <Link
              to="/admin/dashboard/overview"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Overview
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 7h10a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2zm0-3a1 1 0 012 0v1a1 1 0 110 2 1 1 0 002 0V4a1 1 0 112 0v1a1 1 0 11-2 0V4z"
              />
            </svg>
            <Link
              to="/admin/dashboard/categories"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Categories
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <Link
              to="/admin/dashboard/videos"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Ta'alim Videos
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586A2 2 0 012 10h12a2 2 0 01- 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              />
            </svg>
            <Link
              to="/admin/dashboard/images"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Images
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <Link
              to="/admin/dashboard/committees"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Committees
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <Link
              to="/admin/dashboard/events"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Events
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Link
              to="/admin/dashboard/news"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              News
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <Link
              to="/admin/dashboard/feedback"
              className="text-white hover:bg-gray-700 hover:text-gray-200 py-2 px-4 block"
            >
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
