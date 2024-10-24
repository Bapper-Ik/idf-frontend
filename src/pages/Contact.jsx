import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [res, setRes] = useState(false);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/admin/dashboard/feedback/add_feedback",
        feedbackData
      )
      .then((response) => {
        setRes(true);
        feedbackData.name = "";
        feedbackData.email = "";
        feedbackData.message = "";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleToast = () => {
    setRes(false);
  };

  return (
    <div className="p-8 bg-gray-100">
      {res && (
        <div
          id="toast-success"
          className="flex w-full mx-auto max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            message sent successfully.
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              onClick={() => setRes(false)}
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 w-full mb-4 rounded-lg"
          value={feedbackData.name}
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 w-full mb-4 rounded-lg"
          value={feedbackData.email}
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, email: e.target.value })
          }
        />
        <textarea
          placeholder="Your Message"
          className="border p-3 w-full mb-4 rounded-lg"
          rows="11"
          value={feedbackData.message}
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, message: e.target.value })
          }
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
