import React, { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../api/eventApi";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">📅 All Events</h2>
      {events.map((event) => (
        <div key={event._id} className="border rounded p-4 mb-3 shadow-md bg-white">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
          <p className="text-sm">📍 {event.location}</p>
          <p className="text-sm">📆 {new Date(event.date).toLocaleDateString()}</p>
          <button
            onClick={() => handleDelete(event._id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
