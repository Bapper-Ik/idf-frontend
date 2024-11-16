import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../../layout/Footer";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbackId, setFeedbackId] = useState(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:8000/feedback/all_feedback")
      .then((response) => {
        setFeedback(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setFeedbackData({ name: "", email: "", message: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFeedbackData({
      name: item.name,
      email: item.email,
      message: item.message,
    });
    setFeedbackId(item.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8000/admin/dashboard/feedback/delete_feedback/${id}`
      )
      .then((response) => {
        setFeedback(feedback.filter((item) => item.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(
          `http://localhost:8000/admin/dashboard/feedback/update_feedback/${feedbackId}`,
          feedbackData
        )
        .then((response) => {
          setFeedback(
            feedback.map((item) =>
              item.id === feedbackId ? response.data : item
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      axios
        .post(
          "http://localhost:8000/admin/dashboard/feedback/add_feedback",
          feedbackData
        )
        .then((response) => {
          setFeedback([...feedback, response.data]);
          setShowModal(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4 inline pr-10">
            Feedback List
          </h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10 mb-4"
            onClick={handleCreate}
          >
            Add Feedback
          </button>

          {error ? (
            <p className="text-red-500 text-center">{error.message}</p>
          ) : (
            <table className="table-auto w-full mb-5">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="border-2">
                {feedback.map((item) => (
                  <tr key={item.id}>
                    <td className="border-2 px-4 py-2">{item.id}</td>
                    <td className="border-2 px-4 py-2 capitalize">
                      {item.name}
                    </td>
                    <td className="border-2 px-4 py-2 capitalize">
                      {item.email}
                    </td>
                    <td className="border-2 px-4 py-2 capitalize">
                      {item.message}
                    </td>
                    <td className="border-2 text-center px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-10 rounded">
                <h2 className="text-2xl font-bold mb-4">
                  {isEdit ? "Edit Feedback" : "Add Feedback"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      value={feedbackData.name}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={feedbackData.email}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Message:
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="message"
                      value={feedbackData.message}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    {isEdit ? "Update" : "Add"}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
