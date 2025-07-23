import React, { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import LogOut from '/src/auth/LogOut';


export default function AdminEvents({ sessionToken, isAdmin }) {
  const [events, setEvents] = useState([]);
 
 
  const fetchEvents = () => {
    const url = "http://127.0.0.1:4000/api/events/events";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": sessionToken
      }
    })
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (sessionToken) fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    const url = `http://127.0.0.1:4000/api/events/${eventId}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== eventId));
        alert("Event deleted!");
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    }
  };

  return (
    <div>
      <h1>Admin Events Dashboard</h1>
      <EventCard
        events={events}
        isAdmin={isAdmin}
        onDelete={handleDeleteEvent}
      />
      <p>Click the button below to log out.</p>
      <LogOut />
    </div>
  );
}
