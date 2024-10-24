import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../../layout/Footer";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addEventModal, setAddEventModal] = useState(false);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:8000/events/all_events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/admin/dashboard/event/delete_event/${id}`)
      .then((response) => {
        setEvents(events.filter((event) => event.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.event_name.value);
    formData.append("start_date", e.target.start_date.value);
    formData.append("end_date", e.target.end_date.value);
    formData.append("venue", e.target.venue.value);
    formData.append("isCompleted", e.target.isCompleted.value);
    formData.append("time", e.target.time.value);
    axios
      .put(
        `http://localhost:8000/admin/dashboard/event/update_event/${selectedEvent.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setEvents(
          events.map((event) =>
            event.id === response.data.id ? response.data : event
          )
        );
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("event_name", e.target.event_name.value);
    formData.append("start_date", e.target.start_date.value);
    formData.append("end_date", e.target.end_date.value);
    formData.append("venue", e.target.venue.value);
    formData.append("time", e.target.time.value);
    axios
      .post("http://localhost:8000/admin/dashboard/add_event", {
        name: formData.get("event_name"),
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date"),
        venue: formData.get("venue"),
        time: formData.get("time"),
      })
      .then((response) => {
        setEvents([...events, response.data]);
        setAddEventModal(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 p-10 overflow-scroll">
          <h1 className="text-3xl font-bold mb-4">Event Management</h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => setAddEventModal(true)}
          >
            Add New Event
          </button>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Venue</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Completed</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="border-2 px-4 py-2">{event.id}</td>
                  <td className="border-2 px-4 py-2">{event.name}</td>
                  <td className="border-2 px-4 py-2">{event.start_date}</td>
                  <td className="border-2 px-4 py-2">{event.end_date}</td>
                  <td className="border-2 px-4 py-2">{event.venue}</td>
                  <td className="border-2 px-4 py-2">{event.time}</td>
                  <td className="border-2 px-4 py-2">
                    {event.isCompleted ? "Yes" : "No"}
                  </td>
                  <td className="border-2 text-center px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => handleDelete(event.id)}
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
                <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="event_name"
                    >
                      Event Name:
                    </label>
                    <input
                      type="text"
                      name="event_name"
                      defaultValue={selectedEvent.name}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="start_date"
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      defaultValue={selectedEvent.start_date}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="end_date"
                    >
                      End Date:
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      defaultValue={selectedEvent.end_date}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="venue"
                    >
                      Venue:
                    </label>
                    <input
                      type="text"
                      name="venue"
                      defaultValue={selectedEvent.venue}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="isCompleted"
                    >
                      Is Completed:
                    </label>
                    <select
                      name="isCompleted"
                      defaultValue={selectedEvent.isCompleted}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="time"
                    >
                      Time:
                    </label>
                    <input
                      type="time"
                      name="time"
                      defaultValue={selectedEvent.time}
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
          {addEventModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-10 rounded">
                <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
                <form onSubmit={handleAddEvent}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="event_name"
                    >
                      Event Name:
                    </label>
                    <input
                      type="text"
                      name="event_name"
                      placeholder="Event Name"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="start_date"
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="end_date"
                    >
                      End Date:
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="venue"
                    >
                      Venue:
                    </label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="Venue"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="time"
                    >
                      Time:
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Add Event
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setAddEventModal(false)}
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

export default EventList;
