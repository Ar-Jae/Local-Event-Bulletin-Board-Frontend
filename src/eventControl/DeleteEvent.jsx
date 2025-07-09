import React, { useEffect, useState } from "react";
export default function DeleteEvent({ events }) {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  if (!events || events.length === 0) {
    return <p>No events available to delete.</p>;
  }

  const handleDeleteEvent = async (e, event) => {
    e.preventDefault();
    const confirmDelete = window.confirm(`Are you sure you want to delete "${event.Title}"?`);
    if (!confirmDelete) return;

    const url = `http://127.0.0.1:4000/api/events/${event._id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });
      if (res.ok) {
        alert("Event deleted!");
        // Optionally refresh the event list here
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    }
  };

  return (
    <ul>
      {events.map(event => (
        <li key={event._id}>
          {event.Title}
          <button onClick={e => handleDeleteEvent(e, event)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
