import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import Footer from "../../layout/Footer";

const Committees = () => {
  const [committees, setCommittees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [committeeData, setCommitteeData] = useState({
    name: "",
    description: "",
  });
  const [committeeId, setCommitteeId] = useState(null);
  const [error, setError] = useState(null);

  const base_url = "https://idf-site.onrender.com";

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get(base_url + "/committee/all_committee")
      .then((response) => setCommittees(response.data))
      .catch((error) => setError(error));
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setCommitteeData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (committee) => {
    setIsEdit(true);
    setCommitteeData({
      id: committee.id,
      name: committee.name,
      description: committee.description,
    });
    setCommitteeId(committee.id);
    setShowModal(true);
  };

  const togglePop = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(base_url + `/admin/dashboard/committee/delete_committee/${id}`)
      .then((response) => {
        setCommittees(committees.filter((category) => category.id !== id));
      })
      .catch((error) => setError(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(
          base_url +
            `/admin/dashboard/committee/update_committee/${committeeId}`,
          committeeData
        )
        .then((response) => {
          setCommittees(
            committees.map((committee) =>
              committee.id === committeeId ? response.data : committee
            )
          );
          setShowModal(false);
        })
        .catch((error) => setError(error));
    } else {
      axios
        .post(base_url + "/admin/dashboard/add_committee", committeeData)
        .then((response) => {
          setCommittees([...committees, response.data]);
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
            Committee List
          </h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-10 mb-4"
            onClick={handleCreate}
          >
            Create New committee
          </button>

          <table className="table-auto w-full mb-5">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="border-2">
              {committees.map((committee) => (
                <tr key={committee.id}>
                  <td className="border-2 px-4 py-2">{committee.id}</td>
                  <td className="border-2 px-4 py-2 capitalize">
                    {committee.name}
                  </td>
                  <td className="border-2 px-4 py-2 capitalize">
                    {committee.description}
                  </td>
                  <td className="border-2 text-center px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleEdit(committee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleDelete(committee.id)}
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
                  {isEdit ? "Edit Committee" : "Create Committee"}
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
                      value={committeeData.name}
                      onChange={(e) =>
                        setCommitteeData({
                          ...committeeData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description:
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      value={committeeData.description}
                      onChange={(e) =>
                        setCommitteeData({
                          ...committeeData,
                          description: e.target.value,
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

export default Committees;
