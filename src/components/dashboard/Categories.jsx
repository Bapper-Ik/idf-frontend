import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import Footer from "../../layout/Footer";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [categoryId, setCategoryId] = useState(null);
  const [error, setError] = useState(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:8000/taalim/categories/all_categories")
      .then((response) => setCategories(response.data))
      .catch((error) => setError(error));
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setCategoryData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setIsEdit(true);
    setCategoryData(category);
    setCategoryId(category.id);
    setShowModal(true);
  };

  const togglePop = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8000/admin/dashboard/category/delete_category/${id}`
      )
      .then((response) => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => setError(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(
          `http://0.0.0.0:8000/admin/dashboard/category/update_category/${categoryId}`,
          categoryData
        )
        .then((response) => {
          setCategories(
            categories.map((category) =>
              category.id === categoryId ? response.data : category
            )
          );
          setShowModal(false);
        })
        .catch((error) => setError(error));
    } else {
      axios
        .post(
          "http://localhost:8000/admin/dashboard/category/add_category",
          categoryData
        )
        .then((response) => {
          setCategories([...categories, response.data]);
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
          <h1 className="text-3xl font-bold mb-4 inline pr-10">
            Category List
          </h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10 mb-4"
            onClick={handleCreate}
          >
            Create New Category
          </button>

          <table className="table-auto w-full mb-5">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="border-2">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="border-2 px-4 py-2">{category.id}</td>
                  <td className="border-2 px-4 py-2 capitalize">
                    {category.name}
                  </td>
                  <td className="border-2 text-center px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleDelete(category.id)}
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
                <h2 className="text-2xl font-bold mb-4">
                  {isEdit ? "Edit Category" : "Create Category"}
                </h2>
                {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )}
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
                      value={categoryData.name}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          name: e.target.value,
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

export default CategoryList;
