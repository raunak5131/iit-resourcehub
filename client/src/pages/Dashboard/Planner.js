import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function Planner() {
  const [events, setEvents] = useState([
    {
      title: "DSA Contest",
      date: "2025-07-12",
    },
    {
      title: "Arduino Workshop",
      date: "2025-07-15",
    },
    {
      title: "Photography Walk",
      date: "2025-07-20",
    },
  ]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📅 Academic & Club Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
