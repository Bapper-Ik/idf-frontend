import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import Footer from "../../layout/Footer";

const News = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newsData, setNewsData] = useState({
    headline: "",
    details: "",
  });
  const [NewsId, setNewsId] = useState(null);
  const [error, setError] = useState(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:8000/news/all_news")
      .then((response) => setNews(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setNewsData({ headline: "", details: "" });
    setShowModal(true);
  };

  const handleEdit = (news) => {
    setIsEdit(true);
    setNewsData({
      id: news.id,
      headline: news.headline,
      details: news.details,
    });
    setNewsId(news.id);
    setShowModal(true);
  };

  const togglePop = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/admin/dashboard/news/delete_news/${id}`)
      .then((response) => {
        setNews(news.filter((news) => news.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(
          `http://localhost:8000/admin/dashboard/news/update_news/${NewsId}`,
          newsData
        )
        .then((response) => {
          setNews(
            news.map((item) => (item.id === NewsId ? response.data : item))
          );
          setShowModal(false);
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .post("http://localhost:8000/admin/dashboard/news/add_news", newsData)
        .then((response) => {
          setNews([...news, response.data]);
          setShowModal(false);
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.detail);
          } else {
            setError("Un expected error occur!");
          }
        });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />

        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4 inline pr-10">News List</h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10 mb-4"
            onClick={handleCreate}
          >
            Create News
          </button>

          <table className="table-auto w-full mb-5">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Headline</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="border-2">
              {news.map((item) => (
                <tr key={item.id}>
                  <td className="border-2 px-4 py-2">{item.id}</td>
                  <td className="border-2 px-4 py-2 capitalize">
                    {item.headline}
                  </td>
                  <td className="border-2 px-4 py-2 capitalize">
                    {item.details}
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
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-10 rounded">
                <h2 className="text-2xl font-bold mb-4 flex justify-between">
                  {isEdit ? "Edit News" : "Create News"}
                </h2>
                {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="headline"
                    >
                      Headline:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="headline"
                      type="text"
                      value={newsData.headline}
                      onChange={(e) =>
                        setNewsData({
                          ...newsData,
                          headline: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="details"
                    >
                      Details:
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="details"
                      value={newsData.details}
                      onChange={(e) =>
                        setNewsData({
                          ...newsData,
                          details: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    {isEdit ? "Update" : "Create"}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={togglePop}
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

export default News;
