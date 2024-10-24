import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center absolute -bottom-100 w-full">
      <p>
        Copyright &copy; {new Date().getFullYear()} Ikara Da'awah Foundation.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
