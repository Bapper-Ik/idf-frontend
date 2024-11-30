import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import Footer from "../../layout/Footer";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [videoData, setVideoData] = useState({
    name: "",
    url: "",
    category_name: "",
  });
  const [videoId, setVideoId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const base_url = "https://idf-site.onrender.com";

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get(base_url + "/taalim/all_ta_alims")
      .then((response) => setVideos(response.data))
      .catch((error) => console.error(error));

    axios
      .get(base_url + "/taalim/categories/all_categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setVideoData({ name: "  ", url: "", category_name: "" });
    setShowModal(true);
  };

  const handleEdit = (video) => {
    setIsEdit(true);
    setVideoData({
      name: video.name,
      category_name: video.category.name,
      url: video.url,
    });
    setVideoId(video.id);
    setShowModal(true);
  };
  const togglePop = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(base_url + `/admin/dashboard/taalim/delete_ta_alim/${id}`)
      .then((response) => {
        setVideos(videos.filter((video) => video.id !== id));
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          setError("Un expected error occur");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(
          base_url + `/admin/dashboard/taalim/update_taalim/${videoId}`,
          videoData
        )
        .then((response) => {
          setVideos(
            videos.map((video) =>
              video.id === videoId ? response.data : video
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.detail);
          } else {
            setError("Un expected error occur");
          }
        });
    } else {
      axios
        .post(base_url + "/admin/dashboard/ta_alim/add_ta_alim", videoData)
        .then((response) => {
          setVideos([...videos, response.data]);
          setShowModal(false);
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.detail);
          } else {
            setError("Un expected error occur");
          }
        });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />

        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4 inline pr-5">Video List</h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-10 mb-6"
            onClick={handleCreate}
          >
            Create New Video
          </button>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category name</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="border-2 px-4 py-2">{video.id}</td>
                  <td className="border-2 capitalize px-4 py-2">
                    {video.name}
                  </td>
                  <td className="border-2 capitalize px-4 py-2">
                    {video.category.name}
                  </td>
                  <td className="border-2 px-4 py-2">{video.url}</td>
                  <td className="border-2 text-center px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleEdit(video)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleDelete(video.id)}
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
                  {isEdit ? "Edit Video" : "Create Video"}
                </h2>
                {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="title"
                    >
                      Name:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      value={videoData.name}
                      onChange={(e) =>
                        setVideoData({ ...videoData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="category_name"
                    >
                      Category Name:
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="category_name"
                      value={videoData.category_name}
                      onChange={(e) =>
                        setVideoData({
                          ...videoData,
                          category_name: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="url"
                    >
                      URL:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="url"
                      type="text"
                      value={videoData.url}
                      onChange={(e) =>
                        setVideoData({ ...videoData, url: e.target.value })
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

export default VideoList;
