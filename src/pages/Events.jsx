import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          //   "https://idf-site.onrender.com/events/all_events"
          "http://localhost:8000/events/all_events"
        );
        if (response.status === 404) {
          throw new Error("No event is available!");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 overflow-auto">
      {error && (
        <div className="bg-gray-200 text-red-500 font-bold shadow-md p-4 text-center rounded-lg w-max mx-auto mb-10">
          {error.message}
        </div>
      )}
      <h2 className="text-4xl font-bold text-center mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 mb-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-2xl text-green-900 capitalize underline font-semibold pb-2">
              {event.name}
            </h3>
            <p className="text-gray-600">Start Date: {event.start_date}</p>
            <p className="text-gray-600">End Date: {event.end_date}</p>
            <p className="text-gray-600">Time: {event.time}</p>
            <p className="text-gray-600">Venue: {event.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
