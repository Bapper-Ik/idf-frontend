import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <img
          src="/idf-logo.png"
          alt="Ikara Da'awah Foundation logo"
          width={60}
          height={60}
          className="flex-shrink-0"
        />

        {/* Organization Name */}
        <h1 className="text-gray-200 text-2xl md:text-3xl font-bold font-mono mx-5 flex-grow">
          Ikara Da'awah Foundation
        </h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-white block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex space-x-4">
          {[
            "Home",
            "Videos",
            "Gallery",
            "Events",
            "News",
            "About",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              className="text-gray-300 hover:text-white transition duration-300"
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800`}>
        <div className="space-y-2 py-2 px-4">
          {["Home", "Videos", "Gallery", "Events", "About", "Contact"].map(
            (item) => (
              <Link
                key={item}
                className="block text-gray-300 hover:text-white transition duration-300"
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
