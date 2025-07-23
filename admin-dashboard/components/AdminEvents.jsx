import React, { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import EditEventForm from '@/eventControl/EditEvent';
import LogOut from '/src/auth/LogOut';

export default function AdminEvents({ sessionToken, isAdmin }) {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // ✅ Fetch events from the API

 
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
  }, [sessionToken]);

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

  // ✅ Conditionally render edit form
  if (selectedEvent) {
    return (
      <EditEventForm
        event={selectedEvent}
        sessionToken={sessionToken}
        onCancel={() => setSelectedEvent(null)}
        onUpdate={() => {
          setSelectedEvent(null);
          fetchEvents();
        }}
      />
    );
  }
  
  return (
    <div>
    {!selectedEvent ? (
      <>
        <h1>Admin Events Dashboard</h1>
        <EventCard
          events={events}
          isAdmin={isAdmin}
          onDelete={handleDeleteEvent}
          onEdit={(event) => setSelectedEvent(event)} // Pass full event object
        />
        <LogOut />
      </>
    ) : (
      <EditEventForm
        event={selectedEvent}
        sessionToken={sessionToken}
        onCancel={() => setSelectedEvent(null)}
        onUpdate={() => {
          fetchEvents();
          setSelectedEvent(null);
        }}
      />
    )}
  </div>
  );
}
