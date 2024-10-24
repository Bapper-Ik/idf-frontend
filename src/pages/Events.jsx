import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://0.0.0.0:8000/events/all_events");
      const data = await response.json();
      setEvents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
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
