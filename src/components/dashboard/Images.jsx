import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../../layout/Footer";

const Images = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const base_url = "https://idf-site.onrender.com";

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get(base_url + "/gallery/all_images")
      .then((response) => setImages(response.data))
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          setError("Un expected error occur");
        }
      });
  }, [images]);

  const handleDelete = (id) => {
    axios
      .delete(base_url + `/admin/dashboard/gallery/delete_image/${id}`)
      .then((response) => {
        setImages(images.filter((image) => image.id !== id));
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          setError("Un expected error occur");
        }
      });
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("caption", e.target.caption.value);
    axios
      .post(base_url + "/admin/dashboard/add_images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImages([...images, response.data]);
        setUploading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
          setUploading(false);
        } else {
          setError("Un expected error occur");
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("caption", e.target.caption.value);
    axios
      .put(
        base_url + `/admin/dashboard/gallery/update_image/${selectedImage.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setImages(
          images.map((img) =>
            img.id === response.data.id ? response.data : img
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
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4">Image Management</h1>
          {error && (
            <h4 className="text-red-500 text-center">{error.message}</h4>
          )}
          <form onSubmit={handleUpload}>
            <label className="capitalize px-10 text-gray-600" htmlFor="image">
              image
            </label>
            <input type="file" name="image" required />
            <label className="px-10 text-gray-600" htmlFor="caption">
              Caption
            </label>

            <input
              type="text"
              name="caption"
              required
              className="shadow-md border-2 mr-10"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Caption</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id}>
                  <td className="border-2 px-4 py-2">{image.id}</td>
                  <td className="border-2 px-4 py-2">{image.image_name}</td>
                  <td className="border-2 px-4 py-2">{image.caption}</td>
                  <td className="border-2 text-center px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleEdit(image)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleDelete(image.id)}
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
                <h2 className="text-2xl font-bold mb-4">Edit Image</h2>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="caption"
                    >
                      Caption:
                    </label>
                    <input
                      type="text"
                      name="caption"
                      id="caption"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Update
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

export default Images;
